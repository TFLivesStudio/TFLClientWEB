import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("home, gallery, keyboard dialog and FAQ", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("TFL Client");
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(4, 5, 6)",
  );
  await expect(page.locator("body")).toHaveCSS("font-family", /Inter/);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Saltar al contenido" }),
  ).toBeFocused();
  await page.getByRole("button", { name: /Ver captura 1/ }).click();
  await expect(page.locator(".product-shot")).toHaveAttribute(
    "src",
    /launcher-console/,
  );
  await page.getByRole("button", { name: "Ampliar captura" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page
    .getByRole("button", { name: "¿Qué es TFL Client?", exact: true })
    .click();
  await expect(
    page.locator(".accordion-content[data-state=open]"),
  ).toContainText("Es el launcher");
  expect(errors).toEqual([]);
});
test("history filters, pagination and individual original notes", async ({
  page,
}) => {
  await page.goto("/novedades");
  await expect(page.locator(".timeline article")).toHaveCount(12);
  await page.getByRole("button", { name: "Siguiente", exact: true }).click();
  await expect(page.locator(".pagination")).toContainText("Página 2");
  await page.getByRole("tab", { name: "Betas", exact: true }).click();
  await expect(page.locator(".timeline .badge.stable")).toHaveCount(0);
  await page.locator(".timeline h2 a").first().click();
  await expect(page.locator(".release-detail h1")).toBeVisible();
  await expect(page.locator(".markdown")).toBeVisible();
  await expect(page.locator(".asset-list a").first()).toHaveAttribute(
    "href",
    /^https:\/\/github.com\/TFLivesStudio\/TFLClient\/releases\//,
  );
});
test("download channels, platforms and real official installers", async ({
  page,
}) => {
  await page.goto("/descargas");
  await expect(
    page.getByRole("tab", { name: "Estable · recomendada" }),
  ).toHaveAttribute("aria-selected", "true");
  for (const platform of ["Windows", "macOS", "Linux"]) {
    await page.getByRole("tab", { name: platform, exact: true }).click();
    await expect(page.locator(".download-body h2")).toContainText(platform);
    await expect(
      page.locator(".download-body .download-file").first(),
    ).toHaveAttribute(
      "href",
      /^https:\/\/github.com\/TFLivesStudio\/TFLClient\/releases\/download\//,
    );
  }
  await page.getByRole("tab", { name: "Beta · pruebas" }).click();
  await expect(page.locator(".download-body")).toContainText("Una beta puede");
});
test("verified Selection and local help search", async ({ page }) => {
  await page.goto("/selection");
  await expect(page.locator("body")).not.toContainText(
    /Ed25519|ornithe|Fabric|manifiesto|SHA-256/,
  );
  await expect(
    page.locator('a[href*="TFLClientSelection"],a[href*="TFLClientMOD"]'),
  ).toHaveCount(0);
  await expect(page.locator(".catalog-card")).not.toHaveCount(0);
  await page.goto("/ayuda");
  await page.getByLabel("Buscar en la ayuda").fill("tokens");
  await expect(page.locator(".help-grid>a")).toHaveCount(2);
  await page.getByLabel("Buscar en la ayuda").fill("logs");
  await page.locator(".help-grid>a").first().click();
  await expect(page.locator(".article-layout h1")).toBeVisible();
  await page.goto("/inexistente");
  await expect(page.locator("h1")).toContainText("Página no encontrada");
});
test("mobile navigation, site motion preference and page widths", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.locator('.silk-gpu [data-motion="animated"]'),
  ).toBeVisible();
  await page
    .getByRole("switch", { name: "Reducir animaciones" })
    .first()
    .click();
  await expect(page.locator('.silk-gpu [data-motion="static"]')).toBeVisible();
  await expect(page.locator('[data-renderer="canvas2d"]')).toHaveCount(0);
  expect(
    await page
      .locator(".memory-table")
      .evaluate((table) => table.getBoundingClientRect().right <= innerWidth),
  ).toBe(true);
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await page
    .getByRole("navigation", { name: "Navegación móvil" })
    .getByRole("link", { name: "TFL Selection" })
    .click();
  await expect(page).toHaveURL("/selection");
  for (const p of [
    "/",
    "/descargas",
    "/novedades",
    "/selection",
    "/caracteristicas",
    "/ayuda",
    "/comunidad",
    "/privacidad",
  ]) {
    await page.goto(p);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
test("without WebGL there is no Canvas 2D replacement", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      return type === "webgl" || type === "webgl2"
        ? null
        : Reflect.apply(original, this, [type, ...args]);
    } as typeof original;
  });
  await page.goto("/");
  await expect(
    page.locator('.ambient[data-graphics="unavailable"]'),
  ).toBeVisible();
  await expect(
    page.locator(".ambient canvas, .silk-static, [data-renderer=canvas2d]"),
  ).toHaveCount(0);
  await expect(page.locator("h1")).toHaveText("TFL Client");
});
test("metadata, sitemap, robots and accessible primary routes", async ({
  page,
  request,
}) => {
  for (const p of [
    "/",
    "/descargas",
    "/selection",
    "/ayuda",
    "/novedades",
    "/caracteristicas",
    "/comunidad",
    "/privacidad",
    "/ayuda/reportar",
    "/novedades/v0.15.3-beta.6",
  ]) {
    await page.goto(p);
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
      "href",
      `https://launcher.tflives.com${p === "/" ? "" : p}`,
    );
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  }
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain("/novedades/v");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");
});

