<script setup lang="ts">
const emit = defineEmits(["languageSelected"]);
defineProps<{ activeLang: string }>();
// Real <a href> per locale: this is the only crawlable path from the EN tree to
// the TR tree. With a JS-only switcher Google discovered /tr/* from the sitemap
// but never crawled any of it.
const switchLocalePath = useSwitchLocalePath();
function selectLanguage(lang: string) {
  emit("languageSelected", lang);
}
</script>
<template>
  <div class="flex space-x-4">
    <AtomsLangSelectButton
      @select="selectLanguage('tr')"
      value="tr"
      :to="switchLocalePath('tr')"
      :is-selected="activeLang === 'tr'"
    />
    <AtomsLangSelectButton
      @select="selectLanguage('en')"
      value="en"
      :to="switchLocalePath('en')"
      :is-selected="activeLang === 'en'"
    />
  </div>
</template>
