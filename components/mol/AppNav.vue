<script setup lang="ts">
// Menü öğelerinin dışarıdan alınmasını sağlıyoruz
export interface MenuItem {
  label: string;
  path: string;
}

defineProps<{ menuItems: MenuItem[], direction: 'vertical' | 'horizontal' }>();


</script>

<template>
  <nav aria-label="Main Navigation" class="space-x-6 flex items-center">
    <ul v-if="menuItems && menuItems.length" :class="direction === 'vertical' ? 'block space-y-8' : 'flex space-x-6'">
      <template v-for="(item, index) in menuItems" :key="item.path + index">
        <li v-if="item">
          <NuxtLink :to="item.path" class="font-inter cursor-pointer" :class="{
            'text-danger-500 font-bold': $route.hash === item.path,
            'text-heading-text font-medium': $route.hash !== item.path || !$route.hash
          }">
            {{ $t(`menu.${item.label}`) }}
          </NuxtLink>
        </li>
      </template>
    </ul>
  </nav>
</template>
