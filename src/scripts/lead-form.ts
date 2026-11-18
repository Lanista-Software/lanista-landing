import { track } from './analytics'
import { submitLead, TURNSTILE_SITE_KEY } from './studio-forms'

interface FieldConfig {
  name: string
  label: string
  required: boolean
  min?: number
  max: number
  type?: 'email' | 'tel'
}
interface FormConfig {
  locale: 'tr' | 'en'
  type: string
  product: string | null
  fields: FieldConfig[]
  messages: Record<'required' | 'min' | 'max' | 'email' | 'tel' | 'success' | 'failure' | 'consent' | 'rateLimit', string>
}

const EMAIL_RE = /^[^\s@]+@[^\s.@]+\.[^\s@]+$/
const fill = (tpl: string, label: string, n?: number) => tpl.replace('{label}', label).replace('{n}', String(n ?? ''))

function validateField(field: FieldConfig, raw: string, m: FormConfig['messages']): string {
  const value = raw.trim()
  if (!value)
    return field.required ? fill(m.required, field.label) : ''
  if (field.type === 'email' && !EMAIL_RE.test(value))
    return m.email
  if (field.type === 'tel' && value.replace(/\D/g, '').length < 10)
    return m.tel
  if (field.min && value.length < field.min)
    return fill(m.min, field.label, field.min)
  if (value.length > field.max)
    return fill(m.max, field.label, field.max)
  return ''
}

function setError(form: HTMLFormElement, name: string, message: string) {
  const input = form.elements.namedItem(name) as HTMLInputElement | null
  const out = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`)
  if (out)
    out.textContent = message
  if (input) {
    if (message)
      input.setAttribute('aria-invalid', 'true')
    else
      input.removeAttribute('aria-invalid')
  }
}

export function initLeadForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-lead-form]').forEach((form) => {
    if (form.dataset.bound)
      return
    form.dataset.bound = ''
    const config = JSON.parse(form.dataset.config!) as FormConfig
    const m = config.messages
    const summary = form.querySelector<HTMLElement>('[data-part="summary"]')!
    const summaryList = form.querySelector<HTMLElement>('[data-part="summary-list"]')!
    const status = form.querySelector<HTMLElement>('[data-part="status"]')!
    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!

    // Re-validate a field once the user leaves it, but only after a first submit
    // attempt — errors should not shout while someone is still typing.
    let attempted = false

    // Error summary with links to each field, focused so screen readers announce it.
    const showSummary = (errors: { name: string, message: string }[]) => {
      summaryList.replaceChildren(...errors.map((err) => {
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.href = `#${(form.elements.namedItem(err.name) as HTMLElement | null)?.id ?? ''}`
        a.className = 'underline'
        a.textContent = err.message
        li.append(a)
        return li
      }))
      summary.hidden = false
      summary.focus()
    }

    // Optional Cloudflare Turnstile, loaded only once someone starts filling the form.
    const captchaBox = form.querySelector<HTMLElement>('[data-part="captcha"]')
    let captchaToken = ''
    if (TURNSTILE_SITE_KEY && captchaBox) {
      const setToken = (token: string) => {
        captchaToken = token
      }
      form.addEventListener('focusin', () => loadTurnstile(captchaBox, config.locale, setToken), { once: true })
    }
    form.addEventListener('focusout', (e) => {
      if (!attempted)
        return
      const el = e.target as HTMLInputElement
      const field = config.fields.find(f => f.name === el.name)
      if (field)
        setError(form, field.name, validateField(field, el.value, m))
      if (el.name === 'consent')
        setError(form, 'consent', el.checked ? '' : m.consent)
    })

    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      attempted = true
      status.textContent = ''
      const data = new FormData(form)

      const errors: { name: string, label: string, message: string }[] = []
      for (const field of config.fields) {
        const message = validateField(field, String(data.get(field.name) ?? ''), m)
        setError(form, field.name, message)
        if (message)
          errors.push({ name: field.name, label: field.label, message })
      }
      const consent = data.get('consent') === 'on'
      setError(form, 'consent', consent ? '' : m.consent)
      if (!consent)
        errors.push({ name: 'consent', label: '', message: m.consent })

      if (errors.length) {
        showSummary(errors)
        return
      }
      summary.hidden = true

      submit.disabled = true
      submit.textContent = submit.dataset.sending ?? ''
      const lead: Record<string, unknown> = {
        type: String(data.get('type') ?? config.type),
        language: config.locale,
        page: location.pathname,
        kvkk_consent: true,
        subject: String(data.get('subject') ?? config.type),
        ...(config.product ? { product: config.product } : {}),
      }
      for (const field of config.fields) {
        const value = String(data.get(field.name) ?? '').trim()
        if (value)
          lead[field.name] = value
      }
      // The honeypot goes to Studio as `_hp`; Studio answers success and drops the entry.
      const result = await submitLead(lead, { captchaToken, honeypot: String(data.get('website') ?? '') })
      submit.disabled = false
      submit.textContent = submit.dataset.label ?? ''

      if (result.ok) {
        track('generate_lead', { form_type: config.type, product: config.product ?? undefined })
        form.reset()
        attempted = false
        status.className = 'text-sm font-medium text-success-800'
        status.textContent = m.success
        return
      }
      if (result.reason === 'validation') {
        const known = new Set(config.fields.map(f => f.name))
        const fieldErrors = result.errors.filter(e => known.has(e.field)).map(e => ({ name: e.field, message: e.message }))
        fieldErrors.forEach(e => setError(form, e.name, e.message))
        if (fieldErrors.length) {
          showSummary(fieldErrors)
          return
        }
      }
      status.className = 'text-sm font-medium text-danger-700'
      status.textContent = result.reason === 'rate-limit' ? m.rateLimit : m.failure
    })
  })
}

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string }
  }
}

function loadTurnstile(box: HTMLElement, locale: string, onToken: (token: string) => void) {
  const render = () => window.turnstile?.render(box, {
    'sitekey': TURNSTILE_SITE_KEY,
    'language': locale,
    'callback': onToken,
    'expired-callback': () => onToken(''),
  })
  if (window.turnstile)
    return render()
  const script = document.createElement('script')
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
  script.async = true
  script.onload = render
  document.head.append(script)
}
