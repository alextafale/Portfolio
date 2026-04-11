<template>
  <div class="lang-switcher">
    <button 
      v-for="locale in availableLocales" 
      :key="locale.code"
      class="lang-btn"
      :class="{ 'lang-btn--active': currentLocale === locale.code }"
      @click="setLocale(locale.code)"
    >
      {{ locale.code.toUpperCase() }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale: currentLocale, locales, setLocale } = useI18n()

const availableLocales = computed(() => locales.value as any[])
</script>

<style scoped>
.lang-switcher {
  display: flex;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  border-radius: 100px;
  padding: 2px;
  gap: 2px;
}

.lang-btn {
  padding: 4px 10px;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.lang-btn:hover {
  color: var(--color-text-secondary);
}

.lang-btn--active {
  background: var(--color-accent-1);
  color: white;
}
</style>
