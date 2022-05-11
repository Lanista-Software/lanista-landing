<template>
  <div class="footer mt-12 flex justify-between items-center">
    <div
      v-if="Object.keys(footerData.socialLinks).length > 0"
      class="footer-left"
    >
      <a
        v-for="(item, i) in footerData.socialLinks"
        :key="i"
        :href="item.link"
        target="_blank"
        :aria-label="item.name"
        rel="noopener noreferrer"
        class="mr-4 mt-2"
      >
        <lui-icon class="text-white" :name="item.icon.name" line size="xl" />
      </a>
    </div>
    <div class="footer-middle text-white">
      <p>{{ footerData.info }}</p>
    </div>
    <div class="footer-right">
      <nuxt-img src="/lanista-logo-lg.svg" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      footerData: null,
    }
  },
  async fetch() {
    const footer = await this.$content('contentrain/Footer').fetch()
    this.footerData = footer[0]
  },
}
</script>

<style lang="scss" scoped></style>
