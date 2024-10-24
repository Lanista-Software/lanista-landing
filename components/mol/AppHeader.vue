<script setup lang="ts">
import useScrollLock from "~/composables/scrollLock";
import type { MenuItem } from "./AppNav.vue";
const menuItems: MenuItem[] = [
  { label: "home", path: "#home" },
  { label: "services", path: "#services" },
  { label: "process", path: "#process" },
  { label: "technologies", path: "#technologies" },
  { label: "works", path: "#works" },
];
const { lockScroll } = useScrollLock();
const { setLocale, locale } = useI18n();
const proxy = useScriptGoogleAnalytics();
const isMenuOpen = ref(false);
const isHeaderFixed = ref(false); // Header fixed durumunu takip eden state

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
// Scroll eventini dinlemek için
function handleScroll() {
  // Eğer scroll 90px üzerindeyse header'ı fixed yap
  isHeaderFixed.value = window.scrollY > 90;
}
function handleLang(lang: string) {
  setLocale(lang);
}

watch(
  () => isMenuOpen.value,
  (val) => {
    if (val) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
);
onMounted(() => {
  if (locale.value) {
    setLocale(locale.value);
    proxy.dataLayer.push({ event: "language_changed", language: locale.value });
  }
  // Scroll event listener ekliyoruz
  window.addEventListener("scroll", handleScroll);
});
function handleClick() {
  lockScroll();
  proxy.dataLayer.push({ event: "button_clicked", button_name: "contact" });
}
onUnmounted(() => {
  // Scroll event listener'ı kaldırıyoruz";
  window.removeEventListener("scroll", handleScroll);
  document.body.style.overflow = "";
});
</script>

<template>
  <header :class="{ 'pt-[90px]': false }">
    <div
      :class="[
        { 'fixed-header': isHeaderFixed },
        'bg-white py-6 transition-all duration-500 ease-in-out',
      ]"
    >
      <AtomsContainer>
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex w-28 md:w-36 items-center space-x-2">
            <AtomsLogo />
          </NuxtLink>
          <div class="flex-1 items-center justify-center hidden lg:flex">
            <MolAppNav direction="horizontal" :menuItems="menuItems" />
          </div>
          <div class="flex items-center space-x-4">
            <MolLangSelect
              @language-selected="handleLang"
              :active-lang="locale"
            />
            <LuiButton
              class="lg:hidden"
              filter="darken"
              size="xl"
              variant="link"
              @click="toggleMenu"
            >
              <template #icon>
                <i class="ri-menu-line"></i>
              </template>
            </LuiButton>
            <NuxtLink class="hidden md:block" to="/#contact">
              <LuiButton
                @click="handleClick"
                block
                color="danger"
                rounded="full"
                tag="div"
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
        class="lg:hidden bg-white"
        :show="isMenuOpen"
        @close="isMenuOpen = false"
      >
        <div>
          <div class="flex items-center justify-between">
            <NuxtLink to="/" class="flex w-28 md:w-36 items-center space-x-2">
              <AtomsLogo />
            </NuxtLink>
            <div class="flex items-center space-x-4 z-50">
              <MolLangSelect
                @language-selected="(lang: string) => setLocale(lang)"
                :active-lang="locale"
              />
            </div>
          </div>
          <div class="pt-6">
            <MolAppNav
              direction="vertical"
              :menuItems="menuItems"
              @clicked="toggleMenu"
            />
            <div class="pt-8">
              <NuxtLink @click="toggleMenu" to="/#contact">
                <LuiButton
                  @click="handleClick"
                  block
                  class="items-center justify-center flex"
                  color="danger"
                  rounded="full"
                  tag="div"
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
