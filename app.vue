<script setup lang="ts">
const { locale, setLocale } = useI18n()

</script>

<template>
  <main>
    <MolAppHeader />
    <div class="min-h-screen">
      <!-- Home Section -->
      <AtomsIntersectionObserver id="home" class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="text-center">
          <h2 class="text-4xl font-bold text-primary-500 mb-4">Home</h2>
          <p>{{ $t('welcome') }}</p>
          <p class="text-lg text-gray-700">Welcome to the homepage!</p>
        </div>
      </AtomsIntersectionObserver>

      <!-- Services Section -->
      <AtomsIntersectionObserver id="services" class="min-h-screen flex items-center justify-center bg-white">
        <div class="text-center">
          <h2 class="text-4xl font-bold text-primary-500 mb-4">Services</h2>
          <p class="text-lg text-gray-700">Discover our services!</p>
        </div>
      </AtomsIntersectionObserver>

      <!-- Process Section -->
      <AtomsIntersectionObserver id="process" class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="text-center">
          <h2 class="text-4xl font-bold text-primary-500 mb-4">Process</h2>
          <p class="text-lg text-gray-700">Learn more about our process!</p>
        </div>
      </AtomsIntersectionObserver>

      <!-- Technologies Section -->
      <AtomsIntersectionObserver id="technologies" class="min-h-screen flex items-center justify-center bg-white">
        <div class="text-center">
          <h2 class="text-4xl font-bold text-primary-500 mb-4">Technologies</h2>
          <p class="text-lg text-gray-700">We use cutting-edge technologies!</p>
        </div>
      </AtomsIntersectionObserver>

      <!-- Works Section -->
      <AtomsIntersectionObserver id="works" class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="text-center">
          <h2 class="text-4xl font-bold text-primary-500 mb-4">Works</h2>
          <p class="text-lg text-gray-700">Check out our works!</p>
        </div>
      </AtomsIntersectionObserver>
    </div>
  </main>
</template>
<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