test("WebGL remains active, images preload, carousel advances every six seconds and pauses only while expanded", async ({
  page,
}) => {
  test.setTimeout(45000);
  await page.goto("/");
  await expect(page.locator(".silk-gpu canvas")).toBeVisible();
  await page.waitForTimeout(2500);
  await expect(page.locator(".silk-gpu")).toHaveCSS("opacity", "1");
  await expect(page.locator("[data-renderer=canvas2d]")).toHaveCount(0);
  await expect(page.locator(".carousel-pause")).toHaveCount(0);
  await expect
    .poll(() =>
      page
        .locator(".gallery-shot")
        .evaluateAll((images) =>
          images.every(
            (img) =>
              (img as HTMLImageElement).complete &&
              (img as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  const shot = page.locator(".product-shot");
  const initial = await shot.getAttribute("src");
  await expect
    .poll(() => shot.getAttribute("src"), { timeout: 7500 })
    .not.toBe(initial);
  await page.getByRole("button", { name: "Ampliar captura" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.waitForTimeout(500);
  const box = await dialog.boundingBox();
  const viewport = page.viewportSize()!;
  expect(Math.abs(box!.x + box!.width / 2 - viewport.width / 2)).toBeLessThan(
    5,
  );
  expect(Math.abs(box!.y + box!.height / 2 - viewport.height / 2)).toBeLessThan(
    5,
  );
  const stopped = await shot.getAttribute("src");
  await page.waitForTimeout(6300);
  await expect(shot).toHaveAttribute("src", stopped!);
  await page.keyboard.press("ArrowRight");
  await expect(shot).not.toHaveAttribute("src", stopped!);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  const resumed = await shot.getAttribute("src");
  await expect
    .poll(() => shot.getAttribute("src"), { timeout: 7500 })
    .not.toBe(resumed);
});
test("English routes, translated help, locale links, Discord and memory table", async ({
  page,
}) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    page
      .getByRole("link", { name: "Download TFL Client", exact: true })
      .first(),
  ).toHaveAttribute("href", "/en/descargas");
  await expect(
    page.getByRole("link", { name: "TFLives Discord", exact: true }),
  ).toHaveAttribute("href", "https://discord.gg/tflives");
  for (const value of ["9", "100", "150", "880", "940"])
    await expect(
      page
        .locator(".memory-table strong")
        .filter({ hasText: new RegExp(`^${value}$`) }),
    ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [path, title] of [
    ["selection", "TFL Selection"],
    ["descargas", "Download TFL Client"],
    ["ayuda", "Help center"],
    ["comunidad", "Projects and participation"],
    ["privacidad", "Privacy and credits"],
    ["caracteristicas", "Installations and content, separated by profile"],
    ["novedades", "Version history"],
  ]) {
    await page.goto("/en/" + path);
    await expect(page.locator("h1")).toHaveText(title);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
      "href",
      `https://launcher.tflives.com/en/${path}`,
    );
  }
  await page.goto("/en/novedades/v0.15.3-beta.6");
  await expect(page.locator(".release-detail h1")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.goto("/en/ayuda");
  await page.getByLabel("Search help").fill("sharing");
  await page.locator(".help-grid>a").first().click();
  await expect(page.locator("h1")).toHaveText("Share logs and issues safely");
  await expect(page.locator(".prose")).toContainText("Review before sharing");
  await page.evaluate(() =>
    history.replaceState(null, "", location.pathname + "?from=help#reading"),
  );
  await page.getByRole("link", { name: "ES", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page).toHaveURL("/ayuda/reportar?from=help#reading");
});

test("light theme persists, system preference works, and light pages pass accessibility checks", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page
    .getByRole("button", { name: "Activar tema claro", exact: true })
    .click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/light/);
  for (const route of [
    "/",
    "/descargas",
    "/selection",
    "/ayuda",
    "/novedades",
    "/caracteristicas",
    "/comunidad",
    "/privacidad",
    "/ayuda/reportar",
    "/novedades/v0.15.3-beta.6",
  ]) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  }
  await page
    .getByRole("button", { name: "Usar tema del sistema", exact: true })
    .click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveClass(/dark/);
});
test("mobile dialog centers, traps focus, closes with Escape and restores its trigger", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Ampliar captura" }).click();
  const dialog = page.getByRole("dialog");
  const box = await dialog.boundingBox();
  expect(Math.abs(box!.x + box!.width / 2 - 195)).toBeLessThan(5);
  expect(Math.abs(box!.y + box!.height / 2 - 422)).toBeLessThan(5);
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((d) => d.contains(document.activeElement)),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Ampliar captura" }),
  ).toBeFocused();
  for (const width of [360, 768, 900, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
test("keyboard tabs, animated tooltips, copy toast and guide progress work", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/descargas");
  await page.getByRole("tab", { name: "Windows", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "macOS", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await page
    .getByRole("button", { name: "Activar tema claro", exact: true })
    .hover();
  await expect(page.getByRole("tooltip")).toContainText("Activar tema claro");
  await page.goto("/ayuda/reportar");
  await page
    .getByRole("button", { name: "Copiar enlace", exact: true })
    .click();
  await expect(page.locator("[data-sonner-toast]")).toContainText(
    "Enlace copiado",
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "/ayuda/reportar",
  );
  await page.evaluate(() =>
    scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
  );
  await expect
    .poll(() =>
      page
        .locator(".scroll-progress")
        .evaluate((e) => e.getBoundingClientRect().width / innerWidth),
    )
    .toBeGreaterThan(0.95);
});

test("lower concurrency keeps Pattern Waves at lower resolution, respects motion changes and uses real launcher icons", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "hardwareConcurrency", { get: () => 4 }),
  );
  await page.goto("/");
  const canvas = page.locator(".silk-gpu canvas");
  await expect(canvas).toBeVisible();
  expect(
    await canvas.evaluate(
      (c: HTMLCanvasElement) => c.width / c.getBoundingClientRect().width,
    ),
  ).toBeLessThanOrEqual(0.86);
  await expect(
    page.locator('.silk-gpu [data-motion="animated"]'),
  ).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(
    page.locator('.silk-gpu [data-motion="animated"]'),
  ).toBeVisible();
  await page
    .getByRole("switch", { name: "Reducir animaciones" })
    .first()
    .click();
  await expect(page.locator('.silk-gpu [data-motion="static"]')).toBeVisible();
  for (const icon of [
    "tfl.png",
    "prism.svg",
    "cmclient.png",
    "labymod.png",
    "lunar.png",
  ])
    await expect(page.locator(`.memory-table img[src*="${icon}"]`)).toHaveCount(
      1,
    );
  await expect(page.locator(".ambient [data-renderer=canvas2d]")).toHaveCount(
    0,
  );
});

test("OS reduced motion does not silently disable the intro, continuous waves or circular transition", async ({
  page,
}) => {
  test.setTimeout(45000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "hardwareConcurrency", { get: () => 4 }),
  );
  await page.goto("/");
  await expect(
    page.locator(".silk-static,[data-renderer=canvas2d]"),
  ).toHaveCount(0);
  await expect(
    page.locator('.silk-gpu [data-motion="animated"]'),
  ).toBeVisible();
  const canvas = page.locator(".silk-gpu canvas");
  const intro = await canvas.screenshot();
  await page.waitForTimeout(2400);
  const appeared = await canvas.screenshot();
  expect(intro.equals(appeared)).toBe(false);
  await page.waitForTimeout(900);
  expect(appeared.equals(await canvas.screenshot())).toBe(false);
  await page
    .getByRole("button", { name: "Activar tema claro", exact: true })
    .click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await expect
    .poll(() =>
      page.evaluate(() => {
        return document.getAnimations().some((animation) => {
          const effect = animation.effect;
          return (
            effect instanceof KeyframeEffect &&
            effect
              .getKeyframes()
              .some((frame) =>
                String(frame.clipPath || "").startsWith("circle("),
              )
          );
        });
      }),
    )
    .toBe(true);
});

test("circle reveal works without View Transitions and cleans its snapshot", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    Object.defineProperty(document, "startViewTransition", {
      value: undefined,
      configurable: true,
    });
  });
  await page.goto("/descargas");
  await page
    .getByRole("button", { name: "Activar tema claro", exact: true })
    .click();
  const snapshot = page.locator('[data-theme-transition="fallback"]');
  await expect(snapshot).toBeAttached();
  await expect(snapshot).toHaveAttribute("aria-hidden", "true");
  expect(await snapshot.evaluate((node) => (node as HTMLElement).inert)).toBe(
    true,
  );
  await expect(page.locator("html")).toHaveClass(/light/);
  await expect(snapshot).toHaveCount(0);
  await page
    .getByRole("button", { name: "Activar tema oscuro", exact: true })
    .click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(snapshot).toHaveCount(0);
  await expect(
    page.getByRole("tab", { name: "Linux", exact: true }),
  ).toBeVisible();
});

