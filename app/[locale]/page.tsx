import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { CTA } from "@/components/sections/CTA";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Link } from "@/i18n/navigation";
import { Wrench, Disc3, Cpu, Wind, Circle, Settings, ShieldCheck, Star, Clock, Languages, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Martinez Auto Repair | Honest Auto Shop in East Austin TX",
    es: "Martinez Auto Repair | Mecánico Honesto en Este Austin TX",
  };
  const descriptions: Record<string, string> = {
    en: "Family-owned auto repair in East Austin since 2008. ASE-certified mechanics, bilingual service (EN/ES), same-day repairs.",
    es: "Taller mecánico familiar en Este de Austin desde 2008. Técnicos certificados ASE, servicio bilingüe. Reparaciones el mismo día.",
  };
  return buildMetadata({
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    path: "",
    locale,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const ts = await getTranslations({ locale, namespace: "services" });

  const services = [
    { title: ts("oilChange.name"), description: ts("oilChange.description"), price: ts("oilChange.price"), href: "/services/oil-change", icon: Wrench },
    { title: ts("brakeRepair.name"), description: ts("brakeRepair.description"), price: ts("brakeRepair.price"), href: "/services/brake-repair", icon: Disc3 },
    { title: ts("engineDiagnostics.name"), description: ts("engineDiagnostics.description"), price: ts("engineDiagnostics.price"), href: "/services/engine-diagnostics", icon: Cpu },
    { title: ts("acRepair.name"), description: ts("acRepair.description"), price: ts("acRepair.price"), href: "/services/ac-repair", icon: Wind },
    { title: ts("tireServices.name"), description: ts("tireServices.description"), price: ts("tireServices.price"), href: "/services/tire-services", icon: Circle },
    { title: ts("transmission.name"), description: ts("transmission.description"), price: ts("transmission.price"), href: "/services/transmission", icon: Settings },
  ];

  const trustItems = [
    { icon: ShieldCheck, label: t("trustItem1") },
    { icon: Star, label: t("trustItem2") },
    { icon: Languages, label: t("trustItem3") },
    { icon: Clock, label: t("trustItem4") },
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
        ? "Por fin encontré un taller donde puedo explicar el problema en español y de verdad me entienden. Arreglaron mi AC el mismo día. Precio justo."
        : "Finally found a shop where I can explain the problem in Spanish and they actually understand. Fixed my AC the same day. Fair price.",
      author: "Maria G.",
      role: locale === "es" ? "Cliente desde 2023" : "Customer since 2023",
    },
    {
      quote: locale === "es"
        ? "Diagnosticaron un ruido que otros dos talleres no pudieron resolver. Me ahorré cientos comparado con lo que pedía el distribuidor."
        : "They diagnosed a noise that two other shops couldn't figure out. Saved me hundreds compared to the dealer quote. I won't go anywhere else.",
      author: "James K.",
      role: locale === "es" ? "Cliente desde 2020" : "Customer since 2020",
    },
    {
      quote: locale === "es"
        ? "Llevé mi carro con un problema eléctrico y lo resolvieron en un día. Muy profesionales y el precio fue justo. Los recomiendo 100%."
        : "I brought my car in with an electrical problem and they had it sorted in a day. Very professional and the price was fair. 100% recommended.",
      author: "Luis H.",
      role: locale === "es" ? "Cliente desde 2022" : "Customer since 2022",
    },
  ];

  const faqItems = [
    {
      question: locale === "es" ? "¿Necesito cita o aceptan sin cita previa?" : "Do I need an appointment, or do you take walk-ins?",
      answer: locale === "es"
        ? "Aceptamos sin cita para la mayoría de los servicios: cambios de aceite, rotación de llantas, inspecciones y reparaciones menores. Para trabajos más grandes, llamar antes nos ayuda a atenderle más rápido."
        : "We take walk-ins for most services — oil changes, tire rotations, inspections, and minor repairs. For bigger jobs like engine diagnostics or AC repair, calling ahead helps us get you in faster.",
    },
    {
      question: locale === "es" ? "¿Cuánto tiempo tarda un cambio de aceite?" : "How long does an oil change usually take?",
      answer: locale === "es"
        ? "La mayoría de los cambios de aceite se hacen en 30 a 45 minutos. Le damos un estimado honesto cuando llega."
        : "Most oil changes are done in 30–45 minutes. We'll give you an honest time estimate when you arrive.",
    },
    {
      question: locale === "es" ? "¿Qué significa realmente la luz de check engine?" : "What does the check engine light actually mean?",
      answer: locale === "es"
        ? "Puede significar muchas cosas: desde una tapa de gasolina suelta hasta un problema serio de sensor. Hacemos un diagnóstico computarizado por $89. Si hacemos la reparación, no cobramos el diagnóstico."
        : "It can mean a lot of things — from a loose gas cap to a more serious sensor issue. We run a $89 computer diagnostic to find out exactly what's triggering it. If we do the repair, we waive the diagnostic fee.",
    },
    {
      question: locale === "es" ? "¿Ofrecen servicio en español?" : "Do you offer bilingual service in Spanish?",
      answer: locale === "es"
        ? "Sí — completamente bilingüe, inglés y español. Carlos y Miguel hablan español con fluidez. Puede explicar el problema en el idioma que le sea más cómodo."
        : "Yes — fully bilingual, English and Spanish. Carlos and Miguel both speak Spanish fluently. You're welcome to explain the problem in whichever language is more comfortable.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[560px] flex items-center bg-[#0d1b2a]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b2a] via-[#0d1b2a]/90 to-[#1e3a5f]/40" />
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "linear-gradient(135deg, #0d1b2a 0%, #1e3a5f 100%)" }}
          aria-label="Martinez Auto Repair — 4-bay garage at golden hour, mechanics at work"
          role="img"
        />
        <Container className="relative z-10 py-24">
          <div className="max-w-2xl">
            <h1
              className="text-5xl sm:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)', letterSpacing: "-0.01em" }}
            >
              {t("heroHeadline")}
            </h1>
            <p className="mt-6 text-lg text-white/85 leading-relaxed max-w-xl">
              {t("heroSubheadline")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#b91c2c] text-white font-bold uppercase tracking-wide rounded hover:bg-[#8b1521] transition-colors"
                style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}
              >
                {t("heroCta")}
              </a>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/60 text-white font-bold uppercase tracking-wide rounded hover:border-white hover:bg-white/10 transition-colors"
                style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}
              >
                {t("heroCtaSecondary")}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Strip */}
      <section className="bg-[#faf9f7] border-b border-[#e7e5e4]">
        <Container className="py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="w-6 h-6 text-[#7a5c00] flex-shrink-0" />
                <span className="text-sm font-semibold text-[#1c1917]">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <Section>
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7a5c00] mb-2">Our Services</p>
            <h2 className="text-4xl font-bold text-[#1c1917]" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
              {t("servicesHeading")}
            </h2>
            <p className="mt-4 text-[#78716c] leading-relaxed">{t("servicesBody")}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link key={service.href} href={service.href} className="group">
                <div className="bg-white border border-[#e7e5e4] rounded-xl p-6 border-t-4 border-t-[#c8922a] shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                  <service.icon className="w-8 h-8 text-[#7a5c00] mb-4" />
                  <h3 className="text-xl font-bold text-[#1c1917] mb-2" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#78716c] leading-relaxed flex-1">{service.description}</p>
                  <p className="mt-3 text-sm font-semibold text-[#7a5c00]">{service.price}</p>
                  <p className="mt-2 text-sm text-[#b91c2c] font-medium group-hover:underline">{tc("learnMore")} →</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* About Teaser */}
      <section className="bg-[#faf9f7]">
        <Container className="py-16">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7a5c00] mb-2">About Us</p>
              <h2 className="text-4xl font-bold text-[#1c1917] mb-4" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
                {t("aboutHeading")}
              </h2>
              <p className="text-[#78716c] leading-relaxed text-lg">{t("aboutBody")}</p>
              <Link
                href="/about"
                className="inline-flex mt-6 px-5 py-2.5 bg-[#7a5c00] text-white font-bold uppercase tracking-wide text-sm rounded hover:bg-[#5c4400] transition-colors"
                style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}
              >
                {t("aboutCta")} →
              </Link>
            </div>
            <div
              className="aspect-[4/3] bg-[#1e3a5f]/10 rounded-xl flex items-center justify-center"
              aria-label="Inside Martinez Auto Repair shop — hydraulic lifts, tools, and mechanics at work"
              role="img"
            >
              <div className="text-center text-[#78716c] p-8">
                <Wrench className="w-12 h-12 mx-auto mb-3 text-[#7a5c00]" />
                <p className="text-sm">Martinez Auto Repair — Inside the Shop</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <Testimonials
        heading={t("testimonialsHeading")}
        testimonials={testimonials}
      />

      {/* Service Area */}
      <section className="bg-[#1e3a5f]">
        <Container className="py-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
              {t("serviceAreaHeading")}
            </h2>
            <p className="text-white/80 leading-relaxed">{t("serviceAreaBody")}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["78702", "78721", "78722", "78741", "78723", "78724"].map((zip) => (
                <span key={zip} className="px-3 py-1 bg-white/10 text-white/90 rounded-full text-sm font-medium">
                  {zip}
                </span>
              ))}
            </div>
            <a
              href="https://maps.google.com/?q=East+7th+Street+Austin+TX+78702"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-6 px-5 py-2.5 bg-[#7a5c00] text-white font-bold uppercase tracking-wide text-sm rounded hover:bg-[#5c4400] transition-colors"
              style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}
            >
              {t("serviceAreaCta")}
            </a>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <FAQ
        heading={t("faqHeading")}
        background="alt"
        items={faqItems}
      />

      {/* CTA */}
      <CTA
        heading={t("ctaHeading")}
        description={t("ctaBody")}
        cta={{ text: t("ctaCall"), href: siteConfig.contact.phoneHref }}
      />

      {/* Mobile floating CTA */}
      <a
        href={siteConfig.contact.phoneHref}
        className="md:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-[#b91c2c] text-white font-bold uppercase tracking-wide rounded-full shadow-lg hover:bg-[#8b1521] transition-colors"
        style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}
      >
        <Phone className="w-4 h-4" />
        {locale === "es" ? "Llamar Ahora" : "Call Now"}
      </a>
    </>
  );
}
