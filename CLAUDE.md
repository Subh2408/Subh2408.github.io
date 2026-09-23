# CLAUDE.md

Guardrails for this repo. Every session inherits these. When a request conflicts with
them, say so before proceeding.

## What this site is

A portfolio for a product / risk / AI leader. The reader is a hiring manager or a peer
who answers four questions in about forty seconds: what does he do, at what level, what's
the proof, how to reach him. Also legible to AI assistants (ChatGPT, Perplexity) that get
asked about AI product people in Doha. Distinctive above the fold, clear and boring below
it. Anything that fights the forty-second read loses.

## The prime directive: no AI tells

This site was deliberately stripped of the things that make a site read as
machine-generated. Do not reintroduce them.

**Copy rules — hold these everywhere, including UI microcopy:**
- No rule-of-three ("fast, clean, and simple"). No triads.
- No em-dash asides mid-sentence. Use a period. Start a new sentence.
- No "not X, but Y" constructions.
- No irony, no winking, no metaphor standing in for a label ("the room that goes dark"
  is banned; the label is "Photography").
- Short declarative sentences. A label names the thing.
- No middle-dot triplet strings (`A · B · C`) in running UI. Break them up.
- These apply to anything YOU write. The user's own prose (bio, case-study bodies) is
  theirs — flag cadence if asked, don't silently rewrite.
- The mobile home graphic tiles (tile-01–03) and their "Made you wonder, didn't I?" tap
  overlay are the author's choice. Do not remove or reword them.

**Layout tells to avoid:** over-tidy symmetry (everything in equal 3- or 4-up grids),
repeating one section shape down a page until it reads as a slide deck, numbered section
eyebrows (01, 02, 03, 04) on a single page, warm off-white + single blue accent as the
whole palette, mesh gradients, blurred blobs, decoration that carries no information.

**Layout moves that are in bounds.** The home page was rebuilt because it read as a
PowerPoint: four stacked bands, each one an eyebrow plus a heading plus a grid of rounded
cards. What replaced it is allowed everywhere. Alternating band grounds down a page.
Full-bleed bands that break the 1280px column. Hairline rules as structure instead of card
borders. Large Space Mono numerals as a graphic element. Asymmetric two-column splits where
one side leads and the other lists. Two standing constraints: no two adjacent sections on a
page may share a shape, and no two adjacent bands may share a ground.

## What is sacred vs. what is not

- **Sacred:** the interactive modules and the real numbers. They are the least AI-like,
  most specific thing here. No generator builds a working claims-threshold explorer.
  Never cut, dumb down, or replace a module with a static image. This includes the compact
  `ClaimsThreshold` running in the home page hero.
- **Not sacred:** generic prose, filler headings, decorative flourish. Cut freely.

## Colour means data

Chrome is white, near-black, three greys, one blue (`--blue #0060D0`), one clay
(`--clay #A84B32`), and two barely-tinted band grounds. The chart hues
(`--d-amber --d-teal --d-red`) appear ONLY inside charts and modules. Never put a chart
colour on a card, button, or nav element. A page with a module looks different from one
without. That difference is information.

`--blue` was relaxed from accent to structure. It may now carry a rule, an edge, a numeral
or a solid button fill on chrome, not only a link or an active pill. Measured: 5.86:1 on
white, 5.33:1 on `--g1`, 3.38:1 on `--ink`. That last figure is why focus rings on `.proof`
and `.band.dark` switch to `#4D9BFF` (7.02:1). Before this, the home page's dark band was
shipping a 3.38:1 ring, because the `#4D9BFF` override was scoped to `body.dark`, which only
/photography sets.

`--d-amber #A66A00` is 4.48:1 on white, which fails AA at body size. It stays inside charts.

### Clay

`--clay #A84B32` is a warm accent for **non-interactive marks only**. Blue keeps every
clickable thing, so the two never compete and blue still means "you can press this".

