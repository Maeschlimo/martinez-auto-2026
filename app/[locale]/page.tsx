import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { StructuredData, localBusinessSchema } from "@/components/seo/StructuredData";
import { Wrench, Scale, Droplets } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return buildMetadata({
    title: `${siteConfig.name} — ${t("heroHeadline")}`,
    description: siteConfig.description,
    path: "",
    locale,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      <StructuredData
        data={localBusinessSchema({
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          phone: siteConfig.contact.phone,
          email: siteConfig.contact.email,
          address: siteConfig.contact.address,
          openingHours: siteConfig.business.openingHours,
          priceRange: siteConfig.business.priceRange,
        })}
      />

      <Hero
        headline={t("heroHeadline")}
        subheadline={t("heroSubheadline")}
        cta={{ text: t("heroCta"), href: "/contact" }}
        variant="centered"
      />

      {/* Example ServicesGrid — replace with real data per client */}
      <ServicesGrid
        heading="Our Services"
        subheading="Professional solutions for your needs"
        background="alt"
        services={[
          { title: "Service One", description: "Description of service one goes here.", href: "/services/service-one", icon: Wrench },
          { title: "Service Two", description: "Description of service two goes here.", href: "/services/service-two", icon: Scale },
          { title: "Service Three", description: "Description of service three goes here.", href: "/services/service-three", icon: Droplets },
        ]}
      />

      <Testimonials
        heading="What Our Clients Say"
        testimonials={[
          { quote: "Excellent service. Highly recommended!", author: "Jane D.", role: "Customer since 2023" },
          { quote: "Professional, reliable, and affordable.", author: "Mark T.", role: "Local business owner" },
          { quote: "They went above and beyond expectations.", author: "Sarah K." },
        ]}
      />

      <FAQ
        heading="Frequently Asked Questions"
        background="alt"
        items={[
          { question: "What areas do you serve?", answer: "We serve the greater metro area and surrounding communities." },
          { question: "Do you offer free estimates?", answer: "Yes, we provide free estimates for all our services." },
          { question: "What are your hours?", answer: "We're open Monday through Friday, 8 AM to 6 PM." },
        ]}
      />

      <CTA
        heading="Ready to Get Started?"
        description="Contact us today for a free consultation."
        cta={{ text: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
