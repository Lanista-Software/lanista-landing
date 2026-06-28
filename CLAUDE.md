# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | Purpose |
|---------|---------|
| `yarn dev` | Start dev server on http://localhost:3000 |
| `yarn build` | Build for production |
| `yarn generate` | Generate static site |
| `yarn preview` | Preview production build |
| `yarn lint` | Run ESLint |
| `yarn lint:fix` | Fix lint issues |

## Architecture

**Nuxt 3 single-page landing site** with TypeScript, Tailwind CSS, and i18n (English + Turkish).

### Content System (Contentrain AI ecosystem)

All content lives in `.contentrain/` and is managed via the new Contentrain ecosystem (`contentrain` CLI + `@contentrain/query` SDK + `@contentrain/mcp`). See `ai.contentrain.io`.

- **Config:** `.contentrain/config.json` — stack `nuxt`, locales `en`/`tr`, domains `marketing` + `system`.
- **Models:** `.contentrain/models/*.json` (12 models). Collections (services, processes, workitems, tabitems, work-categories, faq, testimonials, references, service-pages, sections) + dictionaries (meta-tags). Relations: `workitems.category` & `tabitems.category` → `work-categories`; `testimonials.creativeWork` & `service-pages.relatedWorks` → `workitems`.
- **Content:** `.contentrain/content/{domain}/{model}/{locale}.json` — keyed object-maps (`data.json` for non-i18n models). Lifecycle metadata is in `.contentrain/meta/` (system-managed — never edit by hand).
- **Consumption:** `contentrain generate` produces the typed `#contentrain` client into `.contentrain/client/` (gitignored; built via the `build`/`generate`/`postinstall` scripts). `#contentrain` is **server-only** — query it in `server/api/*` routes and consume with `useAsyncData` (relations resolved server-side via `.include()`). Never import `#contentrain` in client components.
- **Editing:** prefer the Contentrain MCP tools (see `.claude/rules/` + `.claude/skills/`) so content stays canonical and git-governed; do not hand-write `.contentrain/` JSON.
- Navigation menu labels remain in `i18n.config.ts` (vue-i18n) as UI chrome.

### Component Structure (Atomic Design)

- `components/atoms/` — Base elements (Logo, Flag, Accordion, Container)
- `components/mol/` — Composed components (AppHeader, AppNav, AppFooter, ContactForm, AppCard)
- `components/templates/` — Full page sections (Hero, Banner, CardSection, TabSection, Contact)

Components are auto-imported by Nuxt using PascalCase naming.

### Page Structure

Single page (`pages/index.vue`) with hash-based navigation (#home, #services, #process, #technologies, #works, #contact). Active section tracking uses Intersection Observer.

### Key Integrations

- **LUI** (`@lui-ui/lui-vue`) — Component library for base UI elements
- **Contentrain** (`contentrain` CLI, `@contentrain/query`, `@contentrain/mcp`) — git-native AI content governance; typed `#contentrain` client from `.contentrain/`
- **Firebase Firestore** — Contact form submissions (client-side plugin in `plugins/firebase.client.ts`)
- **@nuxt/image** — Image optimization with IPX provider
- **@nuxt/scripts** — Google Analytics (G-T48ZEC3WT9)
- **Remixicon** — Icon library

### Composables & server routes

- `server/api/home.get.ts`, `server/api/layout.get.ts`, `server/api/service-page/[slug].get.ts` — server-only Contentrain access; resolve relations and re-add `ID` (alias of generated `id`) for component keys.
- `schemas.ts` — Schema.org structured data (`useSchemas(data)`), built from the fetched `/api/home` payload.
- `utils.ts` — `getStaticImagePath`/`getImageAlt` (alt looked up from `composables/assets.json`) + `getRelationalFields` (client-side relation grouping in TabSection).
- `scrollLock.ts` — Scroll lock utility.

### Styling

Tailwind CSS with dark mode support. Custom color palette defined in `tailwind.config.js`. Fonts: Inter and Space Grotesk via `@nuxtjs/google-fonts`.

### Linting

Uses `@antfu/eslint-config` — configured in `eslint.config.mjs`. Stylistic rules are enabled.


# Contentrain AI Rules

This project uses [Contentrain](https://ai.contentrain.io) for AI-driven content management.

- **Rules** are in `.claude/rules/contentrain-essentials.md` — auto-loaded each conversation
- **Skills** are in `.claude/skills/` — loaded on demand by the agent
- **Docs:** https://ai.contentrain.io
