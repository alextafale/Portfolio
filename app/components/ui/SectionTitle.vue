<template>
  <div class="section-title" :class="{ 'section-title--center': centered }">
    <span v-if="eyebrow" class="section-title__eyebrow" ref="eyebrowRef">{{ eyebrow }}</span>
    <h2 class="section-title__heading" ref="headingRef"><slot /></h2>
    <p v-if="subtitle" class="section-title__subtitle" ref="subtitleRef">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimations } from '~/composables/useAnimations'

defineProps<{
  eyebrow?: string
  subtitle?: string
  centered?: boolean
}>()

const headingRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const eyebrowRef = ref<HTMLElement | null>(null)

const { initGsap, animateTextReveal, blurFadeIn } = useAnimations()

onMounted(async () => {
  await initGsap()
  
  if (eyebrowRef.value) {
    blurFadeIn(eyebrowRef.value, { delay: 0.1, duration: 1 })
  }
  
  if (headingRef.value) {
    animateTextReveal(headingRef.value, { delay: 0.2 })
  }
  
  if (subtitleRef.value) {
    blurFadeIn(subtitleRef.value, { delay: 0.4 })
  }
})
</script>

<style scoped>
.section-title {
  margin-bottom: clamp(40px, 6vw, 64px);
}

.section-title--center {
  text-align: center;
}

.section-title__eyebrow {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent-2);
  margin-bottom: 12px;
}

.section-title__heading {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--color-text-primary);
  line-height: 1.1;
}

.section-title__subtitle {
  margin-top: 16px;
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  max-width: 540px;
  line-height: 1.7;
}

.section-title--center .section-title__subtitle {
  margin-left: auto;
  margin-right: auto;
}
</style>
