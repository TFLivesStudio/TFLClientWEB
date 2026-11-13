"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { useMotionPreference } from "./motion-preference";

/** Smooth mouse-wheel input; touch, keyboard and scrollbars keep native behavior. */
export function SmoothScroll() {
  const { reduced } = useMotionPreference();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      respectReducedMotion: false,
      anchors: false,
      stopInertiaOnNavigate: true,
      prevent: (node) =>
        !!node.closest('[role="dialog"], [data-lenis-prevent]'),
    });
    const navigateAnchor = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (
        !(anchor instanceof HTMLAnchorElement) ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      )
        return;
      const url = new URL(anchor.href);
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search ||
        !url.hash
      )
        return;
      let target: HTMLElement | null;
      try {
        target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      } catch {
        return;
      }
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, {
        onComplete: () => {
          history.pushState(history.state, "", url);
          window.dispatchEvent(new Event("tfl-url-change"));
          if (!target.hasAttribute("tabindex"))
            target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        },
      });
    };
    document.addEventListener("click", navigateAnchor);
    // Radix locks the body while an image is open; stop wheel inertia as well.
    const syncLock = () => {
      if (document.body.hasAttribute("data-scroll-locked")) lenis.stop();
      else lenis.start();
    };
    const observer = new MutationObserver(syncLock);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-scroll-locked"],
    });
    syncLock();
    return () => {
      observer.disconnect();
      document.removeEventListener("click", navigateAnchor);
      lenis.destroy();
    };
  }, [reduced]);
  return null;
}
