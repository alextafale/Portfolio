<template>
  <div class="contact-page">
    <PageHeader
      :eyebrow="$t('contact.headline')"
      :subtitle="$t('contact.subtitle')"
      ghost="SAY HI"
    >
      <template #backdrop>
        <WireTerrain />
      </template>
      {{ $t('contact.title') }}
    </PageHeader>

    <div class="container contact__container">
      <div class="contact__grid">
        <!-- Form -->
        <form class="contact__form" ref="formRef" @submit.prevent="handleSubmit" novalidate>
          <div class="contact__form-group">
            <label for="contact-name" class="contact__label">{{ $t('contact.form.name') }}</label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              class="contact__input"
              :class="{ 'contact__input--error': errors.name }"
              :placeholder="$t('contact.form.name_placeholder')"
              autocomplete="name"
            />
            <span v-if="errors.name" class="contact__error">{{ errors.name }}</span>
          </div>

          <div class="contact__form-group">
            <label for="contact-email" class="contact__label">{{ $t('contact.form.email') }}</label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              class="contact__input"
              :class="{ 'contact__input--error': errors.email }"
              :placeholder="$t('contact.form.email_placeholder')"
              autocomplete="email"
            />
            <span v-if="errors.email" class="contact__error">{{ errors.email }}</span>
          </div>

          <div class="contact__form-group">
            <label for="contact-subject" class="contact__label">{{ $t('contact.form.subject') }}</label>
            <input
              id="contact-subject"
              v-model="form.subject"
              type="text"
              class="contact__input"
              :placeholder="$t('contact.form.subject_placeholder')"
            />
          </div>

          <div class="contact__form-group">
            <label for="contact-message" class="contact__label">{{ $t('contact.form.message') }}</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              class="contact__input contact__textarea"
              :class="{ 'contact__input--error': errors.message }"
              :placeholder="$t('contact.form.message_placeholder')"
              rows="5"
            />
            <span v-if="errors.message" class="contact__error">{{ errors.message }}</span>
          </div>

          <!-- Submit -->
          <AppButton
            type="submit"
            variant="primary"
            :disabled="isSubmitting"
            style="width: 100%; justify-content: center;"
          >
            <svg v-if="!isSubmitting" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
            </svg>
            {{ isSubmitting ? $t('contact.form.sending') : submitted ? $t('contact.form.sent') : $t('contact.form.send') }}
          </AppButton>

          <p v-if="submitted" class="contact__success">
            {{ $t('contact.success') }}
          </p>
          <p v-if="sendError" class="contact__error contact__error--banner">
            {{ sendError }}
          </p>
        </form>

        <!-- Right: Info panel -->
        <aside class="contact__info" ref="infoRef">
          <div class="contact__info-card">
            <h3 class="contact__info-title">{{ $t('contact.info.title') }}</h3>
            <p class="contact__info-text">{{ $t('contact.info.text') }}</p>

            <div class="contact__info-links">
              <a
                v-for="link in socialLinks"
                :key="link.name"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="contact__info-link"
              >
                <span class="contact__info-link-name">{{ link.name }}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            <div class="contact__response-time">
              <span class="contact__status-dot" />
              {{ $t('contact.info.response_time') }}
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { socialLinks } from '~/data/profile'
import { useAnimations } from '~/composables/useAnimations'

definePageMeta({ layout: 'default' })

const formRef = ref<HTMLElement | null>(null)
const infoRef = ref<HTMLElement | null>(null)

const { t } = useI18n()

const form = reactive({ name: '', email: '', subject: '', message: '' })
const errors = reactive({ name: '', email: '', message: '' })
const isSubmitting = ref(false)
const submitted = ref(false)
const sendError = ref('')

function validate(): boolean {
  errors.name = form.name.trim() ? '' : t('contact.errors.name')
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : t('contact.errors.email')
  errors.message = form.message.trim().length >= 10 ? '' : t('contact.errors.message')
  return !errors.name && !errors.email && !errors.message
}

async function handleSubmit() {
  sendError.value = ''
  if (!validate()) return
  isSubmitting.value = true

  try {
    const response = await fetch('https://formsubmit.co/ajax/tafoyaalex32@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        subject: form.subject || 'Nuevo mensaje desde tu Portafolio',
        message: form.message,
        _subject: `Portafolio Contacto: ${form.subject || 'Nuevo Mensaje'}`
      })
    })

    if (response.ok) {
      submitted.value = true
      Object.assign(form, { name: '', email: '', subject: '', message: '' })
    } else {
      // Surfaced in the form instead of an alert(), which a native dialog
      // interrupts the page for and which cannot be styled or translated.
      sendError.value = t('contact.errors.send_failed')
    }
  } catch {
    sendError.value = t('contact.errors.network')
  } finally {
    isSubmitting.value = false
  }
}

const { initGsap, scrollFadeIn } = useAnimations()

onMounted(async () => {
  await initGsap()
  if (formRef.value) {
    scrollFadeIn(formRef.value, { y: 40, duration: 1 })
  }
  if (infoRef.value) {
    scrollFadeIn(infoRef.value, { y: 40, duration: 1, delay: 0.2 })
  }
})
</script>

<style scoped>
.contact__container {
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: var(--section-padding);
}

.contact__grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
  align-items: start;
}

/* Form */
.contact__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact__form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.contact__label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.contact__input {
  padding: 14px 18px;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-ink);
  font-family: var(--font-body);
  font-size: 0.9rem;
  outline: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.contact__input::placeholder { color: var(--color-text-muted); }

.contact__input:focus {
  border-color: var(--color-accent);
  box-shadow: var(--glow-accent-soft);
}

.contact__input--error {
  border-color: #f87171 !important;
}

.contact__textarea {
  resize: vertical;
  min-height: 140px;
}

.contact__error {
  font-size: 0.78rem;
  color: #f87171;
}

.contact__error--banner {
  padding: 12px 16px;
  border-radius: var(--radius-md);
  background: rgba(248, 113, 113, 0.08);
  border: 1px solid rgba(248, 113, 113, 0.28);
  text-align: center;
}

.contact__success {
  text-align: center;
  font-size: 0.9rem;
  color: var(--color-accent);
  padding: 14px;
  border-radius: var(--radius-md);
  background: var(--color-accent-soft);
  border: 1px solid rgba(212, 255, 63, 0.28);
}

/* Info panel */
.contact__info-card {
  padding: 30px;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact__info-title {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  text-transform: uppercase;
  color: var(--color-ink);
}

.contact__info-text {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.contact__info-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact__info-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  transition:
    color var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-normal);
}

.contact__info-link:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  box-shadow: var(--glow-accent-soft);
}

.contact__response-time {
  display: flex;
  align-items: center;
  gap: 9px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

.contact__status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 10px var(--color-accent);
  flex-shrink: 0;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.35; }
}

/* Responsive */
@media (max-width: 768px) {
  .contact__grid { grid-template-columns: 1fr; }
}
</style>
