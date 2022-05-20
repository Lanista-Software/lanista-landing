<template>
  <div
    class="hamburger w-screen h-screen transition-all duration-75 overflow-hidden bg-opacity-40 fixed left-0 top-0 flex"
    :class="isActive ? 'bg-info-900' : ' bg-transparent'"
  >
    <div
      class="content brand-shadow w-4/5 h-full p-6 flex flex-col bg-white ml-auto rounded-l-md"
    >
      <header class="flex items-center justify-between">
        <div>
          <a class="lanista-header__logo-link" href="">
            <nuxt-img
              class="lanista-header__logo"
              src="/lanista-logo.svg"
              alt="deneme"
            />
          </a>
        </div>
        <lui-button
          type="text"
          icon="close"
          variant="info"
          filter="darker"
          rounded
          @click="$emit('closeMenu')"
        />
      </header>
      <nav class="mt-8 space-y-4 w-max" @click="$emit('closeMenu')">
        <template v-for="navItem in navList">
          <nuxt-link
            v-if="navItem.name !== 'Docs'"
            :key="navItem.link"
            exact-active-class="text-primary font-semibold"
            :to="navItem.link"
            class="lanista-header-nav-item block"
            :class="{
              'text-info-800': $route.path != navItem.link,
            }"
          >
            <span>{{ navItem.name }}</span>
          </nuxt-link>
          <a
            v-else
            :key="navItem.ID"
            :href="navItem.link"
            target="_blank"
            rel="noopener noreferrer"
            exact-active-class="text-primary font-semibold"
            class="lanista-header-nav-item block"
            :class="{
              'text-info-800': $route.path != navItem.link,
            }"
          >
            <span>{{ navItem.name }}</span>
          </a>
        </template>
      </nav>
      <footer class="mt-auto flex items-center">
        <div class="social-links">
          <a
            v-for="(link, i) in socialLinkList"
            :key="i"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="mr-4"
          >
            <lui-icon class="text-info-600" :name="link.name" line size="xl" />
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import LuiButton from './LuiComponents/LuiButton.vue'
export default {
  name: 'HambugerMenu',
  components: { LuiButton },
  props: {
    isActive: { type: Boolean, default: false },
    navList: {
      type: Array,
      default: () => [],
    },
    socialLinkList: {
      type: Array,
      default: () => [],
    },
    imgSrc: {
      type: String,
      default: '',
    },
    imgAlt: {
      type: String,
      default: '',
    },
    logo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isProductsActive: false,
    }
  },
}
</script>

<style lang="postcss">
.hamburger {
  z-index: 9999;
}
.brand-shadow {
  box-shadow: -2px 0px 16px rgba(0, 0, 0, 0.08);
}
.expand-list-enter-active,
.expand-list-leave-active {
  transition: opacity 0.2s;
  transition: transform 0.2s;
}
.expand-list-enter, .expand-list-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0.2;
  transform: translateY(-10%);
}
</style>
