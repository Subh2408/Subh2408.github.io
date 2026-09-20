/**
 * Post-build audit. Walks every HTML file in dist/ and checks the things
 * Lighthouse SEO and a basic accessibility pass look for, plus the rules from
 * CLAUDE.md that can be checked mechanically.
 *
 * Run: node scripts/audit.mjs
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const DIST = "dist";
const problems = [];
const titles = new Map();
const descriptions = new Map();

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}

function one(html, re) {
  const m = html.match(re);
  return m ? m[1] : null;
}

const files = walk(DIST);

for (const file of files) {
  const page = "/" + relative(DIST, file).replace(/\\/g, "/").replace(/index\.html$/, "");
  const html = readFileSync(file, "utf8");
  const fail = (msg) => problems.push(`${page}: ${msg}`);

  if (!/<html lang="en">/.test(html)) fail("no lang on html");

  const title = one(html, /<title>([^<]*)<\/title>/);
  if (!title) fail("no title");
  else {
    if (titles.has(title)) fail(`title duplicates ${titles.get(title)}`);
    titles.set(title, page);
  }

  const desc = one(html, /<meta name="description" content="([^"]*)"/);
  if (!desc) fail("no meta description");
  else if (desc.length < 50) fail(`meta description too short (${desc.length})`);
  else if (desc.length > 300) fail(`meta description too long (${desc.length})`);
  else {
    if (descriptions.has(desc)) fail(`description duplicates ${descriptions.get(desc)}`);
    descriptions.set(desc, page);
  }

  if (!/<link rel="canonical"/.test(html)) fail("no canonical");
  if (!/property="og:image"/.test(html)) fail("no og:image");

  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) fail(`${h1s.length} h1 elements, expected 1`);

  // Every img needs an alt attribute, even if empty for decorative ones.
  // Astro serialises alt="" as a bare `alt`, which is the same thing.
  for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\balt(?:=|\s|>)/.test(tag)) fail(`img without alt: ${tag.slice(0, 70)}`);
  }

  // JSON-LD must parse.
  for (const block of html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) ?? []) {
    const json = block.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "");
    try {
      JSON.parse(json);
    } catch (e) {
      fail(`invalid JSON-LD: ${e.message}`);
    }
  }

  // CLAUDE.md: no middle-dot triplets in running UI.
  const body = html.slice(html.indexOf("<body"));
  const text = body.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  if (/\S+\s+·\s+\S+\s+·\s+\S+/.test(text)) fail("middle-dot triplet in visible text");
}

console.log(`Audited ${files.length} pages.`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems) console.log(`  ${p}`);
  process.exitCode = 1;
} else {
  console.log("No problems found.");
}
