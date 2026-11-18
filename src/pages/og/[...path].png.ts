import type { APIRoute, GetStaticPaths } from 'astro'
import type { OgCard } from '~/lib/og-pages'
import { getOgCards } from '~/lib/og-pages'
import { renderOgCard } from '~/lib/og-render'

export const getStaticPaths: GetStaticPaths = () =>
  Object.entries(getOgCards()).map(([path, card]) => ({ params: { path }, props: { card } }))

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgCard((props as { card: OgCard }).card)
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } })
}
