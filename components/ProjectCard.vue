<template>
  <div
    class="lanista-container__small flex md:flex-row flex-col bg-primary rounded-md justify-between items-center py-4"
  >
    <div class="text-side flex flex-col justify-center">
      <div class="pb-6">
        <lui-chip
          rounded
          size="md"
          class="bg-chip justify-center items-center text-secondary"
          >{{ subtitle }}</lui-chip
        >
      </div>
      <lui-heading
        size="2xs"
        display
        level="3"
        class="text-white font-semibold md:w-4/5"
      >
        {{ title }}
      </lui-heading>
      <lui-text class="text-heading md:w-1/2 py-8">
        {{ description }}
      </lui-text>
      <div>
        <lui-button rounded variant="secondary" type="outline"
          >{{ buttonLabel }}
        </lui-button>
      </div>
    </div>
    <div class="image-side md:py-24 pt-8">
      <nuxt-img :src="imgSrc" :alt="imgAlt"></nuxt-img>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    subtitle: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    imgSrc: {
      type: String,
      default: '/images/comingsoon.png',
    },
    imgAlt: {
      type: String,
      default: 'lanista project',
    },
    buttonLabel: {
      type: String,
      default: 'See live project',
    },
  },
}
</script>

<style scoped>
.lanista-container__small {
  @apply container mx-auto md:px-28 px-4;
}
</style>
