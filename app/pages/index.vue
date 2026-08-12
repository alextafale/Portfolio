<template>
  <div class="home">
    <!-- ── Hero ── -->
    <section class="hero">
      <div class="hero__scene-holder">
        <ClientOnly>
          <HeroScene />
        </ClientOnly>
      </div>

      <span class="hero__ghost ghost-type" ref="ghostRef" aria-hidden="true">DEV</span>

      <div class="container hero__inner">
        <div class="hero__content">
          <div class="hero__status" ref="statusRef">
            <span class="hero__status-dot" />
            <span>{{ $t('home.hero.status') }}</span>
          </div>

          <h1 class="hero__heading" ref="headingRef">
            <span class="hero__line">Alejandro</span>
            <span class="hero__line">Alejandre.</span>
          </h1>

          <div class="hero__role-wrapper">
            <span class="hero__role" ref="roleRef" />
          </div>

          <p class="hero__bio" ref="bioRef">{{ profile.shortBio[locale as 'en' | 'es'] }}</p>

          <div class="hero__actions">
            <AppButton variant="primary" :to="localePath('/proyects')">
              {{ $t('home.hero.cta_projects') }}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </AppButton>
            <AppButton variant="secondary" :to="localePath('/contact')">
              {{ $t('home.hero.cta_contact') }}
            </AppButton>
          </div>
        </div>
      </div>

      <div class="hero__scroll" aria-hidden="true">
        <span class="hero__scroll-label">{{ $t('home.hero.scroll') }}</span>
        <span class="hero__scroll-line" />
      </div>
    </section>

    <!-- ── Tech marquee ── -->
    <div class="marquee" aria-hidden="true">
      <div class="marquee__track">
        <span v-for="n in 2" :key="n" class="marquee__group">
          <span v-for="tech in heroTechs" :key="`${n}-${tech}`" class="marquee__item">
            {{ tech }}<span class="marquee__sep">◆</span>
          </span>
        </span>
      </div>
    </div>

    <!-- ── Stats ── -->
    <section class="stats">
      <div class="container">
        <div class="stats__grid">
          <div v-for="(stat, i) in stats" :key="stat.value" class="stats__item">
            <span class="stats__num mono-label">0{{ i + 1 }}</span>
            <span class="stats__value">{{ stat.value }}</span>
            <span class="stats__label">{{ stat.label[locale as 'en' | 'es'] }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Featured projects ── -->
    <section class="featured section">
      <div class="container">
        <div class="featured__head">
          <SectionTitle :eyebrow="`01 / ${$t('home.featured.eyebrow')}`">
            {{ $t('home.featured.title') }}
          </SectionTitle>
          <NuxtLink :to="localePath('/proyects')" class="featured__all">
            {{ $t('home.featured.view_all') }}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </NuxtLink>
        </div>

        <div class="featured__grid">
          <NuxtLink
            v-for="(project, i) in featuredProjects"
            :key="project.id"
            :to="localePath(`/proyects/${project.slug}`)"
            class="featured__card"
          >
            <div class="featured__media">
              <img
                v-if="project.cover ?? project.images?.[0]"
                :src="project.cover ?? project.images?.[0]"
                :alt="project.title"
                class="featured__img"
                loading="lazy"
              />
              <!-- Not every project has a mockup shot; every one has a vector. -->
              <div
                v-else-if="project.svgVector"
                class="featured__vector"
                aria-hidden="true"
                v-html="project.svgVector"
              />
              <span class="featured__glow" aria-hidden="true" />
            </div>

            <div class="featured__body">
              <div class="featured__meta">
                <span class="featured__index mono-label">0{{ i + 1 }}</span>
                <span v-if="project.year" class="featured__year">{{ project.year }}</span>
              </div>

              <h3 class="featured__title">{{ project.title }}</h3>
              <p class="featured__desc">{{ project.description[locale as 'en' | 'es'] }}</p>

              <div class="featured__tags">
                <span v-for="tag in project.tags.slice(0, 4)" :key="tag" class="chip">{{ tag }}</span>
              </div>
            </div>

            <svg class="featured__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ── AI workflow ── -->
    <section class="ai section">
      <div class="container">
        <SectionTitle
          :eyebrow="`02 / ${$t('home.ai.eyebrow')}`"
          :subtitle="$t('home.ai.subtitle')"
        >
          {{ $t('home.ai.title') }}
        </SectionTitle>

        <div class="ai__grid">
          <article v-for="(item, i) in aiWorkflow" :key="item.id" class="ai__card">
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

const ghostRef = ref<HTMLElement | null>(null)
const statusRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const roleRef = ref<HTMLElement | null>(null)
const bioRef = ref<HTMLElement | null>(null)

const heroTechs = ['TypeScript', 'Vue.js', 'Nuxt', 'React Native', 'FastAPI', 'Supabase', 'Claude API', 'MCP']

const featuredProjects = computed(() => projects.filter(p => p.featured))

const { initGsap, magneticEffect, charReveal, typewriterEffect, blurFadeIn, scrollStagger, parallax } = useAnimations()

onMounted(async () => {
  const { gsap } = await initGsap()

  gsap.fromTo(statusRef.value, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })

  if (headingRef.value) {
    const split = await charReveal(headingRef.value, { delay: 0.15 })
    // Tint the trailing period once SplitType has produced the char spans.
    // Marking it up beforehand would nest an element inside the split target,
    // which is exactly the case that breaks char splitting.
    split?.chars?.at(-1)?.classList.add('hero__period')
  }

  if (roleRef.value) {
    typewriterEffect(roleRef.value, profile.title[locale.value as 'en' | 'es'], { delay: 1, speed: 0.05 })
  }

  if (bioRef.value) blurFadeIn(bioRef.value, { delay: 1.25 })

  if (ghostRef.value) parallax(ghostRef.value, { distance: 160, trigger: '.hero' })

  scrollStagger('.stats__item', { y: 28, stagger: 0.1 })
  scrollStagger('.featured__card', { y: 40, stagger: 0.14 })
  scrollStagger('.ai__card', { y: 30, stagger: 0.1 })

  document
    .querySelectorAll<HTMLElement>('.hero__actions .app-btn')
    .forEach(el => magneticEffect(el, 0.3))
})
</script>

