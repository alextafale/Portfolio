<template>
  <div
    ref="cardRef"
    class="spotlight-card"
    :class="{ 'spotlight-card--active': active }"
    @pointerenter="active = true"
    @pointerleave="onLeave"
    @pointermove="onMove"
  >
    <span class="spotlight-card__glow" aria-hidden="true" />
    <span class="spotlight-card__edge" aria-hidden="true" />
    <div class="spotlight-card__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * SpotlightCard — cursor-tracked radial highlight, ported from the "spotlight
 * card" pattern to Vue.
 *
 * The pointer position is written to CSS custom properties and the gradients
 * are drawn by CSS, so moving the cursor never triggers a Vue re-render. Reads
 * of the bounding rect are cached per hover rather than per move event.
 */
import { ref, onBeforeUnmount } from 'vue'

withDefaults(defineProps<{ radius?: number }>(), { radius: 340 })

const cardRef = ref<HTMLElement | null>(null)
const active = ref(false)

let rect: DOMRect | null = null
let frame = 0
let pending: { x: number; y: number } | null = null

function apply() {
  frame = 0
  const el = cardRef.value
  if (!el || !pending) return
  el.style.setProperty('--spot-x', `${pending.x}px`)
  el.style.setProperty('--spot-y', `${pending.y}px`)
}

function onMove(e: PointerEvent) {
  const el = cardRef.value
  if (!el) return
  // Layout reads are expensive; take one per hover, not one per move.
  if (!rect) rect = el.getBoundingClientRect()
  pending = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  if (!frame) frame = requestAnimationFrame(apply)
}

function onLeave() {
  active.value = false
  rect = null
}

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
})
</script>

<style scoped>
.spotlight-card {
  position: relative;
  isolation: isolate;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: border-color var(--transition-normal), transform var(--transition-normal);
}

.spotlight-card--active {
  border-color: var(--color-border-strong);
  transform: translateY(-4px);
}

/* Wash that follows the cursor. */
.spotlight-card__glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0;
  transition: opacity var(--transition-normal);
  background: radial-gradient(
    380px circle at var(--spot-x, 50%) var(--spot-y, 50%),
    rgba(212, 255, 63, 0.13),
    transparent 62%
  );
}

/* A brighter, tighter pass masked to the border only, so the outline lights up
   where the cursor is instead of the whole edge. */
.spotlight-card__edge {
  position: absolute;
  inset: 0;
  z-index: 1;
  padding: 1px;
  border-radius: inherit;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition-normal);
  background: radial-gradient(
    260px circle at var(--spot-x, 50%) var(--spot-y, 50%),
    rgba(212, 255, 63, 0.7),
    transparent 60%
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.spotlight-card--active .spotlight-card__glow,
.spotlight-card--active .spotlight-card__edge {
  opacity: 1;
}

.spotlight-card__content {
  position: relative;
  z-index: 2;
  height: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .spotlight-card--active { transform: none; }
}
</style>
