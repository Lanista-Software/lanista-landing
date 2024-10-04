<script setup lang="ts">
import sectionData from "../../contentrain/sections/en.json";
import referencesData from "../../contentrain/references/en.json";
const defaultPath = getDefaultPathByFieldName(
  sectionData,
  "name",
  "hero",
  "sections"
);
</script>

<template>
  <section v-if="defaultPath" class="hero-section text-center">
    <div>
      <LuiTag color="secondary" filter="lighten" size="lg" rounded="full">
        {{ $t(`${defaultPath}.subtitle`) }}</LuiTag
      >
    </div>
    <h1
      class="text-heading-text text-4xl lg:text-5xl xl:text-6xl font-space mt-8 max-content font-semibold"
    >
      {{ $t(`${defaultPath}.title`) }}
    </h1>
    <p class="text-body-text font-normal text-lg md:text-xl mt-6 max-content">
      {{ $t(`${defaultPath}.description`) }}
    </p>
    <div class="pt-8 flex items-center justify-center max-content">
      <NuxtLink :to="$t(`${defaultPath}.buttonlink`)">
        <LuiButton rounded="full" color="danger">
          {{ $t(`${defaultPath}.buttontext`) }}
          <template #append>
            <i class="ri-arrow-right-up-line"></i>
          </template>
        </LuiButton>
      </NuxtLink>
    </div>
    <div
      class="flex items-center justify-evenly pt-14 lg:pt-20 flex-wrap gap-4 max-w-screen-md mx-auto w-full"
    >
      <NuxtImg
        v-for="i in referencesData"
        :key="i.ID"
        :src="getStaticImagePath(i.logo)"
        :alt="getImageAlt(i.logo)"
        class="w-auto h-7"
        loading="lazy"
        sizes="xs:100vw sm:50vw md:33vw"
        format="webp"
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
