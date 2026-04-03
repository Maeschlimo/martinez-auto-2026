import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/about", "/contact", "/blog"];

  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "/blog" ? "weekly" as const : "monthly" as const,
      priority: page === "" ? 1.0 : 0.8,
    }))
  );
}
