/**
 * Builds the flat list of frames the photography page renders.
 *
 * Frames keep a global index so the lightbox can walk the whole page with the
 * arrow keys rather than stopping at a set boundary.
 *
 * The first frame of a set is its hero and takes a 2x2 block at the top left of
 * the grid; everything after it flows through the uniform three column grid.
 * A set of one or two photographs gets no hero, because there would be nothing
 * for the lead image to lead.
 */
import { getCollection } from "astro:content";
import { readFrameMeta, resolvePhoto, type FrameMeta } from "./exif";
import { url } from "./paths";

/** Below this many frames a set is shown uniform, with no lead image. */
const HERO_MIN_FRAMES = 3;

export interface Frame extends FrameMeta {
  index: number;
  setSlug: string;
  setTitle: string;
  src: string;
  href: string;
  alt: string;
  caption?: string;
  location?: string;
  hero: boolean;
  exists: boolean;
}

export interface PhotoSet {
  slug: string;
  title: string;
  date: Date;
  location?: string;
  description?: string;
  /** Places or themes. Drives the filter chips on /photography. */
  tags: string[];
  frames: Frame[];
}

export async function photoSets(): Promise<PhotoSet[]> {
  const sets = (await getCollection("photos", ({ data }) => !data.draft)).sort(
    (a, b) => +b.data.date - +a.data.date
  );

  const out: PhotoSet[] = [];
  let index = 0;

  for (const set of sets) {
    const frames: Frame[] = [];
    for (const [i, frame] of set.data.frames.entries()) {
      const fromFile = await readFrameMeta(set.id, frame.src);
      // Build the URL from the real directory and filename on disk, not from
      // what the frontmatter typed, so casing can never break the deployed
      // link. See resolvePhoto in ./exif.
      const found = resolvePhoto(set.id, frame.src);
      if (!found) {
        // Say so at build time. Otherwise a typo in a filename renders as a
        // quiet grey tile that is easy to mistake for a styling problem.
        console.warn(
          `[photos] ${set.id}: no file for "${frame.src}". Looked in public/images/photos/${set.id}/`
        );
      }
      frames.push({
        index: index++,
        setSlug: set.id,
        setTitle: set.data.title,
        src: frame.src,
        href: found
          ? url(`/images/photos/${found.dir}/${found.file}`)
          : url(`/images/photos/${set.id}/${frame.src}`),
        alt: frame.alt,
        caption: frame.caption,
        location: set.data.location,
        hero: i === 0 && set.data.frames.length >= HERO_MIN_FRAMES,
        exists: found !== null,
        // Frontmatter wins over the file.
        camera: frame.camera ?? fromFile.camera,
        lens: frame.lens ?? fromFile.lens,
        focal: frame.focal ?? fromFile.focal,
        aperture: frame.aperture ?? fromFile.aperture,
        shutter: frame.shutter ?? fromFile.shutter,
        iso: frame.iso ?? fromFile.iso,
        taken: fromFile.taken,
        width: fromFile.width,
        height: fromFile.height,
      });
    }
    out.push({
      slug: set.id,
      title: set.data.title,
      date: set.data.date,
      location: set.data.location,
      description: set.data.description,
      tags: set.data.tags,
      frames,
    });
  }

  return out;
}
