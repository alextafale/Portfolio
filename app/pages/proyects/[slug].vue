<template>
  <div v-if="project" class="project-detail">
    <!-- Header/Hero section for the project -->
    <header class="project-header" ref="headerRef">
      <div class="container project-header__inner">
        <NuxtLink to="/proyects" class="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to Projects
        </NuxtLink>

        <div class="project-header__content">
          <h1 class="project-title gradient-text">{{ project.title }}</h1>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="project-tag">
              {{ tag }}
            </span>
          </div>
          <p class="project-description">{{ project.description }}</p>
          
          <div class="project-links">
            <AppButton :to="project.githubUrl" target="_blank" variant="primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Repository
            </AppButton>
            <AppButton v-if="project.liveUrl" :to="project.liveUrl" target="_blank" variant="secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </AppButton>
          </div>
        </div>
      </div>
    </header>

    <main class="project-content container">
      <div class="project-content__grid">
        <!-- Left column: Detailed info -->
        <article class="project-main" ref="mainRef">
          <section class="project-section">
            <h2 class="section-title-sm">Overview</h2>
            <p class="text-long">{{ project.longDescription || project.description }}</p>
          </section>

          <section v-if="project.features?.length" class="project-section">
            <h2 class="section-title-sm">Key Features</h2>
            <ul class="features-list">
              <li v-for="feature in project.features" :key="feature" class="feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="3">
                  <path d="M20 6L9 17L4 12" />
                </svg>
                {{ feature }}
              </li>
            </ul>
          </section>
        </article>

        <!-- Right column: Extra details/sidebar -->
        <aside class="project-sidebar" ref="sidebarRef">
          <div class="sidebar-box">
            <h3 class="sidebar-title">Tech Stack</h3>
            <div class="sidebar-tags">
              <span v-for="tag in project.tags" :key="tag" class="sidebar-tag">
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="sidebar-box">
            <h3 class="sidebar-title">Role</h3>
            <p class="sidebar-text">Solo Developer</p>
          </div>

          <div class="sidebar-box">
            <h3 class="sidebar-title">Year</h3>
            <p class="sidebar-text">2024</p>
          </div>
        </aside>
      </div>

      <!-- Optional showcase images -->
      <section v-if="project.images?.length" class="project-gallery section" ref="galleryRef">
        <h2 class="section-title-sm">Showcase</h2>
        <div class="gallery-grid">
          <div v-for="(img, idx) in project.images" :key="idx" class="gallery-item">
            <img :src="img" :alt="`${project.title} screenshot ${idx + 1}`" />
          </div>
        </div>
      </section>
    </main>
  </div>
  <div v-else class="project-not-found container section">
    <h1 class="gradient-text">Project not found</h1>
    <AppButton to="/proyects" variant="primary">Back to Projects</AppButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '~/data/projects'
import { useAnimations } from '~/composables/useAnimations'

const route = useRoute()
const project = computed(() => projects.find(p => p.slug === route.params.slug))

definePageMeta({ layout: 'default' })

const headerRef = ref(null)
const mainRef = ref(null)
const sidebarRef = ref(null)
const galleryRef = ref(null)

const { initGsap, fadeInUp } = useAnimations()

onMounted(async () => {
  const { gsap } = await initGsap()

  if (headerRef.value) {
    fadeInUp('.project-header__content > *', { stagger: 0.1, delay: 0.2 })
  }

  if (mainRef.value) {
    gsap.from(mainRef.value, {
      opacity: 0,
      x: -30,
      duration: 0.8,
      delay: 0.4,
      ease: 'power3.out'
    })
  }

  if (sidebarRef.value) {
    gsap.from(sidebarRef.value, {
      opacity: 0,
      x: 30,
      duration: 0.8,
      delay: 0.5,
      ease: 'power3.out'
    })
  }
})
</script>

<style scoped>
.project-detail {
  padding-top: 100px;
}

.project-header {
  padding: 60px 0;
  border-bottom: 1px solid var(--color-border);
  background: radial-gradient(circle at top right, rgba(124, 58, 237, 0.05) 0%, transparent 50%);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin-bottom: 32px;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--color-accent-3);
}

.project-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 28px;
}

.project-tag {
  padding: 6px 14px;
  background: rgba(124, 58, 237, 0.1);
  border: 1px solid rgba(124, 58, 237, 0.2);
  color: var(--color-accent-3);
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 500;
}

.project-description {
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  max-width: 800px;
  margin-bottom: 40px;
  line-height: 1.6;
}

.project-links {
  display: flex;
  gap: 16px;
}

.project-content {
  padding: 80px 0;
}

.project-content__grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 80px;
}

.project-section {
  margin-bottom: 60px;
}

.section-title-sm {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--color-text-primary);
}

.text-long {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.features-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-text-secondary);
  font-size: 1rem;
}

.project-sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar-box {
  padding: 24px;
  background: var(--gradient-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.sidebar-title {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}

.sidebar-text {
  color: var(--color-text-primary);
  font-weight: 500;
}

.sidebar-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.sidebar-tag {
  font-size: 0.8rem;
  color: var(--color-cyan-2);
  background: rgba(6, 182, 212, 0.1);
  padding: 4px 10px;
  border-radius: 4px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.gallery-item img {
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.02);
}

@media (max-width: 1024px) {
  .project-content__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 640px) {
  .features-list {
    grid-template-columns: 1fr;
  }
}
</style>
