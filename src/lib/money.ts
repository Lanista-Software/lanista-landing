const fmt = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 })

/** "15.000 TL" (currency code, not prose). */
export function tl(amount: number): string {
  return `${fmt.format(amount)} TL`
}

export function withVat(amount: number, rate = 20): number {
  return Math.round(amount * (1 + rate / 100))
}
