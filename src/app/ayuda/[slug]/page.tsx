import {
  AnimatedAccordion,
  ScrollProgress,
  CopyLink,
} from "@/components/animated-ui";
import { getTranslator } from "@/i18n/server";
import Link from "@/components/locale-link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/help";
import { seo } from "@/lib/seo";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const tr = await getTranslator();
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return a
    ? seo(tr(a.title), tr(a.summary), `/ayuda/${a.slug}`, tr.locale)
    : {};
}
export default async function HelpArticle({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const tr = await getTranslator();
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  return (
    <div className="shell article-layout section">
      <ScrollProgress />
      <aside>
        <Link href="/ayuda">{tr("← Centro de ayuda")}</Link>
        <nav aria-label={tr("Artículos de ayuda")}>
          {articles.map((x) => (
            <Link
              aria-current={x.slug === slug ? "page" : undefined}
              href={`/ayuda/${x.slug}`}
              key={x.slug}
            >
              {tr(x.title)}
            </Link>
          ))}
        </nav>
      </aside>
      <article className="prose">
        <span className="eyebrow">{tr(a.category)}</span>
        <h1>{tr(a.title)}</h1>
        <p>{tr(a.summary)}</p>
        <CopyLink />
        <AnimatedAccordion
          headingLevel={2}
          items={a.sections.map(([title, text]) => ({
            title: tr(title),
            content: <p>{tr(text)}</p>,
          }))}
        />
        <div className="notice">
          {tr("Referencias: interfaz y código de")}{" "}
          <a href="https://github.com/TFLivesStudio/TFLClient">TFL Client</a>,{" "}
          {tr(
            "y notas de las releases oficiales. Revisa el historial si tu versión tiene un comportamiento distinto.",
          )}
        </div>
      </article>
    </div>
  );
}
