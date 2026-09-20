/**
 * Build-time check for a file in public/.
 *
 * Content frontmatter references images that may not be in the repo yet
 * (`cover: "/images/projects/SKU.jpg"`). Rendering an <img> for a file that is
 * not there gives a broken icon and a layout shift. This lets a page ask first
 * and fall back to a reserved-size placeholder instead.
 *
 * Runs at build only. Never import this into a client island.
 */
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const PUBLIC_DIR = fileURLToPath(new URL("../../public/", import.meta.url));

export function hasPublicFile(path: string | undefined): boolean {
  if (!path) return false;
  const clean = path.split("?")[0].split("#")[0].replace(/^\/+/, "");
  if (!clean || clean.includes("..")) return false;
  return existsSync(join(PUBLIC_DIR, clean));
}
