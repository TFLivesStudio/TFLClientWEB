"use client";
import { useT } from "@/i18n/provider";
import { stripLocale, localizedPath } from "@/i18n/shared";
import Image from "next/image";
import Link from "@/components/locale-link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowDownToLine, Menu, X } from "lucide-react";
const links = [
  ["/caracteristicas", "Launcher"],
  ["/selection", "TFL Selection"],
  ["/novedades", "Novedades"],
  ["/ayuda", "Ayuda"],
];
export function Brand() {
  const tr = useT();
  return (
    <Link className="brand" href="/" aria-label={tr("TFL Client, inicio")}>
      <Image src="/images/tfl.svg" alt="" width={38} height={30} />
      <span>
        TFL<span className="brand-light">CLIENT</span>
      </span>
    </Link>
  );
}
export function Header() {
  const tr = useT();
  const [open, setOpen] = useState(false);
  const path = stripLocale(usePathname());
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, []);
  return (
    <header className="header">
      <div className="shell nav">
        <Brand />
        <nav
          id="main-nav"
          aria-label={tr("Navegación principal")}
          className={open ? "nav-links is-open" : "nav-links"}
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {tr(label)}
            </Link>
          ))}
        </nav>
        <div className="locale-switch" aria-label={tr("Idioma")}>
          <a
            href={path}
            aria-current={tr.locale === "es" ? "true" : undefined}
            lang="es"
          >
            ES
          </a>
          <a
            href={localizedPath(path, "en")}
            aria-current={tr.locale === "en" ? "true" : undefined}
            lang="en"
          >
            EN
          </a>
        </div>
        <Link className="button small" href="/descargas">
          <ArrowDownToLine size={16} />
          <span>{tr("Descargar")}</span>
        </Link>
        <button
          ref={toggle}
          className="menu-toggle icon-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? tr("Cerrar menú") : tr("Abrir menú")}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
