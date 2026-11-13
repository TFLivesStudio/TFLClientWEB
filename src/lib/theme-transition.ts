/** Circular theme reveal, including a DOM/SVG path for browsers without View Transitions. */
let active = false;
const DURATION = 620;
const NS = "http://www.w3.org/2000/svg";
const nextFrame = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
const visualProperties = [
  "color",
  "background-color",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "box-shadow",
  "filter",
  "opacity",
  "color-scheme",
];
async function freezeViewport() {
  // Capture after the running WebGL renderer's frame, before the browser clears its drawing buffer.
  await nextFrame();
  const overlay = document.createElement("div");
  overlay.className = `theme-snapshot ${document.documentElement.className}`;
  overlay.dataset.themeTransition = "fallback";
  overlay.setAttribute("aria-hidden", "true");
  overlay.inert = true;
  Object.assign(overlay.style, {
    position: "fixed",
    left: "0",
    top: "0",
    width: `${document.documentElement.clientWidth}px`,
    height: `${innerHeight}px`,
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: "9999",
  });
  const root = getComputedStyle(document.documentElement);
  for (const property of root)
    if (property.startsWith("--"))
      overlay.style.setProperty(property, root.getPropertyValue(property));
  const body = document.body;
  const copy = body.cloneNode(true) as HTMLElement;
  const original = [body, ...body.querySelectorAll<HTMLElement>("*")];
  const cloned = [copy, ...copy.querySelectorAll<HTMLElement>("*")];
  for (let i = 0; i < original.length; i++) {
    const node = original[i],
      twin = cloned[i];
    if (!twin) continue;
    twin.removeAttribute("id");
    if (node instanceof HTMLImageElement) {
      const imageStyle = getComputedStyle(node);
      twin.style.display = imageStyle.display;
      twin.style.visibility = imageStyle.visibility;
    }
    const rect = node.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight || rect.width === 0) continue;
    const style = getComputedStyle(node);
    for (const property of visualProperties)
      twin.style.setProperty(property, style.getPropertyValue(property));
    // Snapshot images are ordinary bitmaps; no second renderer or interactive duplicate is created.
    if (node instanceof HTMLCanvasElement) {
      try {
        const img = document.createElement("img");
        img.src = node.toDataURL();
        img.style.cssText = twin.style.cssText;
        img.width = node.width;
        img.height = node.height;
        twin.replaceWith(img);
      } catch {
        twin.style.visibility = "hidden";
      }
    }
  }
  copy
    .querySelectorAll("script, [data-theme-transition], next-route-announcer")
    .forEach((node) => node.remove());
  copy.style.margin = "0";
  overlay.append(copy);
  return { overlay, scroll: window.scrollY };
}
async function fallbackReveal(
  origin: { x: number; y: number },
  radius: number,
  commit: () => void,
) {
  const { overlay, scroll } = await freezeViewport();
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.setAttribute("aria-hidden", "true");
  svg.style.position = "fixed";
  const defs = document.createElementNS(NS, "defs");
  const clip = document.createElementNS(NS, "clipPath");
  const id = `theme-reveal-${Math.random().toString(36).slice(2)}`;
  clip.id = id;
  clip.setAttribute("clipPathUnits", "userSpaceOnUse");
  const path = document.createElementNS(NS, "path");
  path.setAttribute("clip-rule", "evenodd");
  path.setAttribute("fill-rule", "evenodd");
  clip.append(path);
  defs.append(clip);
  svg.append(defs);
  const draw = (r: number) =>
    path.setAttribute(
      "d",
      `M0 0H${innerWidth}V${innerHeight}H0Z M${origin.x + r} ${origin.y}A${r} ${r} 0 1 0 ${origin.x - r} ${origin.y}A${r} ${r} 0 1 0 ${origin.x + r} ${origin.y}Z`,
    );
  draw(0.1);
  overlay.style.clipPath = `url(#${id})`;
  document.body.append(svg, overlay);
  overlay.scrollTop = scroll;
  try {
    commit();
    await new Promise<void>((resolve) => {
      let raf = 0;
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        cancelAnimationFrame(raf);
        clearTimeout(timer);
        document.removeEventListener("visibilitychange", visibility);
        resolve();
      };
      const visibility = () => {
        if (document.hidden) finish();
      };
      const timer = setTimeout(finish, DURATION + 500);
      document.addEventListener("visibilitychange", visibility);
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / DURATION);
        const ease =
          progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
        draw(Math.max(0.1, radius * ease));
        if (progress === 1) finish();
        else raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
  } finally {
    overlay.remove();
    svg.remove();
  }
}
export async function circularThemeTransition(
  button: HTMLElement,
  commit: () => void,
  restore: () => void,
  reduced: boolean,
) {
  if (active) return;
  if (reduced) {
    commit();
    return;
  }
  active = true;
  const rect = button.getBoundingClientRect();
  const x = rect.x + rect.width / 2,
    y = rect.y + rect.height / 2;
  const radius =
    Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 2;
  try {
    if (typeof document.startViewTransition !== "function") {
      await fallbackReveal({ x, y }, radius, commit);
      return;
    }
    const transition = document.startViewTransition(commit);
    try {
      await transition.ready;
      const at = `${(x / innerWidth) * 100}% ${(y / innerHeight) * 100}%`;
      const maxRadius =
        (radius / (Math.hypot(innerWidth, innerHeight) / Math.SQRT2)) * 100;
      const animation = document.documentElement.animate(
        { clipPath: [`circle(0% at ${at})`, `circle(${maxRadius}% at ${at})`] },
        {
          duration: DURATION,
          easing: "cubic-bezier(.65,0,.35,1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
      await animation.finished;
      await transition.finished;
    } catch {
      transition.skipTransition();
      restore();
      await fallbackReveal({ x, y }, radius, commit);
    }
  } finally {
    active = false;
  }
}
