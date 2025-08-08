export default defineNuxtConfig({
  compatibilityDate: '2025-08-08',
  devtools: { enabled: true },
  devServer: {
    port: 4000
  },
  modules: ['@unocss/nuxt', '@nuxtjs/color-mode', '@nuxtjs/i18n', '@nuxt/icon'],
  fonts: { provider: 'none' },
  app : {
    head : {
      title : 'snaptool',
      meta : [
        { name : 'description', content : 'snaptool' },
        { name : 'keywords', content : 'snaptool' },
        { name : 'viewport', content : 'width=device-width, initial-scale=1' }
      ],
    }
  },

  css : [
    '~/assets/css/reset.css'
  ],
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: ''
  },
  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'zh', name: '中文', file: 'zh.json' },
    ],
    defaultLocale: 'zh',
    strategy: 'no_prefix',
    lazy: true
  }
})