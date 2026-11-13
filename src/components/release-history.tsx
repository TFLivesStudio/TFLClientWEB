"use client";
import { AnimatedTabs } from "./animated-ui";
import { useT } from "@/i18n/provider";
import Link from "@/components/locale-link";
import { useSyncExternalStore } from "react";
import { localizedPath } from "@/i18n/shared";
import {
  historyState,
  historyQuery,
  type ReleaseSummary,
} from "@/lib/history-model";
import { releasePath } from "@/lib/release-model";
const subscribe = (notify: () => void) => {
  window.addEventListener("popstate", notify);
  window.addEventListener("tfl-url-change", notify);
  return () => {
    window.removeEventListener("popstate", notify);
    window.removeEventListener("tfl-url-change", notify);
  };
};
export function ReleaseHistory({
  releases,
  initialQuery = "",
}: {
  releases: ReleaseSummary[];
  initialQuery?: string;
}) {
  const tr = useT();
  const query = useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => initialQuery,
  );
  const params = new URLSearchParams(query);
  const { filter, filtered, page, count } = historyState(params, releases);
  const navigate = (channel: string, nextPage: number) => {
    const query = historyQuery(new URLSearchParams(params), channel, nextPage);
    const path = localizedPath("/novedades", tr.locale);
    window.history.pushState(
      window.history.state,
      "",
      path + (query ? `?${query}` : "") + window.location.hash,
    );
    window.dispatchEvent(new Event("tfl-url-change"));
  };
  return (
    <>
      <AnimatedTabs
        value={filter}
        onValueChange={(value) => {
          navigate(value, 1);
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
        <div className="timeline" id="release-results">
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
                {r.excerpt && <p className="release-excerpt">{r.excerpt}</p>}
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
        <nav className="pagination" aria-label={tr("Paginación de versiones")}>
          <button
            disabled={page === 1}
            aria-controls="release-results"
            onClick={() => navigate(filter, page - 1)}
          >
            {tr("Anterior")}
          </button>
          <span aria-live="polite">
            {tr("Página")} {page} {tr("de")} {count}
          </span>
          <button
            disabled={page === count}
            aria-controls="release-results"
            onClick={() => navigate(filter, page + 1)}
          >
            {tr("Siguiente")}
          </button>
        </nav>
      </AnimatedTabs>
    </>
  );
}