<style scoped>
/* ── Hero ── */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: 96px;
}

/* The 3D object owns the right side so it never sits under the headline. */
.hero__scene-holder {
  position: absolute;
  top: 0;
  right: -6%;
  width: 60%;
  height: 100%;
  z-index: 1;
}

/* Oversized outline word sitting behind the headline, drifting on scroll. */
.hero__ghost {
  position: absolute;
  /* Sits behind the headline rather than the body copy — the outline strokes
     cut through paragraph text and hurt readability. */
  top: 40%;
  left: 0;
  transform: translate(-4%, -50%);
  font-size: clamp(9rem, 23vw, 23rem);
  line-height: 1;
  z-index: 0;
}

.hero__inner {
  position: relative;
  z-index: 2;
}

.hero__content {
  max-width: 780px;
}

.hero__status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  margin-bottom: 32px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: rgba(18, 18, 18, 0.7);
  backdrop-filter: blur(12px);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.hero__status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 10px var(--color-accent);
  animation: pulse 2.2s infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.35; }
}

.hero__heading {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 7.2vw, 6.6rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.055em;
  text-transform: uppercase;
  color: var(--color-ink);
  margin-bottom: 26px;
}

/* overflow hides the char masks; the padding keeps descenders from clipping.
   nowrap is load-bearing: SplitType turns every character into an inline-block,
   so without it a name that overruns the column by a few pixels drops its last
   glyph onto a line of its own. */
.hero__line {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  padding-bottom: 0.06em;
}

/* SplitType builds these spans at runtime, so they never receive the scoped
   style attribute — :deep is required for the rule to land. */
.hero__heading :deep(.hero__period) {
  color: var(--color-accent);
}

.hero__role-wrapper {
  min-height: 2rem;
  margin-bottom: 22px;
}

