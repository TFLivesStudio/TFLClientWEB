import { test, expect } from "@playwright/test";
test("home, gallery, lightbox and FAQ work without browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Tu Minecraft.",
  );
  await expect(page.locator(".product-shot")).toBeVisible();
  await page.getByRole("button", { name: /Ver captura 2/ }).click();
  await expect(page.locator(".product-shot")).toHaveAttribute(
    "src",
    /launcher-settings/,
  );
  await page.getByRole("button", { name: "Ampliar captura" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByText("¿Qué es TFL Client?", { exact: true }).click();
  await expect(page.locator("details[open]")).toContainText("Es el launcher");
  expect(errors).toEqual([]);
});
test("all local pages render and downloads allow manual platform selection", async ({
  page,
}) => {
  for (const path of [
    "/caracteristicas",
    "/selection",
    "/novedades",
    "/ayuda",
    "/comunidad",
    "/privacidad",
    "/descargas",
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
  }
  for (const system of ["macOS", "Linux", "Windows"]) {
    await page.getByRole("button", { name: system, exact: true }).click();
    await expect(
      page.getByRole("button", { name: system, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".download-body")).toContainText(
      system.toUpperCase(),
    );
  }
  await page.goto("/a-page-that-does-not-exist");
  await expect(page.locator("h1")).toContainText("Este mundo no existe");
});
test("mobile menu, reduced motion and layout", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".ambient canvas")).toHaveCount(0);
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "TFL Selection" })
    .click();
  await expect(page).toHaveURL("/selection");
  await expect(page.getByRole("button", { name: "Abrir menú" })).toBeVisible();
  for (const path of [
    "/",
    "/selection",
    "/descargas",
    "/caracteristicas",
    "/ayuda",
  ]) {
    await page.goto(path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});
test("skip link is keyboard accessible", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Saltar al contenido" }),
  ).toBeFocused();
});

test("devices without WebGL retain the page and navigation", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      if (type === "webgl" || type === "webgl2") return null;
      return Reflect.apply(getContext, this, [type, ...args]);
    } as typeof getContext;
  });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Tu Minecraft.",
  );
  await page.getByRole("link", { name: "Descubre el launcher" }).click();
  await expect(page).toHaveURL("/caracteristicas");
  expect(errors).toEqual([]);
});
