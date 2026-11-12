"use client";
import Link from "next/link";
import { useState } from "react";
import { articles } from "@/lib/help";
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function HelpSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const filtered = articles.filter(
    (a) =>
      (category === "Todas" || a.category === category) &&
      normalize([a.title, a.summary, ...a.sections.flat()].join(" ")).includes(
        normalize(query),
      ),
  );
  return (
    <>
      <label className="search-label" htmlFor="help-search">
        Buscar en la ayuda
      </label>
      <input
        id="help-search"
        type="search"
        placeholder="Microsoft, mods, Java, logs…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="filter-bar" role="group" aria-label="Categorías de ayuda">
        {["Todas", ...new Set(articles.map((a) => a.category))].map((c) => (
          <button
            key={c}
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p aria-live="polite">{filtered.length} artículos</p>
      <div className="help-grid">
        {filtered.map((a) => (
          <Link key={a.slug} href={`/ayuda/${a.slug}`}>
            <span className="eyebrow">{a.category}</span>
            <h2>{a.title}</h2>
            <p>{a.summary}</p>
            <span>Leer guía →</span>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <p>No hay resultados. Prueba otra palabra o selecciona Todas.</p>
      )}
    </>
  );
}
