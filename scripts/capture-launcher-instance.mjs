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
        if (cmd === "get_instances")
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
  await p.getByText("Demostración", { exact: true }).first().click();
  await p.waitForTimeout(1000);
  console.log((await p.locator("body").innerText()).slice(-4000));
  console.log(await p.getByRole("button").allTextContents());
  await p.screenshot({ path: "/tmp/launcher-instance.png" });
  await b.close();
})();
