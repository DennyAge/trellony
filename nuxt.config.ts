export default defineNuxtConfig( {
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/eslint',
    'vuetify-nuxt-module'
  ]
} ); 