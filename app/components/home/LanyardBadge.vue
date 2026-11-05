<template>
  <section ref="heroEl" class="hero" :class="{ 'is-live': live, 'is-dragging': dragging }">
    <h1 class="sr-only">{{ profile.name }} — {{ tr(profile.title) }}</h1>

    <!-- Server-rendered stand-in for the strap, replaced by the simulated one
         as soon as the component mounts. -->
    <span class="strap-static" aria-hidden="true" />

    <svg ref="svgEl" class="strap" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#1a1a1a" />
          <stop offset="0.45" stop-color="#6b6b6b" />
          <stop offset="0.6" stop-color="#2b2b2b" />
          <stop offset="1" stop-color="#0f0f0f" />
        </linearGradient>
      </defs>
      <path ref="strapPathEl" id="strap-path" class="strap__band" d="M0 0" />
      <text class="strap__text" dominant-baseline="central">
        <textPath href="#strap-path" startOffset="90">{{ strapText }}</textPath>
      </text>
      <!-- Carabiner: crimp over the strap end, swivel ring, hook into the card. -->
      <g ref="clipEl" class="strap__clip">
        <rect x="-13" y="-6" width="26" height="11" rx="2.5" fill="#161616" />
        <ellipse cx="0" cy="14" rx="11" ry="9.5" fill="none" stroke="url(#metal)" stroke-width="4" />
        <rect x="-3.5" y="22" width="7" height="13" rx="2" fill="url(#metal)" />
        <path d="M0 34 C -8 34 -8 47 0 47 C 6 47 7 41 3 38.5" fill="none" stroke="url(#metal)" stroke-width="3.4" stroke-linecap="round" />
      </g>
    </svg>

    <div ref="cardEl" class="badge-wrap" @pointerdown="onPointerDown" @click.capture="onCardClick">
      <article class="badge" :aria-label="t('hero.badge_label', { name: profile.name })">
        <div class="badge__photo">
          <img :src="profile.photo.badge" :alt="profile.name" draggable="false" width="812" height="602">
        </div>
        <span class="badge__hole" aria-hidden="true" />

        <div class="badge__body">
          <div class="badge__avatar" aria-hidden="true"><BrandMark /></div>
          <a :href="profile.linkedin" class="badge__in" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <AppIcon name="linkedin" />
          </a>

          <p class="badge__name">
            {{ profile.shortName }}
            <AppIcon name="verified" class="badge__check" :aria-label="t('hero.verified')" />
          </p>
          <p class="badge__handle">{{ profile.handle }}</p>
          <p class="badge__bio">{{ tr(profile.badgeBio) }}</p>

          <div class="badge__foot">
            <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
            <span class="badge__loc"><AppIcon name="pin" />{{ tr(profile.location) }}</span>
          </div>
        </div>
      </article>
    </div>

    <!-- Desktop corners: what I do today and what I do it with. -->
    <div class="hero__aside hero__aside--left">
      <p class="hero__aside-label">{{ t('hero.today') }}</p>
      <ul>
        <li v-for="job in currentJobs" :key="job.company">
          {{ tr(job.short?.role ?? job.role) }}<span class="muted"> · {{ job.short?.company ?? job.company }}</span>
        </li>
      </ul>
    </div>
    <div class="hero__aside hero__aside--right">
      <p class="hero__aside-label">{{ t('hero.stack') }}</p>
      <ul>
        <li v-for="line in heroStack" :key="line">{{ line }}</li>
      </ul>
    </div>

    <div class="hero__cta">
      <ChamferButton :to="profile.linkedin" variant="primary">
        <template #icon><AppIcon name="linkedin" /></template>
        {{ t('hero.connect') }}
      </ChamferButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { experiences, heroStack, profile } from '~/data/profile'

const { t } = useI18n()
const { tr } = useLocalized()

const currentJobs = experiences.filter((e) => e.current)

const strapText = `${profile.shortName}   ·   `.repeat(8).toUpperCase()

