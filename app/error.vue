<template>
  <NuxtLayout name="default">
    <div class="error-page">
      <div class="error-page__content" ref="contentRef">
        <div class="error-page__code">404</div>
        <h1 class="error-page__title gradient-text">{{ $t('error.title') }}</h1>
        <p class="error-page__message">
          {{ $t('error.message') }}
        </p>
        
        <div class="error-page__actions">
          <AppButton :to="localePath('/')" variant="primary">
            {{ $t('error.cta_home') }}
          </AppButton>
          <AppButton :to="localePath('/proyects')" variant="secondary">
            {{ $t('error.cta_projects') }}
          </AppButton>
        </div>
      </div>
      
      <!-- Decorative element -->
      <div class="error-page__decoration" aria-hidden="true">
        <div class="glitch-orb" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAnimations } from '~/composables/useAnimations'

const localePath = useLocalePath()

// Clear the error so navigation works correctly
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })

const contentRef = ref(null)
const { initGsap, fadeInUp } = useAnimations()

onMounted(async () => {
  const { gsap } = await initGsap()
  
  gsap.fromTo(contentRef.value, 
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' }
  )
  
  gsap.to('.glitch-orb', {
    duration: 10,
    x: 'random(-50, 50)',
    y: 'random(-50, 50)',
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
})
</script>

<style scoped>
.error-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: 120px 20px;
}

.error-page__content {
  position: relative;
  z-index: 2;
  max-width: 600px;
}

.error-page__code {
  font-size: clamp(6rem, 15vw, 10rem);
  font-weight: 900;
  line-height: 1;
  color: rgba(124, 58, 237, 0.1);
  margin-bottom: -20px;
  font-family: var(--font-heading);
}

.error-page__title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  margin-bottom: 20px;
}

.error-page__message {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 40px;
}

.error-page__actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.error-page__decoration {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
}

.glitch-orb {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%);
  filter: blur(40px);
  border-radius: 50%;
}

@media (max-width: 480px) {
  .error-page__actions {
    flex-direction: column;
    width: 100%;
  }
}
</style>
