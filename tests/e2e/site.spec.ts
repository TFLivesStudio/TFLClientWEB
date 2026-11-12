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
    /launcher-welcome/,
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
  await expect(page.locator(".verified")).toContainText("Catálogo verificado");
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
