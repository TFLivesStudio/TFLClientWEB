"use client";
import Image from "next/image";
import Link from "next/link";
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
  return (
    <Link className="brand" href="/" aria-label="TFL Client, inicio">
      <Image src="/images/tfl.svg" alt="" width={38} height={30} />
      <span>
        TFL<span className="brand-light">CLIENT</span>
      </span>
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
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
          aria-label="Navegación principal"
          className={open ? "nav-links is-open" : "nav-links"}
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link className="button small" href="/descargas">
          <ArrowDownToLine size={16} />
          <span>Descargar</span>
        </Link>
        <button
          ref={toggle}
          className="menu-toggle icon-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
