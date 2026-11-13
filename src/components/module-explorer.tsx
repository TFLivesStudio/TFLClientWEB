"use client";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion } from "motion/react";
import { Search, SlidersHorizontal, Layers, ArrowDown } from "lucide-react";
import modules from "@/lib/core-modules.json";
import { useT } from "@/i18n/provider";
import { useMotionPreference } from "./motion-preference";
const categories: Record<string, string> = {
  all: "Todos",
  HUD: "HUD",
  PVP: "PvP",
  WORLD: "Mundo",
  CHAT: "Chat",
  REDSTONE: "Redstone",
  PERFORMANCE: "Rendimiento",
  MISC: "Utilidades",
};
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function ModuleExplorer() {
  const tr = useT(),
    { reduced } = useMotionPreference();
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("all");
  const nested = useRef<Lenis | null>(null);
  const wrapper = useRef<HTMLDivElement>(null),
    content = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (reduced || !wrapper.current || !content.current) return;
    const scroll = new Lenis({
      wrapper: wrapper.current,
      content: content.current,
      autoRaf: true,
      lerp: 0.12,
      syncTouch: false,
      respectReducedMotion: false,
      overscroll: false,
    });
    nested.current = scroll;
    return () => {
      scroll.destroy();
      nested.current = null;
    };
  }, [reduced]);
  useEffect(() => {
    nested.current?.resize();
    nested.current?.scrollTo(0, { immediate: true, force: true });
    wrapper.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [query, category]);
  const filtered = modules.filter(
    (m) =>
      (category === "all" || m.category === category) &&
      normalize(`${m.name[tr.locale]} ${m.description[tr.locale]}`).includes(
        normalize(query.trim()),
      ),
  );
  return (
    <section className="shell section" id="core-modules">
      <div className="module-intro">
        <div>
          <span className="eyebrow">{tr("IMPULSADO POR TFL CORE")}</span>
          <h2>{tr("82 módulos de TFL Core")}</h2>
          <p>
            {tr(
              "Explora los 82 módulos del catálogo de la candidata. Busca una función o elige una categoría; la lista se desplaza dentro de su propio panel.",
            )}
          </p>
        </div>
        <span className="module-total">
          <Layers size={22} />
          <strong>{modules.length}</strong>
          <span>{tr("módulos catalogados")}</span>
        </span>
      </div>
      <div className="module-explorer">
        <div className="module-toolbar">
          <label className="module-search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">{tr("Buscar módulos de TFL Core")}</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tr("Busca zoom, HUD, mapas…")}
            />
          </label>
          <label className="module-select">
            <SlidersHorizontal size={16} aria-hidden="true" />
            <span className="sr-only">{tr("Categoría de módulos")}</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {Object.entries(categories).map(([id, label]) => (
                <option key={id} value={id}>
                  {tr(label)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="module-count" role="status">
          {filtered.length} {tr(filtered.length === 1 ? "módulo" : "módulos")}
          <span>
            <ArrowDown size={13} />
            {tr("Desplazamiento independiente")}
          </span>
        </div>
        <div
          ref={wrapper}
          className="module-scroll"
          role="region"
          aria-label={tr("Catálogo de módulos de TFL Core")}
          tabIndex={0}
          data-lenis-prevent
        >
          <motion.ul
            ref={content}
            className="module-list"
            initial={reduced ? false : { y: 6 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.18 }}
          >
            {filtered.map((m) => (
              <li key={m.id} className="module-card">
                <div className="module-card-heading">
                  <h3>{m.name[tr.locale]}</h3>
                  <span className={`module-status ${m.availability}`}>
                    {tr(
                      m.availability === "unavailable"
                        ? "No disponible"
                        : m.availability === "conditional"
                          ? "Según disponibilidad"
                          : "Vista previa",
                    )}
                  </span>
                </div>
                <p>{m.description[tr.locale]}</p>
                <span className="module-category">
                  {tr(categories[m.category])}
                </span>
              </li>
            ))}
            {!filtered.length && (
              <li className="module-empty">
                {tr("No hay módulos que coincidan con tu búsqueda.")}
              </li>
            )}
          </motion.ul>
        </div>
      </div>
      <p className="module-disclaimer">
        {tr(
          "Catálogo de una candidata en desarrollo. La presencia en esta lista no confirma disponibilidad en todos los clientes publicados ni certifica todas sus funciones en partida. Consulta los módulos habilitados en tu versión de Selection.",
        )}
      </p>
    </section>
  );
}
