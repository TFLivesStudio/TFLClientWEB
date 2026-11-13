"use client";
import PatternWaves from "./PatternWaves";
import { Component, useEffect, useState, type ReactNode } from "react";
import { useMotionPreference } from "./motion-preference";
import { useTheme } from "next-themes";
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
  const { reduced } = useMotionPreference();
  const [settings, setSettings] = useState({
    color: "transparent",
    hidden: false,
    dpr: 1,
  });
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const update = () =>
      setSettings({
        color: `hsl(${getComputedStyle(document.documentElement).getPropertyValue("--primary").trim()})`,
        hidden: document.hidden,
        dpr: navigator.hardwareConcurrency <= 4 ? 0.85 : 1.25,
      });
    update();
    document.addEventListener("visibilitychange", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
    };
  }, [resolvedTheme]);
  return (
    <div
      className="ambient"
      aria-hidden="true"
      data-graphics={failed ? "unavailable" : ready ? "webgl" : "loading"}
    >
      {!failed && settings.color !== "transparent" && (
        <GraphicsBoundary onFailure={() => setFailed(true)}>
          <div className="silk-gpu" style={{ opacity: ready ? 1 : 0 }}>
            <PatternWaves
              preset="silk"
              color={settings.color}
              backgroundColor="transparent"
              fade="edges"
              interactive={!reduced}
              cursorSize={50}
              cursorStrength={0.6}
              paused={reduced || settings.hidden}
              intro={!reduced}
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