test("light launcher screenshots switch with the theme in gallery, detail and full image", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("tfl-theme", "light");
    localStorage.setItem("tfl-motion", "reduced");
  });
  await page.goto("/");
  await expect(page.locator(".gallery .product-shot:visible")).toHaveCount(1);
  await expect(page.locator(".gallery .product-shot:visible")).toHaveAttribute(
    "src",
    /launcher-console-light/,
  );
  await expect(
    page.locator(".themed-product-image img.theme-light"),
  ).toBeVisible();
  await expect(
    page.locator(".themed-product-image img.theme-dark"),
  ).not.toBeVisible();
  await page.getByRole("button", { name: "Ampliar captura" }).click();
  await expect(
    page.getByRole("dialog").locator("img.theme-light"),
  ).toBeVisible();
  await expect(
    page.getByRole("dialog").locator("img.theme-dark"),
  ).not.toBeVisible();
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Activar tema oscuro", exact: true })
    .click();
  await expect(page.locator(".gallery .product-shot:visible")).toHaveAttribute(
    "src",
    /launcher-console.webp/,
  );
});

test("cursor remains interactive without floating-point WebGL render targets", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const prototype = WebGL2RenderingContext.prototype;
    const originalExtension = prototype.getExtension;
    const originalProgram = prototype.createProgram;
    const programs: WebGLProgram[] = [];
    Object.assign(window, { tflTestPrograms: programs });
    Object.defineProperty(prototype, "getExtension", {
      configurable: true,
      value: function (this: WebGL2RenderingContext, name: string) {
        return name === "EXT_color_buffer_float"
          ? null
          : Reflect.apply(originalExtension, this, [name]);
      },
    });
    prototype.createProgram = function () {
      const program = originalProgram.call(this);
      if (program) programs.push(program);
      return program;
    };
  });
  await page.goto("/");
  await expect(page.locator(".silk-gpu canvas")).toBeVisible();
  await page.mouse.move(300, 250);
  await expect
    .poll(() =>
      page.locator(".silk-gpu canvas").evaluate((canvas: HTMLCanvasElement) => {
        const gl = canvas.getContext("webgl2")!;
        const programs = (
          window as unknown as { tflTestPrograms: WebGLProgram[] }
        ).tflTestPrograms;
        const program = programs.find((p) =>
          gl.getUniformLocation(p, "uCursor"),
        );
        if (!program) return 0;
        const location = gl.getUniformLocation(program, "uCursor");
        if (!location) return 0;
        return (gl.getUniform(program, location) as Float32Array)[3];
      }),
    )
    .toBeGreaterThan(0.5);
  await expect(page.locator(".ambient[data-graphics=webgl]")).toBeVisible();
});

