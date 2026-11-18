/**
 * Lightweight parallax: every [data-parallax="factor"] element shifts by
 * (distance of its section from the viewport centre) × factor. Uses the
 * independent CSS `translate` property, so it composes with Tailwind
 * transforms and entrance animations. Off for prefers-reduced-motion.
 */
export function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return
  const items = [...document.querySelectorAll<HTMLElement | SVGElement>('[data-parallax]')].map(el => ({
    el,
    factor: Number.parseFloat(el.getAttribute('data-parallax') || '0'),
    anchor: (el.closest('section, [data-parallax-root], #home') as HTMLElement | null) ?? document.body,
  }))
  if (!items.length)
    return

  let ticking = false
  const update = () => {
    ticking = false
    const vh = window.innerHeight
    for (const { el, factor, anchor } of items) {
      const r = anchor.getBoundingClientRect()
      if (r.bottom < -vh || r.top > vh * 2)
        continue
      const offset = (r.top + r.height / 2 - vh / 2) * factor
      el.style.setProperty('translate', `0 ${offset.toFixed(1)}px`)
    }
  }
  const onScroll = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(update)
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  update()
}
