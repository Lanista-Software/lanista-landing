<script setup lang="ts">
defineProps<{
  id: string;
}>();
</script>

<template>
  <section :id="id">
    <AtomsContainer class="py-20 flex items-center justify-center">
      <slot></slot>
    </AtomsContainer>
  </section>
</template>
