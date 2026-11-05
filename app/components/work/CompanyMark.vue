<template>
  <!-- A company's logo tile: its real logo when we have one, otherwise its
       initials on the brand colour. Size, radius and type come from the
       parent's class. -->
  <span class="cmark" :style="{ background: mark.logo?.background ?? mark.color }" aria-hidden="true">
    <span v-if="mark.logo" class="cmark__logo" v-html="mark.logo.svg" />
    <template v-else>{{ mark.text }}</template>
  </span>
</template>

<script setup lang="ts">
import type { Experience } from '~/types'

defineProps<{ mark: Experience['mark'] }>()
</script>

<style scoped>
.cmark {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  color: #fff;
}
.cmark__logo {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
}
.cmark__logo :deep(svg) {
  width: 54%;
  height: auto;
}
</style>
