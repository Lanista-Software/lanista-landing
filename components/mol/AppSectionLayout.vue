<script setup lang="ts">
export interface AppSectionLayoutProps {
  title: string
  description: string
  disableButton?: boolean
}
defineProps<AppSectionLayoutProps>()
</script>

<template>
  <div class="w-full">
    <div class="w-full pb-16 lg:flex lg:justify-between lg:space-x-8">
      <h2 class="mb-4 font-space text-3xl font-semibold text-heading-text lg:w-1/2">
        {{ title }}
      </h2>
      <p class="text-lg text-body-text lg:w-1/2">
        {{ description }}
      </p>
    </div>
    <slot></slot>
    <div v-if="!disableButton" class="flex items-center justify-center pt-16">
      <slot name="button-slot">
      </slot>
    </div>
  </div>
</template>
