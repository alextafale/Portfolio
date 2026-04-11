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
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  cursor: default;
  transition:
    border-color var(--transition-normal),
    transform var(--transition-normal),
    box-shadow var(--transition-normal);
}

.stack-item:hover {
  border-color: color-mix(in srgb, var(--item-color) 50%, transparent);
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25), 0 0 0 1px color-mix(in srgb, var(--item-color) 20%, transparent);
}

.stack-item__icon {
  width: 48px;
  height: 48px;
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
  transform: scale(1.15);
}

.stack-item__name {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-primary);
  text-align: center;
}

.stack-item__level {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: capitalize;
  color: var(--color-text-muted);
}
</style>
