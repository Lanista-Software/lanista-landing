<script setup lang="ts">
export interface AppCardProps {
  title: string;
  description: string;
  image?: string;
  icon?: string;
  status: string;
  scheduled: boolean;
  createdAt: string;
  updatedAt: string;
}
defineProps<{
  item: AppCardProps;
  square?: boolean;
  view?: "grid" | "single" | "triple";
  closePadding?: boolean;
}>();

</script>
<template>
  <MolCardAnimation>
    <div class="border border-border-color rounded-2xl shadow-sm overflow-hidden" 
    :class="[view && view === 'triple' ? 'lg:h-72 xl:h-64 lg:flex lg:flex-col md:justify-between' : '', closePadding ? 'p-0' : 'p-6']"
    >
      <div v-if="item.image" class="overflow-hidden h-auto md:h-[459px] lg:h-auto bg-red-300">
        <NuxtImg v-if="square" loading="lazy"
          class="w-full h-full object-cover aspect-square md:aspect-auto lg:aspect-square"
          :src="getStaticImagePath(item.image)" :alt="getImageAlt(item.image)" placeholder
          sizes="xs:100vw sm:50vw md:33vw" width="442" height="442" />
        <NuxtImg v-else loading="lazy"
          class="w-full h-full object-cover aspect-square md:aspect-auto lg:aspect-[2/1]"
          :src="getStaticImagePath(item.image)" :alt="getImageAlt(item.image)" placeholder
          sizes="xs:100vw sm:50vw md:33vw" width="704" height="352" />
      </div>
      <div v-else-if="item.icon" class="">
        <LuiAvatar filter="lighten" color="success" size="xl" rounded="full">
          <template #icon>
            <i :class="item.icon"></i>
          </template>
        </LuiAvatar>
      </div>
      <div :class="closePadding ? 'px-6 pb-6' : 'p-0'">
        <h2 class="text-xl font-bold font-space text-heading-text" :class="view && view === 'triple' ? 'mt-8 lg:mt-0' : 'mt-8'">
          {{ item.title }}
        </h2>
        <p class="text-body font-normal font-inter mt-2">
          {{ item.description }}
        </p>
      </div>
    </div>
  </MolCardAnimation>
</template>
