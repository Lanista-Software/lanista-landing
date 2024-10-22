// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@lui-ui/lui-nuxt',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/scripts',
  ],
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