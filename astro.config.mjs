// @ts-check
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

// Turkish is the primary language and lives at the root (`/`, `/works/…`).
// English is kept under `/en/`. Products and legal pages are Turkish-only.
// The host 301s slash-less URLs, so every route, canonical and sitemap entry
// carries a trailing slash (see docs/seo-audit.md).
export default defineConfig({
  site: 'https://lanista.com.tr',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'tr',
        locales: { tr: 'tr-TR', en: 'en-US' },
      },
      // OG image endpoints are not pages.
      filter: page => !page.includes('/og/'),
    }),
  ],
})
