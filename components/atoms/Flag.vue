<script setup lang="ts">

const flagMap = {
  tr: defineAsyncComponent(() =>
    Promise.resolve(() => h('img', { src: '/tr-flag.png', alt: 'Turkish Flag' }))
  ),
  en: defineAsyncComponent(() =>
    Promise.resolve(() => h('img', { src: '/en-flag.png', alt: 'English Flag' }))
  ),
};

interface FlagProps {
  country: keyof typeof flagMap;
}

defineProps<FlagProps>();
</script>

<template>
  <component class="rounded-full size-6" :is="flagMap[country]"></component>
</template>
