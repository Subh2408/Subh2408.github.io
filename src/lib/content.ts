/**
 * Collection access. Every page reads through these so ordering is defined
 * once, not re-derived per route.
 */
import { getCollection, type CollectionEntry } from "astro:content";
import { resolve } from "./dates";

export type Position = CollectionEntry<"positions">;
export type Work = CollectionEntry<"work">;
export type Post = CollectionEntry<"posts">;

/**
 * Work slugs that have an interactive module. Kept as plain strings so .astro
 * pages can render the "playable" chip without pulling in React. The map from
 * slug to component lives in components/modules/registry.ts.
 */
export const WORK_MODULE_SLUGS = new Set([
  "claims-adjudication",
  "sku-optimization",
  "sales-driver-analysis",
  "market-basket-analysis",
  "qic-risk-operations-tool",
]);

export const POST_MODULE_SLUGS = new Set(["exploration-vs-exploitation-k-bandit"]);

/** Newest first, breaks included. This is the chronological spine of the site. */
export async function positionsByRecency(): Promise<Position[]> {
  const all = await getCollection("positions");
  return all.sort((a, b) => +resolve(b.data.end) - +resolve(a.data.end));
}

/** Roles only, newest first. Feeds the role cards below the timeline. */
export async function rolesByRecency(): Promise<Position[]> {
  return (await positionsByRecency()).filter((p) => p.data.type === "role");
}

export async function breaks(): Promise<Position[]> {
  return (await positionsByRecency()).filter((p) => p.data.type === "break");
}

export async function allWork(): Promise<Work[]> {
  const all = await getCollection("work");
  return all.sort((a, b) => +b.data.date - +a.data.date);
}

/** Ordered as the position page lists them: the author's `order` field. */
export async function workForPosition(slug: string): Promise<Work[]> {
  const all = await getCollection("work");
  return all
    .filter((w) => w.data.position === slug)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function publishedPosts(): Promise<Post[]> {
  const all = await getCollection("posts");
  return all.filter((p) => !p.data.draft).sort((a, b) => +b.data.date - +a.data.date);
}

export async function positionMap(): Promise<Map<string, Position>> {
  const all = await getCollection("positions");
  return new Map(all.map((p) => [p.id, p]));
}
