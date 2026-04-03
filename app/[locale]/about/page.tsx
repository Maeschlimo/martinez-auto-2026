import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/sections/CTA";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({
    title: `About — ${siteConfig.name}`,
    description: `Learn about ${siteConfig.name} and our team.`,
    path: "/about",
    locale,
  });
}

export default function AboutPage() {
  return (
    <>
      <Section>
        <Container className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold">About Us</h1>
          <div className="mt-8 text-lg text-[var(--color-text-muted)] space-y-6">
            <p>About page content populated from Content Writer output.</p>
          </div>
        </Container>
      </Section>
      <CTA
        heading="Ready to Work Together?"
        cta={{ text: "Get in Touch", href: "/contact" }}
      />
    </>
  );
}
