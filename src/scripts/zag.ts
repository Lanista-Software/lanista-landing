import { normalizeProps, spreadProps, VanillaMachine } from '@zag-js/vanilla'

export { normalizeProps, spreadProps, VanillaMachine }

let counter = 0
/** Stable-enough unique id for a machine instance on one page. */
export function uid(prefix: string): string {
  counter += 1
  return `${prefix}-${counter}`
}

/** Query a `[data-part="…"]` child that the markup guarantees. */
export function part<T extends Element = HTMLElement>(root: Element, name: string): T | null {
  return root.querySelector<T>(`[data-part="${name}"]`)
}
