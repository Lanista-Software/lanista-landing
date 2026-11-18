import { initClickTracking, track } from './analytics'
import { initParallax } from './parallax'

initClickTracking()
initParallax()

// Header shadow once the page scrolls.
const header = document.getElementById('site-header')
function onScroll() {
  header?.toggleAttribute('data-scrolled', window.scrollY > 8)
}
window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const supportsIO = 'IntersectionObserver' in window

// Reveal-on-scroll. Content is visible without JS (the `.js` gate in CSS) and
// for users who prefer reduced motion.
const reveals = document.querySelectorAll<HTMLElement>('.reveal')
if (reduceMotion || !supportsIO) {
  reveals.forEach(el => el.classList.add('is-visible'))
}
else {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        io.unobserve(entry.target)
      }
    }
  }, { threshold: 0, rootMargin: '0px 0px -80px 0px' })
  reveals.forEach(el => io.observe(el))
}

// Home page scroll-spy: mark the nav link of the section in view. The URL is
// left alone — rewriting the hash on scroll polluted history in the old site.
const spyLinks = document.querySelectorAll<HTMLAnchorElement>('[data-nav-section]')
if (spyLinks.length && supportsIO) {
  const seen = new Set<string>()
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting)
        continue
      const id = entry.target.id
      spyLinks.forEach((a) => {
        if (a.dataset.navSection === id)
          a.setAttribute('aria-current', 'location')
        else
          a.removeAttribute('aria-current')
      })
      if (!seen.has(id)) {
        seen.add(id)
        track('section_viewed', { section_id: id })
      }
    }
  }, { threshold: 0.3 })
  document.querySelectorAll<HTMLElement>('[data-spy-section]').forEach(el => io.observe(el))
}
