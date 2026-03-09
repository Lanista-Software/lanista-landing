// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  site: {
    url: 'https://lanista.com.tr',
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
  ],
  sitemap: {
    urls: [
      {
        loc: '/',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 1.0,
        alternatives: [
          { hreflang: 'en', href: 'https://lanista.com.tr/' },
          { hreflang: 'tr', href: 'https://lanista.com.tr/' },
          { hreflang: 'x-default', href: 'https://lanista.com.tr/' },
        ],
      },
      {
        loc: '/services/nestjs-microservice-development',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.8,
      },
      {
        loc: '/services/react-native-mobile-app-development',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.8,
      },
      {
        loc: '/services/saas-platform-development',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.8,
      },
      {
        loc: '/services/nuxtjs-vuejs-web-application-development',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.8,
      },
      {
        loc: '/services/payment-integration-development',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.8,
      },
      {
        loc: '/services/pos-application-development',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.8,
      },
      {
        loc: '/services/ai-powered-software-development',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.8,
      },
    ],
  },
  scripts:{
    registry:{
      googleAnalytics:{
        id: 'G-T48ZEC3WT9'
      }
    }
  },
  css: ['remixicon/fonts/remixicon.css'],
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
      "Space Grotesk": [400, 500, 600, 700],
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
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
    },
  },
  eslint: {
    config: {
      stylistic: true,
    }
  },
  //add scroll behavior
  router: {
    options: {
      // hashMode: true,
      scrollBehaviorType: 'smooth',
    },
  },
})