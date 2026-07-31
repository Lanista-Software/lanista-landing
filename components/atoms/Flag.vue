<script setup lang="ts">
defineProps<FlagProps>()

const flagMap = {
  tr: defineAsyncComponent(() =>
    Promise.resolve(() => h('img', { src: '/tr-flag.png', alt: 'Turkish Flag' })),
  ),
  en: defineAsyncComponent(() =>
    Promise.resolve(() => h('img', { src: '/en-flag.png', alt: 'English Flag' })),
  ),
}

interface FlagProps {
  country: keyof typeof flagMap
}
</script>

<template>
  <component :is="flagMap[country]" class="size-6 rounded-full"></component>
</template>
