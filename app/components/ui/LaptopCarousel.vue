<template>
  <div
    class="lcar"
    :class="{ 'lcar--ready': ready }"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
  >
    <span class="lcar__glow" aria-hidden="true" />

    <div class="lcar__stage">
      <button
        v-for="(shot, i) in shots"
        :key="shot.src"
        type="button"
        class="lcar__item"
        :style="styleFor(i)"
        :aria-label="shot.alt"
        :aria-current="i === active"
        :tabindex="i === active ? 0 : -1"
        @click="go(i)"
      >
        <span class="lcar__window">
          <!-- macOS-style chrome: traffic lights plus an address field. -->
          <span class="lcar__chrome" aria-hidden="true">
            <span class="lcar__light lcar__light--close" />
            <span class="lcar__light lcar__light--min" />
            <span class="lcar__light lcar__light--max" />
            <span class="lcar__url">{{ shot.url ?? '' }}</span>
          </span>

          <span class="lcar__screen">
            <img :src="shot.src" :alt="shot.alt" class="lcar__img" loading="lazy" />
          </span>
        </span>

        <!-- Laptop base, so the window reads as a machine rather than a card. -->
        <span class="lcar__base" aria-hidden="true">
          <span class="lcar__notch" />
        </span>
      </button>
    </div>

    <div class="lcar__dots" role="tablist">
      <button
        v-for="(shot, i) in shots"
        :key="`dot-${shot.src}`"
        type="button"
        role="tab"
        class="lcar__dot"
        :class="{ 'lcar__dot--on': i === active }"
        :aria-selected="i === active"
        :aria-label="shot.alt"
        @click="go(i)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * LaptopCarousel — the phone carousel's desktop counterpart.
 *
 * Same arc mechanics: position, scale, depth and dimming all derive from one
 * signed distance to the active index, wrapped so the machines sit
 * symmetrically instead of piling up on one side.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'

export interface LaptopShot {
  src: string
  alt: string
  /** Shown in the chrome's address field. */
  url?: string
}

const props = withDefaults(defineProps<{
  shots: LaptopShot[]
  /** Milliseconds between automatic advances; 0 disables it. */
  interval?: number
}>(), {
  interval: 5000,
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

  let offset = i - active.value
  if (offset > n / 2) offset -= n
  if (offset < -n / 2) offset += n

  const distance = Math.abs(offset)

  return {
    // Landscape frames need more lateral travel than phones to clear each
    // other, and a steeper falloff so the stack stays readable.
    '--x': `${offset * 54}%`,
    '--scale': String(Math.max(0.6, 1 - distance * 0.19)),
    '--opacity': String(distance === 0 ? 1 : Math.max(0.16, 0.5 - (distance - 1) * 0.18)),
    '--blur': `${Math.min(distance * 2, 5)}px`,
    zIndex: String(100 - distance),
  }
}

onMounted(() => {
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
.lcar {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: clamp(20px, 3vw, 40px) 0;
}

.lcar__glow {
  position: absolute;
  top: 4%;
  width: min(76%, 760px);
  height: 72%;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(212, 255, 63, 0.13), transparent 68%);
  filter: blur(38px);
  pointer-events: none;
}

.lcar__stage {
  position: relative;
  width: 100%;
  height: clamp(300px, 40vw, 470px);
  perspective: 1800px;
}

.lcar__item {
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(300px, 46vw, 660px);
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

.lcar--ready .lcar__item {
  transition:
    transform 720ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 720ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 720ms cubic-bezier(0.16, 1, 0.3, 1);
}

.lcar__item:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 10px;
  border-radius: 16px;
}

/* ── Window ── */
.lcar__window {
  display: block;
  border-radius: 12px 12px 4px 4px;
  background: #1b1b1b;
  border: 1px solid var(--color-border-strong);
  box-shadow: 0 26px 60px rgba(0, 0, 0, 0.62);
  overflow: hidden;
}

.lcar__item[aria-current='true'] .lcar__window {
  border-color: rgba(212, 255, 63, 0.38);
  box-shadow:
    0 26px 60px rgba(0, 0, 0, 0.62),
    0 0 42px rgba(212, 255, 63, 0.15);
}

.lcar__chrome {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 12px;
  background: #232323;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.lcar__light {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
}

.lcar__light--close { background: #ff5f56; }
.lcar__light--min   { background: #ffbd2e; }
.lcar__light--max   { background: #27c93f; }

.lcar__url {
  flex: 1;
  margin-left: 10px;
  padding: 3px 12px;
  border-radius: var(--radius-pill);
  background: rgba(0, 0, 0, 0.35);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--color-text-muted);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lcar__screen {
  display: block;
  aspect-ratio: 16 / 10;
  background: var(--color-bg);
  overflow: hidden;
}

.lcar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

/* ── Laptop base ── */
.lcar__base {
  position: relative;
  display: block;
  width: 112%;
  height: 12px;
  margin-left: -6%;
  border-radius: 0 0 10px 10px;
  background: linear-gradient(180deg, #2e2e2e, #141414);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.55);
}

.lcar__notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 14%;
  height: 4px;
  border-radius: 0 0 5px 5px;
  background: rgba(0, 0, 0, 0.55);
}

/* ── Dots ── */
.lcar__dots {
  position: relative;
  display: flex;
  gap: 8px;
}

.lcar__dot {
  width: 26px;
  height: 3px;
  padding: 0;
  border: none;
  border-radius: var(--radius-pill);
  background: var(--color-border-strong);
  cursor: pointer;
  transition: background var(--transition-normal), box-shadow var(--transition-normal);
}

.lcar__dot--on {
  background: var(--color-accent);
  box-shadow: var(--glow-accent-soft);
}

.lcar__dot:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

@media (max-width: 720px) {
  /* Neighbours would swamp the active machine at this width. */
  .lcar__item { width: min(86vw, 420px); }
}
</style>
