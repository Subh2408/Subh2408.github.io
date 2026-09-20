/**
 * Per-page Open Graph images, generated at build.
 *
 * One route per page, named to match the `ogImage` each page passes to the
 * base layout: /og/home.png, /og/work.png, /og/work-<slug>.png, and so on.
 */
import type { APIRoute } from "astro";
import { renderOg, type OgCard } from "../../lib/og";
import { allWork, positionsByRecency, publishedPosts, positionMap, workForPosition } from "../../lib/content";
import { monthLabel, year, longDate } from "../../lib/dates";
import { PAGE_META, SITE } from "../../lib/site";

export async function getStaticPaths() {
  const work = await allWork();
  const positions = await positionsByRecency();
  const posts = await publishedPosts();
  const byPosition = await positionMap();

  const paths: { params: { route: string }; props: { card: OgCard } }[] = [
    {
      params: { route: "home" },
      props: {
        card: {
          eyebrow: `${SITE.locality}, ${SITE.country}`,
          title: "I build AI products for decisions that carry risk.",
          facts: [SITE.role],
        },
      },
    },
    {
      params: { route: "work" },
      props: {
        card: { eyebrow: "Work", title: "Eleven years of work.", facts: [`${work.length} projects`] },
      },
    },
    {
      params: { route: "writing" },
      props: { card: { eyebrow: "Writing", title: PAGE_META.writing.description, facts: [`${posts.length} pieces`] } },
    },
    {
      params: { route: "photography" },
      props: { card: { eyebrow: "Photography", title: "Photographs from Doha, Kolkata and Goa." } },
    },
    {
      params: { route: "about" },
      props: { card: { eyebrow: "About", title: "Product, risk and AI.", facts: [`${SITE.locality}, ${SITE.country}`] } },
    },
    {
      params: { route: "resume" },
      props: { card: { eyebrow: "Résumé", title: "Eleven years in AI, ML and analytics.", facts: [SITE.role] } },
    },
  ];

  for (const w of work) {
    const p = byPosition.get(w.data.position);
    paths.push({
      params: { route: `work-${w.id}` },
      props: {
        card: {
          eyebrow: "Work",
          title: w.data.title,
          facts: [p?.data.company ?? "", year(w.data.date)].filter(Boolean),
        },
      },
    });
  }

  for (const p of positions) {
    const items = await workForPosition(p.id);
    paths.push({
      params: { route: `position-${p.id}` },
      props: {
        card: {
          eyebrow: p.data.role,
          title: p.data.company,
          facts: [
            `${monthLabel(p.data.start)} to ${monthLabel(p.data.end)}`,
            items.length ? `${items.length} project${items.length === 1 ? "" : "s"}` : "",
          ].filter(Boolean),
        },
      },
    });
  }

  for (const p of posts) {
    paths.push({
      params: { route: `post-${p.id}` },
      props: {
        card: {
          eyebrow: "Writing",
          title: p.data.title,
          facts: [longDate(p.data.date), p.data.readTime ?? ""].filter(Boolean),
        },
      },
    });
  }

  return paths;
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg((props as { card: OgCard }).card);
  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
