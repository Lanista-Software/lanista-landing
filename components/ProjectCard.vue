<template>
  <div
    class="lanista-container__small flex lg:flex-row flex-col bg-primary rounded-lg justify-between items-center py-4"
  >
    <div class="text-side flex flex-col justify-center lg:w-1/2">
      <div class="pb-6">
        <lui-chip
          rounded
          size="lg"
          class="bg-chip justify-center items-center text-secondary"
          >{{ subtitle }}</lui-chip
        >
      </div>
      <lui-heading
        size="2xs"
        display
        level="3"
        class="text-white font-semibold"
      >
        {{ title }}
      </lui-heading>
      <lui-text class="text-heading py-8">
        {{ description }}
      </lui-text>
      <div>
        <lui-button
          rounded
          variant="secondary"
          type="outline"
          :icon="buttonIcon"
          >{{ buttonLabel }}
        </lui-button>
      </div>
    </div>
    <div class="image-side lg:py-24 pt-8">
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
    buttonIcon: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.lanista-container__small {
  @apply container mx-auto lg:px-28 px-4;
}
</style>
