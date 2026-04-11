<template>
  <NuxtLink 
    :to="localePath(`/proyects/${project.slug}`)" 
    class="project-card" 
    :class="{ 'project-card--featured': project.featured }"
  >
    <!-- Featured badge -->
    <span v-if="project.featured" class="project-card__badge">Featured</span>

    <div class="project-card__body">
      <!-- Icon -->
      <div class="project-card__icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      </div>

      <h3 class="project-card__title">{{ project.title }}</h3>
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
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
import type { Project } from '~/types'

const { locale } = useI18n()
const localePath = useLocalePath()

defineProps<{ project: Project }>()
</script>

<style scoped>
.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--gradient-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 28px;
  transition: border-color var(--transition-normal), transform var(--transition-normal), box-shadow var(--transition-normal);
  overflow: hidden;
}

.project-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-glow);
  opacity: 0;
  transition: opacity var(--transition-normal);
  pointer-events: none;
}

.project-card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.project-card:hover::before {
  opacity: 1;
}

.project-card--featured {
  border-color: rgba(124, 58, 237, 0.25);
}

/* Badge */
.project-card__badge {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 4px 10px;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(124, 58, 237, 0.2);
  color: var(--color-accent-3);
  border: 1px solid rgba(124, 58, 237, 0.3);
}

/* Body */
.project-card__body {
  flex: 1;
}

.project-card__icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  background: rgba(124, 58, 237, 0.12);
  border: 1px solid rgba(124, 58, 237, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-2);
  margin-bottom: 18px;
}

.project-card__title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--color-text-primary);
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
  margin-bottom: 24px;
}

.project-card__tag {
  padding: 4px 10px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 500;
  background: rgba(6, 182, 212, 0.1);
  color: var(--color-cyan-2);
  border: 1px solid rgba(6, 182, 212, 0.2);
}

/* Footer */
.project-card__footer {
  display: flex;
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}

.project-card__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.project-card__link:hover {
  color: var(--color-accent-3);
}

.project-card__link--live {
  color: var(--color-cyan-1);
}

.project-card__link--live:hover {
  color: var(--color-cyan-2);
}
</style>
