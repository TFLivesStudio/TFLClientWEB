import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getReleases } from "@/lib/releases";
import { Markdown } from "@/components/markdown";
import { seo } from "@/lib/seo";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  return seo(
    `TFL Client ${tag}`,
    `Notas de versión y archivos de TFL Client ${tag}.`,
    `/novedades/${encodeURIComponent(tag)}`,
  );
}
export default async function ReleasePage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const result = await getReleases();
  const r = result.releases.find((r) => r.tag === tag);
  if (!r) {
    if (result.status !== "ok" && result.status !== "empty")
      return (
        <section className="shell section">
          <h1>No pudimos consultar esta versión</h1>
          <p>GitHub no está disponible. Intenta de nuevo más tarde.</p>
          <a href="https://github.com/TFLivesStudio/TFLClient/releases">
            Ver GitHub
          </a>
        </section>
      );
    notFound();
  }
  return (
    <article className="shell release-detail section">
      <Link href="/novedades" className="text-link">
        ← Historial de versiones
      </Link>
      <span className="badge">
        {r.channel === "stable" ? "Estable" : "Beta / prueba"}
      </span>
      <h1>{r.name}</h1>
      <p>
        <code>{r.tag}</code> ·{" "}
        <time dateTime={r.date}>
          {new Date(r.date).toLocaleDateString("es", { timeZone: "UTC" })}
        </time>
      </p>
      {r.inconsistent && (
        <div className="notice">
          El tag indica una versión de prueba aunque GitHub no la marcó como
          prerelease.
        </div>
      )}
      {r.body ? (
        <Markdown body={r.body} />
      ) : (
        <p>Esta publicación no incluye notas de versión.</p>
      )}
      <h2>Archivos publicados</h2>
      <ul className="asset-list">
        {r.assets.map((a) => (
          <li key={a.url}>
            <a href={a.url}>{a.name}</a>
            <span>{(a.size / 1048576).toFixed(1)} MB</span>
          </li>
        ))}
      </ul>
      <a className="text-link" href={r.url}>
        Ver publicación original en GitHub{" "}
        <ArrowUpRight className="inline-icon" size={15} />
      </a>
    </article>
  );
}
