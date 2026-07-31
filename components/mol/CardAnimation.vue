<script setup lang="ts">
const observerTarget = ref<HTMLDivElement | null>(null)
const revealed = ref(false)
let observer: IntersectionObserver | null = null

function reveal() {
  revealed.value = true
  if (observer && observerTarget.value)
    observer.unobserve(observerTarget.value)
}

onMounted(() => {
  // No animation for users who asked for less motion, and no observer at all if
  // the browser lacks IntersectionObserver — the content must never stay at
  // opacity-0 just because the reveal never fired.
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealed.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting)
          reveal()
      }
    },
    {
      // threshold 0 + a small bottom inset: a ratio-based threshold (was 0.5) is
      // unreachable for a card that only ever straddles the viewport edge — after
      // a client-side navigation restores scroll, those cards stayed invisible.
      threshold: 0,
      rootMargin: '0px 0px -80px 0px',
    },
  )

  if (observerTarget.value)
    observer.observe(observerTarget.value)
})

onBeforeUnmount(() => {
  // Component unmount olduğunda observer'ı temizle
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <!-- Kartın görünme animasyonu için Tailwind sınıfları ile optimizasyon -->
  <div
    ref="observerTarget"
    class="transition-opacity duration-1000 ease-in-out"
    :class="revealed ? 'opacity-100' : 'opacity-0'"
  >
    <slot></slot>
  </div>
</template>
