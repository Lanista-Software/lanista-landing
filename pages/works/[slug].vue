<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = route.params.slug as string
const isEn = computed(() => locale.value === 'en')

const { data, error } = await useAsyncData(
  `work-${slug}`,
  () => $fetch(`/api/work/${slug}`, { query: { locale: locale.value } }),
  { watch: [locale] },
)

if (error.value || !data.value?.work) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

const work = computed(() => data.value!.work)
const related = computed(() => data.value?.related || [])
const technologies = computed<string[]>(() => {
  const tech = work.value?.technologies
  return tech ? tech.split(',').map((t: string) => t.trim()).filter(Boolean) : []
})

const metaDescription = computed(() => {
  const d = work.value?.description || ''
  return d.length > 155 ? `${d.slice(0, 152)}...` : d
})

useHead({
  htmlAttrs: { lang: locale },
  title: () => `${work.value?.title} ${isEn.value ? 'Case Study' : 'Vaka Çalışması'} | Lanista Software`,
  link: [
    {
      rel: 'canonical',
      href: isEn.value
        ? `https://lanista.com.tr/works/${slug}/`
        : `https://lanista.com.tr/tr/works/${slug}/`,
    },
    { rel: 'alternate', hreflang: 'en', href: `https://lanista.com.tr/works/${slug}/` },
    { rel: 'alternate', hreflang: 'tr', href: `https://lanista.com.tr/tr/works/${slug}/` },
    { rel: 'alternate', hreflang: 'x-default', href: `https://lanista.com.tr/works/${slug}/` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: work.value?.title,
        description: work.value?.description,
        ...(work.value?.image ? { image: `https://lanista.com.tr${work.value.image}` } : {}),
        creator: { '@type': 'Organization', name: 'Lanista Software', url: 'https://lanista.com.tr' },
        ...(work.value?.link ? { sameAs: work.value.link } : {}),
      }),
    },
  ],
})
useSeoMeta({
  title: () => `${work.value?.title} ${isEn.value ? 'Case Study' : 'Vaka Çalışması'} | Lanista Software`,
  description: () => metaDescription.value,
  ogTitle: () => work.value?.title,
  ogDescription: () => metaDescription.value,
  ogType: 'article',
  ogSiteName: 'Lanista Software',
})
</script>

