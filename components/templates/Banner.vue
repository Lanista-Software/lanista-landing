<script setup lang="ts">
import useScrollLock from '~/composables/scrollLock'

export type BannerProps = {
  title: string
  description: string
  buttonLabel: string
  buttonLink: string
}
const props = defineProps<BannerProps>()
const { lockScroll } = useScrollLock()
const proxy = useScriptGoogleAnalytics()
function handleClick() {
  proxy.dataLayer.push({ event: 'button_clicked', button_name: props.buttonLink })
  lockScroll()
}
</script>

<template>
  <div class="rounded-3xl bg-custom-gradient">
    <div
      class="bg-image size-full space-y-6 rounded-3xl p-12 md:flex md:items-center md:justify-evenly md:space-x-6 md:p-24 2xl:p-32"
    >
      <div class="w-full md:w-1/2">
        <h2 class="font-space text-4xl font-semibold text-white">
          {{ title }}
        </h2>
        <p class="mt-2 font-inter text-lg font-normal text-secondary-200">
          {{ description }}
        </p>
      </div>
      <div class="w-full md:flex md:w-1/2 md:items-center md:justify-end">
        <NuxtLink :to="buttonLink">
          <LuiButton color="danger" rounded="full" size="lg" tag="div" @click="handleClick">
            {{ buttonLabel }}
            <template #append>
              <i class="ri-arrow-right-up-line" />
            </template>
          </LuiButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-image {
  background-image: url("/images/banner-bg.png");
  background-size: cover;
  background-position: center;
}
</style>