const heroEl = ref<HTMLElement>()
const cardEl = ref<HTMLElement>()
const svgEl = ref<SVGSVGElement>()
const strapPathEl = ref<SVGPathElement>()
const clipEl = ref<SVGGElement>()
const live = ref(false)
const dragging = ref(false)

/* ─────────────────────────────────────────────────────────────
   Physics: position-based Verlet.
   Each point stores its current and previous position; velocity is
   implicit (current − previous), which makes "throwing" the card free.
   Points:  0 = anchor (pinned, above the viewport)
            1..N = strap
            N+1 = card hole (end of the carabiner)
            N+2 = card centre of mass
   Every frame: integrate, then relax the distance constraints a few
   times. Fixed 120 Hz steps keep it identical on 60 and 144 Hz screens.
   ───────────────────────────────────────────────────────────── */
type Vec = { x: number; y: number }

const N = 10
const STEP = 1 / 120
const GRAVITY = 2600 * STEP * STEP
const DAMPING = 0.991 // per 1/120 s step: a swing loses ~2/3 of its energy each second
const ITERATIONS = 14
const HOLE_Y = 18 // px from the card's top edge to the hole
const CLIP_LEN = 47 // px from the strap end to the hole (carabiner length)
const MAX_SPEED = 70 // px per step — stops a hard fling from exploding

let P: Vec[] = []
let Q: Vec[] = []
let lens: number[] = []
let inv: number[] = []
let anchor: Vec = { x: 0, y: 0 }
let cardW = 0
let cardH = 0
let reach = 0
let heroWidth = 0

// 3D tilt follows the card's velocity through a damped spring.
let rotX = 0
let rotY = 0
let velX = 0
let velY = 0

const pointer = { x: 0, y: 0, inside: false }
let press: { x: number; y: number; id: number } | null = null
let grabOffset: Vec = { x: 0, y: 0 }
let suppressClick = false

let running = false
let visible = true
let rafId = 0
let lastTime = 0
let accumulator = 0
let stillSteps = 0
let reduced = false

const HOLE = N + 1
const BODY = N + 2

function localPoint(e: PointerEvent): Vec {
  const r = heroEl.value!.getBoundingClientRect()
  return { x: e.clientX - r.left, y: e.clientY - r.top }
}

/** Reads the CSS resting layout and builds the rope hanging straight from it. */
function measure() {
  const hero = heroEl.value!
  const card = cardEl.value!
  card.classList.remove('is-sim')
  card.style.transform = ''

  const hr = hero.getBoundingClientRect()
  const cr = card.getBoundingClientRect()
  cardW = card.offsetWidth
  cardH = card.offsetHeight
  heroWidth = hero.clientWidth

  const hole = { x: cr.left - hr.left + cardW / 2, y: cr.top - hr.top + HOLE_Y }
  anchor = { x: hole.x, y: -80 }
  const strapLen = Math.max(60, hole.y - anchor.y - CLIP_LEN)
  const centre = cardH / 2 - HOLE_Y

  P = []
  for (let i = 0; i <= N; i++) P.push({ x: anchor.x, y: anchor.y + (strapLen * i) / N })
  P.push({ ...hole })
  P.push({ x: hole.x, y: hole.y + centre })
  Q = P.map((p) => ({ ...p }))
  lens = [...Array(N).fill(strapLen / N), CLIP_LEN, centre]
  inv = P.map((_, i) => (i === 0 ? 0 : i >= HOLE ? 0.25 : 1))
  reach = strapLen + CLIP_LEN + centre

  card.classList.add('is-sim')
}

/** Gives the card a push, as if it had just been hung. */
function impulse(vx: number, spin: number) {
  for (let i = 1; i < P.length; i++) {
    const k = i / (P.length - 1)
    Q[i]!.x = P[i]!.x - vx * k
  }
  velY += spin
}

