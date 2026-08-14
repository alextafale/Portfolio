<template>
  <div class="hero-video" aria-hidden="true">
    <video
      v-if="!reduced"
      ref="videoRef"
      class="hero-video__media"
      :poster="poster"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      disablepictureinpicture
    >
      <source :src="webm" type="video/webm" />
      <source :src="mp4" type="video/mp4" />
    </video>

    <!-- Reduced motion, or autoplay refused: the poster carries the hero. -->
    <img v-else :src="poster" alt="" class="hero-video__media" />

    <div class="hero-video__scrim" />
    <div class="hero-video__grain" />
  </div>
</template>

<script setup lang="ts">
/**
 * HeroVideo — looping cinematic background plate for the home hero.
 *
 * Sources are ordered webm first so browsers that support VP9 take the file
 * that is less than half the size. The poster paints immediately and is the
 * whole treatment when motion is reduced.
 */
import { ref, onMounted } from 'vue'

withDefaults(defineProps<{
  mp4?: string
  webm?: string
  poster?: string
}>(), {
  mp4: '/videos/hero-orbital.mp4',
  webm: '/videos/hero-orbital.webm',
  poster: '/videos/hero-orbital.jpg',
})

const videoRef = ref<HTMLVideoElement | null>(null)
const reduced = ref(false)

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced.value) return

  // Autoplay can still be refused (data saver, low power mode). The element
  // keeps showing its poster in that case, so there is nothing to recover —
  // but swallow the rejection so it does not surface as an unhandled error.
  videoRef.value?.play?.().catch(() => {})
})
</script>

<style scoped>
.hero-video {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.hero-video__media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* The plate is amber; nudging its hue keeps it from fighting the lime
     accent that the rest of the site is built on. */
  filter: hue-rotate(38deg) saturate(0.88);
}

/* Darkens the left half, where the headline and body copy sit, and fades the
   bottom into the page so the video has no hard edge. */
.hero-video__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to right,
      var(--color-bg) 0%,
      rgba(10, 10, 10, 0.92) 26%,
      rgba(10, 10, 10, 0.55) 52%,
      rgba(10, 10, 10, 0.25) 100%
    ),
    linear-gradient(to bottom, rgba(10, 10, 10, 0.75) 0%, transparent 26%, rgba(10, 10, 10, 0.9) 100%);
}

/* Matches the page grain so the video does not read as a pasted-in rectangle
   against the rest of the site. */
.hero-video__grain {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
}

@media (max-width: 900px) {
  /* Text spans the full width on narrow screens, so the scrim has to as well. */
  .hero-video__scrim {
    background:
      linear-gradient(to right, var(--color-bg) 0%, rgba(10, 10, 10, 0.8) 60%, rgba(10, 10, 10, 0.72) 100%),
      linear-gradient(to bottom, rgba(10, 10, 10, 0.8) 0%, transparent 30%, rgba(10, 10, 10, 0.92) 100%);
  }
}
</style>
