<script setup lang="ts">
const emit = defineEmits(['select']);
type LangSelectButtonProps = {
    value: 'tr' | 'en';
    isSelected: boolean;
    /** Localized path for this locale — rendered as a real, crawlable <a href>. */
    to: string;
};
defineProps<LangSelectButtonProps>();
const LABELS: Record<string, string> = { tr: 'Türkçe', en: 'English' };
</script>
<template>
    <NuxtLink :to="to" :hreflang="value" :aria-label="LABELS[value]" :title="LABELS[value]"
        :aria-current="isSelected ? 'true' : undefined" @click="emit('select', value)" :class="{
            'ring-2 ring-success-500': isSelected,
            'ring-2 ring-transparent opacity-70': !isSelected
        }" class="rounded-full focus:outline-none transition-all size-6 block">
        <AtomsFlag :country="value" />
    </NuxtLink>
</template>
