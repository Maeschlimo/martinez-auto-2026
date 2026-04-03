import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { StructuredData } from "@/components/seo/StructuredData";

const posts: Record<string, { title: string; description: string; date: string; content: string }> = {
  "first-post": {
    title: "First Blog Post",
    description: "SEO description for this post.",
    date: "2026-04-01",
    content: "Blog post content from Content Writer markdown.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} — ${siteConfig.name}`,
    description: post.description,
    path: `/blog/${slug}`,
    locale,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        author: { "@type": "Organization", name: siteConfig.name },
      }} />
      <Section>
        <Container className="max-w-3xl">
          <p className="text-sm text-[var(--color-text-muted)] mb-4">{post.date}</p>
          <h1 className="text-4xl sm:text-5xl font-bold">{post.title}</h1>
          <div className="mt-8 prose prose-lg max-w-none">
            <p>{post.content}</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
