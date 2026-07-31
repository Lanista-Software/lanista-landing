<script setup lang="ts">
// Rendered by satori at prerender time, not in a browser. Tailwind classes are
// the path nuxt-og-image translates reliably; inline `style` rows were coming
// out stacked because satori defaults flex-direction to column.
withDefaults(
  defineProps<{
    title?: string
    description?: string
    label?: string
  }>(),
  {
    title: 'Lanista Software',
    description: '',
    label: '',
  },
)
</script>

<template>
  <div
    class="flex size-full flex-col justify-between p-[72px]"
    style="background-image: linear-gradient(135deg, #ffffff 0%, #f3f5fb 55%, #ffe9ec 100%)"
  >
    <div class="flex flex-col">
      <div
        v-if="label"
        class="flex text-[26px] tracking-[2px] text-[#e2445c]"
        style="font-family: Inter"
      >
        {{ label.toUpperCase() }}
      </div>
      <div
        class="mt-[20px] flex text-[68px] leading-[1.12] text-[#10162f]"
        style="font-family: Space Grotesk; font-weight: 700"
      >
        {{ title }}
      </div>
      <div
        v-if="description"
        class="mt-[24px] flex text-[30px] leading-[1.4] text-[#4a5170]"
        style="font-family: Inter"
      >
        {{ description }}
      </div>
    </div>

    <div class="flex w-full flex-row items-center justify-between">
      <div
        class="flex text-[34px] text-[#10162f]"
        style="font-family: Space Grotesk; font-weight: 700"
      >
        Lanista Software
      </div>
      <div class="flex text-[26px] text-[#4a5170]" style="font-family: Inter">
        lanista.com.tr
      </div>
    </div>
  </div>
</template>
