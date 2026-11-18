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
    const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]')
    if (!el)
      return
    const params: Record<string, string> = {}
    for (const attr of el.getAttributeNames()) {
      if (attr.startsWith('data-track-'))
        params[attr.slice('data-track-'.length)] = el.getAttribute(attr) ?? ''
    }
    track(el.dataset.track!, params)
  })
}
