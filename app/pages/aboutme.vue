<template>
  <div class="about-page section">
    <div class="container">
      <SectionTitle :eyebrow="$t('about.headline')" :subtitle="$t('about.subtitle')">
        {{ $t('about.title') }}
      </SectionTitle>

      <div class="about__grid">
        <!-- Left: Bio card -->
        <div class="about__bio-wrapper" ref="bioRef">
          <div class="about__photo-frame">
            <img src="~/assets/images/image.png" alt="Alejandro Alejandre Tafolla" class="about__photo" />
          </div>

          <div class="about__bio-card">
            <h2 class="about__name" ref="nameRef">Alejandro Alejandre Tafolla</h2>
            <p class="about__role" ref="roleStaticRef">{{ profile.title[locale as 'en' | 'es'] }} · {{ profile.location[locale as 'en' | 'es'] }}</p>
            <p class="about__bio" ref="bioTextRef">{{ profile.longBio[locale as 'en' | 'es'] }}</p>

            <dl class="about__info-grid">
              <div class="about__info-item">
                <dt class="about__info-label">{{ $t('about.info.location') }}</dt>
                <dd class="about__info-value">{{ profile.location[locale as 'en' | 'es'] }} 🇲🇽</dd>
              </div>
              <div class="about__info-item">
                <dt class="about__info-label">{{ $t('about.info.status') }}</dt>
                <dd class="about__info-value about__info-value--available">
                  <span class="dot" />{{ $t('about.info.available') }}
                </dd>
              </div>
              <div class="about__info-item">
                <dt class="about__info-label">{{ $t('about.info.experience') }}</dt>
                <dd class="about__info-value">{{ yearsOfExperience }}+ {{ $t('about.info.years') }}</dd>
              </div>
              <div class="about__info-item">
                <dt class="about__info-label">{{ $t('about.info.current_role') }}</dt>
                <dd class="about__info-value">{{ $t('about.info.software_factory') }}</dd>
              </div>
              <div class="about__info-item">
                <dt class="about__info-label">{{ $t('about.info.focus') }}</dt>
                <dd class="about__info-value">Web, Mobile & AI</dd>
              </div>
              <div class="about__info-item">
                <dt class="about__info-label">{{ $t('about.info.languages') }}</dt>
                <dd class="about__info-value">Español (Nativo), English (B2)</dd>
              </div>
            </dl>

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
          <h3 class="about__timeline-title">
            <span class="mono-label">{{ $t('about.timeline.title') }}</span>
          </h3>
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
import { profile, socialLinks, experiences, yearsOfExperience } from '~/data/profile'
import { useAnimations } from '~/composables/useAnimations'

const { locale } = useI18n()

definePageMeta({ layout: 'default' })

const bioRef = ref<HTMLElement | null>(null)
const timelineRef = ref<HTMLElement | null>(null)
const nameRef = ref<HTMLElement | null>(null)
const roleStaticRef = ref<HTMLElement | null>(null)
const bioTextRef = ref<HTMLElement | null>(null)

const { initGsap, scrollStagger, animateTextReveal, blurFadeIn } = useAnimations()

onMounted(async () => {
  const { gsap } = await initGsap()

  gsap.fromTo(bioRef.value, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
  gsap.fromTo(timelineRef.value, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.15, ease: 'power3.out' })

  if (nameRef.value) {
    animateTextReveal(nameRef.value, { delay: 0.3 })
  }
  if (roleStaticRef.value) {
    blurFadeIn(roleStaticRef.value, { delay: 0.6, y: 15 })
  }
  if (bioTextRef.value) {
    blurFadeIn(bioTextRef.value, { delay: 0.8, y: 20 })
  }

  scrollStagger('.about__timeline-list > *', { delay: 0.1, y: 30 })
})
</script>

<style scoped>
.about-page {
  padding-top: 130px;
}

.about__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 6vw, 72px);
  align-items: start;
}

/* Photo */
.about__photo-frame {
  width: 150px;
  border: 1.5px solid var(--color-ink);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  padding: 8px;
  box-shadow: 4px 4px 0 var(--color-accent);
  margin-bottom: 28px;
}

.about__photo {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: var(--radius-sm);
  filter: saturate(0.92);
}

/* Bio card */
.about__name {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-ink);
  margin-bottom: 6px;
}

.about__role {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-accent);
  margin-bottom: 20px;
}

.about__bio {
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin-bottom: 28px;
}

/* Info grid — bordered table look */
.about__info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 28px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface);
}

.about__info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--color-border);
}

.about__info-item:nth-child(odd) {
  border-right: 1px solid var(--color-border);
}

.about__info-item:nth-last-child(-n+2) {
  border-bottom: none;
}

.about__info-label {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
}

.about__info-value {
  font-size: 0.86rem;
  color: var(--color-ink);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.about__info-value--available { color: var(--color-ok); }

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
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
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--color-ink);
  border: 1.5px solid var(--color-border);
  background: var(--color-surface);
  transition: all var(--transition-fast);
}

.about__social-link:hover {
  border-color: var(--color-ink);
  transform: translate(-2px, -2px);
  box-shadow: 3px 3px 0 var(--color-accent);
}

/* Timeline */
.about__timeline-title {
  margin-bottom: 32px;
  padding-bottom: 12px;
  border-bottom: 1.5px solid var(--color-ink);
}

/* Responsive */
@media (max-width: 900px) {
  .about__grid { grid-template-columns: 1fr; }
}
</style>
