<template>
  <component :is="tag" ref="rootEl" class="scrub" :aria-label="plain">
    <template v-for="(word, i) in words" :key="i">
      <span class="scrub__word" :class="{ 'is-em': word.em }" aria-hidden="true">{{ word.text }}</span>{{ ' ' }}
    </template>
  </component>
</template>

<script setup lang="ts">
/**
 * A statement that lights up word by word as it scrolls through the viewport,
 * scrubbed to the scroll position. `**…**` in the text marks words that end
 * at full strength; the rest settle to a softer grey.
 *
 * Screen readers get the whole sentence once, via aria-label, instead of one
 * announcement per word span.
 */
const props = withDefaults(defineProps<{ text: string; tag?: string }>(), { tag: 'p' })

const words = computed(() =>
  props.text
    .split('**')
    .flatMap((chunk, i) =>
      chunk.split(/\s+/).filter(Boolean).map((text) => ({ text, em: i % 2 === 1 })),
    ),
)
const plain = computed(() => props.text.replaceAll('**', ''))

const rootEl = ref<HTMLElement>()
let tween: { kill: () => void; scrollTrigger?: { kill: () => void } } | undefined

async function build() {
  tween?.scrollTrigger?.kill()
  tween?.kill()
  if (!rootEl.value || prefersReducedMotion()) return
  const { gsap } = await loadGsap()
  const targets = rootEl.value.querySelectorAll('.scrub__word')
  tween = gsap.fromTo(
    targets,
    { opacity: 0.14 },
    {
      opacity: 1,
      ease: 'none',
      stagger: 0.08,
      scrollTrigger: { trigger: rootEl.value, start: 'top 88%', end: 'bottom 55%', scrub: true },
    },
  )
}

onMounted(build)
// Switching language swaps the words; rebuild once the new spans are in.
watch(words, () => nextTick(build))
onBeforeUnmount(() => {
  tween?.scrollTrigger?.kill()
  tween?.kill()
})
</script>

<style scoped>
.scrub__word { color: var(--fg-muted); }
.scrub__word.is-em { color: var(--fg); }
</style>
