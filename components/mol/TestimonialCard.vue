<script setup lang="ts">
export type TestimonialCardProps = {
  ID: string
  createdAt: string
  updatedAt: string
  name: string
  title: string
  description: string
  status: string
  scheduled: boolean
  image: string
}
defineProps<{
  item: TestimonialCardProps
}>()
</script>

<template>
  <MolCardAnimation>
    <div class="w-full p-6">
      <div class="flex items-center space-x-4">
        <div>
          <NuxtImg
            class="block size-16 rounded-full border border-solid border-transparent object-contain"
            :src="getStaticImagePath(item.image)" :alt="getImageAlt(item.image)" width="80" height="80"
            loading="lazy" sizes="xs:30vw sm:20vw md:10vw"
          />
        </div>
        <div>
          <h3 class="font-space text-lg font-semibold text-heading-text">
            {{ item.name }}
          </h3>
          <p class="mt-1 font-normal text-body-text">
            {{ item.title }}
          </p>
        </div>
      </div>
      <div class="pt-6">
        <p class="font-space font-medium text-heading-text">
          {{ item.description }}
        </p>
      </div>
    </div>
  </MolCardAnimation>
</template>

<style scoped></style>
