<template>
  <div ref="wrapRef" class="scroll-tilt">
    <div ref="innerRef" class="scroll-tilt__inner">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ScrollTilt — a slab that rotates up out of perspective as it enters the
 * viewport, ported from the "container scroll animation" pattern to Vue.
 *
 * Driven by ScrollTrigger with scrub, so the rotation is tied to scroll
 * position rather than played on a timer — scrolling back up reverses it.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAnimations } from '~/composables/useAnimations'

const props = withDefaults(defineProps<{
  /** Starting rotation in degrees. */
  rotate?: number
  /** Starting scale. */
  scale?: number
}>(), {
  rotate: 22,
  scale: 0.92,
})

const wrapRef = ref<HTMLElement | null>(null)
const innerRef = ref<HTMLElement | null>(null)

const { initGsap } = useAnimations()

let trigger: import('gsap/ScrollTrigger').ScrollTrigger | null = null

onMounted(async () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!wrapRef.value || !innerRef.value) return

  const { gsap } = await initGsap()

  const tween = gsap.fromTo(
    innerRef.value,
    { rotateX: props.rotate, scale: props.scale, opacity: 0.55 },
    {
      rotateX: 0,
      scale: 1,
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapRef.value,
        start: 'top 88%',
        end: 'top 38%',
        scrub: 0.6,
      },
    },
  )

  trigger = tween.scrollTrigger ?? null
})

onBeforeUnmount(() => {
  trigger?.kill()
  trigger = null
})
</script>

<style scoped>
.scroll-tilt {
  /* Perspective lives on the parent so the child's rotateX has depth. */
  perspective: 1400px;
}

.scroll-tilt__inner {
  transform-style: preserve-3d;
  will-change: transform;
}
</style>
