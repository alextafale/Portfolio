<template>
  <div ref="wrapRef" class="particle-field" aria-hidden="true">
    <canvas ref="canvasRef" class="particle-field__canvas" />
  </div>
</template>

<script setup lang="ts">
/**
 * ParticleField — ambient drifting dust used as a page backdrop.
 *
 * Deliberately quiet: it exists to give the flat black some depth, not to draw
 * attention. Particles drift on their own, part away from the cursor, and
 * settle back when it leaves.
 */
import { ref } from 'vue'
import { useThreeScene } from '~/composables/useThreeScene'

const props = withDefaults(defineProps<{
  count?: number
  color?: number
  /** How far the cursor pushes particles aside, in world units. */
  repel?: number
}>(), {
  count: 300,
  color: 0xd4ff3f,
  repel: 1.4,
})

const wrapRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

useThreeScene(canvasRef, wrapRef, {
  cameraZ: 10,
  fov: 55,
  bloom: { intensity: 1.1, threshold: 0.25, smoothing: 0.6 },
  build: ({ THREE, scene, reduced, pointer, scroll }) => {
    const count = props.count

    const home = new Float32Array(count * 3)
    const drift = new Float32Array(count)
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 22
      const y = (Math.random() - 0.5) * 14
      const z = (Math.random() - 0.5) * 8 - 2
      home[i * 3] = x
      home[i * 3 + 1] = y
      home[i * 3 + 2] = z
      drift[i] = Math.random() * Math.PI * 2
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = 64
    const sctx = sprite.getContext('2d')!
    const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.45, 'rgba(255,255,255,0.5)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    sctx.fillStyle = grad
    sctx.fillRect(0, 0, 64, 64)
    const tex = new THREE.CanvasTexture(sprite)

    const mat = new THREE.PointsMaterial({
      color: props.color,
      size: 0.085,
      map: tex,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    const attr = geo.attributes.position!
    const arr = attr.array as Float32Array

    return {
      update(t) {
        if (reduced) return

        // Cursor position mapped into the same world space the particles live
        // in, so the repulsion radius is meaningful.
        const cx = pointer.x * 11
        const cy = -pointer.y * 7

        for (let i = 0; i < count; i++) {
          const ix = i * 3
          const hx = home[ix]!
          const hy = home[ix + 1]!
          const hz = home[ix + 2]!

          const bob = Math.sin(t * 0.35 + drift[i]!) * 0.32
          let x = hx + Math.cos(t * 0.22 + drift[i]!) * 0.28
          let y = hy + bob

          const dx = x - cx
          const dy = y - cy
          const dist2 = dx * dx + dy * dy
          if (dist2 < 9) {
            // Falls off with distance so the edge of the effect is not a
            // visible circle.
            const push = (1 - dist2 / 9) * props.repel
            const d = Math.sqrt(dist2) || 1
            x += (dx / d) * push
            y += (dy / d) * push
          }

          arr[ix] = x
          arr[ix + 1] = y
          arr[ix + 2] = hz
        }
        attr.needsUpdate = true

        // A slow counter-drift as the page scrolls gives a parallax read.
        points.rotation.z = scroll.progress * 0.25
        points.position.y = scroll.progress * 2.2
      },
      dispose() {
        tex.dispose()
      },
    }
  },
})
</script>

<style scoped>
.particle-field {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.particle-field__canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
