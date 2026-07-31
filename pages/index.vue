<script setup lang="ts">
import type { AppCardProps } from '~/components/mol/AppCard.vue'
import type { TestimonialCardProps } from '~/components/mol/TestimonialCard.vue'
import type { WorksCardProps } from '~/components/mol/WorksCard.vue'
import type { CardSectionProps } from '~/components/templates/CardSection.vue'
import type { ContactProps, Faq } from '~/components/templates/Contact.vue'
import type {
  TabItem,
  TabSectionProps,
  TWorkCategory,
} from '~/components/templates/TabSection.vue'
import useScrollLock from '~/composables/scrollLock'

const { locale } = useI18n()
const localePath = useLocalePath()

// All homepage content for the active locale, fetched server-side from Contentrain.
// The key carries the locale and there is deliberately no `watch`: /api/* does not
// exist in the static build, so re-running the fetch on the client 404s and wipes
// the page. Each prerendered route ships its own locale's data in _payload.json.
const { data } = await useAsyncData(
  `home-${locale.value}`,
  () => $fetch('/api/home', { query: { locale: locale.value } }),
)

// Content stores bare hashes ("#contact"). Anchoring them to the localized home
// path keeps TR links on /tr/#contact instead of /tr#contact (which the host 301s).
function localLink(link?: string): string {
  if (!link)
    return ''
  return link.startsWith('#') ? `${localePath('/')}${link}` : localePath(link)
}

const sectionsByName = computed<Record<string, any>>(() => {
  const map: Record<string, any> = {}
  for (const s of data.value?.sections || []) map[s.name] = s
  return map
})
const section = (name: string) => sectionsByName.value[name] || {}

// Server payload (SDK types) is bridged to the existing component prop types.
const serviceItems = computed<AppCardProps[]>(() =>
  ((data.value?.services as unknown as AppCardProps[]) || []).map(s => ({
    ...s,
    link: s.link ? localePath(s.link) : s.link,
  })),
)
const processItems = computed<AppCardProps[]>(() => (data.value?.processes as unknown as AppCardProps[]) || [])
const tabItems = computed<TabItem[]>(() => (data.value?.tabItems as unknown as TabItem[]) || [])
const worksCategories = computed<TWorkCategory[]>(() => (data.value?.workCategories as unknown as TWorkCategory[]) || [])
const workItems = computed<WorksCardProps[]>(() => (data.value?.workItems as unknown as WorksCardProps[]) || [])
const testimonials = computed<TestimonialCardProps[]>(() => (data.value?.testimonials as unknown as TestimonialCardProps[]) || [])
const faqItems = computed<Faq[]>(() => (data.value?.faq as unknown as Faq[]) || [])
const references = computed(() => data.value?.references || [])
const heroSection = computed(() => {
  const hero = section('hero')
  return { ...hero, buttonlink: localLink(hero.buttonlink) }
})

// Work items arrive sorted by `order` with `category` resolved to its name (server route).
// The homepage previews a few; the full list lives on /works.
const workItemWithCategories = computed(() => workItems.value.slice(0, 3))

const serviceCardProps = computed<CardSectionProps>(() => ({
  items: serviceItems.value,
  view: 'grid',
  title: section('services').title,
  description: section('services').description,
  cardComponent: 'app',
  button: {
    text: section('services').buttontext,
    link: localLink(section('services').buttonlink),
  },
}))
const processCardProps = computed<CardSectionProps>(() => ({
  items: processItems.value,
  view: 'triple',
  title: section('process').title,
  description: section('process').description,
  cardComponent: 'app',
  button: {
    text: section('process').buttontext,
    link: localLink(section('process').buttonlink),
  },
}))
const tabSectionProps = computed<TabSectionProps>(() => ({
  items: tabItems.value,
  title: section('tabs').title,
  description: section('tabs').description,
  categories: worksCategories.value,
  button: {
    text: section('tabs').buttontext,
    link: localLink(section('tabs').buttonlink),
  },
}))
const worksSectionProps = computed<CardSectionProps>(() => ({
  items: workItemWithCategories.value,
  view: 'single',
  title: section('works').title,
  description: section('works').description,
  button: {
    text: section('works').buttontext,
    link: localLink(section('works').buttonlink),
  },
  cardComponent: 'works',
}))
const bannerSection = computed(() => ({
  title: section('banner').title,
  description: section('banner').description,
  buttonText: section('banner').buttontext,
  buttonLink: localLink(section('banner').buttonlink),
}))
const testimonialsSectionProps = computed<CardSectionProps>(() => ({
  items: testimonials.value,
  view: 'triple',
  title: section('testimonials').title,
  description: section('testimonials').description,
  cardComponent: 'testimonial',
  button: {
    text: section('testimonials').buttontext,
    link: localLink(section('testimonials').buttonlink),
  },
}))
const contactAndFaqSectionProps = computed<ContactProps>(() => ({
  faqList: faqItems.value,
  sections: {
    contact: {
      title: section('contact').title,
      description: section('contact').description,
    },
    faq: {
      title: section('faq').title,
      description: section('faq').description,
    },
  },
}))

