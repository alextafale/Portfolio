<template>
  <footer class="footer" ref="footerRef">
    <div class="container footer__inner">
      <div class="footer__left">
        <span class="footer__name gradient-text">Alejandro Alejandre Tafolla</span>
        <div class="footer__status">
          <p class="footer__copy">&copy; {{ year }} — {{ $t('footer.built_with') }}</p>
          <Transition name="fade">
            <p v-if="lastActivity" class="footer__activity">
              <span class="activity-dot" />
              {{ lastActivity }}
            </p>
          </Transition>
        </div>
      </div>

      <div class="footer__social">
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.url"
          :aria-label="link.name"
          class="footer__social-link"
          target="_blank"
          rel="noopener noreferrer"
          v-html="icons[link.icon]"
        />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { socialLinks } from '~/data/profile'
import { useAnimations } from '~/composables/useAnimations'

const year = new Date().getFullYear()

const icons: Record<string, string> = {
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
}

const { t } = useI18n()
const lastActivity = ref<string | null>(null)
const footerRef = ref<HTMLElement | null>(null)

async function fetchGitHubActivity() {
  try {
    const response = await fetch('https://api.github.com/users/alextafale/events/public')
    const events = await response.json()
    const pushEvent = events.find((e: any) => e.type === 'PushEvent')
    
    if (pushEvent) {
      const date = new Date(pushEvent.created_at)
      lastActivity.value = `${t('footer.activity.last_commit')}: ${date.toLocaleDateString()}`
    }
  } catch (error) {
    console.error('Failed to fetch GitHub activity', error)
  }
}

const { initGsap, scrollFadeIn } = useAnimations()

onMounted(async () => {
  fetchGitHubActivity()
  
  await initGsap()
  if (footerRef.value) {
    scrollFadeIn(footerRef.value, { y: 30, duration: 0.8 })
  }
})
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  padding: 32px 0;
  margin-top: auto;
}

.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.footer__name {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 600;
}

.footer__copy {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.footer__status {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.footer__activity {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: var(--color-accent-3);
  font-weight: 500;
}

.activity-dot {
  width: 6px;
  height: 6px;
  background: var(--color-accent-2);
  border-radius: 50%;
  animation: pulse-small 2s infinite;
}

@keyframes pulse-small {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.1); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.footer__social {
  display: flex;
  gap: 12px;
}

.footer__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  transition: color var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
}

.footer__social-link:hover {
  color: var(--color-accent-3);
  border-color: var(--color-border-hover);
  background: rgba(124, 58, 237, 0.08);
}
</style>
