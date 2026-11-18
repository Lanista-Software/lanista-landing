/**
 * Build-time Contentrain access (replaces the Nuxt `server/api/*` routes).
 * Only imported from .astro frontmatter, so `#contentrain` never reaches the browser.
 */
import type { Workitems } from '#contentrain'
import type { Locale } from './i18n'
import { dictionary, query } from '#contentrain'

/** Content image fields hold Studio CDN URLs; tolerate legacy site paths with a "public/" prefix. */
export function imagePath(path?: string): string {
  return path ? path.replace(/^\/?public\//, '/') : ''
}

export type Work = Omit<Workitems, 'category'> & { categoryId?: string, categoryName: string }

function resolveWork(w: Workitems): Work {
  const cat = typeof w.category === 'object' && w.category ? w.category : undefined
  return { ...w, categoryId: cat?.id ?? (typeof w.category === 'string' ? w.category : undefined), categoryName: cat?.category ?? '' }
}

export function getWorks(locale: Locale): Work[] {
  return query('workitems').locale(locale).include('category').sort('order', 'asc').all().map(resolveWork)
}

export function getSections(locale: Locale) {
  const map: Record<string, { title?: string, description?: string, buttontext?: string, buttonlink?: string, subtitle?: string }> = {}
  for (const s of query('sections').locale(locale).all())
    map[s.name] = s
  return (name: string) => map[name] ?? {}
}

export function getHome(locale: Locale) {
  return {
    services: query('services').locale(locale).all(),
    processes: query('processes').locale(locale).all(),
    workCategories: query('work-categories').locale(locale).sort('order', 'asc').all(),
    tabItems: query('tabitems').locale(locale).all(),
    works: getWorks(locale),
    testimonials: query('testimonials').locale(locale).all(),
    faq: query('faq').locale(locale).sort('order', 'asc').all(),
    metaTags: dictionary('meta-tags').locale(locale).get(),
    references: query('references').all(),
    section: getSections(locale),
  }
}

export function getLayout(locale: Locale) {
  return {
    servicePages: query('service-pages').locale(locale).sort('order', 'asc').all(),
    socialLinks: query('sociallinks').all(),
  }
}

export function getServicePages(locale: Locale) {
  return query('service-pages').locale(locale).sort('order', 'asc').all()
}

export function getServicePage(locale: Locale, slug: string) {
  const all = getServicePages(locale)
  const page = all.find(p => p.slug === slug)
  if (!page)
    return undefined
  const works = getWorks(locale)
  const relatedWorks = (page.related_works ?? [])
    .map(ref => works.find(w => w.id === (typeof ref === 'string' ? ref : ref.id)))
    .filter((w): w is Work => Boolean(w))
  return { page, otherPages: all.filter(p => p.slug !== slug), relatedWorks }
}

export function getWork(locale: Locale, slug: string) {
  const all = getWorks(locale)
  const work = all.find(w => w.slug === slug)
  if (!work)
    return undefined
  const related = all.filter(w => w.slug !== slug && w.categoryId && w.categoryId === work.categoryId).slice(0, 3)
  return { work, related }
}

/** Comma-separated technologies field → list. */
export function splitList(value?: string): string[] {
  return value ? value.split(',').map(t => t.trim()).filter(Boolean) : []
}

export function getProducts() {
  return query('products').sort('order', 'asc').all()
}

export function getProduct(slug: string) {
  return getProducts().find(p => p.slug === slug)
}

export function getPlans(productId: string) {
  return query('plans').sort('order', 'asc').all().filter(p => (typeof p.product === 'string' ? p.product : p.product?.id) === productId)
}
