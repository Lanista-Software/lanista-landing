import type { Locale } from './i18n'
import { DEFAULT_LOCALE, localePath } from './i18n'

export const SITE_URL = 'https://lanista.com.tr'
export const SITE_NAME = 'Lanista Software'
export const TWITTER_SITE = '@lanaboratory'

/** Canonical absolute URL for a locale-agnostic path. Always trailing-slash. */
export function absoluteUrl(path: string, locale: Locale = DEFAULT_LOCALE): string {
  return `${SITE_URL}${localePath(path, locale)}`
}

/** Site-relative media paths become absolute; already-absolute URLs pass through. */
export function absoluteAsset(src?: string | null): string {
  if (!src)
    return ''
  return /^https?:\/\//.test(src) ? src : `${SITE_URL}${src.startsWith('/') ? '' : '/'}${src}`
}

/** Collapse whitespace and cut on a word boundary so SERP snippets are not mid-word. */
export function clampDescription(text?: string | null, max = 155): string {
  const clean = String(text || '').replace(/\s+/g, ' ').trim()
  if (clean.length <= max)
    return clean
  const cut = clean.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')) || cut}…`
}

/** Escape `<` so a stray tag in content cannot break out of the JSON-LD script. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003C')
}

/** OG card image URL for a page, generated at build time by src/pages/og/[...path].png.ts. */
export function ogImagePath(pagePath: string, locale: Locale = DEFAULT_LOCALE): string {
  const segment = localePath(pagePath, locale).replace(/^\/|\/$/g, '')
  return `${SITE_URL}/og/${segment || 'index'}.png`
}

export function breadcrumbSchema(locale: Locale, trail: { name: string, path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    'itemListElement': trail.map((item, i) => ({
      '@type': 'ListItem',
      'position': i + 1,
      'name': item.name,
      'item': absoluteUrl(item.path, locale),
    })),
  }
}
