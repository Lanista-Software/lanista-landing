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

### Content System

All content lives in `contentrain/` as JSON files — one per language (`en.json`, `tr.json`). Sections, services, FAQ items, testimonials, work items, and meta tags are all managed here. Relational data uses ID-based linking resolved by `composables/utils.ts` (`getRelationalFields()`).

### Component Structure (Atomic Design)

- `components/atoms/` — Base elements (Logo, Flag, Accordion, Container)
- `components/mol/` — Composed components (AppHeader, AppNav, AppFooter, ContactForm, AppCard)
- `components/templates/` — Full page sections (Hero, Banner, CardSection, TabSection, Contact)

Components are auto-imported by Nuxt using PascalCase naming.

### Page Structure

Single page (`pages/index.vue`) with hash-based navigation (#home, #services, #process, #technologies, #works, #contact). Active section tracking uses Intersection Observer.

### Key Integrations

- **LUI** (`@lui-ui/lui-vue`) — Component library for base UI elements
- **Contentrain** — Headless CMS providing JSON, MD-MDX content files
- **Firebase Firestore** — Contact form submissions (client-side plugin in `plugins/firebase.client.ts`)
- **@nuxt/image** — Image optimization with IPX provider
- **@nuxt/scripts** — Google Analytics (G-T48ZEC3WT9)
- **Remixicon** — Icon library

### Composables

- `schemas.ts` — Schema.org structured data (Organization, Service, FAQPage, WebPage, etc.)
- `utils.ts` — Image path helpers, relational data resolution, i18n field matching
- `scrollLock.ts` — Scroll lock utility
- `i18nUtils.ts` — i18n helper functions

### Styling

Tailwind CSS with dark mode support. Custom color palette defined in `tailwind.config.js`. Fonts: Inter and Space Grotesk via `@nuxtjs/google-fonts`.

### Linting

Uses `@antfu/eslint-config` — configured in `eslint.config.mjs`. Stylistic rules are enabled.


# Contentrain AI Rules

This project uses [Contentrain](https://ai.contentrain.io) for AI-driven content management.

- **Rules** are in `.claude/rules/contentrain-essentials.md` — auto-loaded each conversation
- **Skills** are in `.claude/skills/` — loaded on demand by the agent
- **Docs:** https://ai.contentrain.io
