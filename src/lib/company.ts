/**
 * Seller identity, read from the Contentrain `company` singleton (build time).
 * Lanista Ltd. Şti. is the seller, the invoicing party and the iyzico merchant.
 * Edit it in Contentrain, never here.
 */
import { singleton } from '#contentrain'

const c = singleton('company').get()
const digits = c.phone.replace(/\D/g, '')

export const COMPANY = {
  legalName: c.legal_name,
  shortName: c.short_name,
  brand: c.brand,
  siteName: c.site_name,
  address: {
    street: c.address_street,
    district: c.address_district,
    city: c.address_city,
    countryCode: c.country_code,
    full: `${c.address_street} ${c.address_district} / ${c.address_city}`,
  },
  taxOffice: c.tax_office,
  taxNumber: c.tax_number,
  mersis: c.mersis,
  tradeRegistry: c.trade_registry,
  foundingDate: c.founding_date,
  phone: c.phone,
  phoneHref: `tel:+${digits}`,
  phoneSchema: c.phone.replace(/\s+/g, '-'),
  email: c.email,
  kep: c.kep,
  chamber: { name: c.chamber_name, url: c.chamber_url, rulesUrl: c.chamber_rules_url },
} as const
