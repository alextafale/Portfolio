<template>
  <div ref="rootRef" class="showcase">
    <!-- Pinned column: stays put while the steps beside it scroll past. -->
    <aside class="showcase__pinned" aria-hidden="true">
      <div class="showcase__panel">
        <WorkflowVisual :active="active" class="showcase__device" />

        <div class="showcase__meta">
          <span class="showcase__index">{{ padded(active + 1) }}</span>

          <div class="showcase__rail">
            <span
              v-for="(item, i) in items"
              :key="`rail-${item.id}`"
              class="showcase__tick"
              :class="{ 'showcase__tick--on': i === active }"
            />
          </div>
        </div>
      </div>
    </aside>

    <!-- Scrolling column: one panel per step. -->
    <div class="showcase__steps">
      <div
        v-for="(item, i) in items"
        :key="item.id"
        ref="stepEls"
        class="showcase__step"
        :class="{ 'showcase__step--on': i === active }"
      >
        <SpotlightCard class="showcase__card">
          <article class="showcase__card-body">
            <header class="showcase__card-head">
              <span class="showcase__step-num mono-label">{{ padded(i + 1) }} / {{ padded(items.length) }}</span>
              <div class="showcase__card-icon" aria-hidden="true" v-html="item.icon" />
            </header>

            <h3 class="showcase__step-title">{{ item.title[locale] }}</h3>
            <p class="showcase__step-desc">{{ item.description[locale] }}</p>

            <div class="showcase__step-tools">
              <span v-for="tool in item.tools" :key="tool" class="showcase__tool">{{ tool }}</span>
            </div>
          </article>
        </SpotlightCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * WorkflowShowcase — pinned-media scroll narrative.
 *
 * The visual column stays fixed while the text steps scroll past it, and the
 * artwork swaps to match whichever step is centred. Modelled on the scroll-
 * driven hero pattern where media persists and copy is exchanged.
 *
 * Pinning is plain CSS `position: sticky` rather than ScrollTrigger's pin,
 * which rewrites the DOM into pin-spacers and fights the Lenis-driven scroll.
 * ScrollTrigger is used only to report which step is active.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { AiWorkflowItem } from '~/types'
import { useAnimations } from '~/composables/useAnimations'

defineProps<{
  items: AiWorkflowItem[]
  locale: 'en' | 'es'
}>()

const rootRef = ref<HTMLElement | null>(null)
const stepEls = ref<HTMLElement[]>([])
const active = ref(0)

const padded = (n: number) => String(n).padStart(2, '0')

const { initGsap } = useAnimations()

let triggers: import('gsap/ScrollTrigger').ScrollTrigger[] = []

onMounted(async () => {
  const { ScrollTrigger } = await initGsap()
  if (!ScrollTrigger) return

  triggers = stepEls.value.map((el, i) =>
    ScrollTrigger.create({
      trigger: el,
      // Measured from the step's centre, not its edges: each step is taller
      // than the viewport, so edge-based bounds would flip the active card
      // while it was still well below the fold, out of step with the pinned
      // panel it is meant to match.
      start: 'center 78%',
      end: 'center 22%',
      onEnter: () => { active.value = i },
      onEnterBack: () => { active.value = i },
    }),
  )
})

onBeforeUnmount(() => {
  triggers.forEach(t => t.kill())
  triggers = []
})
</script>

<style scoped>
.showcase {
  display: grid;
  grid-template-columns: 0.85fr 1fr;
  gap: clamp(32px, 6vw, 88px);
  align-items: start;
}

/* ── Pinned column ── */
.showcase__pinned {
  position: sticky;
  top: 0;
  height: 100svh;
  display: flex;
  align-items: center;
}

.showcase__panel {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 26px;
  align-items: center;
}

.showcase__index {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 4.4vw, 3.6rem);
  font-weight: 900;
  line-height: 0.82;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1.2px rgba(212, 255, 63, 0.6);
}

/* The pinned visual: swaps to the active step's animated panel. */
.showcase__device {
  width: min(100%, 380px);
}

.showcase__meta {
  display: flex;
  align-items: center;
  gap: 20px;
}

.showcase__rail {
  display: flex;
  gap: 8px;
}

.showcase__tick {
  width: 30px;
  height: 2px;
  border-radius: var(--radius-pill);
  background: var(--color-border-strong);
  transition: background var(--transition-normal), box-shadow var(--transition-normal);
}

.showcase__tick--on {
  background: var(--color-accent);
  box-shadow: var(--glow-accent-soft);
}

/* ── Scrolling steps ── */
.showcase__step {
  min-height: 78svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(20px, 3vw, 36px) 0;
}

/* Cards recede until their step is the active one, so the column reads as one
   card at a time rather than a list of six competing for attention. */
.showcase__card {
  opacity: 0.3;
  transform: translateY(28px) scale(0.965);
  transform-origin: center left;
  transition:
    opacity var(--transition-slow),
    transform var(--transition-slow);
}

.showcase__step--on .showcase__card {
  opacity: 1;
  transform: none;
}

.showcase__card-body {
  padding: clamp(26px, 3vw, 38px);
}

.showcase__card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
}

.showcase__card-icon {
  width: 48px;
  height: 48px;
  padding: 11px;
  border-radius: var(--radius-sm);
  background: var(--color-accent-soft);
  border: 1px solid var(--color-border);
  color: var(--color-accent);
  flex-shrink: 0;
}

.showcase__card-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.showcase__step-num {
  color: var(--color-text-muted);
}

.showcase__step--on .showcase__step-num {
  color: var(--color-accent);
}

.showcase__step-title {
  font-size: clamp(1.5rem, 3.2vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-ink);
  margin-bottom: 16px;
}

.showcase__step-desc {
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.75;
  max-width: 46ch;
  margin-bottom: 22px;
}

.showcase__step-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.showcase__tool {
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: 0.64rem;
  letter-spacing: 0.06em;
  color: var(--color-accent);
  background: var(--color-accent-soft);
  border: 1px solid transparent;
}

.showcase__step--on .showcase__tool {
  border-color: rgba(212, 255, 63, 0.28);
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .showcase {
    grid-template-columns: 1fr;
    gap: 0;
  }

  /* Sticky media plus full-height steps does not fit a phone screen; the
     steps become a plain readable list instead. */
  .showcase__pinned {
    display: none;
  }

  .showcase__step {
    min-height: 0;
    padding: 12px 0;
  }

  /* Without the pinned panel there is nothing to sync to, so every card
     stays fully legible. */
  .showcase__card {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .showcase__card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
