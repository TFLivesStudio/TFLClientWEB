import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: process.env.VERCEL_ENV === "production" ? "/" : undefined,
      disallow: process.env.VERCEL_ENV === "production" ? undefined : "/",
    },
    sitemap: "https://launcher.tflives.com/sitemap.xml",
  };
}
