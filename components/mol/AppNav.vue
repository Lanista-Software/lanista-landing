<script setup lang="ts">
import useScrollLock from '~/composables/scrollLock';

// Menü öğelerinin dışarıdan alınmasını sağlıyoruz
export interface MenuItem {
  label: string;
  path: string;
}

defineProps<{ menuItems: MenuItem[]; direction: "vertical" | "horizontal" }>();
const { lockScroll } = useScrollLock()

function isActive(path: string, routeHash: string) {
  return routeHash.length === 0 ? path === "#home" : routeHash === path;
}
</script>

<template>
  <nav aria-label="Main Navigation" class="space-x-6 flex items-center">
    <ul
      v-if="menuItems && menuItems.length"
      :class="direction === 'vertical' ? 'block space-y-8' : 'flex space-x-6'"
    >
      <template v-for="(item, index) in menuItems" :key="item.path + index">
        <li v-if="item">
          <NuxtLink
            :to="item.path"
            @click="lockScroll"
            class="font-inter cursor-pointer"
            :class="{
              'text-danger-500 font-bold': isActive(item.path, $route.hash),
              'text-heading-text font-medium': !isActive(
                item.path,
                $route.hash
              ),
            }"
          >
            {{ $t(`menu.${item.label}`) }}
          </NuxtLink>
        </li>
      </template>
    </ul>
  </nav>
</template>
