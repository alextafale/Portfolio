<template>
  <div class="home">
    <!-- ── Hero ── -->
    <section class="hero">
      <div class="container hero__inner">
        <!-- Left: Text content -->
        <div class="hero__content">
          <div class="hero__eyebrow" ref="eyebrowRef">
            <span class="hero__status-dot" />
            <span>{{ $t('home.hero.status') }}</span>
          </div>

          <h1 class="hero__heading" ref="headingRef">
            Alejandro<br />Alejandre<span class="hero__dot">.</span>
          </h1>

          <div class="hero__role-wrapper">
            <span class="hero__role" ref="roleRef"></span>
          </div>

          <p class="hero__bio" ref="bioRef">{{ profile.shortBio[locale as 'en' | 'es'] }}</p>

          <div class="hero__actions">
            <AppButton variant="primary" :to="localePath('/proyects')">
              {{ $t('home.hero.cta_projects') }}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </AppButton>
            <AppButton variant="secondary" :to="localePath('/contact')">
              {{ $t('home.hero.cta_contact') }}
            </AppButton>
          </div>
        </div>

        <!-- Right: Photo -->
        <div class="hero__visual" ref="visualRef">
          <div class="hero__photo-frame">
            <img src="~/assets/images/image.png" alt="Alejandro Alejandre Tafolla" class="hero__photo" />
            <span class="hero__photo-caption mono-label">{{ profile.location[locale as 'en' | 'es'] }} — {{ new Date().getFullYear() }}</span>
          </div>
        </div>
      </div>

      <!-- Stats band -->
      <div class="container">
        <div class="hero__stats" ref="statsRef">
          <div v-for="(stat, i) in stats" :key="stat.value" class="hero__stat">
            <span class="hero__stat-num mono-label">0{{ i + 1 }}</span>
            <span class="hero__stat-value">{{ stat.value }}</span>
            <span class="hero__stat-label">{{ stat.label[locale as 'en' | 'es'] }}</span>
          </div>
          <div class="hero__stat hero__stat--techs">
            <span class="hero__stat-num mono-label">0{{ stats.length + 1 }}</span>
            <div class="hero__badges">
              <span v-for="tech in heroTechs" :key="tech" class="hero__badge">{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Featured projects ── -->
    <section class="featured section" data-robot="featured">
      <div class="container">
        <div class="featured__head">
          <SectionTitle :eyebrow="`01 / ${$t('home.featured.eyebrow')}`">
            {{ $t('home.featured.title') }}
          </SectionTitle>
          <NuxtLink :to="localePath('/proyects')" class="featured__all">
            {{ $t('home.featured.view_all') }}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </NuxtLink>
        </div>

        <div class="featured__list">
          <NuxtLink
            v-for="(project, i) in featuredProjects"
            :key="project.id"
            :to="localePath(`/proyects/${project.slug}`)"
            class="featured__row"
          >
            <span class="featured__num mono-label">0{{ i + 1 }}</span>
            <div class="featured__info">
              <h3 class="featured__title">{{ project.title }}</h3>
              <p class="featured__desc">{{ project.description[locale as 'en' | 'es'] }}</p>
            </div>
            <div class="featured__tags">
              <span v-for="tag in project.tags.slice(0, 4)" :key="tag" class="featured__tag">{{ tag }}</span>
            </div>
            <svg class="featured__arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ── AI workflow ── -->
    <section class="ai section" data-robot="ai">
      <div class="container">
        <SectionTitle
          :eyebrow="`02 / ${$t('home.ai.eyebrow')}`"
          :subtitle="$t('home.ai.subtitle')"
        >
          {{ $t('home.ai.title') }}
        </SectionTitle>

        <div class="ai__grid">
          <article
            v-for="(item, i) in aiWorkflow"
            :key="item.id"
            class="ai__card"
          >
            <header class="ai__card-head">
              <div class="ai__card-icon" aria-hidden="true" v-html="item.icon" />
              <span class="ai__card-num mono-label">0{{ i + 1 }}</span>
            </header>
            <h3 class="ai__card-title">{{ item.title[locale as 'en' | 'es'] }}</h3>
            <p class="ai__card-desc">{{ item.description[locale as 'en' | 'es'] }}</p>
            <div class="ai__card-tools">
              <span v-for="tool in item.tools" :key="tool" class="ai__tool">{{ tool }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { profile, stats } from '~/data/profile'
import { projects } from '~/data/projects'
import { aiWorkflow } from '~/data/aiWorkflow'
import { useAnimations } from '~/composables/useAnimations'

const { locale } = useI18n()
const localePath = useLocalePath()

definePageMeta({ layout: 'default' })

const eyebrowRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const roleRef = ref<HTMLElement | null>(null)
const bioRef = ref<HTMLElement | null>(null)
const visualRef = ref<HTMLElement | null>(null)
const statsRef = ref<HTMLElement | null>(null)

const heroTechs = ['TypeScript', 'Vue.js', 'Nuxt', 'React Native', 'FastAPI', 'Supabase', 'Claude API', 'MCP']

const featuredProjects = computed(() => projects.filter(p => p.featured))

const { initGsap, magneticEffect, animateTextReveal, typewriterEffect, blurFadeIn, scrollStagger } = useAnimations()

onMounted(async () => {
  const { gsap } = await initGsap()

  // Hero entrance sequence
  if (headingRef.value) {
    animateTextReveal(headingRef.value, { delay: 0.15 })
  }

  if (roleRef.value) {
    typewriterEffect(roleRef.value, profile.title[locale.value as 'en' | 'es'], { delay: 0.9, speed: 0.06 })
  }

  if (bioRef.value) {
    blurFadeIn(bioRef.value, { delay: 1.2 })
  }

  gsap.fromTo(
    eyebrowRef.value,
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
  )

  gsap.fromTo(
    visualRef.value,
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 0.9, delay: 0.25, ease: 'power3.out' },
  )

  // Stats band
  scrollStagger('.hero__stat', { y: 24, stagger: 0.1 })

  // Featured rows + AI cards on scroll
  scrollStagger('.featured__row', { y: 30, stagger: 0.12 })
  scrollStagger('.ai__card', { y: 30, stagger: 0.1 })

  // Magnetic elements
  const magnets = document.querySelectorAll('.hero__actions .app-btn')
  magnets.forEach(el => magneticEffect(el as HTMLElement, 0.35))

  // 3D tilt on hero photo and AI cards
  const addTilt = (el: HTMLElement, max = 7) => {
    el.addEventListener('mousemove', (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -2 * max
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 2 * max
      gsap.to(el, { rotateX: rx, rotateY: ry, transformPerspective: 900, duration: 0.4, ease: 'power2.out' })
    })
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' })
    })
  }
  document.querySelectorAll('.hero__photo-frame, .ai__card').forEach(el => addTilt(el as HTMLElement))
})
</script>

