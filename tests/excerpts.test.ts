import test from "node:test";
import assert from "node:assert/strict";
import { releaseExcerpt } from "../src/lib/history-model";

test("release previews remove Markdown and channel metadata, keeping readable words", () => {
  assert.equal(
    releaseExcerpt("## Correcciones\n\n**Canal:** Estable\n\n- **Abre** [la consola](https://example.com) y usa `Escape`.\n- Revisa los _logs_."),
    "Abre la consola y usa Escape. Revisa los logs.",
  );
  assert.equal(releaseExcerpt("## Cambios\n\nLa consola conserva el foco al cambiar de perfil.", 30), "La consola conserva el foco al…");
  assert.equal(releaseExcerpt("## Cambios\n\n```sh\nunsafe()\n```"), "");
  assert.equal(releaseExcerpt("Un resumen breve."), "Un resumen breve.");
  assert.equal(releaseExcerpt("**Windows** x86_64 conserva `delete_tokens` y `_valor_`."), "Windows x86_64 conserva delete_tokens y _valor_.");
});
