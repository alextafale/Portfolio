<template>
  <div class="timeline-item" :class="`timeline-item--${item.type}`">
    <div class="timeline-item__marker" aria-hidden="true" />

    <div class="timeline-item__content">
      <div class="timeline-item__head">
        <span class="timeline-item__period">{{ item.period }}</span>
        <span class="timeline-item__type">{{ typeLabels[item.type] }}</span>
      </div>
      <h3 class="timeline-item__title">{{ item.title[locale as 'en' | 'es'] }}</h3>
      <p class="timeline-item__company">{{ item.company }}</p>
      <p class="timeline-item__description">{{ item.description[locale as 'en' | 'es'] }}</p>
      <div v-if="item.tags?.length" class="timeline-item__tags">
        <span v-for="tag in item.tags" :key="tag" class="timeline-item__tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Experience } from '~/types'

const { locale } = useI18n()

defineProps<{ item: Experience }>()

const typeLabels: Record<Experience['type'], string> = {
  work: 'Work',
  education: 'Education',
  certification: 'Cert',
}
</script>

<style scoped>
.timeline-item {
  display: grid;
  grid-template-columns: 14px 1fr;
  gap: 0 18px;
  position: relative;
  transition: transform 0.3s ease;
}

.timeline-item:hover {
  transform: translateX(4px);
}

/* Vertical line */
.timeline-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 20px;
  bottom: -28px;
  width: 1.5px;
  background: var(--color-border);
  transition: background 0.3s ease;
}

.timeline-item:hover:not(:last-child)::after {
  background: var(--color-accent);
}

/* Square marker, colored by type */
.timeline-item__marker {
  width: 13px;
  height: 13px;
  border-radius: 2px;
  margin-top: 6px;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.timeline-item:hover .timeline-item__marker {
  transform: rotate(45deg) scale(1.15);
}

.timeline-item--work .timeline-item__marker {
  background: var(--color-accent);
}

.timeline-item--education .timeline-item__marker {
  background: var(--color-ink);
}

.timeline-item--certification .timeline-item__marker {
  background: transparent;
  border: 2px solid var(--color-accent);
}

/* Content */
.timeline-item__content {
  padding-bottom: 32px;
}

.timeline-item__head {
  display: flex;
  align-items: center;
  gap: 10px;
}

.timeline-item__period {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.timeline-item__type {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 1px 7px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
}

.timeline-item__title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-ink);
  margin-top: 8px;
  transition: color 0.3s ease;
}

.timeline-item:hover .timeline-item__title {
  color: var(--color-accent);
}

.timeline-item__company {
  font-size: 0.88rem;
  color: var(--color-accent-ink);
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
  padding: 2px 9px;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-item__tag {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
</style>
