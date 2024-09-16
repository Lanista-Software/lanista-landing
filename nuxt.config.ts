// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@lui-ui/lui-nuxt',
    '@nuxt/image',
    '@nuxt/eslint',
  ],
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
    vueI18n: './i18n.config.ts' // if you are using custom path, default
  },
  eslint: {
    config: {
      stylistic: true,
    }
  }
})