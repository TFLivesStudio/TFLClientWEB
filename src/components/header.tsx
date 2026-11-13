"use client";
import { useMotionPreference } from "./motion-preference";
import { useT } from "@/i18n/provider";
import { languageHref, stripLocale } from "@/i18n/shared";
import Image from "next/image";
import Link from "@/components/locale-link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import { MotionPreferenceControl } from "./motion-preference";
import { ThemeToggle } from "./theme-toggle";
const links = [
  ["/caracteristicas", "Launcher"],
  ["/selection", "TFL Selection"],
  ["/novedades", "Novedades"],
  ["/ayuda", "Ayuda"],
];
const subscribe = (notify: () => void) => {
  window.addEventListener("popstate", notify);
  window.addEventListener("hashchange", notify);
  window.addEventListener("tfl-url-change", notify);
  return () => {
    window.removeEventListener("popstate", notify);
    window.removeEventListener("hashchange", notify);
    window.removeEventListener("tfl-url-change", notify);
  };
};
const AnimatedNavLink = motion.create(Link);
export function Brand() {
  const tr = useT();
  return (
    <Link className="brand" href="/" aria-label={tr("TFL Client, inicio")}>
      <Image src="/icons/launchers/tfl.png" alt="" width={38} height={30} />
      <span>
        TFL<span className="brand-light">CLIENT</span>
      </span>
    </Link>
  );
}
export function Header() {
  const tr = useT();
  const path = stripLocale(usePathname());
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState(tr.locale);
  const toggle = useRef<HTMLButtonElement>(null);
  const mobile = useRef<HTMLElement>(null);
  const { reduced: reduce } = useMotionPreference();
  const group = useId();
  const currentUrl = useSyncExternalStore(
    subscribe,
    () => location.href,
    () => undefined,
  );
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (
        !mobile.current?.contains(e.target as Node) &&
        !toggle.current?.contains(e.target as Node)
      )
        setOpen(false);
    };
    const size = () => {
      if (innerWidth > 1020) setOpen(false);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", size);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", size);
    };
  }, [open]);
  const navLink = ([href, label]: string[], animated: boolean) => (
    <AnimatedNavLink
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      key={href}
      href={href}
      aria-current={
        path === href || path.startsWith(href + "/") ? "page" : undefined
      }
      onClick={() => setOpen(false)}
    >
      {animated && (path === href || path.startsWith(href + "/")) && (
        <motion.span className="active-nav-indicator" layoutId="active-nav" />
      )}
      <span className="nav-label">{tr(label)}</span>
    </AnimatedNavLink>
  );
  return (
    <header className="header">
      <LayoutGroup id={group}>
        <div className="shell nav">
          <Brand />
          <nav
            aria-label={tr("Navegación principal")}
            className="nav-links desktop-nav"
          >
            {links.map((item) => navLink(item, true))}
          </nav>
          <div className="header-tools">
            <div
              className="locale-switch"
              role="group"
              aria-label={tr("Idioma")}
            >
              {(["es", "en"] as const).map((locale) => (
                <a
                  key={locale}
                  href={languageHref(path, locale, currentUrl)}
                  aria-current={tr.locale === locale ? "true" : undefined}
                  lang={locale}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
                      return;
                    e.preventDefault();
                    if (locale === tr.locale) return;
                    setLanguage(locale);
                    const href = languageHref(path, locale, location.href);
                    setTimeout(() => location.assign(href), reduce ? 0 : 170);
                  }}
                >
                  {language === locale && (
                    <motion.span
                      className="locale-indicator"
                      layoutId="language-indicator"
                    />
                  )}
                  <span>{locale.toUpperCase()}</span>
                </a>
              ))}
            </div>
            <ThemeToggle />
            <Link
              className="button small header-download"
              href="/descargas"
              aria-label={tr("Descargar")}
            >
              <ArrowDownToLine size={16} />
              <span>{tr("Descargar")}</span>
            </Link>
            <button
              ref={toggle}
              className="menu-toggle icon-button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls={open ? "mobile-nav" : undefined}
              aria-label={open ? tr("Cerrar menú") : tr("Abrir menú")}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={String(open)}
                  initial={{ opacity: 0, rotate: reduce ? 0 : -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {open ? <X /> : <Menu />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
          <AnimatePresence>
            {open && (
              <motion.nav
                ref={mobile}
                id="mobile-nav"
                aria-label={tr("Navegación móvil")}
                className="mobile-nav"
                initial={{ opacity: 0, y: reduce ? 0 : -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
              >
                {links.map((item) => navLink(item, false))}
                <div className="mobile-theme-settings">
                  <span>{tr("Apariencia")}</span>
                  <ThemeToggle />
                </div>
                <MotionPreferenceControl />
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </header>
  );
}
