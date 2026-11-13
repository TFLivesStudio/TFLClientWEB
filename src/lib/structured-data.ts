import { localeUrl, translate, type Locale } from "@/i18n/shared";
import { articles } from "./help";
import { origin, socialImage } from "./seo";
export const serializeJsonLd = (data: unknown) =>
  JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
const labels: Record<string, string> = {
  "/caracteristicas": "Launcher",
  "/selection": "TFL Selection",
  "/descargas": "Descargar TFL Client",
  "/novedades": "Historial de versiones",
  "/ayuda": "Centro de ayuda",
  "/comunidad": "Comunidad",
  "/privacidad": "Privacidad y créditos",
};
export function siteStructuredData(locale: Locale, path: string) {
  const tr = (s: string) => translate(s, locale);
  const url = localeUrl(path, locale);
  const article = articles.find((a) => path === `/ayuda/${a.slug}`);
  const release = path.startsWith("/novedades/")
    ? decodeURIComponent(path.slice("/novedades/".length))
    : undefined;
  const title = article
    ? tr(article.title)
    : release
      ? `TFL Client ${release}`
      : path === "/"
        ? tr("TFL Client | Launcher de Minecraft Java")
        : tr(labels[path] || "TFL Client");
  const crumbs = [{ name: tr("Inicio"), item: localeUrl("/", locale) }];
  if (article || release) {
    const parent = article ? "/ayuda" : "/novedades";
    crumbs.push({ name: tr(labels[parent]), item: localeUrl(parent, locale) });
  }
  if (path !== "/") crumbs.push({ name: title, item: url });
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: "TFLives",
        url: origin,
        logo: {
          "@type": "ImageObject",
          url: `${origin}/icons/launchers/tfl.png`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: "TFL Client",
        url: origin,
        inLanguage: ["es", "en"],
        publisher: { "@id": `${origin}/#organization` },
      },
      {
        "@type": article ? "TechArticle" : "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        inLanguage: locale,
        isPartOf: { "@id": `${origin}/#website` },
        about: { "@id": `${origin}/#launcher` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: socialImage(locale).url,
          width: 1200,
          height: 630,
          caption: socialImage(locale).alt,
        },
        ...(article
          ? {
              headline: title,
              description: tr(article.summary),
              author: { "@id": `${origin}/#organization` },
            }
          : {}),
        ...(path !== "/" ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
      },
      ...(path !== "/"
        ? [
            {
              "@type": "BreadcrumbList",
              "@id": `${url}#breadcrumb`,
              itemListElement: crumbs.map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                ...crumb,
              })),
            },
          ]
        : []),
    ],
  };
}
