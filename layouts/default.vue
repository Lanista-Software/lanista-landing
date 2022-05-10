<template>
  <div class="main">
    <div class="lanista-container">
      <Header />
    </div>
    <div class="page-content pt-24"><nuxt /></div>
    <div class="lanista-container pb-2 pt-20">
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
