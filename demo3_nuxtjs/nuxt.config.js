export default {
  // environment variable
  publicRuntimeConfig: {
    frontURL: process.env.FRONT_URL || 'https://comony.net',
    apiURL: process.env.API_URL || 'https://api.comony.net',
    distributionId: process.env.DISTRIBUTION_ID,
    apiKeyName: process.env.API_KEY_NAME,
    apiKeyValue: process.env.API_KEY_VALUE,
    fonrtServerKeyName: process.env.FRONT_SERVER_KEY_NAME,
    fonrtServerKeyValue: process.env.FRONT_SERVER_KEY_VALUE,
    cognitoDomain: process.env.AWS_COGNITO_DOMAIN,
    cognitoClientId: process.env.AWS_COGNITO_CLIENT_ID,
    loginCookieDomain: process.env.LOGIN_COOKIE_DOMAIN,
    ticketSystem: {
      frontURL: process.env.TICKET_SYSTEM_FRONT_URL,
      apiURL: process.env.TICKET_SYSTEM_API_URL
    },
    axios: {
      browserBaseUrl: process.env.API_URL
    },
    gtm: {
      id: process.env.GTM_ID
    },
    recaptcha: {
      siteKey: process.env.RECAPTCHA_SITE_KEY,
      hideBadge: true,
      version: Number(process.env.RECAPTCHA_VERSION)
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'comony',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'comony'
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: process.env.FRONT_URL },
      { hid: 'og:image', property: 'og:image', content: '/og-image.png' },
      { hid: 'fb:app_id', name: 'fb:app_id', content: '2724727864478504' },
      { hid: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: '17843853' },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: `${process.env.FRONT_URL}/og-image.png`
      },
      {
        hid: 'msapplication-TileColor',
        name: 'msapplication-TileColor',
        content: '#f2f2f2'
      },
      { hid: 'theme-color', name: 'theme-color', content: '#ffffff' },
      {
        hid: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: 'comony'
      },
      {
        hid: 'application-name',
        name: 'application-name',
        content: 'comony'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        hid: 'apple-touch-icon',
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicons/apple-touch-icon.png'
      },
      {
        hid: 'icon',
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicons/icon-32x32.png'
      },
      {
        hid: 'icon',
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicons/icon-16x16.png'
      },
      {
        hid: 'apple-touch-icon',
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicons/apple-touch-icon.png'
      },
      {
        hid: 'apple-touch-icon',
        rel: 'apple-touch-icon',
        type: 'image/png',
        sizes: '36x36',
        href: '/favicons/android-chrome-36x36.png'
      }
    ]
  },

  loading: false,

  server: {
    port: process.env.FRONT_PORT, // default: 3000
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0' // default: localhost
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: '@/assets/scss/global.scss', lang: 'scss' }],

  // styleResources (import variables, mixins, functions (et cetera))
  styleResources: { scss: ['@/assets/scss/style.scss'] },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vue-content-placeholders.ts',
    '@/plugins/axios-accessor.ts',
    '@/plugins/axios.ts',
    '@/plugins/axios-ticket.ts',
    '@/plugins/repository-api.ts',
    '@/plugins/observe-visibility.ts',
    '@/plugins/directives.ts',
    '@/plugins/lazy-load.ts',
    { src: '@/plugins/quill-editor.ts', ssr: false },
    // use for custom tablet detect in Ipad
    { src: '@/plugins/custom-flag.ts', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
    // https://www.npmjs.com/package/@nuxtjs/device
    '@nuxtjs/device',
    // https://www.npmjs.com/package/@nuxtjs/google-fonts
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    families: {
      'Noto Sans JP': {
        wght: [100, 400, 500, 700, 900]
      }
    },
    display: 'swap'
  },

  // Detect device OS when resizing
  device: {
    refreshOnResize: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-compress',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/guide/setup
    '@nuxtjs/auth',
    // https://www.npmjs.com/package/@nuxtjs/style-resources
    '@nuxtjs/style-resources',
    // https://i18n.nuxtjs.org/
    '@nuxtjs/i18n',
    // https://www.npmjs.com/package/@nuxtjs/gtm
    '@nuxtjs/gtm',
    // https://www.npmjs.com/package/@nuxtjs/recaptcha
    '@nuxtjs/recaptcha'
  ],

  // Goole Tag Manager
  gtm: {
    id: 'GTM-55S8JWC',
    pageTracking: true
  },

  auth: {
    cookie: false,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'data.AuthenticationResult.IdToken'
          },
          logout: { url: '/auth/logout', method: 'post' },
          user: {
            url: '/users/account',
            method: 'get',
            propertyName: 'data'
          }
        },
        autoFetchUser: false,
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
    redirect: {
      login: '/login',
      logout: false,
      callback: '/login',
      home: false
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // baseURL: process.env.API_URL || 'http://localhost:3010',
  axios: {
    baseURL: process.env.API_URL,
    credentials: false
  },

  // storybook settings
  storybook: {
    // Run Storybook on localhost:6006
    port: 6006
  },

  // i18n settings
  i18n: {
    baseUrl: process.env.FRONT_URL,
    legacy: false,
    locales: [
      { code: 'ja', iso: 'ja', file: 'ja/index.js' },
      { code: 'en', iso: 'en', file: 'en/index.js' }
    ],
    defaultLocale: 'ja',
    vueI18nLoader: true,
    vueI18n: {
      fallbackLocale: 'ja'
    },
    lazy: true,
    langDir: 'locales/'
  },

  // recaptcha settings
  recaptcha: {
    size: 'normal',
    language: 'ja'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ]
    }
  }
}
