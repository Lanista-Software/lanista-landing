<script setup lang="ts">
import useScrollLock from './composables/scrollLock';

const route = useRoute();
const router = useRouter();
const { isScrollLocked } = useScrollLock();
function handleSectionViewed(id: string) {
  const routeHash = route.hash;
  const idWithHash = `#${id}`;
  if (routeHash !== idWithHash && !isScrollLocked.value) {
    router.push({ hash: idWithHash });
  }
}
let intersectionObserver: IntersectionObserver | null = null;
const home = ref(null);
onMounted(() => {
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) handleSectionViewed('home');
    },
    { threshold: 0.3 } // Observe when 50% of the element is visible
  );

  if (home.value) {
    intersectionObserver.observe(home.value);
  } else {
    watch(home, (el) => {
      if (el && intersectionObserver) intersectionObserver.observe(el);
    });
  }
});

onBeforeUnmount(() => {
  if (intersectionObserver) intersectionObserver.disconnect();
});
</script>

<template>
  <div>
    <div ref="home" id="home"></div>
    <MolAppHeader />
    <main class="min-h-screen">
      <NuxtPage />
    </main>
    <MolAppFooter />
  </div>
</template>
<style lang="postcss">
html {
  scroll-behavior: smooth;
  @apply font-inter text-body-text text-[14px] lg:text-[16px];
}

body {
  @apply bg-white text-body-text;
}
</style>
