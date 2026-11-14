import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider, useLocale, useT } from "../src/i18n/provider";
import { dictionaryForLocale, translator as serverTranslator } from "../src/i18n/server-dictionary";
import { translator } from "../src/i18n/shared";

function ClientLabel() {
  const tr = useT();
  return <span lang={useLocale()} data-locale={tr.locale}>{tr("Descargas")}</span>;
}

test("Spanish sends an empty dictionary while English translations are available on the first server render", () => {
  assert.deepEqual(dictionaryForLocale("es"), {});
  assert.equal(JSON.stringify(dictionaryForLocale("es")), "{}");
  for (const locale of ["es", "en"] as const) {
    const dictionary = dictionaryForLocale(locale);
    const html = renderToStaticMarkup(
      <LocaleProvider locale={locale} dictionary={dictionary}>
        <ClientLabel />
      </LocaleProvider>,
    );
    assert.equal(html, `<span lang="${locale}" data-locale="${locale}">${locale === "en" ? "Downloads" : "Descargas"}</span>`);
    const clientTranslator = translator(locale, dictionary);
    const fromServer = serverTranslator(locale);
    assert.equal(clientTranslator.locale, fromServer.locale);
    for (const key of ["Descargas", "  Descargas\n", "Texto sin traducción", "constructor"])
      assert.equal(clientTranslator(key), fromServer(key));
  }
});
