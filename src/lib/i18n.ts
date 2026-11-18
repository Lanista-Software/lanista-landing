/**
 * Locale routing. Turkish is the primary language and lives at the root;
 * English lives under /en/. Every generated URL carries a trailing slash —
 * the host 301s the slash-less form (see docs/seo-audit.md).
 */
import { dictionary } from '#contentrain'

export const LOCALES = ['tr', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'tr'

export const HTML_LANG: Record<Locale, string> = { tr: 'tr', en: 'en' }
export const OG_LOCALE: Record<Locale, string> = { tr: 'tr_TR', en: 'en_US' }
export const IN_LANGUAGE: Record<Locale, string> = { tr: 'tr-TR', en: 'en-US' }

/** `[...lang]` route param → locale. `undefined` (root) is Turkish. */
export function localeFromParam(param: string | undefined): Locale {
  return param === 'en' ? 'en' : 'tr'
}

/** getStaticPaths entries for a `[...lang]` route: root (tr) + /en/. */
export const LANG_PARAMS = [
  { params: { lang: undefined }, props: { locale: 'tr' as Locale } },
  { params: { lang: 'en' }, props: { locale: 'en' as Locale } },
]

/** Locale-agnostic path ('/', '/works', 'works/x', '/#contact') → localized href. */
export function localePath(path: string, locale: Locale = DEFAULT_LOCALE): string {
  const [rawPath, hash] = path.split('#')
  const segment = (rawPath || '').replace(/^\/+|\/+$/g, '')
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
  const href = `${prefix}/${segment ? `${segment}/` : ''}`
  return hash !== undefined ? `${href}#${hash}` : href
}

/** Pages whose slug differs per language. */
export const ROUTES = {
  contact: { tr: '/iletisim', en: '/contact' },
  services: { tr: '/hizmetler', en: '/services' },
  process: { tr: '/surec', en: '/process' },
  products: { tr: '/urunler', en: '/products' },
  legal: { tr: '/yasal', en: '/legal' },
} as const satisfies Record<string, Record<Locale, string>>

export function routePath(route: keyof typeof ROUTES, locale: Locale): string {
  return localePath(ROUTES[route][locale], locale)
}

/** Content stores bare hashes ("#contact") or site paths; anchor them to the localized home. */
export function contentLink(link: string | undefined, locale: Locale): string {
  if (!link)
    return ''
  if (/^https?:\/\//.test(link))
    return link
  return link.startsWith('#') ? `${localePath('/', locale)}${link}` : localePath(link, locale)
}

export type Translate = (key: string, params?: Record<string, string | number>) => string

/**
 * Interface strings come from the Contentrain `ui` dictionary — no
 * user-facing text lives in code. A missing key fails the build loudly.
 * Build-time only (imports #contentrain): never import from src/scripts.
 */
export function t(locale: Locale): Translate {
  const dict = dictionary('ui').locale(locale).get()
  return (key, params) => {
    const value = dict[key]
    if (value === undefined)
      throw new Error(`[ui] Missing dictionary key "${key}" for locale "${locale}" — add it in Contentrain (model: ui).`)
    return params ? value.replace(/\{(\w+)\}/g, (_, k: string) => String(params[k] ?? '')) : value
  }
}
