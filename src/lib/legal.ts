/**
 * Legal & corporate pages (Contentrain `legal-pages` documents, Turkish).
 * Markdown is rendered at build time; {{tokens}} are filled from Contentrain
 * data so one text serves every product (brief §6).
 */
import type { LegalPages } from '#contentrain'
import { document } from '#contentrain'
import { marked } from 'marked'
import { COMPANY } from './company'
import { t } from './i18n'

export type LegalPage = LegalPages

export function getLegalPages(): LegalPage[] {
  return document('legal-pages').sort('order', 'asc').all()
}

export function legalPath(page: Pick<LegalPage, 'group' | 'slug'>): string {
  return page.group === 'legal' ? `/yasal/${page.slug}` : `/${page.slug}`
}

function slugify(text: string) {
  return text.toLocaleLowerCase('tr-TR')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export interface RenderedLegal {
  html: string
  toc: { id: string, text: string }[]
  /** True when a required value (e.g. setup time) is still missing. */
  incomplete: boolean
}

/** Order-specific values for {{urun}}, {{paket}}, {{tutar}} (checkout page). */
export interface OrderTokens { urun: string, paket: string, tutar: string }

export function renderLegal(page: LegalPage, order?: OrderTokens): RenderedLegal {
  const s = t('tr')
  let incomplete = false
  let md = page.body
    // A line that only exists to show the KEP address disappears until there is one.
    .split('\n')
    .filter(line => !(line.includes('{{kep}}') && !COMPANY.kep))
    .join('\n')
    .replaceAll('{{kep}}', COMPANY.kep ?? '')
    .replaceAll('{{urun}}', order?.urun ?? s('legal.token.urun'))
    .replaceAll('{{paket}}', order?.paket ?? s('legal.token.paket'))
    .replaceAll('{{tutar}}', order?.tutar ?? s('legal.token.tutar'))
  md = md.replaceAll('{{kurulum_suresi}}', () => {
    if (COMPANY.setupDays)
      return String(COMPANY.setupDays)
    incomplete = true
    return s('legal.token.kurulum_tbd')
  })

  const toc: RenderedLegal['toc'] = []
  const used = new Set<string>()
  const html = (marked.parse(md, { async: false }) as string)
    .replace(/<h([23])>(.*?)<\/h\1>/g, (_, depth: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, '')
        .replace(/&#39;/g, '\'')
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
      let id = slugify(text) || 'bolum'
      while (used.has(id)) id += '-2'
      used.add(id)
      if (depth === '2')
        toc.push({ id, text })
      return `<h${depth} id="${id}">${inner}</h${depth}>`
    })
  return { html, toc, incomplete }
}

export function getLegalPage(slug: string): LegalPage | undefined {
  return getLegalPages().find(p => p.slug === slug)
}
