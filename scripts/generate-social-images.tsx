import React from "react";
import sharp from "sharp";
/** Reproducible 1200×630 social cards, using local brand assets and fonts only. */
import { ImageResponse } from "next/og";
import { readFile, writeFile, mkdir } from "node:fs/promises";
const asset = async (path: string, mime: string) =>
  `data:${mime};base64,${(await readFile(path)).toString("base64")}`;
async function main() {
  const logo = await asset("public/icons/launchers/tfl.png", "image/png");
  // Use PNG for portable decoding inside the composited SVG frame.
  const shot = `data:image/png;base64,${(await sharp("public/images/launcher-welcome.webp").png().toBuffer()).toString("base64")}`;
  const fonts = await Promise.all(
    [600, 800].map(async (weight) => ({
      name: "Manrope",
      weight: weight as 600 | 800,
      style: "normal" as const,
      data: await readFile(
        `node_modules/@fontsource/manrope/files/manrope-latin-${weight}-normal.woff`,
      ),
    })),
  );
  await mkdir("public/images/social", { recursive: true });
  for (const locale of ["es", "en"] as const) {
    const card = new ImageResponse(
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#040506",
          color: "#f1f5fa",
          fontFamily: "Manrope",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -270,
            right: -140,
            width: 900,
            height: 900,
            borderRadius: 900,
            background: "radial-gradient(circle, #164ca855, #04050600 70%)",
            display: "flex",
          }}
        />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 480 + i * 48,
              top: -150 + i * 30,
              width: 760,
              height: 760,
              borderRadius: 760,
              border: "1px solid #487cbe22",
              display: "flex",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: 64,
            top: 54,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" width={42} height={42} />
          <span style={{ fontSize: 19, letterSpacing: 4 }}>TFLIVES</span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 64,
            top: 166,
            display: "flex",
            flexDirection: "column",
            width: 550,
          }}
        >
          <div
            style={{
              fontSize: 14,
              letterSpacing: 3,
              color: "#75d8ff",
              marginBottom: 20,
            }}
          >
            MINECRAFT JAVA LAUNCHER
          </div>
          <div
            style={{
              fontSize: 94,
              fontWeight: 800,
              letterSpacing: -6,
              lineHeight: 1.05,
            }}
          >
            TFL Client
          </div>
          <div
            style={{
              fontSize: 27,
              color: "#becbdb",
              lineHeight: 1.45,
              marginTop: 30,
              maxWidth: 440,
            }}
          >
            {locale === "es"
              ? "Tus versiones, mods e instalaciones. En un solo launcher."
              : "Your versions, mods and instances. In one launcher."}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            bottom: 45,
            borderTop: "1px solid #253146",
            paddingTop: 23,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 16,
            color: "#a8b8ce",
          }}
        >
          <span>Windows · macOS · Linux</span>
          <span style={{ color: "#75d8ff" }}>launcher.tflives.com</span>
        </div>
      </div>,
      { width: 1200, height: 630, fonts },
    );
    const frame = Buffer.from(
      `<svg width="640" height="410" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="frame"><rect x="1" y="1" width="638" height="408" rx="16"/></clipPath></defs><g clip-path="url(#frame)"><rect width="640" height="410" fill="#141e30"/><image href="${shot}" x="1" y="29" width="638" height="399"/><g fill="#6680a2"><circle cx="17" cy="15" r="2.5"/><circle cx="27" cy="15" r="2.5"/><circle cx="37" cy="15" r="2.5"/></g></g><rect x="1" y="1" width="638" height="408" rx="16" fill="none" stroke="#47618b"/></svg>`,
    );
    const rotated = await sharp(frame)
      .rotate(-5, { background: "transparent" })
      .png()
      .toBuffer();
    const positioned = await sharp({
      create: {
        width: 1350,
        height: 630,
        channels: 4,
        background: "transparent",
      },
    })
      .composite([{ input: rotated, left: 628, top: 110 }])
      .extract({ left: 0, top: 0, width: 1200, height: 630 })
      .png()
      .toBuffer();
    const base = Buffer.from(await card.arrayBuffer());
    const bytes = await sharp(base)
      .composite([{ input: positioned }])
      .png()
      .toBuffer();
    await writeFile(`public/images/social/tfl-client-${locale}.png`, bytes);
    console.log(`${locale}: ${bytes.length} bytes`);
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
