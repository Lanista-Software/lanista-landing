<template>
  <!-- Kartın görünme animasyonu için Tailwind sınıfları ile optimizasyon -->
  <div ref="observerTarget" class="transition-opacity opacity-0 duration-1000 ease-in-out">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const observerTarget = ref<HTMLDivElement | null>(null);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && observerTarget.value) {
          // Kartın görünmesini sağlayan animasyon
          observerTarget.value.classList.remove('opacity-0');
          observerTarget.value.classList.add('opacity-100');

          // Observer'ı durdur
          observer?.unobserve(observerTarget.value);
        }
      });
    },
    {
      threshold: 0.5, // Elemanın %50'si görünür olduğunda tetiklenecek
    }
  );

  if (observerTarget.value) {
    observer.observe(observerTarget.value);
  }
});

onBeforeUnmount(() => {
  // Component unmount olduğunda observer'ı temizle
  if (observer && observerTarget.value) {
    observer.unobserve(observerTarget.value);
    observer.disconnect();
  }
});
</script>
