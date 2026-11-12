import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/help";
import { seo } from "@/lib/seo";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return a ? seo(a.title, a.summary, `/ayuda/${a.slug}`) : {};
}
export default async function HelpArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  return (
    <div className="shell article-layout section">
      <aside>
        <Link href="/ayuda">← Centro de ayuda</Link>
        <nav aria-label="Artículos de ayuda">
          {articles.map((x) => (
            <Link
              aria-current={x.slug === slug ? "page" : undefined}
              href={`/ayuda/${x.slug}`}
              key={x.slug}
            >
              {x.title}
            </Link>
          ))}
        </nav>
      </aside>
      <article className="prose">
        <span className="eyebrow">{a.category}</span>
        <h1>{a.title}</h1>
        <p>{a.summary}</p>
        {a.sections.map(([title, text]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
        <div className="notice">
          Referencias: interfaz y código de{" "}
          <a href="https://github.com/TFLivesStudio/TFLClient">TFL Client</a>,{" "}
          <a href="https://github.com/TFLivesStudio/TFLClientSelection/blob/main/docs/LAUNCHER_CONTRACT.md">
            contrato de Selection
          </a>{" "}
          y notas de las releases oficiales. Revisa el historial si tu versión
          tiene un comportamiento distinto.
        </div>
      </article>
    </div>
  );
}
