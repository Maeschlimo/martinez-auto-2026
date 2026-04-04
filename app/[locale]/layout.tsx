import Script from 'next/script';
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Barlow_Condensed, Inter } from "next/font/google";
import "@/app/globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${barlowCondensed.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoRepair",
              "name": "Martinez Auto Repair",
              "url": process.env.NEXT_PUBLIC_SITE_URL ?? "https://martinez-auto.com",
              "telephone": "+15125550100",
              "foundingDate": "2008",
              "founder": {
                "@type": "Person",
                "name": "Carlos Martinez"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "East 7th Street",
                "addressLocality": "Austin",
                "addressRegion": "TX",
                "postalCode": "78702",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 30.2672,
                "longitude": -97.7431
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "08:00",
                  "closes": "16:00"
                }
              ],
              "areaServed": [
                { "@type": "City", "name": "Austin", "addressRegion": "TX" },
                { "@type": "PostalCode", "postalCode": "78702" },
                { "@type": "PostalCode", "postalCode": "78721" },
                { "@type": "PostalCode", "postalCode": "78722" },
                { "@type": "PostalCode", "postalCode": "78741" },
                { "@type": "PostalCode", "postalCode": "78723" },
                { "@type": "PostalCode", "postalCode": "78724" }
              ],
              "priceRange": "$$",
              "paymentAccepted": "Cash, Credit Card",
              "currenciesAccepted": "USD",
              "sameAs": [
                "https://facebook.com/martinezautoatx"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Script
          defer
          data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "martinez-auto-repair.com"}
          src="https://plausible.io/js/script.js"
        />
      </body>
    </html>
  );
}
