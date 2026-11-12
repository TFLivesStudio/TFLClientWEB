import { getTranslator } from "@/i18n/server";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "@/components/locale-link";
import { getReleases } from "@/lib/releases";
import { Markdown } from "@/components/markdown";
import { seo } from "@/lib/seo";
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    tag: string;
  }>;
}) {
  const tr = await getTranslator();
  const { tag } = await params;
  return seo(
    `TFL Client ${tag}`,
    `${tr("Notas de versión y archivos de TFL Client")} ${tag}.`,
    `/novedades/${encodeURIComponent(tag)}`,
    tr.locale,
  );
}
export default async function ReleasePage({
  params,
}: {
  params: Promise<{
    tag: string;
  }>;
}) {
  const tr = await getTranslator();
  const { tag } = await params;
  const result = await getReleases();
  const r = result.releases.find((r) => r.tag === tag);
  if (!r) {
    if (result.status !== "ok" && result.status !== "empty")
      return (
        <section className="shell section">
          <h1>{tr("No pudimos consultar esta versión")}</h1>
          <p>{tr("GitHub no está disponible. Intenta de nuevo más tarde.")}</p>
          <a href="https://github.com/TFLivesStudio/TFLClient/releases">
            {tr("Ver GitHub")}
          </a>
        </section>
      );
    notFound();
  }
  return (
    <article className="shell release-detail section">
      <Link href="/novedades" className="text-link">
        {tr("← Historial de versiones")}
      </Link>
      <span className="badge">
        {r.channel === "stable" ? tr("Estable") : tr("Beta / prueba")}
      </span>
      <h1>{r.name}</h1>
      <p>
        <code>{r.tag}</code> ·{" "}
        <time dateTime={r.date}>
          {new Date(r.date).toLocaleDateString(tr("es"), { timeZone: "UTC" })}
        </time>
      </p>
      {r.inconsistent && (
        <div className="notice">
          {tr(
            "El tag indica una versión de prueba aunque GitHub no la marcó como prerelease.",
          )}
        </div>
      )}
      <p className="source-note">
        {tr("Notas originales, sin traducción automática.")}
      </p>
      {r.body ? (
        <Markdown body={r.body} />
      ) : (
        <p>{tr("Esta publicación no incluye notas de versión.")}</p>
      )}
      <h2>{tr("Archivos publicados")}</h2>
      <ul className="asset-list">
        {r.assets.map((a) => (
          <li key={a.url}>
            <a href={a.url}>{a.name}</a>
            <span>{(a.size / 1048576).toFixed(1)} MB</span>
          </li>
        ))}
      </ul>
      <a className="text-link" href={r.url}>
        {tr("Ver publicación original en GitHub")}{" "}
        <ArrowUpRight className="inline-icon" size={15} />
      </a>
    </article>
  );
}
