"use client";
import { AnimatedTabs, AnimatedResults } from "./animated-ui";
import { useT } from "@/i18n/provider";
import Link from "@/components/locale-link";
import { useState } from "react";
import { articles } from "@/lib/help";
const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
export function HelpSearch() {
  const tr = useT();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const filtered = articles.filter(
    (a) =>
      (category === "all" || a.category === category) &&
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
      <AnimatedTabs
        value={category}
        onValueChange={setCategory}
        label={tr("Categorías de ayuda")}
        items={[
          { value: "all", label: tr("Todas") },
          ...[...new Set(articles.map((a) => a.category))].map((c) => ({
            value: c,
            label: tr(c),
          })),
        ]}
      >
        <p aria-live="polite">
          {filtered.length} {tr("artículos")}{" "}
        </p>
        <AnimatedResults resultKey={category + query}>
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
        </AnimatedResults>
        {!filtered.length && (
          <p>
            {tr("No hay resultados. Prueba otra palabra o selecciona Todas.")}
          </p>
        )}
      </AnimatedTabs>
    </>
  );
}
