/**
 * Every page that gets a generated 1200×630 share card. Keyed by the localized
 * path segment ('' = TR home, 'en/works/x' …), matching ogImagePath() in seo.ts.
 */
import type { Locale } from './i18n'
import { getHome, getProducts, getServicePages, getWorks } from './content'
import { localePath, LOCALES, ROUTES, t } from './i18n'
import { clampDescription, SITE_NAME } from './seo'

export interface OgCard { title: string, description: string, label: string }

function key(path: string, locale: Locale) {
  return localePath(path, locale).replace(/^\/|\/$/g, '') || 'index'
}

export function getOgCards(): Record<string, OgCard> {
  const cards: Record<string, OgCard> = {}
  for (const locale of LOCALES) {
    const u = t(locale)
    const meta = getHome(locale).metaTags
    cards[key('/', locale)] = {
      label: u('og.home'),
      title: meta.ogTitle || meta.title || SITE_NAME,
      description: clampDescription(meta.ogDescription || meta.description, 130),
    }
    cards[key('/works', locale)] = {
      label: u('og.works'),
      title: u('works.title'),
      description: u('og.works_text'),
    }
    for (const w of getWorks(locale).filter(w => w.slug)) {
      cards[key(`/works/${w.slug}`, locale)] = {
        label: w.categoryName || u('og.case_study'),
        title: w.title,
        description: clampDescription(w.description, 130),
      }
    }
    for (const p of getServicePages(locale)) {
      cards[key(`/services/${p.slug}`, locale)] = {
        label: u('og.service'),
        title: p.title,
        description: clampDescription(p.hero_description, 130),
      }
    }
    cards[key(ROUTES.services[locale], locale)] = { label: u('og.service'), title: u('services.page_title'), description: clampDescription(u('services.page_description'), 130) }
    cards[key(ROUTES.process[locale], locale)] = { label: SITE_NAME, title: u('process.page_title'), description: clampDescription(u('process.page_description'), 130) }
    cards[key(ROUTES.contact[locale], locale)] = { label: SITE_NAME, title: u('contact.title'), description: clampDescription(u('contact.description'), 130) }
  }
  const tr = t('tr')
  cards[key('/urunler', 'tr')] = { label: tr('products.og_label'), title: tr('products.title'), description: clampDescription(tr('products.description'), 130) }
  for (const p of getProducts()) {
    cards[key(`/urunler/${p.slug}`, 'tr')] = { label: `${tr('og.product')} · ${tr(`product.status.${p.status}`)}`, title: p.hero_title, description: clampDescription(p.tagline, 130) }
  }
  return cards
}
