"use client";
import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { useTheme } from "next-themes";
const PatternWaves = dynamic(() => import("./PatternWaves"), { ssr: false });
class GraphicsBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export function Ambient() {
  const { resolvedTheme } = useTheme();
  const [settings, setSettings] = useState({
    color: "transparent",
    reduced: true,
    hidden: false,
    dpr: 1,
  });
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setSettings({
        color: `hsl(${getComputedStyle(document.documentElement).getPropertyValue("--primary").trim()})`,
        reduced: preference.matches,
        hidden: document.hidden,
        dpr: navigator.hardwareConcurrency <= 4 ? 0.85 : 1.25,
      });
    update();
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [resolvedTheme]);
  return (
    <div
      className="ambient"
      aria-hidden="true"
      data-graphics={failed ? "unavailable" : ready ? "webgl" : "loading"}
    >
      <div
        className="silk-static"
        style={{ opacity: ready && !failed ? 0 : 1 }}
      />
      {!failed && settings.color !== "transparent" && (
        <GraphicsBoundary onFailure={() => setFailed(true)}>
          <div className="silk-gpu" style={{ opacity: ready ? 1 : 0 }}>
            <PatternWaves
              preset="silk"
              color={settings.color}
              backgroundColor="transparent"
              fade="edges"
              interactive={false}
              cursorStrength={0}
              paused={settings.reduced || settings.hidden}
              intro={!settings.reduced}
              maxDpr={settings.dpr}
              onReady={() => setReady(true)}
              onFailure={() => setFailed(true)}
            />
          </div>
        </GraphicsBoundary>
      )}
    </div>
  );
}
