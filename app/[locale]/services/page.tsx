import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { CTA } from "@/components/sections/CTA";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import { Wrench, Disc3, Cpu, Wind, Circle, Settings, ShieldCheck } from "lucide-react";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Auto Repair Services Austin TX | Martinez Auto Repair",
    es: "Servicios de Reparación de Autos Austin TX | Martinez Auto Repair",
  };
  const descriptions: Record<string, string> = {
    en: "Full-service auto repair in East Austin — oil changes, brakes, engine diagnostics, AC repair, tires, and transmission service. ASE-certified, bilingual team.",
    es: "Servicio completo de mecánica en Este de Austin — cambios de aceite, frenos, diagnósticos, AC, llantas y transmisión. Equipo certificado ASE y bilingüe.",
  };
  return buildMetadata({
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    path: "/services",
    locale,
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const services = [
    { slug: "oil-change", icon: Wrench, name: t("oilChange.name"), tagline: t("oilChange.tagline"), description: t("oilChange.description"), price: t("oilChange.price") },
    { slug: "brake-repair", icon: Disc3, name: t("brakeRepair.name"), tagline: t("brakeRepair.tagline"), description: t("brakeRepair.description"), price: t("brakeRepair.price") },
    { slug: "engine-diagnostics", icon: Cpu, name: t("engineDiagnostics.name"), tagline: t("engineDiagnostics.tagline"), description: t("engineDiagnostics.description"), price: t("engineDiagnostics.price") },
    { slug: "ac-repair", icon: Wind, name: t("acRepair.name"), tagline: t("acRepair.tagline"), description: t("acRepair.description"), price: t("acRepair.price") },
    { slug: "tire-services", icon: Circle, name: t("tireServices.name"), tagline: t("tireServices.tagline"), description: t("tireServices.description"), price: t("tireServices.price") },
    { slug: "transmission", icon: Settings, name: t("transmission.name"), tagline: t("transmission.tagline"), description: t("transmission.description"), price: t("transmission.price") },
  ];

  const trustItems = [
    "ASE Certified Master Technicians",
    "BBB A+ Rating",
    "Texas State Inspection Station",
    locale === "es" ? "Servicio Bilingüe EN/ES" : "Bilingual EN/ES Service",
  ];

  return (
    <>
      {/* Page Header */}
      <section className="bg-[#1e3a5f] py-16">
        <Container>
          <h1 className="text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
            {t("heroHeadline")}
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-xl">{t("heroSubheadline")}</p>
        </Container>
      </section>

      {/* Services Grid */}
      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="group">
                <div className="bg-white border border-[#e7e5e4] rounded-xl p-6 border-t-4 border-t-[#c8922a] shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                  <service.icon className="w-8 h-8 text-[#c8922a] mb-4" />
                  <h2 className="text-xl font-bold text-[#1c1917] mb-1" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
                    {service.name}
                  </h2>
                  <p className="text-xs font-semibold text-[#c8922a] uppercase tracking-wide mb-3">{service.tagline}</p>
                  <p className="text-sm text-[#78716c] leading-relaxed flex-1">{service.description}</p>
                  <p className="mt-3 text-sm font-semibold text-[#1e3a5f]">{service.price}</p>
                  <p className="mt-2 text-sm text-[#e63946] font-medium group-hover:underline">{tc("learnMore")} →</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Trust Strip */}
      <section className="bg-[#faf9f7] border-y border-[#e7e5e4]">
        <Container className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#c8922a] flex-shrink-0" />
                <span className="text-sm font-medium text-[#1c1917]">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        heading={locale === "es" ? "¿Listo para Traer Su Carro?" : "Ready to Bring Your Car In?"}
        description={locale === "es" ? "Se aceptan sin cita. Llame antes para trabajos más grandes." : "Walk-ins welcome. Call ahead for bigger jobs and we'll make sure we're ready for you."}
        cta={{ text: locale === "es" ? "Llamar Ahora" : "Call Now", href: siteConfig.contact.phoneHref }}
      />
    </>
  );
}
