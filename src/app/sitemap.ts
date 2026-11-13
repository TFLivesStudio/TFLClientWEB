import { localeUrl } from "@/i18n/shared";
import type { MetadataRoute } from "next";
import { getReleases, releasePath } from "@/lib/releases";
import { articles } from "@/lib/help";
export const revalidate = 900;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result = await getReleases();
  const latest = result.releases.reduce<string | undefined>((date, release) => {
    const updated = release.updatedAt || release.date;
    return !date || Date.parse(updated) > Date.parse(date) ? updated : date;
  }, undefined);
  const pages: {
    path: string;
    lastModified?: string;
    priority: number;
    changeFrequency: "daily" | "weekly" | "monthly";
  }[] = [
    {
      path: "/",
      priority: 1,
      changeFrequency: "weekly",
      lastModified:
        result.releases.find((release) => release.channel === "stable")
          ?.updatedAt ||
        result.releases.find((release) => release.channel === "stable")?.date,
    },
    { path: "/caracteristicas", priority: 0.8, changeFrequency: "monthly" },
    { path: "/selection", priority: 0.8, changeFrequency: "weekly" },
    {
      path: "/descargas",
      priority: 0.9,
      changeFrequency: "daily",
      lastModified: latest,
    },
    {
      path: "/novedades",
      priority: 0.8,
      changeFrequency: "daily",
      lastModified: latest,
    },
    { path: "/ayuda", priority: 0.7, changeFrequency: "monthly" },
    { path: "/comunidad", priority: 0.5, changeFrequency: "monthly" },
    { path: "/privacidad", priority: 0.3, changeFrequency: "monthly" },
    { path: "/legal/aviso-legal", priority: 0.3, changeFrequency: "monthly" },
    { path: "/legal/terminos", priority: 0.3, changeFrequency: "monthly" },
    ...articles.map((a) => ({
      path: `/ayuda/${a.slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
    ...result.releases.map((release) => ({
      path: releasePath(release.tag),
      lastModified: release.updatedAt || release.date,
      priority: 0.5,
      changeFrequency: "monthly" as const,
    })),
  ];
  return pages.flatMap(({ path, ...page }) => {
    const languages = {
      es: localeUrl(path, "es"),
      en: localeUrl(path, "en"),
      "x-default": localeUrl(path, "es"),
    };
    return (["es", "en"] as const).map((locale) => ({
      ...page,
      url: languages[locale],
      alternates: { languages },
    }));
  });
}
