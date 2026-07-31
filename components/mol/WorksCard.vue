<script setup lang="ts">
import useScrollLock from '~/composables/scrollLock'

defineProps<{
  item: WorksCardProps
}>()
const { lockScroll } = useScrollLock()
const proxy = useScriptGoogleAnalytics()
const localePath = useLocalePath()
export interface WorksCardProps {
  ID?: string
  createdAt?: string
  updatedAt?: string
  title: string
  image?: string
  description?: string
  category?: string
  link?: string
  slug?: string
  status?: string
  scheduled?: boolean
  order?: number
}
function handleClick() {
  lockScroll()
  proxy.dataLayer.push({ event: 'button_clicked', button_name: 'see_live_project' })
}
</script>

<template>
  <MolCardAnimation>
    <div
      class="space-y-6 rounded-2xl border border-border-color p-6 shadow-sm lg:flex lg:items-center lg:justify-between lg:space-x-12 lg:p-12 2xl:p-20"
    >
      <div class="space-y-4 lg:w-8/12">
        <LuiTag color="primary" filter="lighten" size="xl" rounded="full">
          {{
            item.category
          }}
        </LuiTag>
        <h2 class="font-space text-xl font-bold text-heading-text">
          {{ item.title }}
        </h2>
        <p class="text-body mt-2 font-inter font-normal">
          {{ item.description }}
        </p>
        <div class="flex flex-wrap items-center gap-3 pt-2">
          <NuxtLink v-if="item.slug" :to="localePath(`/works/${item.slug}`)">
            <LuiButton color="primary" rounded filter="darken">
              {{ $i18n.locale === 'tr' ? 'Vaka çalışması' : 'View case study' }}
              <template #append>
                <i class="ri-arrow-right-line" />
              </template>
            </LuiButton>
          </NuxtLink>
          <NuxtLink v-if="item.link" :to="item.link" target="_blank" rel="noopener noreferrer">
            <LuiButton
              color="secondary"
              variant="outline"
              rounded
              filter="darken"
              @click="handleClick"
            >
              {{ $i18n.locale === 'tr' ? 'Canlı site' : 'Live site' }}
              <template #append>
                <i class="ri-arrow-right-up-line" />
              </template>
            </LuiButton>
          </NuxtLink>
        </div>
      </div>
      <div
        v-if="item.image"
        class="h-auto w-full overflow-hidden p-4"
      >
        <NuxtImg
          class="aspect-[2/1] size-full object-cover"
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
