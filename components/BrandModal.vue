<template>
  <div
    v-show="show"
    id="dialog"
    v-bind="$attrs"
    role="dialog"
    aria-labelledby="dialog1_label"
    aria-modal="true"
    class="w-screen h-screen fixed top-0 left-0 flex pt-[74px]"
    style="z-index: 60"
  >
    <div
      class="content relative mx-auto mb-auto shadow-xl bg-white px-8 py-12 rounded-2xl lg:min-w-[35vw] min-w-[90vw] max-w-[90vw]"
    >
      <lui-button
        class="absolute right-8 top-8"
        icon="close"
        size="lg"
        type="link"
        variant="info"
        filter="darker"
        :disable-styles="['hover', 'focus']"
        @click="closeModal"
      />
      <div class="text-center text-info-600 mt-4">
        <lui-heading class="font-semibold mb-4 text-info-800">
          {{ title }}
        </lui-heading>
        <lui-text> {{ description }} </lui-text>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BrandModal',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: false,
      email: null,
      spinner: false,
    }
  },
  methods: {
    closeModal() {
      this.show = false
      document.body.style.overflowY = 'auto'
    },
  },
}
</script>
