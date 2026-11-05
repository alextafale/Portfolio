<template>
  <!-- Stand-in for a company without a website screenshot yet: the logo tile
       and name, large, centred on the brand-coloured panel. -->
  <div class="plate" aria-hidden="true">
    <CompanyMark :mark="job.mark" class="plate__mark" />
    <span class="plate__name">{{ job.company }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Experience } from '~/types'

defineProps<{ job: Experience }>()
</script>

<style scoped>
.plate {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  align-self: stretch;
  /* Cancel the panel's top padding so the plate is optically centred. */
  margin-top: calc(-1 * clamp(28px, 7%, 72px));
  text-align: center;
}
.plate__mark {
  display: grid;
  place-items: center;
  width: clamp(72px, 9vw, 112px);
  aspect-ratio: 1;
  border-radius: 24%;
  font-family: var(--font-mono);
  font-size: clamp(22px, 2.6vw, 34px);
  font-weight: 600;
  color: #fff;
  box-shadow: 0 30px 60px -30px rgb(0 0 0 / 0.45);
}
.plate__name {
  font-size: clamp(28px, 4.4vw, 64px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.04em;
}
</style>
