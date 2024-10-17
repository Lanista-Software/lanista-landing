import socialLinkData from '../contentrain/sociallinks/sociallinks.json';
import enServicesData from "../contentrain/services/en.json";
import trServicesData from "../contentrain/services/tr.json";
import trWorksItemsData from "../contentrain/workitems/tr.json";
import enWorksItemsData from "../contentrain/workitems/en.json";
import enTestimonialsData from "../contentrain/testimonialitems/en.json";
import trTestimonialsData from "../contentrain/testimonialitems/tr.json";
import enFaqItemsData from "../contentrain/faqitems/en.json";
import trFaqItemsData from "../contentrain/faqitems/tr.json";
import trMetaTags from "../contentrain/meta-tags/tr.json";
import enMetaTags from "../contentrain/meta-tags/en.json";

export const useSchemas = () => {

    const { locale } = useI18n();
    const socialLinks = socialLinkData.map((item) => item.link);
    const orgSchema = [
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Lanista Software",
            "url": "https://lanista.com.tr",
            "logo": "https://lanista.com.tr/logo.svg",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+90-432-502-8500",
                "contactType": "Customer Service"
            },
            "sameAs": socialLinks
        }
    ];
    const serviceSchema = computed(() => {
        const services = locale.value === "tr" ? trServicesData : enServicesData;
        return services.map((service) => {
            return {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": service.title,
                "description": service.description,
                "provider": {
                    "@type": "Organization",
                    "name": "Lanista Software",
                    "url": "https://lanista.com.tr"
                },
                "serviceType": service.title,
                "areaServed": "Global",
                "availableChannel": {
                    "@type": "ServiceChannel",
                    "serviceUrl": "https://lanista.com.tr/#contact"
                }
            }
        });
    });
    const faqSchema = computed(() => {
        const faqItems = locale.value === "tr" ? trFaqItemsData : enFaqItemsData;
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map((item) => {
                return {
                    "@type": "Question",
                    "name": item.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item.answer
                    }
                }
            })
        };
    });
    const creativeWorkSchema = computed(() => {
        const workItems = locale.value === "tr" ? trWorksItemsData : enWorksItemsData;
        return workItems.map((item) => {
            return {
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                "name": item.title,
                "description": item.description,
                "image":`https://lanista.com.tr/${item.image}`,
                "url": item.link
            }
        });
    });
    const webPageSchema = computed(() => {
        const metaTags = locale.value === "tr" ? trMetaTags : enMetaTags;
        const title = metaTags.find((item) => item.name === "title");
        const description = metaTags.find((item) => item.name === "description");

        return {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title?.content,
            "description": description?.content,
            "url": "https://lanista.com.tr",
            "image": "https://lanista.com.tr/logo.svg"
        }
    });
    const webSiteSchema = computed(() => {
        return {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://lanista.com.tr",
        }
    });
    const personSchema = computed(() => {
        return [{
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ahmet Bayramoğlu",
            "jobTitle": "Co Founder",
            "worksFor": {
                "@type": "Organization",
                "name": "Lanista Software"
            },
            "sameAs": [
                "https://www.linkedin.com/in/ahmet-bayhan-bayramo%C4%9Flu-746362111",
                "https://twitter.com/by_hun"
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Sercan Oray",
            "jobTitle": "CO Founder",
            "worksFor": {
                "@type": "Organization",
                "name": "Lanista Software"
            },
            "sameAs": [
                "https://www.linkedin.com/in/sercanoray",
                "https://twitter.com/oraysercan"
            ]
        }]
    });
    const reviewSchema = computed(() => {
        const testimonials = locale.value === "tr" ? trTestimonialsData : enTestimonialsData;
        return testimonials.map((testimonial) => {
            return {
                "@context": "https://schema.org",
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": testimonial.name,
                    "image":`https://lanista.com.tr/${testimonial.image}`,
                    "jobTitle": testimonial.title
                },
                "datePublished": new Date(testimonial.createdAt).toISOString(),
                "reviewBody": testimonial.description,
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                }
            };
        });
    });
    const contactPointSchema = computed(() => {
        return {
            "@context": "https://schema.org",
            "@type": "ContactPoint",
            "telephone": "+90-432-502-8500",
            "contactType": "Customer Service",
            "areaServed": "TR",
            "availableLanguage": ["Turkish", "English"]
        };
    });
    const fullSchema = computed(() => {
        return JSON.stringify({
            "@graph": [
                webPageSchema.value,
                webSiteSchema.value,
                ...orgSchema,
                ...serviceSchema.value,
                faqSchema.value,
                ...creativeWorkSchema.value,
                ...personSchema.value,
                ...reviewSchema.value,
                contactPointSchema.value
            ]
        }, null, 2);
    }
    );
    return {
        fullSchema
    }
}