<style scoped>
/* ── Hero ── */
.hero {
  padding-top: clamp(130px, 16vh, 180px);
  padding-bottom: clamp(48px, 6vw, 80px);
}

.hero__inner {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: clamp(40px, 6vw, 80px);
  margin-bottom: clamp(48px, 7vw, 88px);
}

/* Available status */
.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-ok);
  margin-bottom: 24px;
}

.hero__status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse 2s infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
  50% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
}

/* Heading */
.hero__heading {
  font-size: clamp(3rem, 7vw, 5.4rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.04em;
  margin-bottom: 20px;
  color: var(--color-ink);
}

.hero__dot {
  color: var(--color-accent);
}

.hero__role-wrapper {
  min-height: 2.4rem;
  margin-bottom: 20px;
}

.hero__role {
  font-family: var(--font-mono);
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 700;
  color: var(--color-accent);
}

.hero__bio {
  font-size: 1.02rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 480px;
  margin-bottom: 34px;
}

/* Action buttons */
.hero__actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

/* ── Photo ── */
.hero__visual {
  display: flex;
  justify-content: center;
}

.hero__photo-frame {
  position: relative;
  width: min(320px, 100%);
  border: 1.5px solid var(--color-ink);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  padding: 12px;
  box-shadow: var(--shadow-hard-accent);
}

.hero__photo {
  width: 100%;
  aspect-ratio: 4 / 4.6;
  object-fit: cover;
  border-radius: var(--radius-sm);
  filter: saturate(0.92);
}

.hero__photo-caption {
  display: block;
  margin-top: 10px;
  color: var(--color-text-muted);
  font-size: 0.65rem;
}

/* ── Stats band ── */
.hero__stats {
  display: grid;
  grid-template-columns: repeat(3, auto) 1fr;
  gap: clamp(24px, 4vw, 56px);
  border-top: 1.5px solid var(--color-ink);
  padding-top: 28px;
}

.hero__stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hero__stat-num {
  color: var(--color-text-muted);
  font-size: 0.65rem;
}

.hero__stat-value {
  font-family: var(--font-heading);
  font-size: clamp(1.7rem, 3vw, 2.3rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-ink);
}

.hero__stat-label {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.hero__stat--techs {
  justify-content: flex-start;
}

.hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}

.hero__badge {
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.hero__badge:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

/* ── Featured ── */
.featured {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.featured__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

.featured__head :deep(.section-title) {
  margin-bottom: clamp(28px, 4vw, 44px);
}

.featured__all {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: clamp(28px, 4vw, 44px);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  white-space: nowrap;
  transition: color var(--transition-fast);
}

.featured__all:hover {
  color: var(--color-accent);
}

.featured__list {
  display: flex;
  flex-direction: column;
}

.featured__row {
  display: grid;
  grid-template-columns: 48px 1.4fr 1fr 32px;
  align-items: center;
  gap: 24px;
  padding: 28px 8px;
  border-top: 1px solid var(--color-border);
  transition: background var(--transition-fast), padding var(--transition-fast);
}

.featured__row:last-child {
  border-bottom: 1px solid var(--color-border);
}

.featured__row:hover {
  background: var(--color-accent-soft);
  padding-left: 20px;
}

.featured__num {
  color: var(--color-text-muted);
}

.featured__title {
  font-size: clamp(1.3rem, 2.5vw, 1.7rem);
  font-weight: 700;
  color: var(--color-ink);
  margin-bottom: 4px;
  transition: color var(--transition-fast);
}

.featured__row:hover .featured__title {
  color: var(--color-accent);
}

.featured__desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.featured__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;
}

.featured__tag {
  padding: 3px 9px;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  background: var(--color-bg);
}

.featured__arrow {
  color: var(--color-text-muted);
  transition: color var(--transition-fast), transform var(--transition-fast);
}

.featured__row:hover .featured__arrow {
  color: var(--color-accent);
  transform: translate(3px, -3px);
}

/* ── AI workflow ── */
.ai__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.ai__card {
  display: flex;
  flex-direction: column;
  padding: 26px;
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  transition:
    border-color var(--transition-fast),
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.ai__card:hover {
  border-color: var(--color-ink);
  transform: translate(-3px, -3px);
  box-shadow: var(--shadow-hard);
}

.ai__card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.ai__card-icon {
  width: 44px;
  height: 44px;
  padding: 9px;
  border-radius: var(--radius-sm);
  background: var(--color-accent-soft);
  border: 1.5px solid var(--color-border);
  color: var(--color-accent);
}

.ai__card-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.ai__card-num {
  color: var(--color-text-muted);
}

.ai__card-title {
  font-size: 1.08rem;
  font-weight: 700;
  color: var(--color-ink);
  margin-bottom: 10px;
}

.ai__card-desc {
  flex: 1;
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin-bottom: 18px;
}

.ai__card-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 14px;
  border-top: 1px solid var(--color-border);
}

.ai__tool {
  padding: 2px 9px;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.64rem;
  font-weight: 700;
  color: var(--color-accent-ink);
  background: var(--color-accent-soft);
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .hero__inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero__eyebrow { justify-content: center; }
  .hero__bio { margin-left: auto; margin-right: auto; }
  .hero__actions { justify-content: center; }
  .hero__visual { display: none; }

  .hero__stats {
    grid-template-columns: repeat(3, 1fr);
  }

  .hero__stat--techs {
    grid-column: 1 / -1;
  }

  .featured__row {
    grid-template-columns: 32px 1fr 24px;
  }

  .featured__tags { display: none; }
}
</style>
