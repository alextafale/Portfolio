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
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 32px;
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  border: 1px solid transparent;
  transition:
    background var(--transition-fast),
    color var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-normal);
  white-space: nowrap;
  text-decoration: none;
}

.app-btn--sm {
  padding: 10px 22px;
  font-size: 0.7rem;
}

/* Primary: neon pill */
.app-btn--primary {
  background: var(--color-accent);
  color: #0a0a0a;
  border-color: var(--color-accent);
}
.app-btn--primary:hover {
  box-shadow: var(--glow-accent);
}
.app-btn--primary:active {
  background: var(--color-accent-ink);
}

/* Secondary: outlined pill */
.app-btn--secondary {
  background: transparent;
  color: var(--color-text-primary);
  border-color: var(--color-border-strong);
}
.app-btn--secondary:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  box-shadow: var(--glow-accent-soft);
}
.app-btn--secondary:active {
  background: var(--color-accent-soft);
}

/* Ghost: underlined text link */
.app-btn--ghost {
  background: transparent;
  border: none;
  color: var(--color-accent);
  padding: 0;
  border-radius: 0;
  text-decoration: underline;
  text-underline-offset: 5px;
  text-decoration-thickness: 1px;
}
.app-btn--ghost:hover {
  color: var(--color-text-primary);
}

.app-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
</style>
