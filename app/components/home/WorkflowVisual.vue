<template>
  <div class="wv" :style="{ '--i': active }">
    <span class="wv__glow" aria-hidden="true" />

    <div class="wv__frame">
      <header class="wv__chrome" aria-hidden="true">
        <span class="wv__dot" /><span class="wv__dot" /><span class="wv__dot" />
        <span class="wv__chrome-label">{{ labels[active] ?? labels[0] }}</span>
      </header>

      <div class="wv__stage">
        <!-- One panel per step; only the active one is painted, so the
             animations of hidden panels never burn frames. -->
        <div
          v-for="(_, i) in 6"
          :key="i"
          class="wv__panel"
          :class="{ 'wv__panel--on': i === active }"
        >
          <!-- 01 · coding agent: a terminal streaming work -->
          <div v-if="i === 0" class="wv__term">
            <p v-for="(line, n) in term" :key="n" class="wv__line" :style="{ '--n': n }">
              <span class="wv__prompt">›</span>{{ line }}
            </p>
            <span class="wv__caret" />
          </div>

          <!-- 02 · MCP: a hub wired to live tools -->
          <svg v-else-if="i === 1" viewBox="0 0 200 150" class="wv__svg">
            <g class="wv__links">
              <line v-for="(n, k) in nodes" :key="k" x1="100" y1="75" :x2="n.x" :y2="n.y" :style="{ '--n': k }" />
            </g>
            <circle cx="100" cy="75" r="15" class="wv__hub" />
            <circle v-for="(n, k) in nodes" :key="`n${k}`" :cx="n.x" :cy="n.y" r="7" class="wv__node" :style="{ '--n': k }" />
          </svg>

          <!-- 03 · subagents: parallel lanes running at their own pace -->
          <div v-else-if="i === 2" class="wv__lanes">
            <div v-for="l in 3" :key="l" class="wv__lane" :style="{ '--n': l }">
              <span class="wv__token" />
            </div>
          </div>

          <!-- 04 · LLMs in product: an exchange building up -->
          <div v-else-if="i === 3" class="wv__chat">
            <span
              v-for="(b, k) in bubbles"
              :key="k"
              class="wv__bubble"
              :class="`wv__bubble--${b.side}`"
              :style="{ '--n': k, '--w': `${b.w}%` }"
            />
          </div>

          <!-- 05 · context engineering: a document filling in -->
          <div v-else-if="i === 4" class="wv__doc">
            <span v-for="k in 7" :key="k" class="wv__row" :style="{ '--n': k, '--w': `${45 + ((k * 37) % 50)}%` }" />
          </div>

          <!-- 06 · AI-assisted review: a diff resolving to a pass -->
          <div v-else class="wv__diff">
            <span
              v-for="(d, k) in diff"
              :key="k"
              class="wv__diff-row"
              :class="`wv__diff-row--${d.kind}`"
              :style="{ '--n': k, '--w': `${d.w}%` }"
            />
            <span class="wv__check" aria-hidden="true">✓</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * WorkflowVisual — one animated panel per workflow step.
 *
 * Built from CSS and inline SVG rather than image or video assets: the panels
 * stay legible at any size, cost nothing to download, and inherit the accent
 * colour, which a stock clip could not. Only the active panel animates.
 */
defineProps<{ active: number }>()

const labels = [
  'agent — session',
  'mcp — servers',
  'subagents — pool',
  'chat — production',
  'context — CLAUDE.md',
  'review — diff',
]

const term = [
  'explorando la base de código…',
  'plan: 4 pasos · 12 archivos',
  'aplicando cambios…',
  'tests 24/24 en verde',
]

const nodes = [
  { x: 40, y: 32 },
  { x: 162, y: 34 },
  { x: 28, y: 108 },
  { x: 172, y: 110 },
  { x: 100, y: 136 },
]

const bubbles = [
  { side: 'in', w: 62 },
  { side: 'out', w: 48 },
  { side: 'in', w: 74 },
  { side: 'out', w: 40 },
]

const diff = [
  { kind: 'del', w: 70 },
  { kind: 'add', w: 84 },
  { kind: 'add', w: 58 },
  { kind: 'neutral', w: 66 },
]
</script>

<style scoped>
.wv {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
}

.wv__glow {
  position: absolute;
  width: 84%;
  height: 76%;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(212, 255, 63, 0.16), transparent 70%);
  filter: blur(30px);
}

.wv__frame {
  position: relative;
  z-index: 1;
  width: 100%;
  border-radius: var(--radius-lg);
  background: linear-gradient(170deg, #151515, #0c0c0c);
  border: 1px solid var(--color-border-strong);
  box-shadow: 0 26px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(212, 255, 63, 0.07);
  overflow: hidden;
}

.wv__chrome {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.02);
}

.wv__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-border-strong);
}

