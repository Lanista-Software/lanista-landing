/**
 * Lanista panel (SaaS) addresses. The landing only links there: sign-up,
 * trial and payment live in the panel.
 */
// TODO(2026-11-27): switch to 'https://app.lanista.com.tr' as soon as v2026.12.2 opens the new address.
// Until then the old address serves the same /panel/giris and /panel/kayit pages.
export const APP_URL = 'https://hesap-takip.lanista.com.tr'
export const APP_LOGIN = `${APP_URL}/panel/giris`

/** Sign-up, optionally preselecting a panel product (underscore ids, e.g. `yedek_parca`, `efatura`). */
export function appSignup(product?: string) {
  return product ? `${APP_URL}/panel/kayit?urun=${encodeURIComponent(product)}` : `${APP_URL}/panel/kayit`
}
