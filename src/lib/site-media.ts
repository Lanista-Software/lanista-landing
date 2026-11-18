/** Layout images served from the Studio media CDN (uploaded 2026-11-18). */
const CDN = 'https://studio.contentrain.io/api/cdn/v1/a73a9374-609c-459d-8a1b-b3478a3b0982/media'

export const SITE_MEDIA = {
  /** Soft line pattern behind the home hero (1920×1000). */
  heroBackground: `${CDN}/original/31419dfc-254b-4cd2-814b-92a775a397e2.webp`,
  /** Texture inside the gradient banner (1280×400). */
  bannerBackground: `${CDN}/original/4684223e-1655-447c-bf76-2625e643ce41.webp`,
} as const
