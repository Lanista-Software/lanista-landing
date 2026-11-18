/**
 * Studio media index, loaded once at build time.
 *
 * Content image fields hold Studio CDN URLs. The media API knows each asset's
 * alt text, intrinsic size, blurhash and WebP variants, so <Img> can render
 * correct alt text and width/height (no layout shift) even for images editors
 * add in Studio later. Needs STUDIO_CDN_KEY (media:read) in the build env; the
 * key never reaches the browser. Without it the site still builds, minus alt
 * text and dimensions for CDN images.
 */
const STUDIO_URL = (import.meta.env.PUBLIC_CONTENTRAIN_STUDIO_URL || 'https://studio.contentrain.io').replace(/\/$/, '')
const PROJECT_ID = import.meta.env.PUBLIC_CONTENTRAIN_PROJECT_ID || ''
const KEY = import.meta.env.STUDIO_CDN_KEY || process.env.STUDIO_CDN_KEY || ''

export interface MediaAsset {
  url: string
  alt: string
  width: number
  height: number
  blurhash?: string
  format?: string
  variantUrls: Record<string, string>
  variants: Record<string, { width: number, height: number }>
}

interface ApiAsset extends Partial<MediaAsset> { url: string }

let index: Promise<Map<string, MediaAsset>> | undefined

async function load(): Promise<Map<string, MediaAsset>> {
  const map = new Map<string, MediaAsset>()
  if (!KEY || !PROJECT_ID) {
    console.warn('[media] STUDIO_CDN_KEY or PUBLIC_CONTENTRAIN_PROJECT_ID missing — images render without Studio metadata.')
    return map
  }
  for (let page = 1; page < 50; page++) {
    const res = await fetch(`${STUDIO_URL}/api/media/v1/${PROJECT_ID}/assets?limit=100&page=${page}`, {
      headers: { Authorization: `Bearer ${KEY}` },
    })
    if (!res.ok) {
      console.warn(`[media] Studio media API answered ${res.status}; continuing without metadata.`)
      break
    }
    const { assets = [], total = 0 } = await res.json() as { assets?: ApiAsset[], total?: number }
    for (const a of assets) {
      map.set(a.url, {
        url: a.url,
        alt: a.alt ?? '',
        width: a.width ?? 0,
        height: a.height ?? 0,
        blurhash: a.blurhash,
        format: a.format,
        variantUrls: a.variantUrls ?? {},
        variants: a.variants ?? {},
      })
    }
    if (page * 100 >= total || !assets.length)
      break
  }
  return map
}

export function mediaIndex() {
  index ??= load()
  return index
}

const B83 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~'

/** Average colour of a blurhash (its DC component) — a zero-cost placeholder. */
export function blurhashColor(hash?: string): string | undefined {
  if (!hash || hash.length < 6)
    return undefined
  let v = 0
  for (const c of hash.slice(2, 6)) v = v * 83 + B83.indexOf(c)
  return `#${v.toString(16).padStart(6, '0')}`
}

/**
 * Best URL for a slot. Studio's `hero` variant is capped at 1920×1080 and
 * crops portrait images; `card`/`thumb` are always cropped.
 */
export function pickSrc(asset: MediaAsset | undefined, url: string): string {
  if (!asset || asset.format === 'svg')
    return url
  const hero = asset.variants.hero
  // `hero` caps the height at 1080 and crops tall images (phone screenshots):
  // use it only when it keeps the original aspect ratio.
  const sameShape = hero && asset.width && asset.height
    && Math.abs(hero.width / hero.height - asset.width / asset.height) < 0.01
  return sameShape && asset.variantUrls.hero ? asset.variantUrls.hero : url
}
