<template>
  <div v-if="!dismissed" class="robot" :class="{ 'robot--ready': ready }">
    <!-- Speech bubble -->
    <Transition name="bubble">
      <div v-if="message" class="robot__bubble" role="status">
        {{ message }}
      </div>
    </Transition>

    <!-- 3D canvas -->
    <div
      class="robot__stage"
      ref="stageRef"
      :title="$t('robot.hint')"
      @click="onRobotClick"
    />

    <button class="robot__close" :aria-label="$t('robot.dismiss')" @click.stop="dismiss">
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'

const { t, locale } = useI18n()
const route = useRoute()

const stageRef = ref<HTMLElement | null>(null)
const ready = ref(false)
const dismissed = ref(false)
const message = ref('')

let renderer: any = null
let mixer: any = null
let model: any = null
let face: any = null
let actions: Record<string, any> = {}
let activeAction: any = null
let clock: any = null
let rafId = 0
let bubbleTimer: ReturnType<typeof setTimeout> | null = null
let emoteTimer: ReturnType<typeof setTimeout> | null = null
let sectionObserver: IntersectionObserver | null = null
let targetRotationY = 0
let disposed = false
let paused = false
let gsap: any = null
let onVisibility: (() => void) | null = null

// Emotes play once and return to Idle; states loop
const EMOTES = ['Wave', 'Yes', 'ThumbsUp', 'Jump']

function say(key: string, duration = 6000) {
  message.value = t(key)
  if (bubbleTimer) clearTimeout(bubbleTimer)
  bubbleTimer = setTimeout(() => { message.value = '' }, duration)
}

function fadeToAction(name: string, fade = 0.3) {
  const next = actions[name]
  if (!next || next === activeAction) return
  const prev = activeAction
  activeAction = next
  if (prev) prev.fadeOut(fade)
  next.reset().setEffectiveWeight(1).fadeIn(fade).play()
}

function playEmote(name: string) {
  if (!actions[name]) return
  fadeToAction(name, 0.2)
}

/* ── Facial expressions (morph targets: Angry / Surprised / Sad) ── */
function pulseExpression(name: string, hold = 900) {
  const idx = face?.morphTargetDictionary?.[name]
  if (idx === undefined || !gsap) return
  const influences = face.morphTargetInfluences
  const target = { v: 0 }
  gsap.to(target, {
    v: 1,
    duration: 0.25,
    onUpdate: () => { influences[idx] = target.v },
    onComplete: () => {
      gsap.to(target, {
        v: 0,
        duration: 0.4,
        delay: hold / 1000,
        onUpdate: () => { influences[idx] = target.v },
      })
    },
  })
}

/* ── Spontaneous emotes while idle ── */
function scheduleRandomEmote() {
  if (emoteTimer) clearTimeout(emoteTimer)
  emoteTimer = setTimeout(() => {
    if (!disposed && !paused && activeAction === actions.Idle) {
      playEmote(['Wave', 'Yes', 'ThumbsUp'][Math.floor(Math.random() * 3)]!)
    }
    scheduleRandomEmote()
  }, 18000 + Math.random() * 17000)
}

function onRobotClick() {
  const i = Math.floor(Math.random() * 3)
  say(`robot.click_${i}`)
  playEmote(EMOTES[Math.floor(Math.random() * EMOTES.length)] ?? 'Wave')
  pulseExpression('Surprised')
}

function dismiss() {
  dismissed.value = true
  teardown()
}

/* ── Route-aware narration ── */
const routeMessages: [RegExp, string][] = [
  [/^\/(en\/?)?$/, 'robot.home'],
  [/aboutme/, 'robot.about'],
  [/proyects\/.+/, 'robot.project_detail'],
  [/proyects/, 'robot.projects'],
  [/stack/, 'robot.stack'],
  [/contact/, 'robot.contact'],
]

function narrateRoute(path: string, emote = true) {
  const match = routeMessages.find(([re]) => re.test(path))
  if (match) {
    say(match[1])
    if (emote) {
      playEmote(/contact/.test(path) ? 'ThumbsUp' : 'Yes')
    }
  }
}

/* ── Section observation (home sections carry data-robot attrs) ── */
function observeSections() {
  sectionObserver?.disconnect()
  sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const key = (entry.target as HTMLElement).dataset.robot
          if (key) {
            say(`robot.${key}`)
            playEmote(key === 'ai' ? 'ThumbsUp' : 'Yes')
          }
        }
      }
    },
    { threshold: 0.35 },
  )
  document.querySelectorAll<HTMLElement>('[data-robot]').forEach(el => sectionObserver!.observe(el))
}

/* ── Scroll → walk ── */
let scrollStopTimer: ReturnType<typeof setTimeout> | null = null
function onScroll() {
  if (!mixer) return
  if (activeAction !== actions.Walking && activeAction === actions.Idle) {
    fadeToAction('Walking', 0.2)
  }
  if (scrollStopTimer) clearTimeout(scrollStopTimer)
  scrollStopTimer = setTimeout(() => {
    if (activeAction === actions.Walking) fadeToAction('Idle', 0.4)
  }, 350)
}

