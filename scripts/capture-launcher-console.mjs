import { chromium } from "playwright";
(async () => {
  const b = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.addInitScript(() => {
    window.__TAURI_INTERNALS__ = {
      metadata: {
        currentWindow: { label: "main" },
        currentWebview: { label: "main" },
      },
      transformCallback: () => 0,
      unregisterCallback: () => {},
      invoke: async (cmd) => {
        if (cmd === "get_settings")
          return {
            onboarded: true,
            native_dialog_mode_prompted: true,
            theme: "dark",
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
        if (cmd === "get_current_user") return null;
        if (
          /get_(instances|running_instances|accounts|favorite_servers|recent_activity|instance_mods|instance_screenshots|worlds)/.test(
            cmd,
          )
        )
          return [];
        if (cmd.includes("listen")) return 0;
        return null;
      },
    };
    window.__TAURI_EVENT_PLUGIN_INTERNALS__ = { unregisterListener: () => {} };
    localStorage.setItem("tfl-font", "inter");
    localStorage.setItem("tfl-accent", "blue");
  });
  await p.goto("http://127.0.0.1:4173");
  await p.waitForTimeout(1800);
  await p.getByRole("button", { name: "Entendido", exact: true }).click();
  await p.getByRole("button", { name: "Personalizar Inicio" }).click();
  await p.waitForTimeout(400);
  await p.getByText("Consola y monitoreo", { exact: true }).click();
  await p.waitForTimeout(700);
  await p.screenshot({ path: "/tmp/launcher-console.png" });
  console.log((await p.locator("body").innerText()).slice(-1000));
  console.log(await p.getByRole("button").allTextContents());
  await b.close();
})();
