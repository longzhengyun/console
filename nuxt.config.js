import cn from './assets/locales/cn'
import id from './assets/locales/id'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' }, // iOS浏览器禁止缩放
      { name: 'apple-mobile-web-app-status-bar-style', content: 'white' },
      { name: 'format-detection', content: 'email=no, telephone=no' },
      { name: 'renderer', content: 'webkit' }, // 强制让360浏览器使用Webkit内核
      { name: 'full-screen', content: 'yes' },
      { name: 'x5-fullscreen', content: 'true' },
      { name: 'x5-page-mode', content: 'app' },
      { name: 'browsermode', content: 'application' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/icon.png' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['element-ui/lib/theme-chalk/index.css', '@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/element-ui'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-i18n',
    'cookie-universal-nuxt',
  ],

  i18n: {
    locales: [
      {
        code: 'cn',
        name: '简体中文',
      },
      {
        code: 'id',
        name: 'Indonesia',
      },
    ],
    defaultLocale: 'cn',
    vueI18n: {
      fallbackLocale: 'cn',
      messages: {
        cn,
        id,
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true, // 代理
    baseURL: `http://${process.env.HOST || 'localhost'}:${
      process.env.PORT || 3000
    }`,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {
      config.externals = config.externals || {}
      config.externals.sqlite3 = 'commonjs sqlite3'
    },
  },

  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  },

  render: {
    http2: {
      push: true,
    },
    resourceHints: true, // false 禁用预加载渲染，解决多项目加载不相干js问题
  },

  cache: true,

  serverMiddleware: ['~/api/index.js'],
}
