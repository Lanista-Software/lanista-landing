<script setup lang="ts">
import { LuiAvatar } from "@lui-ui/lui-vue";

export type TestimonialCardProps = {
  ID: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  title: string;
  description: string;
  status: string;
  scheduled: boolean;
  image: string;
};
defineProps<{
  item: TestimonialCardProps;
}>();
</script>

<template>
  <MolCardAnimation>
    <div class="p-6 w-full">
      <div class="flex items-center space-x-4">
        <div>
          <LuiAvatar
            :src="getStaticImagePath(item.image)"
            size="xl"
            rounded="full"
            :alt="getImageAlt(item.image)"
          />
        </div>
        <div>
          <h6 class="text-lg font-semibold font-space text-heading-text">
            {{ item.name }}
          </h6>
          <p class="mt-1 text-body-text font-normal">{{ item.title }}</p>
        </div>
      </div>
      <div class="pt-6">
        <p class="font-medium font-space text-heading-text">
          {{ item.description }}
        </p>
      </div>
    </div>
  </MolCardAnimation>
</template>

<style scoped></style>
