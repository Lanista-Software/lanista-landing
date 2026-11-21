/**
 * Legal & corporate pages (Contentrain `legal-pages` documents, Turkish).
 * Markdown is rendered at build time; {{tokens}} are filled from Contentrain
 * data so one text serves every product (brief §6).
 */
import type { LegalPages } from '#contentrain'
import type { Locale } from './i18n'
import { document } from '#contentrain'
import { marked } from 'marked'
import { COMPANY } from './company'
import { t } from './i18n'

/** Flags are stored as 'true'/'false' strings in Contentrain; exposed as booleans. */
export type LegalPage = Omit<LegalPages, 'reviewed' | 'show_in_footer'> & { reviewed: boolean, show_in_footer: boolean }

// Stored as select 'true'/'false' (MCP quotes document frontmatter booleans).
const bool = (v: unknown) => v === true || v === 'true'

export function getLegalPages(locale: Locale = 'tr'): LegalPage[] {
  return document('legal-pages').locale(locale).sort('order', 'asc').all().map(p => ({ ...p, reviewed: bool(p.reviewed), show_in_footer: bool(p.show_in_footer), order: Number(p.order ?? 0) })).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

/** Corporate pages get an English slug of their own. */
const CORPORATE_EN: Record<string, string> = { hakkimizda: 'about' }

/** Locale-agnostic path of a legal/corporate page (pass to localePath). */
export function legalPath(page: Pick<LegalPage, 'group' | 'slug'>, locale: Locale = 'tr'): string {
  if (page.group === 'legal')
    return `${locale === 'en' ? '/legal' : '/yasal'}/${page.slug}`
  return `/${locale === 'en' ? (CORPORATE_EN[page.slug] ?? page.slug) : page.slug}`
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

/** {{urun}}, {{paket}}, {{tutar}} show generic placeholders: order values are filled in by the product's own checkout. */
export function renderLegal(page: LegalPage, locale: Locale = 'tr'): RenderedLegal {
  const s = t(locale)
  let incomplete = false
  let md = page.body
    // A line that only exists to show the KEP address disappears until there is one.
    .split('\n')
    .filter(line => !(line.includes('{{kep}}') && !COMPANY.kep))
    .join('\n')
    .replaceAll('{{kep}}', COMPANY.kep ?? '')
    .replaceAll('{{telefon}}', COMPANY.phone)
    .replaceAll('{{urun}}', s('legal.token.urun'))
    .replaceAll('{{paket}}', s('legal.token.paket'))
    .replaceAll('{{tutar}}', s('legal.token.tutar'))
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

export function getLegalPage(slug: string, locale: Locale = 'tr'): LegalPage | undefined {
  return getLegalPages(locale).find(p => p.slug === slug)
}
