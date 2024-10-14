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
}>();
</script>
<template>
  <MolCardAnimation>
    <div class="border border-border-color p-6 rounded-2xl shadow-sm">
      <div
        v-if="item.image"
        class="rounded-3xl overflow-hidden h-auto md:h-[459px] lg:h-auto"
      >
        <NuxtImg
          v-if="square"
          loading="lazy"
          class="w-full h-full object-cover rounded-xl aspect-square md:aspect-auto lg:aspect-square"
          :src="getStaticImagePath(item.image)"
          :alt="getImageAlt(item.image)"
          placeholder
          sizes="xs:100vw sm:50vw md:33vw"
          width="442"
          height="442"
        />
        <NuxtImg
          v-else
          loading="lazy"
          class="w-full h-full object-cover rounded-xl aspect-square md:aspect-auto lg:aspect-[2/1]"
          :src="getStaticImagePath(item.image)"
          :alt="getImageAlt(item.image)"
          placeholder
          sizes="xs:100vw sm:50vw md:33vw"
          width="704"
          height="352"
        />
      </div>
      <div v-else-if="item.icon" class="">
        <LuiAvatar filter="lighten" color="success" size="xl" rounded="full">
          <template #icon>
            <i :class="item.icon"></i>
          </template>
        </LuiAvatar>
      </div>

      <h2 class="text-xl font-bold font-space mt-8 text-heading-text">
        {{ item.title }}
      </h2>
      <p class="text-body font-normal font-inter mt-2">
        {{ item.description }}
      </p>
    </div>
  </MolCardAnimation>
</template>
