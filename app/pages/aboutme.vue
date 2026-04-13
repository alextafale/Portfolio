<template>
  <div class="about-page section">
    <div class="container">
      <SectionTitle :eyebrow="$t('about.headline')" :subtitle="$t('about.subtitle')">
        {{ $t('about.title') }}
      </SectionTitle>

      <div class="about__grid">
        <!-- Left: Bio card -->
        <div class="about__bio-wrapper" ref="bioRef">
          <div class="about__photo-placeholder">
            <img src="~/assets/images/image.png" alt="Alejandro Alejandre Tafolla" class="hero__avatar" /> 
          </div>

          <div class="about__bio-card">
            <h2 class="about__name gradient-text">Alejandro Alejandre Tafolla</h2>
            <p class="about__role">{{ profile.title[locale] }} · {{ profile.location[locale] }}</p>
            <p class="about__bio">{{ profile.longBio[locale] }}</p>

            <div class="about__info-grid">
              <div class="about__info-item">
                <span class="about__info-label">{{ $t('about.info.location') }}</span>
                <span class="about__info-value">{{ profile.location[locale] }} 🇲🇽</span>
              </div>
              <div class="about__info-item">
                <span class="about__info-label">{{ $t('about.info.status') }}</span>
                <span class="about__info-value about__info-value--available">
                  <span class="dot" />{{ $t('about.info.available') }}
                </span>
              </div>
              <div class="about__info-item">
                <span class="about__info-label">{{ $t('about.info.focus') }}</span>
                <span class="about__info-value">Web & Mobile</span>
              </div>
              <div class="about__info-item">
                <span class="about__info-label">{{ $t('about.info.languages') }}</span>
                <span class="about__info-value">Spanish (Native), English (B2)</span>
              </div>
            </div>

            <div class="about__social">
              <a
                v-for="link in socialLinks"
                :key="link.name"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="about__social-link"
              >
                {{ link.name }}
              </a>
            </div>
          </div>
        </div>

        <!-- Right: Timeline -->
        <div class="about__timeline" ref="timelineRef">
          <h3 class="about__timeline-title">{{ $t('about.timeline.title') }}</h3>
          <div class="about__timeline-list">
            <TimelineItem
              v-for="exp in experiences"
              :key="exp.id"
              :item="exp"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { profile, socialLinks, experiences } from '~/data/profile'
import { useAnimations } from '~/composables/useAnimations'

const { locale } = useI18n()

definePageMeta({ layout: 'default' })

const bioRef = ref<HTMLElement | null>(null)
const timelineRef = ref<HTMLElement | null>(null)

const { initGsap, scrollStagger } = useAnimations()

onMounted(async () => {
  const { gsap, ScrollTrigger } = await initGsap()
  
  gsap.fromTo(bioRef.value, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
  gsap.fromTo(timelineRef.value, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.15, ease: 'power3.out' })

  // Scroll triggered animations for individual timeline items
  scrollStagger('.about__timeline-list > *', { delay: 0.1, y: 30 })
})
</script>

<style scoped>
.about-page {
  padding-top: 120px;
}

.about__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 6vw, 72px);
  align-items: start;
}

/* Photo placeholder */
.about__photo-placeholder {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: rgba(124, 58, 237, 0.06);
  border: 2px dashed rgba(124, 58, 237, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 28px;
  color: var(--color-text-muted);
  font-size: 0.7rem;
  text-align: center;
}

.about__photo-placeholder code {
  color: var(--color-accent-3);
  font-size: 0.65rem;
}

.about__photo-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

/* Bio card */
.about__name {
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 6px;
}

.about__role {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-bottom: 20px;
}

.about__bio {
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin-bottom: 28px;
}

/* Info grid */
.about__info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 28px;
  padding: 20px;
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
}

.about__info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.about__info-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  font-weight: 600;
}

.about__info-value {
  font-size: 0.88rem;
  color: var(--color-text-primary);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.about__info-value--available { color: #34d399; }

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #34d399;
  animation: pulse 2s infinite;
}

/* Social */
.about__social {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.about__social-link {
  padding: 7px 16px;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  transition: color var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
}

.about__social-link:hover {
  color: var(--color-accent-3);
  border-color: var(--color-border-hover);
  background: rgba(124, 58, 237, 0.06);
}

/* Timeline */
.about__timeline-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 32px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
}

/* Responsive */
@media (max-width: 900px) {
  .about__grid { grid-template-columns: 1fr; }
}
</style>
