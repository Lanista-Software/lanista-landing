<script setup lang="ts">
import useScrollLock from '~/composables/scrollLock';

// Menü öğelerinin dışarıdan alınmasını sağlıyoruz
export interface MenuItem {
  label: string;
  path: string;
}
defineProps<{ menuItems: MenuItem[]; direction: "vertical" | "horizontal" }>();
const { lockScroll } = useScrollLock()
const localePath = useLocalePath()
const route = useRoute()
const emit = defineEmits<{ clicked: [] }>();
function handleClicked() {
  lockScroll();
  emit("clicked");
}
const isHash = (path: string) => path.startsWith("#");
// Hash items scroll within the homepage; route items (e.g. /works) are localized links.
function resolveTo(path: string) {
  return isHash(path) ? path : localePath(path);
}
function isActive(item: MenuItem) {
  if (isHash(item.path)) {
    return route.hash.length === 0 ? item.path === "#home" : route.hash === item.path;
  }
  const target = localePath(item.path);
  return route.path === target || route.path.startsWith(`${target}/`);
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
            :to="resolveTo(item.path)"
            @click="handleClicked"
            class="font-inter cursor-pointer"
            :class="{
              'text-danger-500 font-bold': isActive(item),
              'text-heading-text font-medium': !isActive(item),
            }"
          >
            {{ $t(`menu.${item.label}`) }}
          </NuxtLink>
        </li>
      </template>
    </ul>
  </nav>
</template>
