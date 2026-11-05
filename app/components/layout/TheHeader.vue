<template>
  <header class="site-header">
    <NuxtLink :to="localePath('/')" class="site-header__logo" :aria-label="`${profile.name} — ${t('nav.home')}`">
      <BrandMark />
    </NuxtLink>

    <div class="site-header__right">
      <nav class="pill chamfer-bl" :aria-label="t('nav.main')">
        <NuxtLink :to="workHref" class="pill__link" @click="onSectionClick($event, 'trabajo')">{{ t('nav.work') }}</NuxtLink>
        <NuxtLink :to="aboutHref" class="pill__link pill__link--wide" @click="onSectionClick($event, 'sobre-mi')">{{ t('nav.about') }}</NuxtLink>
        <span class="pill__sep" aria-hidden="true" />
        <NuxtLink
          :to="switchLocalePath(otherLocale)"
          class="pill__link"
          :hreflang="otherLocale"
          :aria-label="t('nav.language')"
        >{{ otherLocale }}</NuxtLink>
      </nav>

      <ChamferButton v-if="profile.resumeUrl" :to="profile.resumeUrl">
        <template #icon><AppIcon name="file" /></template>
        {{ t('nav.resume') }}
      </ChamferButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import { profile } from '~/data/profile'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const getRouteBaseName = useRouteBaseName()
const route = useRoute()

const baseName = computed(() => getRouteBaseName(route))
const otherLocale = computed(() => (locale.value === 'es' ? 'en' : 'es'))

const workHref = computed(() => `${localePath('/')}#trabajo`)
const aboutHref = computed(() => `${localePath('/')}#sobre-mi`)

// Already on the home page: glide to the section instead of re-navigating.
function onSectionClick(e: MouseEvent, id: string) {
  if (baseName.value !== 'index') return
  e.preventDefault()
  scrollToTarget(`#${id}`)
  history.replaceState(history.state, '', `${localePath('/')}#${id}`)
}
</script>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px var(--gutter) 0;
  pointer-events: none;
}
.site-header > * { pointer-events: auto; }

.site-header__logo {
  display: block;
  border-radius: 999px;
  color: var(--fg);
  transition: transform 0.4s var(--ease-out);
}
.site-header__logo:hover { transform: rotate(-30deg); }

.site-header__right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pill {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 42px;
  padding: 0 16px;
  background: var(--surface);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  white-space: nowrap;
}
.pill.chamfer-bl { padding-left: 20px; }

.pill__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: rgb(10 10 10 / 0.55);
  border-radius: 3px;
  transition: color 0.2s ease;
}
.pill__link:hover { color: var(--fg); }

.pill__sep {
  width: 1px;
  height: 14px;
  background: rgb(10 10 10 / 0.14);
}

/* Four links plus the CV button don't fit a phone; "About" is one scroll away. */
.pill__link--wide { display: none; }

@media (min-width: 640px) {
  .pill__link--wide { display: inline-flex; }
  .pill { gap: 24px; padding: 0 24px; font-size: 14px; }
  .pill.chamfer-bl { padding-left: 28px; }
}
</style>
