<script lang="ts" setup>
interface Props {
  titleId?: string
  panelId?: string
  title?: string
  border?: boolean
  defaultOpen?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  titleId: 'accordion-title',
  panelId: 'accordion-panel',
  title: 'Title',
  border: true,
  defaultOpen: false,
})
const emit = defineEmits(['toogle'])
const isActive = ref(props.defaultOpen)
function toogleVisibility() {
  isActive.value = !isActive.value
  emit('toogle', props.title)
}
</script>

<template>
  <div class="accordion-wrapper flex flex-col p-8 leading-none bg-white justify-center rounded-2xl " :class="border ? 'border border-border-color' : ''">
    <div class="flex items-center">
      <button
        class="w-full"
        :aria-expanded="isActive"
        :aria-controls="isActive ? panelId : ''"
        @click="toogleVisibility"
      >
        <div class="flex items-center text-left justify-between">
          <slot :id="titleId" name="title">
            <h5 :id="titleId" class="text-heading-text font-space text-xl font-medium">
              {{ title }}
            </h5>
          </slot>
          

          <i class="text-disabled-text text-xl leading-none" :class="isActive ? 'ri-subtract-line' : 'ri-add-line'" />
        </div>
      </button>
    </div>
    <div
      :id="panelId"
      :aria-hidden="!isActive"
      role="region"
      :aria-labelledby="titleId"
      class="accordion-content w-full"
    >
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 150ms linear;
}

.accordion-content[aria-hidden="false"] {
  grid-template-rows: 1fr;
}

.accordion-content > div {
  overflow: hidden;
}
</style>
