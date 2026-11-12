"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const PatternWaves = dynamic(() => import("./PatternWaves"), { ssr: false });
export function Ambient() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimate(!query.matches && !document.hidden);
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
          color="#4589FF"
          backgroundColor="#090E1A"
          opacity={0.36}
          speed={0.18}
          spacing={9}
          interactive={false}
          fade="edges"
        />
      )}
    </div>
  );
}
