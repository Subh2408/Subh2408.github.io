import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { publishedPosts } from "../lib/content";
import { url } from "../lib/paths";
import { SITE, PAGE_META } from "../lib/site";

export async function GET(context: APIContext) {
  const posts = await publishedPosts();
  return rss({
    title: `Writing by ${SITE.person}`,
    description: PAGE_META.writing.description,
    site: context.site ?? new URL("http://localhost:4321"),
    trailingSlash: false,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: url(`/writing/${p.id}`),
      categories: p.data.tags,
    })),
    customData: "<language>en-gb</language>",
  });
}
