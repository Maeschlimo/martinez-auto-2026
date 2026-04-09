import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageSEO {
  title: string;
  description: string;
  path: string;
  locale: string;
  image?: string;
}

export function buildMetadata({ title, description, path, locale, image }: PageSEO): Metadata {
  const url = `${siteConfig.url}/${locale}${path}`;
  const ogImage = image || `${siteConfig.url}/og-default.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "x-default": `${siteConfig.url}/en${path}`,
        en: `${siteConfig.url}/en${path}`,
        es: `${siteConfig.url}/es${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
