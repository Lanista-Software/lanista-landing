import * as tabs from '@zag-js/tabs'
import { normalizeProps, spreadProps, uid, VanillaMachine } from './zag'

export function initTabs() {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
    const service = new VanillaMachine(tabs.machine, {
      id: uid('tabs'),
      defaultValue: root.dataset.defaultValue ?? null,
    })
    const list = root.querySelector<HTMLElement>('[data-part="list"]')
    const triggers = [...root.querySelectorAll<HTMLElement>('[data-part="trigger"]')]
    const contents = [...root.querySelectorAll<HTMLElement>('[data-part="content"]')]

    const render = () => {
      const api = tabs.connect(service.service, normalizeProps)
      spreadProps(root, api.getRootProps())
      if (list)
        spreadProps(list, api.getListProps())
      triggers.forEach(el => spreadProps(el, api.getTriggerProps({ value: el.dataset.value! })))
      contents.forEach(el => spreadProps(el, api.getContentProps({ value: el.dataset.value! })))
    }
    service.subscribe(render)
    service.start()
    render()
    root.dataset.ready = ''
  })
}
