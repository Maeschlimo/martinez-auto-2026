import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({
    title: `Blog — ${siteConfig.name}`,
    description: `Tips, news, and insights from ${siteConfig.name}.`,
    path: "/blog",
    locale,
  });
}

// Replace with real blog data from markdown files or Supabase
const posts = [
  { slug: "first-post", title: "First Blog Post", excerpt: "A short preview of this blog post.", date: "2026-04-01" },
  { slug: "second-post", title: "Second Blog Post", excerpt: "Another preview for the blog.", date: "2026-04-08" },
];

export default function BlogPage() {
  return (
    <Section>
      <Container>
        <h1 className="text-4xl sm:text-5xl font-bold mb-12">Blog</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card>
                <p className="text-sm text-[var(--color-text-muted)] mb-2">{post.date}</p>
                <h2 className="text-xl font-semibold group-hover:text-[var(--color-primary)] transition-colors">{post.title}</h2>
                <p className="mt-2 text-[var(--color-text-muted)]">{post.excerpt}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
