/**
 * Lazily loads GSAP + ScrollTrigger on the client and registers the plugin
 * once. Importing it dynamically keeps ~70 KB of animation code out of the
 * server bundle and off the critical path.
 */
type GsapBundle = {
  gsap: typeof import('gsap').gsap
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger
}

let bundle: Promise<GsapBundle> | null = null

export function loadGsap(): Promise<GsapBundle> {
  bundle ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)
      return { gsap, ScrollTrigger }
    },
  )
  return bundle
}

export const prefersReducedMotion = () =>
  import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