function step() {
  const grabbing = dragging.value
  for (let i = 1; i < P.length; i++) {
    const p = P[i]!
    const q = Q[i]!
    let vx = (p.x - q.x) * DAMPING
    let vy = (p.y - q.y) * DAMPING
    const speed = Math.hypot(vx, vy)
    if (speed > MAX_SPEED) {
      vx *= MAX_SPEED / speed
      vy *= MAX_SPEED / speed
    }
    q.x = p.x
    q.y = p.y
    p.x += vx
    p.y += vy + GRAVITY
  }

  if (grabbing) {
    // Hold the card where the pointer is, clamped to the strap's reach so the
    // constraints never have to fight an impossible target.
    let tx = pointer.x + grabOffset.x - anchor.x
    let ty = pointer.y + grabOffset.y - anchor.y
    const d = Math.hypot(tx, ty)
    if (d > reach * 0.985) {
      tx *= (reach * 0.985) / d
      ty *= (reach * 0.985) / d
    }
    P[BODY]!.x = anchor.x + tx
    P[BODY]!.y = anchor.y + ty
  }

  for (let k = 0; k < ITERATIONS; k++) {
    for (let s = 0; s < lens.length; s++) {
      const a = P[s]!
      const b = P[s + 1]!
      const ia = inv[s]!
      const ib = grabbing && s + 1 === BODY ? 0 : inv[s + 1]!
      const sum = ia + ib
      if (sum === 0) continue
      const dx = b.x - a.x
      const dy = b.y - a.y
      const d = Math.hypot(dx, dy) || 1e-6
      const diff = (d - lens[s]!) / d
      a.x += dx * diff * (ia / sum)
      a.y += dy * diff * (ia / sum)
      b.x -= dx * diff * (ib / sum)
      b.y -= dy * diff * (ib / sum)
    }
  }

  // Tilt: swinging sideways turns the card in depth; hovering leans it
  // toward the cursor.
  const body = P[BODY]!
  const bvx = body.x - Q[BODY]!.x
  const bvy = body.y - Q[BODY]!.y
  let targetY = Math.max(-38, Math.min(38, bvx * 2.6))
  let targetX = Math.max(-16, Math.min(16, -bvy * 1.4))
  if (pointer.inside && !grabbing) {
    const nx = Math.max(-1, Math.min(1, (pointer.x - body.x) / (cardW * 0.9)))
    const ny = Math.max(-1, Math.min(1, (pointer.y - body.y) / (cardH * 0.9)))
    targetY += nx * 10
    targetX -= ny * 8
  }
  velY = (velY + (targetY - rotY) * 0.05) * 0.88
  velX = (velX + (targetX - rotX) * 0.05) * 0.88
  rotY += velY
  rotX += velX

  // Sleep once everything is at rest.
  let energy = Math.abs(velX) + Math.abs(velY) + Math.abs(targetY - rotY) + Math.abs(targetX - rotX)
  for (let i = 1; i < P.length; i++) energy += Math.abs(P[i]!.x - Q[i]!.x) + Math.abs(P[i]!.y - Q[i]!.y)
  stillSteps = energy < 0.04 * P.length && !grabbing ? stillSteps + 1 : 0
}

function render() {
  const hole = P[HOLE]!
  const body = P[BODY]!
  const angle = Math.atan2(body.x - hole.x, body.y - hole.y)

  const card = cardEl.value!
  card.style.transform =
    `translate3d(${hole.x - cardW / 2}px, ${hole.y - HOLE_Y}px, 0) ` +
    `rotate(${-angle}rad) rotateX(${rotX}deg) rotateY(${rotY}deg)`
  card.style.setProperty('--sheen', `${50 + rotY * 1.6}%`)

  // Strap: quadratic curve through the midpoints of the rope points.
  let d = `M${P[0]!.x.toFixed(1)} ${P[0]!.y.toFixed(1)}`
  for (let i = 1; i < N; i++) {
    const mx = (P[i]!.x + P[i + 1]!.x) / 2
    const my = (P[i]!.y + P[i + 1]!.y) / 2
    d += ` Q${P[i]!.x.toFixed(1)} ${P[i]!.y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`
  }
  d += ` L${P[N]!.x.toFixed(1)} ${P[N]!.y.toFixed(1)}`
  strapPathEl.value!.setAttribute('d', d)

  const top = P[N]!
  const clipAngle = (Math.atan2(hole.y - top.y, hole.x - top.x) * 180) / Math.PI - 90
  clipEl.value!.setAttribute('transform', `translate(${top.x.toFixed(1)} ${top.y.toFixed(1)}) rotate(${clipAngle.toFixed(2)})`)
}

