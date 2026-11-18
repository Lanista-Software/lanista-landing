/**
 * Every page that gets a generated 1200×630 share card. Keyed by the localized
 * path segment ('' = TR home, 'en/works/x' …), matching ogImagePath() in seo.ts.
 */
import type { Locale } from './i18n'
import { getHome, getServicePages, getWorks } from './content'
import { localePath, LOCALES } from './i18n'
import { clampDescription } from './seo'

export interface OgCard { title: string, description: string, label: string }

function key(path: string, locale: Locale) {
  return localePath(path, locale).replace(/^\/|\/$/g, '') || 'index'
}

export function getOgCards(): Record<string, OgCard> {
  const cards: Record<string, OgCard> = {}
  for (const locale of LOCALES) {
    const en = locale === 'en'
    const meta = getHome(locale).metaTags
    cards[key('/', locale)] = {
      label: en ? 'Software Development' : 'Yazılım Geliştirme',
      title: meta.ogTitle || meta.title || 'Lanista Software',
      description: clampDescription(meta.ogDescription || meta.description, 130),
    }
    cards[key('/works', locale)] = {
      label: en ? 'Case Studies' : 'Vaka Çalışmaları',
      title: en ? 'Our Work & Case Studies' : 'Çalışmalarımız ve Vaka Çalışmaları',
      description: en ? 'Selected projects we have designed and built since 2018.' : '2018\'den bu yana tasarlayıp geliştirdiğimiz seçili projeler.',
    }
    for (const w of getWorks(locale).filter(w => w.slug)) {
      cards[key(`/works/${w.slug}`, locale)] = {
        label: w.categoryName || (en ? 'Case Study' : 'Vaka Çalışması'),
        title: w.title,
        description: clampDescription(w.description, 130),
      }
    }
    for (const p of getServicePages(locale)) {
      cards[key(`/services/${p.slug}`, locale)] = {
        label: en ? 'Service' : 'Hizmet',
        title: p.title,
        description: clampDescription(p.hero_description, 130),
      }
    }
  }
  return cards
}
