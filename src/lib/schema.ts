/**
 * JSON-LD builders.
 *
 * Everything is keyed off a stable @id so the Person emitted on `/`, `/about`
 * and `/resume` is understood as one entity rather than three. Absolute URLs
 * are required by schema.org consumers, so each builder takes the origin.
 */
import { url } from "./paths";
import { SITE, EDUCATION, CERTIFICATIONS } from "./site";
import { isoMonth, monthLabel } from "./dates";
import type { Position, Work, Post } from "./content";

export function abs(origin: URL, path: string): string {
  return new URL(url(path), origin).href;
}

export function personId(origin: URL): string {
  return `${abs(origin, "/")}#person`;
}

export function breadcrumbList(origin: URL, items: { label: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.path ? { item: abs(origin, item.path) } : {}),
    })),
  };
}

/**
 * Person, with the full role history as `worksFor` and the current role as
 * `hasOccupation`. This is the highest-priority block on the site: it is what
 * an assistant answering "who works on AI product in Doha" reads.
 */
export function person(origin: URL, positions: Position[], skills: string[]) {
  const roles = positions.filter((p) => p.data.type === "role");
  const current = roles.find((p) => p.data.end === "present") ?? roles[0];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(origin),
    name: SITE.person,
    url: abs(origin, "/"),
    email: `mailto:${SITE.email}`,
    telephone: SITE.phone,
    jobTitle: current?.data.role ?? SITE.role,
    description:
      "Product and program leader in AI, machine learning and analytics. Leads enterprise AI strategy, governance and delivery at Qatar Insurance Group.",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.locality,
      addressCountry: SITE.country,
    },
    knowsAbout: skills,
    hasOccupation: {
      "@type": "Occupation",
      name: current?.data.role ?? SITE.role,
      occupationLocation: {
        "@type": "City",
        name: SITE.locality,
      },
      skills: skills.join(", "),
    },
    worksFor: roles.map((p) => ({
      "@type": "OrganizationRole",
      roleName: p.data.role,
      startDate: isoMonth(p.data.start),
      ...(p.data.end === "present" ? {} : { endDate: isoMonth(p.data.end) }),
      worksFor: {
        "@type": "Organization",
        name: p.data.company,
        ...(p.data.industry ? { description: p.data.industry } : {}),
      },
    })),
    alumniOf: EDUCATION.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.school,
    })),
    hasCredential: CERTIFICATIONS.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      credentialCategory: "certificate",
      recognizedBy: { "@type": "Organization", name: c.issuer },
      dateCreated: c.iso,
    })),
  };
}

/** Organization plus the role held there. One per position page. */
export function organizationRole(origin: URL, p: Position, workCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: p.data.company,
    ...(p.data.industry ? { description: p.data.industry } : {}),
    url: abs(origin, `/position/${p.id}`),
    member: {
      "@type": "OrganizationRole",
      roleName: p.data.role,
      startDate: isoMonth(p.data.start),
      ...(p.data.end === "present" ? {} : { endDate: isoMonth(p.data.end) }),
      member: { "@type": "Person", "@id": personId(origin), name: SITE.person },
      description: `${p.data.summary} ${workCount} case ${workCount === 1 ? "study" : "studies"} published.`,
    },
  };
}

/** CreativeWork for a case study. */
export function creativeWork(origin: URL, w: Work, position: Position | undefined) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: w.data.title,
    headline: w.data.title,
    description: w.data.description,
    url: abs(origin, `/work/${w.id}`),
    dateCreated: isoMonth(w.data.date),
    inLanguage: "en",
    creator: { "@type": "Person", "@id": personId(origin), name: SITE.person },
    author: { "@type": "Person", "@id": personId(origin), name: SITE.person },
    ...(position
      ? {
          sourceOrganization: {
            "@type": "Organization",
            name: position.data.company,
          },
          temporalCoverage: `${monthLabel(position.data.start)}/${monthLabel(position.data.end)}`,
        }
      : {}),
    ...(w.data.kpis.length
      ? {
          about: w.data.kpis.map((k) => ({
            "@type": "PropertyValue",
            name: k.label,
            value: k.value,
          })),
        }
      : {}),
  };
}

export function article(origin: URL, p: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.data.title,
    description: p.data.description,
    url: abs(origin, `/writing/${p.id}`),
    datePublished: p.data.date.toISOString().slice(0, 10),
    inLanguage: "en",
    keywords: p.data.tags.join(", "),
    author: { "@type": "Person", "@id": personId(origin), name: SITE.person },
    publisher: { "@type": "Person", "@id": personId(origin), name: SITE.person },
    mainEntityOfPage: { "@type": "WebPage", "@id": abs(origin, `/writing/${p.id}`) },
  };
}

export function imageObject(
  origin: URL,
  frame: {
    src: string;
    alt: string;
    caption?: string;
    camera?: string;
    lens?: string;
    aperture?: string;
    shutter?: string;
    iso?: string;
  },
  setTitle: string,
  location?: string
) {
  const exif = [frame.camera, frame.lens, frame.aperture, frame.shutter, frame.iso]
    .filter(Boolean)
    .join(", ");
  return {
    "@type": "ImageObject",
    name: frame.alt,
    contentUrl: abs(origin, frame.src),
    ...(frame.caption ? { caption: frame.caption } : {}),
    ...(location ? { contentLocation: { "@type": "Place", name: location } } : {}),
    ...(exif ? { exifData: exif } : {}),
    isPartOf: setTitle,
    creator: { "@type": "Person", "@id": personId(origin), name: SITE.person },
    copyrightHolder: { "@type": "Person", "@id": personId(origin), name: SITE.person },
  };
}
