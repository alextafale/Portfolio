<template>
  <section id="sobre-mi" class="about" aria-labelledby="about-title">
    <!-- 1 · Who I am, in one sentence -->
    <header class="about__intro">
      <h2 id="about-title" class="about__label muted">{{ t('about.title') }}</h2>
      <ScrubText :text="tr(statement)" class="about__statement" />
    </header>

    <!-- 2 · Photo card, bio and numbers -->
    <div class="about__profile">
      <ProfileCard class="about__card" />

      <div class="about__bio">
        <div class="about__text">
          <p v-for="(paragraph, i) in tr(profile.about)" :key="i" v-reveal>{{ paragraph }}</p>
        </div>

        <dl class="facts">
          <div v-for="fact in facts" :key="fact.label" v-reveal class="facts__item">
            <dt class="muted">{{ fact.label }}</dt>
            <dd class="facts__value">{{ fact.value }}</dd>
          </div>
        </dl>

        <div class="about__actions">
          <ChamferButton v-if="profile.resumeUrl" :to="profile.resumeUrl" variant="dark">
            <template #icon><AppIcon name="file" /></template>
            {{ t('about.cv') }}
          </ChamferButton>
          <ChamferButton :to="profile.github">
            <template #icon><AppIcon name="github" /></template>
            GitHub
          </ChamferButton>
        </div>
      </div>
    </div>

    <!-- 4 · What I do -->
    <section class="block" aria-labelledby="caps-title">
      <header class="block__head">
        <h3 id="caps-title" class="block__title">{{ t('about.caps_title') }}</h3>
        <p class="block__note muted">{{ t('about.caps_note') }}</p>
      </header>

      <ul class="block__body caps">
        <li
          v-for="(cap, i) in capabilities"
          :key="cap.title.en"
          v-reveal
          class="cap"
          :class="{ 'cap--dark': i === capabilities.length - 1 }"
        >
          <span class="cap__index">{{ String(i + 1).padStart(2, '0') }}</span>
          <h4 class="cap__title">{{ tr(cap.title) }}</h4>
          <p class="cap__desc">{{ tr(cap.description) }}</p>
          <ul class="cap__tech">
            <li v-for="name in cap.tech" :key="name" class="cap__chip">
              <TechIcon :icon="iconByName[name]" :name="name" />
              {{ name }}
            </li>
          </ul>
        </li>
      </ul>
    </section>

    <!-- 5 · Technologies -->
    <section class="block" aria-labelledby="stack-title">
      <header class="block__head">
        <h3 id="stack-title" class="block__title">{{ t('about.stack_title') }}</h3>
        <p class="block__note muted">{{ t('about.stack_note') }}</p>
      </header>

      <div class="block__body stack">
        <div v-for="group in skills" :key="group.label.en" v-reveal class="stack__row">
          <h4 class="stack__label muted">{{ tr(group.label) }}</h4>
          <ul class="stack__items">
            <li v-for="item in group.items" :key="item.name" class="tech-pill">
              <TechIcon :icon="item.icon" :name="item.name" />
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 6 · Education, languages, certifications -->
    <section class="block" aria-labelledby="edu-title">
      <header class="block__head">
        <h3 id="edu-title" class="block__title">{{ t('about.formation_title') }}</h3>
        <p class="block__note muted">{{ t('about.formation_note') }}</p>
      </header>

      <div class="block__body edu">
        <dl class="meta-list edu__side">
          <div v-reveal>
            <dt>{{ t('about.education') }}</dt>
            <dd class="edu__degree">{{ tr(education.degree) }}</dd>
            <dd class="muted">{{ education.school }}</dd>
            <dd class="muted">{{ tr(education.period) }}</dd>
          </div>
          <div v-if="pastJobs.length" v-reveal>
            <dt>{{ t('about.past') }}</dt>
            <template v-for="job in pastJobs" :key="job.company">
              <dd class="edu__degree">{{ tr(job.role) }} · {{ job.company }}</dd>
              <dd class="muted">{{ tr(job.period) }}<template v-if="job.summary"> · {{ tr(job.summary) }}</template></dd>
              <dd v-if="job.description" class="edu__desc muted">{{ tr(job.description) }}</dd>
            </template>
          </div>
          <div v-reveal>
            <dt>{{ t('about.languages') }}</dt>
            <dd v-for="lang in languages" :key="lang.name.en">{{ tr(lang.name) }} <span class="muted">· {{ tr(lang.level) }}</span></dd>
          </div>
        </dl>

        <div class="certs">
          <p class="certs__head">
            <span>{{ t('about.certifications') }}</span>
            <span class="muted">{{ t('about.issued', { years: certYears }) }}</span>
          </p>
          <ul>
            <li v-for="cert in credentials" :key="cert.title.en" v-reveal class="cert">
              <div>
                <p class="cert__title">{{ tr(cert.title) }}</p>
                <p class="cert__issuer muted">{{ cert.issuer }}</p>
              </div>
              <time class="cert__date muted" :datetime="cert.date">{{ formatMonth(cert.date) }}</time>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { capabilities, credentials, education, experiences, languages, profile, skills, statement } from '~/data/profile'

const { t } = useI18n()
const { tr, locale } = useLocalized()

const currentJobs = experiences.filter((e) => e.current)
const pastJobs = experiences.filter((e) => !e.current)

const allSkills = skills.flatMap((g) => g.items)
const iconByName: Record<string, string | undefined> = Object.fromEntries(allSkills.map((s) => [s.name, s.icon]))

