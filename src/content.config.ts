import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { readdirSync, readFileSync } from "node:fs";

/**
 * Content rules. See "Content rules" in CLAUDE.md. A KPI slot holds a figure;
 * chips exist to tell cards apart. Each rule fails the build and names the file.
 */

/** Position slug to industry, read from the position files so a work entry can
 *  be checked against its own position without a cross-collection lookup. */
const POSITION_INDUSTRY: Record<string, string> = Object.fromEntries(
  readdirSync("./src/content/positions")
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const m = readFileSync(`./src/content/positions/${f}`, "utf8").match(/^industry:\s*"?([^"\r\n]+)"?\s*$/m);
      return [f.replace(/\.md$/, ""), m ? m[1].trim() : ""];
    }),
);

const positions = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/positions" }),
  schema: z.object({
    type: z.enum(["role", "break"]).default("role"),
    company: z.string(),
    role: z.string(),
    /** Contractual title. Shown only on the position page, under the role. */
    formalTitle: z.string().optional(),
    start: z.coerce.date(),
    end: z.union([z.coerce.date(), z.literal("present")]),
    location: z.string().optional(),
    industry: z.string().optional(),
    summary: z.string(),
    order: z.number(),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    position: z.string(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    readTime: z.string().optional(),
    description: z.string(),
    cover: z.string().optional(),
    kpis: z
      .array(
        z.object({
          value: z.string().regex(/\d/,"KPI value must contain a figure (a digit). A KPI slot holds a figure."),
          label: z.string(),
        }),
      )
      .default([]),
    chips: z
      .record(z.string(), z.array(z.string()).max(3, "At most 3 chip values per key."))
      .refine((o) => Object.keys(o).length <= 3, "At most 3 chip keys.")
      .default({}),
  }).superRefine((d, ctx) => {
    const industry = POSITION_INDUSTRY[d.position]?.toLowerCase();
    if (!industry) return;
    for (const [key, values] of Object.entries(d.chips)) {
      for (const v of values) {
        if (v.toLowerCase() === industry) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["chips", key],
            message: `Chip "${v}" repeats the industry of ${d.position}. Chips exist to tell cards apart.`,
          });
        }
      }
    }
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    readTime: z.string().optional(),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
  }),
});

const photos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/photos" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
    description: z.string().optional(),
    cover: z.string(),
    draft: z.boolean().default(false),
    // Places or themes this set belongs to. Drives the filter chips on
    // /photography, which are derived from these values, so a chip only ever
    // appears once a set actually carries the tag.
    tags: z.array(z.string()).default([]),
    frames: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
          camera: z.string().optional(),
          lens: z.string().optional(),
          focal: z.string().optional(),
          aperture: z.string().optional(),
          shutter: z.string().optional(),
          iso: z.string().optional(),
          wide: z.boolean().default(false),
        }),
      )
      .default([]),
  }),
});

export const collections = { positions, work, posts, photos };