<template>
  <div v-if="work">
    <!-- Hero -->
    <section class="bg-gradient-to-b from-primary-50 to-white">
      <AtomsContainer class="pt-32 pb-16 lg:pb-20">
        <div class="max-w-4xl">
          <NuxtLink
            :to="localePath('/works')"
            class="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 mb-6 font-medium"
          >
            <i class="ri-arrow-left-line mr-1" />
            {{ isEn ? 'All Work' : 'Tüm Çalışmalar' }}
          </NuxtLink>
          <LuiTag v-if="work.categoryName" color="primary" filter="lighten" size="lg" rounded="full" class="mb-4">
            {{ work.categoryName }}
          </LuiTag>
          <h1 class="text-3xl lg:text-5xl font-bold font-space text-heading-text leading-tight">
            {{ work.title }}
          </h1>
          <p class="mt-6 text-lg lg:text-xl text-body font-inter leading-relaxed">
            {{ work.description }}
          </p>
          <div v-if="work.link" class="mt-8">
            <NuxtLink :to="work.link" target="_blank" rel="noopener noreferrer">
              <LuiButton color="danger" rounded="full">
                {{ isEn ? 'Visit live site' : 'Canlı siteyi ziyaret et' }}
                <template #append>
                  <i class="ri-arrow-right-up-line" />
                </template>
              </LuiButton>
            </NuxtLink>
          </div>
        </div>
      </AtomsContainer>
    </section>

    <!-- Cover image -->
    <section v-if="work.image" class="py-10 lg:py-12">
      <AtomsContainer>
        <div class="max-w-5xl mx-auto overflow-hidden rounded-2xl border border-border-color">
          <NuxtImg
            class="w-full h-full object-cover"
            :src="getStaticImagePath(work.image)"
            :alt="getImageAlt(work.image) || work.title"
            placeholder
            sizes="xs:100vw md:80vw"
            width="1024"
            height="512"
          />
        </div>
      </AtomsContainer>
    </section>

    <!-- Challenge -->
    <section v-if="work.challenge" class="py-12 lg:py-16">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="text-2xl lg:text-3xl font-bold font-space text-heading-text mb-5">
            {{ isEn ? 'The Challenge' : 'Zorluk' }}
          </h2>
          <p class="text-body font-inter leading-relaxed whitespace-pre-line">{{ work.challenge }}</p>
        </div>
      </AtomsContainer>
    </section>

    <!-- Solution -->
    <section v-if="work.solution" class="py-12 lg:py-16 bg-secondary-50">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="text-2xl lg:text-3xl font-bold font-space text-heading-text mb-5">
            {{ isEn ? 'Our Solution' : 'Çözümümüz' }}
          </h2>
          <p class="text-body font-inter leading-relaxed whitespace-pre-line">{{ work.solution }}</p>
        </div>
      </AtomsContainer>
    </section>

    <!-- Technologies -->
    <section v-if="technologies.length" class="py-12 lg:py-16">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="text-2xl lg:text-3xl font-bold font-space text-heading-text mb-5">
            {{ isEn ? 'Technologies' : 'Teknolojiler' }}
          </h2>
          <div class="flex flex-wrap gap-3">
            <LuiTag v-for="tech in technologies" :key="tech" color="primary" filter="lighten" size="lg" rounded="full">
              {{ tech }}
            </LuiTag>
          </div>
        </div>
      </AtomsContainer>
    </section>

    <!-- Outcome (filled by the client with real results) -->
    <section v-if="work.outcome" class="py-12 lg:py-16 bg-secondary-50">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="text-2xl lg:text-3xl font-bold font-space text-heading-text mb-5">
            {{ isEn ? 'Results' : 'Sonuçlar' }}
          </h2>
          <p class="text-body font-inter leading-relaxed whitespace-pre-line">{{ work.outcome }}</p>
        </div>
      </AtomsContainer>
    </section>

    <!-- Related work -->
    <section v-if="related.length" class="py-14 lg:py-20">
      <AtomsContainer>
        <div class="max-w-5xl mx-auto">
          <h2 class="text-2xl lg:text-3xl font-bold font-space text-heading-text mb-8">
            {{ isEn ? 'Related Work' : 'İlgili Çalışmalar' }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NuxtLink
              v-for="rel in related"
              :key="rel.ID"
              :to="localePath(`/works/${rel.slug}`)"
              class="group border border-border-color rounded-xl p-5 bg-white hover:shadow-md transition-shadow"
            >
              <LuiTag v-if="rel.categoryName" color="primary" filter="lighten" size="sm" rounded="full" class="mb-3">
                {{ rel.categoryName }}
              </LuiTag>
              <h3 class="text-lg font-bold font-space text-heading-text">{{ rel.title }}</h3>
              <p class="text-sm text-body mt-2 line-clamp-2">{{ rel.description }}</p>
            </NuxtLink>
          </div>
        </div>
      </AtomsContainer>
    </section>

    <!-- CTA -->
    <section class="py-16 lg:py-24 bg-secondary-50">
      <AtomsContainer>
        <div class="max-w-4xl text-center mx-auto">
          <h2 class="text-2xl lg:text-3xl font-bold font-space text-heading-text mb-4">
            {{ isEn ? "Let's Build Together" : 'Birlikte İnşa Edelim' }}
          </h2>
          <p class="text-body font-inter mb-8">
            {{ isEn ? 'Have a similar project? We would love to hear about it.' : 'Benzer bir projeniz mi var? Duymak isteriz.' }}
          </p>
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
