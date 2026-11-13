"use client";
import { AnimatedTabs } from "./animated-ui";
import { useT } from "@/i18n/provider";
import Link from "@/components/locale-link";
import { useState } from "react";
import { releasePath, type Release } from "@/lib/release-model";
export function ReleaseHistory({ releases }: { releases: Release[] }) {
  const tr = useT();
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const filtered = releases.filter(
    (r) => filter === "all" || r.channel === filter,
  );
  const count = Math.max(1, Math.ceil(filtered.length / 12));
  return (
    <>
      <AnimatedTabs
        value={filter}
        onValueChange={(value) => {
          setFilter(value);
          setPage(1);
        }}
        label={tr("Filtrar versiones")}
        items={[
          { value: "all", label: tr("Todas") },
          { value: "stable", label: tr("Estables") },
          { value: "beta", label: tr("Betas") },
        ]}
      >
        <p className="result-count" aria-live="polite">
          {filtered.length} {tr("publicaciones")}
        </p>
        <div className="timeline">
          {filtered.slice((page - 1) * 12, page * 12).map((r) => (
            <article key={r.tag} className={`release-embed ${r.channel}`}>
              <time dateTime={r.date}>
                {new Date(r.date).toLocaleDateString(tr("es"), {
                  timeZone: "UTC",
                })}
              </time>
              <div>
                <span className={`badge ${r.channel}`}>
                  {r.channel === "stable" ? tr("Estable") : tr("Beta / prueba")}
                </span>
                <h2>
                  <Link href={releasePath(r.tag)}>{r.name}</Link>
                </h2>
                <code>{r.tag}</code>
                {r.body && (
                  <p className="release-excerpt">
                    {r.body.slice(0, 260)}
                    {r.body.length > 260 ? "…" : ""}
                  </p>
                )}
                {r.inconsistent && (
                  <p>
                    {tr(
                      "El tag indica una versión de prueba; GitHub no la marcó como prerelease.",
                    )}
                  </p>
                )}
                <Link className="text-link" href={releasePath(r.tag)}>
                  {tr("Leer notas y archivos →")}
                </Link>
              </div>
            </article>
          ))}
        </div>
        {!filtered.length && <p>{tr("No hay publicaciones en este canal.")}</p>}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            {tr("Anterior")}
          </button>
          <span>
            {tr("Página")} {page} {tr("de")} {count}
          </span>
          <button disabled={page === count} onClick={() => setPage(page + 1)}>
            {tr("Siguiente")}
          </button>
        </div>
      </AnimatedTabs>
    </>
  );
}
