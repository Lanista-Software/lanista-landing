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
onMounted(()=> {
    if(locale.value) {
        setLocale(locale.value);
    }
})
</script>
<template>
    <header class="bg-white py-6 px-8">
        <div class="container mx-auto flex items-center justify-between">
            <!-- Sol taraf: Logo -->
            <NuxtLink to="/#home" class="flex w-28 md:w-36 items-center space-x-2" >
                <AtomsLogo class="hidden md:block"/>
            </NuxtLink>
            <MolAppNav :menuItems="menuItems" />
            <!-- Sağ taraf: Dil Seçimi ve Menü İkonu -->
            <div class="flex items-center space-x-4">
                <!-- Dil Seçimi -->
                <MolLangSelect @language-selected="(lang: string) => setLocale(lang)" />

                <!-- Menü İkonu (Mobilde görünür) -->
                <LuiButton filter="darken" size="xl" variant="link" @click="toggleMenu" class="md:hidden">
                    <template #icon>
                        <i class="ri-menu-line"></i>
                    </template>
                </LuiButton>
            </div>
        </div>
        <!-- Mobil Menü -->
        <div v-if="isMenuOpen" class="md:hidden bg-white shadow-lg">
            <nav class="flex flex-col items-center py-4 space-y-2">
                <!-- Menü Öğeleri buraya eklenebilir -->
                <a href="#" class="text-gray-800">Home</a>
                <a href="#" class="text-gray-800">About</a>
                <a href="#" class="text-gray-800">Contact</a>
            </nav>
        </div>
    </header>
</template>


<style scoped></style>