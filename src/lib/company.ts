/**
 * Seller identity shown in the footer, legal pages and structured data.
 * Source: docs/urunler-ve-iyzico-brief.md §6 (vergi levhası, Ticaret Sicil Gazetesi).
 * Lanista Ltd. Şti. is the seller, the invoicing party and the iyzico merchant.
 * Do NOT mix with Contentrain Yazılım Teknolojileri A.Ş. (a separate legal entity).
 */
export const COMPANY = {
  legalName: 'LANİSTA YAZILIM SANAYİ VE TİCARET LİMİTED ŞİRKETİ',
  shortName: 'Lanista Yazılım San. ve Tic. Ltd. Şti.',
  brand: 'Lanista',
  address: {
    street: 'Bardakçı Mah. Teknokent Sk. No: 1 İç Kapı No: 9',
    district: 'Tuşba',
    city: 'Van',
    country: 'Türkiye',
    countryCode: 'TR',
    full: 'Bardakçı Mah. Teknokent Sk. No: 1 İç Kapı No: 9 Tuşba / Van',
  },
  taxOffice: 'Van',
  taxNumber: '6081185221',
  mersis: '0608118522100001',
  tradeRegistry: '442 / Tuşba (Van Ticaret Sicili Müdürlüğü)',
  foundingDate: '2019-08-09',
  phone: '+90 506 215 07 00',
  phoneHref: 'tel:+905062150700',
  phoneSchema: '+90-506-215-0700',
  email: 'info@lanista.com.tr',
} as const
