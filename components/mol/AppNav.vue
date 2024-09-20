<script setup lang="ts">
// Menü öğelerinin dışarıdan alınmasını sağlıyoruz
export interface MenuItem {
  label: string;
  path: string;
}

const props = defineProps<{
  menuItems: MenuItem[];
}>();

// Nuxt-i18n için localePath fonksiyonunu kullanıyoruz
const localePath = useLocalePath();
const { setScrollState } = useScrollState();
function setScroll(hash: string) {
  console.log(hash);
  setScrollState('auto');
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

}
</script>
<template>
  <nav aria-label="Main Navigation" class="flex space-x-6">
    <ul class="flex space-x-6">
      <li v-for="(item, index) in menuItems" :key="index">
        <NuxtLink @click="setScroll(item.path)" :to="localePath(item.path)"
          exact-active-class="text-danger-500 font-bold" active-class="text-danger-500 font-bold">
          {{ $t(`menu.${item.label}`) }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
