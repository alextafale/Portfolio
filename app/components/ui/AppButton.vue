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
  padding: 13px 26px;
  border-radius: var(--radius-sm);
  font-family: var(--font-heading);
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  border: 1.5px solid var(--color-ink);
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast),
    background var(--transition-normal),
    color var(--transition-normal);
  white-space: nowrap;
  text-decoration: none;
}

.app-btn--sm {
  padding: 8px 18px;
  font-size: 0.82rem;
}

/* Primary: solid ink, hard shadow on hover */
.app-btn--primary {
  background: var(--color-ink);
  color: var(--color-bg);
}
.app-btn--primary:hover {
  background: var(--color-accent);
  border-color: var(--color-accent);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--color-ink);
}
.app-btn--primary:active {
  transform: translate(0, 0);
  box-shadow: none;
}

/* Secondary: outline */
.app-btn--secondary {
  background: transparent;
  color: var(--color-ink);
}
.app-btn--secondary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-accent);
}
.app-btn--secondary:active {
  transform: translate(0, 0);
  box-shadow: none;
}

/* Ghost: underlined text link */
.app-btn--ghost {
  background: transparent;
  border: none;
  color: var(--color-accent);
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.app-btn--ghost:hover {
  color: var(--color-accent-ink);
}
</style>
