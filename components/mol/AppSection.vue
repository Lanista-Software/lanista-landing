<script setup lang="ts">
const props = defineProps<{
  id: string;
  customPadding?:string
}>();
const emit = defineEmits<{ viewed: [id: string] }>();

let intersectionObserver: IntersectionObserver | null = null;
const el = ref(null);

onMounted(() => {
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) emit("viewed", props.id);
    },
    { threshold: 0.3 } // Observe when 50% of the element is visible
  );

  if (el.value) {
    intersectionObserver.observe(el.value);
  } else {
    watch(el, (el) => {
      if (el && intersectionObserver) intersectionObserver.observe(el);
    });
  }
});

onBeforeUnmount(() => {
  if (intersectionObserver) intersectionObserver.disconnect();
});
</script>

<template>
  <section ref="el" :id="id">
    <AtomsContainer class="flex items-center justify-center" :class="customPadding ? customPadding : 'pt-28 pb-40'">
      <slot></slot>
    </AtomsContainer>
  </section>
</template>
