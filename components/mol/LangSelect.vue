<script setup lang="ts">
const emit = defineEmits(["languageSelected"]);
defineProps<{ activeLang: string }>();
function selectLanguage(lang: string) {
  emit("languageSelected", lang);
}
</script>
<template>
  <div class="flex space-x-4">
    <AtomsLangSelectButton
      @select="selectLanguage('tr')"
      value="tr"
      :is-selected="activeLang === 'tr'"
    />
    <AtomsLangSelectButton
      @select="selectLanguage('en')"
      value="en"
      :is-selected="activeLang === 'en'"
    />
  </div>
</template>
