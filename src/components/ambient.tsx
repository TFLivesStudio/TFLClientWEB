"use client";
import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { SilkFallback } from "./silk-fallback";
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
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [gpu, setGpu] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const canvas = document.createElement("canvas");
    let gl: WebGL2RenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl2");
    } catch {}
    const supported = !!gl;
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    const update = () => {
      setReduced(preference.matches);
      setActive(!document.hidden);
      setGpu(supported);
    };
    update();
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <div className="ambient" aria-hidden="true">
      {(!ready || !gpu || reduced || !active) && (
        <SilkFallback paused={reduced || !active} />
      )}
      {active && !reduced && gpu && (
        <GraphicsBoundary
          onFailure={() => {
            setGpu(false);
            setReady(false);
          }}
        >
          <div className="silk-gpu" style={{ opacity: ready ? 1 : 0 }}>
            <PatternWaves
              preset="silk"
              color="#ffffff"
              backgroundColor="#000000"
              fade="edges"
              interactive
              cursorSize={50}
              cursorStrength={0.6}
              onReady={() => setReady(true)}
              onFailure={() => {
                setReady(false);
                setGpu(false);
              }}
            />
          </div>
        </GraphicsBoundary>
      )}
    </div>
  );
}
