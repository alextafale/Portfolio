<template>
  <div ref="rootRef" class="stream" :class="{ 'stream--dim': dim }">
    <div class="stream__corridor" aria-hidden="true" :style="corridorStyle">
      <div class="stream__space">
        <div
          v-for="card in cards"
          :key="card.key"
          class="stream__card"
          :style="card.style"
        >
          <img
            v-if="card.src"
            :src="card.src"
            alt=""
            class="stream__img"
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        </div>
      </div>
    </div>

    <div class="stream__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ImageStream — a corridor of images rushing toward the viewer.
 *
 * Perspective does the work that looks like two separate animations: as a
 * card's z grows it gets larger *and* its on-screen x sweeps outward from the
 * vanishing point, because the projection scales position and size by the same
 * factor. Three details shape the result:
 *
 * 1. Depth is authored as apparent *size*, geometrically — each card is a
 *    constant ratio larger than the one behind it. Spacing a linear z-range
 *    evenly instead makes the near cards tear apart as the projection blows up.
 * 2. The rails open hard early and then hold (`fan` > 1). That opening cancels
 *    the still-slow growth far back, so the ribbon leaves the centre as a flat
 *    band, bends once, then runs out along the diagonal.
 * 3. A card is born *across* the axis (`railBirth` is negative) and dies with
 *    its inner edge well past the frame. The centre therefore stays covered at
 *    every instant instead of blinking open once per cycle.
 *
 * Every length is in `cqw` — a percentage of the container's width — so the
 * corridor keeps its proportions at any size.
 */
import { computed, useId } from 'vue'

export interface StreamImage {
  src: string
  alt?: string
}

/**
 * Corridor geometry. These interact: the ribbon only stays solid while
 * consecutive cards overlap, which needs the birth-to-exit size spread shared
 * across enough cards. Raising `exitHeight`, lowering `cards`, or pulling
 * `railExit` inward all push toward a visible tear near the frame edge.
 */
export interface CorridorPath {
  /** Projection strength. Lower is wider-angle and more dramatic. */
  perspective?: number
  cardWidth?: number
  cardHeight?: number
  cardRadius?: number
  /** On-screen card height at the waist, where a card is born. */
  birthHeight?: number
  /** On-screen card height as a card leaves the frame. */
  exitHeight?: number
  /** Lateral offset at birth; negative starts the card across the axis. */
  railBirth?: number
  /** Lateral offset once the rails have finished opening. */
  railExit?: number
  /** How front-loaded the opening is. Above 1 opens early, then holds. */
  fan?: number
  turnBirth?: number
  turnExit?: number
  /** Keyframe samples used to trace the curve. Raise if motion looks faceted. */
  stops?: number
}

const DEFAULT_PATH: Required<CorridorPath> = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.4,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
}

const props = withDefaults(defineProps<{
  images: StreamImage[]
  /** Cards per rail. More is a denser corridor, not a faster one. */
  count?: number
  /** Seconds for one card to travel the whole corridor. */
  speed?: number
  /** Vertical placement of the corridor axis, as a percentage of height. */
  axis?: number
  path?: CorridorPath
  /** Darkens the corridor so overlaid copy stays readable. */
  dim?: boolean
}>(), {
  count: 9,
  speed: 18,
  axis: 55,
  dim: true,
})

// Animation names must be unique per instance: two streams on one page would
// otherwise share (and clobber) each other's keyframes.
const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
const railRight = `ish-r-${uid}`
const railLeft = `ish-l-${uid}`

const path = computed<Required<CorridorPath>>(() => ({ ...DEFAULT_PATH, ...props.path }))

/** Sample the path once so the CSS keyframes trace the real curve. */
function keyframes(dir: 1 | -1, name: string, p: Required<CorridorPath>) {
  const steps: string[] = []
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops
    const scale = (p.birthHeight / p.cardHeight) * Math.pow(p.exitHeight / p.birthHeight, u)
    const z = p.perspective * (1 - 1 / scale)
    const rail = p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan)
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u
    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(2)}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`,
    )
  }
  return `@keyframes ${name}{${steps.join('')}}`
}

const css = computed(() => {
  const p = path.value
  return (
    keyframes(1, railRight, p) +
    keyframes(-1, railLeft, p) +
    // Pausing rather than disabling keeps the corridor whole: each card is
    // already dropped mid-flight by its negative delay, so it freezes as a
    // finished still instead of collapsing onto the axis.
    `@media(prefers-reduced-motion:reduce){.stream__card{animation-play-state:paused}}`
  )
})

// Generated keyframes cannot live in scoped CSS, and they must survive SSR so
// the corridor is not blank on first paint.
useHead({ style: [{ id: `stream-${uid}`, textContent: css }] })

const corridorStyle = computed(() => ({
  perspective: `${path.value.perspective}cqw`,
  perspectiveOrigin: `50% ${props.axis}%`,
}))

const cards = computed(() => {
  const p = path.value
  const list: { key: string; src?: string; style: Record<string, string> }[] = []

  for (const name of [railRight, railLeft]) {
    for (let i = 0; i < props.count; i++) {
      // Both rails walk the same sequence, so the left mirrors the right at
      // every depth and the corridor reads as one stream.
      const img = props.images[i % Math.max(props.images.length, 1)]
      list.push({
        key: `${name}-${i}`,
        src: img?.src,
        style: {
          left: '50%',
          top: `${props.axis}%`,
          width: `${p.cardWidth}cqw`,
          height: `${p.cardHeight}cqw`,
          marginLeft: `${-p.cardWidth / 2}cqw`,
          marginTop: `${-p.cardHeight / 2}cqw`,
          borderRadius: `${p.cardRadius}cqw`,
          animation: `${name} ${props.speed}s linear infinite`,
          // Negative delay drops each card mid-flight, so the corridor is
          // already full on the very first frame.
          animationDelay: `${-(i * props.speed) / props.count}s`,
        },
      })
    }
  }

  return list
})
</script>

<style scoped>
.stream {
  position: relative;
  overflow: hidden;
  /* cqw units below resolve against this element's width. */
  container-type: inline-size;
}

.stream__corridor {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.stream__space {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
}

.stream__card {
  position: absolute;
  overflow: hidden;
  backface-visibility: hidden;
  border: 1px solid rgba(245, 245, 245, 0.06);
}

.stream__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Veils the corridor and fades its edges into the page so overlaid copy stays
   legible and the stream has no hard boundary. */
.stream--dim::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 62% 58% at 50% 55%, rgba(10, 10, 10, 0.35), rgba(10, 10, 10, 0.88) 78%),
    linear-gradient(to bottom, var(--color-bg) 0%, transparent 22%, transparent 72%, var(--color-bg) 100%);
}

.stream__content {
  position: relative;
  z-index: 1;
  height: 100%;
}
</style>
