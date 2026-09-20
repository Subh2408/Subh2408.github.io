/**
 * Short labels for the timeline chips.
 *
 * A chip has to fit inside the gap between its year marker and the next one,
 * which is one column, about 97px at full width. Three companies do not fit
 * and are shortened here; everything else falls through to its full name.
 *
 * This is display-only. The full company name still appears on the chip's
 * aria-label and title, on the role cards below the axis, on the position page,
 * on the resume and in llms.txt. Nothing is lost, it is only abbreviated in the
 * one place where the space genuinely is not there.
 */
const SHORT: Record<string, string> = {
  // The group's own short form, used throughout the site's own copy.
  "qatar-insurance-group": "QIC",
  "caregiving": "Carer",
  // The company was an unnamed early-stage insurer, so there is no real short
  // name. This is the honest minimum that still says what it was.
  "auto-insurance-startup": "Auto insurer",
};

export function shortName(slug: string, fullName: string): string {
  return SHORT[slug] ?? fullName;
}
