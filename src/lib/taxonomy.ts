/**
 * Two-axis filter taxonomy for /work.
 *
 * The work collection carries `chips` (stack / domain / method), which describe
 * a project. The filter needs something coarser and closed-ended, so the axes
 * live here rather than in frontmatter. Ported from the prototype's per-item
 * `tags`; the three QIC entries that postdate the prototype are added in the
 * same vocabulary.
 *
 * Adding a project: add its slug here too, or it appears under "all" only.
 */

export const DISCIPLINES = ["AI Strategy", "ML", "Data", "BI", "Ops", "Design"] as const;
export const INDUSTRIES = ["Insurance", "FMCG", "Semiconductor", "Adtech"] as const;

export type Discipline = (typeof DISCIPLINES)[number];
export type Industry = (typeof INDUSTRIES)[number];

type Axes = { discipline: Discipline[]; industry: Industry[] };

const TAGS: Record<string, Axes> = {
  "analytics-quality-program": { discipline: ["Ops", "BI"], industry: ["Adtech"] },
  "auto-insurance-mvp": { discipline: ["ML", "Design"], industry: ["Insurance"] },
  "churn-prediction": { discipline: ["ML", "Data"], industry: ["Insurance"] },
  "claims-adjudication": { discipline: ["ML", "Design"], industry: ["Insurance"] },
  "customer-360-insurance": { discipline: ["ML", "Data"], industry: ["Insurance"] },
  "fraud-detection": { discipline: ["ML", "Data"], industry: ["Insurance"] },
  "market-basket-analysis": { discipline: ["Data", "BI"], industry: ["FMCG"] },
  "qic-ai-governance-qcb": { discipline: ["AI Strategy", "Ops"], industry: ["Insurance"] },
  "qic-ai-portfolio-leadership": { discipline: ["Ops", "AI Strategy"], industry: ["Insurance"] },
  "qic-cloud-adoption-strategy": { discipline: ["AI Strategy", "Ops"], industry: ["Insurance"] },
  "qic-enterprise-ai-strategy": { discipline: ["AI Strategy"], industry: ["Insurance"] },
  "qic-lumina": { discipline: ["Design", "AI Strategy"], industry: ["Insurance"] },
  "qic-risk-operations-tool": { discipline: ["AI Strategy", "Design", "Ops"], industry: ["Insurance"] },
  "qic-underwriting-modernisation": { discipline: ["Ops", "AI Strategy"], industry: ["Insurance"] },
  "sales-driver-analysis": { discipline: ["Data"], industry: ["FMCG"] },
  "semiconductor-defect-detection": { discipline: ["ML", "Ops"], industry: ["Semiconductor"] },
  "sku-optimization": { discipline: ["Data", "BI"], industry: ["FMCG"] },
};

export function axesFor(slug: string): Axes {
  return TAGS[slug] ?? { discipline: [], industry: [] };
}

/** Flat list used as data attributes on a work row, for the client-side filter. */
export function tagList(slug: string): string[] {
  const a = axesFor(slug);
  return [...a.discipline, ...a.industry];
}
