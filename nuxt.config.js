import pwaData from './content/contentrain/Pwa/en.json'

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
      { name: 'theme-color', content: '#001733' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/lanista-logo.svg' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/tailwind.css', 'remixicon/fonts/remixicon.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/directives.js', ssr: false },
    { src: '~plugins/firebase.js', ssr: false },
  ],

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
    '@nuxtjs/robots',
    '@nuxt/image',
    '@nuxtjs/sitemap',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      icons: [pwaData[0].icon.icons],
      // [
      //   {
      //     src: 'static/icons/icon-48x48.png',
      //     sizes: '48x48',
      //     type: 'image/png',
      //     purpose: 'maskable any',
      //   },
      //   {
      //     src: 'static/icons/icon-72x72.png',
      //     sizes: '72x72',
      //     type: 'image/png',
      //     purpose: 'maskable any',
      //   },
      //   {
      //     src: 'static/icons/icon-96x96.png',
      //     sizes: '96x96',
      //     type: 'image/png',
      //     purpose: 'maskable any',
      //   },
      //   {
      //     src: 'static/icons/icon-128x128.png',
      //     sizes: '128x128',
      //     type: 'image/png',
      //     purpose: 'maskable any',
      //   },
      //   {
      //     src: 'static/icons/icon-144x144.png',
      //     sizes: '144x144',
      //     type: 'image/png',
      //     purpose: 'maskable any',
      //   },
      //   {
      //     src: 'static/icons/icon-152x152.png',
      //     sizes: '152x152',
      //     type: 'image/png',
      //     purpose: 'maskable any',
      //   },
      //   {
      //     src: 'static/icons/icon-192x192.png',
      //     sizes: '192x192',
      //     type: 'image/png',
      //     purpose: 'maskable any',
      //   },
      //   {
      //     src: 'static/icons/icon-384x384.png',
      //     sizes: '384x384',
      //     type: 'image/png',
      //     purpose: 'maskable any',
      //   },
      //   {
      //     src: 'static/icons/icon-512x512.png',
      //     sizes: '512x512',
      //     type: 'image/png',
      //     purpose: 'maskable any',
      //   },
      // ],
    },
    manifest: pwaData[0].manifest,
    // {
    //   name: 'Lanista Software',
    //   short_name: 'Lanista',
    //   lang: 'en',
    //   useWebmanifestExtension: false,
    //   theme_color: '#001733',
    //   icons: [
    //     {
    //       src: 'static/icons/icon-192x192.png',
    //       sizes: '192x192',
    //       type: 'image/png',
    //     },
    //     {
    //       src: 'static/icons/icon-512x512.png',
    //       sizes: '512x512',
    //       type: 'image/png',
    //     },
    //   ],
    // },
    meta: {
      name: pwaData[0].metaData.name,
      author: pwaData[0].metaData.author,
      description: pwaData[0].metaData.description,
      mobileApp: pwaData[0].metaData.mobileApp,
      nativeUI: pwaData[0].metaData.nativeUI,
      favicon: pwaData[0].metaData.favicon,
      mobileAppIOS: pwaData[0].metaData.mobileAppIOS,
      viewport: pwaData[0].metaData.viewport,
      'og:title': pwaData[0].metaData.ogTitle,
      'og:description': pwaData[0].metaData.ogDescription,
      'og:url': pwaData[0].metaData.ogUrl,
      'og:type': pwaData[0].metaData.ogType,
      'og:image:width': pwaData[0].metaData.ogWidth,
      'og:image:height': pwaData[0].metaData.ogHeight,
      'twitter:card': pwaData[0].metaData.twitterCard,
      'twitter:site': pwaData[0].metaData.twitterSite,
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},
  sitemap: {
    hostname: 'https://lanista.com.tr/',
  },
  googleAnalytics: {
    id: 'G-EN9EYP19LG',
    autoTracking: {
      screenview: true,
    },
  },
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
  robots: [
    {
      UserAgent: '*',
      Disallow: '/_nuxt/',
    },
  ],
}
