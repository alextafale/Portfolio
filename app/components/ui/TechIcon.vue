<template>
  <span class="tech-icon" :class="{ 'is-fallback': !svg }" aria-hidden="true">
    <span v-if="svg" class="tech-icon__svg" v-html="svg" />
    <span v-else class="tech-icon__letter">{{ name.charAt(0) }}</span>
  </span>
</template>

<script setup lang="ts">
// Every logo in app/assets/tech is inlined at build time, so icons render on
// the server, inherit `color`, and cost no extra requests. The set is small
// (~30 glyphs, <1 KB each), which is what makes eager inlining reasonable.
const files = import.meta.glob<string>('~/assets/tech/*.svg', { query: '?raw', import: 'default', eager: true })

const bySlug: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, raw]) => [
    path.split('/').pop()!.replace('.svg', ''),
    // Drop the <title>: the visible label next to the icon already names it.
    raw.replace(/<title>.*?<\/title>/, ''),
  ]),
)

const props = defineProps<{
  /** Simple Icons slug; without one, the first letter of `name` is drawn. */
  icon?: string
  name: string
}>()

const svg = computed(() => (props.icon ? bySlug[props.icon] : undefined))
</script>

<style scoped>
.tech-icon {
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}
.tech-icon__svg,
.tech-icon__svg :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
  fill: currentColor;
}
/* No logo: a filled square in the text colour with the initial knocked out. */
.is-fallback {
  border-radius: 4px;
  background: currentColor;
}
.tech-icon__letter {
  color: var(--bg);
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
}
</style>