.hero__role {
  font-family: var(--font-mono);
  font-size: clamp(0.9rem, 1.8vw, 1.15rem);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.hero__bio {
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.75;
  max-width: 480px;
  margin-bottom: 40px;
}

.hero__actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.hero__scroll {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.hero__scroll-label {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.hero__scroll-line {
  width: 1px;
  height: 52px;
  background: linear-gradient(to bottom, var(--color-accent), transparent);
}

/* ── Marquee ── */
.marquee {
  overflow: hidden;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: 20px 0;
  /* Fades both ends so the loop seam is never visible. */
  -webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 38s linear infinite;
}

/* The track holds two identical groups, so translating by exactly -50% lands
   the second group where the first started — a seamless loop. */
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.marquee__group {
  display: flex;
  flex-shrink: 0;
}

.marquee__item {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 2.2vw, 1.6rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.marquee__sep {
  color: var(--color-accent);
  font-size: 0.5em;
  margin: 0 clamp(20px, 3vw, 40px);
}

/* ── Stats ── */
.stats {
  padding: clamp(64px, 8vw, 104px) 0;
}

.stats__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(28px, 4vw, 56px);
}

.stats__item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 22px;
  border-top: 1px solid var(--color-border);
}

.stats__num {
  color: var(--color-text-muted);
  font-size: 0.62rem;
}

.stats__value {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--color-accent);
}

.stats__label {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

/* ── Featured ── */
.featured__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

.featured__head :deep(.section-title) {
  margin-bottom: clamp(32px, 4vw, 52px);
}

.featured__all {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: clamp(32px, 4vw, 52px);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  white-space: nowrap;
  transition: color var(--transition-fast);
}

.featured__all:hover {
  color: var(--color-accent);
}

.featured__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.featured__card {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  overflow: hidden;
  transition:
    border-color var(--transition-normal),
    transform var(--transition-normal),
    box-shadow var(--transition-normal);
}

.featured__card:hover {
  border-color: var(--color-accent);
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg), var(--glow-accent-soft);
}

.featured__media {
  position: relative;
  aspect-ratio: 16 / 10;
  background: var(--color-bg);
  overflow: hidden;
}

.featured__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform var(--transition-slow);
}

.featured__card:hover .featured__img {
  transform: scale(1.04);
}

/* Vector fallback for projects without a mockup shot. */
.featured__vector {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212, 255, 63, 0.07), transparent 70%),
    repeating-linear-gradient(
      45deg,
      transparent 0 11px,
      rgba(255, 255, 255, 0.018) 11px 12px
    );
  color: var(--color-accent);
  transition: transform var(--transition-slow);
}

.featured__vector :deep(svg) {
  width: clamp(96px, 26%, 150px);
  height: auto;
  opacity: 0.9;
}

.featured__card:hover .featured__vector {
  transform: scale(1.05);
}

/* Accent wash that only resolves on hover. */
.featured__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(212, 255, 63, 0.16), transparent 70%);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.featured__card:hover .featured__glow {
  opacity: 1;
}

.featured__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 28px;
}

.featured__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.featured__year {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--color-text-muted);
}

.featured__title {
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: var(--color-ink);
  margin-bottom: 10px;
  transition: color var(--transition-fast);
}

.featured__card:hover .featured__title {
  color: var(--color-accent);
}

.featured__desc {
  flex: 1;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin-bottom: 20px;
}

.featured__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.featured__arrow {
  position: absolute;
  top: 24px;
  right: 24px;
  padding: 9px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(10, 10, 10, 0.72);
  backdrop-filter: blur(10px);
  color: var(--color-ink);
  transition: background var(--transition-fast), color var(--transition-fast), transform var(--transition-fast);
}

.featured__card:hover .featured__arrow {
  background: var(--color-accent);
  color: #0a0a0a;
  transform: translate(3px, -3px);
}

/* ── AI workflow ── */
.ai {
  border-top: 1px solid var(--color-border);
}

.ai__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.ai__card {
  display: flex;
  flex-direction: column;
  padding: 30px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast), background var(--transition-fast);
}

.ai__card:hover {
  border-color: var(--color-border-strong);
  background: var(--color-raised);
}

.ai__card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.ai__card-icon {
  width: 46px;
  height: 46px;
  padding: 11px;
  border-radius: var(--radius-sm);
  background: var(--color-accent-soft);
  border: 1px solid var(--color-border);
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
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-ink);
  margin-bottom: 12px;
}

.ai__card-desc {
  flex: 1;
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 20px;
}

.ai__card-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
}

.ai__tool {
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: 0.64rem;
  color: var(--color-accent);
  background: var(--color-accent-soft);
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .hero {
    min-height: auto;
    padding-top: 128px;
    padding-bottom: 96px;
  }

  /* No room for a side-by-side split — the scene becomes a backdrop. */
  .hero__scene-holder {
    right: 0;
    width: 100%;
    opacity: 0.45;
  }

  .hero__scroll { display: none; }

  .featured__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .featured__body { padding: 22px; }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track { animation: none; }
}
</style>