// Every number is derived from the data files, so it can't drift from the CV.
const facts = computed(() => [
  { value: currentJobs.length, label: t('about.facts.roles') },
  { value: credentials.length, label: t('about.facts.certs') },
  { value: new Set(allSkills.map((s) => s.name)).size, label: t('about.facts.tech') },
])

const certYears = computed(() => {
  const years = [...new Set(credentials.map((c) => c.date.slice(0, 4)))].sort()
  return years.length > 1 ? `${years[0]}–${years.at(-1)}` : years[0]
})

// '2026-07' → 'jul 2026' / 'Jul 2026'. Pinned to UTC so the server and the
// browser print the same month whatever their time zone.
function formatMonth(ym: string) {
  const [y, m] = ym.split('-').map(Number)
  return new Intl.DateTimeFormat(locale.value === 'es' ? 'es-MX' : 'en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(y!, m! - 1, 1)))
}
</script>

<style scoped>
.about {
  padding: 120px var(--gutter) 0;
}

/* ── 1 · Statement ── */
.about__label { font-size: var(--text-md); }
.about__statement {
  max-width: 1120px;
  margin-top: 20px;
  font-size: clamp(30px, 4.6vw, 66px);
  font-weight: 500;
  line-height: 1.06;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

/* ── 2 · Profile ── */
.about__profile {
  display: grid;
  gap: 40px;
  margin-top: 72px;
}
.about__bio { max-width: 600px; }
.about__text {
  display: grid;
  gap: 18px;
  font-size: var(--text-md);
  line-height: 1.5;
}

.facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px 20px;
  margin-top: 44px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}
.facts__item { display: flex; flex-direction: column-reverse; gap: 4px; }
.facts__item dt { font-size: var(--text-xs); }
.facts__value {
  font-size: clamp(36px, 4vw, 52px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
}

.about__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 36px;
}

/* ── Shared block layout: title column + content column ── */
.block {
  display: grid;
  gap: 28px;
  margin-top: 120px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}
.block__title {
  font-size: clamp(22px, 2.2vw, 28px);
  font-weight: 500;
  letter-spacing: -0.02em;
}
.block__note {
  max-width: 300px;
  margin-top: 8px;
  font-size: var(--text-sm);
  line-height: 1.45;
}

/* ── 4 · Capabilities ── */
.caps {
  display: grid;
  gap: 8px;
}
.cap {
  display: flex;
  flex-direction: column;
  min-height: 280px;
  padding: 22px;
  border-radius: var(--radius-md);
  background: var(--surface);
}
.cap__index {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--fg-faint);
}
.cap__title {
  margin-top: 48px;
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.02em;
}
.cap__desc {
  margin-top: 8px;
  max-width: 420px;
  line-height: 1.5;
  color: rgb(10 10 10 / 0.62);
}
.cap__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  padding-top: 28px;
}
.cap__chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 10px;
  border-radius: 8px;
  background: var(--bg);
  font-size: var(--text-xs);
  color: rgb(10 10 10 / 0.75);
}
.cap__chip :deep(.tech-icon) { width: 14px; height: 14px; }

/* The AI card is the one dark tile: it's the part of my work I want to stand out. */
.cap--dark { background: #0b0b0b; color: #fff; }
.cap--dark .cap__index { color: rgb(255 255 255 / 0.4); }
.cap--dark .cap__desc { color: rgb(255 255 255 / 0.62); }
.cap--dark .cap__chip { background: rgb(255 255 255 / 0.1); color: rgb(255 255 255 / 0.85); }
.cap--dark .cap__chip :deep(.tech-icon__letter) { color: #0b0b0b; }

/* ── 5 · Stack ── */
.stack { display: grid; }
.stack__row {
  display: grid;
  gap: 12px;
  padding: 20px 0;
  border-bottom: 1px solid var(--line);
}
.stack__row:first-child { padding-top: 0; }
.stack__label { font-size: var(--text-sm); font-weight: 400; }
.stack__items {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tech-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: var(--text-sm);
  transition: border-color 0.2s ease, background-color 0.2s ease;
}
.tech-pill :deep(.tech-icon) { color: rgb(10 10 10 / 0.72); }
.tech-pill:hover { border-color: rgb(10 10 10 / 0.2); background: var(--surface); }

/* ── 6 · Education ── */
.edu { display: grid; gap: 40px; }
.edu__side { align-content: start; gap: 24px; }
.edu__degree { font-weight: 500; }
.edu__desc { max-width: 380px; margin-top: 4px; line-height: 1.5; }

.certs__head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);
}
.cert {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}
.cert__title { line-height: 1.35; }
.cert__issuer { margin-top: 2px; font-size: var(--text-xs); }
.cert__date {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 12px;
  text-transform: uppercase;
}

@media (min-width: 640px) {
  .facts { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .caps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 900px) {
  .about { padding-top: 160px; }

  /* Title column on the left, content on the right — the same 1 : 2 split
     for every block, so the page reads down one consistent spine. */
  .about__profile,
  .block {
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: 32px;
  }
  .about__profile { margin-top: 96px; }
  .block { margin-top: 160px; }
  .block__head {
    position: sticky;
    top: calc(var(--header-h) + 8px);
    align-self: start;
  }

  .stack__row { grid-template-columns: 180px minmax(0, 1fr); align-items: center; gap: 20px; }

  .edu { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 32px; }
}
</style>
