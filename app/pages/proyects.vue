<template>
  <div class="projects-page section">
    <div class="container">
      <SectionTitle
        eyebrow="My Work"
        subtitle="A collection of projects I've built. Replace the placeholders with your real GitHub repos in data/projects.ts"
      >
        Projects
      </SectionTitle>

      <!-- Filter bar -->
      <div class="projects__filters" ref="filtersRef">
        <button
          v-for="tag in availableTags"
          :key="tag"
          class="projects__filter"
          :class="{ 'projects__filter--active': activeTag === tag }"
          @click="activeTag = tag"
        >
          {{ tag }}
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
        <p>No projects match this filter.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { projects } from '~/data/projects'
import { useAnimations } from '~/composables/useAnimations'

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

const { initGsap } = useAnimations()

onMounted(async () => {
  const { gsap } = await initGsap()

  gsap.fromTo(
    filtersRef.value,
    { opacity: 0, y: -16 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
  )

  gsap.fromTo(
    '.projects__grid > *',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.65, delay: 0.2, ease: 'power3.out' },
  )
})
</script>

<style scoped>
.projects-page {
  padding-top: 120px;
}

/* Filters */
.projects__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 40px;
}

.projects__filter {
  padding: 7px 16px;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 500;
  background: transparent;
  color: var(--color-text-secondary);
  border: 1.5px solid var(--color-border);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.projects__filter:hover {
  color: var(--color-text-primary);
  border-color: rgba(124, 58, 237, 0.35);
}

.projects__filter--active {
  background: rgba(124, 58, 237, 0.15);
  border-color: var(--color-accent-1);
  color: var(--color-accent-3);
}

/* Grid */
.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

/* Empty */
.projects__empty {
  text-align: center;
  padding: 60px 0;
  color: var(--color-text-muted);
}
</style>
