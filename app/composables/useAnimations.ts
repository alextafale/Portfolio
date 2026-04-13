/**
 * useAnimations — GSAP animation composable
 * Provides reusable entrance animations for portfolio sections.
 */

import { onMounted, onUnmounted } from 'vue'

interface FadeInOptions {
  delay?: number
  duration?: number
  y?: number
  stagger?: number
}

export function useAnimations() {
  let gsap: typeof import('gsap').gsap | null = null
  let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null

  const initGsap = async () => {
    const gsapModule = await import('gsap')
    const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')
    gsap = gsapModule.gsap
    ScrollTrigger = ST
    gsap.registerPlugin(ST)
    return { gsap, ScrollTrigger }
  }

  /**
   * Fade-in-up animation for a single element or selector
   */
  const fadeInUp = (
    target: string | Element,
    options: FadeInOptions = {},
  ) => {
    const { delay = 0, duration = 0.8, y = 30 } = options

    if (!gsap) return

    gsap.fromTo(
      target,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
      },
    )
  }

  /**
   * Stagger fade-in for multiple elements
   */
  const staggerIn = (
    targets: string | Element[],
    options: FadeInOptions = {},
  ) => {
    const { delay = 0, duration = 0.7, y = 24, stagger = 0.12 } = options

    if (!gsap) return

    gsap.fromTo(
      targets,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
      },
    )
  }

  /**
   * Scroll-triggered fade-in for sections
   */
  const scrollFadeIn = (
    target: string | Element,
    options: FadeInOptions = {},
  ) => {
    const { duration = 0.8, y = 40 } = options

    if (!gsap || !ScrollTrigger) return

    gsap.fromTo(
      target,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: target as string,
          start: 'top 85%',
          once: true,
        },
      },
    )
  }

  /**
   * Complex hover animation for SVGs inside a container
   */
  const animateSvgHover = (
    container: string | Element,
    isHovering: boolean
  ) => {
    if (!gsap) return

    // You can customize the selector based on the classes we put in the SVGs
    const shapes1 = (container as HTMLElement).querySelectorAll('.anim-shape-1')
    const shapes2 = (container as HTMLElement).querySelectorAll('.anim-shape-2')
    const shapes3 = (container as HTMLElement).querySelectorAll('.anim-shape-3, .anim-shape-4, .anim-shape-5')

    if (isHovering) {
      gsap.to(shapes1, { y: -4, scale: 1.05, duration: 0.4, ease: 'back.out(1.5)', transformOrigin: 'center' })
      gsap.to(shapes2, { x: 3, opacity: 0.8, duration: 0.3, stagger: 0.05, ease: 'power2.out' })
      gsap.to(shapes3, { scale: 1.1, rotation: 5, duration: 0.5, ease: 'power3.out', transformOrigin: 'center' })
    } else {
      gsap.to([shapes1, shapes2, shapes3], { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
    }
  }

  /**
   * Page transition hooks for Nuxt
   */
  const pageTransition = {
    onEnter: (el: Element, done: () => void) => {
      if (!gsap) {
        done()
        return
      }
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.98, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power3.out', onComplete: done }
      )
    },
    onLeave: (el: Element, done: () => void) => {
      if (!gsap) {
        done()
        return
      }
      gsap.to(el, { opacity: 0, scale: 0.98, y: -15, duration: 0.4, ease: 'power3.in', onComplete: done })
    }
  }

  return { initGsap, fadeInUp, staggerIn, scrollFadeIn, animateSvgHover, pageTransition }
}
