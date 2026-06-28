import { query } from '#contentrain'

// One service detail page + sibling pages + resolved related works (with category name).
export default defineEventHandler((event) => {
  const locale = (getQuery(event).locale as string) || 'en'
  const slug = getRouterParam(event, 'slug') || ''

  const page = query('service-pages').locale(locale).where('slug', slug).first()
  if (!page) throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })

  const allPages = query('service-pages')
    .locale(locale)
    .sort('order', 'asc')
    .all()
    .filter(p => p.slug !== slug)
    .map(p => ({ ...p, ID: p.id }))

  const works = query('workitems').locale(locale).include('category').all()
  const relatedWorks = ((page.relatedWorks as string[]) || [])
    .map(id => works.find(w => w.id === id))
    .filter((w): w is NonNullable<typeof w> => Boolean(w))
    .map(w => ({
      ...w,
      ID: w.id,
      categoryName: typeof w.category === 'object' && w.category ? w.category.category : '',
    }))

  return { page: { ...page, ID: page.id }, allPages, relatedWorks }
})
