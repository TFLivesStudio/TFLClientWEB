/** Official Svelte frontend screenshots with a simulated native bridge; no real account or game. */
import { chromium } from "playwright";
import sharp from "sharp";
const theme = process.env.LAUNCHER_THEME === "dark" ? "dark" : "light";
const base = process.env.LAUNCHER_BASE_URL || "http://127.0.0.1:4173";
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  args: ["--no-sandbox"],
});
async function open(hasInstance = false) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  await page.addInitScript(
    ({ theme, hasInstance }) => {
      window.__TAURI_INTERNALS__ = {
        metadata: {
          currentWindow: { label: "main" },
          currentWebview: { label: "main" },
        },
        transformCallback: () => 0,
        unregisterCallback: () => {},
        invoke: async (command) => {
          if (command === "get_settings")
            return {
              onboarded: true,
              native_dialog_mode_prompted: true,
              theme,
              language: "es",
              auto_updates: false,
              quality_profile: "Balanced",
              user: [],
              jre8_path: "",
              jre17_path: "",
              jre21_path: "",
              jre25_path: "",
              jvm_args: "",
              env_vars: {},
            };
          if (command === "get_current_user") return null;
          if (command === "mcp_status")
            return {
              enabled: true,
              sidecar_path: "C:\\TFLClient\\tflclient-mcp.exe",
              clients: [],
              plans: [],
              audit: [],
            };
          if (command === "get_instances" && hasInstance)
            return [
              {
                uuid: "demo",
                name: "Demostración",
                mc_version: "1.8.9",
                loader: "vanilla",
                loader_version: null,
                launch_version_id: "1.8.9",
                last_played: 0,
                play_time_secs: 0,
                min_memory: null,
                max_memory: null,
                server_type: null,
                server_jar: null,
                server_build: null,
              },
            ];
          if (
            /get_(instances|running_instances|accounts|favorite_servers|recent_activity|instance_mods|instance_screenshots|worlds)/.test(
              command,
            )
          )
            return [];
          if (command.includes("listen")) return 0;
          return null;
        },
      };
      window.__TAURI_EVENT_PLUGIN_INTERNALS__ = {
        unregisterListener: () => {},
      };
      localStorage.setItem("tfl-theme", theme);
      localStorage.setItem("tfl-font", "inter");
      localStorage.setItem("tfl-accent", "blue");
    },
    { theme, hasInstance },
  );
  await page.goto(base);
  await page.getByRole("button", { name: "Entendido", exact: true }).click();
  await page.waitForFunction(
    (theme) => document.documentElement.dataset.theme === theme,
    theme,
  );
  await page.evaluate(() => document.fonts.ready);
  return page;
}
async function capture(page, name) {
  await page.waitForTimeout(600);
  const suffix = theme === "light" ? "-light" : "";
  await sharp(await page.screenshot())
    .webp({ quality: 92 })
    .toFile(`public/images/launcher-${name}${suffix}.webp`);
  console.log(
    `${name}: ${theme} (${await page.locator("body").evaluate((el) => getComputedStyle(el).backgroundColor)})`,
  );
}
const page = await open();
if (process.env.LAUNCHER_MCP_ONLY) {
  await page.getByRole("button", { name: "Personalizar Inicio" }).click();
  await page.getByText("Integraciones", { exact: true }).click();
  await page
    .getByRole("heading", { name: "TFL Client MCP", exact: true })
    .waitFor();
  await capture(page, "mcp");
  await browser.close();
  process.exit(0);
}
await capture(page, "welcome");
await page.getByRole("button", { name: "Personalizar Inicio" }).click();
await capture(page, "settings");
await page.getByText("Consola y monitoreo", { exact: true }).click();
await capture(page, "console");
await page.getByText("Integraciones", { exact: true }).click();
await page
  .getByRole("heading", { name: "TFL Client MCP", exact: true })
  .waitFor();
await capture(page, "mcp");
await page.close();
const instance = await open(true);
await instance.getByText("Demostración", { exact: true }).first().click();
await capture(instance, "instance");
await browser.close();
