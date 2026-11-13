"use client";
// Circular View Transition adapted from Magic UI AnimatedThemeToggler (MIT).
// next-themes owns persistence and the pre-hydration theme script.
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { useRef, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { Hint } from "./animated-ui";
import { useT } from "@/i18n/provider";
const subscribe = () => () => {};
export function ThemeToggle() {
  const tr = useT();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const reduced = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const busy = useRef(false);
  const change = async () => {
    if (busy.current) return;
    const next = resolvedTheme === "dark" ? "light" : "dark";
    if (reduced || !document.startViewTransition || !ref.current) {
      setTheme(next);
      return;
    }
    busy.current = true;
    try {
      const { x, y, width, height } = ref.current.getBoundingClientRect();
      const cx = x + width / 2,
        cy = y + height / 2;
      const radius = Math.hypot(
        Math.max(cx, innerWidth - cx),
        Math.max(cy, innerHeight - cy),
      );
      const toRadius =
        (radius / (Math.hypot(innerWidth, innerHeight) / Math.SQRT2)) * 100;
      const at = `${(cx / innerWidth) * 100}% ${(cy / innerHeight) * 100}%`;
      const transition = document.startViewTransition(() => {
        flushSync(() => setTheme(next));
      });
      await transition.ready;
      document.documentElement.animate(
        { clipPath: [`circle(0% at ${at})`, `circle(${toRadius}% at ${at})`] },
        {
          duration: 420,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
      await transition.finished;
    } catch {
      setTheme(next);
    } finally {
      busy.current = false;
    }
  };
  const label =
    resolvedTheme === "light"
      ? tr("Activar tema oscuro")
      : tr("Activar tema claro");
  return (
    <div className="theme-controls">
      <Hint label={label}>
        <button
          ref={ref}
          className="icon-button theme-toggle"
          aria-label={label}
          onClick={change}
          disabled={!mounted}
        >
          {mounted && resolvedTheme === "light" ? (
            <Moon size={18} />
          ) : (
            <Sun size={18} />
          )}
        </button>
      </Hint>
      <Hint label={tr("Usar tema del sistema")}>
        <button
          className="icon-button system-theme"
          aria-label={tr("Usar tema del sistema")}
          aria-pressed={mounted && theme === "system"}
          onClick={() => setTheme("system")}
        >
          <Monitor size={15} />
        </button>
      </Hint>
    </div>
  );
}
