<template>
  <div class="main pt-[98px]">
    <div class="lanista-container__header pb-14">
      <Header />
    </div>
    <div class="page-content mb-auto"><nuxt /></div>
    <div class="lanista-container pb-2 pt-4 w-full h-16">
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
.lanista-container__header {
  @apply container mx-auto;
}
</style>
