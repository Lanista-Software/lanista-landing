<script lang="ts" setup>
import socialLinks from "../../contentrain/sociallinks/sociallinks.json";
import enServicePages from "../../contentrain/service-pages/en.json";
import trServicePages from "../../contentrain/service-pages/tr.json";

const { locale } = useI18n();

const servicePages = computed(() => {
  const pages = locale.value === "tr" ? trServicePages : enServicePages;
  return pages
    .filter((p) => p.status === "publish")
    .sort((a, b) => a.order - b.order);
});

const footerData = {
  socials: socialLinks,
  logo: {
    link: "/",
    image: "/images/logo.svg",
  },
  centerText: "© 2021 Lanista. All rights reserved.",
};
</script>
<template>
  <footer class="border border-border-color">
    <AtomsContainer class="py-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Logo & Socials -->
        <div>
          <NuxtLink to="/" class="flex w-28 md:w-36 items-center space-x-2 h-6 mb-4">
            <AtomsLogo />
          </NuxtLink>
          <div class="space-x-4">
            <template v-for="social in footerData.socials" :key="social.link">
              <a
                :href="social.link"
                target="_blank"
                rel="noopener noreferrer"
                class="text-heading-text font-bold text-xl leading-none"
                :aria-label="social.icon"
              >
                <i :class="social.icon"></i>
              </a>
            </template>
          </div>
        </div>

        <!-- Services Links -->
        <div>
          <h3 class="text-sm font-bold font-space text-heading-text uppercase tracking-wider mb-3">
            {{ locale === 'tr' ? 'Hizmetlerimiz' : 'Our Services' }}
          </h3>
          <ul class="space-y-2">
            <li v-for="page in servicePages" :key="page.ID">
              <NuxtLink
                :to="`/services/${page.slug}`"
                class="text-sm text-body hover:text-primary-600 transition-colors"
              >
                {{ page.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-bold font-space text-heading-text uppercase tracking-wider mb-3">
            {{ locale === 'tr' ? 'Hızlı Erişim' : 'Quick Links' }}
          </h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/#services" class="text-sm text-body hover:text-primary-600 transition-colors">
                {{ locale === 'tr' ? 'Hizmetler' : 'Services' }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/#works" class="text-sm text-body hover:text-primary-600 transition-colors">
                {{ locale === 'tr' ? 'Projeler' : 'Works' }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/#technologies" class="text-sm text-body hover:text-primary-600 transition-colors">
                {{ locale === 'tr' ? 'Teknolojiler' : 'Technologies' }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/#contact" class="text-sm text-body hover:text-primary-600 transition-colors">
                {{ locale === 'tr' ? 'İletişim' : 'Contact' }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-border-color pt-6 flex flex-col md:flex-row items-center justify-between">
        <p class="text-center text-sm text-heading-text">
          {{ footerData.centerText }}
        </p>
      </div>
    </AtomsContainer>
  </footer>
</template>
