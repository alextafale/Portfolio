/**
 * useSmoothScroll — Lenis-driven inertial scrolling.
 *
 * Lenis replaces the browser's native scroll with an interpolated one, which is
 * what gives product landings their weighted feel. It has to drive ScrollTrigger
 * too: GSAP samples scroll position on its own ticker by default, so without
 * wiring the two together every scroll-triggered animation fires at the wrong
 * moment once Lenis is in play.
 *
 * Call once, from the default layout.
 */

import { onMounted, onBeforeUnmount } from 'vue'

export function useSmoothScroll() {
  let lenis: import('lenis').default | null = null
  let gsapTickerFn: ((time: number) => void) | null = null

  onMounted(async () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ])

    gsap.registerPlugin(ScrollTrigger)

    lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker instead of its own RAF loop, so both stay
    // on a single frame clock. lagSmoothing(0) stops GSAP from silently
    // skipping time after a slow frame, which would desync the two.
    gsapTickerFn = (time: number) => lenis?.raf(time * 1000)
    gsap.ticker.add(gsapTickerFn)
    gsap.ticker.lagSmoothing(0)

    // Nuxt's own scroll restoration doesn't know about Lenis's virtual position.
    const router = useRouter()
    router.afterEach(() => {
      lenis?.scrollTo(0, { immediate: true })
      requestAnimationFrame(() => ScrollTrigger.refresh())
    })
  })

  onBeforeUnmount(async () => {
    if (gsapTickerFn) {
      const { gsap } = await import('gsap')
      gsap.ticker.remove(gsapTickerFn)
      gsapTickerFn = null
    }
    lenis?.destroy()
    lenis = null
  })
}
