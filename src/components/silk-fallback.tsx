"use client";
import { useEffect, useRef } from "react";

/** CPU renderer for the same visual family when WebGL2 is unavailable. */
export function SilkFallback({ paused }: { paused: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let raf = 0,
      last = -Infinity,
      time = 0,
      visible = true;
    const pointer = { x: -1000, y: -1000 };
    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight));
      draw();
    };
    const draw = () => {
      const w = canvas.width,
        h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      for (let y = 7; y < h; y += 14)
        for (let x = 7; x < w; x += 14) {
          const wave =
            Math.sin(x / 180 + y / 130 + time * 0.45) * 0.5 +
            Math.sin(x / 270 - y / 170 - time * 0.3) * 0.5;
          const edge = Math.max(
            0,
            Math.min(1, x / 120, (w - x) / 120, y / 90, (h - y) / 90),
          );
          const distance = Math.hypot(x - pointer.x, y - pointer.y);
          const ripple = paused ? 0 : Math.max(0, 1 - distance / 90) * 0.6;
          const size = 1 + (wave + 1) * 1.1 + ripple;
          ctx.fillStyle = `rgba(255,255,255,${(0.12 + (wave + 1) * 0.22 + ripple * 0.3) * edge})`;
          ctx.beginPath();
          ctx.arc(x, y + wave * 5, size, 0, Math.PI * 2);
          ctx.fill();
        }
    };
    const frame = (now: number) => {
      raf = 0;
      if (document.hidden || !visible || paused) return;
      if (now - last >= 1000 / 24) {
        time += Math.min((now - last) / 1000 || 0, 0.1);
        last = now;
        draw();
      }
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf && !paused && !document.hidden && visible) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else start();
    };
    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else start();
    });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("pointermove", move, { passive: true });
    resize();
    start();
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("pointermove", move);
    };
  }, [paused]);
  return (
    <canvas
      ref={ref}
      data-renderer="canvas2d"
      className="silk-fallback"
      aria-hidden="true"
    />
  );
}
