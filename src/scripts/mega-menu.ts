import * as popover from '@zag-js/popover'
import { normalizeProps, part, spreadProps, uid, VanillaMachine } from './zag'

const HOVER_OPEN_MS = 80
const HOVER_CLOSE_MS = 220

/**
 * Header product menu on the Zag.js popover: button with aria-expanded, Escape and
 * outside click close, focus returns to the trigger. Non-modal and not portalled, so
 * Tab moves from the trigger straight into the panel. Mouse users also open it on hover.
 * The panel is anchored to the header row ([data-mega-anchor]) and takes its width.
 */
export function initMegaMenus() {
  document.querySelectorAll<HTMLElement>('[data-mega-menu]:not([data-ready])').forEach((root) => {
    const trigger = part<HTMLButtonElement>(root, 'trigger')
    const positioner = part(root, 'positioner')
    const content = part(root, 'content')
    const title = part(root, 'title')
    const anchor = root.closest('header')?.querySelector<HTMLElement>('[data-mega-anchor]')
    if (!trigger || !positioner || !content)
      return

    const service = new VanillaMachine(popover.machine, {
      id: uid('mega'),
      modal: false,
      portalled: false,
      autoFocus: false,
      positioning: { placement: 'bottom', sameWidth: true, gutter: 0, strategy: 'absolute' },
    })

    const render = () => {
      const api = popover.connect(service.service, normalizeProps)
      spreadProps(trigger, api.getTriggerProps())
      spreadProps(positioner, api.getPositionerProps())
      spreadProps(content, api.getContentProps())
      if (title)
        spreadProps(title, api.getTitleProps())
      if (anchor)
        spreadProps(anchor, api.getAnchorProps())
    }
    service.subscribe(render)
    service.start()
    render()

    // Hover intent for mouse users; touch and keyboard use the button.
    let timer: number | undefined
    const setOpen = (open: boolean, delay: number) => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => popover.connect(service.service, normalizeProps).setOpen(open), delay)
    }
    for (const el of [trigger, content]) {
      el.addEventListener('pointerenter', (e) => {
        if (e.pointerType === 'mouse')
          setOpen(true, HOVER_OPEN_MS)
      })
      el.addEventListener('pointerleave', (e) => {
        if (e.pointerType === 'mouse')
          setOpen(false, HOVER_CLOSE_MS)
      })
    }
    root.dataset.ready = ''
  })
}