function frame(now: number) {
  accumulator += Math.min(0.05, (now - lastTime) / 1000)
  lastTime = now
  while (accumulator >= STEP) {
    step()
    accumulator -= STEP
  }
  render()
  if (stillSteps > 120 || !visible) {
    running = false
    return
  }
  rafId = requestAnimationFrame(frame)
}

function wake() {
  if (reduced) return
  stillSteps = 0
  if (running || !visible) return
  running = true
  lastTime = performance.now()
  accumulator = 0
  rafId = requestAnimationFrame(frame)
}

/* ── Pointer handling ── */
function onPointerDown(e: PointerEvent) {
  if (reduced || e.button !== 0) return
  press = { x: e.clientX, y: e.clientY, id: e.pointerId }
  suppressClick = false
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)
}

function onPointerMove(e: PointerEvent) {
  const p = localPoint(e)
  pointer.x = p.x
  pointer.y = p.y
  if (press && !dragging.value && Math.hypot(e.clientX - press.x, e.clientY - press.y) > 5) {
    // Movement past a small threshold turns the press into a drag; a plain
    // tap still reaches the links on the card.
    dragging.value = true
    suppressClick = true
    grabOffset = { x: P[BODY]!.x - p.x, y: P[BODY]!.y - p.y }
  }
  if (dragging.value) wake()
}

function onPointerUp() {
  press = null
  dragging.value = false
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('pointercancel', onPointerUp)
  wake()
}

function onCardClick(e: MouseEvent) {
  if (!suppressClick) return
  e.preventDefault()
  e.stopPropagation()
  suppressClick = false
}

function onHover(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return
  const p = localPoint(e)
  pointer.x = p.x
  pointer.y = p.y
  pointer.inside = true
  wake()
}

function onLeave() {
  pointer.inside = false
  wake()
}

let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null
let resizeTimer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  const hero = heroEl.value!
  reduced = prefersReducedMotion()

  measure()
  render()
  live.value = true
  if (reduced) return

  hero.addEventListener('pointermove', onHover)
  hero.addEventListener('pointerleave', onLeave)

  // Only re-hang on width changes: mobile browsers change the height while
  // the address bar slides, and re-hanging then would make the card jump.
  resizeObserver = new ResizeObserver(() => {
    if (hero.clientWidth === heroWidth) return
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      measure()
      render()
      wake()
    }, 120)
  })
  resizeObserver.observe(hero)

  intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting
    if (visible) wake()
  })
  intersectionObserver.observe(hero)

  impulse(4.5, 3)
  wake()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  running = false
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  clearTimeout(resizeTimer)
  heroEl.value?.removeEventListener('pointermove', onHover)
  heroEl.value?.removeEventListener('pointerleave', onLeave)
  onPointerUp()
})
</script>

<style scoped>
.hero {
  --card-w: clamp(272px, 23vw, 340px);
  --card-h: calc(var(--card-w) * 1.4);
  --card-top: clamp(128px, 21vh, 190px);

  position: relative;
  z-index: 2;
  height: max(100svh, calc(var(--card-top) + var(--card-h) + 140px));
  perspective: 1400px;
  overflow-x: clip;
}

/* ── Strap ── */
.strap-static {
  position: absolute;
  top: 0;
  left: 50%;
  width: 24px;
  height: calc(var(--card-top) - 26px);
  margin-left: -12px;
  background: #121212;
}
.is-live .strap-static { display: none; }

.strap {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
  visibility: hidden;
}
.is-live .strap { visibility: visible; }

.strap__band {
  fill: none;
  stroke: #121212;
  stroke-width: 24;
}
.strap__text {
  fill: rgb(255 255 255 / 0.82);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 2.5px;
}

