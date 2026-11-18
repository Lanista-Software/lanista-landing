# lanista.com.tr

Lanista Yazılım's website: agency services and ready-made products (Hesap Takip, Nalbur Takip, Kasa Takip).
Built with **Astro** (static output) and **Tailwind CSS**. Content comes from **Contentrain** (`.contentrain/`, git-based).

## Develop

```bash
yarn install
yarn dev        # http://localhost:4321
yarn build      # contentrain generate → astro check → astro build → dist/
yarn preview
yarn lint
```

Node 22.12+ is required (`.node-version`). Netlify builds with `netlify.toml`.

## Structure

| Path | What |
|---|---|
| `src/pages/` | Routes. Turkish is at the root, English under `/en/`. Product and legal pages are Turkish-only. |
| `src/views/` | Page bodies shared by the TR and EN routes. |
| `src/components/` | UI components (`.astro`). Interactive parts use Zag.js state machines (`src/scripts/`). |
| `src/lib/` | Content access (`content.ts`, build-time only), i18n, SEO, JSON-LD, company info. |
| `src/styles/global.css` | Design tokens → component classes (`.btn`, `.tag`, `.field` …). |
| `src/pages/og/` | 1200×630 share images, rendered at build time with satori. |

## Forms

Every form (contact, demo, quote, waitlist) posts to the Contentrain Studio forms endpoint of the
single `leads` model. Set `PUBLIC_CONTENTRAIN_PROJECT_ID` (see `.env.example`) in Netlify, and in
Studio enable the `leads` form as **public** with all fields exposed.
