<template>
  <header class="page-header">
    <span v-if="ghost" class="page-header__ghost ghost-type" aria-hidden="true">{{ ghost }}</span>

    <div class="container page-header__inner">
      <span v-if="eyebrow" class="page-header__eyebrow mono-label" ref="eyebrowRef">
        <span class="page-header__rule" aria-hidden="true" />{{ eyebrow }}
      </span>

      <h1 class="page-header__title" ref="titleRef"><slot /></h1>

      <p v-if="subtitle" class="page-header__subtitle" ref="subtitleRef">{{ subtitle }}</p>
    </div>
  </header>
</template>

<script setup lang="ts">
/**
 * Shared hero band for inner pages — keeps Projects, About, Stack and Contact
 * on the same rhythm as the home page instead of each rolling its own header.
 */
import { ref, onMounted } from 'vue'
import { useAnimations } from '~/composables/useAnimations'

defineProps<{
  eyebrow?: string
  subtitle?: string
  /** Oversized outline word behind the title. */
  ghost?: string
}>()

const eyebrowRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)

const { initGsap, charReveal, blurFadeIn } = useAnimations()

onMounted(async () => {
  await initGsap()

  if (eyebrowRef.value) blurFadeIn(eyebrowRef.value, { delay: 0.05, duration: 0.9 })
  if (titleRef.value) await charReveal(titleRef.value, { delay: 0.12 })
  if (subtitleRef.value) blurFadeIn(subtitleRef.value, { delay: 0.35 })
})
</script>

<style scoped>
.page-header {
  position: relative;
  padding-top: clamp(128px, 17vh, 192px);
  padding-bottom: clamp(40px, 6vw, 72px);
  overflow: hidden;
}

.page-header__ghost {
  position: absolute;
  top: 52%;
  left: 0;
  transform: translate(-4%, -50%);
  font-size: clamp(8rem, 21vw, 21rem);
  line-height: 1;
  z-index: 0;
}

.page-header__inner {
  position: relative;
  z-index: 1;
}

.page-header__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.page-header__rule {
  display: inline-block;
  width: 40px;
  height: 1px;
  background: var(--color-accent);
  box-shadow: var(--glow-accent-soft);
}

.page-header__title {
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 8vw, 5.6rem);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.045em;
  text-transform: uppercase;
  color: var(--color-ink);
  /* SplitType makes every glyph an inline-block; without nowrap a title that
     overruns by a few pixels drops its last character onto its own line. */
  white-space: nowrap;
}

.page-header__subtitle {
  margin-top: 22px;
  font-size: 1.02rem;
  color: var(--color-text-secondary);
  max-width: 580px;
  line-height: 1.7;
}

@media (max-width: 640px) {
  /* Long localised titles cannot stay on one line on narrow screens. */
  .page-header__title {
    white-space: normal;
    font-size: clamp(2.1rem, 11vw, 3.2rem);
  }
}
</style>
