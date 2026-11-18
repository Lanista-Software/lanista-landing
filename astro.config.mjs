// @ts-check
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

const SITE = 'https://lanista.com.tr'
// Pages whose slug differs per language (keep in sync with ROUTES in src/lib/i18n.ts).
// [Turkish path pattern, English path pattern] — `*` is the shared slug.
const LOCALIZED_PATTERNS = [
  ['/iletisim/', '/en/contact/'],
  ['/hizmetler/', '/en/services/'],
  ['/surec/', '/en/process/'],
  ['/urunler/', '/en/products/'],
  ['/urunler/*/', '/en/products/*/'],
  ['/yasal/*/', '/en/legal/*/'],
  ['/hakkimizda/', '/en/about/'],
]
/** @param {string} path @returns {{ lang: 'tr' | 'en', path: string } | null} */
function counterpart(path) {
  for (const [tr, en] of LOCALIZED_PATTERNS) {
    for (const [from, to, lang] of /** @type {const} */ ([[tr, en, 'en'], [en, tr, 'tr']])) {
      const re = new RegExp(`^${from.replace('*', '([^/]+)')}$`)
      const m = path.match(re)
      if (m)
        return { lang, path: to.replace('*', m[1] ?? '') }
    }
  }
  return null
}

// Turkish is the primary language and lives at the root (`/`, `/works/…`).
// English is kept under `/en/`. Products and legal pages are Turkish-only.
// The host 301s slash-less URLs, so every route, canonical and sitemap entry
// carries a trailing slash (see docs/seo-audit.md).
export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // ~15 KB of CSS: inline it so the first paint does not wait for a request.
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'tr',
        locales: { tr: 'tr-TR', en: 'en-US' },
      },
      // OG image endpoints and pre-payment pages are not for search.
      filter: page => !page.includes('/og/') && !page.includes('/odeme/') && !page.includes('llms'),
      serialize(item) {
        const path = item.url.slice(SITE.length)
        const other = counterpart(path)
        if (other) {
          const trPath = other.lang === 'tr' ? other.path : path
          const enPath = other.lang === 'en' ? other.path : path
          item.links = [
            { lang: 'tr-TR', url: SITE + trPath },
            { lang: 'en-US', url: SITE + enPath },
          ]
        }
        return item
      },
    }),
  ],
})
