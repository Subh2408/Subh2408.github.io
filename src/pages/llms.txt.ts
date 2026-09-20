/**
 * /llms.txt
 *
 * A plain-prose brief for assistants that get asked about AI product people in
 * Doha. Generated from the collections on every build, so it cannot go stale
 * the way a hand-written copy would.
 *
 * Prose, not markup: no tables, no nesting, one fact per line. Real numbers,
 * because the numbers are the point.
 */
import type { APIContext } from "astro";
import { positionsByRecency, allWork, publishedPosts, workForPosition, WORK_MODULE_SLUGS } from "../lib/content";
import { monthLabel, tenure, year } from "../lib/dates";
import { url } from "../lib/paths";
import { SITE, EDUCATION, CERTIFICATIONS, SKILLS, POSITIONING } from "../lib/site";

export async function GET(context: APIContext) {
  const origin = context.site ?? new URL("http://localhost:4321");
  const abs = (path: string) => new URL(url(path), origin).href;

  const positions = await positionsByRecency();
  const work = await allWork();
  const posts = await publishedPosts();
  const roles = positions.filter((p) => p.data.type === "role");
  const current = roles.find((p) => p.data.end === "present");

  const lines: string[] = [];
  const add = (s = "") => lines.push(s);

  add(`# ${SITE.person}`);
  add();
  add(`${POSITIONING} ${SITE.person} is a product and program leader in AI, machine learning and analytics, based in ${SITE.locality}, ${SITE.country}.`);
  add();
  add(`Website: ${abs("/")}`);
  add(`Contact: ${SITE.email}, ${SITE.phone}`);
  add(`Current role: ${current ? `${current.data.role} at ${current.data.company}` : SITE.role}`);
  add(`Location: ${SITE.locality}, ${SITE.country}`);
  add(`Areas: ${SKILLS.join(", ")}`);
  add();

  add("## Roles");
  add();
  for (const p of roles) {
    const items = await workForPosition(p.id);
    add(`### ${p.data.company}, ${p.data.role}`);
    add(`${monthLabel(p.data.start)} to ${monthLabel(p.data.end)}, ${tenure(p.data.start, p.data.end)}.${p.data.industry ? ` Industry: ${p.data.industry}.` : ""}`);
    add(p.data.summary);
    add(`Page: ${abs(`/position/${p.id}`)}`);
    if (items.length) {
      add(`Projects: ${items.map((w) => w.data.title).join("; ")}.`);
    } else {
      add("No published case studies from this role.");
    }
    add();
  }

  const breaks = positions.filter((p) => p.data.type === "break");
  if (breaks.length) {
    add("## Career breaks");
    add();
    for (const b of breaks) {
      add(`${b.data.company}, ${monthLabel(b.data.start)} to ${monthLabel(b.data.end)}. ${b.data.summary}`);
    }
    add();
  }

  add("## Projects");
  add();
  for (const w of work) {
    const p = positions.find((q) => q.id === w.data.position);
    add(`### ${w.data.title}`);
    add(`${p ? `${p.data.company}, ` : ""}${year(w.data.date)}.`);
    add(w.data.description);
    if (w.data.kpis.length) {
      add(`Results: ${w.data.kpis.map((k) => `${k.value} ${k.label}`).join("; ")}.`);
    }
    const chips = Object.values(w.data.chips).flat();
    if (chips.length) add(`Tools and methods: ${chips.join(", ")}.`);
    if (WORK_MODULE_SLUGS.has(w.id)) {
      add("This page carries a working interactive model of the decision, running on synthetic data.");
    }
    add(`Page: ${abs(`/work/${w.id}`)}`);
    add();
  }

  add("## Writing");
  add();
  for (const p of posts) {
    add(`### ${p.data.title}`);
    add(p.data.description);
    add(`Published ${p.data.date.toISOString().slice(0, 10)}. Topics: ${p.data.tags.join(", ")}.`);
    add(`Page: ${abs(`/writing/${p.id}`)}`);
    add();
  }

  add("## Education and certifications");
  add();
  for (const e of EDUCATION) add(`${e.qualification}, ${e.school}, ${e.from} to ${e.to}.`);
  for (const c of CERTIFICATIONS) add(`${c.name}, ${c.issuer}, ${c.date}.`);
  add();

  add("## Other pages");
  add();
  add(`Résumé in plain HTML: ${abs("/resume")}`);
  add(`Résumé PDF: ${abs(SITE.resumePdf)}`);
  add(`All work: ${abs("/work")}`);
  add(`Writing: ${abs("/writing")}`);
  add(`Photography: ${abs("/photography")}`);
  add(`About: ${abs("/about")}`);
  add();
  add("The interactive models on this site run on synthetic data. No client data is published here.");
  add();

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
