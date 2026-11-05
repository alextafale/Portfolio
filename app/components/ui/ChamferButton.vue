<template>
  <component
    :is="tag"
    v-bind="linkAttrs"
    class="cbtn"
    :class="[`cbtn--${variant}`, corner === 'bl' ? 'chamfer-bl' : 'chamfer-br']"
  >
    <slot name="icon" />
    <span class="cbtn__label"><slot /></span>
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

const props = withDefaults(
  defineProps<{
    /** Internal route (string starting with "/") or absolute URL. */
    to?: string
    variant?: 'secondary' | 'primary' | 'dark'
    corner?: 'br' | 'bl'
    download?: boolean
  }>(),
  { variant: 'secondary', corner: 'br', download: false },
)

const isExternal = computed(() => !!props.to && /^(https?:|mailto:)/.test(props.to))
const isFile = computed(() => !!props.to && /\.pdf$/i.test(props.to))

const tag = computed(() => {
  if (!props.to) return 'button'
  return isExternal.value || isFile.value ? 'a' : NuxtLink
})

const linkAttrs = computed(() => {
  if (!props.to) return { type: 'button' }
  if (isExternal.value || isFile.value) {
    return {
      href: props.to,
      target: '_blank',
      rel: 'noopener noreferrer',
      ...(props.download ? { download: '' } : {}),
    }
  }
  return { to: props.to }
})
</script>

<style scoped>
.cbtn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 42px;
  padding: 0 18px 0 16px;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  white-space: nowrap;
  user-select: none;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.1s ease;
}
.cbtn:active { transform: translateY(1px); }

.cbtn :deep(svg) {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.cbtn--secondary { background: var(--surface); color: var(--fg); }
.cbtn--secondary:hover { background: var(--surface-strong); }

.cbtn--primary { background: var(--accent); color: #fff; }
.cbtn--primary:hover { background: var(--accent-hover); }

.cbtn--dark { background: var(--fg); color: var(--bg); }
.cbtn--dark:hover { background: #262626; }

@media (min-width: 640px) {
  .cbtn { font-size: 14px; }
}
</style>
