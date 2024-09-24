<script setup lang="ts">
const props = defineProps<{
  id: string; // Hash'te güncellenecek ID parametresi
}>();

const observerTarget = ref(null);
const router = useRouter();
let observer: IntersectionObserver | null = null;

// Intersection Observer'ın callback fonksiyonu
const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
    //   const currentHash = window.location.hash;
    //   const newHash = `#${props.id}`;

    //   // Hash'i güncelle, eğer mevcut hash aynı değilse
    //   if (currentHash !== newHash) {
    //     router.replace({ hash: newHash });
    //   }

      // Gözlemlemeyi durdur (bir kere tetiklendikten sonra tekrar tetiklenmesin)
      if (observerTarget.value && observer) {
        observer.unobserve(observerTarget.value);
      }
    }
  });
};

onMounted(() => {
  // Intersection Observer'ı tanımla
  observer = new IntersectionObserver(handleIntersection, {
    threshold: 0, // Eleman sadece görünmeye başladığında tetiklenecek
  });

  if (observerTarget.value) {
    observer.observe(observerTarget.value);
  }
});

onBeforeUnmount(() => {
  // Component unmount olduğunda observer'ı temizle
  if (observer && observerTarget.value) {
    observer.unobserve(observerTarget.value);
  }
});
</script>

<template>
  <section :id="id" ref="observerTarget">
    <AtomsContainer class="py-20 flex items-center justify-center">
      <slot></slot>
    </AtomsContainer>
  </section>
</template>
