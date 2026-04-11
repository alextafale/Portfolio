<template>
  <div class="contact-page section">
    <div class="container contact__container">
      <SectionTitle
        eyebrow="Get in touch"
        centered
        subtitle="Have a project in mind or just want to say hi? I'd love to hear from you."
      >
        Contact Me
      </SectionTitle>

      <div class="contact__grid">
        <!-- Form -->
        <form class="contact__form" ref="formRef" @submit.prevent="handleSubmit" novalidate>
          <div class="contact__form-group">
            <label for="contact-name" class="contact__label">Name</label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              class="contact__input"
              :class="{ 'contact__input--error': errors.name }"
              placeholder="Your name"
              autocomplete="name"
            />
            <span v-if="errors.name" class="contact__error">{{ errors.name }}</span>
          </div>

          <div class="contact__form-group">
            <label for="contact-email" class="contact__label">Email</label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              class="contact__input"
              :class="{ 'contact__input--error': errors.email }"
              placeholder="your@email.com"
              autocomplete="email"
            />
            <span v-if="errors.email" class="contact__error">{{ errors.email }}</span>
          </div>

          <div class="contact__form-group">
            <label for="contact-subject" class="contact__label">Subject</label>
            <input
              id="contact-subject"
              v-model="form.subject"
              type="text"
              class="contact__input"
              placeholder="What's it about?"
            />
          </div>

          <div class="contact__form-group">
            <label for="contact-message" class="contact__label">Message</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              class="contact__input contact__textarea"
              :class="{ 'contact__input--error': errors.message }"
              placeholder="Tell me about your project or idea..."
              rows="5"
            />
            <span v-if="errors.message" class="contact__error">{{ errors.message }}</span>
          </div>

          <!-- Submit -->
          <AppButton
            type="submit"
            variant="primary"
            :class="{ 'loading': isSubmitting }"
            style="width: 100%; justify-content: center;"
          >
            <svg v-if="!isSubmitting" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
            </svg>
            {{ isSubmitting ? 'Sending…' : submitted ? 'Message Sent! ✓' : 'Send Message' }}
          </AppButton>

          <p v-if="submitted" class="contact__success">
            Thanks for reaching out! I'll get back to you soon. 🚀
          </p>
        </form>

        <!-- Right: Info panel -->
        <aside class="contact__info" ref="infoRef">
          <div class="contact__info-card">
            <h3 class="contact__info-title">Let's build something great</h3>
            <p class="contact__info-text">
              I'm currently open to freelance projects, collaborations and full-time opportunities.
              Don't hesitate to reach out!
            </p>

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
              Usually responds within 24 hours
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

const form = reactive({ name: '', email: '', subject: '', message: '' })
const errors = reactive({ name: '', email: '', message: '' })
const isSubmitting = ref(false)
const submitted = ref(false)

function validate(): boolean {
  errors.name = form.name.trim() ? '' : 'Name is required.'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'A valid email is required.'
  errors.message = form.message.trim().length >= 10 ? '' : 'Message must be at least 10 characters.'
  return !errors.name && !errors.email && !errors.message
}

async function handleSubmit() {
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
    });

    if (response.ok) {
      submitted.value = true
      Object.assign(form, { name: '', email: '', subject: '', message: '' })
    } else {
      alert('Hubo un error al enviar tu mensaje. Por favor intenta más tarde.')
    }
  } catch (error) {
    alert('Fallo de red al intentar enviar. Revisa tu conexión.')
  } finally {
    isSubmitting.value = false
  }
}

const { initGsap } = useAnimations()

onMounted(async () => {
  const { gsap } = await initGsap()
  gsap.fromTo(formRef.value, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
  gsap.fromTo(infoRef.value, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.15, ease: 'power3.out' })
})
</script>

<style scoped>
.contact-page {
  padding-top: 120px;
}

.contact__container {
  max-width: 960px;
  margin: 0 auto;
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
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-text-secondary);
}

.contact__input {
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  background: var(--color-bg-card);
  border: 1.5px solid var(--color-border);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: 0.9rem;
  outline: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.contact__input::placeholder { color: var(--color-text-muted); }

.contact__input:focus {
  border-color: var(--color-accent-1);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
}

.contact__input--error {
  border-color: #f87171 !important;
}

.contact__textarea {
  resize: vertical;
  min-height: 130px;
}

.contact__error {
  font-size: 0.78rem;
  color: #f87171;
}

.contact__success {
  text-align: center;
  font-size: 0.9rem;
  color: #34d399;
  padding: 12px;
  border-radius: var(--radius-sm);
  background: rgba(52, 211, 153, 0.08);
  border: 1px solid rgba(52, 211, 153, 0.2);
}

/* Info panel */
.contact__info-card {
  padding: 28px;
  border-radius: var(--radius-md);
  background: var(--gradient-card);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact__info-title {
  font-size: 1.2rem;
  font-weight: 700;
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
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.contact__info-link:hover {
  color: var(--color-accent-3);
  border-color: var(--color-border-hover);
  background: rgba(124, 58, 237, 0.06);
}

.contact__response-time {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.contact__status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
  flex-shrink: 0;
  animation: pulse 2s infinite;
}

/* Responsive */
@media (max-width: 768px) {
  .contact__grid { grid-template-columns: 1fr; }
}
</style>
