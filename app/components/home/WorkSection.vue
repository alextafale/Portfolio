<template>
  <section id="trabajo" ref="sectionEl" class="work" aria-labelledby="work-title">
    <h2 id="work-title" class="sr-only">{{ t('work.title') }}</h2>

    <template v-for="(job, i) in currentJobs" :key="job.company">
      <!-- Zero-height marker in normal flow: ScrollTrigger measures this
           instead of the sticky card, whose position depends on scroll. -->
      <span class="work__marker" aria-hidden="true" />
      <article class="work__item" :style="{ zIndex: i + 1 }">
        <div class="work__inner">
          <header class="work__head">
            <div class="work__id">
              <CompanyMark :mark="job.mark" class="work__mark" />
              <div>
                <h3 class="work__company">
                  <a v-if="job.site" :href="job.site.url" target="_blank" rel="noopener">{{ job.company }}</a>
                  <template v-else>{{ job.company }}</template>
                </h3>
                <p class="work__meta">
                  <span class="work__live" aria-hidden="true" />
                  <span>{{ tr(job.period) }}</span>
                  <span v-if="job.summary" class="chip">{{ tr(job.summary) }}</span>
                </p>
              </div>
            </div>

            <div class="work__about">
              <p class="work__role">{{ tr(job.role) }}</p>
              <p v-if="job.description" class="work__desc">{{ tr(job.description) }}</p>
              <ul v-if="job.highlights" class="work__points">
                <li v-for="point in tr(job.highlights)" :key="point">{{ point }}</li>
              </ul>
            </div>
          </header>

          <!-- The company's own website, framed on its brand colour. -->
          <a
            v-if="job.site"
            :href="job.site.url"
            target="_blank"
            rel="noopener"
            class="work__media"
            tabindex="-1"
            :aria-label="t('work.visit', { name: job.company })"
          >
            <div class="panel" :style="{ background: panelBackground(job.mark.color) }">
              <BrowserFrame
                v-if="job.site.image"
                class="panel__browser"
                :src="job.site.image"
                :alt="t('work.site_alt', { name: job.company })"
                :url="job.site.url"
                :eager="i === 0"
              />
              <CompanyPlate v-else :job="job" />
            </div>
          </a>
          <div v-else class="work__media">
            <div class="panel" :style="{ background: panelBackground(job.mark.color) }">
              <CompanyPlate :job="job" />
            </div>
          </div>
        </div>
      </article>
    </template>
  </section>
</template>

<script setup lang="ts">
import { experiences } from '~/data/profile'

const { t } = useI18n()
const { tr } = useLocalized()

const currentJobs = experiences.filter((e) => e.current)

const sectionEl = ref<HTMLElement>()
let ctx: { revert: () => void } | null = null

onMounted(async () => {
  if (prefersReducedMotion()) return
  const { gsap } = await loadGsap()
  if (!sectionEl.value) return

  ctx = gsap.context(() => {
    const markers = gsap.utils.toArray<HTMLElement>('.work__marker')
    const cards = gsap.utils.toArray<HTMLElement>('.work__inner')

    cards.forEach((card, i) => {
      // Each card after the first slides in tilted and straightens as it
      // reaches the top, landing on the one already pinned there.
      if (i > 0) {
        gsap.fromTo(
          card,
          { rotate: 11, xPercent: 6 },
          {
            rotate: 0,
            xPercent: 0,
            ease: 'none',
            scrollTrigger: { trigger: markers[i], start: 'top bottom', end: 'top top', scrub: true },
          },
        )
      }
      // …and the card underneath sinks back a little while it's covered.
      if (i < cards.length - 1) {
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.5,
          ease: 'none',
          scrollTrigger: { trigger: markers[i + 1], start: 'top bottom', end: 'top top', scrub: true },
        })
      }
    })
  }, sectionEl.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<style scoped>
.work {
  position: relative;
  overflow-x: clip;
}

.work__marker { display: block; height: 0; }

.work__item {
  position: sticky;
  top: 0;
  height: 100svh;
  min-height: 560px;
}

.work__inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  padding: var(--header-h) var(--gutter) var(--gutter);
  background: var(--bg);
  transform-origin: 0% 0%;
  will-change: transform;
}
.work__item:not(:first-of-type) .work__inner {
  box-shadow: 0 -30px 60px -30px rgb(0 0 0 / 0.18);
}

/* ── Head: who, when, and what I do there ── */
.work__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px 40px;
}

.work__id {
  display: flex;
  align-items: center;
  gap: 12px;
}

.work__mark {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}

.work__company {
  font-size: var(--text-sm);
  font-weight: 500;
  line-height: 1.3;
}
.work__company a:hover { text-decoration: underline; text-underline-offset: 3px; }

.work__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  margin-top: 3px;
  font-size: var(--text-xs);
  color: var(--fg-muted);
}
.work__live {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgb(34 197 94 / 0.18);
}

.work__about { max-width: 560px; }
.work__role {
  font-size: var(--text-sm);
  font-weight: 500;
  line-height: 1.3;
}
.work__desc {
  margin-top: 4px;
  font-size: var(--text-xs);
  line-height: 1.5;
  color: var(--fg-muted);
}

/* What I do there. Hidden on small phones, where the card is too short to
   hold both the list and the media; the description still says the gist. */
.work__points {
  display: none;
  margin-top: 10px;
  font-size: var(--text-xs);
  line-height: 1.45;
  color: rgb(10 10 10 / 0.72);
}
.work__points li {
  position: relative;
  padding-left: 14px;
}
.work__points li + li { margin-top: 4px; }
.work__points li::before {
  content: '';
  position: absolute;
  top: 0.62em;
  left: 0;
  width: 5px;
  height: 1px;
  background: currentColor;
}
@media (min-width: 640px) and (min-height: 640px) {
  .work__points { display: block; }
}

/* ── Media: the company's site in a browser frame ── */
.work__media {
  display: block;
  flex: 1;
  min-height: 0;
  border-radius: var(--radius-sm);
}

.panel {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  padding-top: clamp(28px, 7%, 72px);
  overflow: hidden;
  border-radius: var(--radius-sm);
  isolation: isolate;
  transition: filter 0.4s ease;
}
a.work__media:hover .panel { filter: brightness(1.03); }

/* The browser sits high and bleeds off the bottom edge, like a screen
   photographed from slightly above. */
.panel__browser {
  width: min(82%, 1120px);
  flex-shrink: 0;
}

@media (min-width: 900px) {
  .work__company,
  .work__role { font-size: var(--text-md); }
  .work__desc { font-size: var(--text-sm); }
}

@media (max-width: 640px) {
  .panel__browser { width: 118%; }
}
</style>
