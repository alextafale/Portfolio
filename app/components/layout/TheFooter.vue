<template>
  <footer id="contacto" class="site-footer">
    <h2 class="sr-only">{{ t('footer.contact') }}</h2>
    <a :href="`mailto:${profile.email}`" class="site-footer__link">{{ profile.email }}</a>
    <ul class="site-footer__social">
      <li v-for="link in socialLinks" :key="link.name">
        <a :href="link.url" target="_blank" rel="noopener noreferrer" class="site-footer__link">{{ link.name }}</a>
      </li>
      <li v-if="profile.resumeUrl">
        <a :href="profile.resumeUrl" target="_blank" rel="noopener" class="site-footer__link">{{ t('nav.resume') }}</a>
      </li>
    </ul>
  </footer>
</template>

<script setup lang="ts">
import { profile, socialLinks } from '~/data/profile'

const { t } = useI18n()
</script>

<style scoped>
.site-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 24px;
  padding: 96px var(--gutter) 24px;
}

.site-footer__social {
  display: flex;
  gap: 28px;
}

.site-footer__link {
  transition: color 0.2s ease;
}
.site-footer__link:hover { color: var(--fg-muted); }
</style>
