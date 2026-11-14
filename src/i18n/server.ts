import { headers } from "next/headers";
import { translator } from "./server-dictionary";
import type { Locale } from "./shared";
export async function getTranslator() {
  const locale: Locale =
    (await headers()).get("x-tfl-locale") === "en" ? "en" : "es";
  return translator(locale);
}
