<template>
  <div 
    class="phone-mockup-wrapper"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    ref="wrapperRef"
  >
    <div class="phone-mockup" ref="phoneRef">
      <!-- Outer Frame -->
      <div class="phone-frame">
        <!-- Buttons on the side -->
        <div class="phone-button volume-up"></div>
        <div class="phone-button volume-down"></div>
        <div class="phone-button power"></div>
        
        <!-- Screen container -->
        <div class="phone-screen">
          <!-- Dynamic Island / Notch -->
          <div class="phone-notch">
            <div class="camera"></div>
            <div class="speaker"></div>
          </div>
          
          <!-- Image -->
          <img :src="src" :alt="alt" class="phone-image" />
        </div>
      </div>
      <!-- Shadow -->
      <div class="phone-shadow" ref="shadowRef"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'App Screen'
  }
})

const wrapperRef = ref<HTMLElement | null>(null)
const phoneRef = ref<HTMLElement | null>(null)
const shadowRef = ref<HTMLElement | null>(null)

let gsap: typeof import('gsap').gsap | null = null
let floatTween: any = null

onMounted(async () => {
  const gsapModule = await import('gsap')
  gsap = gsapModule.gsap

  // Initial Entrance
  gsap.fromTo(
    wrapperRef.value,
    { opacity: 0, y: 50, scale: 0.9 },
    { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
  )

  // Start continuous floating
  startFloat()
})

onUnmounted(() => {
  if (floatTween) floatTween.kill()
})

const startFloat = () => {
  if (!gsap || !phoneRef.value) return
  
  floatTween = gsap.to(phoneRef.value, {
    y: -15,
    rotationX: 2,
    rotationY: -2,
    duration: 3,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  })

  gsap.to(shadowRef.value, {
    scale: 0.8,
    opacity: 0.3,
    duration: 3,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  })
}

const handleMouseMove = (e: MouseEvent) => {
  if (!wrapperRef.value || !phoneRef.value || !gsap) return

  // Pause float when user interacts
  if (floatTween) floatTween.pause()

  const rect = wrapperRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left // x position within the element
  const y = e.clientY - rect.top  // y position within the element
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2

  // Calculate rotation (max 15 degrees)
  const rotateX = ((y - centerY) / centerY) * -12
  const rotateY = ((x - centerX) / centerX) * 12

  gsap.to(phoneRef.value, {
    rotateX,
    rotateY,
    scale: 1.05,
    duration: 0.5,
    ease: 'power2.out',
    transformPerspective: 1000
  })

  // Move shadow opposite to the phone tilt
  gsap.to(shadowRef.value, {
    x: rotateY * -2,
    y: rotateX * 2,
    scale: 1,
    opacity: 0.6,
    duration: 0.5,
    ease: 'power2.out'
  })
}

const handleMouseLeave = () => {
  if (!phoneRef.value || !gsap) return

  gsap.to(phoneRef.value, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: 0.8,
    ease: 'power3.out',
    onComplete: () => {
      if (floatTween) floatTween.play()
    }
  })

  gsap.to(shadowRef.value, {
    x: 0,
    y: 0,
    opacity: 0.5,
    scale: 0.9,
    duration: 0.8,
    ease: 'power3.out'
  })
}
</script>

<style scoped>
.phone-mockup-wrapper {
  perspective: 1500px;
  display: inline-block;
  padding: 40px;
  cursor: grab;
}

.phone-mockup-wrapper:active {
  cursor: grabbing;
}

.phone-mockup {
  position: relative;
  transform-style: preserve-3d;
  width: 280px;
  height: 570px;
}

/* Base phone body */
.phone-frame {
  position: absolute;
  inset: 0;
  border-radius: 44px;
  background: #111;
  border: 4px solid #2a2a30;
  box-shadow: 
    inset 0 0 4px rgba(255, 255, 255, 0.4),
    0 0 0 8px #0f0f13,
    8px 12px 20px rgba(0, 0, 0, 0.6);
  z-index: 2;
  overflow: hidden;
  transform: translateZ(20px);
}

/* Physical buttons */
.phone-button {
  position: absolute;
  background: #2a2a30;
  border-radius: 4px;
  width: 4px;
}

.volume-up {
  top: 120px;
  left: -10px;
  height: 40px;
}

.volume-down {
  top: 170px;
  left: -10px;
  height: 40px;
}

.power {
  top: 140px;
  right: -10px;
  height: 60px;
}

/* Screen */
.phone-screen {
  position: absolute;
  inset: 6px; /* Inner bezel */
  border-radius: 36px;
  background: #000;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Dynamic Island */
.phone-notch {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 28px;
  background: #000;
  border-radius: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: inset 0px -1px 2px rgba(255, 255, 255, 0.1);
}

.camera {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #111;
  box-shadow: inset 0 0 2px 2px #0a0a20;
}

.speaker {
  width: 40px;
  height: 4px;
  border-radius: 4px;
  background: #1a1a1a;
}

/* Image */
.phone-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  pointer-events: none;
  border-radius: 32px;
}

/* Floor Shadow 3D effect */
.phone-shadow {
  position: absolute;
  bottom: -40px;
  left: 50%;
  width: 220px;
  height: 20px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  filter: blur(20px);
  transform: translateX(-50%) translateZ(-40px);
  z-index: 1;
}

@media (max-width: 640px) {
  .phone-mockup {
    width: 240px;
    height: 480px;
  }
}
</style>
