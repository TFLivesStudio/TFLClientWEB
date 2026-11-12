"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const PatternWaves = dynamic(() => import("./PatternWaves"), { ssr: false });
export function Ambient() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const probe = document.createElement("canvas");
    const supported = !!(
      probe.getContext("webgl2") || probe.getContext("webgl")
    );
    const update = () =>
      setAnimate(supported && !query.matches && !document.hidden);
    update();
    query.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      query.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <div className="ambient" aria-hidden="true">
      {animate && (
        <PatternWaves
          preset="silk"
          color="#ffffff"
          backgroundColor="#000000"
          fade="edges"
          interactive
          cursorSize={50}
          cursorStrength={0.6}
        />
      )}
    </div>
  );
}
