<script setup lang="ts">
import useScrollLock from '~/composables/scrollLock';

const { lockScroll } = useScrollLock();
export interface WorksCardProps {
  ID: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  image: string;
  description: string;
  category: string;
  link: string;
  status: string;
  scheduled: boolean;
  order: number;
}
defineProps<{
  item: WorksCardProps;
}>();
</script>
<template>
  <MolCardAnimation>
    <div
      class="border border-border-color rounded-2xl shadow-sm space-y-6 lg:space-x-12 lg:flex lg:justify-between lg:items-center p-6 lg:p-12 2xl:p-20"
    >
      <div class="space-y-4 lg:w-8/12">
        <LuiTag color="primary" filter="lighten" size="xl" rounded="full">{{
          item.category
        }}</LuiTag>
        <h2 class="text-xl font-bold font-space text-heading-text">
          {{ item.title }}
        </h2>
        <p class="text-body font-normal font-inter mt-2">
          {{ item.description }}
        </p>
        <div class="pt-2">
          <NuxtLink :to="item.link">
            <LuiButton
              color="secondary"
              variant="outline"
              rounded
              filter="darken"
              @click="lockScroll"
            >
              See live project
              <template #append>
                <i class="ri-arrow-right-up-line" />
              </template>
            </LuiButton>
          </NuxtLink>
        </div>
      </div>
      <div
        v-if="item.image"
        class="w-full h-auto overflow-hidden p-4"
      >
        <NuxtImg
          class="w-full h-full object-cover aspect-[2/1]"
          :src="getStaticImagePath(item.image)"
          :alt="getImageAlt(item.image)"
          placeholder
          loading="lazy"
          sizes="xs:100vw sm:50vw md:33vw"
        />
      </div>
    </div>
  </MolCardAnimation>
</template>
