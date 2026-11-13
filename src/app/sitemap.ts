import { localeUrl } from "@/i18n/shared";
import type { MetadataRoute } from "next";
import { getReleases, releasePath } from "@/lib/releases";
import { articles } from "@/lib/help";
import { origin } from "@/lib/seo";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const r = await getReleases();
  const pages = [
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
  return pages.flatMap((p) => {
    const path = p.url.slice(origin.length);
    const languages = {
      es: p.url,
      en: localeUrl(path, "en"),
    };
    return [
      { ...p, alternates: { languages } },
      { ...p, url: languages.en, alternates: { languages } },
    ];
  });
}
