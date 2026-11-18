# "Ludus" illustration style

_Lanista is the Latin name for the master of a ludus, a gladiator school: an academy where craft is learned through discipline. The site's illustrations draw on that world without being literal. Software is built inside classical architecture, stone by stone._

## Concept
Every illustration is an **orthographic elevation**: a flat front view, like a plate from an architecture book. A classical structure (arch, column, plinth, amphitheatre, mosaic floor) frames or carries a software object (window, code, phone, node graph, chart).

**Signature: the keystone.** Wherever there is an arch, its keystone is filled in Lanista red. It is the only red shape in the image, the part that holds the whole structure together. With no arch, a single small red element (a flame, a pennant, the active node) takes the keystone's role.

## Tokens
| Role | Token | Hex |
|---|---|---|
| Ink (all strokes) | primary-800 | `#10273E` |
| Stone fill | primary-50 | `#EBF2FA` |
| Stone shade / plinth | primary-100 | `#C2D9EF` |
| Hatching (engraved shadow) | primary-200 | `#9ABFE5` |
| Software elements | primary-500 | `#2F73B6` |
| Keystone / single accent | danger-600 | `#E31F30` |
| Paper | white | `#FFFFFF` |

## Drawing rules
- **Service cards use 640 × 320 (2:1)** with the ground line at y = 284 (`design/ludus/services.py`); the software object is large and leads, the architecture frames it.
- **viewBox 480 × 360** (4:3) for process, product and other square-ish slots. The ground line is at y = 312, and every illustration stands on it. A plinth (two steps) sits on the ground line.
- **Stroke:** 2 px, `stroke-linecap="round"`, `stroke-linejoin="round"`. Secondary details 1.25 px. One weight family; no "sketchy" lines.
- **Shadow = hatching**: 45° parallel lines 6 px apart in `#9ABFE5`, clipped to the shaded face. No gradients, no drop shadows, no blur.
- **Fills** are flat: stone, shade, white or software blue. Software surfaces are white with blue content lines.
- **Mosaic band** (optional): a row of 10 × 10 tesserae under the plinth; mostly stone, a few blue, never red.
- Composition is centred and symmetric (classical), with one asymmetric software element for life.
- **Text inside illustrations:** none. Use lines and blocks as abstract content.

## Motif vocabulary
| Meaning | Motif |
|---|---|
| Research, analysis | Unrolled scroll / wax tablet with a chart, loupe |
| Design, prototyping | Architect's divider (compass) and a drafting tablet |
| Building, development | Arch rising from blocks; the keystone being set |
| Testing, quality | Shield on a plinth; a mosaic grid of passed checks |
| Launch, delivery | Triumphal arch with a road leading through; laurel |
| Support, uptime | Column with a burning torch; a pulse line |
| Security | Shield, gate |
| Success | Laurel wreath |
| Community, users | Amphitheatre tiers |
| Academy / Lanista brand | Ludus courtyard, columns, training yard |

## Don'ts
- No weapons, blood or fighting figures. The ludus is a school, not an arena.
- No people illustrations, mascots or emoji.
- No isometric 3D, glassmorphism or gradient blobs.
- Never more than one red element.
- Never icon-in-a-circle badges as the main visual of a card.

## Where photos and screenshots stay
- Project cards (`workitems`) keep real screenshots: they are the proof of the work.
- Testimonials keep real portraits; product pages keep real app screenshots and videos (demo data).
- Technology logos stay as brand logos.

## Delivery
- Static illustrations are **SVG files on the Studio media CDN**, referenced from content fields (e.g. `processes.illustration`).
- Animated ones (hero, product pages) are inline Astro components with the same drawing, so their parts can move. All motion stops under `prefers-reduced-motion`.
- Each SVG has a `<title>`. When an image sits next to its own heading, the `<img>` alt stays empty (decorative).
