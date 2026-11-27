/**
 * Launch preview. `LAUNCH_PREVIEW=1 yarn dev` (or a Netlify deploy preview with the
 * variable set) shows how the site looks once the e-Fatura provider contract and kontör
 * sales go live: products with a `launch_date` act as live (plans and prices visible), and
 * the provider band appears with the planned provider name. Production builds never set
 * the variable, so nothing here leaks to lanista.com.tr before the real switch, which is
 * done in Contentrain: product status → live, company.einvoice_provider → filled.
 */
import { COMPANY } from './company'

export const LAUNCH_PREVIEW = process.env.LAUNCH_PREVIEW === '1'

/** Shown only in preview until company.einvoice_provider is filled. */
const PREVIEW_PROVIDER = 'Turkcell e-Şirket'

export function einvoiceProvider(): { name: string, logo?: string, url?: string } | undefined {
  if (COMPANY.einvoiceProvider)
    return { name: COMPANY.einvoiceProvider, logo: COMPANY.einvoiceProviderLogo, url: COMPANY.einvoiceProviderUrl }
  return LAUNCH_PREVIEW ? { name: PREVIEW_PROVIDER } : undefined
}

/** Effective sale status: in preview, a product with a launch date counts as live. */
export function effectiveStatus<T extends { status: string, launch_date?: string }>(p: T): T['status'] {
  return LAUNCH_PREVIEW && p.launch_date && p.status !== 'live' ? 'live' : p.status
}
