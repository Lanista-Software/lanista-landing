import type { Locale } from './i18n'
import { COMPANY } from './company'
import { IN_LANGUAGE } from './i18n'
import { absoluteAsset, absoluteUrl, SITE_NAME, SITE_URL } from './seo'

export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

/** The seller. Referenced by @id from products, services and pages. */
export function organizationSchema(sameAs: string[] = []) {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    'name': SITE_NAME,
    'alternateName': COMPANY.brand,
    'legalName': COMPANY.legalName,
    'url': SITE_URL,
    'logo': `${SITE_URL}/logo.svg`,
    'foundingDate': COMPANY.foundingDate,
    'email': COMPANY.email,
    'telephone': COMPANY.phoneSchema,
    'taxID': COMPANY.taxNumber,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': COMPANY.address.street,
      'addressLocality': COMPANY.address.district,
      'addressRegion': COMPANY.address.city,
      'addressCountry': COMPANY.address.countryCode,
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': COMPANY.phoneSchema,
      'email': COMPANY.email,
      'contactType': 'customer service',
      'areaServed': 'TR',
      'availableLanguage': ['Turkish', 'English'],
    },
    'sameAs': sameAs,
    'areaServed': { '@type': 'Country', 'name': 'Türkiye' },
    'knowsAbout': ['Veresiye ve cari takip yazılımı', 'Mobil uygulama geliştirme', 'Web sitesi ve e-ticaret', 'Özel yazılım geliştirme', 'Ödeme entegrasyonu', 'POS uygulamaları', 'SaaS', 'Yapay zekâ destekli yazılım'],
  }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    'name': SITE_NAME,
    'url': SITE_URL,
    'inLanguage': ['tr-TR', 'en-US'],
    'publisher': { '@id': ORG_ID },
  }
}

export function webPageSchema(locale: Locale, path: string, name: string, description: string, type = 'WebPage') {
  return {
    '@type': type,
    '@id': `${absoluteUrl(path, locale)}#webpage`,
    'url': absoluteUrl(path, locale),
    'name': name,
    'description': description,
    'inLanguage': IN_LANGUAGE[locale],
    'isPartOf': { '@id': WEBSITE_ID },
    'publisher': { '@id': ORG_ID },
  }
}

export function serviceSchema(locale: Locale, s: { title: string, description?: string, path?: string, areaServed?: string[] }) {
  return {
    '@type': 'Service',
    'name': s.title,
    'description': s.description,
    ...(s.path ? { url: absoluteUrl(s.path, locale) } : {}),
    'serviceType': s.title,
    'provider': { '@id': ORG_ID },
    'areaServed': s.areaServed?.length ? s.areaServed.map(name => ({ '@type': 'Place', name })) : 'Worldwide',
  }
}

/** The real office (Van Teknokent). Only for the page of the city we are in. */
export function localBusinessSchema(locale: Locale, p: { name: string, description?: string, path: string, areaServed?: string[] }) {
  return {
    '@type': 'ProfessionalService',
    '@id': `${absoluteUrl(p.path, locale)}#localbusiness`,
    'name': `${SITE_NAME} — ${p.name}`,
    'description': p.description,
    'url': absoluteUrl(p.path, locale),
    'image': `${SITE_URL}/logo.svg`,
    'telephone': COMPANY.phoneSchema,
    'email': COMPANY.email,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': COMPANY.address.street,
      'addressLocality': COMPANY.address.district,
      'addressRegion': COMPANY.address.city,
      'addressCountry': COMPANY.address.countryCode,
    },
    ...(p.areaServed?.length ? { areaServed: p.areaServed.map(name => ({ '@type': 'City', name })) } : {}),
    'parentOrganization': { '@id': ORG_ID },
  }
}

export function faqSchema(items: { question: string, answer: string }[]) {
  return {
    '@type': 'FAQPage',
    'mainEntity': items.map(i => ({
      '@type': 'Question',
      'name': i.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': i.answer },
    })),
  }
}

export function creativeWorkSchema(locale: Locale, w: { title: string, description?: string, image?: string, slug?: string, link?: string, technologies?: string }) {
  return {
    '@type': 'CreativeWork',
    'name': w.title,
    'description': w.description,
    'inLanguage': IN_LANGUAGE[locale],
    ...(w.image ? { image: absoluteAsset(w.image) } : {}),
    ...(w.slug ? { url: absoluteUrl(`/works/${w.slug}`, locale) } : {}),
    ...(w.link ? { sameAs: w.link } : {}),
    ...(w.technologies ? { keywords: w.technologies } : {}),
    'creator': { '@id': ORG_ID },
  }
}

/** Person nodes from the Contentrain `team` collection. */
export function teamSchema(team: { name: string, job_title: string, same_as?: string[] }[]) {
  return team.map(m => ({
    '@type': 'Person',
    'name': m.name,
    'jobTitle': m.job_title,
    'worksFor': { '@id': ORG_ID },
    ...(m.same_as?.length ? { sameAs: m.same_as } : {}),
  }))
}
