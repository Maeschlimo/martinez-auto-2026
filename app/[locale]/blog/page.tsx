import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Auto Repair Blog | Car Maintenance Tips Austin TX | Martinez Auto",
    es: "Blog de Mecánica | Consejos Mantenimiento Carro Austin TX | Martinez",
  };
  const descriptions: Record<string, string> = {
    en: "Car maintenance tips, seasonal advice, and honest auto repair guidance from East Austin's trusted family mechanic.",
    es: "Consejos de mantenimiento de carro, guías estacionales y orientación mecánica honesta del mecánico familiar de confianza del Este de Austin.",
  };
  return buildMetadata({
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    path: "/blog",
    locale,
  });
}

type Locale = "en" | "es";

const posts: { slug: string; published_at: string; image: string; image_alt: string; en: { title: string; excerpt: string }; es: { title: string; excerpt: string } }[] = [
  {
    slug: "how-often-oil-change-texas-heat",
    published_at: "2026-03-31",
    image: "/images/blog-post-thumbnail-2.webp",
    image_alt: "Checking engine oil level on a dipstick — simple routine maintenance that protects your vehicle",
    en: {
      title: "How Often Should You Change Your Oil in the Texas Heat?",
      excerpt: "Texas heat is harder on your engine oil than most drivers realize. Here's what the data says — and what we recommend for Austin drivers.",
    },
    es: {
      title: "¿Con Qué Frecuencia Debes Cambiar el Aceite en el Calor de Texas?",
      excerpt: "El calor de Texas es más duro para el aceite de motor de lo que la mayoría cree. Esto es lo que los datos dicen — y lo que recomendamos para conductores en Austin.",
    },
  },
  {
    slug: "why-bilingual-auto-repair-matters-east-austin",
    published_at: "2026-03-31",
    image: "/images/blog-default-thumbnail.webp",
    image_alt: "Mechanic's workbench with tools and laptop — automotive knowledge and tips from the shop",
    en: {
      title: "Why Bilingual Auto Repair Actually Matters — And Why We're Proud of It",
      excerpt: "At Martinez Auto, English and Spanish are equally welcome. Here's why that matters more than people realize.",
    },
    es: {
      title: "Por Qué la Mecánica Bilingüe Importa — Y Por Qué Estamos Orgullosos de Ello",
      excerpt: "En Martinez Auto, el inglés y el español son igualmente bienvenidos. Esto es por qué eso importa más de lo que la gente cree.",
    },
  },
  {
    slug: "check-engine-light-guide",
    published_at: "2026-03-15",
    image: "/images/blog-post-thumbnail-1.webp",
    image_alt: "Check engine warning light illuminated on a car dashboard — know when to get it checked",
    en: {
      title: "Check Engine Light: What It Really Means and When to Act",
      excerpt: "That amber light can mean anything from a loose gas cap to a serious engine issue. Here's how to tell the difference — and what to do.",
    },
    es: {
      title: "Luz de Check Engine: Qué Significa Realmente y Cuándo Actuar",
      excerpt: "Esa luz ámbar puede significar desde una tapa de gasolina suelta hasta un problema serio. Cómo distinguirlos — y qué hacer.",
    },
  },
];

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const l = locale as Locale;

  return (
    <>
      {/* Page Header */}
      <section className="bg-[#1e3a5f] py-16">
        <Container>
          <h1 className="text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
            {t("pageHeading")}
          </h1>
          <p className="mt-3 text-lg text-white/80 max-w-xl">{t("pageSubheading")}</p>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const postData = l === "es" ? post.es : post.en;
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group" aria-label={postData.title}>
                  <Card>
                    <div className="relative aspect-[16/9] rounded-lg mb-4 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.image_alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <p className="text-sm text-[#78716c] mb-2">{post.published_at}</p>
                    <h2 className="text-xl font-bold text-[#1c1917] group-hover:text-[#1e3a5f] transition-colors leading-snug" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
                      {postData.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#78716c] leading-relaxed">{postData.excerpt}</p>
                    <p className="mt-3 text-sm text-[#b91c2c] font-medium group-hover:underline">{t("readMore")} →</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
