/**
 * Open Graph card rendering.
 *
 * satori lays the card out and returns SVG with the glyphs already converted to
 * paths; sharp rasterises it. That combination is used instead of
 * astro-og-canvas because canvaskit needs TTF or OTF and Fontsource ships only
 * WOFF and WOFF2. satori reads WOFF directly, so the cards use the real Oswald
 * and Space Mono the site is set in.
 *
 * Inter is variable-WOFF2 only, which satori cannot read. That is fine here:
 * the card is a heading and a metadata line, which are exactly the two faces
 * the type rules assign to Oswald and Space Mono.
 *
 * Build only.
 */
import satori from "satori";
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Resolved from the working directory, not import.meta.url: this module is
// bundled into dist/ for the build, and a URL relative to the bundle would
// point at dist/node_modules, which does not exist.
const font = (p: string) => readFileSync(join(process.cwd(), p));

const OSWALD_700 = font("node_modules/@fontsource/oswald/files/oswald-latin-700-normal.woff");
const OSWALD_400 = font("node_modules/@fontsource/oswald/files/oswald-latin-400-normal.woff");
const MONO_400 = font("node_modules/@fontsource/space-mono/files/space-mono-latin-400-normal.woff");

const INK = "#0A0A0A";
const GT = "#56534E";
const BLUE = "#0060D0";
const WHITE = "#FFFFFF";
const G2 = "#E6E4E0";

export interface OgCard {
  /** Section label, e.g. "Work" or "Writing". Sits above the title. */
  eyebrow: string;
  title: string;
  /** Optional facts line under the rule, e.g. company and year. */
  facts?: string[];
}

/** Long case-study titles have to stop somewhere or they overflow the card. */
function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}...`;
}

export async function renderOg(card: OgCard): Promise<Buffer> {
  const title = clamp(card.title, 110);
  const facts = (card.facts ?? []).filter(Boolean);

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: WHITE,
          padding: "64px 72px",
        },
        children: [
          {
            type: "div",
            props: {
              style: { display: "flex", flexDirection: "column" },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      fontFamily: "Space Mono",
                      fontSize: 24,
                      color: BLUE,
                      letterSpacing: "0.04em",
                      marginBottom: 28,
                    },
                    children: card.eyebrow.toLowerCase(),
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      fontFamily: "Oswald",
                      fontWeight: 700,
                      fontSize: title.length > 60 ? 62 : title.length > 34 ? 76 : 92,
                      lineHeight: 1.06,
                      color: INK,
                      maxWidth: 1010,
                    },
                    children: title,
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: { display: "flex", flexDirection: "column" },
              children: [
                {
                  type: "div",
                  props: {
                    style: { display: "flex", height: 4, width: 96, background: BLUE, marginBottom: 26 },
                    children: [],
                  },
                },
                {
                  type: "div",
                  props: {
                    style: { display: "flex", alignItems: "baseline" },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: { display: "flex", fontFamily: "Oswald", fontWeight: 400, fontSize: 30, color: INK },
                          children: "Subhabrata Nag",
                        },
                      },
                      ...facts.map((f) => ({
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            fontFamily: "Space Mono",
                            fontSize: 22,
                            color: GT,
                            marginLeft: 28,
                            borderLeft: `1px solid ${G2}`,
                            paddingLeft: 28,
                          },
                          children: f,
                        },
                      })),
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Oswald", data: OSWALD_700, weight: 700, style: "normal" },
        { name: "Oswald", data: OSWALD_400, weight: 400, style: "normal" },
        { name: "Space Mono", data: MONO_400, weight: 400, style: "normal" },
      ],
    }
  );

  return sharp(Buffer.from(svg)).png().toBuffer();
}
