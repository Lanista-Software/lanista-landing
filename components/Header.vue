<template>
  <header
    class="lanista-header-wrapper fixed top-0 left-0 w-full bg-primary z-50"
  >
    <div class="lanista-header lanista-container py-6">
      <div class="lanista-header__logo-container">
        <nuxt-link
          class="lanista-header__logo-link flex justify-center items-center"
          to="/"
        >
          <nuxt-img
            class="lanista-header__logo w-8"
            src="/lanista-logo.svg"
            alt="lanista logo"
          />
        </nuxt-link>
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
        <nuxt-link :to="headerData.buttons[0].link">
          <lui-button
            rounded
            size="lg"
            variant="secondary"
            class="hidden lg:block"
            >{{ headerData.buttons[0].label }}
          </lui-button>
        </nuxt-link>
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
      <transition name="fade-menu">
        <HamburgerMenu
          v-show="hamburgerMenu"
          :is-active="hamburgerMenu"
          :nav-list="headerData.navigation"
          :social-link-list="headerData.socialLinks"
          @closeMenu="handleCloseMenu"
        />
      </transition>
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
  methods: {
    handleCloseMenu() {
      this.hamburgerMenu = !this.hamburgerMenu
    },
  },
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
