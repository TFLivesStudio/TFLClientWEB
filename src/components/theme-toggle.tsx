"use client";
// Magic UI circular reveal, with an equivalent DOM/SVG fallback for older browsers.
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { useSyncExternalStore } from "react";
import { circularThemeTransition } from "@/lib/theme-transition";
import { useMotionPreference } from "./motion-preference";
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
  const { reduced } = useMotionPreference();
  const change = (button: HTMLButtonElement, next: string) =>
    circularThemeTransition(
      button,
      () => flushSync(() => setTheme(next)),
      () => flushSync(() => setTheme(theme || "dark")),
      reduced,
    );
  const label =
    mounted && resolvedTheme === "light"
      ? tr("Activar tema oscuro")
      : tr("Activar tema claro");
  return (
    <div className="theme-controls">
      <Hint label={label}>
        <button
          className="icon-button theme-toggle"
          aria-label={label}
          onClick={(e) =>
            void change(
              e.currentTarget,
              resolvedTheme === "dark" ? "light" : "dark",
            )
          }
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
          onClick={(e) => void change(e.currentTarget, "system")}
        >
          <Monitor size={15} />
        </button>
      </Hint>
    </div>
  );
}
