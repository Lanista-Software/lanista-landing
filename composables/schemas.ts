const SITE_URL = "https://lanista.com.tr";

interface SchemaSource {
  services?: any[];
  faq?: any[];
  workItems?: any[];
  testimonials?: any[];
  socialLinks?: { link: string }[];
  metaTags?: Record<string, string>;
}

// Builds the homepage JSON-LD @graph from already-fetched Contentrain content.
// `data` comes from the /api/home server route (see pages/index.vue).
export const useSchemas = (data: Ref<SchemaSource | null | undefined>) => {
  const { locale } = useI18n();
  const socialLinks = computed<string[]>(() =>
    (data.value?.socialLinks || []).map(item => item.link)
  );
  const orgSchema = computed(() => [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Lanista Software",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      foundingDate: "2019",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+90-506-215-0700",
        contactType: "Customer Service",
        availableLanguage: ["Turkish", "English"],
      },
      sameAs: socialLinks.value,
    },
  ]);
  const serviceSchema = computed(() =>
    (data.value?.services || []).map(service => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.description,
      provider: {
        "@type": "Organization",
        name: "Lanista Software",
        url: SITE_URL,
      },
      serviceType: service.title,
      areaServed: "Global",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `${SITE_URL}/#contact`,
      },
    }))
  );
  const faqSchema = computed(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (data.value?.faq || []).map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }));
  const creativeWorkSchema = computed(() =>
    (data.value?.workItems || [])
      .filter(item => item.link)
      .map(item => ({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: item.title,
        description: item.description,
        ...(item.image ? { image: `${SITE_URL}${item.image}` } : {}),
        url: item.link,
        creator: {
          "@type": "Organization",
          name: "Lanista Software",
          url: SITE_URL,
        },
      }))
  );
  const softwareAppSchema = computed(() => {
    const isEn = locale.value === "en";
    return [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Contentrain",
        description: isEn
          ? "Git-native Headless CMS platform combining Git workflows with content management for developers and content creators."
          : "Git-native Headless CMS platformu. İçerik yönetimini Git workflow'ları üzerine kurar.",
        url: "https://contentrain.io/",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "Lanista Software", url: SITE_URL },
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Yanyana",
        description: isEn
          ? "Social game platform for weddings, corporate events, and social gatherings. Supports offline and online modes with 12+ game engines."
          : "Düğün, kurumsal etkinlik ve sosyal buluşmalar için sosyal oyun platformu. 12+ oyun motoru ile offline ve online modlar.",
        url: "https://yanyana.games",
        applicationCategory: "GameApplication",
        operatingSystem: "iOS, Android, Web",
        creator: { "@type": "Organization", name: "Lanista Software", url: SITE_URL },
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "LineDiff",
        description: isEn
          ? "AI-powered text and document comparison platform. Local-first, offline-capable with client-side encryption. Supports 10+ file formats."
          : "AI destekli metin ve doküman karşılaştırma platformu. Local-first, offline çalışabilir, istemci tarafı şifreleme. 10+ dosya formatı desteği.",
        url: "https://linediff.app",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "Lanista Software", url: SITE_URL },
      },
    ];
  });
  const webPageSchema = computed(() => {
    const mt = data.value?.metaTags || {};
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: mt.title,
      description: mt.description,
      url: SITE_URL,
      image: `${SITE_URL}/logo.svg`,
      inLanguage: locale.value === "tr" ? "tr-TR" : "en-US",
    };
  });
  const webSiteSchema = computed(() => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Lanista Software",
    url: SITE_URL,
    inLanguage: ["en", "tr"],
  }));
  const personSchema = computed(() => [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ahmet Bayramoğlu",
      jobTitle: "Co Founder",
      worksFor: { "@type": "Organization", name: "Lanista Software" },
      sameAs: [
        "https://www.linkedin.com/in/ahmet-bayhan-bayramo%C4%9Flu-746362111",
        "https://twitter.com/by_hun",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Sercan Oray",
      jobTitle: "Co Founder",
      worksFor: { "@type": "Organization", name: "Lanista Software" },
      sameAs: [
        "https://www.linkedin.com/in/sercanoray",
        "https://twitter.com/oraysercan",
      ],
    },
  ]);
  const reviewSchema = computed(() =>
    (data.value?.testimonials || []).map(testimonial => ({
      "@context": "https://schema.org",
      "@type": "Review",
      author: {
        "@type": "Person",
        name: testimonial.name,
        image: testimonial.image ? `${SITE_URL}${testimonial.image}` : undefined,
        jobTitle: testimonial.title,
      },
      reviewBody: testimonial.description,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      itemReviewed: {
        "@type": "Organization",
        name: "Lanista Software",
        logo: `${SITE_URL}/logo.svg`,
        sameAs: socialLinks.value,
      },
    }))
  );
  const contactPointSchema = computed(() => ({
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    telephone: "+90-506-215-0700",
    contactType: "Customer Service",
    areaServed: "TR",
    availableLanguage: ["Turkish", "English"],
  }));
  const fullSchema = computed(() =>
    JSON.stringify(
      {
        "@graph": [
          webPageSchema.value,
          webSiteSchema.value,
          ...orgSchema.value,
          ...serviceSchema.value,
          faqSchema.value,
          ...creativeWorkSchema.value,
          ...softwareAppSchema.value,
          ...personSchema.value,
          ...reviewSchema.value,
          contactPointSchema.value,
        ],
      },
      null,
      2
    )
  );
  return { fullSchema };
};
