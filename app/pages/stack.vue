<template>
  <div class="stack-page section">
    <div class="container">
      <SectionTitle
        eyebrow="Tech Stack"
        centered
        subtitle="Technologies and tools I use to build full-stack web and mobile experiences."
      >
        My Stack
      </SectionTitle>

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
import { ref, onMounted, reactive } from 'vue'
import { stackItems, stackCategories } from '~/data/stack'
import type { StackItem as StackItemType } from '~/types'
import { useAnimations } from '~/composables/useAnimations'

definePageMeta({ layout: 'default' })

type CategoryKey = typeof stackCategories[number]['key']
const categoryRefs = reactive<Record<string, HTMLElement | null>>({})

function getByCategory(key: string): StackItemType[] {
  return stackItems.filter(item => item.category === key)
}

const { initGsap, scrollStagger } = useAnimations()

onMounted(async () => {
  await initGsap()

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
.stack-page {
  padding-top: 120px;
}

.stack__category {
  margin-bottom: 56px;
}

.stack__category-title {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-border);
}

.stack__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
}
</style>
