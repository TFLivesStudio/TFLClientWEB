import { test } from "node:test";
import assert from "node:assert/strict";
import {
  assetArchitecture,
  groupedPlatformAssets,
  type ReleaseAsset,
} from "../src/lib/release-model";

test("download groups retain official files, prioritize explicit architecture and exclude signatures", () => {
  const names = [
    "TFLClient-Linux.rpm",
    "TFLClient-Linux.AppImage",
    "TFLClient-Linux.deb",
    "tflclient_0.15.2_amd64.AppImage",
    "tflclient_0.15.2_amd64.deb",
    "tflclient-0.15.2-1.x86_64.rpm",
    "tflclient-0.15.2-1.x86_64.rpm.sig",
    "latest.json",
    "TFLClient-Windows-Setup.exe",
    "tflclient_0.15.2_x64-setup.exe",
    "tflclient_0.15.2_aarch64.dmg",
  ];
  const assets: ReleaseAsset[] = names.map((name, index) => ({
    name,
    url: `https://github.com/TFLivesStudio/TFLClient/releases/download/v0.15.2/${name}`,
    size: index + 1,
  }));
  const original = structuredClone(assets);
  const linux = groupedPlatformAssets(assets, "Linux");
  assert.deepEqual(linux.map((group) => group.format), ["DEB", "RPM", "AppImage"]);
  assert.equal(linux.flatMap((group) => group.assets).length, 6);
  for (const group of linux) {
    assert.equal(group.assets.length, 2);
    assert.equal(assetArchitecture(group.assets[0].name), "x64");
    assert.equal(assetArchitecture(group.assets[1].name), null);
    for (const asset of group.assets) assert.ok(assets.includes(asset));
  }
  assert.deepEqual(assets, original);
  assert.deepEqual(groupedPlatformAssets(assets, "Windows")[0].assets.map((a) => a.name), [
    "tflclient_0.15.2_x64-setup.exe",
    "TFLClient-Windows-Setup.exe",
  ]);
  assert.equal(groupedPlatformAssets(assets, "macOS")[0].assets[0].name, "tflclient_0.15.2_aarch64.dmg");
  assert.deepEqual(groupedPlatformAssets(assets, "unknown"), []);
  assert.deepEqual(groupedPlatformAssets([], "Windows"), []);
});

test("architecture labels use explicit filename tokens without inferring from platform or substrings", () => {
  for (const name of ["client_aarch64.DMG", "client-arm64.pkg"]) assert.equal(assetArchitecture(name), "ARM64");
  for (const name of ["client_amd64.AppImage", "client.x86_64.rpm", "client-x64-setup.exe"]) assert.equal(assetArchitecture(name), "x64");
  for (const name of ["client_i686.deb", "client-ia32.exe", "client_x86.msi"]) assert.equal(assetArchitecture(name), "x86");
  for (const name of ["TFLClient-Windows-Setup.exe", "TFLClient-macOS.dmg", "clientnotx64.exe"]) assert.equal(assetArchitecture(name), null);
  const upper = { name: "client_AMD64.DEb", url: "https://github.com/file", size: 1 };
  assert.equal(groupedPlatformAssets([upper], "Linux")[0].assets[0], upper);
});
