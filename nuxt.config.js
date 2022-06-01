export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'lanista-landing',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/lanista-logo.svg' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/tailwind.css', 'remixicon/fonts/remixicon.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~plugins/firebase.js', ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxt/postcss8',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/google-analytics',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/sitemap',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Lanista Software',
      short_name: 'Lanista',
      lang: 'en',
      useWebmanifestExtension: false,
    },
    meta: {
      name: 'Lanista Software',
      author: 'Lanista Software',
      description: 'Lanista Software',
      mobileApp: true,
      nativeUI: true,
      favicon: true,
      mobileAppIOS: true,
      viewport: 'width=device-width, initial-scale=1',
      'og:title': 'Lanista Software',
      'og:description': 'Lanista Software',
      'og:url': 'https://lanista.com.tr/',
      'og:type': 'website',
      'og:image:width': '1200',
      'og:image:height': '630',
      'twitter:card': 'twitter card',
      'twitter:site': 'https://twitter.com/lanistasoftware',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},
  sitemap: {
    hostname: 'https://lanista.com.tr/',
  },
  // googleAnalytics: {
  //   id: 'UA-XXX-X',
  //   autoTracking: {
  //     screenview: true,
  //   },
  // },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
        'postcss-nested': {},
        // '@tailwindcss/typography':{},
      },
    },
  },
}
