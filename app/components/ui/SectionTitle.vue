<template>
  <div class="section-title" :class="{ 'section-title--center': centered }">
    <span v-if="eyebrow" class="section-title__eyebrow">{{ eyebrow }}</span>
    <h2 class="section-title__heading"><slot /></h2>
    <p v-if="subtitle" class="section-title__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string
  subtitle?: string
  centered?: boolean
}>()
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
