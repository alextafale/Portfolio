<template>
  <div ref="wrapRef" class="hero-scene" aria-hidden="true">
    <canvas ref="canvasRef" class="hero-scene__canvas" />
    <div class="hero-scene__vignette" />
  </div>
</template>

<script setup lang="ts">
/**
 * HeroScene — Three.js hero object.
 *
 * A wireframe icosahedron wrapped around a dark core, sitting in a slow
 * orbiting particle field, pushed through a bloom pass so the lime accent
 * actually glows instead of just being a bright line.
 *
 * Everything is torn down on unmount, and the RAF loop is suspended while
 * the canvas is offscreen so scrolling past the hero costs nothing.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'

const wrapRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const ACCENT = 0xd4ff3f

let cleanup: (() => void) | null = null

onMounted(async () => {
  const canvas = canvasRef.value
  const wrap = wrapRef.value
  if (!canvas || !wrap) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const THREE = await import('three')
  const { EffectComposer, EffectPass, RenderPass, BloomEffect, KernelSize } =
    await import('postprocessing')

  // ── Renderer ──────────────────────────────────────────────
  // depth/stencil are off because EffectComposer manages its own buffers.
  let renderer: import('three').WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      stencil: false,
      depth: false,
      powerPreference: 'high-performance',
    })
  } catch {
    // No WebGL — leave the hero as plain markup rather than breaking the page.
    return
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(wrap.clientWidth, wrap.clientHeight, false)

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    45,
    wrap.clientWidth / Math.max(wrap.clientHeight, 1),
    0.1,
    100,
  )
  camera.position.set(0, 0, 8.5)

  // ── Hero object ───────────────────────────────────────────
  const group = new THREE.Group()
  scene.add(group)

  const wireGeo = new THREE.IcosahedronGeometry(2, 1)
  const wireMat = new THREE.MeshBasicMaterial({
    color: ACCENT,
    wireframe: true,
    transparent: true,
    opacity: 0.85,
  })
  const wire = new THREE.Mesh(wireGeo, wireMat)
  group.add(wire)

  // Opaque core so the far side of the wireframe is occluded — without it
  // the shape reads flat instead of volumetric.
  const coreGeo = new THREE.IcosahedronGeometry(1.94, 3)
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    roughness: 0.35,
    metalness: 0.9,
  })
  const core = new THREE.Mesh(coreGeo, coreMat)
  group.add(core)

  const rimLight = new THREE.PointLight(ACCENT, 60, 24)
  rimLight.position.set(4, 3, 5)
  scene.add(rimLight)

  const fillLight = new THREE.PointLight(0x4060ff, 25, 24)
  fillLight.position.set(-5, -3, 3)
  scene.add(fillLight)

  scene.add(new THREE.AmbientLight(0xffffff, 0.12))

  // ── Particle field ────────────────────────────────────────
  const COUNT = 420
  const positions = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    // Spherical shell so particles surround the object instead of clustering
    // at the centre (which uniform cube sampling would do). The outer radius
    // stays well inside the camera distance — a particle drifting close to the
    // lens would be scaled into a huge blob by sizeAttenuation.
    const r = 3.4 + Math.random() * 2.8
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
  }
  const dustGeo = new THREE.BufferGeometry()
  dustGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  // PointsMaterial draws an untextured quad, so particles render as hard
  // squares. This radial-gradient sprite makes them read as soft dots.
  const sprite = document.createElement('canvas')
  sprite.width = sprite.height = 64
  const sctx = sprite.getContext('2d')!
  const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.4, 'rgba(255,255,255,0.65)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  sctx.fillStyle = grad
  sctx.fillRect(0, 0, 64, 64)
  const dustTex = new THREE.CanvasTexture(sprite)

  const dustMat = new THREE.PointsMaterial({
    color: ACCENT,
    size: 0.07,
    map: dustTex,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  })
  const dust = new THREE.Points(dustGeo, dustMat)
  scene.add(dust)

  // ── Post-processing ───────────────────────────────────────
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  composer.addPass(
    new EffectPass(
      camera,
      new BloomEffect({
        intensity: 1.9,
        luminanceThreshold: 0.18,
        luminanceSmoothing: 0.55,
        kernelSize: KernelSize.LARGE,
        mipmapBlur: true,
      }),
    ),
  )

  // ── Interaction ───────────────────────────────────────────
  const pointer = { x: 0, y: 0 }
  const target = { x: 0, y: 0 }

  const onPointerMove = (e: PointerEvent) => {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2
    target.y = (e.clientY / window.innerHeight - 0.5) * 2
  }
  if (!reduced) window.addEventListener('pointermove', onPointerMove, { passive: true })

  // ── Resize ────────────────────────────────────────────────
  const resize = () => {
    const w = wrap.clientWidth
    const h = wrap.clientHeight
    if (!w || !h) return
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h, false)
    composer.setSize(w, h)
  }
  const ro = new ResizeObserver(resize)
  ro.observe(wrap)

  // ── Visibility gating ─────────────────────────────────────
  let visible = true
  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry?.isIntersecting ?? true
    },
    { threshold: 0 },
  )
  io.observe(wrap)

  // ── Loop ──────────────────────────────────────────────────
  const clock = new THREE.Clock()
  let raf = 0

  const tick = () => {
    raf = requestAnimationFrame(tick)
    if (!visible) return

    const t = clock.getElapsedTime()

    if (!reduced) {
      pointer.x += (target.x - pointer.x) * 0.05
      pointer.y += (target.y - pointer.y) * 0.05

      group.rotation.y = t * 0.16 + pointer.x * 0.35
      group.rotation.x = Math.sin(t * 0.22) * 0.12 + pointer.y * 0.22
      group.position.y = Math.sin(t * 0.6) * 0.12

      dust.rotation.y = -t * 0.045
      dust.rotation.x = t * 0.02
    }

    composer.render()
  }
  tick()

  cleanup = () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
    window.removeEventListener('pointermove', onPointerMove)
    composer.dispose()
    wireGeo.dispose()
    wireMat.dispose()
    coreGeo.dispose()
    coreMat.dispose()
    dustGeo.dispose()
    dustMat.dispose()
    dustTex.dispose()
    renderer.dispose()
  }
})

onBeforeUnmount(() => {
  cleanup?.()
  cleanup = null
})
</script>

<style scoped>
.hero-scene {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-scene__canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* Fades the scene into the page background so it has no hard edges. Fading to
   a translucent black rather than the solid bg avoids a visible ellipse rim
   where the holder is narrower than the viewport. */
.hero-scene__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 58% 58% at 50% 50%,
    transparent 35%,
    rgba(10, 10, 10, 0.82) 100%
  );
}
</style>
