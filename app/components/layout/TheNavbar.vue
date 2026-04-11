<template>
  <header class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="container navbar__inner">
      <!-- Logo -->
      <NuxtLink to="/" class="navbar__logo">
        <span class="gradient-text">AAT</span>
        <span class="navbar__logo-dot" />
      </NuxtLink>

      <!-- Desktop navigation -->
      <nav class="navbar__links" aria-label="Main navigation">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="navbar__link"
          :class="{ 'navbar__link--active': route.path === link.to }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- CTA + Mobile toggle -->
      <div class="navbar__actions">
        <AppButton variant="primary" size="sm" to="/contact">
          Let's talk
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
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="navbar__mobile-link"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const isScrolled = ref(false)
const menuOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/aboutme', label: 'About' },
  { to: '/proyects', label: 'Projects' },
  { to: '/stack', label: 'Stack' },
  { to: '/contact', label: 'Contact' },
]

const onScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 20px 0;
  transition: background var(--transition-normal), padding var(--transition-normal), box-shadow var(--transition-normal);
}

.navbar--scrolled {
  background: rgba(9, 9, 15, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 14px 0;
  box-shadow: 0 1px 0 var(--color-border);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

/* Logo */
.navbar__logo {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.navbar__logo-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-cyan-1);
  margin-bottom: 14px;
}

/* Links */
.navbar__links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.navbar__link {
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast), background var(--transition-fast);
}

.navbar__link:hover {
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.05);
}

.navbar__link--active {
  color: var(--color-accent-3) !important;
  background: rgba(124, 58, 237, 0.1);
}

/* Actions */
.navbar__actions {
  display: flex;
  align-items: center;
  gap: 16px;
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
  background: var(--color-text-primary);
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
  background: rgba(12, 12, 20, 0.98);
  backdrop-filter: blur(20px);
  border-top: 1px solid var(--color-border);
  padding: 16px 0 24px;
}

.navbar__mobile-link {
  padding: 14px clamp(16px, 5vw, 48px);
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast), background var(--transition-fast);
}

.navbar__mobile-link:hover {
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.04);
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
