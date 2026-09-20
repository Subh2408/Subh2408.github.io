# Subhabrata Nag — portfolio

Personal portfolio site. Astro 5, static, deploys to GitHub Pages. Markdown content, one
file per project / post / photo set.

## First run

```bash
npm install        # once, after unzipping — node_modules is not included
npm run dev        # local dev server, usually http://localhost:4321
npm run build      # static output into dist/
npm run audit      # post-build check: titles, descriptions, headings, alt text, JSON-LD
```

The site is built. `BUILD.md` was the specification and `CLAUDE.md` holds the design and
copy rules that persist for every future session.

## Deploy (GitHub Pages)

1. Create a repo on GitHub.
2. In `astro.config.mjs`, replace `YOUR_USERNAME`:
   - repo named `<username>.github.io` → keep `base: "/"`, done.
   - any other repo name → set `base: "/<repo-name>"` too.
3. Push to `main`. The workflow in `.github/workflows/` builds and deploys.
4. Repo Settings → Pages → Source: GitHub Actions.

Every internal link goes through `url()` in `src/lib/paths.ts`, which reads `BASE_URL`.
Set `base` and all of them follow. Do not hand-write internal hrefs.

Custom domain later: buy one (~$12/yr), add a `CNAME` file in `public/`, point DNS at
GitHub. HTTPS is automatic.

## Adding content

No code needed. Copy a template, fill it in, commit.

| To add a… | Copy | Into | Then |
|---|---|---|---|
| Project | `content-templates/work.md` | `src/content/work/` | fill frontmatter + body |
| Blog post | `content-templates/post.md` | `src/content/posts/` | fill + write |
| Photo set | `content-templates/photo-set.md` | `src/content/photos/` | + drop images in `public/images/photos/<set>/` |

Frontmatter is validated on build — a typo'd key fails loudly instead of rendering wrong.

**A new project also needs a line in `src/lib/taxonomy.ts`**, giving it a discipline and an
industry. Without one it still appears in the list, but only under "all".

### Photos specifically
Drop `.jpg`s into `public/images/photos/<set-slug>/`, list the filenames + captions in
the set's `.md`. EXIF (camera, lens, aperture, etc.) is read from the files
automatically; you only write captions. Frontmatter overrides the file where you write a
value by hand. Pixel dimensions are read too, so the grid never shifts as images load.

Commit web-sized exports (~2400px long edge, q80). Keep RAWs and full-res masters out of
the repo.

Grid spans: the **first frame of a set takes four of six columns**, a frame marked
`wide: true` takes three, the rest take two.

### If you delete a content file
Clear the content cache, or the deleted entry stays in the build:

```bash
rm -rf node_modules/.astro .astro && npm run build
```

The same applies after changing the markdown pipeline in `astro.config.mjs`.

## What's here

- `src/content/` — 7 roles, 15 projects, 3 posts. Photo sets go in `src/content/photos/`.
- `src/content.config.ts` — the schemas.
- `src/lib/` — dates, paths, taxonomy, JSON-LD builders, EXIF reader, OG card renderer.
- `src/components/modules/` — the six interactive modules, as React islands.
- `public/resume/` — the résumé PDF.
- `scripts/audit.mjs` — post-build checks, run with `npm run audit`.

## Adding an interactive module

1. Write it in `src/components/modules/`.
2. Import it in `src/components/WorkModule.astro` and add a line matching its slug. It has
   to be a static import: a component pulled from a lookup map will not hydrate.
3. Add the slug to `WORK_MODULE_SLUGS` or `POST_MODULE_SLUGS` in `src/lib/content.ts`, so
   the "playable" chip shows up in listings.

## Notes

- The site is designed to have zero "AI tells." `CLAUDE.md` explains the rules. Keep them.
- The interactive modules run on synthetic data. No client data is in this repo, and none
  should be.
- One role (Ernst & Young) has no case studies by design — it's on the timeline and
  résumé only.
- The five QIC project files have skeleton bodies with `[you fill: …]` prompts — fill
  them in your own words. One (`qic-ai-governance-qcb.md`) is a live regulatory matter;
  read its note before publishing.
- Images referenced in a body that are not in the repo render as a labelled placeholder
  showing the exact path to drop a file at, rather than a broken icon.
- OG cards are generated at build by `satori` + `sharp` (see `src/lib/og.ts`), replacing
  `astro-og-canvas`, which needs TTF or OTF fonts that Fontsource does not ship.
- Photos are served from `public/`, so `astro:assets` cannot process them. They get
  explicit dimensions and lazy loading instead. Moving them to `src/assets/photos/` would
  buy AVIF/WebP srcsets, at the cost of changing the workflow above.
