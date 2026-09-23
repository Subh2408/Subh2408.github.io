/**
 * The home page proof strip.
 *
 * Every number here is real and comes from a case study. Each row links to the
 * study it came from, which is what makes the strip navigation rather than
 * decoration. Do not add a number that is not on a work page.
 *
 * All of them render at once, as a ruled ledger on ink. An earlier version
 * showed one at a time on a timer, which hid six figures out of seven.
 *
 * Reorder or extend by editing this array. `kind` exists so a future row type
 * (a photograph, a small chart) can share the strip: add the kind here and a
 * branch in the proof strip markup in src/pages/index.astro.
 */
export interface Highlight {
  kind: "kpi";
  /** The figure. Set in Space Mono, because it is a number. */
  number: string;
  /** What the figure measures. */
  label: string;
  /** Where it came from. */
  context: string;
  /** Slug of the case study this card opens. */
  slug: string;
}

export const HIGHLIGHTS: Highlight[] = [
  {
    kind: "kpi",
    number: "$5M+",
    label: "annualised cost savings",
    context: "WNS · FMCG",
    slug: "sku-optimization",
  },
  {
    kind: "kpi",
    number: "15 hrs → ~15 min",
    label: "claims adjudication time",
    context: "Quantiphi · Insurance",
    slug: "claims-adjudication",
  },
  {
    kind: "kpi",
    number: "QCB",
    label: "AI regulatory submission led",
    context: "Qatar Insurance Group",
    slug: "qic-ai-governance-qcb",
  },
  {
    kind: "kpi",
    number: "5 teams",
    label: "served from one risk signal",
    context: "Qatar Insurance Group",
    slug: "qic-risk-operations-tool",
  },
  {
    kind: "kpi",
    number: "$2.5M+",
    label: "client account expansion",
    context: "Quantiphi · Semiconductor",
    slug: "semiconductor-defect-detection",
  },
  {
    kind: "kpi",
    number: "200+",
    label: "active users of LUMINA",
    context: "Qatar Insurance Group",
    slug: "qic-lumina",
  },
  {
    kind: "kpi",
    number: "8–10",
    label: "concurrent AI initiatives",
    context: "Qatar Insurance Group",
    slug: "qic-ai-portfolio-leadership",
  },
];
