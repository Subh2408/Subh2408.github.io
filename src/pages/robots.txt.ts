import type { APIContext } from "astro";
import { url } from "../lib/paths";

export function GET(context: APIContext) {
  const origin = context.site ?? new URL("http://localhost:4321");
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${new URL(url("/sitemap-index.xml"), origin).href}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
