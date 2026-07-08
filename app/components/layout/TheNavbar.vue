<template>
  <header class="navbar" :class="{ 'navbar--scrolled': isScrolled }" ref="navbarRef">
    <div class="container navbar__inner">
      <!-- Logo -->
      <NuxtLink to="/" class="navbar__logo">
        AAT<span class="navbar__logo-dot">.</span>
      </NuxtLink>

      <!-- Desktop navigation -->
      <nav class="navbar__links" aria-label="Main navigation">
        <NuxtLink
          v-for="(link, i) in navLinks"
          :key="link.to"
          :to="localePath(link.to)"
          class="navbar__link"
          :class="{ 'navbar__link--active': route.path === localePath(link.to) }"
        >
          <span class="navbar__link-num">0{{ i + 1 }}</span>
          {{ $t(`nav.${link.key}`) }}
        </NuxtLink>
      </nav>

      <!-- CTA + Mobile toggle -->
      <div class="navbar__actions">
        <LanguageSwitcher />
        <AppButton variant="primary" size="sm" :to="localePath('/contact')">
          {{ $t('home.hero.cta_contact') }}
        </AppButton>
        <button
          class="navbar__burger"
          :class="{ 'navbar__burger--open': menuOpen }"
          aria-label="Toggle navigation"
          @click="menuOpen = !menuOpen"
        >
          <span /><span /><span />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <nav v-if="menuOpen" class="navbar__mobile" aria-label="Mobile navigation">
        <NuxtLink
          v-for="(link, i) in navLinks"
          :key="link.to"
          :to="localePath(link.to)"
          class="navbar__mobile-link"
          @click="menuOpen = false"
        >
          <span class="navbar__link-num">0{{ i + 1 }}</span>
          {{ $t(`nav.${link.key}`) }}
        </NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const localePath = useLocalePath()
const isScrolled = ref(false)
const menuOpen = ref(false)
const navbarRef = ref<HTMLElement | null>(null)

const navLinks = [
  { to: '/', key: 'home' },
  { to: '/aboutme', key: 'about' },
  { to: '/proyects', key: 'projects' },
  { to: '/stack', key: 'stack' },
  { to: '/contact', key: 'contact' },
]

let scrollTriggerInstance: any = null

onMounted(async () => {
  const gsapModule = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsapModule.gsap.registerPlugin(ScrollTrigger)

  scrollTriggerInstance = ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      isScrolled.value = self.scroll() > 20

      // Auto-hide handling
      if (navbarRef.value && !menuOpen.value) {
        if (self.direction === 1 && self.scroll() > 100) {
          gsapModule.gsap.to(navbarRef.value, { y: -100, duration: 0.3, ease: 'power2.inOut' })
        } else {
          gsapModule.gsap.to(navbarRef.value, { y: 0, duration: 0.3, ease: 'power2.out' })
        }
      }
    }
  })
})

onUnmounted(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
  }
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 18px 0;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  transition: padding var(--transition-normal), box-shadow var(--transition-normal);
}

.navbar--scrolled {
  padding: 12px 0;
  box-shadow: var(--shadow-sm);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

/* Logo */
.navbar__logo {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-ink);
}

.navbar__logo-dot {
  color: var(--color-accent);
}

/* Links */
.navbar__links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.navbar__link {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  padding: 6px 12px;
  font-family: var(--font-heading);
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  border-bottom: 2px solid transparent;
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.navbar__link-num {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

.navbar__link:hover {
  color: var(--color-ink);
}

.navbar__link:hover .navbar__link-num {
  color: var(--color-accent);
}

.navbar__link--active {
  color: var(--color-ink);
  border-bottom-color: var(--color-accent);
}

.navbar__link--active .navbar__link-num {
  color: var(--color-accent);
}

/* Actions */
.navbar__actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

/* Burger */
.navbar__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.navbar__burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-ink);
  border-radius: 2px;
  transition: transform var(--transition-normal), opacity var(--transition-normal);
}

.navbar__burger--open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.navbar__burger--open span:nth-child(2) { opacity: 0; }
.navbar__burger--open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile menu */
.navbar__mobile {
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
  padding: 16px 0 24px;
}

.navbar__mobile-link {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 14px clamp(16px, 5vw, 48px);
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast), background var(--transition-fast);
}

.navbar__mobile-link:hover {
  color: var(--color-ink);
  background: var(--color-accent-soft);
}

/* Mobile menu transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Responsive */
@media (max-width: 768px) {
  .navbar__links { display: none; }
  .navbar__burger { display: flex; }
}
</style>
