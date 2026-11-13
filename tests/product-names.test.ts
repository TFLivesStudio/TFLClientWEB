import test from "node:test";
import assert from "node:assert/strict";
import { clientDisplayName } from "../src/lib/product-names";

test("legacy catalog labels display the client brand without changing signed data", () => {
  const target = Object.freeze({
    displayName: "TFL Selection 1.8.9",
    minecraftVersion: "1.8.9",
  });
  assert.equal(
    clientDisplayName(target.displayName, target.minecraftVersion),
    "TFLClient 1.8.9",
  );
  assert.equal(target.displayName, "TFL Selection 1.8.9");
  assert.equal(clientDisplayName(undefined, "26.3"), "TFLClient 26.3");
  assert.equal(clientDisplayName("", "1.8.9"), "TFLClient 1.8.9");
  assert.equal(clientDisplayName("TFLClient PvP", "1.8.9"), "TFLClient PvP");
  assert.equal(
    clientDisplayName("Other official client", "26.3"),
    "Other official client",
  );
});
