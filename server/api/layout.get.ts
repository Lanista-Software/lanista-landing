import { query } from '#contentrain'

// Layout chrome data shared by AppFooter (and any layout-level component).
export default defineEventHandler((event) => {
  const locale = (getQuery(event).locale as string) || 'en'
  return {
    servicePages: query('service-pages').locale(locale).sort('order', 'asc').all().map(p => ({ ...p, ID: p.id })),
    socialLinks: query('sociallinks').all().map(s => ({ ...s, ID: s.id })),
  }
})
