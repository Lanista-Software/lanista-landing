<script setup lang="ts">
import useScrollLock from '~/composables/scrollLock'

defineProps<{
  hero: Record<string, any>
  references: { ID?: string, id?: string, logo: string }[]
}>()

const { lockScroll } = useScrollLock()
const proxy = useScriptGoogleAnalytics()
function handleClick() {
  lockScroll()
  proxy.dataLayer.push({ event: 'button_clicked', button_name: 'hero_button' })
}
</script>

<template>
  <section v-if="hero && hero.title" class="hero-section text-center">
    <div>
      <LuiTag color="secondary" filter="lighten" size="lg" rounded="full">
        {{ hero.subtitle }}
      </LuiTag>
    </div>
    <h1
      class="max-content mt-8 font-space text-4xl font-semibold text-heading-text lg:text-5xl xl:text-6xl"
    >
      {{ hero.title }}
    </h1>
    <p class="max-content mt-6 text-lg font-normal text-body-text md:text-xl">
      {{ hero.description }}
    </p>
    <div class="max-content flex items-center justify-center pt-8">
      <NuxtLink :to="hero.buttonlink">
        <LuiButton rounded="full" color="danger" @click="handleClick">
          {{ hero.buttontext }}
          <template #append>
            <i class="ri-arrow-right-up-line"></i>
          </template>
        </LuiButton>
      </NuxtLink>
    </div>
    <div
      class="mx-auto flex w-full max-w-screen-md flex-wrap items-center justify-evenly gap-4 gap-y-8 pt-14 lg:pt-20"
    >
      <NuxtImg
        v-for="i in references"
        :key="i.ID || i.id"
        :src="getStaticImagePath(i.logo)"
        :alt="getImageAlt(i.logo)"
        class="h-7 w-auto"
        loading="lazy"
        sizes="xs:100vw sm:50vw md:33vw"
        height="30"
        width="100"
      />
    </div>
  </section>
</template>

<style scoped lang="postcss">
.hero-section {
  @apply relative flex flex-col justify-center max-w-screen-lg;
  height: calc(100vh - 15rem);
  /* Tüm aşamalarda tarayıcı yüksekliğinden 15rem çıkart */
  max-height: 1000px;
  /* Maksimum yüksekliği 1000px ile sınırla */
}

/* Büyük ekranlar için (xl ve üstü) */
@media (min-width: 1280px) {
  .hero-section {
    height: 100%;
    padding: 4rem 0;
  }
}
</style>
