import type { MetadataRoute } from "next";
import { docsNav } from "@/lib/docs-nav";

const BASE = "https://acfstandard.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const allHrefs = ["/", ...docsNav.flatMap((g) => g.items.map((i) => i.href))];
  const dedup = Array.from(new Set(allHrefs));

  return dedup.flatMap((href) => [
    {
      url: `${BASE}${href === "/" ? "" : href}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: href === "/" ? 1.0 : 0.8,
      alternates: {
        languages: {
          en: `${BASE}${href === "/" ? "" : href}`,
          fr: `${BASE}/fr${href === "/" ? "" : href}`,
        },
      },
    },
    {
      url: `${BASE}/fr${href === "/" ? "" : href}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: href === "/" ? 1.0 : 0.8,
    },
  ]);
}
