<template>
  <div class="home">
    <section id="hero" class="pb-32">
      <div class="lanista-container__index content h-auto">
        <div class="py-16">
          <lui-chip
            rounded
            size="md"
            class="bg-chip justify-center items-center text-secondary"
            >Think , create, develop!</lui-chip
          >
          <h1 class="text-white font-semibold text-7xl w-4/5 pt-6">
            We create high quality dijital products for everyone.
          </h1>
          <p class="text-heading w-1/2 py-8">
            We help companies and startups make their products better every day.
            So we create high quality digital products for a professional look.
          </p>
          <lui-button rounded variant="secondary">Start a project</lui-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
<style scoped>
.lanista-container__index {
  @apply container mx-auto px-8;
}
.content {
  background-image: url('/images/hero.png');
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
}
</style>
