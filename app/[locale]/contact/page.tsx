import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/sections/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({
    title: `Contact — ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name}. We'd love to hear from you.`,
    path: "/contact",
    locale,
  });
}

export default function ContactPage() {
  return (
    <ContactForm
      heading="Get in Touch"
      description="Fill out the form below and we'll get back to you within 24 hours."
    />
  );
}
