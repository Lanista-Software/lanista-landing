<script lang="ts" setup>
const { locale } = useI18n()
const localePath = useLocalePath()

// Locale-keyed, no `watch`: /api/* is absent from the static build, so a
// client-side refetch 404s and empties the footer. See pages/index.vue.
const { data: layout } = await useAsyncData(
  `layout-${locale.value}`,
  () => $fetch('/api/layout', { query: { locale: locale.value } }),
)

const servicePages = computed(() => layout.value?.servicePages || [])
const socials = computed(() => layout.value?.socialLinks || [])

const footerData = {
  logo: {
    link: '/',
    image: '/images/logo.svg',
  },
  centerText: '© 2021 Lanista. All rights reserved.',
}
</script>

<template>
  <footer class="border border-border-color">
    <AtomsContainer class="py-10">
      <div class="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Logo & Socials -->
        <div>
          <NuxtLink :to="localePath('/')" class="mb-4 flex h-6 w-28 items-center space-x-2 md:w-36">
            <AtomsLogo />
          </NuxtLink>
          <div class="space-x-4">
            <template v-for="social in socials" :key="social.link">
              <a
                :href="social.link"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xl font-bold leading-none text-heading-text"
                :aria-label="social.icon"
              >
                <i :class="social.icon"></i>
              </a>
            </template>
          </div>
        </div>

        <!-- Services Links -->
        <div>
          <h3 class="mb-3 font-space text-sm font-bold uppercase tracking-wider text-heading-text">
            {{ locale === 'tr' ? 'Hizmetlerimiz' : 'Our Services' }}
          </h3>
          <ul class="space-y-2">
            <li v-for="page in servicePages" :key="page.ID">
              <NuxtLink
                :to="localePath(`/services/${page.slug}`)"
                class="text-body text-sm transition-colors hover:text-primary-600"
              >
                {{ page.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="mb-3 font-space text-sm font-bold uppercase tracking-wider text-heading-text">
            {{ locale === 'tr' ? 'Hızlı Erişim' : 'Quick Links' }}
          </h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink :to="`${localePath('/')}#services`" class="text-body text-sm transition-colors hover:text-primary-600">
                {{ locale === 'tr' ? 'Hizmetler' : 'Services' }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/works')" class="text-body text-sm transition-colors hover:text-primary-600">
                {{ locale === 'tr' ? 'Projeler' : 'Works' }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="`${localePath('/')}#technologies`" class="text-body text-sm transition-colors hover:text-primary-600">
                {{ locale === 'tr' ? 'Teknolojiler' : 'Technologies' }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="`${localePath('/')}#contact`" class="text-body text-sm transition-colors hover:text-primary-600">
                {{ locale === 'tr' ? 'İletişim' : 'Contact' }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="flex flex-col items-center justify-between border-t border-border-color pt-6 md:flex-row">
        <p class="text-center text-sm text-heading-text">
          {{ footerData.centerText }}
        </p>
      </div>
    </AtomsContainer>
  </footer>
</template>
