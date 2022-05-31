<template>
  <div class="lanista-container__small">
    <div class="flex lg:flex-row flex-col justify-between">
      <div class="flex flex-col lg:w-1/3">
        <div class="pb-8">
          <lui-avatar
            rounded
            size="md"
            :icon="icon"
            variant="secondary"
            filter="lighter"
          >
          </lui-avatar>
        </div>
        <lui-heading
          level="2"
          display
          size="2xs"
          class="text-white font-semibold lg:pb-20 pb-4"
          >{{ title }}
        </lui-heading>
      </div>
      <div class="flex flex-col lg:pt-24 lg:w-3/5">
        <lui-text class="text-heading pb-8">
          {{ description }}
        </lui-text>
        <div class="lg:pb-16 pb-8">
          <nuxt-link :to="buttonLink">
            <lui-button
              rounded
              size="lg"
              variant="secondary"
              class="flex"
              type="outline"
              :icon="buttonIcon"
              >{{ buttonLabel }}</lui-button
            ></nuxt-link
          >
        </div>
        <div>
          <nuxt-img :src="imgSrc" :alt="imgAlt" class="p-8"></nuxt-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DevCard',
  props: {
    icon: {
      type: String,
      default: 'shape-2',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    buttonLabel: {
      type: String,
      default: 'Strat a project',
    },
    buttonIcon: {
      type: String,
      default: '',
    },
    buttonLink: {
      type: String,
      default: '',
    },
    imgSrc: {
      type: String,
      default: '/images/comingsoon.png',
    },
    imgAlt: {
      type: String,
      default: 'lanista development process',
    },
  },
}
</script>

<style scoped>
.lanista-container__small {
  @apply container mx-auto xl:px-28;
}
</style>
