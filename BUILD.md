# BUILD.md — build instructions for Claude Code

You are building a personal portfolio site for Subhabrata Nag (product / risk / AI
leader, Doha). This document is the spec. Build it in **Astro 5**, static output, for
**GitHub Pages**.

**Read `CLAUDE.md` first — it holds the design and copy rules. They are not optional.**

Two things already exist in this repo and must NOT be regenerated:
- `src/content/` — all markdown content, migrated and correct (7 positions, 15 work
  items, 3 posts). Also `src/content.config.ts` — the Zod schemas.
- `reference/prototype.jsx` — a complete, working React prototype of the entire site.
  **This is your source of truth for layout, the interactive modules, and the
  timeline.** Port from it. Do not reinvent what it already solves.

Also read `copy-changes.md` — an approved copy revision. Apply every change in it as
you build the components. (Case-study *body* text is explicitly left as-is; do not
rewrite the bodies.)

---

## 1. Stack and setup

- Astro 5, `output: 'static'`.
- `@astrojs/react` for the interactive modules only (they are React islands). Every
  other component is a `.astro` file. Do not build static pages in React.
- `@astrojs/sitemap`, `@astrojs/rss` (already in package.json).
- Fonts self-hosted via Fontsource, already installed:
  - `@fontsource/oswald` — headings
  - `@fontsource-variable/inter` — body
  - `@fontsource/space-mono` — **numbers and metadata ONLY** (KPI figures, dates,
    timeline ticks, stat readouts). Never body text, never headings.
- Import font CSS in the base layout. `src/styles/tokens.css` will hold the tokens
  (see §3). No Google Fonts CDN.

## 2. Deploy (GitHub Pages, placeholder)

`astro.config.mjs` currently has `site: "https://YOUR_USERNAME.github.io"` and
`base: "/"`. Leave the placeholder. Add a comment block explaining:
- repo named `<username>.github.io` → keep `base: "/"`
- repo named anything else → set `base: "/<repo-name>"` and all internal links must use
  `import.meta.env.BASE_URL`.

Create `.github/workflows/deploy.yml` using the official `withastro/action@v3` +
`actions/deploy-pages@v4` pattern, triggered on push to `main` plus
`workflow_dispatch`. Standard Astro Pages workflow.

## 3. Design tokens (`src/styles/tokens.css`)

Exact values — these are the corrected, contrast-checked palette. Do not change hex
values.

```
--white:#FFFFFF; --ink:#0A0A0A; --g1:#F5F4F2; --g2:#E6E4E0;
--gt:#56534E; --blue:#0060D0; --blue-deep:#0051D5; --dark:#0A0A0A;
/* data ramp — ONLY inside charts/modules, never on chrome */
--d-blue:#0060D0; --d-amber:#A66A00; --d-teal:#00796B; --d-red:#C93F1B; --d-grey:#C4C1BC;
--sans:'Inter Variable',...; --head:'Oswald',...; --mono:'Space Mono',...;
```

Type scale (from the prototype, already tuned — floor is 14px, nothing smaller):
hero clamp(36px,5.4vw,74px) · page title clamp(30px,4vw,52px) · section clamp(24px,2.6vw,36px)
· card title 22px · body 17px · meta 14px. Headings use `--head` (Oswald). KPI numerals
and all metadata use `--mono` (Space Mono). Body uses `--sans` (Inter).

## 4. Routes to build

Port each from the prototype. Every one is a real URL with static HTML.

| Route | From prototype component | Notes |
|---|---|---|
| `/` | `Home` | Single-page scroll: hero (two-panel, photo box top-aligned to headline), Approach, Selected work (3 featured), Elsewhere, Contact. Footer only here. |
| `/work` | `Work` | Timeline default, Projects list as toggle. Two-axis chip filter (discipline / industry). |
| `/work/[slug]` | `WorkDetail` | One case study. Breadcrumb top. Module embedded if one exists (see §5). |
| `/writing` | `Writing` | List, tag filter. |
| `/writing/[slug]` | `Post` | K-bandit post embeds its module. |
| `/photography` | `Photography` | Dark canvas, non-uniform grid, lightbox with EXIF. |
| `/about` | `About` | Bio is creative — leave its voice ALONE. |
| `/resume` | `Resume` | Plain semantic HTML. Links to the PDF in public/resume/. |
| `/position/[slug]` OR fold into /work | `Position` | Company page listing its work. Reachable from the timeline. |