test("wave highlights survive a complete dark-light-dark theme cycle", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("tfl-motion", "reduced");
    const original = WebGL2RenderingContext.prototype.createProgram;
    const programs: WebGLProgram[] = [];
    Object.assign(window, { tflHighlightPrograms: programs });
    WebGL2RenderingContext.prototype.createProgram = function () {
      const program = original.call(this);
      if (program) programs.push(program);
      return program;
    };
  });
  await page.goto("/");
  await expect(page.locator('.ambient[data-graphics="webgl"]')).toBeVisible();
  const lighting = () =>
    page.locator(".silk-gpu canvas").evaluate((canvas: HTMLCanvasElement) => {
      const gl = canvas.getContext("webgl2")!;
      const programs = (
        window as unknown as { tflHighlightPrograms: WebGLProgram[] }
      ).tflHighlightPrograms;
      const result: Record<string, number | number[]> = {};
      for (const program of programs)
        for (const name of ["uInk", "uColor", "uAccent"]) {
          const location = gl.getUniformLocation(program, name);
          if (location) {
            const value = gl.getUniform(program, location);
            result[name] =
              typeof value === "number"
                ? value
                : Array.from(value as Float32Array);
          }
        }
      return result;
    });
  const initial = await lighting();
  expect(initial.uInk).toBe(0);
  await page
    .getByRole("button", { name: "Activar tema claro", exact: true })
    .click();
  await expect.poll(async () => (await lighting()).uInk).toBe(1);
  expect((await lighting()).uColor).not.toEqual(initial.uColor);
  await page
    .getByRole("button", { name: "Activar tema oscuro", exact: true })
    .click();
  await expect.poll(lighting).toEqual(initial);
});

