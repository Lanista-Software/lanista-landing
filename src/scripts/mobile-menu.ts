import * as dialog from '@zag-js/dialog'
import { normalizeProps, part, spreadProps, uid, VanillaMachine } from './zag'

/** Mobile navigation drawer on top of the Zag dialog machine. */
export function initMobileMenu() {
  document.querySelectorAll<HTMLElement>('[data-mobile-menu]').forEach((root) => {
    const service = new VanillaMachine(dialog.machine, { id: uid('menu') })
    const els = {
      trigger: part(root, 'trigger'),
      backdrop: part(root, 'backdrop'),
      positioner: part(root, 'positioner'),
      content: part(root, 'content'),
      title: part(root, 'title'),
      close: part(root, 'close-trigger'),
    }

    const render = () => {
      const api = dialog.connect(service.service, normalizeProps)
      if (els.trigger)
        spreadProps(els.trigger, api.getTriggerProps())
      if (els.backdrop)
        spreadProps(els.backdrop, api.getBackdropProps())
      if (els.positioner) {
        spreadProps(els.positioner, api.getPositionerProps())
        // Zag hides backdrop/content but not the full-screen positioner.
        els.positioner.hidden = !api.open
      }
      if (els.content)
        spreadProps(els.content, api.getContentProps())
      if (els.title)
        spreadProps(els.title, api.getTitleProps())
      if (els.close)
        spreadProps(els.close, api.getCloseTriggerProps())
    }

    service.subscribe(render)
    service.start()
    render()

    // Following an in-page link (#services) must close the drawer.
    els.content?.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).closest('a'))
        dialog.connect(service.service, normalizeProps).setOpen(false)
    })
  })
}
