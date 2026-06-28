import { query } from '#contentrain'

// One case study by slug + related work items (same category).
export default defineEventHandler((event) => {
  const locale = (getQuery(event).locale as string) || 'en'
  const slug = getRouterParam(event, 'slug') || ''

  const all = query('workitems').locale(locale).include('category').sort('order', 'asc').all()
  const work = all.find(w => w.slug === slug)
  if (!work) throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })

  const catId = typeof work.category === 'object' && work.category ? work.category.id : undefined
  const categoryName = typeof work.category === 'object' && work.category ? work.category.category : ''

  const related = all
    .filter(w => w.slug !== slug && typeof w.category === 'object' && w.category && w.category.id === catId)
    .slice(0, 3)
    .map(w => ({
      ...w,
      ID: w.id,
      categoryName: typeof w.category === 'object' && w.category ? w.category.category : '',
    }))

  return { work: { ...work, ID: work.id, categoryName }, related }
})
