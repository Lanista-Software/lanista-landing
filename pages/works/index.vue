<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const isEn = computed(() => locale.value === 'en')

const { data: works } = await useAsyncData(
  'works-list',
  () => $fetch('/api/works', { query: { locale: locale.value } }),
  { watch: [locale] },
)

const title = computed(() => (isEn.value ? 'Our Work & Case Studies' : 'Çalışmalarımız ve Vaka Çalışmaları'))
const description = computed(() =>
  isEn.value
    ? 'Selected projects we have designed and built since 2018 — web, mobile, SaaS, microservices and more.'
    : '2018\'den bu yana tasarlayıp geliştirdiğimiz seçili projeler — web, mobil, SaaS, mikroservis ve daha fazlası.',
)

useHead({
  htmlAttrs: { lang: locale },
  title: () => `${title.value} | Lanista Software`,
  link: [
    {
      rel: 'canonical',
      href: isEn.value ? 'https://lanista.com.tr/works/' : 'https://lanista.com.tr/tr/works/',
    },
    { rel: 'alternate', hreflang: 'en', href: 'https://lanista.com.tr/works/' },
    { rel: 'alternate', hreflang: 'tr', href: 'https://lanista.com.tr/tr/works/' },
    { rel: 'alternate', hreflang: 'x-default', href: 'https://lanista.com.tr/works/' },
  ],
})
useSeoMeta({
  title: () => `${title.value} | Lanista Software`,
  description: () => description.value,
  ogTitle: () => title.value,
  ogDescription: () => description.value,
  ogType: 'website',
  ogSiteName: 'Lanista Software',
})
</script>

<template>
  <div>
    <section class="bg-gradient-to-b from-primary-50 to-white">
      <AtomsContainer class="pt-32 pb-12 lg:pb-16">
        <div class="max-w-3xl">
          <h1 class="text-3xl lg:text-5xl font-bold font-space text-heading-text leading-tight">
            {{ title }}
          </h1>
          <p class="mt-5 text-lg text-body font-inter leading-relaxed">
            {{ description }}
          </p>
        </div>
      </AtomsContainer>
    </section>

    <section class="py-12 lg:py-16">
      <AtomsContainer>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="work in works"
            :key="work.ID"
            :to="localePath(`/works/${work.slug}`)"
            class="group border border-border-color rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow flex flex-col"
          >
            <div v-if="work.image" class="overflow-hidden aspect-[2/1] bg-secondary-50">
              <NuxtImg
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                :src="getStaticImagePath(work.image)"
                :alt="getImageAlt(work.image) || work.title"
                placeholder
                loading="lazy"
                sizes="xs:100vw sm:50vw md:33vw"
                width="440"
                height="220"
              />
            </div>
            <div class="p-5 flex flex-col flex-1">
              <LuiTag v-if="work.categoryName" color="primary" filter="lighten" size="sm" rounded="full" class="mb-3 self-start">
                {{ work.categoryName }}
              </LuiTag>
              <h2 class="text-lg font-bold font-space text-heading-text">
                {{ work.title }}
              </h2>
              <p class="text-sm text-body mt-2 line-clamp-3 flex-1">
                {{ work.description }}
              </p>
              <span class="inline-flex items-center mt-4 text-sm text-primary-600 font-medium">
                {{ isEn ? 'View case study' : 'Vaka çalışması' }}
                <i class="ri-arrow-right-line ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </NuxtLink>
        </div>
      </AtomsContainer>
    </section>

    <section class="py-16 lg:py-20 bg-secondary-50">
      <AtomsContainer>
        <div class="max-w-3xl text-center mx-auto">
          <h2 class="text-2xl lg:text-3xl font-bold font-space text-heading-text mb-4">
            {{ isEn ? 'Have a project in mind?' : 'Aklınızda bir proje mi var?' }}
          </h2>
          <NuxtLink :to="localePath('/') + '#contact'">
            <LuiButton color="danger" rounded="full" size="xl">
              {{ isEn ? 'Contact Us' : 'İletişime Geçin' }}
            </LuiButton>
          </NuxtLink>
        </div>
      </AtomsContainer>
    </section>
  </div>
</template>