test("full-height hero, smooth anchor navigation, wheel input and modal scroll lock", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/lenis/);
  const heroBottom = await page
    .locator(".hero")
    .evaluate((el) => el.getBoundingClientRect().bottom);
  expect(Math.abs(heroBottom - 1000)).toBeLessThan(2);
  await page
    .getByRole("link", { name: "Explora el launcher", exact: true })
    .click();
  await expect
    .poll(() => page.evaluate(() => location.hash))
    .toBe("#launcher-preview");
  const galleryTop = await page
    .locator("#launcher-preview")
    .evaluate((el) => el.getBoundingClientRect().top);
  expect(galleryTop).toBeGreaterThanOrEqual(90);
  expect(galleryTop).toBeLessThan(110);
  const start = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 240);
  await expect
    .poll(() => page.evaluate(() => scrollY))
    .toBeGreaterThan(start + 150);
  await page.getByRole("button", { name: "Ampliar captura" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("html")).toHaveClass(/lenis-stopped/);
  const locked = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(250);
  expect(await page.evaluate(() => scrollY)).toBe(locked);
  await page.keyboard.press("Escape");
  await expect(page.locator("html")).not.toHaveClass(/lenis-stopped/);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  expect(
    Math.abs(
      (await page
        .locator(".hero")
        .evaluate((el) => el.getBoundingClientRect().bottom)) - 844,
    ),
  ).toBeLessThan(2);
});

test("Selection channel cards provide padding and readable wrapping in both themes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/selection");
  for (const next of ["Activar tema claro", "Activar tema oscuro"]) {
    const row = page.locator(".channel-row").first();
    await expect(row).toBeVisible();
    const spacing = await row.evaluate((el) => {
      const r = el.getBoundingClientRect(),
        text = el.querySelector("strong")!.getBoundingClientRect();
      return {
        paddingLeft: parseFloat(getComputedStyle(el).paddingLeft),
        left: text.left - r.left,
        right: r.right - text.right,
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    expect(spacing.paddingLeft).toBeGreaterThanOrEqual(20);
    expect(spacing.left).toBeGreaterThanOrEqual(20);
    expect(spacing.right).toBeGreaterThanOrEqual(20);
    expect(spacing.overflow).toBe(false);
    await page.getByRole("button", { name: next, exact: true }).click();
    await page.waitForTimeout(750);
  }
});

test("social previews, structured data and complete bilingual sitemap are crawlable without JavaScript", async ({
  request,
}) => {
  for (const prefix of ["", "/en"]) {
    const response = await request.get(prefix + "/selection");
    const html = await response.text();
    expect(html).toContain('property="og:image:width" content="1200"');
    expect(html).toContain('property="og:image:height" content="630"');
    expect(html).toContain(
      `https://launcher.tflives.com/images/social/tfl-client-${prefix ? "en" : "es"}.png`,
    );
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
    expect(html).toContain('name="theme-color" content="#4c8eff"');
    const data = JSON.parse(
      html.match(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
      )![1],
    );
    const webpage = data["@graph"].find(
      (node: Record<string, unknown>) => node["@type"] === "WebPage",
    );
    expect(webpage.url).toBe(`https://launcher.tflives.com${prefix}/selection`);
    expect(
      data["@graph"].some(
        (node: Record<string, unknown>) => node["@type"] === "BreadcrumbList",
      ),
    ).toBe(true);
    const image = await request.get(
      `/images/social/tfl-client-${prefix ? "en" : "es"}.png`,
    );
    expect(image.ok()).toBe(true);
    expect(image.headers()["content-type"]).toContain("image/png");
    expect((await image.body()).subarray(1, 4).toString()).toBe("PNG");
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain('hreflang="x-default"');
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );
  expect(new Set(locations).size).toBe(locations.length);
  for (const route of [
    "/selection",
    "/en/selection",
    "/ayuda/reportar",
    "/en/ayuda/reportar",
    "/novedades/v0.15.3-beta.6",
    "/en/novedades/v0.15.3-beta.6",
  ])
    expect(locations).toContain("https://launcher.tflives.com" + route);
});
