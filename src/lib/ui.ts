export type CardView = 'grid' | 'single' | 'triple'

/** Grid rhythm from the old CardSection: 'grid' alternates 2 wide + 3 narrow cards. */
export function cardSpan(view: CardView, index: number): string {
  if (view === 'grid')
    return index % 5 < 2 ? 'lg:col-span-3' : 'lg:col-span-2'
  return view === 'single' ? 'lg:col-span-6' : 'lg:col-span-2'
}

/** Stagger delay for reveal animations, capped so long lists don't drag. */
export function stagger(index: number, step = 80, max = 400): string {
  return `--reveal-delay:${Math.min(index * step, max)}ms`
}
