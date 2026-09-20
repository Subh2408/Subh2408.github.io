/**
 * Date helpers. Ported from reference/prototype.jsx.
 *
 * Frontmatter dates land as UTC midnight (`2015-01` becomes 2015-01-01T00:00Z),
 * so every read uses the UTC getters. Local getters would shift a January date
 * back into the previous December for anyone west of GMT.
 */

export type EndDate = Date | "present";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Timeline right edge and the resolved value of "present". */
export const NOW = new Date();

export function resolve(d: EndDate): Date {
  return d === "present" ? NOW : d;
}

/** "Aug 2025", or "present". Rendered in Space Mono. */
export function monthLabel(d: EndDate): string {
  if (d === "present") return "present";
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** ISO value for a <time datetime> attribute. */
export function isoMonth(d: EndDate): string {
  if (d === "present") return "";
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** "3 April 2025". */
export function longDate(d: Date): string {
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function year(d: Date): string {
  return String(d.getUTCFullYear());
}

/** "3 yr 2 mo". */
export function tenure(start: Date, end: EndDate): string {
  const a = start;
  const b = resolve(end);
  const months =
    (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + (b.getUTCMonth() - a.getUTCMonth());
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (!y && !m) return "1 mo";
  return (y ? `${y} yr` : "") + (y && m ? " " : "") + (m ? `${m} mo` : "");
}
