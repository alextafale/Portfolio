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

// Model: "Buster Drone" by LaVADraGoN (Sketchfab, CC BY-NC 4.0) — see public/models/CREDITS.md

const { t, locale } = useI18n()
const route = useRoute()

const stageRef = ref<HTMLElement | null>(null)
const ready = ref(false)
const dismissed = ref(false)
const message = ref('')

let renderer: any = null
let mixer: any = null
let rig: any = null // outer group: entrance, cursor yaw, scroll tilt
let inner: any = null // inner group: procedural emote wiggles
let model: any = null
let hoverAction: any = null
let clock: any = null
let rafId = 0
let bubbleTimer: ReturnType<typeof setTimeout> | null = null
let emoteTimer: ReturnType<typeof setTimeout> | null = null
let sectionObserver: IntersectionObserver | null = null
let targetRotationY = 0
let targetTilt = 0
let disposed = false
let paused = false
let emoting = false
let scrolling = false
let gsap: any = null
let onVisibility: (() => void) | null = null

const EMOTES = ['Wave', 'Yes', 'ThumbsUp', 'Jump']

function say(key: string, duration = 6000) {
  message.value = t(key)
  if (bubbleTimer) clearTimeout(bubbleTimer)
  bubbleTimer = setTimeout(() => { message.value = '' }, duration)
}

/* ── Procedural emotes ──
   The drone ships a single 25s flight loop, so gestures are GSAP moves on
   the inner group; the flight loop briefly speeds up for "excitement". */
function playEmote(name: string) {
  if (!inner || !gsap || emoting) return
  emoting = true
  const done = () => { emoting = false }

  switch (name) {
    case 'Wave': // friendly side-to-side sway
      gsap.timeline({ onComplete: done })
        .to(inner.rotation, { z: 0.2, duration: 0.3, ease: 'sine.inOut' })
        .to(inner.rotation, { z: -0.2, duration: 0.55, ease: 'sine.inOut', repeat: 1, yoyo: true })
        .to(inner.rotation, { z: 0, duration: 0.3, ease: 'sine.out' })
      break
    case 'Yes': // nod
      gsap.timeline({ onComplete: done })
        .to(inner.rotation, { x: 0.28, duration: 0.2, ease: 'power2.inOut', repeat: 3, yoyo: true })
        .to(inner.rotation, { x: 0, duration: 0.2, ease: 'sine.out' })
      break
    case 'ThumbsUp': // happy hop
      gsap.timeline({ onComplete: done })
        .to(inner.scale, { x: 1.1, y: 0.92, z: 1.1, duration: 0.15, ease: 'power2.out' })
        .to(inner.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: 'elastic.out(1, 0.45)' })
        .to(inner.position, { y: '+=0.35', duration: 0.22, ease: 'power2.out' }, 0.08)
        .to(inner.position, { y: '-=0.35', duration: 0.45, ease: 'bounce.out' }, '>')
      break
    case 'Jump': // barrel spin
    default:
      gsap.to(inner.rotation, {
        y: '+=6.2832',
        duration: 0.95,
        ease: 'power2.inOut',
        onComplete: () => { inner.rotation.y = 0; done() },
      })
  }

  if (hoverAction) {
    gsap.to(hoverAction, { timeScale: 2.2, duration: 0.2, overwrite: 'auto' })
    gsap.to(hoverAction, { timeScale: 1, duration: 0.7, delay: 1, overwrite: 'auto' })
  }
}

/* ── Spontaneous emotes while idle ── */
function scheduleRandomEmote() {
  if (emoteTimer) clearTimeout(emoteTimer)
  emoteTimer = setTimeout(() => {
    if (!disposed && !paused && !emoting) {
      playEmote(['Wave', 'Yes', 'ThumbsUp'][Math.floor(Math.random() * 3)]!)
    }
    scheduleRandomEmote()
  }, 18000 + Math.random() * 17000)
}

function onRobotClick() {
  const i = Math.floor(Math.random() * 3)
  say(`robot.click_${i}`)
  playEmote(EMOTES[Math.floor(Math.random() * EMOTES.length)] ?? 'Wave')
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

/* ── Scroll → lean forward and boost the rotors ── */
let scrollStopTimer: ReturnType<typeof setTimeout> | null = null
function onScroll() {
  if (!rig) return
  if (!scrolling) {
    scrolling = true
    targetTilt = 0.3
    if (hoverAction && gsap) gsap.to(hoverAction, { timeScale: 2.4, duration: 0.3, overwrite: 'auto' })
  }
  if (scrollStopTimer) clearTimeout(scrollStopTimer)
  scrollStopTimer = setTimeout(() => {
    scrolling = false
    targetTilt = 0
    if (hoverAction && gsap) gsap.to(hoverAction, { timeScale: 1, duration: 0.6, overwrite: 'auto' })
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
  const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js')
  gsap = (await import('gsap')).gsap
  if (disposed || !stageRef.value) return

  const width = stageRef.value.clientWidth
  const height = stageRef.value.clientHeight

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.25, 100)
  camera.position.set(0, 2.1, 5.4)
  camera.lookAt(0, 1.5, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
  renderer.setClearColor(0x000000, 0)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  stageRef.value.appendChild(renderer.domElement)

  // Image-based lighting so the PBR metal and emissive panels read properly
  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  pmrem.dispose()

  const dir = new THREE.DirectionalLight(0xffffff, 2)
  dir.position.set(2, 8, 5)
  dir.castShadow = true
  dir.shadow.mapSize.set(1024, 1024)
  dir.shadow.camera.left = -3
  dir.shadow.camera.right = 3
  dir.shadow.camera.top = 6
  dir.shadow.camera.bottom = -1
  dir.shadow.bias = -0.001
  scene.add(dir)

  // Cool rim light so the dark shell doesn't flatten against the page
  const rim = new THREE.DirectionalLight(0xbfc7ff, 1.4)
  rim.position.set(-4, 3, -4)
  scene.add(rim)

  // Invisible disc that only receives the contact shadow
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(2.4, 40).rotateX(-Math.PI / 2),
    new THREE.ShadowMaterial({ opacity: 0.16 }),
  )
  ground.receiveShadow = true
  scene.add(ground)

  const loader = new GLTFLoader()
  loader.load('/models/busterDrone.glb', (gltf: any) => {
    if (disposed) return
    model = gltf.scene

    // Normalize the export: fit to ~2.8 units and center on the origin
    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3())
    model.scale.setScalar(3.1 / Math.max(size.x, size.y, size.z))
    box.setFromObject(model)
    model.position.sub(box.getCenter(new THREE.Vector3()))

    model.traverse((obj: any) => {
      if (obj.isMesh) obj.castShadow = true
    })

    inner = new THREE.Group()
    inner.add(model)
    inner.position.y = 1.5 // hover height above the shadow disc
    rig = new THREE.Group()
    rig.add(inner)
    rig.rotation.y = -0.15 // resting three-quarter pose (matches cursor offset)
    scene.add(rig)

    // Entrance: fly up from below the stage
    rig.position.y = -3.4
    gsap.to(rig.position, { y: 0, duration: 1, ease: 'back.out(1.2)', delay: 0.3 })

    mixer = new THREE.AnimationMixer(model)
    hoverAction = gltf.animations[0] ? mixer.clipAction(gltf.animations[0]) : null
    hoverAction?.play()

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
    if (rig) {
      rig.rotation.y += (targetRotationY - rig.rotation.y) * 0.06
      rig.rotation.x += (targetTilt - rig.rotation.x) * 0.08
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
  transition: transform 0.35s ease;
}

.robot__stage:hover {
  transform: translateY(-3px);
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
