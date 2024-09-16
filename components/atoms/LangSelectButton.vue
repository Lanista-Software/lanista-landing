<script setup lang="ts">
const emit = defineEmits(['select']);
type LangSelectButtonProps = {
    value: 'tr' | 'en';
    isSelected: boolean;
};
defineProps<LangSelectButtonProps>();
function selectLanguage(language: string) {
    emit('select', language);
}
</script>
<template>
    <button @click="selectLanguage(value)" :class="{
        'ring-2 ring-success-500': isSelected,
        'ring-2 ring-transparent opacity-70': !isSelected
    }" class="rounded-full focus:outline-none transition-all size-6">
        <AtomsFlag  :country="value" />
    </button>
</template>
