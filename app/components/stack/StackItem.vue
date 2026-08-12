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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 26px 16px;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  cursor: default;
  overflow: hidden;
  transition:
    border-color var(--transition-normal),
    transform var(--transition-normal),
    box-shadow var(--transition-normal);
}

/* Wash tinted with each technology's own brand colour, revealed on hover. */
.stack-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 70% at 50% 0%,
    color-mix(in srgb, var(--item-color) 22%, transparent),
    transparent 70%
  );
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.stack-item:hover::before {
  opacity: 1;
}

.stack-item:hover {
  border-color: color-mix(in srgb, var(--item-color) 60%, var(--color-border-strong));
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.stack-item > * {
  position: relative;
  z-index: 1;
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
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-ink);
  text-align: center;
}

.stack-item__level {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

.stack-item:hover .stack-item__level {
  color: var(--color-accent);
}
</style>
