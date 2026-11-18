import { track } from './analytics'
import { submitLead } from './studio-forms'

interface Config {
  locale: string
  type: 'order'
  product: string
  plan: string
  amount: number
  consents: string
  redirect: string
  fields: { name: string, label: string, required: boolean, min?: number, max: number, type?: 'email' | 'tel' }[]
  messages: Record<string, string>
}

const EMAIL_RE = /^[^\s@]+@[^\s.@]+\.[^\s@]+$/
const fill = (tpl: string, label: string, n?: number) => tpl.replace('{label}', label).replace('{n}', String(n ?? ''))

/** Validate → record the approvals in Studio (type "order") → go to the iyzico payment link. */
export function initCheckout() {
  const form = document.querySelector<HTMLFormElement>('form[data-checkout]')
  if (!form)
    return
  const c = JSON.parse(form.dataset.config!) as Config
  const m = c.messages
  const summary = form.querySelector<HTMLElement>('[data-part="summary"]')!
  const list = form.querySelector<HTMLElement>('[data-part="summary-list"]')!
  const status = form.querySelector<HTMLElement>('[data-part="status"]')!
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!

  const setError = (name: string, msg: string) => {
    const out = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`)
    const input = form.elements.namedItem(name) as HTMLInputElement | null
    if (out)
      out.textContent = msg
    if (msg)
      input?.setAttribute('aria-invalid', 'true')
    else input?.removeAttribute('aria-invalid')
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = new FormData(form)
    const errors: { name: string, message: string }[] = []
    for (const f of c.fields) {
      const v = String(data.get(f.name) ?? '').trim()
      let msg = ''
      if (!v && f.required)
        msg = fill(m.required, f.label)
      else if (v && f.type === 'email' && !EMAIL_RE.test(v))
        msg = m.email
      else if (v && f.type === 'tel' && v.replace(/\D/g, '').length < 10)
        msg = m.tel
      else if (v && f.min && v.length < f.min)
        msg = fill(m.min, f.label, f.min)
      setError(f.name, msg)
      if (msg)
        errors.push({ name: f.name, message: msg })
    }
    for (const name of ['obf', 'mss', 'perform']) {
      const ok = data.get(name) === 'on'
      setError(name, ok ? '' : m.consent)
      if (!ok)
        errors.push({ name, message: m.consent })
    }
    if (errors.length) {
      list.replaceChildren(...errors.map((err) => {
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.href = `#co-${err.name}`
        a.className = 'underline'
        a.textContent = err.message
        li.append(a)
        return li
      }))
      summary.hidden = false
      summary.focus()
      return
    }
    summary.hidden = true
    btn.disabled = true
    const lead: Record<string, unknown> = {
      type: 'order',
      product: c.product,
      plan: c.plan,
      amount_try: c.amount,
      consents: `${c.consents};zaman:${new Date().toISOString()}`,
      kvkk_consent: true,
      language: c.locale,
      page: location.pathname,
      subject: `${c.product} — ${c.plan}`,
    }
    for (const f of c.fields) {
      const v = String(data.get(f.name) ?? '').trim()
      if (v)
        lead[f.name] = v
    }
    const result = await submitLead(lead)
    if (!result.ok) {
      btn.disabled = false
      status.className = 'mt-3 text-sm font-medium text-danger-700'
      status.textContent = result.reason === 'rate-limit' ? m.rateLimit : m.failure
      return
    }
    track('begin_checkout', { currency: 'TRY', value: c.amount, items: [{ item_name: c.plan, item_category: c.product }] })
    status.className = 'mt-3 text-sm font-medium text-success-800'
    status.textContent = m.success
    if (c.redirect)
      window.location.assign(c.redirect)
  })
}
