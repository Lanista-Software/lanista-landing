<script setup lang="ts">
defineProps<{
  id: string;
}>();
</script>

<template>
  <section :id="id">
    <AtomsContainer class="pt-20 pb-40 flex items-center justify-center">
      <slot></slot>
    </AtomsContainer>
  </section>
</template>
