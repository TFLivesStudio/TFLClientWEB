"use client";
import { useT } from "@/i18n/provider";
import Link from "@/components/locale-link";
import { useState } from "react";
import { articles } from "@/lib/help";
const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
export function HelpSearch() {
  const tr = useT();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(tr("Todas"));
  const filtered = articles.filter(
    (a) =>
      (category === tr("Todas") || a.category === category) &&
      normalize(
        [a.title, a.summary, ...a.sections.flat()].map(tr).join(" "),
      ).includes(normalize(query)),
  );
  return (
    <>
      <label className="search-label" htmlFor="help-search">
        {tr("Buscar en la ayuda")}
      </label>
      <input
        id="help-search"
        type="search"
        placeholder={tr("Microsoft, mods, Java, logs…")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div
        className="filter-bar"
        role="group"
        aria-label={tr("Categorías de ayuda")}
      >
        {[tr("Todas"), ...new Set(articles.map((a) => a.category))].map((c) => (
          <button
            key={tr(c)}
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
          >
            {tr(c)}
          </button>
        ))}
      </div>
      <p aria-live="polite">
        {filtered.length} {tr("artículos")}{" "}
      </p>
      <div className="help-grid">
        {filtered.map((a) => (
          <Link key={a.slug} href={`/ayuda/${a.slug}`}>
            <span className="eyebrow">{tr(a.category)}</span>
            <h2>{tr(a.title)}</h2>
            <p>{tr(a.summary)}</p>
            <span>{tr("Leer guía →")}</span>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <p>
          {tr("No hay resultados. Prueba otra palabra o selecciona Todas.")}
        </p>
      )}
    </>
  );
}
