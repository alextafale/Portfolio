<template>
  <article
    class="project-card"
    @mouseenter="onHover(true)"
    @mouseleave="onHover(false)"
    ref="cardRef"
  >
    <!-- Stretched link rather than wrapping the card in an anchor: the footer
         holds its own GitHub/live links, and nesting <a> inside <a> is invalid
         HTML that the parser rewrites, producing a hydration mismatch. -->
    <NuxtLink
      :to="localePath(`/proyects/${project.slug}`)"
      class="project-card__overlay"
      :aria-label="project.title"
    />

    <!-- Media: cover shot when the project has one, vector otherwise. -->
    <div class="project-card__media">
      <img
        v-if="project.cover ?? project.images?.[0]"
        :src="project.cover ?? project.images?.[0]"
        :alt="project.title"
        class="project-card__img"
        loading="lazy"
      />
      <div
        v-else-if="project.svgVector"
        class="project-card__vector"
        aria-hidden="true"
        v-html="project.svgVector"
      />
      <div v-else class="project-card__vector" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      </div>

      <span class="project-card__glow" aria-hidden="true" />
      <span v-if="project.featured" class="project-card__badge">★ Featured</span>
    </div>

    <div class="project-card__body">
      <div class="project-card__meta">
        <h3 class="project-card__title">{{ project.title }}</h3>
        <span v-if="project.year" class="project-card__year">{{ project.year }}</span>
      </div>

      <p class="project-card__description">{{ project.description[locale as 'en' | 'es'] }}</p>

      <div class="project-card__tags">
        <span v-for="tag in project.tags.slice(0, 5)" :key="tag" class="chip">{{ tag }}</span>
      </div>

      <footer class="project-card__footer">
        <a
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="project-card__link"
          aria-label="View on GitHub"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>

        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="project-card__link project-card__link--live"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Live Demo
        </a>
      </footer>
    </div>

    <svg class="project-card__arrow" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '~/types'
import { useAnimations } from '~/composables/useAnimations'

const { locale } = useI18n()
const localePath = useLocalePath()
const { animateSvgHover } = useAnimations()

defineProps<{ project: Project }>()

const cardRef = ref<HTMLElement | null>(null)

const onHover = (isHovering: boolean) => {
  if (cardRef.value) {
    animateSvgHover(cardRef.value, isHovering)
  }
}
</script>

<style scoped>
.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition:
    border-color var(--transition-normal),
    transform var(--transition-normal),
    box-shadow var(--transition-normal);
}

.project-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg), var(--glow-accent-soft);
}

/* Covers the whole card so the entire surface stays clickable; the footer
   links sit above it on a higher layer. */
.project-card__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
}

.project-card__overlay:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: -4px;
  border-radius: var(--radius-lg);
}

/* ── Media ── */
.project-card__media {
  position: relative;
  aspect-ratio: 16 / 10;
  background: var(--color-bg);
  overflow: hidden;
}

.project-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.project-card:hover .project-card__img {
  transform: scale(1.04);
}

.project-card__vector {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: var(--color-accent);
  background:
    radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212, 255, 63, 0.07), transparent 70%),
    repeating-linear-gradient(
      45deg,
      transparent 0 11px,
      rgba(255, 255, 255, 0.018) 11px 12px
    );
  transition: transform var(--transition-slow);
}

.project-card__vector :deep(svg) {
  width: clamp(84px, 26%, 132px);
  height: auto;
  opacity: 0.9;
}

.project-card:hover .project-card__vector {
  transform: scale(1.05);
}

.project-card__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(212, 255, 63, 0.16), transparent 70%);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.project-card:hover .project-card__glow {
  opacity: 1;
}

.project-card__badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: var(--color-accent);
  color: #0a0a0a;
}

/* ── Body ── */
.project-card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 26px;
}

.project-card__meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.project-card__title {
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: var(--color-ink);
  transition: color var(--transition-fast);
}

.project-card:hover .project-card__title {
  color: var(--color-accent);
}

.project-card__year {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.project-card__description {
  flex: 1;
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin-bottom: 18px;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

/* ── Footer ── */
.project-card__footer {
  position: relative;
  z-index: 3;
  display: flex;
  gap: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
  /* The rule spans the full card, but only the links intercept clicks —
     empty footer space still falls through to the card-wide overlay. */
  pointer-events: none;
}

.project-card__footer > * {
  pointer-events: auto;
}

.project-card__link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.project-card__link:hover {
  color: var(--color-accent);
}

.project-card__link--live {
  color: var(--color-accent);
}

.project-card__link--live:hover {
  color: var(--color-ink);
}

.project-card__arrow {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 9px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(10, 10, 10, 0.72);
  backdrop-filter: blur(10px);
  color: var(--color-ink);
  transition: background var(--transition-fast), color var(--transition-fast), transform var(--transition-fast);
}

.project-card:hover .project-card__arrow {
  background: var(--color-accent);
  color: #0a0a0a;
  transform: translate(3px, -3px);
}
</style>
