<script setup lang="ts">
</script>

<template>
  <div>
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