/* ── Cursor tracking ── */
function onMouseMove(e: MouseEvent) {
  const nx = (e.clientX / window.innerWidth) * 2 - 1
  targetRotationY = nx * 0.5 - 0.15
}

async function init() {
  if (!stageRef.value) return
  const THREE = await import('three')
  const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
  gsap = (await import('gsap')).gsap
  if (disposed || !stageRef.value) return

  const width = stageRef.value.clientWidth
  const height = stageRef.value.clientHeight

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.25, 100)
  camera.position.set(0, 2.4, 7.4)
  camera.lookAt(0, 2, 0)

  const hemi = new THREE.HemisphereLight(0xffffff, 0xdedcd2, 3)
  hemi.position.set(0, 20, 0)
  scene.add(hemi)

  const dir = new THREE.DirectionalLight(0xffffff, 3)
  dir.position.set(2, 8, 5)
  scene.add(dir)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
  renderer.setClearColor(0x000000, 0)
  stageRef.value.appendChild(renderer.domElement)

  const loader = new GLTFLoader()
  loader.load('/models/RobotExpressive.glb', (gltf: any) => {
    if (disposed) return
    model = gltf.scene
    scene.add(model)

    face = model.getObjectByName('Head_4') ?? null

    // Entrance: rise from below the stage
    model.position.y = -3.4
    gsap.to(model.position, { y: 0, duration: 0.9, ease: 'back.out(1.4)', delay: 0.3 })

    mixer = new THREE.AnimationMixer(model)

    for (const clip of gltf.animations) {
      const action = mixer.clipAction(clip)
      actions[clip.name] = action
      if (EMOTES.includes(clip.name) || ['Death', 'Sitting', 'Standing'].includes(clip.name)) {
        action.clampWhenFinished = true
        action.loop = THREE.LoopOnce
      }
    }

    // Emotes return to Idle when finished
    mixer.addEventListener('finished', () => {
      fadeToAction('Idle', 0.35)
    })

    activeAction = actions.Idle
    activeAction?.play()

    ready.value = true

    // Greeting
    setTimeout(() => {
      playEmote('Wave')
      say('robot.greeting', 7000)
    }, 600)

    scheduleRandomEmote()
  })

  clock = new THREE.Clock()
  const animate = () => {
    if (disposed || paused) return
    rafId = requestAnimationFrame(animate)
    const dt = clock.getDelta()
    if (mixer) mixer.update(dt)
    if (model) {
      model.rotation.y += (targetRotationY - model.rotation.y) * 0.06
    }
    renderer.render(scene, camera)
  }
  animate()

  onVisibility = () => {
    if (document.hidden) {
      paused = true
      cancelAnimationFrame(rafId)
    } else if (paused) {
      paused = false
      clock.getDelta() // flush the gap so the mixer doesn't jump
      animate()
    }
  }
  document.addEventListener('visibilitychange', onVisibility)

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  observeSections()
}

function teardown() {
  disposed = true
  cancelAnimationFrame(rafId)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('mousemove', onMouseMove)
  if (onVisibility) document.removeEventListener('visibilitychange', onVisibility)
  sectionObserver?.disconnect()
  if (bubbleTimer) clearTimeout(bubbleTimer)
  if (emoteTimer) clearTimeout(emoteTimer)
  if (scrollStopTimer) clearTimeout(scrollStopTimer)
  if (renderer) {
    renderer.dispose()
    renderer.domElement?.remove()
    renderer = null
  }
}

watch(() => route.path, async (path) => {
  if (!ready.value) return
  narrateRoute(path)
  // Re-observe sections of the newly rendered page
  await nextTick()
  setTimeout(observeSections, 400)
})

// Refresh bubble language on locale switch
watch(locale, () => { message.value = '' })

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const small = window.innerWidth < 768
  if (reduced || small) {
    dismissed.value = true
    return
  }
  init()
})

onUnmounted(teardown)
</script>

<style scoped>
.robot {
  position: fixed;
  right: 18px;
  bottom: 8px;
  z-index: 90;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.robot--ready {
  opacity: 1;
}

.robot__stage {
  width: 170px;
  height: 210px;
  pointer-events: auto;
  cursor: pointer;
}

.robot__stage :deep(canvas) {
  display: block;
}

/* Speech bubble — matches the "ink on paper" system */
.robot__bubble {
  pointer-events: auto;
  max-width: 240px;
  margin-bottom: 2px;
  margin-right: 24px;
  padding: 12px 14px;
  background: var(--color-surface);
  border: 1.5px solid var(--color-ink);
  border-radius: var(--radius-md);
  border-bottom-right-radius: 2px;
  box-shadow: 4px 4px 0 var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  line-height: 1.55;
  color: var(--color-ink);
}

.bubble-enter-active,
.bubble-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.bubble-enter-from,
.bubble-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.96);
}

/* Close */
.robot__close {
  position: absolute;
  top: -4px;
  right: 0;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
}

.robot:hover .robot__close {
  opacity: 1;
}

.robot__close:hover {
  color: var(--color-ink);
  border-color: var(--color-ink);
}

@media (max-width: 768px) {
  .robot { display: none; }
}
</style>
