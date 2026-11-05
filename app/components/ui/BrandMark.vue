<template>
  <!-- "AT" monogram: initials set in the mono face inside a ring of
       tick marks, like the dial of a watch. -->
  <svg class="brandmark" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" stroke-opacity="0.14" />
    <g stroke="currentColor" stroke-width="1" stroke-linecap="round">
      <line
        v-for="i in 24"
        :key="i"
        x1="20" y1="2.6" x2="20" :y2="i % 6 === 0 ? 5.4 : 4.2"
        :stroke-opacity="i % 6 === 0 ? 0.9 : 0.35"
        :transform="`rotate(${i * 15} 20 20)`"
      />
    </g>
    <text
      x="20" y="24.4"
      text-anchor="middle"
      font-family="Geist Mono, ui-monospace, monospace"
      font-size="12"
      font-weight="500"
      letter-spacing="-0.6"
      fill="currentColor"
    >AT</text>
  </svg>
</template>

<style scoped>
.brandmark { width: 34px; height: 34px; }
</style>
