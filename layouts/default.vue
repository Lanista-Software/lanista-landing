<template>
  <div class="main pt-[98px]">
    <div class="lanista-container">
      <Header />
    </div>
    <div class="page-content mb-auto"><nuxt /></div>
    <div class="lanista-container pb-2 pt-20 w-full">
      <Footer />
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="postcss">
.lanista-container {
  @apply container mx-auto px-4;
}
</style>
