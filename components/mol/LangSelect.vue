<script setup lang="ts">
defineProps<{ activeLang: string }>()
const emit = defineEmits(['languageSelected'])
// Real <a href> per locale: this is the only crawlable path from the EN tree to
// the TR tree. With a JS-only switcher Google discovered /tr/* from the sitemap
// but never crawled any of it.
const switchLocalePath = useSwitchLocalePath()
function selectLanguage(lang: string) {
  emit('languageSelected', lang)
}
</script>

<template>
  <div class="flex space-x-4">
    <AtomsLangSelectButton
      value="tr"
      :to="switchLocalePath('tr')"
      :is-selected="activeLang === 'tr'"
      @select="selectLanguage('tr')"
    />
    <AtomsLangSelectButton
      value="en"
      :to="switchLocalePath('en')"
      :is-selected="activeLang === 'en'"
      @select="selectLanguage('en')"
    />
  </div>
</template>
