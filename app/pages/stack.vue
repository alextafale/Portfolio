<template>
  <div class="stack-page">
    <PageHeader
      :eyebrow="$t('stack.headline')"
      :subtitle="$t('stack.subtitle')"
      ghost="TOOLS"
    >
      <template #backdrop>
        <div class="stack__orb-holder">
          <TechOrb />
        </div>
      </template>
      {{ $t('stack.title') }}
    </PageHeader>

    <div class="container stack__body">
      <!-- Daily drivers -->
      <section class="stack__daily" ref="dailyRef">
        <h2 class="stack__category-title">{{ $t('stack.daily') }}</h2>
        <div class="stack__daily-grid">
          <span v-for="item in dailyItems" :key="item.name" class="stack__daily-item" :style="{ '--item-color': item.color }">
            <img :src="item.icon" :alt="item.name" class="stack__daily-icon" loading="lazy" />
            {{ item.name }}
          </span>
        </div>
      </section>

      <!-- Category sections -->
      <div
        v-for="category in stackCategories"
        :key="category.key"
        class="stack__category"
        :ref="el => categoryRefs[category.key] = el as HTMLElement"
      >
        <h3 class="stack__category-title">{{ category.label }}</h3>
        <div class="stack__grid">
          <StackItem
            v-for="item in getByCategory(category.key)"
            :key="item.name"
            :item="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { stackItems, stackCategories } from '~/data/stack'
import type { StackItem as StackItemType } from '~/types'
import { useAnimations } from '~/composables/useAnimations'

definePageMeta({ layout: 'default' })

const categoryRefs = reactive<Record<string, HTMLElement | null>>({})
const dailyRef = ref<HTMLElement | null>(null)

function getByCategory(key: string): StackItemType[] {
  return stackItems.filter(item => item.category === key)
}

const dailyItems = computed(() => stackItems.filter(item => item.daily))

const { initGsap, scrollStagger } = useAnimations()

onMounted(async () => {
  await initGsap()

  scrollStagger('.stack__daily-item', { y: 16, stagger: 0.05 })

  Object.values(categoryRefs).forEach((el) => {
    if (!el) return
    scrollStagger(el.querySelectorAll('.stack-item'), {
      y: 20,
      stagger: 0.08,
    })
  })
})
</script>

<style scoped>
.stack__body {
  padding-bottom: var(--section-padding);
}

/* The orb sits to the right of the heading rather than under it. */
.stack__orb-holder {
  position: absolute;
  top: 0;
  right: -4%;
  width: 52%;
  height: 100%;
}

@media (max-width: 900px) {
  .stack__orb-holder {
    right: 0;
    width: 100%;
    opacity: 0.4;
  }
}

.stack__category {
  margin-bottom: 56px;
}

.stack__category-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 22px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--color-border);
}

.stack__category-title::before {
  content: '';
  width: 24px;
  height: 1px;
  background: var(--color-accent);
  box-shadow: var(--glow-accent-soft);
  flex-shrink: 0;
}

.stack__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(132px, 1fr));
  gap: 14px;
}

/* ── Daily drivers ── */
.stack__daily {
  margin-bottom: 64px;
}

.stack__daily-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.stack__daily-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 11px 20px 11px 14px;
  border-radius: var(--radius-pill);
  border: 1px solid color-mix(in srgb, var(--item-color) 40%, var(--color-border));
  background: color-mix(in srgb, var(--item-color) 9%, var(--color-surface));
  font-family: var(--font-heading);
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-ink);
  transition: border-color var(--transition-fast), box-shadow var(--transition-normal);
}

.stack__daily-item:hover {
  border-color: var(--item-color);
  box-shadow: 0 0 22px color-mix(in srgb, var(--item-color) 28%, transparent);
}

.stack__daily-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
}
</style>
