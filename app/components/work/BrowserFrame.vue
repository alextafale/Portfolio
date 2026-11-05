<template>
  <figure class="browser">
    <div class="browser__bar" aria-hidden="true">
      <span /><span /><span />
      <i class="browser__url">{{ host }}</i>
    </div>
    <img :src="src" :alt="alt" :loading="eager ? 'eager' : 'lazy'" decoding="async" draggable="false">
  </figure>
</template>

<script setup lang="ts">
const props = defineProps<{ src: string; alt: string; url?: string; eager?: boolean }>()

const host = computed(() => {
  if (!props.url) return ''
  try { return new URL(props.url).host } catch { return '' }
})
</script>

<style scoped>
.browser {
  overflow: hidden;
  border-radius: 12px;
  background: #0d0d0d;
  box-shadow:
    0 50px 80px -40px rgb(0 0 0 / 0.55),
    0 0 0 1px rgb(0 0 0 / 0.06);
}
.browser__bar {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
}
.browser__bar span {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: #3a3a3a;
}
.browser__url {
  flex: 1;
  margin-right: 40px;
  font-style: normal;
  font-family: var(--font-mono);
  font-size: 11px;
  text-align: center;
  color: rgb(255 255 255 / 0.45);
}
.browser img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top;
  background: #fff;
}
</style>
