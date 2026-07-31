<script setup lang="ts">
import type { MenuItem } from './AppNav.vue'
import useScrollLock from '~/composables/scrollLock'

const menuItems: MenuItem[] = [
  { label: 'home', path: '#home' },
  { label: 'services', path: '#services' },
  { label: 'process', path: '#process' },
  { label: 'technologies', path: '#technologies' },
  { label: 'works', path: '/works' },
]
const { lockScroll } = useScrollLock()
const { locale } = useI18n()
const localePath = useLocalePath()
const proxy = useScriptGoogleAnalytics()
const isMenuOpen = ref(false)
const isHeaderFixed = ref(false) // Header fixed durumunu takip eden state

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
// Scroll eventini dinlemek için
function handleScroll() {
  // Eğer scroll 90px üzerindeyse header'ı fixed yap
  isHeaderFixed.value = window.scrollY > 90
}
// The switcher itself is a <NuxtLink>; navigation already changes the locale,
// so this only reports the interaction.
function handleLang(lang: string) {
  proxy.dataLayer.push({ event: 'language_changed', language: lang })
}

watch(
  () => isMenuOpen.value,
  (val) => {
    if (val) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = 'auto'
    }
  },
)
onMounted(() => {
  // Scroll event listener ekliyoruz
  window.addEventListener('scroll', handleScroll)
})
function handleClick() {
  lockScroll()
  proxy.dataLayer.push({ event: 'button_clicked', button_name: 'contact' })
}
onUnmounted(() => {
  // Scroll event listener'ı kaldırıyoruz";
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <header :class="{ 'pt-[90px]': false }">
    <div
      class="bg-white py-6 transition-all duration-500 ease-in-out" :class="[
        { 'fixed-header': isHeaderFixed },
      ]"
    >
      <AtomsContainer>
        <div class="flex items-center justify-between">
          <NuxtLink :to="localePath('/')" class="flex w-28 items-center space-x-2 md:w-36">
            <AtomsLogo />
          </NuxtLink>
          <div class="hidden flex-1 items-center justify-center lg:flex">
            <MolAppNav direction="horizontal" :menu-items="menuItems" />
          </div>
          <div class="flex items-center space-x-4">
            <MolLangSelect
              :active-lang="locale"
              @language-selected="handleLang"
            />
            <LuiButton
              class="lg:hidden"
              filter="darken"
              size="xl"
              variant="link"
              aria-label="Menu"
              @click="toggleMenu"
            >
              <template #icon>
                <i class="ri-menu-line"></i>
              </template>
            </LuiButton>
            <NuxtLink class="hidden md:block" :to="`${localePath('/')}#contact`">
              <LuiButton
                block
                color="danger"
                rounded="full"
                tag="div"
                @click="handleClick"
              >
                Contact
              </LuiButton>
            </NuxtLink>
          </div>
        </div>
      </AtomsContainer>
      <!-- Mobil Menü -->
    </div>
    <div>
      <LuiSidebar
        class="bg-white lg:hidden"
        :show="isMenuOpen"
        @close="isMenuOpen = false"
      >
        <div>
          <div class="flex items-center justify-between">
            <NuxtLink :to="localePath('/')" class="flex w-28 items-center space-x-2 md:w-36">
              <AtomsLogo />
            </NuxtLink>
            <div class="z-50 flex items-center space-x-4">
              <MolLangSelect
                :active-lang="locale"
                @language-selected="handleLang"
              />
            </div>
          </div>
          <div class="pt-6">
            <MolAppNav
              direction="vertical"
              :menu-items="menuItems"
              @clicked="toggleMenu"
            />
            <div class="pt-8">
              <NuxtLink :to="`${localePath('/')}#contact`" @click="toggleMenu">
                <LuiButton
                  block
                  class="flex items-center justify-center"
                  color="danger"
                  rounded="full"
                  tag="div"
                  @click="handleClick"
                >
                  Contact
                </LuiButton>
              </NuxtLink>
            </div>
          </div>
        </div>
      </LuiSidebar>
    </div>
  </header>
</template>

<style scoped lang="postcss">
.fixed-header {
  @apply fixed top-0 left-0 w-full z-50 shadow-sm;
  z-index: 30;
  transform: none;
}
</style>
