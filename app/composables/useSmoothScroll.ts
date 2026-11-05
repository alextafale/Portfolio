/**
 * useSmoothScroll — Lenis-driven inertial scrolling.
 *
 * Lenis replaces the browser's native scroll with an interpolated one. It has
 * to drive ScrollTrigger too: GSAP samples scroll position on its own ticker,
 * so without wiring the two together every scroll-linked animation (the
 * project stack, the blur reveals) would lag behind the page.
 *
 * Call `useSmoothScroll()` once, from the default layout. Anything else that
 * needs to scroll the page programmatically uses `scrollToTarget()`, so the
 * jump goes through Lenis instead of fighting it.
 */
import { onBeforeUnmount, onMounted, shallowRef } from 'vue'
import type Lenis from 'lenis'
import { loadGsap, prefersReducedMotion } from './useGsap'

const lenisRef = shallowRef<Lenis | null>(null)

export function scrollToTarget(target: string | HTMLElement | number, immediate = false) {
  const offset = typeof target === 'number' ? 0 : -8
  if (lenisRef.value) {
    lenisRef.value.scrollTo(target, { offset, immediate, duration: 1.4 })
    return
  }
  // Reduced motion or Lenis not booted yet: plain jump.
  if (typeof target === 'number') window.scrollTo({ top: target })
  else {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    el?.scrollIntoView({ block: 'start' })
  }
}

export function useSmoothScroll() {
  let tick: ((time: number) => void) | null = null

  onMounted(async () => {
    if (prefersReducedMotion()) return

    const [{ default: LenisCtor }, { gsap, ScrollTrigger }] = await Promise.all([
      import('lenis'),
      loadGsap(),
    ])

    const lenis = new LenisCtor({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenis.on('scroll', ScrollTrigger.update)

    // One frame clock for both: Lenis runs on GSAP's ticker, and
    // lagSmoothing(0) stops GSAP from skipping time after a slow frame.
    tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    lenisRef.value = lenis

    // Nuxt's scroll restoration doesn't know Lenis's virtual position. Reset
    // to the top on page change — unless the link targets a section anchor,
    // which the router's own scrollBehavior handles after the transition.
    useRouter().afterEach((to) => {
      if (!to.hash) lenis.scrollTo(0, { immediate: true })
      requestAnimationFrame(() => ScrollTrigger.refresh())
    })
  })

  onBeforeUnmount(async () => {
    if (tick) {
      const { gsap } = await loadGsap()
      gsap.ticker.remove(tick)
      tick = null
    }
    lenisRef.value?.destroy()
    lenisRef.value = null
  })
}
