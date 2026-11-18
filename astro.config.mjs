// @ts-check
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

const SITE = 'https://lanista.com.tr'
// Pages whose slug differs per language (keep in sync with ROUTES in src/lib/i18n.ts).
const LOCALIZED_PAIRS = [
  ['/iletisim/', '/en/contact/'],
  ['/hizmetler/', '/en/services/'],
  ['/surec/', '/en/process/'],
]

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
        const pair = LOCALIZED_PAIRS.find(p => p.some(path => item.url === SITE + path))
        if (pair) {
          item.links = [
            { lang: 'tr-TR', url: SITE + pair[0] },
            { lang: 'en-US', url: SITE + pair[1] },
          ]
        }
        return item
      },
    }),
  ],
})
