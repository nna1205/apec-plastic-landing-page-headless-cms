import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const domain = "apecplastic.vercel.app"
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `https://${domain}/sitemap.xml`,
  };
}