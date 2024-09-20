<script setup lang="ts">
import type { MenuItem } from './AppNav.vue';

const menuItems: MenuItem[] = [
    { label: 'home', path: '#home' }, // Dil desteği ile yönlendirme
    { label: 'services', path: '#services' }, // Tek sayfa yönlendirme
    { label: 'process', path: '#process' }, // Tek sayfa yönlendirme
    { label: 'technologies', path: '#technologies' }, // Tek sayfa yönlendirme
    { label: 'works', path: '#works' }, // Tek sayfa yönlendirme
];
const { setLocale, locale } = useI18n()
const isMenuOpen = ref(false);
function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
}
onMounted(() => {
    if (locale.value) {
        setLocale(locale.value);
    }
})
</script>
<template>
    <header class="bg-white py-6">
        <AtomsContainer>
            <div class="flex items-center justify-between">
                <!-- Sol taraf: Logo -->
                <NuxtLink to="/#test" class="flex w-28 md:w-36 items-center space-x-2">
                    <AtomsLogo />
                </NuxtLink>
                <div class="flex flex-1 items-center justify-center">
                    <MolAppNav direction="horizontal" :menuItems="menuItems" />
                </div>
                <!-- Sağ taraf: Dil Seçimi ve Menü İkonu -->
                <div class="flex items-center space-x-4">
                    <!-- Dil Seçimi -->
                    <MolLangSelect @language-selected="(lang: string) => setLocale(lang)" />

                    <!-- Menü İkonu (Mobilde görünür) -->
                    <LuiButton class="lg:hidden" filter="darken" size="xl" variant="link" @click="toggleMenu">
                        <template #icon>
                            <i class="ri-menu-line"></i>
                        </template>
                    </LuiButton>
                    <!-- Contact Buton masaustunde gorunur -->
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

    </header>
</template>


<style scoped></style>