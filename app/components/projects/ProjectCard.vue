<template>
  <NuxtLink
    :to="localePath(`/proyects/${project.slug}`)"
    class="project-card"
    @mouseenter="onHover(true)"
    @mouseleave="onHover(false)"
    ref="cardRef"
  >
    <header class="project-card__top">
      <!-- Icon / Vector Graphics -->
      <div
        class="project-card__icon"
        aria-hidden="true"
        v-if="project.svgVector"
        v-html="project.svgVector"
      ></div>
      <div class="project-card__icon" aria-hidden="true" v-else>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      </div>

      <div class="project-card__meta">
        <span v-if="project.year" class="project-card__year">{{ project.year }}</span>
        <span v-if="project.featured" class="project-card__badge">★ Featured</span>
      </div>
    </header>

    <div class="project-card__body">
      <h3 class="project-card__title">
        {{ project.title }}
        <svg class="project-card__arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </h3>
      <p class="project-card__description">{{ project.description[locale as 'en' | 'es'] }}</p>

      <!-- Tags -->
      <div class="project-card__tags">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="project-card__tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Links -->
    <footer class="project-card__footer" @click.stop>
      <a
        :href="project.githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="project-card__link"
        aria-label="View on GitHub"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
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
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        Live Demo
      </a>
    </footer>
  </NuxtLink>
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
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 26px;
  transition:
    border-color var(--transition-fast),
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.project-card:hover {
  border-color: var(--color-ink);
  transform: translate(-3px, -3px);
  box-shadow: var(--shadow-hard);
}

/* Top row */
.project-card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
}

.project-card__icon {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-sm);
  background: var(--color-accent-soft);
  border: 1.5px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent);
  overflow: hidden;
}

:deep(.project-card__icon svg) {
  width: 100%;
  height: 100%;
  padding: 8px;
}

.project-card__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.project-card__year {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

.project-card__badge {
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: var(--color-accent);
  color: #ffffff;
}

/* Body */
.project-card__body {
  flex: 1;
}

.project-card__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--color-ink);
}

.project-card__arrow {
  opacity: 0;
  color: var(--color-accent);
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.project-card:hover .project-card__arrow {
  opacity: 1;
  transform: translate(2px, -2px);
}

.project-card__description {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin-bottom: 20px;
}

/* Tags */
.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 22px;
}

.project-card__tag {
  padding: 3px 9px;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  background: var(--color-bg);
}

/* Footer */
.project-card__footer {
  display: flex;
  gap: 18px;
  padding-top: 18px;
  border-top: 1px solid var(--color-border);
}

.project-card__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 700;
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
  color: var(--color-accent-ink);
}
</style>
