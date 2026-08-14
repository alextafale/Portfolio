<template>
  <div class="device" :style="{ '--speed': `${speed}s` }">
    <span class="device__glow" aria-hidden="true" />

    <!-- Floating glass panels orbiting the device. -->
    <span
      v-for="panel in panels"
      :key="panel.id"
      class="device__panel"
      :class="`device__panel--${panel.id}`"
      aria-hidden="true"
    >
      <span class="device__panel-bar" />
      <span class="device__panel-bar device__panel-bar--short" />
    </span>

    <div class="device__frame">
      <span class="device__notch" aria-hidden="true" />

      <div class="device__screen">
        <!-- The list is rendered twice so the strip can translate by exactly
             -50% and land the copy where the original started — a seam-free
             loop without measuring anything at runtime. -->
        <div class="device__strip">
          <img
            v-for="(src, i) in [...shots, ...shots]"
            :key="`${src}-${i}`"
            :src="src"
            alt=""
            class="device__shot"
            loading="lazy"
          />
        </div>

        <span class="device__screen-fade" aria-hidden="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DeviceShowcase — a phone whose feed scrolls continuously, ringed by drifting
 * glass panels.
 *
 * The strip loop is pure CSS: duplicating the screenshots and translating the
 * container by half its height means the animation restarts at a pixel-
 * identical position, so there is no jump and no JS bookkeeping.
 */
withDefaults(defineProps<{
  shots: string[]
  /** Seconds for one full pass through the strip. */
  speed?: number
}>(), {
  speed: 42,
})

const panels = [
  { id: 'a' },
  { id: 'b' },
  { id: 'c' },
  { id: 'd' },
]
</script>

<style scoped>
.device {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 4 / 5;
}

/* Ambient bloom behind the device, matching the reference's lit backdrop. */
.device__glow {
  position: absolute;
  width: 78%;
  height: 62%;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(212, 255, 63, 0.16), transparent 68%);
  filter: blur(28px);
}

/* ── Device ── */
.device__frame {
  position: relative;
  z-index: 2;
  width: min(60%, 240px);
  aspect-ratio: 9 / 19;
  padding: 8px;
  border-radius: 34px;
  background: linear-gradient(160deg, #2a2a2a, #0d0d0d);
  border: 1px solid var(--color-border-strong);
  box-shadow:
    0 30px 70px rgba(0, 0, 0, 0.6),
    0 0 40px rgba(212, 255, 63, 0.1);
}

.device__notch {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 34%;
  height: 15px;
  border-radius: 0 0 12px 12px;
  background: #0d0d0d;
  z-index: 3;
}

.device__screen {
  position: relative;
  height: 100%;
  border-radius: 27px;
  overflow: hidden;
  background: var(--color-bg);
}

.device__strip {
  display: flex;
  flex-direction: column;
  animation: device-scroll var(--speed) linear infinite;
}

@keyframes device-scroll {
  from { transform: translateY(0); }
  to   { transform: translateY(-50%); }
}

.device__shot {
  width: 100%;
  height: auto;
  display: block;
}

/* Softens the top and bottom of the feed so screenshots do not cut off hard
   against the bezel. */
.device__screen-fade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(10, 10, 10, 0.85) 0%,
    transparent 16%,
    transparent 84%,
    rgba(10, 10, 10, 0.85) 100%
  );
}

/* ── Floating panels ── */
.device__panel {
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 84px;
  height: 58px;
  padding: 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(212, 255, 63, 0.22);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 0 20px rgba(212, 255, 63, 0.1);
  animation: device-float 7s ease-in-out infinite;
}

.device__panel-bar {
  height: 5px;
  border-radius: var(--radius-pill);
  background: rgba(212, 255, 63, 0.35);
}

.device__panel-bar--short {
  width: 55%;
  background: rgba(245, 245, 245, 0.18);
}

/* Staggered offsets and delays so the panels never drift in lockstep. */
.device__panel--a { top: 12%; left: 2%;  animation-delay: 0s; }
.device__panel--b { top: 34%; right: 0%; animation-delay: -1.8s; }
.device__panel--c { bottom: 24%; left: 0%; animation-delay: -3.4s; }
.device__panel--d { bottom: 9%; right: 4%; animation-delay: -5.1s; }

@keyframes device-float {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.75; }
  50%      { transform: translateY(-13px) scale(1.03); opacity: 1; }
}

@media (max-width: 1100px) {
  /* Too little room for panels beside the device without them colliding. */
  .device__panel { display: none; }
  .device__frame { width: min(72%, 220px); }
}

@media (prefers-reduced-motion: reduce) {
  .device__strip,
  .device__panel {
    animation: none;
  }
}
</style>
