// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  site: {
    url: 'https://lanista.com.tr',
    trailingSlash: true,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@lui-ui/lui-nuxt',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@nuxtjs/sitemap',
    'nuxt-og-image',
  ],
  ogImage: {
    // Case study covers are SVG logos, which no social scraper renders, so every
    // page fell back to one shared brand card. Generate a real 1200x630 PNG per
    // page at prerender time instead.
    defaults: { component: 'OgCard', width: 1200, height: 630 },
    // Only the fonts the card template uses.
    fonts: ['Space+Grotesk:700', 'Inter:400'],
  },
  sitemap: {
    // Routes (incl. dynamic service pages) and per-locale hreflang are auto-discovered
    // by @nuxtjs/sitemap via the @nuxtjs/i18n integration. `site.trailingSlash` keeps
    // sitemap URLs aligned with the canonical (trailing-slash) form.
    autoLastmod: true,
  },
  scripts: {
    registry: {
      googleAnalytics: {
        id: 'G-T48ZEC3WT9',
      },
    },
  },
  css: ['remixicon/fonts/remixicon.css'],
  googleFonts: {
    families: {
      'Inter': [400, 500, 600, 700],
      'Space Grotesk': [400, 500, 600, 700],
    },
  },
  image: {
    provider: 'ipx',
    dir: 'public',
  },
  i18n: {
    locales: ['en', 'tr'],
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts', // if you are using custom path, default
    // The host 301s slash-less URLs. Emitting the trailing slash from `localePath`
    // keeps internal links, canonicals and the sitemap on the same URL form —
    // otherwise every crawled link lands in Search Console as "Page with redirect".
    trailingSlash: true,
    // No automatic locale redirect. The site is statically generated and the
    // /api/* routes do not exist in the output, so a client-side locale switch
    // could not refetch content — `/` redirected to `/tr/` and rendered a mixed
    // page (Turkish chrome, English body). Locale is chosen by URL: `/` is
    // English, `/tr/` is Turkish, and the header switcher links between them.
    detectBrowserLanguage: false,
  },
  eslint: {
    config: {
      // Stylistic rules come from @antfu/eslint-config (as `style/*`). Enabling
      // them here too made every formatting issue report twice, once as
      // `@stylistic/*` and once as `style/*`.
      stylistic: false,
      // The generated config is composed with @antfu/eslint-config in
      // eslint.config.mjs; standalone would register a second `import` plugin
      // instance and ESLint refuses to load both.
      standalone: false,
    },
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY || '',
    },
  },
  // add scroll behavior
  router: {
    options: {
      // hashMode: true,
      scrollBehaviorType: 'smooth',
    },
  },
})
