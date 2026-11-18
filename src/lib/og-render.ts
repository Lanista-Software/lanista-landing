import type { Buffer } from 'node:buffer'
import type { OgCard } from './og-pages'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { SITE_NAME, SITE_URL } from './seo'

const require = createRequire(import.meta.url)
// Satori needs woff/ttf (not woff2). latin-ext carries the Turkish glyphs (ğ, ş, İ, ı);
// it is registered under its own family name and listed as a fallback, because
// satori does not merge two files that share a family name.
const font = (pkg: string, file: string) => readFile(require.resolve(`@fontsource/${pkg}/files/${file}`))

let fonts: Promise<{ name: string, data: Buffer, weight: 400 | 700, style: 'normal' }[]> | undefined
function loadFonts() {
  fonts ??= Promise.all([
    font('inter', 'inter-latin-400-normal.woff').then(data => ({ name: 'Inter', data, weight: 400 as const, style: 'normal' as const })),
    font('inter', 'inter-latin-ext-400-normal.woff').then(data => ({ name: 'Inter Ext', data, weight: 400 as const, style: 'normal' as const })),
    font('space-grotesk', 'space-grotesk-latin-700-normal.woff').then(data => ({ name: 'Space Grotesk', data, weight: 700 as const, style: 'normal' as const })),
    font('space-grotesk', 'space-grotesk-latin-ext-700-normal.woff').then(data => ({ name: 'Space Grotesk Ext', data, weight: 700 as const, style: 'normal' as const })),
  ])
  return fonts
}

const SANS = 'Inter, "Inter Ext"'
const DISPLAY = '"Space Grotesk", "Space Grotesk Ext"'

type Node = { type: string, props: Record<string, unknown> }
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({ type, props: { style, children } })

/** Branded 1200×630 card (same design as the old nuxt-og-image OgCard.vue). */
export async function renderOgCard({ title, description, label }: OgCard): Promise<Buffer> {
  // Satori sizes boxes content-box: 1056×486 + 72px padding = 1200×630.
  const tree = h('div', {
    width: 1056,
    height: 486,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 72,
    backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f3f5fb 55%, #ffe9ec 100%)',
  }, [
    h('div', { display: 'flex', flexDirection: 'column', width: '100%' }, [
      label ? h('div', { display: 'flex', fontFamily: SANS, fontSize: 26, letterSpacing: 2, color: '#c8102e' }, label.toLocaleUpperCase('tr-TR')) : null,
      h('div', { display: 'flex', width: '100%', marginTop: 20, fontFamily: DISPLAY, fontWeight: 700, fontSize: title.length > 48 ? 56 : 68, lineHeight: 1.12, color: '#10162f' }, title),
      description ? h('div', { display: 'flex', width: '100%', marginTop: 24, fontFamily: SANS, fontSize: 30, lineHeight: 1.4, color: '#4a5170' }, description) : null,
    ].filter(Boolean)),
    h('div', { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }, [
      h('div', { display: 'flex', fontFamily: DISPLAY, fontWeight: 700, fontSize: 34, color: '#10162f' }, SITE_NAME),
      h('div', { display: 'flex', fontFamily: SANS, fontSize: 26, color: '#4a5170' }, new URL(SITE_URL).host),
    ]),
  ])
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: await loadFonts() })
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
}
