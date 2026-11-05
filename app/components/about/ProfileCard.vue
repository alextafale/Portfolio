<template>
  <figure
    ref="cardEl"
    class="pcard"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <div class="pcard__photo">
      <img :src="profile.photo.portrait" :alt="profile.name" width="400" height="400" loading="lazy" decoding="async">
      <span class="pcard__now">
        <span class="pcard__dot" aria-hidden="true" />
        {{ t('about.card.now', { n: currentRoles }) }}
      </span>
    </div>

    <figcaption class="pcard__body">
      <p class="pcard__name">{{ profile.name }}</p>
      <p class="pcard__title">{{ tr(profile.title) }}</p>

      <dl class="pcard__meta">
        <div>
          <dt>{{ t('about.card.base') }}</dt>
          <dd>{{ tr(profile.location) }}</dd>
        </div>
        <div>
          <dt>{{ t('about.card.mode') }}</dt>
          <dd>{{ t('about.card.mode_value') }}</dd>
        </div>
        <div>
          <dt>{{ t('about.languages') }}</dt>
          <dd>{{ languages.map((l) => `${tr(l.name)} ${tr(l.level)}`).join(' · ') }}</dd>
        </div>
      </dl>
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import { experiences, languages, profile } from '~/data/profile'

const { t } = useI18n()
const { tr } = useLocalized()

const currentRoles = experiences.filter((e) => e.current).length

// A gentle tilt toward the pointer — the same "physical object" idea as the
// badge in the hero, at a fraction of the motion. Mouse only, never under
// reduced motion, and driven by CSS variables so Vue never re-renders.
const cardEl = ref<HTMLElement>()

function onMove(e: PointerEvent) {
  if (e.pointerType !== 'mouse' || prefersReducedMotion() || !cardEl.value) return
  const r = cardEl.value.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  cardEl.value.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`)
  cardEl.value.style.setProperty('--rx', `${(-y * 7).toFixed(2)}deg`)
  cardEl.value.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`)
  cardEl.value.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`)
}

function onLeave() {
  cardEl.value?.style.setProperty('--rx', '0deg')
  cardEl.value?.style.setProperty('--ry', '0deg')
}
</script>

<style scoped>
.pcard {
  --rx: 0deg;
  --ry: 0deg;
  --gx: 50%;
  --gy: 0%;

  position: relative;
  width: 100%;
  max-width: 360px;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: #0b0b0b;
  color: #fff;
  box-shadow:
    0 40px 60px -36px rgb(0 0 0 / 0.5),
    0 0 0 1px rgb(0 0 0 / 0.06);
  transform: perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 0.5s var(--ease-out);
}
/* Soft light that follows the pointer across the card. */
.pcard::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at var(--gx) var(--gy), rgb(255 255 255 / 0.1), transparent 55%);
  opacity: 0;
  transition: opacity 0.4s ease;
}
.pcard:hover::after { opacity: 1; }

.pcard__photo {
  position: relative;
  aspect-ratio: 1;
}
.pcard__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.85) contrast(1.05);
  transition: filter 0.6s ease, transform 0.8s var(--ease-out);
}
.pcard:hover .pcard__photo img {
  filter: grayscale(0) contrast(1);
  transform: scale(1.03);
}
/* The studio backdrop is black, so the photo melts into the card below it. */
.pcard__photo::after {
  content: '';
  position: absolute;
  inset: auto 0 0;
  height: 38%;
  background: linear-gradient(to bottom, transparent, #0b0b0b);
  pointer-events: none;
}

.pcard__now {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 10px 5px 8px;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.pcard__dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: 0 0 0 0 rgb(34 197 94 / 0.6);
  animation: pulse 2.4s ease-out infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgb(34 197 94 / 0.55); }
  70%, 100% { box-shadow: 0 0 0 7px rgb(34 197 94 / 0); }
}

.pcard__body {
  position: relative;
  padding: 0 22px 22px;
  margin-top: -28px;
}
.pcard__name {
  font-size: 19px;
  font-weight: 500;
  letter-spacing: -0.01em;
}
.pcard__title {
  margin-top: 2px;
  font-size: var(--text-xs);
  color: rgb(255 255 255 / 0.55);
}

.pcard__meta {
  display: grid;
  gap: 8px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgb(255 255 255 / 0.1);
  font-size: var(--text-xs);
}
.pcard__meta div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}
.pcard__meta dt {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  color: rgb(255 255 255 / 0.4);
}
.pcard__meta dd { text-align: right; }

@media (prefers-reduced-motion: reduce) {
  .pcard__dot { animation: none; }
}
</style>
