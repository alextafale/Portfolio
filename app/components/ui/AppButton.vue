<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="['app-btn', `app-btn--${variant}`, { 'app-btn--sm': size === 'sm' }]"
    v-bind="$attrs"
  >
    <slot />
  </NuxtLink>
  <component
    v-else
    :is="tag"
    :class="['app-btn', `app-btn--${variant}`, { 'app-btn--sm': size === 'sm' }]"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md'
    to?: string
    tag?: string
  }>(),
  {
    variant: 'primary',
    size: 'md',
    tag: 'button',
  },
)
</script>

<style scoped>
.app-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  border-radius: var(--radius-sm);
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  border: none;
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-normal),
    background var(--transition-normal);
  white-space: nowrap;
  text-decoration: none;
}

.app-btn--sm {
  padding: 9px 20px;
  font-size: 0.85rem;
}

/* Primary */
.app-btn--primary {
  background: var(--gradient-hero);
  color: #fff;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.35);
}
.app-btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(124, 58, 237, 0.5);
}
.app-btn--primary:active {
  transform: translateY(0);
}

/* Secondary */
.app-btn--secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 1.5px solid var(--color-border);
}
.app-btn--secondary:hover {
  border-color: var(--color-accent-2);
  color: var(--color-accent-3);
  transform: translateY(-2px);
  background: rgba(124, 58, 237, 0.06);
}

/* Ghost */
.app-btn--ghost {
  background: transparent;
  color: var(--color-accent-2);
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.app-btn--ghost:hover {
  color: var(--color-accent-3);
}
</style>