Persistent header nav on every page except where noted: Work / Writing / Photography /
About + click-to-copy email. Breadcrumb trail at the top of every sub-page (see
prototype's `Crumbs`).

## 5. Interactive modules (React islands)

Six modules exist in the prototype, fully working. Port each as a React island
(`client:visible`), one file per module under `src/components/modules/`. **The maths and
the synthetic data generators are correct — copy them verbatim.** Only restyle to the
tokens.

| Module | Belongs to | prototype fn |
|---|---|---|
| Claims auto-clear threshold | work/claims-adjudication | `ClaimsThreshold` |
| SKU delisting | work/sku-optimization | `SkuDelist` |
| Sales drivers | work/sales-driver-analysis | `SalesDrivers` |
| Association rules | work/market-basket-analysis | `BasketMiner` |
| Event routing | work/qic-risk-operations-tool | `RiskOps` |
| K-armed bandit | writing/exploration-vs-exploitation-k-bandit | `BanditSim` |

Wire by slug: a work/post page checks a slug→module map and renders the island if one
exists. Each module is labelled "synthetic data" and must stay that way.

## 6. The timeline + THE MOBILE FIX (important)

The `Work` timeline is a horizontal ribbon: roles as bars positioned across a
right-to-left year axis (2026 left, 2015 right), lanes computed from date overlaps, bars
proportional to tenure. Port from prototype `Work`/`lanes`.

**Mobile fix — this is the one real bug in the prototype and it MUST be fixed here:**
below 820px the proportional ribbon collapses (a 7-month role becomes ~11px, unreadable).
Below 820px, render the timeline as a **vertical stacked list** instead: newest at top,
each role a row with company / role / dates / tenure / project count, a left rule marking
the sequence. Same data, different orientation. The to-scale bars are a desktop-only
feature. Do not ship the squeezed horizontal version on mobile.

## 7. SEO / GEO (the reason this is Astro and not the prototype)

Every page needs, in the base layout:
- unique `<title>` and `<meta name="description">`
- canonical URL, Open Graph + Twitter tags
- per-page OG image (generate at build; `astro-og-canvas` or similar) using the site's
  type + palette

Structured data (JSON-LD):
- `Person` on `/` and `/about`, with `hasOccupation` and a `worksFor` history built from
  the positions collection. Highest priority.
- `Organization` + role on each position page, `CreativeWork` on each work item,
  `Article` on posts, `ImageObject` on photo sets, `BreadcrumbList` on all sub-pages.

Also:
- `@astrojs/sitemap` (configured), RSS at `/rss.xml` for posts.
- **`/llms.txt`** at the root, generated at build from the collections: who he is, the
  roles, the projects with real numbers, canonical URLs, plain prose. Regenerate every
  build so it never goes stale.
- `/resume` must be genuinely plain semantic HTML (real h1/h2, `<time>`, dates) — this is
  what ATS and LLM crawlers read.

Verify: Lighthouse SEO 100 on each page type; Google Rich Results Test passes.

## 8. Images

- Work/post images: `public/images/work/`, `public/images/posts/`. Reference by path.
- Photo sets: `public/images/photos/<set-slug>/`. A build script reads EXIF from each
  file (use `exifr`) so only captions are hand-written. Frontmatter EXIF overrides the
  file if present. Optimise via `astro:assets` (AVIF/WebP, responsive srcset, explicit
  dimensions).
- Placeholders are fine until real images are dropped in. Never layout-shift.

## 9. Content templates

`content-templates/` has `work.md`, `post.md`, `photo-set.md` with commented
frontmatter. Copy one to the matching `src/content/` folder to add an entry. Keep these
templates in sync with the schema if you change it.

## 10. Build order (suggested)

1. Config, tokens, base layout with fonts + SEO head. Get one page rendering.
2. Home. 3. Work + timeline (incl. mobile fix). 4. Work detail + module wiring.
5. Port all six modules. 6. Writing + post + bandit. 7. Photography + lightbox + EXIF.
8. About + resume. 9. SEO: JSON-LD, llms.txt, OG images, sitemap, RSS. 10. Lighthouse
pass, fix, done.

After each step: `npm run build` must pass. Show the user the running site and confirm
before moving on where it makes sense.

## Done =
`npm install && npm run build` clean; every route static HTML in `dist/`; Lighthouse SEO
100; timeline readable on a phone; modules work; copy-changes.md applied; bio untouched.
