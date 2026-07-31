<script setup lang="ts">
defineProps<LangSelectButtonProps>()
const emit = defineEmits(['select'])
type LangSelectButtonProps = {
  value: 'tr' | 'en'
  isSelected: boolean
  /** Localized path for this locale — rendered as a real, crawlable <a href>. */
  to: string
}
const LABELS: Record<string, string> = { tr: 'Türkçe', en: 'English' }
</script>

<template>
  <NuxtLink
    :to="to" :hreflang="value" :aria-label="LABELS[value]" :title="LABELS[value]"
    :aria-current="isSelected ? 'true' : undefined" :class="{
      'ring-2 ring-success-500': isSelected,
      'opacity-70 ring-2 ring-transparent': !isSelected,
    }" class="block size-6 rounded-full transition-all focus:outline-none" @click="emit('select', value)"
  >
    <AtomsFlag :country="value" />
  </NuxtLink>
</template>
