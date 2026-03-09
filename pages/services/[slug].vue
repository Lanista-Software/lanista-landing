<script setup lang="ts">
import enServicePages from '../../contentrain/service-pages/en.json'
import trServicePages from '../../contentrain/service-pages/tr.json'
import enWorksItemsData from '../../contentrain/workitems/en.json'
import trWorksItemsData from '../../contentrain/workitems/tr.json'
import enWorkCategoriesData from '../../contentrain/workcategories/en.json'
import trWorkCategoriesData from '../../contentrain/workcategories/tr.json'

const { locale, t } = useI18n()
const route = useRoute()
const slug = route.params.slug as string

const page = computed(() => {
  const pages = locale.value === 'tr' ? trServicePages : enServicePages
  return pages.find(p => p.slug === slug)
})

const allPages = computed(() => {
  const pages = locale.value === 'tr' ? trServicePages : enServicePages
  return pages.filter(p => p.slug !== slug && p.status === 'publish').sort((a, b) => a.order - b.order)
})

const relatedWorks = computed(() => {
  if (!page.value?.relatedWorks) return []
  const works = locale.value === 'tr' ? trWorksItemsData : enWorksItemsData
  const categories = locale.value === 'tr' ? trWorkCategoriesData : enWorkCategoriesData
  return page.value.relatedWorks
    .map(id => works.find(w => w.ID === id))
    .filter(Boolean)
    .map(item => ({
      ...item,
      categoryName: categories.find(c => c.ID === item!.category)?.category || '',
    }))
})

const technologies = computed(() => {
  if (!page.value?.technologies) return []
  return page.value.technologies.split(',').map(t => t.trim())
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

const isEn = computed(() => locale.value === 'en')

useHead({
  htmlAttrs: { lang: locale.value },
  title: page.value.metaTitle,
  link: [
    { rel: 'canonical', href: `https://lanista.com.tr/services/${slug}` },
    { rel: 'alternate', hreflang: 'en', href: `https://lanista.com.tr/services/${slug}` },
    { rel: 'alternate', hreflang: 'tr', href: `https://lanista.com.tr/services/${slug}` },
    { rel: 'alternate', hreflang: 'x-default', href: `https://lanista.com.tr/services/${slug}` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: page.value.title,
        description: page.value.metaDescription,
        provider: {
          '@type': 'Organization',
          name: 'Lanista Software',
          url: 'https://lanista.com.tr',
        },
        serviceType: page.value.title,
        areaServed: 'Global',
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: 'https://lanista.com.tr/#contact',
        },
      }),
    },
  ],
})

useSeoMeta({
  title: page.value.metaTitle,
  description: page.value.metaDescription,
  ogTitle: page.value.metaTitle,
  ogDescription: page.value.metaDescription,
  ogType: 'website',
  ogSiteName: 'Lanista Software',
  ogImage: 'https://res.cloudinary.com/dmywgn45o/image/upload/v1729243091/lanista_og_chgpop.jpg',
  twitterCard: 'summary_large_image',
  twitterTitle: page.value.metaTitle,
  twitterDescription: page.value.metaDescription,
})
</script>

