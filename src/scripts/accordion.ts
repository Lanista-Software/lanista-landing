import * as accordion from '@zag-js/accordion'
import { normalizeProps, spreadProps, uid, VanillaMachine } from './zag'

export function initAccordions() {
  document.querySelectorAll<HTMLElement>('[data-accordion]').forEach((root) => {
    const service = new VanillaMachine(accordion.machine, { id: uid('acc'), collapsible: true, multiple: true })
    // Resolve parts once: Zag rewrites `data-part` (e.g. "item-trigger") on render.
    const items = [...root.querySelectorAll<HTMLElement>('[data-part="item"]')].map(item => ({
      item,
      value: item.dataset.value!,
      trigger: item.querySelector<HTMLElement>('[data-part="trigger"]'),
      content: item.querySelector<HTMLElement>('[data-part="content"]'),
    }))

    const render = () => {
      const api = accordion.connect(service.service, normalizeProps)
      spreadProps(root, api.getRootProps())
      for (const { item, value, trigger, content } of items) {
        spreadProps(item, api.getItemProps({ value }))
        if (trigger)
          spreadProps(trigger, api.getItemTriggerProps({ value }))
        if (content)
          spreadProps(content, api.getItemContentProps({ value }))
      }
    }
    service.subscribe(render)
    service.start()
    render()
    root.dataset.ready = ''
  })
}
