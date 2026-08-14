<template>
  <div ref="wrapRef" class="tech-orb" aria-hidden="true">
    <canvas ref="canvasRef" class="tech-orb__canvas" />
  </div>
</template>

<script setup lang="ts">
/**
 * TechOrb — a constellation sphere for the stack page.
 *
 * Nodes sit on a sphere via a Fibonacci distribution, and every pair closer
 * than a threshold gets an edge. The result reads as a network rather than a
 * ball of dots, which suits a page about connected tooling.
 *
 * Edges are built once into a single LineSegments buffer; drawing each edge as
 * its own object would mean hundreds of draw calls a frame.
 */
import { ref } from 'vue'
import { useThreeScene } from '~/composables/useThreeScene'

const props = withDefaults(defineProps<{ nodes?: number; radius?: number }>(), {
  nodes: 70,
  radius: 2.6,
})

const wrapRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const ACCENT = 0xd4ff3f

useThreeScene(canvasRef, wrapRef, {
  cameraZ: 8,
  fov: 50,
  bloom: { intensity: 1.5, threshold: 0.2, smoothing: 0.5 },
  build: ({ THREE, scene, reduced, pointer, scroll }) => {
    const rig = new THREE.Group()
    scene.add(rig)

    const N = props.nodes
    const R = props.radius

    // Fibonacci sphere — even coverage without the pole clustering that
    // naive lat/long sampling produces.
    const nodes: import('three').Vector3[] = []
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = golden * i
      nodes.push(new THREE.Vector3(Math.cos(theta) * r * R, y * R, Math.sin(theta) * r * R))
    }

    // ── Nodes ──
    const nodePositions = new Float32Array(N * 3)
    nodes.forEach((v, i) => {
      nodePositions[i * 3] = v.x
      nodePositions[i * 3 + 1] = v.y
      nodePositions[i * 3 + 2] = v.z
    })
    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3))

    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = 64
    const sctx = sprite.getContext('2d')!
    const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.35, 'rgba(255,255,255,0.7)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    sctx.fillStyle = grad
    sctx.fillRect(0, 0, 64, 64)
    const tex = new THREE.CanvasTexture(sprite)

    const nodeMat = new THREE.PointsMaterial({
      color: ACCENT,
      size: 0.14,
      map: tex,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    rig.add(new THREE.Points(nodeGeo, nodeMat))

    // ── Edges ──
    const threshold = R * 0.62
    const edgePoints: number[] = []
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        if (nodes[i]!.distanceTo(nodes[j]!) < threshold) {
          edgePoints.push(
            nodes[i]!.x, nodes[i]!.y, nodes[i]!.z,
            nodes[j]!.x, nodes[j]!.y, nodes[j]!.z,
          )
        }
      }
    }
    const edgeGeo = new THREE.BufferGeometry()
    edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePoints, 3))
    const edgeMat = new THREE.LineBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.2,
    })
    rig.add(new THREE.LineSegments(edgeGeo, edgeMat))

    // ── Inner shell, for a sense of solidity ──
    const shellGeo = new THREE.IcosahedronGeometry(R * 0.82, 2)
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x0a0a0a,
      transparent: true,
      opacity: 0.72,
    })
    rig.add(new THREE.Mesh(shellGeo, shellMat))

    return {
      update(t) {
        if (reduced) return
        rig.rotation.y = t * 0.13 + pointer.x * 0.5
        rig.rotation.x = Math.sin(t * 0.19) * 0.16 + pointer.y * 0.3
        // Edges fade in and out so the network feels like it is transmitting.
        edgeMat.opacity = 0.13 + (Math.sin(t * 0.9) * 0.5 + 0.5) * 0.14
        rig.scale.setScalar(1 + Math.sin(t * 0.7) * 0.02 - scroll.progress * 0.12)
      },
      dispose() {
        tex.dispose()
      },
    }
  },
})
</script>

<style scoped>
.tech-orb {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.tech-orb__canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
