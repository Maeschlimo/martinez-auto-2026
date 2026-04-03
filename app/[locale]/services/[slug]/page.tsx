import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/sections/CTA";

// Replace with real data source per client (markdown, Supabase, etc.)
const services: Record<string, { title: string; description: string; content: string }> = {
  "service-one": {
    title: "Service One",
    description: "Detailed description for SEO.",
    content: "Full service page content goes here. This would be populated from the Content Writer's markdown output.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const service = services[slug];
  if (!service) return {};
  return buildMetadata({
    title: `${service.title} — ${siteConfig.name}`,
    description: service.description,
    path: `/services/${slug}`,
    locale,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const service = services[slug];
  if (!service) notFound();

  return (
    <>
      <Section>
        <Container className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold">{service.title}</h1>
          <div className="mt-8 prose prose-lg max-w-none">
            <p>{service.content}</p>
          </div>
        </Container>
      </Section>
      <CTA
        heading="Interested in This Service?"
        cta={{ text: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
