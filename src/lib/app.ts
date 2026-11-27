/**
 * Lanista panel (SaaS) addresses. The landing only links there: sign-up,
 * trial and payment live in the panel.
 */
export const APP_URL = 'https://app.lanista.com.tr'
export const APP_LOGIN = `${APP_URL}/panel/giris`

/** Sign-up, optionally preselecting a panel product (underscore ids, e.g. `yedek_parca`, `efatura`). */
export function appSignup(product?: string) {
  return product ? `${APP_URL}/panel/kayit?urun=${encodeURIComponent(product)}` : `${APP_URL}/panel/kayit`
}
