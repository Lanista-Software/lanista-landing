<script setup lang="ts">
const { locale, setLocale } = useI18n()

</script>

<template>
  <main>
    <MolAppHeader />
    <section class="p-24">
      <p>{{ $t('welcome') }}</p>
      {{ locale }}
      <MolLangSelect @language-selected="(lang)=> setLocale(lang)" />

    </section>
    <!-- <i class="ri-admin-line text-red-600"></i>
    <AtomsLogo />
    <div class="font-inter text-2xl">
      Bu metin Inter fontuyla yazılmış.
    </div>

    <div class="font-space text-3xl">
      Bu metin Space Grotesk fontuyla yazılmış.
    </div>
    <LuiButton>Click me</LuiButton> -->
  </main>
</template>