Clay is on these selectors and no others. Adding one needs a reason:
`.statusline .dot`, `.livechip`, `.anum`, `.wnum`, `.rnum`, and the `+`/`−` marker on
`.apx summary::after` and `.chipfold summary::after`.

Measured: 5.65:1 on white, 5.19:1 on `--tint-warm`, 5.16:1 on `--tint-cool`, 5.14:1 on
`--g1`. Passes as text everywhere it is used.

`--clay-soft #C25A3C` is **4.36:1 and is a fill only**. It fails 4.5:1 as small text *and*
fails for white text placed on it. A filled badge carrying a white label must use `--clay`.
It is currently defined but unused.

**The one thing to know before extending clay.** `--clay` sits at Lab hue 42deg and the chart
red `--d-red #C93F1B` sits at 43deg. Same hue family, separated only by lightness and chroma
(deltaE 23.9; `--clay-soft` is 43deg, deltaE 19.2). This was checked and accepted, not
overlooked: deltaE 23.9 is well above the ~12 confusion threshold and the two never sit side
by side. But `ClaimsThreshold` runs in the hero and its "cleared in error" bars are `--d-red`,
so the clay status dot is the closest the two ever get. If the hero ever reads muddy, put that
dot back to blue first. Never put clay inside a chart, and never put a chart hue on chrome.

Not on /photography. No gradients, flat fills only.

### Tinted bands

`--tint-warm #FBF4F0` and `--tint-cool #F1F5FB` replaced the white/grey band alternation on
the home page. Both measure 1.09:1 against white, the same weight as the `--g1` (1.10:1) they
replaced, so they read as a change of temperature rather than as coloured panels. If a tint
ever looks obviously coloured, it is too saturated. Body text on them: `--ink` 18.2:1, `--gt`
7.04:1 warm and 7.00:1 cool, `--blue` links 5.39:1 and 5.36:1.

`--g3 #96918A` was added for large decorative type only (3.13:1 on white, the AA floor for
large text). `--g2 #E6E4E0` is 1.27:1 and is a hairline colour, never a text colour.

## Surfaces

Every surface defines five tokens: `--surface`, `--surface-raised`, `--surface-line`,
`--surface-ink` and `--surface-muted` (secondary text, such as chip labels), plus
`--surface-accent` for hover and focus. **Components never hard-code
a background.** They take `--surface-raised` and `--surface-line` from the surface they sit
on, so the same component stays visible on every surface. The
rules live in `global.css` under "surfaces"; the raw greys are in `tokens.css`.

| Surface | Selector | Raised (vs surface) | Line (vs surface) | Muted label (vs surface) | Ink on raised | Accent on raised |
|---|---|---|---|---|---|---|
| Page `#FFFFFF` | `:root` | `#FFFFFF` 1.00 | `#CFCBC5` 1.62 | `--gt` 7.66 | 19.80 | `--blue` 5.86 |
| Grey `#F5F4F2` | `.wcard`, `.band.grey` | `#FFFFFF` 1.10 | `#CFCBC5` 1.47 | `--gt` 6.96 | 19.80 | 5.86 |
| Warm `#FBF4F0` | `.band.warm` | `#FFFFFF` 1.09 | `#CFCBC5` 1.48 | `--gt` 7.04 | 19.80 | 5.86 |
| Cool `#F1F5FB` | `.band.cool` | `#FFFFFF` 1.09 | `#CFCBC5` 1.48 | `--gt` 7.00 | 19.80 | 5.86 |
| Dark `#0A0A0A` | `.band.dark` | `#1E1E1E` 1.19 | `#363636` 1.64 | `--dk-text` 7.04 | 16.67 white | `#4D9BFF` 5.91 |
| Photo `#1C1C1E` | `body.dark` | `#2C2C30` 1.22 | `#3E3E42` 1.60 | `--dk-text` 6.05 | 13.91 white | `#4D9BFF` 4.93 |

