"use client";
import { useT } from "@/i18n/provider";
export default function Loading() {
  const tr = useT();
  return (
    <div
      className="shell section loading-skeleton"
      role="status"
      aria-label={tr("Cargando contenido")}
      aria-busy="true"
    >
      <span className="skeleton skeleton-label" />
      <span className="skeleton skeleton-heading" />
      <span className="skeleton skeleton-text" />
      <div className="skeleton-grid">
        {[0, 1, 2].map((i) => (
          <div className="skeleton skeleton-card" key={i} />
        ))}
      </div>
    </div>
  );
}
