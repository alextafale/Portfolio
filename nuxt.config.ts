// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

const description =
  'Full stack software developer and AI engineer — end-to-end systems, from backend and data to AI agents in production.'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  modules: ['@nuxtjs/i18n'],

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'es', language: 'es-MX', name: 'Español', file: 'es.json' },
    ],
    // Absolute URLs for hreflang alternates and canonical links.
    baseUrl: 'https://alextafale.vercel.app',
    defaultLocale: 'es',
    restructureDir: 'app/i18n',
    langDir: 'locales',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  // The site used to have /proyects, /aboutme, /stack and /contact as separate
  // pages. They are now sections of the home page (or renamed), so old links —
  // from LinkedIn, CVs already sent, search results — redirect instead of 404.
  routeRules: {
    '/proyects': { redirect: { to: '/#trabajo', statusCode: 301 } },
    '/proyects/**': { redirect: { to: '/#trabajo', statusCode: 301 } },
    '/aboutme': { redirect: { to: '/#sobre-mi', statusCode: 301 } },
    '/stack': { redirect: { to: '/#sobre-mi', statusCode: 301 } },
    '/contact': { redirect: { to: '/#contacto', statusCode: 301 } },
    '/en/proyects': { redirect: { to: '/en#trabajo', statusCode: 301 } },
    '/en/proyects/**': { redirect: { to: '/en#trabajo', statusCode: 301 } },
    '/en/aboutme': { redirect: { to: '/en#sobre-mi', statusCode: 301 } },
    '/en/stack': { redirect: { to: '/en#sobre-mi', statusCode: 301 } },
    '/en/contact': { redirect: { to: '/en#contacto', statusCode: 301 } },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  vite: {
    plugins: [tailwindcss()],
    // Imported lazily (dynamic import), so Vite only discovers them at runtime
    // and reloads the page mid-load. Pre-bundling them avoids that in dev.
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger', 'lenis'],
    },
  },

  app: {
    head: {
      title: 'Alejandro Alejandre Tafolla — Full Stack Developer',
      htmlAttrs: { lang: 'es' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: description },
        { name: 'author', content: 'Alejandro Alejandre Tafolla' },
        { name: 'theme-color', content: '#ffffff' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Alejandro Alejandre Tafolla — Full Stack Developer' },
        { property: 'og:description', content: description },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400..600&family=Inter:opsz,wght@14..32,400..600&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
