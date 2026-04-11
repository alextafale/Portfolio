// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Global CSS
  css: ['~/assets/css/main.css'],

  modules: ['@nuxtjs/i18n'],

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'es', iso: 'es-ES', name: 'Español', file: 'es.json' }
    ],
    defaultLocale: 'es',
    langDir: 'locales',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  },

  // Components (disable path prefixing)
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // Vite plugins
  vite: {
    plugins: [tailwindcss()],
  },

  // App head: SEO + Google Fonts
  app: {
    head: {
      title: 'Alejandro Alejandre Tafolla — Full Stack Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Full Stack Developer specializing in Vue, Nuxt, TypeScript, Expo and Supabase. Building clean and scalable web & mobile applications.',
        },
        { name: 'author', content: 'Alejandro Alejandre Tafolla' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Alejandro Alejandre Tafolla — Full Stack Developer' },
        {
          property: 'og:description',
          content: 'Full Stack Developer specializing in Vue, Nuxt and TypeScript.',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
