import type { Directive } from 'vue'

type RevealEl = HTMLElement & { __reveal?: { kill: () => void; scrollTrigger?: { kill: () => void } } }

/**
 * v-reveal — text sharpens out of a blur as it scrolls into view, scrubbed to
 * the scroll position (so scrolling back blurs it again).
 *
 * The server renders the final, readable state; the blur is only applied on
 * the client, and never under prefers-reduced-motion.
 */
const reveal: Directive<RevealEl> = {
  getSSRProps: () => ({}),
  async mounted(el) {
    if (prefersReducedMotion()) return
    const { gsap } = await loadGsap()
    el.__reveal = gsap.fromTo(
      el,
      { opacity: 0.12, filter: 'blur(8px)' },
      {
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'clamp(top 96%)', end: 'clamp(top 62%)', scrub: true },
      },
    )
  },
  unmounted(el) {
    el.__reveal?.scrollTrigger?.kill()
    el.__reveal?.kill()
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', reveal)
})