The **line is decorative**. A chip's text identifies it, so WCAG 1.4.11 does not ask the
border for 3:1. The raised fill does the separating and the line only edges it, kept
deliberately light at 1.4 to 1.8:1 on every surface, dark ones included. Do not darken it
to "pass" a rule that does not apply. Hover and focus turn the line and text
`--surface-accent`.

The **muted label is text**, so `--surface-muted` must clear 4.5:1 against its surface.
Only the line is decorative.

The case-study chips (`.chip`) are the first component on this system. Older hard-coded
backgrounds, such as `.wcard .modbox`, predate the rule. Move them over when touched. The
filter pills (`.pill`) are a separate control and are not chips.

## Content rules

"A KPI slot holds a figure; chips exist to tell cards apart." Enforced in
`src/content.config.ts`, so a violation fails the build and names the file.

- Every `kpis[].value` contains at least one digit. A word like "Enterprise" or "Live" is
  not a KPI. If a case study has no real figure, it has no KPI.
- Chips: at most 3 keys, at most 3 values per key.
- A chip never repeats its position's industry (no "Insurance" chip on a QIC case study).
  The industry is read from the position file.

## Type

- Headings: Oswald (`--head`).
- Body: Inter (`--sans`).
- Numbers and metadata ONLY: Space Mono (`--mono`). KPI figures, dates, timeline ticks,
  stat readouts. Never body, never headings. This is easy to get wrong — check it.
- Floor 14px, nothing smaller. No condensed widths below 16px. Hierarchy comes from size
  and weight, not from shrinking + greying + condensing the same text three ways.

## Accessibility floor (already met — keep it)

Keyboard reachable, visible focus rings in `--blue`, `prefers-reduced-motion` disables
motion. Contrast: the palette is contrast-checked; `--blue` is `#0060D0` (5.86:1), not
Apple's `#007AFF` (which fails). Don't revert it. Text never below 14px.

## Motion

One page-load moment, hover states, view transitions between pages. No scroll-triggered
reveals, no counting-up numbers, no parallax. Motion that pretends to be interactivity is
itself an AI tell.

Still true. The home page answers "is this alive?" with a working module in the hero rather
than with motion. `@keyframes rise` is still the only keyframe in the stylesheet.

## The home page

The hero is two columns. Left: positioning line, subline, status line, a solid blue button
to the work, the email. Right: `ClaimsThreshold` running live in compact mode with
`client:load`.

Compact is deliberately thin: title, tag, histogram, slider, and **two** stats (percent
cleared, percent cleared in error). No description paragraph, no commentary line, no queue
count or settle time. Those four things stay on /work/claims-adjudication, which renders the
full module. The hero column was a dashboard and towered over the headline; two stats is what
balances the two columns. Do not add a third. The live module is the answer to "is this a template?" and it is sacred for
the same reason the other modules are. It costs the home page ~45KB gzipped of React, which
it previously did not ship. That is a deliberate trade.

Below the hero, in order:

1. A full-bleed ink proof strip carrying all seven `HIGHLIGHTS` at once, each row linking to
   its case study. It replaced a carousel that showed one of seven on a 3500ms timer.
2. Approach as a numbered editorial list, hairline rules, oversized `--clay` numerals, on
   `--tint-warm`.
3. Selected work as one lead panel plus ruled rows, on `--tint-cool`.
4. A dark closing band carrying contact, with the footer sharing its ground. Elsewhere used
   to be its own band of three equal cards; it is gone. It was first folded into this band
   as three links, then cut, because "Professional timeline", "Writing" and "Photography"
   all duplicate the top nav, which is on every page.

The page ends on one continuous dark field: heading, contact row, hairline, footer line.
`Footer.astro` wraps its `<footer>` in `.footwrap`, which carries the background, because
`.foot` is capped at `--maxw` and a background on it alone leaves white gutters on wide
screens. `.band.dark.close` trims the band's bottom padding. That is the one sanctioned
exception to "a filled band's padding stays symmetric": the neighbour below is the same
`--dark`, so there is no colour edge to sit off-centre.

