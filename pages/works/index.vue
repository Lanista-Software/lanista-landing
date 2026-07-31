<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const isEn = computed(() => locale.value === 'en')

// Locale-keyed, no `watch`: /api/* is absent from the static build, so a
// client-side refetch 404s and empties the list. See pages/index.vue.
const { data: works } = await useAsyncData(
  `works-list-${locale.value}`,
  () => $fetch('/api/works', { query: { locale: locale.value } }),
)

const title = computed(() => (isEn.value ? 'Our Work & Case Studies' : 'Çalışmalarımız ve Vaka Çalışmaları'))
const description = computed(() =>
  isEn.value
    ? 'Selected projects we have designed and built since 2018 — web, mobile, SaaS, microservices and more.'
    : '2018\'den bu yana tasarlayıp geliştirdiğimiz seçili projeler — web, mobil, SaaS, mikroservis ve daha fazlası.',
)

useSeo({
  path: () => '/works',
  title: () => `${title.value} | Lanista Software`,
  description: () => clampDescription(description.value),
  ogTitle: () => title.value,
  ogCard: () => ({
    label: isEn.value ? 'Case Studies' : 'Vaka Çalışmaları',
    title: title.value,
    description: description.value,
  }),
  jsonLd: () => [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': title.value,
      'description': description.value,
      'url': absoluteUrl('/works', locale.value),
      'inLanguage': isEn.value ? 'en-US' : 'tr-TR',
      'mainEntity': {
        '@type': 'ItemList',
        'numberOfItems': (works.value || []).length,
        'itemListElement': (works.value || []).map((work, i) => ({
          '@type': 'ListItem',
          'position': i + 1,
          'name': work.title,
          'url': absoluteUrl(`/works/${work.slug}`, locale.value),
        })),
      },
    },
    breadcrumbSchema(locale.value, [
      { name: isEn.value ? 'Home' : 'Ana Sayfa', path: '/' },
      { name: isEn.value ? 'Work' : 'Çalışmalar', path: '/works' },
    ]),
  ],
})
</script>

<template>
  <div>
    <section class="bg-gradient-to-b from-primary-50 to-white">
      <AtomsContainer class="pb-12 pt-32 lg:pb-16">
        <div class="max-w-3xl">
          <h1 class="font-space text-3xl font-bold leading-tight text-heading-text lg:text-5xl">
            {{ title }}
          </h1>
          <p class="text-body mt-5 font-inter text-lg leading-relaxed">
            {{ description }}
          </p>
        </div>
      </AtomsContainer>
    </section>

    <section class="py-12 lg:py-16">
      <AtomsContainer>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="work in works"
            :key="work.ID"
            :to="localePath(`/works/${work.slug}`)"
            class="group flex flex-col overflow-hidden rounded-2xl border border-border-color bg-white transition-shadow hover:shadow-md"
          >
            <div v-if="work.image" class="aspect-[2/1] overflow-hidden bg-secondary-50">
              <NuxtImg
                class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                :src="getStaticImagePath(work.image)"
                :alt="getImageAlt(work.image) || work.title"
                placeholder
                loading="lazy"
                sizes="xs:100vw sm:50vw md:33vw"
                width="440"
                height="220"
              />
            </div>
            <div class="flex flex-1 flex-col p-5">
              <LuiTag v-if="work.categoryName" color="primary" filter="lighten" size="sm" rounded="full" class="mb-3 self-start">
                {{ work.categoryName }}
              </LuiTag>
              <h2 class="font-space text-lg font-bold text-heading-text">
                {{ work.title }}
              </h2>
              <p class="text-body mt-2 line-clamp-3 flex-1 text-sm">
                {{ work.description }}
              </p>
              <span class="mt-4 inline-flex items-center text-sm font-medium text-primary-600">
                {{ isEn ? 'View case study' : 'Vaka çalışması' }}
                <i class="ri-arrow-right-line ml-1 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </NuxtLink>
        </div>
      </AtomsContainer>
    </section>

    <section class="bg-secondary-50 py-16 lg:py-20">
      <AtomsContainer>
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="mb-4 font-space text-2xl font-bold text-heading-text lg:text-3xl">
            {{ isEn ? 'Have a project in mind?' : 'Aklınızda bir proje mi var?' }}
          </h2>
          <NuxtLink :to="`${localePath('/')}#contact`">
            <LuiButton color="danger" rounded="full" size="xl">
              {{ isEn ? 'Contact Us' : 'İletişime Geçin' }}
            </LuiButton>
          </NuxtLink>
        </div>
      </AtomsContainer>
    </section>
  </div>
</template>
