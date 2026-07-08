<template>
  <div class="section-title" :class="{ 'section-title--center': centered }">
    <span v-if="eyebrow" class="section-title__eyebrow mono-label" ref="eyebrowRef">
      <span class="section-title__rule" aria-hidden="true" />{{ eyebrow }}
    </span>
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
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.section-title__rule {
  display: inline-block;
  width: 32px;
  height: 2px;
  background: var(--color-accent);
}

.section-title--center .section-title__eyebrow {
  justify-content: center;
}

.section-title__heading {
  font-size: clamp(2.1rem, 4.5vw, 3.2rem);
  font-weight: 700;
  color: var(--color-ink);
  line-height: 1.08;
}

.section-title__subtitle {
  margin-top: 16px;
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  max-width: 560px;
  line-height: 1.7;
}

.section-title--center .section-title__subtitle {
  margin-left: auto;
  margin-right: auto;
}
</style>
