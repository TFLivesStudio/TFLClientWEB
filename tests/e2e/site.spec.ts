import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("home, gallery, keyboard dialog and FAQ", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("TFL Client");
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(14, 16, 22)",
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
  await page.getByText("¿Qué es TFL Client?", { exact: true }).click();
  await expect(page.locator("details[open]")).toContainText("Es el launcher");
  expect(errors).toEqual([]);
});
test("history filters, pagination and individual original notes", async ({
  page,
}) => {
  await page.goto("/novedades");
  await expect(page.locator(".timeline article")).toHaveCount(12);
  await page.getByRole("button", { name: "Siguiente", exact: true }).click();
  await expect(page.locator(".pagination")).toContainText("Página 2");
  await page.getByRole("button", { name: "Betas", exact: true }).click();
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
    page.getByRole("button", { name: "Estable · recomendada" }),
  ).toHaveAttribute("aria-pressed", "true");
  for (const platform of ["Windows", "macOS", "Linux"]) {
    await page.getByRole("button", { name: platform, exact: true }).click();
    await expect(page.locator(".download-body h2")).toContainText(platform);
    await expect(
      page.locator(".download-body .download-file").first(),
    ).toHaveAttribute(
      "href",
      /^https:\/\/github.com\/TFLivesStudio\/TFLClient\/releases\/download\//,
    );
  }
  await page.getByRole("button", { name: "Beta · pruebas" }).click();
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
test("mobile navigation, static reduced motion background and page widths", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator('canvas[data-renderer="canvas2d"]')).toBeVisible();
  expect(await page.locator(".memory-table").evaluate((table) => table.getBoundingClientRect().right <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await page
    .getByRole("navigation")
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
test("no WebGL keeps an animated background", async ({ page }) => {
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
  const canvas = page.locator('canvas[data-renderer="canvas2d"]');
  await expect(canvas).toBeVisible();
  const before = await canvas.evaluate((c: HTMLCanvasElement) => c.toDataURL());
  await expect
    .poll(() => canvas.evaluate((c: HTMLCanvasElement) => c.toDataURL()))
    .not.toBe(before);
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

test("healthy WebGL stays active beyond the intro and the carousel advances", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".silk-gpu canvas")).toBeVisible();
  await page.waitForTimeout(2500);
  await expect(page.locator(".silk-gpu")).toHaveCSS("opacity", "1");
  await expect(page.locator("[data-renderer=canvas2d]")).toHaveCount(0);
  const shot = page.locator(".product-shot");
  const initial = await shot.getAttribute("src");
  await expect
    .poll(() => shot.getAttribute("src"), { timeout: 9000 })
    .not.toBe(initial);
  await page.getByRole("button", { name: "Pausar carrusel" }).click();
  const stopped = await shot.getAttribute("src");
  await page.waitForTimeout(6700);
  await expect(shot).toHaveAttribute("src", stopped!);
  await page.getByRole("button", { name: "Siguiente captura" }).click();
  await expect(shot).not.toHaveAttribute("src", stopped!);
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
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
      "href",
      `https://launcher.tflives.com/en/${path}`,
    );
  }
  await page.goto("/en/novedades/v0.15.3-beta.6");
  await expect(page.locator(".release-detail h1")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang","en");
  await page.goto("/en/ayuda");
  await page.getByLabel("Search help").fill("sharing");
  await page.locator(".help-grid>a").first().click();
  await expect(page.locator("h1")).toHaveText("Share logs and issues safely");
  await expect(page.locator(".prose")).toContainText("Review before sharing");
  await page.getByRole("link", { name: "ES", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});
