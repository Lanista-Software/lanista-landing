export const SITE_URL = 'https://lanista.com.tr'
export const DEFAULT_OG_IMAGE
  = 'https://res.cloudinary.com/dmywgn45o/image/upload/v1729243091/lanista_og_chgpop.jpg'
const TWITTER_SITE = '@lanaboratory'
const OG_LOCALE: Record<string, string> = { en: 'en_US', tr: 'tr_TR' }

/**
 * Canonical absolute URL for a locale-agnostic path.
 * Always trailing-slash — the host 301s the slash-less form, so every link and
 * every canonical/sitemap entry must already carry it (see docs/seo-audit.md).
 */
export function absoluteUrl(path: string, locale = 'en'): string {
  const segment = String(path || '').replace(/^\/+|\/+$/g, '')
  const prefix = locale === 'en' ? '' : `/${locale}`
  return `${SITE_URL}${prefix}/${segment ? `${segment}/` : ''}`
}

/** Site-relative media paths become absolute; already-absolute URLs pass through. */
export function absoluteAsset(src?: string | null): string {
  if (!src)
    return DEFAULT_OG_IMAGE
  return /^https?:\/\//.test(src) ? src : `${SITE_URL}${src.startsWith('/') ? '' : '/'}${src}`
}

/**
 * Facebook, X and LinkedIn all refuse to render SVG share images, and most of
 * our case study covers are SVG logos — fall back to the raster brand card.
 */
function ogSafeImage(src?: string | null): string {
  const url = absoluteAsset(src)
  return /\.svg(?:[?#]|$)/i.test(url) ? DEFAULT_OG_IMAGE : url
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
function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

export interface SeoOptions {
  /** Full <title> and og:title/twitter:title default. */
  title: () => string
  description: () => string
  /** Locale-agnostic path, e.g. '/', '/works', '/works/pazardan'. */
  path: () => string
  /** Site-relative or absolute; falls back to the shared brand OG image. */
  image?: () => string | undefined | null
  /**
   * Render a branded 1200x630 card for this page instead of using `image`.
   * nuxt-og-image then owns og:image / twitter:image, so this helper skips them.
   */
  ogCard?: () => { title: string, description?: string, label?: string }
  type?: 'website' | 'article'
  ogTitle?: () => string
  ogDescription?: () => string
  /** One node or an array of nodes; emitted as a single ld+json script. */
  jsonLd?: () => unknown
}

/**
 * Single source of truth for per-page head: canonical, hreflang, Open Graph,
 * Twitter cards, robots and JSON-LD. Every page must go through this so the
 * locale prefix and trailing slash stay consistent across all three signals.
 */
export function useSeo(options: SeoOptions) {
  const { locale, locales } = useI18n()

  const localeCodes = computed<string[]>(() =>
    ((locales.value ?? []) as (string | { code: string })[])
      .map(l => (typeof l === 'string' ? l : l.code)),
  )

  const canonical = computed(() => absoluteUrl(options.path(), locale.value))
  const ogTitle = () => (options.ogTitle ?? options.title)()
  const ogDescription = () => (options.ogDescription ?? options.description)()
  const image = () => ogSafeImage(options.image?.())

  // When a card is generated, nuxt-og-image injects og:image/twitter:image with
  // the right dimensions and cache-busting URL, so we must not emit our own.
  const generatesCard = Boolean(options.ogCard)
  if (options.ogCard) {
    const card = options.ogCard()
    defineOgImage({
      component: 'OgCard',
      props: { title: card.title, description: card.description ?? '', label: card.label ?? '' },
    })
  }

  const imageMeta = generatesCard
    ? []
    : [
        { property: 'og:image', content: image },
        { name: 'twitter:image', content: image },
      ]

  useHead({
    htmlAttrs: { lang: locale },
    title: options.title,
    link: [
      { rel: 'canonical', href: () => canonical.value },
      ...localeCodes.value.map(code => ({
        rel: 'alternate',
        hreflang: code,
        href: () => absoluteUrl(options.path(), code),
      })),
      { rel: 'alternate', hreflang: 'x-default', href: () => absoluteUrl(options.path(), 'en') },
    ],
    meta: [
      { name: 'description', content: options.description },
      // Explicit robots directives so Google may show full-size images and untruncated snippets.
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { property: 'og:type', content: options.type ?? 'website' },
      { property: 'og:site_name', content: 'Lanista Software' },
      { property: 'og:locale', content: () => OG_LOCALE[locale.value] ?? 'en_US' },
      { property: 'og:url', content: () => canonical.value },
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: ogDescription },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: TWITTER_SITE },
      { name: 'twitter:title', content: ogTitle },
      { name: 'twitter:description', content: ogDescription },
      ...imageMeta,
    ],
    ...(options.jsonLd
      ? {
          script: [{
            type: 'application/ld+json',
            innerHTML: () => serializeJsonLd(options.jsonLd!()),
          }],
        }
      : {}),
  })

  return { canonical }
}

/** BreadcrumbList for a detail page, with locale-correct absolute URLs. */
export function breadcrumbSchema(
  locale: string,
  trail: { name: string, path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': trail.map((item, i) => ({
      '@type': 'ListItem',
      'position': i + 1,
      'name': item.name,
      'item': absoluteUrl(item.path, locale),
    })),
  }
}
