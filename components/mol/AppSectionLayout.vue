<script setup lang="ts">
export interface AppSectionLayoutProps {
  title: string;
  description: string;
  disableButton?: boolean;
}
defineProps<AppSectionLayoutProps>();
</script>
<template>
  <div class="w-full">
    <div class="lg:flex lg:justify-between lg:space-x-8 w-full pb-16">
      <h2 class="text-3xl font-semibold font-space text-heading-text mb-4 lg:w-1/2">
        {{ title }}
      </h2>
      <p class="text-lg text-body-text lg:w-1/2">
        {{ description }}
      </p>
    </div>
    <slot></slot>
    <div v-if="!disableButton" class="pt-16 flex items-center justify-center">
      <slot name="button-slot"> </slot>
    </div>
  </div>
</template>
