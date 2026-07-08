<template>
  <div class="stack-item" :style="{ '--item-color': item.color }">
    <div class="stack-item__icon">
      <img :src="item.icon" :alt="item.name" loading="lazy" />
    </div>
    <span class="stack-item__name">{{ item.name }}</span>
    <span class="stack-item__level">{{ item.level }}</span>
  </div>
</template>

<script setup lang="ts">
import type { StackItem } from '~/types'

defineProps<{ item: StackItem }>()
</script>

<style scoped>
.stack-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 24px 16px;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  cursor: default;
  transition:
    border-color var(--transition-fast),
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.stack-item:hover {
  border-color: var(--color-ink);
  transform: translate(-3px, -3px);
  box-shadow: 4px 4px 0 color-mix(in srgb, var(--item-color) 70%, var(--color-ink));
}

.stack-item__icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-normal);
}

.stack-item__icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.stack-item:hover .stack-item__icon {
  transform: scale(1.12);
}

.stack-item__name {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-ink);
  text-align: center;
}

.stack-item__level {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
</style>
