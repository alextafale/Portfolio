<template>
  <div>
    <LanyardBadge />
    <WorkSection />
    <AboutSection />
  </div>
</template>

<script setup lang="ts">
import { profile } from '~/data/profile'

const { tr } = useLocalized()

useSeoMeta({
  title: () => `${profile.name} — ${tr(profile.title)}`,
  ogTitle: () => `${profile.name} — ${tr(profile.title)}`,
})
</script>
