/**
 * useThreeScene — shared WebGL plumbing for the site's Three.js scenes.
 *
 * Every scene needs the same scaffolding: a renderer sized to its host, an
 * optional bloom pass, smoothed pointer input, scroll progress, a frame loop
 * that stops while offscreen, and a teardown that actually frees GPU memory.
 * Scenes supply only their contents and a per-frame update.
 *
 * A scene that fails to get a WebGL context resolves to a no-op rather than
 * throwing, so the page still renders as plain markup.
 */

import { onMounted, onBeforeUnmount, type Ref } from 'vue'

export interface ThreeSceneContext {
  THREE: typeof import('three')
  scene: import('three').Scene
  camera: import('three').PerspectiveCamera
  renderer: import('three').WebGLRenderer
  /** Smoothed pointer position, roughly [-1, 1] on each axis. */
  pointer: { x: number; y: number }
  /** 0 while the host fills the viewport, 1 once it has scrolled past. */
  scroll: { progress: number }
  size: { width: number; height: number }
  /** True when the visitor asked for reduced motion. */
  reduced: boolean
}

export interface ThreeSceneHandle {
  update?: (elapsed: number, delta: number) => void
  /** Only for resources the automatic scene traversal cannot reach. */
  dispose?: () => void
}

export interface BloomOptions {
  intensity?: number
  threshold?: number
  smoothing?: number
}

export interface ThreeSceneOptions {
  cameraZ?: number
  fov?: number
  bloom?: false | BloomOptions
  build: (ctx: ThreeSceneContext) => ThreeSceneHandle | Promise<ThreeSceneHandle>
}

export function useThreeScene(
  canvasRef: Ref<HTMLCanvasElement | null>,
  wrapRef: Ref<HTMLElement | null>,
  options: ThreeSceneOptions,
) {
  const { cameraZ = 8, fov = 45, bloom = { }, build } = options

  let teardown: (() => void) | null = null

  onMounted(async () => {
    const canvas = canvasRef.value
    const wrap = wrapRef.value
    if (!canvas || !wrap) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const THREE = await import('three')

    let renderer: import('three').WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        stencil: false,
        // EffectComposer manages its own buffers.
        depth: false,
        powerPreference: 'high-performance',
      })
    } catch {
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(wrap.clientWidth || 1, wrap.clientHeight || 1, false)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      fov,
      (wrap.clientWidth || 1) / (wrap.clientHeight || 1),
      0.1,
      120,
    )
    camera.position.set(0, 0, cameraZ)

    const ctx: ThreeSceneContext = {
      THREE,
      scene,
      camera,
      renderer,
      pointer: { x: 0, y: 0 },
      scroll: { progress: 0 },
      size: { width: wrap.clientWidth, height: wrap.clientHeight },
      reduced,
    }

    const handle = await build(ctx)

    // ── Optional bloom ──
    let composer: import('postprocessing').EffectComposer | null = null
    if (bloom !== false) {
      const { EffectComposer, EffectPass, RenderPass, BloomEffect, KernelSize } =
        await import('postprocessing')
      composer = new EffectComposer(renderer)
      composer.addPass(new RenderPass(scene, camera))
      composer.addPass(
        new EffectPass(
          camera,
          new BloomEffect({
            intensity: bloom.intensity ?? 1.6,
            luminanceThreshold: bloom.threshold ?? 0.2,
            luminanceSmoothing: bloom.smoothing ?? 0.5,
            kernelSize: KernelSize.LARGE,
            mipmapBlur: true,
          }),
        ),
      )
      composer.setSize(wrap.clientWidth, wrap.clientHeight)
    }

    // ── Pointer ──
    const target = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    if (!reduced) window.addEventListener('pointermove', onPointerMove, { passive: true })

    // ── Resize ──
    const resize = () => {
      const w = wrap.clientWidth
      const h = wrap.clientHeight
      if (!w || !h) return
      ctx.size.width = w
      ctx.size.height = h
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
      composer?.setSize(w, h)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    // ── Visibility ──
    let visible = true
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry?.isIntersecting ?? true },
      { threshold: 0 },
    )
    io.observe(wrap)

    // ── Loop ──
    const clock = new THREE.Clock()
    let raf = 0

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return

      const delta = Math.min(clock.getDelta(), 0.1)
      const elapsed = clock.getElapsedTime()

      if (!reduced) {
        // Critically-damped-ish easing keeps pointer motion smooth without
        // depending on frame rate.
        const ease = 1 - Math.pow(0.001, delta)
        ctx.pointer.x += (target.x - ctx.pointer.x) * ease
        ctx.pointer.y += (target.y - ctx.pointer.y) * ease
      }

      const rect = wrap.getBoundingClientRect()
      const span = rect.height + window.innerHeight
      ctx.scroll.progress = span > 0
        ? Math.min(1, Math.max(0, (window.innerHeight - rect.top) / span))
        : 0

      handle?.update?.(elapsed, delta)

      if (composer) composer.render()
      else renderer.render(scene, camera)
    }
    tick()

    teardown = () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      handle?.dispose?.()
      composer?.dispose()

      // Geometries and materials are not garbage collected — they hold GPU
      // allocations that must be released explicitly.
      scene.traverse((obj) => {
        const mesh = obj as import('three').Mesh
        mesh.geometry?.dispose?.()
        const material = mesh.material
        if (Array.isArray(material)) material.forEach(m => m?.dispose?.())
        else material?.dispose?.()
      })

      renderer.dispose()
    }
  })

  onBeforeUnmount(() => {
    teardown?.()
    teardown = null
  })
}
