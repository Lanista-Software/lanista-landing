import { query } from '#contentrain'

// All portfolio work items (case studies) for the listing page, category resolved.
export default defineEventHandler((event) => {
  const locale = (getQuery(event).locale as string) || 'en'
  return query('workitems')
    .locale(locale)
    .include('category')
    .sort('order', 'asc')
    .all()
    .map(w => ({
      ...w,
      ID: w.id,
      categoryName: typeof w.category === 'object' && w.category ? w.category.category : '',
    }))
})
