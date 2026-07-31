<script setup lang="ts">
export interface AppCardProps {
  title: string
  description: string
  image?: string
  icon?: string
  link?: string
  status: string
  scheduled: boolean
  createdAt: string
  updatedAt: string
}
defineProps<{
  item: AppCardProps
  square?: boolean
  view?: 'grid' | 'single' | 'triple'
  closePadding?: boolean
}>()
</script>

<template>
  <MolCardAnimation>
    <component :is="item.link ? 'NuxtLink' : 'div'" :to="item.link || undefined" class="block">
      <div
        class="overflow-hidden rounded-2xl border border-border-color shadow-sm"
        :class="[view && view === 'triple' ? 'md:justify-between lg:flex lg:h-72 lg:flex-col xl:h-64' : '', closePadding ? 'p-0' : 'p-6', item.link ? 'cursor-pointer transition-shadow hover:shadow-md' : '']"
      >
        <div v-if="item.image" class="h-auto overflow-hidden md:h-[459px] lg:h-auto">
          <NuxtImg
            v-if="square" loading="lazy"
            class="aspect-square size-full object-contain md:aspect-auto lg:aspect-square"
            :src="getStaticImagePath(item.image)" :alt="getImageAlt(item.image)" placeholder
            sizes="xs:100vw sm:50vw md:33vw" width="442" height="442"
          />
          <NuxtImg
            v-else loading="lazy"
            class="size-full object-contain md:aspect-auto lg:aspect-[2/1]"
            :src="getStaticImagePath(item.image)" :alt="getImageAlt(item.image)" placeholder
            sizes="xs:100vw sm:50vw md:33vw" width="704" height="352"
          />
        </div>
        <div v-else-if="item.icon" class="">
          <LuiAvatar filter="lighten" color="success" size="xl" rounded="full">
            <template #icon>
              <i :class="item.icon"></i>
            </template>
          </LuiAvatar>
        </div>
        <div :class="closePadding ? 'px-6 pb-6' : 'p-0'">
          <h2 class="font-space text-xl font-bold text-heading-text" :class="view && view === 'triple' ? 'mt-8 lg:mt-0' : 'mt-8'">
            {{ item.title }}
          </h2>
          <p class="text-body mt-2 font-inter font-normal">
            {{ item.description }}
          </p>
          <span v-if="item.link" class="mt-3 inline-flex items-center text-sm font-medium text-primary-600">
            {{ $i18n.locale === 'tr' ? 'Detaylı bilgi' : 'Learn more' }}
            <i class="ri-arrow-right-line ml-1" />
          </span>
        </div>
      </div>
    </component>
  </MolCardAnimation>
</template>
