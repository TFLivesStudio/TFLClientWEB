import type { MetadataRoute } from "next";
import { getReleases, releasePath } from "@/lib/releases";
import { articles } from "@/lib/help";
import { origin } from "@/lib/seo";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const r = await getReleases();
  return [
    ...[
      "/",
      "/caracteristicas",
      "/selection",
      "/descargas",
      "/novedades",
      "/ayuda",
      "/comunidad",
      "/privacidad",
    ].map((p) => ({ url: origin + p })),
    ...articles.map((a) => ({ url: origin + "/ayuda/" + a.slug })),
    ...r.releases.map((r) => ({
      url: origin + releasePath(r.tag),
      lastModified: r.date,
    })),
  ];
}
