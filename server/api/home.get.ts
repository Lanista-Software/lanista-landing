import { dictionary, query } from '#contentrain'

// Server-only Contentrain access. Returns everything the homepage (and Hero/schemas) needs
// for a given locale. Relations are resolved here so client components stay presentational.
// `ID` is re-added (alias of the generated `id`) for backward-compatible component keys.
export default defineEventHandler((event) => {
  const locale = (getQuery(event).locale as string) || 'en'
  const withID = <T extends { id: string }>(e: T) => ({ ...e, ID: e.id })

  const workItems = query('workitems')
    .locale(locale)
    .include('category')
    .sort('order', 'asc')
    .all()
    .map(w => ({
      ...w,
      ID: w.id,
      category: typeof w.category === 'object' && w.category ? w.category.category : w.category,
    }))

  return {
    services: query('services').locale(locale).all().map(withID),
    processes: query('processes').locale(locale).all().map(withID),
    workCategories: query('work-categories').locale(locale).sort('order', 'asc').all().map(withID),
    tabItems: query('tabitems').locale(locale).all().map(withID),
    workItems,
    testimonials: query('testimonials').locale(locale).all().map(withID),
    faq: query('faq').locale(locale).sort('order', 'asc').all().map(withID),
    sections: query('sections').locale(locale).all().map(withID),
    metaTags: dictionary('meta-tags').locale(locale).get(),
    references: query('references').all().map(withID),
    socialLinks: query('sociallinks').all().map(withID),
  }
})
