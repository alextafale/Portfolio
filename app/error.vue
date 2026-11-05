<template>
  <NuxtLayout>
    <section class="error">
      <p class="error__code mono">{{ error?.statusCode ?? 404 }}</p>
      <h1 class="error__title">{{ t('error.title') }}</h1>
      <p class="muted">{{ t('error.message') }}</p>
      <ChamferButton :to="localePath('/')" variant="dark" class="error__cta" @click="clear">
        <template #icon><AppIcon name="arrow-left" /></template>
        {{ t('error.cta_home') }}
      </ChamferButton>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()

const clear = () => clearError()
</script>

<style scoped>
.error {
  display: grid;
  justify-items: start;
  gap: 8px;
  min-height: 70svh;
  align-content: center;
  padding: var(--header-h) var(--gutter) 0;
}
.error__code { font-size: var(--text-xs); color: var(--fg-muted); }
.error__title { font-size: clamp(28px, 4vw, 44px); letter-spacing: -0.02em; line-height: 1.1; }
.error__cta { margin-top: 20px; }
</style>
