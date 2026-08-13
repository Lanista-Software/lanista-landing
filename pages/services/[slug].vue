<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = route.params.slug as string

// Locale-keyed, no `watch`: /api/* is absent from the static build, so a
// client-side refetch 404s and would throw this page into its own 404 branch.
const { data, error } = await useAsyncData(
  `service-page-${slug}-${locale.value}`,
  () => $fetch(`/api/service-page/${slug}`, { query: { locale: locale.value } }),
)

if (error.value || !data.value?.page) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

const page = computed(() => data.value!.page)
const allPages = computed(() => data.value?.allPages || [])
const relatedWorks = computed(() => data.value?.relatedWorks || [])
const technologies = computed<string[]>(() => {
  const tech = page.value?.technologies
  return tech ? tech.split(',').map((t: string) => t.trim()) : []
})
const isEn = computed(() => locale.value === 'en')

useSeo({
  path: () => `/services/${slug}`,
  title: () => page.value?.meta_title ?? 'Lanista Software',
  description: () => clampDescription(page.value?.meta_description),
  ogCard: () => ({
    label: isEn.value ? 'Service' : 'Hizmet',
    title: page.value?.title ?? 'Lanista Software',
    description: clampDescription(page.value?.hero_description, 130),
  }),
  jsonLd: () => [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': page.value?.title,
      'description': page.value?.meta_description,
      'url': absoluteUrl(`/services/${slug}`, locale.value),
      'provider': {
        '@type': 'Organization',
        'name': 'Lanista Software',
        'url': SITE_URL,
      },
      'serviceType': page.value?.title,
      'areaServed': 'Global',
      'availableChannel': {
        '@type': 'ServiceChannel',
        'serviceUrl': `${absoluteUrl('/', locale.value)}#contact`,
      },
    },
    breadcrumbSchema(locale.value, [
      { name: isEn.value ? 'Home' : 'Ana Sayfa', path: '/' },
      { name: page.value?.title ?? slug, path: `/services/${slug}` },
    ]),
  ],
})
</script>

<template>
  <div v-if="page">
    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-primary-50 to-white">
      <AtomsContainer class="pb-16 pt-32 lg:pb-24">
        <div class="max-w-4xl">
          <NuxtLink
            :to="`${localePath('/')}#services`"
            class="mb-6 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <i class="ri-arrow-left-line mr-1" />
            {{ isEn ? 'All Services' : 'Tüm Hizmetler' }}
          </NuxtLink>
          <h1 class="font-space text-3xl font-bold leading-tight text-heading-text lg:text-5xl">
            {{ page.title }}
          </h1>
          <p class="text-body mt-6 font-inter text-lg leading-relaxed lg:text-xl">
            {{ page.hero_description }}
          </p>
        </div>
      </AtomsContainer>
    </section>

    <!-- Challenge Section -->
    <section class="py-16 lg:py-20">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="mb-6 font-space text-2xl font-bold text-heading-text lg:text-3xl">
            {{ isEn ? 'The Challenge' : 'Zorluk' }}
          </h2>
          <p class="text-body whitespace-pre-line font-inter leading-relaxed">
            {{ page.challenge_content }}
          </p>
        </div>
      </AtomsContainer>
    </section>

    <!-- Approach Section -->
    <section class="bg-secondary-50 py-16 lg:py-20">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="mb-6 font-space text-2xl font-bold text-heading-text lg:text-3xl">
            {{ isEn ? 'Our Approach' : 'Yaklaşımımız' }}
          </h2>
          <p class="text-body whitespace-pre-line font-inter leading-relaxed">
            {{ page.approach_content }}
          </p>
        </div>
      </AtomsContainer>
    </section>

    <!-- Technologies Section -->
    <section class="py-16 lg:py-20">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="mb-6 font-space text-2xl font-bold text-heading-text lg:text-3xl">
            {{ isEn ? 'Technologies We Use' : 'Kullandığımız Teknolojiler' }}
          </h2>
          <div class="flex flex-wrap gap-3">
            <LuiTag
              v-for="tech in technologies"
              :key="tech"
              color="primary"
              filter="lighten"
              size="xl"
              rounded="full"
            >
              {{ tech }}
            </LuiTag>
          </div>
        </div>
      </AtomsContainer>
    </section>

    <!-- Benefits Section -->
    <section class="bg-secondary-50 py-16 lg:py-20">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="mb-6 font-space text-2xl font-bold text-heading-text lg:text-3xl">
            {{ isEn ? 'Key Benefits' : 'Temel Avantajlar' }}
          </h2>
          <p class="text-body whitespace-pre-line font-inter leading-relaxed">
            {{ page.benefits_content }}
          </p>
        </div>
      </AtomsContainer>
    </section>

    <!-- Related Projects Section -->
    <section v-if="relatedWorks.length" class="py-16 lg:py-20">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="mb-8 font-space text-2xl font-bold text-heading-text lg:text-3xl">
            {{ isEn ? 'Related Projects' : 'İlgili Projeler' }}
          </h2>
          <div class="space-y-6">
            <div
              v-for="work in relatedWorks"
              :key="work.ID"
              class="rounded-2xl border border-border-color p-6 lg:p-8"
            >
              <LuiTag color="primary" filter="lighten" size="lg" rounded="full" class="mb-3">
                {{ work.categoryName }}
              </LuiTag>
              <h3 class="mb-2 font-space text-xl font-bold text-heading-text">
                {{ work.title }}
              </h3>
              <p class="text-body line-clamp-3 font-inter leading-relaxed">
                {{ work.description }}
              </p>
              <NuxtLink
                v-if="work.link"
                :to="work.link"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                {{ isEn ? 'View project' : 'Projeyi görüntüle' }}
                <i class="ri-arrow-right-up-line ml-1" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </AtomsContainer>
    </section>

    <!-- Other Services Section -->
    <section class="bg-secondary-50 py-16 lg:py-20">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="mb-8 font-space text-2xl font-bold text-heading-text lg:text-3xl">
            {{ isEn ? 'Explore Our Other Services' : 'Diğer Hizmetlerimizi Keşfedin' }}
          </h2>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <NuxtLink
              v-for="otherPage in allPages"
              :key="otherPage.ID"
              :to="localePath(`/services/${otherPage.slug}`)"
              class="rounded-xl border border-border-color bg-white p-5 transition-shadow hover:shadow-md"
            >
              <h3 class="font-space text-lg font-bold text-heading-text">
                {{ otherPage.title }}
              </h3>
              <p class="text-body mt-2 line-clamp-2 text-sm">
                {{ otherPage.hero_description }}
              </p>
            </NuxtLink>
          </div>
        </div>
      </AtomsContainer>
    </section>

    <!-- CTA Section -->
    <section class="py-16 lg:py-24">
      <AtomsContainer>
        <div class="mx-auto max-w-4xl text-center">
          <h2 class="mb-4 font-space text-2xl font-bold text-heading-text lg:text-3xl">
            {{ isEn ? "Let's Build Together" : 'Birlikte İnşa Edelim' }}
          </h2>
          <p class="text-body mb-8 font-inter">
            {{ isEn ? 'Ready to discuss your project? We\'d love to hear about your requirements.' : 'Projenizi tartışmaya hazır mısınız? Gereksinimlerinizi duymak isteriz.' }}
          </p>
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
