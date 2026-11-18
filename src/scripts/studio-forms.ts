/**
 * Contentrain Studio public forms endpoint (docs.contentrain.io/guide/forms).
 * Every site form posts to the single `leads` collection model; `type` and
 * `product` tell the forms apart. The form must be "enabled" and "public" in
 * Studio, with all lead fields exposed — otherwise the endpoint answers 404.
 */
const STUDIO_URL = (import.meta.env.PUBLIC_CONTENTRAIN_STUDIO_URL || 'https://studio.contentrain.io').replace(/\/$/, '')
const PROJECT_ID = import.meta.env.PUBLIC_CONTENTRAIN_PROJECT_ID || ''
const MODEL_ID = 'leads'

export type SubmitResult
  = | { ok: true, message?: string }
    | { ok: false, reason: 'validation', errors: { field: string, message: string }[] }
    | { ok: false, reason: 'rate-limit' | 'unavailable' | 'network' }

export async function submitLead(data: Record<string, unknown>, opts: { captchaToken?: string, honeypot?: string } = {}): Promise<SubmitResult> {
  if (!PROJECT_ID) {
    console.error('PUBLIC_CONTENTRAIN_PROJECT_ID is not set — form submissions are disabled.')
    return { ok: false, reason: 'unavailable' }
  }
  let res: Response
  try {
    res = await fetch(`${STUDIO_URL}/api/forms/v1/${PROJECT_ID}/${MODEL_ID}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        data,
        ...(opts.captchaToken ? { captchaToken: opts.captchaToken } : {}),
        _hp: opts.honeypot ?? '',
      }),
    })
  }
  catch {
    return { ok: false, reason: 'network' }
  }
  if (res.status === 429)
    return { ok: false, reason: 'rate-limit' }
  const body = await res.json().catch(() => null) as { success?: boolean, message?: string, errors?: { field: string, message: string }[] } | null
  if (body?.success)
    return { ok: true, message: body.message }
  if (body?.errors?.length)
    return { ok: false, reason: 'validation', errors: body.errors }
  return { ok: false, reason: 'unavailable' }
}

export const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || ''
