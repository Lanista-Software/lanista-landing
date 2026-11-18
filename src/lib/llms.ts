/**
 * llms.txt / llms-full.txt (https://llmstxt.org) built from Contentrain at
 * build time, so AI search engines get the same facts as the site.
 */
import type { Locale } from './i18n'
import { COMPANY } from './company'
import { getHome, getLocalPages, getPlans, getProducts, getServicePages, getWorks, productPath } from './content'
import { ROUTES, t } from './i18n'
import { getLegalPages, legalPath, renderLegal } from './legal'
import { tl } from './money'
import { absoluteUrl, SITE_URL } from './seo'

const url = (path: string, locale: Locale = 'tr') => absoluteUrl(path, locale)
const line = (title: string, href: string, note?: string) => `- [${title}](${href})${note ? `: ${note.replace(/\s+/g, ' ').trim()}` : ''}`

function companyBlock(locale: Locale): string {
  const s = t(locale)
  return [
    `- ${COMPANY.legalName}`,
    `- ${COMPANY.address.full}, ${COMPANY.address.countryCode}`,
    `- ${s('form.label.phone')}: ${COMPANY.phone} · ${s('form.label.email')}: ${COMPANY.email}`,
    `- ${s('company.mersis')}: ${COMPANY.mersis} · ${s('company.tax_office')}: ${COMPANY.taxOffice} · ${s('company.tax_number')}: ${COMPANY.taxNumber}`,
    ...(COMPANY.chamber.name ? [`- ${s('company.chamber')}: ${COMPANY.chamber.name}`] : []),
  ].join('\n')
}

/** Short index: who we are + links to every key page. */
export function buildLlmsTxt(): string {
  const s = t('tr')
  const en = t('en')
  const products = getProducts()
  const services = getServicePages('tr')
  const works = getWorks('tr').filter(w => w.slug)
  const legal = getLegalPages()
  return [
    `# ${COMPANY.siteName}`,
    '',
    `> ${s('llms.summary')}`,
    '',
    `> ${en('llms.summary')}`,
    '',
    `## ${s('llms.products')}`,
    ...products.map(p => line(`${p.name} (${s(`product.status.${p.status}`)})`, url(`/urunler/${p.slug}`), `${p.sector} — ${p.tagline}`)),
    '',
    `## ${s('llms.services')}`,
    line(s('services.page_title'), url(ROUTES.services.tr)),
    ...services.map(p => line(p.title, url(`/services/${p.slug}`), p.hero_description)),
    line(s('process.page_title'), url(ROUTES.process.tr)),
    '',
    `## ${s('llms.works')}`,
    ...works.map(w => line(w.title, url(`/works/${w.slug}`), w.categoryName)),
    '',
    `## ${s('llms.company')}`,
    companyBlock('tr'),
    line(s('nav.contact'), url(ROUTES.contact.tr)),
    ...getLocalPages('tr').map(p => line(p.title, url(`/${p.slug}`), p.meta_description)),
    ...legal.filter(p => p.group === 'corporate').map(p => line(p.title, url(legalPath(p)))),
    '',
    `## ${s('llms.legal')}`,
    ...legal.filter(p => p.group === 'legal').map(p => line(p.title, url(legalPath(p)), p.description)),
    '',
    `## ${s('llms.english_section')}`,
    `> ${en('llms.summary')}`,
    '',
    line(en('nav.home'), url('/', 'en')),
    ...getProducts('en').map(p => line(`${p.name} (${en(`product.status.${p.status}`)})`, url(productPath(p.slug, 'en'), 'en'), p.tagline)),
    line(en('services.page_title'), url(ROUTES.services.en, 'en')),
    ...getServicePages('en').map(p => line(p.title, url(`/services/${p.slug}`, 'en'))),
    ...getLocalPages('en').map(p => line(p.title, url(`/${p.slug}`, 'en'), p.meta_description)),
    line(en('nav.works'), url('/works', 'en')),
    line(en('nav.contact'), url(ROUTES.contact.en, 'en')),
    '',
    `## ${s('llms.optional')}`,
    line(s('llms.full_note'), `${SITE_URL}/llms-full.txt`),
    line('Sitemap', `${SITE_URL}/sitemap-index.xml`),
    '',
  ].join('\n')
}

/** Full text: products with plans and FAQ, services, home FAQ, company, legal texts. */
export function buildLlmsFullTxt(): string {
  const s = t('tr')
  const home = getHome('tr')
  const out: string[] = [`# ${COMPANY.siteName}`, '', `> ${s('llms.summary')}`, '', companyBlock('tr'), '']

  out.push(`## ${s('llms.products')}`, '')
  for (const p of getProducts()) {
    out.push(`### ${p.name} — ${s(`product.status.${p.status}`)}`, `${url(`/urunler/${p.slug}`)}`, '', `${p.hero_title}. ${p.hero_text}`, '', `${p.sector}. ${p.tagline}`, '')
    if (p.feature_groups?.length) {
      out.push(`#### ${s('llms.features')}`)
      for (const g of p.feature_groups) out.push(`- **${g.title}:** ${(g.items ?? []).join('; ')}`)
      out.push('')
    }
    const plans = getPlans(p.id).filter(pl => typeof pl.price_try === 'number')
    if (plans.length && p.status === 'live') {
      out.push(`#### ${s('llms.plans')}`)
      for (const pl of plans) out.push(`- ${pl.name}: ${tl(pl.price_try!)} ${s('plan.plus_vat')} ${s(`plan.billing.${pl.billing}`)}${pl.note ? ` — ${pl.note}` : ''}`)
      out.push('')
    }
    if (p.faq?.length) {
      out.push(`#### ${s('llms.faq')}`)
      for (const f of p.faq) out.push(`**${f.question}** ${f.answer}`, '')
    }
  }

  out.push(`## ${s('llms.services')}`, '')
  for (const sp of getServicePages('tr')) out.push(`### ${sp.title}`, url(`/services/${sp.slug}`), '', sp.hero_description ?? '', '')

  out.push(`## ${s('llms.faq')}`, '')
  for (const f of home.faq) out.push(`**${f.question}** ${f.answer}`, '')

  out.push(`## ${s('llms.legal')}`, '')
  for (const doc of getLegalPages()) {
    const text = renderLegal(doc).html.replace(/<[^>]+>/g, '').replace(/&#39;/g, '\'').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\n{3,}/g, '\n\n').trim()
    out.push(`### ${doc.title}`, url(legalPath(doc)), '', text, '')
  }
  return `${out.join('\n')}\n`
}
