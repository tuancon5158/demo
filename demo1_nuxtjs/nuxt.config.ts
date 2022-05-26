import { join } from 'path'
import webpack from 'webpack'
import { NuxtConfig } from '@nuxt/types'
import config from './config'

const nuxtConfig: NuxtConfig = {
  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-ssr
  ssr: false,

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-modern
  // modern: !config.isDev && 'client',

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // https://nuxtjs.org/docs/2.x/features/loading
  loading: false,

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-telemetry
  telemetry: true,

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-global-name
  globalName: config.nuxt.globalName,

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-watch
  watch: ['@/config/*'],

  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-alias
  alias: {
    '@base': join(__dirname, './components/elements'),
    '@page': join(__dirname, './components/pages'),
    '@select': join(__dirname, './components/select'),
    '@form': join(__dirname, './components/form'),
    '@button': join(__dirname, './components/button'),
    '@checkbox': join(__dirname, './components/checkbox'),
    '@table': join(__dirname, './components/table'),
    '@common': join(__dirname, './components/common'),
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/guide/setup
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
    // https://github.com/nuxt-community/device-module#readme
  ],
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
    // https://typescript.nuxtjs.org
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd',
    '@/plugins/axios',
    '@/plugins/dayjs',
    '@/plugins/globalComponents',
    '~/plugins/directives',
  ],
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/styles/utility.pcss'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: false,

    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },

    // @ts-ignore
    postcss: {
      plugins: {
        'postcss-import': true,
        'postcss-nesting': true,
        'postcss-nested': true,
      },
    },

    plugins: [
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-us|vi/),
      new webpack.NormalModuleReplacementPlugin(
        /element-ui[/\\]lib[/\\]locale[/\\]lang[/\\]zh-CN/,
        'element-ui/lib/locale/lang/vi'
      ),
    ],

    extend(config) {
      config.module?.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      })
    },
  },
  server: {
    port: 3001,
    host: '0.0.0.0',
  },

  router: {
    prefetchLinks: true,
    linkActiveClass: 'link-active',
    linkExactActiveClass: 'link-exact-active',
    middleware: ['auth', 'admin'],
  },

  publicRuntimeConfig: {
    monthFormat: config.monthFormat,
    dateFormat: config.dateFormat,
    dateTimeFormat: config.dateTimeFormat,
    timeFormat: config.timeFormat,
    shortTimeFormat: config.shortTimeFormat,
    mediaBaseURL: process.env.MEDIA_BASE_URL || 'https://mediax.thinkpro.vn',
  },

  auth: {
    redirect: {
      login: '/auth/login',
      logout: '/',
      callback: '/auth/login',
      home: '/',
    },
    strategies: {
      customStrategy: {
        scheme: '@/config/customScheme',
        token: {
          property: 'token',
          required: true,
          type: 'Bearer',
        },
        user: {
          property: 'data',
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/cms/login', method: 'post' },
          logout: false,
          user: { url: '/cms/currentUser', method: 'get' },
        },
      },
    },
    scopeKey: 'permissions',
    plugins: ['@/plugins/permission.ts'],
  },

  pwa: {
    icon: {
      purpose: 'maskable',
    },

    meta: {
      viewport:
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, minimal-ui, viewport-fit=cover',
      author: config.app.author,
      mobileApp: true,
      nativeUI: true,
    },

    manifest: {
      name: config.app.name,
      short_name: config.app.shortName,
      description: config.app.description,
      lang: config.app.lang,
      theme_color: config.app.themeColor,
      background_color: config.app.backgroundColor,
      display: 'standalone',
    },
  },

  tailwindcss: {
    viewer: false,
    exposeConfig: false,
  },

  axios: {
    baseURL: process.env.BASE_URL,
    debug: process.env.NODE_ENV !== 'production',
  },
}

export default nuxtConfig