Four shapes, no repeats, no adjacent grounds alike. There is no 01/02/03/04 numbering on
this page. `--band-y` is `clamp(32px, 3.6vw, 60px)`; it was `clamp(40px, 6vw, 96px)`, which
put 192px of nothing between sections. Do not restore it.

In compact mode `ClaimsThreshold` renders its axis ticks as HTML, not as SVG `<text>`. SVG
text scales with its container, so no `fontSize` holds the 14px floor across the width range.
The work-page version is unchanged and still draws them in the SVG, where it renders near
1:1. If you add a module to a narrow column, do the same thing.

### The `.band > *` trap

```css
.band > * { max-width: var(--maxw); margin-left: auto; margin-right: auto; }
```

Every direct child of a `.band` gets auto side margins. Give one its own `max-width` and it
silently centres itself inside the band while its full-width siblings stay flush left. This
is what made "Get in touch." sit in the middle of the page, via an inline
`style="max-width:15ch"`. If a heading needs a measure, wrap the section content in a
container (the way `.splitband` does) and cap the heading inside it. Never cap a direct
`.band` child.

`.page` does not do this. It centres only itself, so inline `max-width` on sub-page content
is safe.

## Mobile

Below 820px the phone gets its own interaction model, not the desktop layout collapsed into
a column. Same palette, same type, same content, same static HTML. Every rule for it lives
in a `@media (max-width: 820px)` block at the end of `global.css`. **Nothing there may
change desktop.** The only rules that sit outside a media query are the ones that hide the
mobile furniture on desktop: `.tabbar`, `.apx summary` markers, `.moreproof summary`.

- **Bottom tab bar.** Four labels, no icons, in `Nav.astro` so it shares the `items` array
  and `current` prop with the top bar. The top bar drops to the name alone; its links and
  the email are hidden, and so is the backdrop blur. `main` gets `padding-bottom: 76px` so
  the bar never covers content. Dark pages invert the bar and use `#4D9BFF`, because
  `--blue` is 3.38:1 on near-black.
- **Swipe decks.** `.worklist` and `.workband` become horizontal scroll-snap decks. Cards
  are `flex: 0 0 82vw` — never 100%, because the peeking next card *is* the affordance.
  Pure CSS over the existing markup, so the rows stay real links in DOM order and keyboard
  traversal is untouched. `.wdesc` is hidden; the description is what made them texty.
- **Snap sections.** `scroll-snap-type: y proximity` on `html`, not on `main` — `main` is
  not a scroller, so the property would silently do nothing there. `100svh` not `100vh`,
  `min-height` not `height`, `proximity` not `mandatory`. Disabled under reduced motion.
- **Collapsed copy.** Approach pillars and the extra proof rows are `<details>`. The
  paragraph sits *inside* `<summary>` and is line-clamped to one line when closed, so
  nothing is duplicated in the DOM. CSS cannot force a `<details>` open or shut, so the
  markup ships `open` and a small script in `index.astro` closes them below 820px. With JS
  off, everything is expanded, which is the old behaviour.

### Never ship an unguarded `:hover`

On a touch device `:hover` **sticks** after a tap and stays until the user taps elsewhere.
This shipped as a real bug: tapping a row in the dark band left it blue and underlined,
because `.proofrow a:hover .pnum` and `.proofrow a:hover .plabel` kept applying. It looked
like one entry was styled differently; it was just the last one touched.

Every `:hover` rule in `global.css` is now wrapped in `@media (hover: hover)`. Wrap any new
one the same way. Where a selector pairs hover with something else — `.rolecard:hover,
`.rolecard.hot` or `.ph:hover, .ph:focus-visible` — split it, because `.hot` and
`:focus-visible` must still work on touch.

## When unsure

Prefer the quieter option when two options say the same thing. "Too cluttered" is a real
failure mode. So is "reads like a PowerPoint", which is what this rule produced on the home
page. Quiet is not the same as inert. Prefer fewer elements, but make the ones that remain
carry real information. If a change would add a tell to remove a minor inconvenience, don't.
If a change removes a repeated shape, take it.
