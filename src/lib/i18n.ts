/**
 * Locale routing. Turkish is the primary language and lives at the root;
 * English lives under /en/. Every generated URL carries a trailing slash —
 * the host 301s the slash-less form (see docs/seo-audit.md).
 */
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

/** Content stores bare hashes ("#contact") or site paths; anchor them to the localized home. */
export function contentLink(link: string | undefined, locale: Locale): string {
  if (!link)
    return ''
  if (/^https?:\/\//.test(link))
    return link
  return link.startsWith('#') ? `${localePath('/', locale)}${link}` : localePath(link, locale)
}

/** UI chrome strings (navigation, buttons, landmarks). Content lives in Contentrain. */
export const ui = {
  tr: {
    skipToContent: 'İçeriğe geç',
    mainNav: 'Ana menü',
    footerNav: 'Alt menü',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    menuTitle: 'Menü',
    language: 'Dil seçimi',
    social: 'Sosyal medya',
    contact: 'İletişim',
    menu: {
      home: 'Ana Sayfa',
      services: 'Hizmetler',
      products: 'Ürünler',
      process: 'Süreç',
      technologies: 'Teknolojiler',
      works: 'Çalışmalar',
    },
    learnMore: 'Detaylı bilgi',
    caseStudy: 'Vaka çalışması',
    liveSite: 'Canlı site',
    opensNewTab: '(yeni sekmede açılır)',
    viewAllWork: 'Tüm çalışmaları gör',
    ourServices: 'Hizmetlerimiz',
    quickLinks: 'Hızlı Erişim',
    legal: 'Yasal',
    company: 'Şirket Bilgileri',
    rights: 'Tüm hakları saklıdır.',
    home: 'Ana Sayfa',
    breadcrumb: 'Sayfa konumu',
    moreDetailsFor: 'Daha fazla bilgi:',
  },
  en: {
    skipToContent: 'Skip to content',
    mainNav: 'Main navigation',
    footerNav: 'Footer navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menuTitle: 'Menu',
    language: 'Language',
    social: 'Social media',
    contact: 'Contact',
    menu: {
      home: 'Home',
      services: 'Services',
      products: 'Products',
      process: 'Process',
      technologies: 'Technologies',
      works: 'Works',
    },
    learnMore: 'Learn more',
    caseStudy: 'View case study',
    liveSite: 'Live site',
    opensNewTab: '(opens in a new tab)',
    viewAllWork: 'View all work',
    ourServices: 'Our Services',
    quickLinks: 'Quick Links',
    legal: 'Legal',
    company: 'Company',
    rights: 'All rights reserved.',
    home: 'Home',
    breadcrumb: 'Breadcrumb',
    moreDetailsFor: 'More details:',
  },
} as const

export type UiStrings = (typeof ui)[Locale]
export const t = (locale: Locale): UiStrings => ui[locale]
