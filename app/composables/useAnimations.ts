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

  const scrollStagger = (
    targets: any, // Using any here to allow GSAP's flexible target selection
    options: FadeInOptions = {},
  ) => {
    const { delay = 0, duration = 0.7, y = 40, stagger = 0.15 } = options

    if (!gsap || !ScrollTrigger) return

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
        scrollTrigger: {
          trigger: typeof targets === 'string' ? targets : targets[0] as Element,
          start: 'top 90%',
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
   * Magnetic effect for buttons/links
   */
  const magneticEffect = (el: HTMLElement, strength = 0.5) => {
    if (!gsap) return

    const g = gsap
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      g.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out'
      })
    })

    el.addEventListener('mouseleave', () => {
      g.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.4)'
      })
    })
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

  /**
   * Split words helper to wrap each word in a span for animation
   */
  const splitWords = (el: HTMLElement) => {
    const text = el.innerText
    el.innerHTML = text
      .split(' ')
      .map(word => `<span class="word-wrapper" style="display: inline-block; overflow: hidden; vertical-align: bottom;">
                      <span class="word" style="display: inline-block; transform: translateY(110%);">
                        ${word}&nbsp;
                      </span>
                    </span>`)
      .join('')
  }

  /**
   * Enhanced text reveal animation (word by word)
   */
  const animateTextReveal = (target: string | HTMLElement, options: FadeInOptions = {}) => {
    const { delay = 0, duration = 1.2, stagger = 0.03 } = options
    if (!gsap || !ScrollTrigger) return

    const g = gsap
    const el = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target
    if (!el) return

    splitWords(el)
    const words = el.querySelectorAll('.word')

    g.to(words, {
      y: '0%',
      duration,
      delay,
      stagger,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 95%',
        once: true
      }
    })
  }

  /**
   * Simple typewriter effect
   */
  const typewriterEffect = (target: string | HTMLElement, text: string, options: { speed?: number, delay?: number } = {}) => {
    const { speed = 0.05, delay = 0 } = options
    if (!gsap) return

    const el = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target
    if (!el) return

    el.innerText = ''
    const chars = text.split('')

    gsap.to({}, {
      duration: chars.length * speed,
      delay,
      onUpdate: function () {
        const charIdx = Math.floor(this.progress() * chars.length)
        if (el.innerText.length < charIdx) {
          el.innerText = text.substring(0, charIdx)
        }
      }
    })
  }

  /**
   * Blur and fade-in (great for subtitles)
   */
  const blurFadeIn = (target: string | HTMLElement, options: FadeInOptions = {}) => {
    const { delay = 0, duration = 1.5, y = 10 } = options
    if (!gsap || !ScrollTrigger) return

    gsap.fromTo(target,
      { opacity: 0, y, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: target,
          start: 'top 95%',
          once: true
        }
      }
    )
  }

  return { initGsap, fadeInUp, staggerIn, scrollFadeIn, scrollStagger, animateSvgHover, magneticEffect, animateTextReveal, typewriterEffect, blurFadeIn, pageTransition }
}
