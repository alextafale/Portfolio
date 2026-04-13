<template>
  <NuxtLayout>
    <NuxtPage :transition="transitionProps" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAnimations } from '~/composables/useAnimations'

const { pageTransition } = useAnimations()

const transitionProps = {
  name: 'custom-gsap',
  mode: 'out-in' as const,
  css: false,
  onEnter: pageTransition.onEnter,
  onLeave: pageTransition.onLeave
}
</script>
