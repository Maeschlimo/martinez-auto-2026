import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/sections/CTA";
import { Testimonials } from "@/components/sections/Testimonials";
import { ShieldCheck, User } from "lucide-react";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "About Martinez Auto Repair | Family-Owned East Austin Since 2008",
    es: "Acerca de Martinez Auto Repair | Familiar en Este Austin Desde 2008",
  };
  const descriptions: Record<string, string> = {
    en: "Carlos Martinez opened his shop on East 7th Street in 2008. ASE Master Technician, BBB A+ rated, bilingual team. 18 years serving East Austin.",
    es: "Carlos Martinez abrió su taller en East 7th Street en 2008. Técnico Maestro ASE, calificación A+ BBB, equipo bilingüe. 18 años sirviendo al Este de Austin.",
  };
  return buildMetadata({
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    path: "/about",
    locale,
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const teamMembers = [
    {
      name: "Carlos Martinez",
      role: locale === "es" ? "Dueño y Técnico Principal" : "Owner & Lead Technician",
      bio: locale === "es"
        ? "Técnico Maestro ASE con 23 años de experiencia. Especialista en diagnóstico de motores y sistemas eléctricos. Originario de Monterrey, México."
        : "ASE Master Technician with 23 years of experience. Specializes in engine diagnostics and electrical systems. Born in Monterrey, Mexico.",
      alt_en: "Carlos Martinez, owner and lead technician at Martinez Auto Repair, standing in his shop",
      alt_es: "Carlos Martinez, propietario y técnico principal de Martinez Auto Repair, de pie en su taller",
    },
    {
      name: "David Chen",
      role: locale === "es" ? "Técnico Senior" : "Senior Technician",
      bio: locale === "es"
        ? "Certificado ASE. 12 años de experiencia especializándose en importados europeos y asiáticos. Se unió al equipo en 2016."
        : "ASE certified. 12 years experience specializing in European and Asian imports. Joined in 2016.",
      alt_en: "David Chen, senior technician at Martinez Auto Repair, standing next to a vehicle on a lift",
      alt_es: "David Chen, técnico senior de Martinez Auto Repair, de pie junto a un vehículo en el elevador",
    },
    {
      name: "Miguel Reyes",
      role: locale === "es" ? "Técnico" : "Technician",
      bio: locale === "es"
        ? "Especialista en sistemas de frenos y suspensión. Creció en el vecindario. Bilingüe."
        : "Specializes in brake systems and suspension. Grew up in the neighborhood. Bilingual.",
      alt_en: "Miguel Reyes, technician at Martinez Auto Repair, standing near brake service equipment",
      alt_es: "Miguel Reyes, técnico de Martinez Auto Repair, de pie cerca del equipo de servicio de frenos",
    },
  ];

  const certifications = [
    t("cert1"),
    t("cert2"),
    t("cert3"),
    t("cert4"),
  ];

  const whyItems = [
    { label: t("why1Label"), detail: t("why1Detail") },
    { label: t("why2Label"), detail: t("why2Detail") },
    { label: t("why3Label"), detail: t("why3Detail") },
    { label: t("why4Label"), detail: t("why4Detail") },
    { label: t("why5Label"), detail: t("why5Detail") },
  ];

  const testimonials = [
    {
      quote: locale === "es"
        ? "He traído mi camioneta aquí por 5 años. Carlos es honesto — te dice lo que realmente necesitas. El mejor mecánico del Este de Austin."
        : "I've been bringing my truck here for 5 years. Carlos is honest — he'll tell you what you actually need, not try to sell you stuff you don't. Best mechanic in East Austin.",
      author: "Robert T.",
      role: locale === "es" ? "Cliente desde 2021" : "Customer since 2021",
    },
    {
      quote: locale === "es"
        ? "Llevé mi carro con un problema eléctrico y lo resolvieron en un día. Muy profesionales y el precio fue justo. Los recomiendo 100%."
        : "I brought my car in with an electrical problem and they had it sorted in a day. Very professional and the price was fair. 100% recommended.",
      author: "Luis H.",
      role: locale === "es" ? "Cliente desde 2022" : "Customer since 2022",
    },
  ];

  return (
    <>
      {/* Page Header */}
      <section className="bg-[#1e3a5f] py-16">
        <Container>
          <h1 className="text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
            {t("pageHeading")}
          </h1>
          <p className="mt-3 text-lg text-white/80">{t("pageSubheading")}</p>
        </Container>
      </section>

      {/* Story Section */}
      <Section>
        <Container>
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7a5c00] mb-2">Our Story</p>
              <h2 className="text-3xl font-bold text-[#1c1917] mb-4" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
                {t("storyHeading")}
              </h2>
              <p className="text-lg text-[#78716c] leading-relaxed">{t("story")}</p>
            </div>
            <div
              className="aspect-[4/3] bg-[#1e3a5f]/10 rounded-xl flex items-center justify-center"
              aria-label={locale === "es" ? "Carlos Martinez trabajando en el motor de un vehículo" : "Carlos Martinez working on a vehicle engine"}
              role="img"
            >
              <div className="text-center text-[#78716c] p-8">
                <User className="w-12 h-12 mx-auto mb-3 text-[#7a5c00]" />
                <p className="text-sm">Carlos Martinez — Martinez Auto Repair</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Team Section */}
      <section className="bg-[#faf9f7]">
        <Container className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1c1917]" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
              {t("teamHeading")}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#e7e5e4]">
                <div
                  className="aspect-[3/4] bg-[#1e3a5f]/10 flex items-center justify-center"
                  aria-label={locale === "es" ? member.alt_es : member.alt_en}
                  role="img"
                >
                  <div className="text-center text-[#78716c] p-6">
                    <User className="w-16 h-16 mx-auto mb-2 text-[#7a5c00]" />
                    <p className="text-sm font-medium">{member.name}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1c1917]" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#7a5c00] mt-1 mb-3">{member.role}</p>
                  <p className="text-sm text-[#78716c] leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <Section>
        <Container>
          <h2 className="text-4xl font-bold text-[#1c1917] mb-8" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
            {t("certificationsHeading")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((label) => (
              <div key={label} className="flex items-start gap-3 bg-[#faf9f7] rounded-xl p-5 border border-[#e7e5e4]">
                <ShieldCheck className="w-6 h-6 text-[#7a5c00] flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-[#1c1917]">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Choose Us */}
      <section className="bg-[#1e3a5f]">
        <Container className="py-16">
          <h2 className="text-4xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
            {t("whyChooseHeading")}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyItems.map((item) => (
              <div key={item.label} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-[#e0a020] mb-2" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
                  {item.label}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <Testimonials
        heading={locale === "es" ? "Lo Que Dicen Nuestros Clientes" : "What Our Customers Say"}
        testimonials={testimonials}
      />

      <CTA
        heading={t("ctaHeading")}
        description={t("ctaBody")}
        cta={{ text: locale === "es" ? "Llamar Ahora" : "Call Now", href: siteConfig.contact.phoneHref }}
      />
    </>
  );
}
