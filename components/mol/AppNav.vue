<script setup lang="ts">
// Menü öğelerinin dışarıdan alınmasını sağlıyoruz
export interface MenuItem {
  label: string;
  path: string;
}


defineProps<{ menuItems: MenuItem[], direction: 'vertical' | 'horizontal' }>()
const { setScrollState } = useScrollState();
function setScroll(hash: string) {
  console.log(hash);
  setScrollState('auto');
  const el = document.getElementById(hash);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>
<template>
  <nav aria-label="Main Navigation" class="space-x-6 flex items-center">
    <ul :class="direction === 'vertical' ? 'block space-y-8 ' : 'flex space-x-6'">
      <li v-for="(item, index) in menuItems" :key="item.path + index">
        <NuxtLink @click="setScroll(item.path)" :to="item.path" class="font-inter cursor-pointer" :class="$route.hash === item.path ? 'text-danger-500 font-bold' : 'text-heading-text font-medium'">
          {{ $t(`menu.${item.label}`) }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