.wv__chrome-label {
  margin-left: 10px;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

/* Fixed aspect so swapping panels never resizes the pinned column. */
.wv__stage {
  position: relative;
  aspect-ratio: 4 / 3;
}

.wv__panel {
  position: absolute;
  inset: 0;
  padding: 22px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity var(--transition-normal), transform var(--transition-normal);
  pointer-events: none;
}

.wv__panel--on {
  opacity: 1;
  transform: none;
}

/* ── 01 terminal ── */
.wv__term {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  line-height: 2.1;
  color: var(--color-text-secondary);
}

.wv__line {
  opacity: 0;
  animation: wv-type 0.4s ease forwards;
  animation-delay: calc(var(--n) * 0.5s);
  white-space: nowrap;
  overflow: hidden;
}

.wv__prompt {
  color: var(--color-accent);
  margin-right: 8px;
}

.wv__caret {
  display: inline-block;
  width: 7px;
  height: 13px;
  background: var(--color-accent);
  animation: wv-blink 1.1s steps(2) infinite;
}

@keyframes wv-type { to { opacity: 1; } }
@keyframes wv-blink { 50% { opacity: 0; } }

/* ── 02 MCP graph ── */
.wv__svg { width: 100%; height: 100%; }

.wv__links line {
  stroke: var(--color-accent);
  stroke-width: 1;
  stroke-dasharray: 3 5;
  opacity: 0.45;
  animation: wv-flow 1.6s linear infinite;
  animation-delay: calc(var(--n) * -0.3s);
}

@keyframes wv-flow { to { stroke-dashoffset: -16; } }

.wv__hub {
  fill: none;
  stroke: var(--color-accent);
  stroke-width: 1.6;
  animation: wv-pulse 2.4s ease-in-out infinite;
}

.wv__node {
  fill: var(--color-accent);
  opacity: 0.75;
  animation: wv-pulse 2.4s ease-in-out infinite;
  animation-delay: calc(var(--n) * 0.22s);
}

@keyframes wv-pulse {
  0%, 100% { opacity: 0.45; }
  50%      { opacity: 1; }
}

/* ── 03 subagent lanes ── */
.wv__lanes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  height: 100%;
}

.wv__lane {
  position: relative;
  height: 6px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.wv__token {
  position: absolute;
  top: 0;
  left: 0;
  width: 34%;
  height: 100%;
  border-radius: var(--radius-pill);
  background: linear-gradient(90deg, transparent, var(--color-accent));
  /* Each lane runs at its own pace, which is the point of the panel. */
  animation: wv-run calc(1.7s + var(--n) * 0.55s) ease-in-out infinite;
}

@keyframes wv-run {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(300%); }
}

/* ── 04 chat ── */
.wv__chat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  height: 100%;
}

.wv__bubble {
  height: 22px;
  width: var(--w);
  border-radius: var(--radius-pill);
  opacity: 0;
  animation: wv-pop 0.5s ease forwards;
  animation-delay: calc(var(--n) * 0.45s);
}

.wv__bubble--in {
  background: rgba(255, 255, 255, 0.07);
}

.wv__bubble--out {
  align-self: flex-end;
  background: var(--color-accent-soft);
  border: 1px solid rgba(212, 255, 63, 0.3);
}

@keyframes wv-pop {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
}

/* ── 05 document ── */
.wv__doc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 13px;
  height: 100%;
}

.wv__row {
  height: 7px;
  width: var(--w);
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.06);
  transform-origin: left;
  transform: scaleX(0);
  animation: wv-fill 0.5s ease forwards;
  animation-delay: calc(var(--n) * 0.13s);
}

.wv__row:nth-child(2n) { background: var(--color-accent-soft); }

@keyframes wv-fill { to { transform: scaleX(1); } }

/* ── 06 diff ── */
.wv__diff {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  height: 100%;
}

.wv__diff-row {
  height: 9px;
  width: var(--w);
  border-radius: var(--radius-pill);
  opacity: 0;
  animation: wv-pop 0.45s ease forwards;
  animation-delay: calc(var(--n) * 0.22s);
}

.wv__diff-row--add { background: var(--color-accent-soft); border: 1px solid rgba(212, 255, 63, 0.35); }
.wv__diff-row--del { background: rgba(248, 113, 113, 0.16); border: 1px solid rgba(248, 113, 113, 0.3); }
.wv__diff-row--neutral { background: rgba(255, 255, 255, 0.06); }

.wv__check {
  position: absolute;
  right: 4px;
  bottom: 0;
  font-size: 1.7rem;
  color: var(--color-accent);
  opacity: 0;
  animation: wv-pop 0.5s ease forwards;
  animation-delay: 1.1s;
}

@media (prefers-reduced-motion: reduce) {
  .wv__panel *,
  .wv__panel {
    animation: none !important;
    opacity: 1;
    transform: none;
  }
}
</style>
