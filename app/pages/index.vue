<template>
  <div class="hero-page">
    <!-- Background glow -->
    <div class="hero-page__glow" aria-hidden="true" />

    <section class="hero section">
      <div class="container hero__inner">
        <!-- Left: Text content -->
        <div class="hero__content" ref="contentRef">
          <div class="hero__eyebrow">
            <span class="hero__status-dot" />
            <span>{{ $t('home.hero.status') }}</span>
          </div>

          <h1 class="hero__heading">
            {{ $t('home.hero.greeting') }}
            <span class="gradient-text">Alejandro</span>
            <br />
            <span class="hero__role">{{ profile.title[locale] }}</span>
          </h1>

          <p class="hero__bio">{{ profile.shortBio[locale] }}</p>

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

          <!-- Tech badges row -->
          <div class="hero__badges">
            <span
              v-for="tech in heroTechs"
              :key="tech"
              class="hero__badge"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- Right: Avatar placeholder -->
        <div class="hero__visual" ref="visualRef">
          <div class="hero__avatar-wrapper">
            <!-- Replace the div below with <img> once you add your photo to assets/images/profile.jpg -->
             <img src="~/assets/images/image.png" alt="Alejandro Alejandre Tafolla" class="hero__avatar" /> 
          

            <!-- Floating badges around avatar -->
            <div class="hero__float hero__float--tl">Vue.js</div>
            <div class="hero__float hero__float--tr">TypeScript</div>
            <div class="hero__float hero__float--bl">Supabase</div>
            <div class="hero__float hero__float--br">Expo</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Scroll indicator -->
    <div class="hero__scroll-cue" aria-hidden="true">
      <div class="hero__scroll-line" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { profile } from '~/data/profile'
import { useAnimations } from '~/composables/useAnimations'

const { locale } = useI18n()
const localePath = useLocalePath()

definePageMeta({ layout: 'default' })

const contentRef = ref<HTMLElement | null>(null)
const visualRef = ref<HTMLElement | null>(null)

const heroTechs = ['Vue.js', 'Nuxt', 'TypeScript', 'Expo', 'Supabase', 'PostgreSQL', 'Python']

const { initGsap, fadeInUp } = useAnimations()

onMounted(async () => {
  const { gsap } = await initGsap()

  // Hero entrance
  gsap.fromTo(
    contentRef.value,
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' },
  )
  gsap.fromTo(
    visualRef.value,
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 0.9, delay: 0.15, ease: 'power3.out' },
  )

  // Floating badges stagger
  gsap.fromTo(
    '.hero__float',
    { opacity: 0, scale: 0.7 },
    { opacity: 1, scale: 1, stagger: 0.1, delay: 0.5, duration: 0.5, ease: 'back.out(1.4)' },
  )

  // Badges row
  gsap.fromTo(
    '.hero__badge',
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, stagger: 0.07, delay: 0.7, duration: 0.4, ease: 'power2.out' },
  )
})
</script>

<style scoped>
.hero-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Background glow effect */
.hero-page__glow {
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 600px;
  background: radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.hero {
  flex: 1;
  display: flex;
  align-items: center;
  padding-top: 120px;
  position: relative;
  z-index: 1;
}

.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: clamp(40px, 6vw, 80px);
}

/* Available status */
.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 100px;
  background: rgba(52, 211, 153, 0.08);
  border: 1px solid rgba(52, 211, 153, 0.2);
  font-size: 0.8rem;
  font-weight: 500;
  color: #6ee7b7;
  margin-bottom: 28px;
  width: fit-content;
}

.hero__status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
  animation: pulse 2s infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.5); }
  50% { box-shadow: 0 0 0 6px rgba(52, 211, 153, 0); }
}

/* Heading */
.hero__heading {
  font-size: clamp(2.8rem, 5.5vw, 4.5rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
}

.hero__role {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 600;
  color: var(--color-text-secondary);
}

.hero__bio {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 480px;
  margin-bottom: 36px;
}

/* Action buttons */
.hero__actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

/* Tech badges */
.hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hero__badge {
  padding: 5px 12px;
  border-radius: 100px;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.hero__badge:hover {
  color: var(--color-text-secondary);
  border-color: rgba(124, 58, 237, 0.3);
}

/* ── Visual / Avatar ── */
.hero__visual {
  display: flex;
  justify-content: center;
}

.hero__avatar-wrapper {
  position: relative;
  width: 340px;
  height: 340px;
}

.hero__avatar-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px dashed rgba(124, 58, 237, 0.3);
  background: rgba(124, 58, 237, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--color-text-muted);
  text-align: center;
}

.hero__avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid rgba(124, 58, 237, 0.25);
}

.hero__avatar-hint {
  font-size: 0.75rem;
  line-height: 1.5;
}

.hero__avatar-hint code {
  font-size: 0.72rem;
  color: var(--color-accent-3);
  background: rgba(124, 58, 237, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}

/* Floating badges */
.hero__float {
  position: absolute;
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--font-heading);
  background: rgba(9, 9, 15, 0.9);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  backdrop-filter: blur(12px);
  white-space: nowrap;
  animation: float 4s ease-in-out infinite;
}

.hero__float--tl { top: 20px;  left: -10px;  animation-delay: 0s; }
.hero__float--tr { top: 40px;  right: -10px; animation-delay: 1s; }
.hero__float--bl { bottom: 50px; left: -20px; animation-delay: 2s; }
.hero__float--br { bottom: 30px; right: -10px; animation-delay: 0.5s; }

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}

/* Scroll cue */
.hero__scroll-cue {
  display: flex;
  justify-content: center;
  padding-bottom: 32px;
  position: relative;
  z-index: 1;
}

.hero__scroll-line {
  width: 1.5px;
  height: 48px;
  background: linear-gradient(to bottom, var(--color-accent-1), transparent);
  animation: scrollLine 2s ease-in-out infinite;
}

@keyframes scrollLine {
  0% { opacity: 0; transform: scaleY(0); transform-origin: top; }
  50% { opacity: 1; transform: scaleY(1); }
  100% { opacity: 0; transform: scaleY(0); transform-origin: bottom; }
}

/* Responsive */
@media (max-width: 768px) {
  .hero__inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero__eyebrow { margin: 0 auto 28px; }
  .hero__bio, .hero__actions, .hero__badges { margin-left: auto; margin-right: auto; }
  .hero__actions, .hero__badges { justify-content: center; }

  .hero__visual { display: none; }
}
</style>
