<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = route.params.slug as string
const isEn = computed(() => locale.value === 'en')

// Locale-keyed, no `watch`: /api/* is absent from the static build, so a
// client-side refetch 404s and would throw this page into its own 404 branch.
const { data, error } = await useAsyncData(
  `work-${slug}-${locale.value}`,
  () => $fetch(`/api/work/${slug}`, { query: { locale: locale.value } }),
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

const metaDescription = computed(() => clampDescription(work.value?.description))
const pageTitle = computed(
  () => `${work.value?.title} ${isEn.value ? 'Case Study' : 'Vaka Çalışması'} | Lanista Software`,
)

useSeo({
  path: () => `/works/${slug}`,
  title: () => pageTitle.value,
  description: () => metaDescription.value,
  ogTitle: () => work.value?.title ?? pageTitle.value,
  type: 'article',
  ogCard: () => ({
    label: work.value?.categoryName || (isEn.value ? 'Case Study' : 'Vaka Çalışması'),
    title: work.value?.title ?? slug,
    description: clampDescription(work.value?.description, 130),
  }),
  jsonLd: () => [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      'name': work.value?.title,
      'description': work.value?.description,
      'url': absoluteUrl(`/works/${slug}`, locale.value),
      'inLanguage': isEn.value ? 'en-US' : 'tr-TR',
      ...(work.value?.image ? { image: absoluteAsset(work.value.image) } : {}),
      'creator': { '@type': 'Organization', 'name': 'Lanista Software', 'url': SITE_URL },
      ...(work.value?.link ? { sameAs: work.value.link } : {}),
      ...(technologies.value.length ? { keywords: technologies.value.join(', ') } : {}),
    },
    breadcrumbSchema(locale.value, [
      { name: isEn.value ? 'Home' : 'Ana Sayfa', path: '/' },
      { name: isEn.value ? 'Work' : 'Çalışmalar', path: '/works' },
      { name: work.value?.title ?? slug, path: `/works/${slug}` },
    ]),
  ],
})
</script>

<template>
  <div v-if="work">
    <!-- Hero -->
    <section class="bg-gradient-to-b from-primary-50 to-white">
      <AtomsContainer class="pb-16 pt-32 lg:pb-20">
        <div class="max-w-4xl">
          <NuxtLink
            :to="localePath('/works')"
            class="mb-6 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <i class="ri-arrow-left-line mr-1" />
            {{ isEn ? 'All Work' : 'Tüm Çalışmalar' }}
          </NuxtLink>
          <LuiTag v-if="work.categoryName" color="primary" filter="lighten" size="lg" rounded="full" class="mb-4">
            {{ work.categoryName }}
          </LuiTag>
          <h1 class="font-space text-3xl font-bold leading-tight text-heading-text lg:text-5xl">
            {{ work.title }}
          </h1>
          <p class="text-body mt-6 font-inter text-lg leading-relaxed lg:text-xl">
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
        <div class="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border-color">
          <NuxtImg
            class="size-full object-cover"
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
          <h2 class="mb-5 font-space text-2xl font-bold text-heading-text lg:text-3xl">
            {{ isEn ? 'The Challenge' : 'Zorluk' }}
          </h2>
          <p class="text-body whitespace-pre-line font-inter leading-relaxed">
            {{ work.challenge }}
          </p>
        </div>
      </AtomsContainer>
    </section>

    <!-- Solution -->
    <section v-if="work.solution" class="bg-secondary-50 py-12 lg:py-16">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="mb-5 font-space text-2xl font-bold text-heading-text lg:text-3xl">
            {{ isEn ? 'Our Solution' : 'Çözümümüz' }}
          </h2>
          <p class="text-body whitespace-pre-line font-inter leading-relaxed">
            {{ work.solution }}
          </p>
        </div>
      </AtomsContainer>
    </section>

    <!-- Technologies -->
    <section v-if="technologies.length" class="py-12 lg:py-16">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="mb-5 font-space text-2xl font-bold text-heading-text lg:text-3xl">
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
    <section v-if="work.outcome" class="bg-secondary-50 py-12 lg:py-16">
      <AtomsContainer>
        <div class="max-w-4xl">
          <h2 class="mb-5 font-space text-2xl font-bold text-heading-text lg:text-3xl">
            {{ isEn ? 'Results' : 'Sonuçlar' }}
          </h2>
          <p class="text-body whitespace-pre-line font-inter leading-relaxed">
            {{ work.outcome }}
          </p>
        </div>
      </AtomsContainer>
    </section>

    <!-- Related work -->
    <section v-if="related.length" class="py-14 lg:py-20">
      <AtomsContainer>
        <div class="mx-auto max-w-5xl">
          <h2 class="mb-8 font-space text-2xl font-bold text-heading-text lg:text-3xl">
            {{ isEn ? 'Related Work' : 'İlgili Çalışmalar' }}
          </h2>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
            <NuxtLink
              v-for="rel in related"
              :key="rel.ID"
              :to="localePath(`/works/${rel.slug}`)"
              class="group rounded-xl border border-border-color bg-white p-5 transition-shadow hover:shadow-md"
            >
              <LuiTag v-if="rel.categoryName" color="primary" filter="lighten" size="sm" rounded="full" class="mb-3">
                {{ rel.categoryName }}
              </LuiTag>
              <h3 class="font-space text-lg font-bold text-heading-text">
                {{ rel.title }}
              </h3>
              <p class="text-body mt-2 line-clamp-2 text-sm">
                {{ rel.description }}
              </p>
            </NuxtLink>
          </div>
        </div>
      </AtomsContainer>
    </section>

    <!-- CTA -->
    <section class="bg-secondary-50 py-16 lg:py-24">
      <AtomsContainer>
        <div class="mx-auto max-w-4xl text-center">
          <h2 class="mb-4 font-space text-2xl font-bold text-heading-text lg:text-3xl">
            {{ isEn ? "Let's Build Together" : 'Birlikte İnşa Edelim' }}
          </h2>
          <p class="text-body mb-8 font-inter">
            {{ isEn ? 'Have a similar project? We would love to hear about it.' : 'Benzer bir projeniz mi var? Duymak isteriz.' }}
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
