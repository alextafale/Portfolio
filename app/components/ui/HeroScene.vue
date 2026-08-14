<template>
  <div ref="wrapRef" class="hero-scene" aria-hidden="true">
    <canvas ref="canvasRef" class="hero-scene__canvas" />
    <div class="hero-scene__vignette" />
  </div>
</template>

<script setup lang="ts">
/**
 * HeroScene — the home page's hero object.
 *
 * A faceted wireframe shell that breathes over an opaque core, wrapped in
 * counter-rotating rings and an orbiting particle field. Scroll dollies the
 * camera back and spins the whole rig; the pointer tilts it. Bloom makes the
 * lime read as emitted light rather than bright lines.
 */
import { ref } from 'vue'
import { useThreeScene } from '~/composables/useThreeScene'

const wrapRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const ACCENT = 0xd4ff3f

useThreeScene(canvasRef, wrapRef, {
  cameraZ: 8.5,
  bloom: { intensity: 1.9, threshold: 0.18, smoothing: 0.55 },
  build: ({ THREE, scene, camera, reduced, pointer, scroll }) => {
    const rig = new THREE.Group()
    scene.add(rig)

    // ── Faceted shell ──
    const wireGeo = new THREE.IcosahedronGeometry(2, 2)
    const wireMat = new THREE.MeshBasicMaterial({
      color: ACCENT,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    })
    const wire = new THREE.Mesh(wireGeo, wireMat)
    rig.add(wire)

    // Keep a pristine copy: displacement is recomputed from the rest pose each
    // frame, otherwise the errors accumulate and the shell inflates away.
    const restPositions = wireGeo.attributes.position!.array.slice() as Float32Array
    const wirePos = wireGeo.attributes.position!

    // ── Opaque core ──
    // Without it the far side of the wireframe shows through and the shape
    // reads flat instead of volumetric.
    const coreGeo = new THREE.IcosahedronGeometry(1.9, 4)
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      roughness: 0.32,
      metalness: 0.92,
      emissive: new THREE.Color(ACCENT),
      emissiveIntensity: 0.04,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    rig.add(core)

    // ── Counter-rotating rings ──
    const rings: import('three').Mesh[] = []
    const ringSpecs = [
      { radius: 2.75, tube: 0.008, tilt: [Math.PI / 2.1, 0, 0], speed: 0.34, opacity: 0.55 },
      { radius: 3.15, tube: 0.006, tilt: [Math.PI / 2.6, Math.PI / 5, 0], speed: -0.23, opacity: 0.4 },
      { radius: 3.55, tube: 0.005, tilt: [Math.PI / 3.4, -Math.PI / 6, 0], speed: 0.16, opacity: 0.28 },
    ]
    for (const spec of ringSpecs) {
      const geo = new THREE.TorusGeometry(spec.radius, spec.tube, 8, 180)
      const mat = new THREE.MeshBasicMaterial({
        color: ACCENT,
        transparent: true,
        opacity: spec.opacity,
      })
      const ring = new THREE.Mesh(geo, mat)
      ring.rotation.set(spec.tilt[0]!, spec.tilt[1]!, spec.tilt[2]!)
      ring.userData.speed = spec.speed
      rings.push(ring)
      rig.add(ring)
    }

    // ── Lights ──
    const rimLight = new THREE.PointLight(ACCENT, 70, 26)
    rimLight.position.set(4, 3, 5)
    scene.add(rimLight)

    const fillLight = new THREE.PointLight(0x4060ff, 28, 26)
    fillLight.position.set(-5, -3, 3)
    scene.add(fillLight)

    scene.add(new THREE.AmbientLight(0xffffff, 0.12))

    // ── Orbiting particles ──
    const COUNT = 520
    const positions = new Float32Array(COUNT * 3)
    const orbits: { radius: number; speed: number; phase: number; y: number }[] = []
    for (let i = 0; i < COUNT; i++) {
      // Rings of orbits rather than a static shell, so the field has motion of
      // its own. The outer radius stays well inside the camera distance —
      // sizeAttenuation would blow up a particle that drifts near the lens.
      const radius = 3.2 + Math.random() * 2.9
      orbits.push({
        radius,
        speed: (0.05 + Math.random() * 0.12) * (Math.random() < 0.5 ? -1 : 1),
        phase: Math.random() * Math.PI * 2,
        y: (Math.random() - 0.5) * 5.2,
      })
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // PointsMaterial draws an untextured quad, so particles render as hard
    // squares without a sprite.
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
      size: 0.075,
      map: dustTex,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    const baseCameraZ = camera.position.z

    return {
      update(t) {
        if (reduced) return

        // Breathing shell: displace each vertex along its own direction using
        // a cheap trig hash, recomputed from the rest pose.
        for (let i = 0; i < wirePos.count; i++) {
          const ix = i * 3
          const x = restPositions[ix]!
          const y = restPositions[ix + 1]!
          const z = restPositions[ix + 2]!
          const wave =
            Math.sin(x * 1.6 + t * 1.1) *
            Math.cos(y * 1.4 - t * 0.9) *
            Math.sin(z * 1.5 + t * 0.7)
          const scale = 1 + wave * 0.055
          wirePos.setXYZ(i, x * scale, y * scale, z * scale)
        }
        wirePos.needsUpdate = true

        // Pointer tilt layered on a constant drift.
        rig.rotation.y = t * 0.16 + pointer.x * 0.4
        rig.rotation.x = Math.sin(t * 0.22) * 0.12 + pointer.y * 0.26
        rig.position.y = Math.sin(t * 0.6) * 0.12

        for (const ring of rings) {
          ring.rotation.z += ring.userData.speed * 0.006
        }

        // Core pulses just enough to feel alive under the bloom pass.
        coreMat.emissiveIntensity = 0.04 + (Math.sin(t * 1.6) * 0.5 + 0.5) * 0.07

        // Particles ride their own orbits.
        const arr = dustGeo.attributes.position!.array as Float32Array
        for (let i = 0; i < COUNT; i++) {
          const o = orbits[i]!
          const angle = o.phase + t * o.speed
          arr[i * 3] = Math.cos(angle) * o.radius
          arr[i * 3 + 1] = o.y + Math.sin(t * 0.4 + o.phase) * 0.35
          arr[i * 3 + 2] = Math.sin(angle) * o.radius
        }
        dustGeo.attributes.position!.needsUpdate = true

        // Scroll pushes the rig away and spins it up as the hero leaves.
        const p = scroll.progress
        camera.position.z = baseCameraZ + p * 5.5
        rig.rotation.z = p * 0.9
        rig.scale.setScalar(1 - p * 0.18)
      },
      dispose() {
        dustTex.dispose()
      },
    }
  },
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

/* Fades the scene into the page. The final stop has to reach the solid page
   background: the holder is narrower than the viewport, so a translucent edge
   leaves the canvas boundary visible as a vertical seam down the page. */
.hero-scene__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 58% 60% at 50% 50%,
    transparent 26%,
    rgba(10, 10, 10, 0.55) 62%,
    rgba(10, 10, 10, 0.92) 86%,
    var(--color-bg) 100%
  );
}
</style>
