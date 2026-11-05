<template>
  <div class="layout">
    <TheHeader />
    <main class="layout__main">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
useSmoothScroll()
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100svh;
}
.layout__main { flex: 1; }
</style>
