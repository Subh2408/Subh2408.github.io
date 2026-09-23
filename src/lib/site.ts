/**
 * Site-level copy and facts.
 *
 * Copy here follows CLAUDE.md: short declarative sentences, no triads, no
 * em-dash asides, no "not X but Y", labels that name the thing. The strings
 * marked "author's copy" are Subhabrata's own and are reproduced verbatim.
 * Flag their cadence if asked; do not silently rewrite them.
 */

export const SITE = {
  /** Footer / site name. */
  name: "Subh : Product and AI",
  person: "Subhabrata Nag",
  role: "Product Leader, AI",
  locality: "Doha",
  country: "Qatar",
  email: "subhabrata.nag@outlook.com",
  phone: "+974 3154 9842",
  timezone: "Asia/Qatar",
  utcOffset: "GMT+3",
  resumePdf: "/resume/subhabrata-nag-resume.pdf",
} as const;

/** Hero. Author's copy. */
export const POSITIONING = "I build AI products for decisions that carry risk.";
export const SUBLINE = "I do my best work from zero to one. Eleven years across FMCG, semiconductor, adtech and insurance. Currently Manager, AI Strategy & Products at Qatar Insurance Group in Doha.";

/**
 * Approach pillars. Names follow the approved copy pass
 * ("Ship small", "Watch it run"). The bodies are the author's copy.
 */
export const APPROACH = [
  {
    k: "Frame the decision",
    v: "Start from the call someone has to make, not the model someone wants to build. Most analytics work fails because nobody wrote down what the output was for.",
  },
  {
    k: "Find the asymmetry",
    v: "Being wrong costs differently in each direction. Clearing a bad claim is not the same as delaying a good one. That asymmetry sets the threshold, not the accuracy score.",
  },
  {
    k: "Ship small",
    v: "Rules before models when there is no data. A version that can be corrected on Monday beats a version that is right in six months.",
  },
  {
    k: "Watch it run",
    v: "Instrument the decision, not just the deploy. The interesting failures show up in how people route around the system.",
  },
] as const;

/** Feeds Person.knowsAbout and Occupation.skills in the structured data. */
export const SKILLS = [
  "Product management",
  "Zero to one product development",
  "AI product management",
  "Product strategy",
  "Machine learning products",
  "Decision systems",
  "Retail and FMCG analytics",
  "MLOps",
  "AI governance",
  "Insurance",
] as const;

export const EDUCATION = [
  { qualification: "MSc Applied Econometrics", school: "University of Calcutta", from: "2012", to: "2014" },
  { qualification: "BSc Economics", school: "University of Calcutta", from: "2009", to: "2012" },
] as const;

export const CERTIFICATIONS = [
  { name: "Professional Scrum Master", issuer: "Scrum.org", date: "March 2024", iso: "2024-03" },
  { name: "AI Product Management", issuer: "Duke University via Coursera", date: "February 2023", iso: "2023-02" },
] as const;

/** Page titles and descriptions. Every page gets a unique pair. */
export const PAGE_META = {
  home: {
    title: "Subhabrata Nag, AI product leader in Doha",
    description:
      "Subhabrata Nag builds AI products for decisions that carry risk, from zero to one. Eleven years across FMCG, semiconductor, adtech and insurance. Currently Manager, AI Strategy & Products at Qatar Insurance Group in Doha.",
  },
  work: {
    title: "Work",
    description:
      "Eleven years of AI, machine learning and analytics products across FMCG, semiconductor, adtech and insurance. Five of the projects are interactive.",
  },
  writing: {
    title: "Writing",
    description: "Notes on machine learning, decisions, and photography by Subhabrata Nag.",
  },
  photography: {
    title: "Photography",
    description: "Photographs from Goa and Vietnam by Subhabrata Nag.",
  },
  about: {
    title: "About",
    description:
      "Subhabrata Nag is a product leader who takes AI products from zero to one, across FMCG, semiconductor, adtech and insurance. Based in Doha, Qatar.",
  },
  resume: {
    title: "Resume",
    description:
      "Resume of Subhabrata Nag. Eleven years building AI, machine learning and analytics products across FMCG, semiconductor, adtech and insurance.",
  },
} as const;
