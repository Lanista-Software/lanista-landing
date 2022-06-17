<template>
  <div
    class="lanista-container__small flex lg:flex-row flex-col bg-primary rounded-lg justify-between items-center pt-7 lg:pt-0"
  >
    <div
      class="text-side flex flex-col justify-center xl:w-2/5 lg:py-24 lg:pr-12 lg:w-4/5"
    >
      <div class="pb-6">
        <lui-chip
          rounded
          size="lg"
          variant="secondary"
          filter="lighter"
          class="!text-[14px]"
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
      <lui-text class="text-heading py-8" v-html="description"></lui-text>
      <div>
        <lui-button
          rounded
          variant="secondary"
          type="outline"
          :icon="buttonIcon"
          ><a :href="buttonLink" target="_blank">{{ buttonLabel }}</a>
        </lui-button>
      </div>
    </div>
    <div class="image-side xl:py-24 pt-8 pb-4 md:pb-0 xl:pl-24 lg:w-2/3">
      <nuxt-img :src="imgSrc" :alt="imgAlt" provider="static"></nuxt-img>
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
    buttonLink: {
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
