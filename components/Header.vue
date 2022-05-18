<template>
  <header
    class="lanista-header-wrapper fixed top-0 left-0 w-full bg-primary z-50"
  >
    <div class="lanista-header lanista-container py-6">
      <div class="lanista-header__logo-container">
        <a
          class="lanista-header__logo-link flex justify-center items-center"
          href="/"
        >
          <nuxt-img
            class="lanista-header__logo w-8"
            src="/lanista-logo.svg"
            alt="lanista logo"
          />
        </a>
      </div>
      <div class="flex">
        <nav
          v-for="item in headerData.navigation"
          :key="item.ID"
          class="lanista-header-nav hidden lg:flex mx-2 relative cursor-pointer"
        >
          <nuxt-link
            exact-active-class="text-secondary font-semibold"
            :to="item.link"
            class="lanista-header-nav-item mr-2 ml-2 text-white"
          >
            <span>{{ item.name }}</span>
          </nuxt-link>
        </nav>
      </div>
      <div>
        <lui-button
          rounded
          size="lg"
          variant="secondary"
          class="hidden lg:block"
        >
          Start a project
        </lui-button>
      </div>
      <div class="flex flex-row lg:hidden">
        <lui-button
          aria-label="menu"
          icon="menu"
          type="text"
          variant="info"
          filter="lighter"
          size="lg"
          rounded
          @click="hamburgerMenu = !hamburgerMenu"
        />
      </div>
    </div>
  </header>
</template>

<script>
import LuiButton from './LuiComponents/LuiButton.vue'
export default {
  name: 'Header',
  components: { LuiButton },
  data() {
    return {
      hamburgerMenu: false,
      headerData: null,
    }
  },
  async fetch() {
    const header = await this.$content('contentrain/Header').fetch()
    this.headerData = header[0]
  },
  head() {
    return {
      bodyAttrs: {
        style: this.hamburgerMenu ? 'max-height: 100vh; overflow:hidden;' : '',
      },
    }
  },
  methods: {},
}
</script>

<style lang="postcss" scoped>
.lanista-header {
  @apply flex items-center justify-between;
}
.lanista-header__logo-container {
  @apply flex items-center;
}
.lanista-header__logo {
  @apply h-auto;
}

.fade-menu-enter-active,
.fade-menu-leave-active {
  transition: transform 0.4s;
}
.fade-menu-enter, .fade-menu-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(100%);
}
</style>
