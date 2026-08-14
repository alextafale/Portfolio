<template>
  <div
    class="carousel"
    :class="{ 'carousel--ready': ready }"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
  >
    <span class="carousel__glow" aria-hidden="true" />

    <div class="carousel__stage">
      <button
        v-for="(shot, i) in shots"
        :key="shot.src"
        type="button"
        class="carousel__phone"
        :style="styleFor(i)"
        :aria-label="shot.alt"
        :aria-current="i === active"
        :tabindex="i === active ? 0 : -1"
        @click="go(i)"
      >
        <span class="carousel__frame">
          <span class="carousel__notch" aria-hidden="true" />
          <img :src="shot.src" :alt="shot.alt" class="carousel__img" loading="lazy" />
        </span>
      </button>
    </div>

    <div class="carousel__dots" role="tablist">
      <button
        v-for="(shot, i) in shots"
        :key="`dot-${shot.src}`"
        type="button"
        role="tab"
        class="carousel__dot"
        :class="{ 'carousel__dot--on': i === active }"
        :aria-selected="i === active"
        :aria-label="shot.alt"
        @click="go(i)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * PhoneCarousel — device mockups on a shallow arc, ported to Vue.
 *
 * Phones are positioned by their signed distance from the active index, so
 * translation, scale, depth and dimming all fall out of one number. Neighbours
 * stay interactive, which is what makes the arc read as a carousel rather than
 * a slideshow.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'

export interface PhoneShot {
  src: string
  alt: string
}

const props = withDefaults(defineProps<{
  shots: PhoneShot[]
  /** Milliseconds between automatic advances; 0 disables it. */
  interval?: number
}>(), {
  interval: 4200,
})

const active = ref(0)
const paused = ref(false)
const ready = ref(false)

let timer: ReturnType<typeof setInterval> | null = null

function go(i: number) {
  active.value = i
}

function styleFor(i: number) {
  const n = props.shots.length

  // Wrap the offset into [-n/2, n/2] so the phones sit symmetrically around
  // the active one. A plain `i - active` puts every other phone on the same
  // side, leaving the arc lopsided and the far side empty — and it makes the
  // auto-advance snap back instead of looping continuously.
  let offset = i - active.value
  if (offset > n / 2) offset -= n
  if (offset < -n / 2) offset += n

  const distance = Math.abs(offset)

  return {
    // Spacing tightens as phones recede, which is what gives the row depth.
    '--x': `${offset * 62}%`,
    '--scale': String(Math.max(0.66, 1 - distance * 0.16)),
    '--opacity': String(distance === 0 ? 1 : Math.max(0.2, 0.62 - (distance - 1) * 0.2)),
    '--blur': `${Math.min(distance * 1.6, 4)}px`,
    zIndex: String(100 - distance),
  }
}

onMounted(() => {
  // Deferred so the first paint is the resting layout; without it every phone
  // animates in from the centre on load.
  requestAnimationFrame(() => { ready.value = true })

  if (props.interval <= 0) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  timer = setInterval(() => {
    if (paused.value) return
    active.value = (active.value + 1) % props.shots.length
  }, props.interval)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
  timer = null
})
</script>

<style scoped>
.carousel {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 34px;
  padding: clamp(24px, 4vw, 48px) 0;
}

.carousel__glow {
  position: absolute;
  top: 6%;
  width: min(70%, 620px);
  height: 70%;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(212, 255, 63, 0.14), transparent 68%);
  filter: blur(34px);
  pointer-events: none;
}

.carousel__stage {
  position: relative;
  width: 100%;
  height: clamp(360px, 52vw, 540px);
  perspective: 1600px;
}

/* ── Phone ── */
.carousel__phone {
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(160px, 22vw, 240px);
  aspect-ratio: 9 / 19;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  transform:
    translate(-50%, -50%)
    translateX(var(--x))
    scale(var(--scale));
  opacity: var(--opacity);
  filter: blur(var(--blur));
}

/* Only animate once the resting positions have been applied. */
.carousel--ready .carousel__phone {
  transition:
    transform 700ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 700ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 700ms cubic-bezier(0.16, 1, 0.3, 1);
}

.carousel__phone:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 8px;
  border-radius: 36px;
}

.carousel__frame {
  position: relative;
  display: block;
  height: 100%;
  padding: 7px;
  border-radius: 34px;
  background: linear-gradient(160deg, #2c2c2c, #0d0d0d);
  border: 1px solid var(--color-border-strong);
  box-shadow: 0 30px 64px rgba(0, 0, 0, 0.62);
  overflow: hidden;
}

.carousel__phone[aria-current='true'] .carousel__frame {
  border-color: rgba(212, 255, 63, 0.4);
  box-shadow:
    0 30px 64px rgba(0, 0, 0, 0.62),
    0 0 40px rgba(212, 255, 63, 0.16);
}

.carousel__notch {
  position: absolute;
  top: 7px;
  left: 50%;
  transform: translateX(-50%);
  width: 36%;
  height: 16px;
  border-radius: 0 0 12px 12px;
  background: #0d0d0d;
  z-index: 2;
}

.carousel__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  border-radius: 27px;
  display: block;
}

/* ── Dots ── */
.carousel__dots {
  position: relative;
  display: flex;
  gap: 8px;
}

.carousel__dot {
  width: 26px;
  height: 3px;
  padding: 0;
  border: none;
  border-radius: var(--radius-pill);
  background: var(--color-border-strong);
  cursor: pointer;
  transition: background var(--transition-normal), box-shadow var(--transition-normal);
}

.carousel__dot--on {
  background: var(--color-accent);
  box-shadow: var(--glow-accent-soft);
}

.carousel__dot:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

@media (max-width: 640px) {
  /* Neighbours would overlap the active phone at this width. */
  .carousel__phone { width: clamp(150px, 46vw, 200px); }
}
</style>
