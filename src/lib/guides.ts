/**
 * Guide articles (Contentrain `guides`, Turkish only) at /rehber/{slug}/.
 * Body is markdown; headings get ids and form the table of contents.
 */
import { query } from '#contentrain'
import { renderMarkdown } from './legal'

export const GUIDES_PATH = '/rehber'

export function getGuides() {
  return query('guides').sort('order', 'asc').all()
}

export type Guide = ReturnType<typeof getGuides>[number]

export function guidePath(slug: string) {
  return `${GUIDES_PATH}/${slug}`
}

export function renderGuide(guide: Guide) {
  return renderMarkdown(guide.body)
}

/** "23 Kasım 2026" */
export function formatDate(date?: string) {
  return date ? new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date)) : undefined
}