<template>
  <div v-if="page">
    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-primary-50 to-white">
      <AtomsContainer class="pt-32 pb-16 lg:pb-24">
        <div class="max-w-4xl">
          <NuxtLink
            to="/#services"
            class="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 mb-6 font-medium"
          >
            <i class="ri-arrow-left-line mr-1" />
            {{ isEn ? 'All Services' : 'Tüm Hizmetler' }}
          </NuxtLink>
          <h1 class="text-3xl lg:text-5xl font-bold font-space text-heading-text leading-tight">
            {{ page.title }}
          </h1>
          <p class="mt-6 text-lg lg:text-xl text-body font-inter leading-relaxed">
            {{ page.heroDescription }}
          </p>
        </div>
      </AtomsContainer>
    </section>

    <!-- Challenge Section -->
    <section class="py-16 lg:py-20">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="text-2xl lg:text-3xl font-bold font-space text-heading-text mb-6">
            {{ isEn ? 'The Challenge' : 'Zorluk' }}
          </h2>
          <p class="text-body font-inter leading-relaxed whitespace-pre-line">
            {{ page.challengeContent }}
          </p>
        </div>
      </AtomsContainer>
    </section>

    <!-- Approach Section -->
    <section class="py-16 lg:py-20 bg-secondary-50">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="text-2xl lg:text-3xl font-bold font-space text-heading-text mb-6">
            {{ isEn ? 'Our Approach' : 'Yaklaşımımız' }}
          </h2>
          <p class="text-body font-inter leading-relaxed whitespace-pre-line">
            {{ page.approachContent }}
          </p>
        </div>
      </AtomsContainer>
    </section>

    <!-- Technologies Section -->
    <section class="py-16 lg:py-20">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="text-2xl lg:text-3xl font-bold font-space text-heading-text mb-6">
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
    <section class="py-16 lg:py-20 bg-secondary-50">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="text-2xl lg:text-3xl font-bold font-space text-heading-text mb-6">
            {{ isEn ? 'Key Benefits' : 'Temel Avantajlar' }}
          </h2>
          <p class="text-body font-inter leading-relaxed whitespace-pre-line">
            {{ page.benefitsContent }}
          </p>
        </div>
      </AtomsContainer>
    </section>

    <!-- Related Projects Section -->
    <section v-if="relatedWorks.length" class="py-16 lg:py-20">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="text-2xl lg:text-3xl font-bold font-space text-heading-text mb-8">
            {{ isEn ? 'Related Projects' : 'İlgili Projeler' }}
          </h2>
          <div class="space-y-6">
            <div
              v-for="work in relatedWorks"
              :key="work!.ID"
              class="border border-border-color rounded-2xl p-6 lg:p-8"
            >
              <LuiTag color="primary" filter="lighten" size="lg" rounded="full" class="mb-3">
                {{ work!.categoryName }}
              </LuiTag>
              <h3 class="text-xl font-bold font-space text-heading-text mb-2">
                {{ work!.title }}
              </h3>
              <p class="text-body font-inter leading-relaxed line-clamp-3">
                {{ work!.description }}
              </p>
              <NuxtLink
                v-if="work!.link"
                :to="work!.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm"
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
    <section class="py-16 lg:py-20 bg-secondary-50">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="text-2xl lg:text-3xl font-bold font-space text-heading-text mb-8">
            {{ isEn ? 'Explore Our Other Services' : 'Diğer Hizmetlerimizi Keşfedin' }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NuxtLink
              v-for="otherPage in allPages"
              :key="otherPage.ID"
              :to="`/services/${otherPage.slug}`"
              class="border border-border-color rounded-xl p-5 bg-white hover:shadow-md transition-shadow"
            >
              <h3 class="text-lg font-bold font-space text-heading-text">
                {{ otherPage.title }}
              </h3>
              <p class="text-sm text-body mt-2 line-clamp-2">
                {{ otherPage.heroDescription }}
              </p>
            </NuxtLink>
          </div>
        </div>
      </AtomsContainer>
    </section>

    <!-- CTA Section -->
    <section class="py-16 lg:py-24">
      <AtomsContainer>
        <div class="max-w-4xl text-center mx-auto">
          <h2 class="text-2xl lg:text-3xl font-bold font-space text-heading-text mb-4">
            {{ isEn ? "Let's Build Together" : 'Birlikte İnşa Edelim' }}
          </h2>
          <p class="text-body font-inter mb-8">
            {{ isEn ? 'Ready to discuss your project? We\'d love to hear about your requirements.' : 'Projenizi tartışmaya hazır mısınız? Gereksinimlerinizi duymak isteriz.' }}
          </p>
          <NuxtLink to="/#contact">
            <LuiButton color="danger" rounded="full" size="xl">
              {{ isEn ? 'Contact Us' : 'İletişime Geçin' }}
            </LuiButton>
          </NuxtLink>
        </div>
      </AtomsContainer>
    </section>
  </div>
</template>
