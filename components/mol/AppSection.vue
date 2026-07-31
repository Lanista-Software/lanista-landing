<script setup lang="ts">
const props = defineProps<{
  id: string
}>()
const emit = defineEmits<{ viewed: [id: string] }>()

let intersectionObserver: IntersectionObserver | null = null
const el = ref(null)
const proxy = useScriptGoogleAnalytics()

onMounted(() => {
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        emit('viewed', props.id)
        proxy.dataLayer.push({ event: 'section_viewed', section_id: props.id })
      }
    },
    { threshold: 0.3 }, // Observe when 50% of the element is visible
  )

  if (el.value) {
    intersectionObserver.observe(el.value)
  }
  else {
    watch(el, (el) => {
      if (el && intersectionObserver)
        intersectionObserver.observe(el)
    })
  }
})

onBeforeUnmount(() => {
  if (intersectionObserver)
    intersectionObserver.disconnect()
})
</script>

<template>
  <section :id="id" ref="el">
    <AtomsContainer class="flex items-center justify-center pb-40 pt-28">
      <slot></slot>
    </AtomsContainer>
  </section>
</template>
