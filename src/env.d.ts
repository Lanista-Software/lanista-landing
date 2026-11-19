/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Contentrain Studio base URL (default https://studio.contentrain.io). */
  readonly PUBLIC_CONTENTRAIN_STUDIO_URL?: string
  /** Studio project id — forms post to /api/forms/v1/{id}/leads/submit. */
  readonly PUBLIC_CONTENTRAIN_PROJECT_ID?: string
  /** Cloudflare Turnstile site key, only when CAPTCHA is enabled on the Studio form. */
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string
  /** Build-time only: Studio media read key (alt/size/blurhash). Never PUBLIC_. */
  readonly STUDIO_CDN_KEY?: string
}
