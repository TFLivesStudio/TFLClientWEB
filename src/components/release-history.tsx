"use client";
import Link from "next/link";
import { useState } from "react";
import { releasePath, type Release } from "@/lib/release-model";
export function ReleaseHistory({ releases }: { releases: Release[] }) {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const filtered = releases.filter(
    (r) => filter === "all" || r.channel === filter,
  );
  const count = Math.max(1, Math.ceil(filtered.length / 12));
  return (
    <>
      <div className="filter-bar" role="group" aria-label="Filtrar versiones">
        {[
          ["all", "Todas"],
          ["stable", "Estables"],
          ["beta", "Betas"],
        ].map(([v, l]) => (
          <button
            key={v}
            aria-pressed={filter === v}
            onClick={() => {
              setFilter(v);
              setPage(1);
            }}
          >
            {l}
          </button>
        ))}
        <span>{filtered.length} publicaciones</span>
      </div>
      <div className="timeline">
        {filtered.slice((page - 1) * 12, page * 12).map((r) => (
          <article key={r.tag}>
            <time dateTime={r.date}>
              {new Date(r.date).toLocaleDateString("es", { timeZone: "UTC" })}
            </time>
            <div>
              <span className={`badge ${r.channel}`}>
                {r.channel === "stable" ? "Estable" : "Beta / prueba"}
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
                  El tag indica una versión de prueba; GitHub no la marcó como
                  prerelease.
                </p>
              )}
              <Link className="text-link" href={releasePath(r.tag)}>
                Leer notas y archivos →
              </Link>
            </div>
          </article>
        ))}
      </div>
      {!filtered.length && <p>No hay publicaciones en este canal.</p>}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Anterior
        </button>
        <span>
          Página {page} de {count}
        </span>
        <button disabled={page === count} onClick={() => setPage(page + 1)}>
          Siguiente
        </button>
      </div>
    </>
  );
}
