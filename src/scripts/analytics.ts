declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/** Send a GA4 event. No-op when analytics is blocked or not consented. */
export function track(event: string, params: Record<string, unknown> = {}) {
  window.gtag?.('event', event, params)
}

/**
 * Declarative click tracking: `data-track="event_name"` plus any
 * `data-track-<param>="value"` attributes become the event parameters.
 */
export function initClickTracking() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null
    const el = target?.closest<HTMLElement>('[data-track]')
    if (!el) {
      // Phone, e-mail and WhatsApp links anywhere on the site.
      const href = target?.closest<HTMLAnchorElement>('a[href]')?.getAttribute('href') ?? ''
      const method = href.startsWith('tel:') ? 'phone' : href.startsWith('mailto:') ? 'email' : /wa\.me|whatsapp/.test(href) ? 'whatsapp' : ''
      if (method)
        track('contact_click', { method })
      return
    }
    const params: Record<string, string> = {}
    for (const attr of el.getAttributeNames()) {
      if (attr.startsWith('data-track-'))
        params[attr.slice('data-track-'.length)] = el.getAttribute(attr) ?? ''
    }
    track(el.dataset.track!, params)
  })
}