/* ── Card ── */
.badge-wrap {
  position: absolute;
  top: var(--card-top);
  left: 50%;
  z-index: 1;
  width: var(--card-w);
  height: var(--card-h);
  margin-left: calc(var(--card-w) / -2);
  transform-origin: 50% 18px;
  transform-style: preserve-3d;
  touch-action: pan-y;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
}
/* Once the simulation owns the card, it is placed purely by transform. */
.badge-wrap.is-sim {
  top: 0;
  left: 0;
  margin-left: 0;
  will-change: transform;
}
.is-dragging .badge-wrap { cursor: grabbing; }

.badge {
  --sheen: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 16px;
  background: linear-gradient(180deg, #ececec 0%, #f3f3f3 60%, #e9e9e9 100%);
  box-shadow:
    0 40px 70px -30px rgb(0 0 0 / 0.45),
    0 12px 24px -12px rgb(0 0 0 / 0.18),
    inset 0 0 0 1px rgb(255 255 255 / 0.6);
}
/* A strip of light that slides across as the card turns. */
.badge::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(105deg, transparent 35%, rgb(255 255 255 / 0.28) 50%, transparent 65%);
  background-size: 250% 100%;
  background-position: var(--sheen) 0;
  mix-blend-mode: soft-light;
}

.badge__photo {
  height: 50%;
  flex-shrink: 0;
  background: #1a1a1a;
}
.badge__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 20%;
  filter: grayscale(1) contrast(1.08) brightness(0.92);
  pointer-events: none;
}

.badge__hole {
  position: absolute;
  top: 14px;
  left: 50%;
  width: 22px;
  height: 8px;
  margin-left: -11px;
  border-radius: 4px;
  background: var(--bg);
  box-shadow: inset 0 1.5px 2px rgb(0 0 0 / 0.45);
}

.badge__body {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 18px 16px;
}

.badge__avatar {
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  margin-top: -38px;
  margin-left: 6px;
  border-radius: 999px;
  background: #0d0d0d;
  color: #fff;
  box-shadow: 0 0 0 4px #ececec;
}
.badge__avatar :deep(.brandmark) { width: 46px; height: 46px; }

.badge__in {
  position: absolute;
  top: 16px;
  right: 18px;
  width: 22px;
  height: 22px;
  color: #0a66c2;
  opacity: 0.75;
  transition: opacity 0.2s ease;
}
.badge__in:hover { opacity: 1; }

.badge__name {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
  font-size: 16px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.badge__check { width: 15px; height: 15px; color: #3b9cf6; }

.badge__handle {
  margin-top: 1px;
  font-size: 11px;
  color: var(--fg-faint);
}

.badge__bio {
  margin-top: 14px;
  font-size: 11.5px;
  line-height: 1.5;
  letter-spacing: 0.01em;
  color: rgb(10 10 10 / 0.62);
}

.badge__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
  font-size: 10.5px;
  color: var(--fg-muted);
}
.badge__foot a:hover { color: var(--fg); }
.badge__loc { display: inline-flex; align-items: center; gap: 4px; }
.badge__loc :deep(svg) { width: 12px; height: 12px; }

/* ── Corner info (desktop only: on smaller screens the badge needs the room) ── */
.hero__aside {
  position: absolute;
  bottom: 40px;
  z-index: 0;
  display: none;
  max-width: 320px;
  font-size: var(--text-xs);
  line-height: 1.5;
}
.hero__aside--left { left: var(--gutter); }
.hero__aside--right { right: var(--gutter); text-align: right; }
.hero__aside-label {
  margin-bottom: 8px;
  font-family: var(--font-mono);
  font-size: 12px;
  text-transform: uppercase;
  color: var(--fg-faint);
}
.hero__aside li { white-space: nowrap; }
.hero__aside li + li { margin-top: 2px; }
@media (min-width: 1100px) {
  .hero__aside { display: block; }
}

/* ── CTA ── */
.hero__cta {
  position: absolute;
  top: calc(var(--card-top) + var(--card-h) + 16px);
  left: 50%;
  z-index: 0;
  transform: translateX(-50%);
}
</style>
