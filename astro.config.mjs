import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

// ── DEPLOY: replace YOUR_USERNAME before first deploy. ───────────────
// repo named <username>.github.io  → keep base: "/"
// repo named anything else (e.g. "portfolio"):
//     site: "https://YOUR_USERNAME.github.io", base: "/portfolio",
//     and use import.meta.env.BASE_URL for all internal links.
//
// Every internal link in this project already goes through url() in
// src/lib/paths.ts, which reads BASE_URL. Set base and they all follow.
// ────────────────────────────────────────────────────────────────────

const PUBLIC_DIR = fileURLToPath(new URL("./public/", import.meta.url));

/**
 * Case-study bodies reference images that are not in the repo yet
 * (`/images/projects/arch.png`). Rather than render a broken icon, swap the
 * image for a labelled placeholder that keeps the alt text and the path
 * visible, so it is obvious what file to drop in. Real images pass through
 * untouched.
 */
function rehypeMissingImages() {
  return (tree) => {
    const walk = (node, parent, index) => {
      if (node.type === "element" && node.tagName === "img" && parent) {
        const src = String(node.properties?.src ?? "");
        const alt = String(node.properties?.alt ?? "");
        const local = src.startsWith("/") && !src.startsWith("//");
        const onDisk = local && existsSync(join(PUBLIC_DIR, src.replace(/^\/+/, "")));
        if (local && !onDisk) {
          parent.children[index] = {
            type: "element",
            tagName: "span",
            properties: { className: ["imgph"] },
            children: [
              span("ip-k", "image"),
              span("ip-a", alt || "untitled"),
              span("ip-s", src),
            ],
          };
          return;
        }
        // Real file. Give it explicit loading behaviour so it never blocks.
        node.properties.loading = "lazy";
        node.properties.decoding = "async";
      }
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          walk(node.children[i], node, i);
        }
      }
    };
    walk(tree, null, 0);
  };
}

function span(cls, text) {
  return {
    type: "element",
    tagName: "span",
    properties: { className: [cls] },
    children: [{ type: "text", value: text }],
  };
}

export default defineConfig({
  site: "https://Subh2408.github.io",
  base: "/",
  output: "static",
  integrations: [react(), sitemap()],
  markdown: {
    rehypePlugins: [rehypeMissingImages],
  },
});
