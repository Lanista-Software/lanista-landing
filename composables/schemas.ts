import socialLinkData from "../contentrain/sociallinks/sociallinks.json";
import enServicesData from "../contentrain/services/en.json";
import trServicesData from "../contentrain/services/tr.json";
import trWorksItemsData from "../contentrain/workitems/tr.json";
import enWorksItemsData from "../contentrain/workitems/en.json";
import enTestimonialsData from "../contentrain/testimonail-items/en.json";
import trTestimonialsData from "../contentrain/testimonail-items/tr.json";
import enFaqItemsData from "../contentrain/faqitems/en.json";
import trFaqItemsData from "../contentrain/faqitems/tr.json";
import trMetaTags from "../contentrain/meta-tags/tr.json";
import enMetaTags from "../contentrain/meta-tags/en.json";

const SITE_URL = "https://lanista.com.tr";

export const useSchemas = () => {
  const { locale } = useI18n();
  const socialLinks = socialLinkData.map((item) => item.link);
  const orgSchema = [
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
      sameAs: socialLinks,
    },
  ];
  const serviceSchema = computed(() => {
    const services = locale.value === "tr" ? trServicesData : enServicesData;
    return services.map((service) => {
      return {
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
      };
    });
  });
  const faqSchema = computed(() => {
    const faqItems = locale.value === "tr" ? trFaqItemsData : enFaqItemsData;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => {
        return {
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        };
      }),
    };
  });
  const creativeWorkSchema = computed(() => {
    const workItems =
      locale.value === "tr" ? trWorksItemsData : enWorksItemsData;
    return workItems
      .filter((item) => item.link)
      .map((item) => {
        return {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: item.title,
          description: item.description,
          ...(item.image ? { image: `${SITE_URL}/${item.image}` } : {}),
          url: item.link,
          creator: {
            "@type": "Organization",
            name: "Lanista Software",
            url: SITE_URL,
          },
        };
      });
  });
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
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        creator: {
          "@type": "Organization",
          name: "Lanista Software",
          url: SITE_URL,
        },
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
        creator: {
          "@type": "Organization",
          name: "Lanista Software",
          url: SITE_URL,
        },
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
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        creator: {
          "@type": "Organization",
          name: "Lanista Software",
          url: SITE_URL,
        },
      },
    ];
  });
  const webPageSchema = computed(() => {
    const metaTags = locale.value === "tr" ? trMetaTags : enMetaTags;
    const title = metaTags.find((item) => item.name === "title");
    const description = metaTags.find((item) => item.name === "description");

    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title?.content,
      description: description?.content,
      url: SITE_URL,
      image: `${SITE_URL}/logo.svg`,
      inLanguage: locale.value === "tr" ? "tr-TR" : "en-US",
    };
  });
  const webSiteSchema = computed(() => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Lanista Software",
      url: SITE_URL,
      inLanguage: ["en", "tr"],
    };
  });
  const personSchema = computed(() => {
    return [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Ahmet Bayramoğlu",
        jobTitle: "Co Founder",
        worksFor: {
          "@type": "Organization",
          name: "Lanista Software",
        },
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
        worksFor: {
          "@type": "Organization",
          name: "Lanista Software",
        },
        sameAs: [
          "https://www.linkedin.com/in/sercanoray",
          "https://twitter.com/oraysercan",
        ],
      },
    ];
  });
  const reviewSchema = computed(() => {
    const testimonials =
      locale.value === "tr" ? trTestimonialsData : enTestimonialsData;
    return testimonials.map((testimonial) => {
      return {
        "@context": "https://schema.org",
        "@type": "Review",
        author: {
          "@type": "Person",
          name: testimonial.name,
          image: `${SITE_URL}/${testimonial.image}`,
          jobTitle: testimonial.title,
        },
        datePublished: new Date(testimonial.createdAt).toISOString(),
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
          sameAs: socialLinks,
        },
      };
    });
  });

  const contactPointSchema = computed(() => {
    return {
      "@context": "https://schema.org",
      "@type": "ContactPoint",
      telephone: "+90-506-215-0700",
      contactType: "Customer Service",
      areaServed: "TR",
      availableLanguage: ["Turkish", "English"],
    };
  });
  const fullSchema = computed(() => {
    return JSON.stringify(
      {
        "@graph": [
          webPageSchema.value,
          webSiteSchema.value,
          ...orgSchema,
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
    );
  });
  return {
    fullSchema,
  };
};
