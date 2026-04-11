<template>
  <div class="timeline-item" :class="`timeline-item--${item.type}`">
    <div class="timeline-item__dot">
      <!-- Work icon -->
      <svg v-if="item.type === 'work'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
      <!-- Education icon -->
      <svg v-else-if="item.type === 'education'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
      <!-- Certification icon -->
      <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    </div>

    <div class="timeline-item__content">
      <span class="timeline-item__period">{{ item.period }}</span>
      <h3 class="timeline-item__title">{{ item.title }}</h3>
      <p class="timeline-item__company">{{ item.company }}</p>
      <p class="timeline-item__description">{{ item.description }}</p>
      <div v-if="item.tags?.length" class="timeline-item__tags">
        <span v-for="tag in item.tags" :key="tag" class="timeline-item__tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Experience } from '~/types'

defineProps<{ item: Experience }>()
</script>

<style scoped>
.timeline-item {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 0 20px;
  position: relative;
}

/* Vertical line */
.timeline-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 13px;
  top: 28px;
  bottom: -32px;
  width: 2px;
  background: var(--color-border);
}

/* Dot */
.timeline-item__dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
  z-index: 1;
}

.timeline-item--work .timeline-item__dot {
  background: rgba(124, 58, 237, 0.2);
  color: var(--color-accent-2);
  border: 1.5px solid rgba(124, 58, 237, 0.4);
}

.timeline-item--education .timeline-item__dot {
  background: rgba(6, 182, 212, 0.15);
  color: var(--color-cyan-1);
  border: 1.5px solid rgba(6, 182, 212, 0.35);
}

.timeline-item--certification .timeline-item__dot {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border: 1.5px solid rgba(245, 158, 11, 0.35);
}

/* Content */
.timeline-item__content {
  padding-bottom: 36px;
}

.timeline-item__period {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.timeline-item__title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-top: 6px;
}

.timeline-item__company {
  font-size: 0.9rem;
  color: var(--color-accent-3);
  font-weight: 500;
  margin-top: 2px;
}

.timeline-item__description {
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin-top: 10px;
}

.timeline-item__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
}

.timeline-item__tag {
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 0.72rem;
  font-weight: 500;
  background: rgba(124, 58, 237, 0.1);
  color: var(--color-accent-3);
  border: 1px solid rgba(124, 58, 237, 0.2);
}
</style>
