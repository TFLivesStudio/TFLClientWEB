import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { generateKeyPairSync, sign } from "node:crypto";
import { verifyCatalog } from "../src/lib/selection";
const raw = readFileSync("tests/fixtures/catalog.json");
const sig = readFileSync("tests/fixtures/catalog.sig", "utf8");
test("verifies real official raw catalog bytes and dynamic published channels", () => {
  const c = verifyCatalog(raw, sig);
  assert.ok(c.targets.some((t) => Object.keys(t.channels).length));
});
test("fails closed on tampered bytes, bad signature and unknown key", () => {
  assert.throws(() =>
    verifyCatalog(Buffer.concat([raw, Buffer.from(" ")]), sig),
  );
  assert.throws(() => verifyCatalog(raw, "bad"));
  assert.throws(() => verifyCatalog(raw, Buffer.alloc(64).toString("base64")));
});
test("rejects correctly signed but invalid schemas and generation zero", () => {
  const { privateKey, publicKey } = generateKeyPairSync("ed25519");
  const key = (publicKey.export({ format: "der", type: "spki" }) as Buffer)
    .subarray(-32)
    .toString("base64");
  for (const data of [
    { ...JSON.parse(raw.toString()), generation: 0 },
    { ...JSON.parse(raw.toString()), schemaVersion: 9 },
  ]) {
    const bytes = Buffer.from(JSON.stringify(data));
    assert.throws(() =>
      verifyCatalog(
        bytes,
        sign(null, bytes, privateKey).toString("base64"),
        key,
      ),
    );
  }
});
