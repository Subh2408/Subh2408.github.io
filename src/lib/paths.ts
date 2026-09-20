/**
 * Internal link helper.
 *
 * Every internal href must go through this. If the site is ever deployed to a
 * repo that is not `<username>.github.io`, `base` in astro.config.mjs changes
 * and BASE_URL changes with it. Hard-coded "/work" links would break.
 */
const BASE = import.meta.env.BASE_URL;

export function url(path = "/"): string {
  const base = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE;
  const rest = path.startsWith("/") ? path : `/${path}`;
  return `${base}${rest}` || "/";
}
