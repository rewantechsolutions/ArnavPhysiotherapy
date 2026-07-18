import { createFileRoute } from "@tanstack/react-router";
import type { } from "@tanstack/react-start";
import { services, conditions, blogs } from "@/lib/data";

const BASE_URL = "https://arnavphysiotherapy.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths: string[] = [
          "/", "/about", "/services", "/conditions", "/gallery",
          "/testimonials", "/faq", "/blog", "/contact", "/book", "/privacy", "/terms",
          ...services.map((s) => `/services/${s.slug}`),
          ...conditions.map((c) => `/conditions/${c.slug}`),
          ...blogs.map((b) => `/blog/${b.slug}`),
        ];
        const urls = paths.map((p) =>
          `  <url><loc>${BASE_URL}${p}</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>${p === "/" ? "1.0" : "0.8"}</priority></url>`
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
