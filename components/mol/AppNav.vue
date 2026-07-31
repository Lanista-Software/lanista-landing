<script setup lang="ts">
import useScrollLock from '~/composables/scrollLock'

// Menü öğelerinin dışarıdan alınmasını sağlıyoruz
export interface MenuItem {
  label: string
  path: string
}
defineProps<{ menuItems: MenuItem[], direction: 'vertical' | 'horizontal' }>()
const emit = defineEmits<{ clicked: [] }>()
const { lockScroll } = useScrollLock()
const localePath = useLocalePath()
const route = useRoute()
function handleClicked() {
  lockScroll()
  emit('clicked')
}
const isHash = (path: string) => path.startsWith('#')
// Hash items scroll within the homepage; route items (e.g. /works) are localized links.
// Hashes are anchored to the *localized* homepage — a bare "#services" resolved
// against /tr/ produced "/tr#services", which the host then 301s to "/tr/".
function resolveTo(path: string) {
  return isHash(path) ? `${localePath('/')}${path}` : localePath(path)
}
function isActive(item: MenuItem) {
  if (isHash(item.path)) {
    return route.hash.length === 0 ? item.path === '#home' : route.hash === item.path
  }
  const target = localePath(item.path)
  return route.path === target || route.path.startsWith(`${target}/`)
}
</script>

<template>
  <nav aria-label="Main Navigation" class="flex items-center space-x-6">
    <ul
      v-if="menuItems && menuItems.length"
      :class="direction === 'vertical' ? 'block space-y-8' : 'flex space-x-6'"
    >
      <template v-for="(item, index) in menuItems" :key="item.path + index">
        <li v-if="item">
          <NuxtLink
            :to="resolveTo(item.path)"
            class="cursor-pointer font-inter"
            :class="{
              'font-bold text-danger-500': isActive(item),
              'font-medium text-heading-text': !isActive(item),
            }"
            @click="handleClicked"
          >
            {{ $t(`menu.${item.label}`) }}
          </NuxtLink>
        </li>
      </template>
    </ul>
  </nav>
</template>
