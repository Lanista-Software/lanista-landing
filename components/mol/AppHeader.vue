<script setup lang="ts">
import type { MenuItem } from './AppNav.vue';
const menuItems: MenuItem[] = [
    { label: 'home', path: '#home' },
    { label: 'services', path: '#services' },
    { label: 'process', path: '#process' },
    { label: 'technologies', path: '#technologies' },
    { label: 'works', path: '#works' },
];

const { setLocale, locale } = useI18n();
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

onMounted(() => {
    if (locale.value) {
        setLocale(locale.value);
    }
    // Scroll event listener ekliyoruz
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    // Scroll event listener'ı kaldırıyoruz
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <header :class="{ 'pt-[90px]': false }">
        <div :class="[{ 'fixed-header': isHeaderFixed }, 'bg-white py-6 transition-all duration-500 ease-in-out']">
            <AtomsContainer>
                <div class="flex items-center justify-between">
                    <NuxtLink to="/" class="flex w-28 md:w-36 items-center space-x-2">
                        <AtomsLogo />
                    </NuxtLink>
                    <div class="flex-1 items-center justify-center hidden lg:flex">
                        <MolAppNav direction="horizontal" :menuItems="menuItems" />
                    </div>
                    <div class="flex items-center space-x-4">
                        <MolLangSelect @language-selected="(lang: string) => setLocale(lang)" :active-lang="locale" />
                        <LuiButton class="lg:hidden" filter="darken" size="xl" variant="link" @click="toggleMenu">
                            <template #icon>
                                <i class="ri-menu-line"></i>
                            </template>
                        </LuiButton>
                        <LuiButton class="hidden lg:block" color="danger" rounded="full" @click="toggleMenu">
                            Contact
                        </LuiButton>
                    </div>
                </div>
            </AtomsContainer>
            <!-- Mobil Menü -->
            <LuiSidebar class="lg:hidden" :show="isMenuOpen" @close="isMenuOpen = false">
                <div class="p-6">
                    <MolAppNav direction="vertical" :menuItems="menuItems" />
                    <LuiButton block class="mt-8" color="danger" rounded="full" @click="toggleMenu">
                        Contact
                    </LuiButton>
                </div>
            </LuiSidebar>
        </div>
    </header>
</template>

<style scoped lang="postcss">
.fixed-header {
    @apply fixed top-0 left-0 w-full z-50 shadow-sm;
    z-index: 50;
    transform: none;
}
</style>
