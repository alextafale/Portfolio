<template>
  <div class="lang-switcher">
    <template v-for="(locale, i) in availableLocales" :key="locale.code">
      <span v-if="i > 0" class="lang-sep" aria-hidden="true">/</span>
      <button
        class="lang-btn"
        :class="{ 'lang-btn--active': currentLocale === locale.code }"
        @click="setLocale(locale.code)"
      >
        {{ locale.code.toUpperCase() }}
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
const { locale: currentLocale, locales, setLocale } = useI18n()

const availableLocales = computed(() => locales.value as any[])
</script>

<style scoped>
.lang-switcher {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
}

.lang-sep {
  color: var(--color-text-muted);
  font-size: 0.75rem;
}

.lang-btn {
  padding: 2px 2px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.lang-btn:hover {
  color: var(--color-ink);
}

.lang-btn--active {
  color: var(--color-accent);
  border-bottom-color: var(--color-accent);
}
</style>
