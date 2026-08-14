<template>
  <div ref="wrapRef" class="wire-terrain" aria-hidden="true">
    <canvas ref="canvasRef" class="wire-terrain__canvas" />
    <div class="wire-terrain__fade" />
  </div>
</template>

<script setup lang="ts">
/**
 * WireTerrain — a wireframe plane rolling toward the viewer.
 *
 * Vertices are displaced by summed sine waves on the CPU. The grid is coarse
 * on purpose: a few hundred vertices is cheap to update every frame, and the
 * low density is what gives it the drafting-blueprint look.
 */
import { ref } from 'vue'
import { useThreeScene } from '~/composables/useThreeScene'

const props = withDefaults(defineProps<{ color?: number; amplitude?: number }>(), {
  color: 0xd4ff3f,
  // Low enough that wave peaks stay clear of the body copy above the band.
  amplitude: 0.42,
})

const wrapRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

useThreeScene(canvasRef, wrapRef, {
  cameraZ: 6,
  fov: 60,
  bloom: { intensity: 1.3, threshold: 0.22, smoothing: 0.55 },
  build: ({ THREE, scene, camera, reduced, pointer }) => {
    const SEG_X = 44
    const SEG_Y = 30

    const geo = new THREE.PlaneGeometry(34, 22, SEG_X, SEG_Y)
    const mat = new THREE.MeshBasicMaterial({
      color: props.color,
      wireframe: true,
      transparent: true,
      // Deliberately faint: this sits behind body copy, and anything brighter
      // makes the text underneath unreadable.
      opacity: 0.17,
    })

    const mesh = new THREE.Mesh(geo, mat)
    // Laid nearly flat and pushed well below the camera so it reads as ground
    // receding to a horizon rather than a wall behind the text.
    mesh.rotation.x = -Math.PI / 2.12
    mesh.position.y = -3.6
    mesh.position.z = -4
    scene.add(mesh)

    const pos = geo.attributes.position!
    const base = pos.array.slice() as Float32Array

    camera.position.y = 1.1
    camera.lookAt(0, -2.4, -6)

    return {
      update(t) {
        if (reduced) return

        for (let i = 0; i < pos.count; i++) {
          const ix = i * 3
          const x = base[ix]!
          const y = base[ix + 1]!
          // Two waves at different frequencies and directions; a single sine
          // reads as a rigid corrugation rather than terrain.
          const h =
            Math.sin(x * 0.42 + t * 0.85) * 0.62 +
            Math.sin(y * 0.55 - t * 0.6) * 0.42 +
            Math.sin((x + y) * 0.3 + t * 0.4) * 0.3
          pos.setZ(i, h * props.amplitude)
        }
        pos.needsUpdate = true

        // A gentle yaw follows the cursor without ever facing it head-on.
        mesh.rotation.z = pointer.x * 0.06
        mesh.position.x = pointer.x * -0.5
      },
    }
  },
})
</script>

<style scoped>
/* Confined to the lower band of its host: the heading and body copy live in
   the upper half, and a grid behind them destroys their legibility. */
.wire-terrain {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 62%;
  pointer-events: none;
  z-index: 0;
}

.wire-terrain__canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* Dissolves the horizon into the page at the top, and softens the hard cut
   where the host's overflow clips the canvas at the bottom. */
.wire-terrain__fade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to bottom,
      var(--color-bg) 0%,
      rgba(10, 10, 10, 0.84) 30%,
      rgba(10, 10, 10, 0.38) 56%,
      transparent 78%
    ),
    linear-gradient(to top, var(--color-bg) 0%, transparent 22%);
}
</style>
