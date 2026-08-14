<template>
  <div class="projects-page">
    <PageHeader
      :eyebrow="$t('projects.headline')"
      :subtitle="$t('projects.subtitle')"
      ghost="WORK"
    >
      <template #backdrop>
        <ParticleField :count="320" />
      </template>
      {{ $t('projects.title') }}
    </PageHeader>

    <div class="container projects__body">
      <!-- Filter bar -->
      <div class="projects__filters" ref="filtersRef">
        <button
          v-for="tag in availableTags"
          :key="tag"
          class="projects__filter"
          :class="{ 'projects__filter--active': activeTag === tag }"
          @click="activeTag = tag"
        >
          {{ tag === 'All' ? $t('projects.filters.all') : tag }}
        </button>
      </div>

      <!-- Grid -->
      <div class="projects__grid" ref="gridRef">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
        />
      </div>

      <!-- Empty state -->
      <div v-if="!filteredProjects.length" class="projects__empty">
        <p>{{ $t('projects.empty') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { projects } from '~/data/projects'
import { useAnimations } from '~/composables/useAnimations'

const { locale } = useI18n()
const localePath = useLocalePath()

definePageMeta({ layout: 'default' })

const filtersRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)
const activeTag = ref('All')

// Build tag list dynamically from project data
const availableTags = computed(() => {
  const tags = new Set(projects.flatMap(p => p.tags))
  return ['All', ...Array.from(tags)]
})

const filteredProjects = computed(() =>
  activeTag.value === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeTag.value)),
)

const { initGsap, scrollStagger } = useAnimations()

onMounted(async () => {
  const { gsap } = await initGsap()

  gsap.fromTo(
    filtersRef.value,
    { opacity: 0, y: -16 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
  )

  scrollStagger('.projects__grid > *', { stagger: 0.15, delay: 0.2, y: 50 })
})
</script>

<style scoped>
.projects__body {
  padding-bottom: var(--section-padding);
}

/* Filters */
.projects__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 44px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--color-border);
}

.projects__filter {
  padding: 8px 18px;
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition:
    color var(--transition-fast),
    border-color var(--transition-fast),
    background var(--transition-fast),
    box-shadow var(--transition-fast);
}

.projects__filter:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.projects__filter--active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #0a0a0a;
  box-shadow: var(--glow-accent-soft);
}

.projects__filter:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

/* Grid */
.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
}

/* Empty */
.projects__empty {
  text-align: center;
  padding: 80px 0;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

@media (max-width: 520px) {
  .projects__grid {
    grid-template-columns: 1fr;
  }
}
</style>
