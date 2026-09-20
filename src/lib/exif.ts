/**
 * Reads EXIF and pixel dimensions from a photo at build time, so a set's
 * markdown only has to carry captions.
 *
 * Frontmatter wins. A value written by hand is never overwritten by the file,
 * which is what makes the override comments in content-templates/photo-set.md
 * work. A missing file is not an error: the page falls back to a placeholder
 * tile of the right shape.
 *
 * Build only. Never import this into a client island.
 */
import exifr from "exifr";
import sharp from "sharp";
import { existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const PHOTOS_DIR = fileURLToPath(new URL("../../public/images/photos/", import.meta.url));

export interface FrameMeta {
  camera?: string;
  lens?: string;
  focal?: string;
  aperture?: string;
  shutter?: string;
  iso?: string;
  taken?: string;
  width?: number;
  height?: number;
}

const cache = new Map<string, FrameMeta>();

/**
 * Finds a photo on disk, ignoring case in both the set folder and the filename.
 *
 * Windows filesystems are case-insensitive and GitHub Pages is not, so a set
 * called `Vietnam.md` pointing at `bikeguy1.JPEG` resolves happily on the
 * author's machine and 404s once deployed. Resolving against the real entries
 * on disk means the emitted URL always matches the actual file, whatever case
 * the frontmatter used.
 */
const dirCache = new Map<string, string[]>();

function listing(dir: string): string[] {
  const cached = dirCache.get(dir);
  if (cached) return cached;
  let names: string[] = [];
  try {
    names = readdirSync(dir);
  } catch {
    names = [];
  }
  dirCache.set(dir, names);
  return names;
}

function matchCase(dir: string, wanted: string): string | undefined {
  const names = listing(dir);
  return (
    names.find((n) => n === wanted) ??
    names.find((n) => n.toLowerCase() === wanted.toLowerCase())
  );
}

export interface ResolvedPhoto {
  /** The folder name as it actually appears on disk. */
  dir: string;
  /** The filename as it actually appears on disk. */
  file: string;
  /** Absolute path, for reading. */
  path: string;
}

export function resolvePhoto(setSlug: string, src: string): ResolvedPhoto | null {
  const dir = matchCase(PHOTOS_DIR, setSlug);
  if (!dir) return null;
  const folder = join(PHOTOS_DIR, dir);
  const file = matchCase(folder, src);
  if (!file) return null;
  return { dir, file, path: join(folder, file) };
}

function shutterLabel(seconds: unknown): string | undefined {
  const t = typeof seconds === "number" ? seconds : undefined;
  if (!t || t <= 0) return undefined;
  return t < 1 ? `1/${Math.round(1 / t)} s` : `${Number(t.toFixed(1))} s`;
}

function cameraLabel(make: unknown, model: unknown): string | undefined {
  const mk = typeof make === "string" ? make.trim() : "";
  const md = typeof model === "string" ? model.trim() : "";
  if (!md) return mk || undefined;
  // "FUJIFILM" + "X-T4" reads as one name; "Fujifilm X-T4" already contains it.
  return md.toLowerCase().startsWith(mk.toLowerCase()) || !mk ? md : `${mk} ${md}`;
}

export async function readFrameMeta(setSlug: string, src: string): Promise<FrameMeta> {
  const key = `${setSlug}/${src}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const found = resolvePhoto(setSlug, src);
  const file = found?.path ?? "";
  const meta: FrameMeta = {};

  if (found && existsSync(file)) {
    try {
      const size = await sharp(file).metadata();
      meta.width = size.width;
      meta.height = size.height;
    } catch {
      // Not decodable by sharp. Dimensions stay undefined and the tile keeps
      // its default aspect ratio.
    }
    try {
      const tags = await exifr.parse(file, [
        "Make",
        "Model",
        "LensModel",
        "FocalLength",
        "FNumber",
        "ExposureTime",
        "ISO",
        "DateTimeOriginal",
      ]);
      if (tags) {
        meta.camera = cameraLabel(tags.Make, tags.Model);
        meta.lens = typeof tags.LensModel === "string" ? tags.LensModel : undefined;
        meta.focal = typeof tags.FocalLength === "number" ? `${Math.round(tags.FocalLength)} mm` : undefined;
        meta.aperture = typeof tags.FNumber === "number" ? `f/${Number(tags.FNumber.toFixed(1))}` : undefined;
        meta.shutter = shutterLabel(tags.ExposureTime);
        meta.iso = tags.ISO != null ? String(tags.ISO) : undefined;
        meta.taken =
          tags.DateTimeOriginal instanceof Date
            ? tags.DateTimeOriginal.toISOString().slice(0, 10)
            : undefined;
      }
    } catch {
      // No EXIF, or stripped on export. Frontmatter is the only source then.
    }
  }

  cache.set(key, meta);
  return meta;
}

export function photoExists(setSlug: string, src: string): boolean {
  return resolvePhoto(setSlug, src) !== null;
}