const route = useRoute()
const router = useRouter()
const { isScrollLocked } = useScrollLock()

const { graph } = useSchemas(data)
const meta = computed<Record<string, string>>(
  () => (data.value?.metaTags as Record<string, string>) || {},
)
useSeo({
  path: () => '/',
  title: () => meta.value.title || 'Lanista Software',
  description: () => clampDescription(meta.value.description),
  ogTitle: () => meta.value.ogTitle || meta.value.title || 'Lanista Software',
  ogDescription: () => clampDescription(meta.value.ogDescription || meta.value.description),
  ogCard: () => ({
    label: locale.value === 'tr' ? 'Yazılım Geliştirme' : 'Software Development',
    title: meta.value.ogTitle || meta.value.title || 'Lanista Software',
    description: clampDescription(meta.value.ogDescription || meta.value.description, 130),
  }),
  jsonLd: () => graph.value,
})
function handleSectionViewed(id: string) {
  const routeHash = route.hash
  const idWithHash = `#${id}`
  if (routeHash !== idWithHash && !isScrollLocked.value) {
    router.push({ hash: idWithHash })
  }
}
</script>

<template>
  <div>
    <!-- Home Section -->
    <div class="aspect-auto bg-[url('/1727359111545_1624068421380_hero.png')] bg-cover bg-center">
      <AtomsContainer class="flex items-center justify-center pb-40 pt-28">
        <TemplatesHero :hero="heroSection" :references="references" />
      </AtomsContainer>
    </div>
    <!-- Services Section -->
    <MolAppSection id="services" @viewed="handleSectionViewed">
      <TemplatesCardSection v-bind="serviceCardProps" :close-padding="true" />
    </MolAppSection>
    <!-- Process Section -->
    <MolAppSection id="process" @viewed="handleSectionViewed">
      <TemplatesCardSection v-bind="processCardProps" />
    </MolAppSection>
    <!-- Technologies Section -->
    <MolAppSection id="technologies" @viewed="handleSectionViewed">
      <TemplatesTabSection v-bind="tabSectionProps" />
    </MolAppSection>
    <!-- Works Section -->
    <MolAppSection id="works" @viewed="handleSectionViewed">
      <TemplatesCardSection v-bind="worksSectionProps">
        <template #button>
          <NuxtLink :to="localePath('/works')">
            <LuiButton variant="link" color="primary">
              {{ section("works").buttontext || (locale === 'tr' ? 'Tüm çalışmaları gör' : 'View all work') }}
            </LuiButton>
          </NuxtLink>
        </template>
      </TemplatesCardSection>
    </MolAppSection>
    <!-- Testimonials Section -->
    <MolAppSection id="testimonials">
      <TemplatesCardSection v-bind="testimonialsSectionProps" disable-button>
      </TemplatesCardSection>
    </MolAppSection>
    <MolAppSection id="banner">
      <TemplatesBanner
        :title="bannerSection.title" :description="bannerSection.description"
        :button-label="bannerSection.buttonText" :button-link="bannerSection.buttonLink"
      />
    </MolAppSection>
    <MolAppSection id="footer" class="bg-secondary-50">
      <TemplatesContact v-bind="contactAndFaqSectionProps" />
    </MolAppSection>
  </div>
</template>
