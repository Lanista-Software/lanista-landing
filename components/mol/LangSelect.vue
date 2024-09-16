<script setup lang="ts">
const emit = defineEmits(['languageSelected']);
const selectedLanguage = ref('tr');
function selectLanguage(lang: string) {
    selectedLanguage.value = lang;
    emit('languageSelected', lang);
}
</script>
<template>
    <div class="flex space-x-4">
        <AtomsLangSelectButton @select="selectLanguage('tr')" value="tr" :is-selected="selectedLanguage === 'tr'" />
        <AtomsLangSelectButton @select="selectLanguage('en')" value="en" :is-selected="selectedLanguage === 'en'" />
    </div>
</template>