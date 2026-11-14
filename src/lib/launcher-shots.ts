// Static imports give each original asset a content hash and immutable caching.
import welcome from "../../public/images/launcher-welcome.webp";
import welcomeLight from "../../public/images/launcher-welcome-light.webp";
import instance from "../../public/images/launcher-instance.webp";
import instanceLight from "../../public/images/launcher-instance-light.webp";
import settings from "../../public/images/launcher-settings.webp";
import settingsLight from "../../public/images/launcher-settings-light.webp";
import consoleShot from "../../public/images/launcher-console.webp";
import consoleLight from "../../public/images/launcher-console-light.webp";
import mcp from "../../public/images/launcher-mcp.webp";
import mcpLight from "../../public/images/launcher-mcp-light.webp";

export const launcherShots = {
  "/images/launcher-welcome.webp": { dark: welcome, light: welcomeLight },
  "/images/launcher-instance.webp": { dark: instance, light: instanceLight },
  "/images/launcher-settings.webp": { dark: settings, light: settingsLight },
  "/images/launcher-console.webp": { dark: consoleShot, light: consoleLight },
  "/images/launcher-mcp.webp": { dark: mcp, light: mcpLight },
};
