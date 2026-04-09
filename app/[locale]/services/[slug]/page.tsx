import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/sections/CTA";
import { Link } from "@/i18n/navigation";
import { CheckCircle2 } from "lucide-react";

type Locale = "en" | "es";

const serviceData: Record<string, {
  meta: Record<Locale, { title: string; description: string }>;
  hero: Record<Locale, { headline: string; subheadline: string; cta: string }>;
  intro: Record<Locale, string>;
  benefits: Record<Locale, string[]>;
  priceCallout: Record<Locale, { heading: string; items: string[]; note: string }>;
  image: { alt_en: string; alt_es: string };
}> = {
  "oil-change": {
    meta: {
      en: { title: "Oil Change Austin TX | From $39.99 | Martinez Auto Repair", description: "Full synthetic, conventional, and high-mileage oil changes in East Austin starting at $39.99. Same-day service, no appointment needed." },
      es: { title: "Cambio de Aceite Austin TX | Desde $39.99 | Martinez Auto Repair", description: "Cambio de aceite sintético, convencional y alto kilometraje en Este Austin desde $39.99. Servicio el mismo día, sin cita previa." },
    },
    hero: {
      en: { headline: "Oil Change & Fluid Services in East Austin", subheadline: "Fast, honest, no-surprise pricing. From $39.99. Walk-ins welcome.", cta: "Call Us — Walk-Ins Welcome" },
      es: { headline: "Cambio de Aceite y Fluidos en el Este de Austin", subheadline: "Rápido, honesto, precios sin sorpresas. Desde $39.99. Sin cita previa.", cta: "Llámenos — Se Acepta Sin Cita" },
    },
    intro: {
      en: "Regular oil changes are the single most important thing you can do to keep your engine running. We make it easy — no appointment, no pressure, no upsell. Just tell us what your car needs and we'll take care of it.",
      es: "Los cambios de aceite regulares son lo más importante que puede hacer para mantener su motor funcionando. Lo hacemos fácil — sin cita, sin presión, sin ventas innecesarias. Solo díganos lo que necesita su carro y nosotros nos encargamos.",
    },
    benefits: {
      en: ["Extends engine life significantly", "Prevents costly engine damage from dirty or low oil", "We check your tire pressure and fluid levels at no extra charge", "30–45 minute turnaround for most vehicles", "ASE-certified technicians — not lube techs"],
      es: ["Extiende significativamente la vida del motor", "Previene daños costosos al motor por aceite sucio o bajo", "Revisamos la presión de llantas y niveles de fluidos sin costo extra", "30 a 45 minutos de tiempo de entrega para la mayoría de los vehículos", "Técnicos certificados ASE"],
    },
    priceCallout: {
      en: { heading: "Transparent Pricing", items: ["Conventional — from $39.99", "Full Synthetic — from $59.99", "High-Mileage — from $49.99"], note: "Price includes oil, filter, and multi-point fluid check. No hidden fees." },
      es: { heading: "Precios Transparentes", items: ["Convencional — desde $39.99", "Sintético Completo — desde $59.99", "Alto Kilometraje — desde $49.99"], note: "El precio incluye aceite, filtro y revisión de fluidos. Sin cargos ocultos." },
    },
    image: { alt_en: "Motor oil being drained from a vehicle — oil change service in progress", alt_es: "Aceite de motor siendo drenado de un vehículo — servicio de cambio de aceite en proceso" },
  },
  "brake-repair": {
    meta: {
      en: { title: "Brake Repair Austin TX | Free Inspection | Martinez Auto Repair", description: "Free brake inspection in East Austin. Pad & rotor replacement, brake fluid flush, ABS diagnostics from $149. Same-day service. ASE-certified." },
      es: { title: "Reparación de Frenos Austin TX | Inspección Gratis | Martinez Auto Repair", description: "Inspección de frenos gratis en Este Austin. Cambio de pastillas y discos, fluido de frenos, diagnóstico ABS desde $149. Servicio mismo día." },
    },
    hero: {
      en: { headline: "Brake Repair & Inspection — East Austin", subheadline: "Free brake inspection. We show you the wear before we quote a single dollar.", cta: "Get Your Free Brake Inspection" },
      es: { headline: "Reparación e Inspección de Frenos — Este Austin", subheadline: "Inspección de frenos gratis. Le mostramos el desgaste antes de cobrarle un solo dólar.", cta: "Su Inspección de Frenos Gratis" },
    },
    intro: {
      en: "Your brakes are the most important safety system on your car. If something doesn't feel right — squealing, grinding, pulling, or a soft pedal — don't wait. We'll check it for free and give you an honest assessment.",
      es: "Sus frenos son el sistema de seguridad más importante de su carro. Si algo no se siente bien — chirrido, rozamiento, jalón o pedal suave — no espere. Los revisamos gratis y le damos una evaluación honesta.",
    },
    benefits: {
      en: ["Free brake inspection — no obligation", "We show you the wear in person before quoting", "Same-day service available for most brake jobs", "ABS and electronic brake system diagnostics", "All makes and models, domestic and import"],
      es: ["Inspección de frenos gratis — sin compromiso", "Le mostramos el desgaste en persona antes de cotizar", "Servicio el mismo día disponible para la mayoría de trabajos de frenos", "Diagnóstico ABS y sistemas de frenos electrónicos", "Todas las marcas y modelos, domésticos e importados"],
    },
    priceCallout: {
      en: { heading: "Honest Brake Pricing", items: ["Free inspection with any visit", "Pad replacement from $149/axle", "Rotor replacement from $199/axle", "Brake fluid flush from $79"], note: "Final price depends on your vehicle and parts needed. We quote before we touch anything." },
      es: { heading: "Precios Honestos para Frenos", items: ["Inspección gratis con cualquier visita", "Cambio de pastillas desde $149/eje", "Reemplazo de discos desde $199/eje", "Purga de frenos desde $79"], note: "El precio final depende de su vehículo y las piezas necesarias. Le cotizamos antes de tocar nada." },
    },
    image: { alt_en: "Brake pad and rotor replacement in progress — precision brake repair", alt_es: "Reemplazo de pastillas de freno y rotor en proceso — reparación precisa de frenos" },
  },
  "engine-diagnostics": {
    meta: {
      en: { title: "Check Engine Light Diagnosis Austin TX | $89 | Martinez Auto Repair", description: "Check engine light on in Austin? $89 computer diagnostic (waived with repair). We diagnose before we repair." },
      es: { title: "Diagnóstico Check Engine Austin TX | $89 | Martinez Auto Repair", description: "¿Luz de check engine encendida en Austin? Diagnóstico computarizado $89 (se exenta con reparación)." },
    },
    hero: {
      en: { headline: "Check Engine Light On? We'll Tell You Exactly What's Wrong.", subheadline: "$89 computer diagnostic. Fee waived when you repair with us. No guesswork.", cta: "Schedule a Diagnostic" },
      es: { headline: "¿Luz de Check Engine Encendida? Le Decimos Exactamente Qué Está Mal.", subheadline: "Diagnóstico computarizado $89. El cargo se exenta cuando repara con nosotros. Sin suposiciones.", cta: "Agendar un Diagnóstico" },
    },
    intro: {
      en: "That check engine light can mean a hundred different things — and guessing wrong is expensive. We run a full computer diagnostic, pull every code, and tell you exactly what your car is telling us.",
      es: "Esa luz de check engine puede significar cien cosas diferentes — y adivinar mal es caro. Hacemos un diagnóstico computarizado completo, sacamos todos los códigos y le decimos exactamente lo que su carro nos está diciendo.",
    },
    benefits: {
      en: ["Full OBD-II computer scan — every code, not just the obvious one", "Plain-language explanation — no mechanic jargon", "$89 fee waived when you repair with us", "Emissions test failure diagnosis and repair", "We diagnose before we repair — always"],
      es: ["Escaneo computarizado OBD-II completo — todos los códigos", "Explicación en palabras claras — sin jerga de mecánico", "El cargo de $89 se exenta cuando repara con nosotros", "Diagnóstico y reparación de fallas en prueba de emisiones", "Diagnosticamos antes de reparar — siempre"],
    },
    priceCallout: {
      en: { heading: "Diagnostic Pricing", items: ["Computer diagnostic — $89", "$89 waived when you repair with us"], note: "We explain every code before recommending any repair." },
      es: { heading: "Precio del Diagnóstico", items: ["Diagnóstico computarizado — $89", "$89 se exenta cuando repara con nosotros"], note: "Explicamos cada código antes de recomendar cualquier reparación." },
    },
    image: { alt_en: "OBD-II diagnostic scan in progress — engine computer analysis", alt_es: "Escaneo de diagnóstico OBD-II en proceso — análisis de computadora del motor" },
  },
  "ac-repair": {
    meta: {
      en: { title: "Car AC Repair Austin TX | From $129 | Martinez Auto Repair", description: "Car AC not blowing cold in Austin? AC recharge, compressor repair, heater core replacement from $129. All makes and models. Same-day service." },
      es: { title: "Reparación Aire Acondicionado Carro Austin TX | Desde $129 | Martinez", description: "¿El AC de su carro no enfría en Austin? Recarga de AC, reparación de compresor, núcleo de calefactor desde $129. Todas las marcas." },
    },
    hero: {
      en: { headline: "Car AC Repair in East Austin — Don't Sweat It", subheadline: "Texas summers are brutal. We diagnose and repair AC systems for all makes and models. From $129.", cta: "Call About Your AC" },
      es: { headline: "Reparación de AC en el Este de Austin — No Se Acalore", subheadline: "Los veranos en Texas son implacables. Diagnosticamos y reparamos sistemas de AC para todas las marcas. Desde $129.", cta: "Llame por Su AC" },
    },
    intro: {
      en: "When your AC stops blowing cold in Austin, it's not just uncomfortable — it's a real problem. We've been fixing car AC systems for 18 years. From a simple recharge to a full compressor replacement, we handle it all.",
      es: "Cuando su AC deja de enfriar en Austin, no es solo incomodidad — es un problema real. Llevamos 18 años reparando sistemas de AC de carros. Desde una simple recarga hasta el reemplazo completo del compresor, lo manejamos todo.",
    },
    benefits: {
      en: ["MACS certified — proper refrigerant handling", "All makes and models, domestic and import", "Full system diagnosis — not just a recharge", "Same-day service available for recharges and minor repairs", "We explain what we found and why before we start"],
      es: ["Certificación MACS — manejo correcto de refrigerante", "Todas las marcas y modelos, domésticos e importados", "Diagnóstico completo del sistema — no solo una recarga", "Servicio el mismo día disponible para recargas y reparaciones menores", "Explicamos lo que encontramos y por qué antes de empezar"],
    },
    priceCallout: {
      en: { heading: "AC Service Pricing", items: ["AC recharge from $129", "Compressor diagnosis and repair — call for quote", "Cabin air filter replacement from $39"], note: "Pricing depends on your vehicle and what the diagnosis finds." },
      es: { heading: "Precios del Servicio de AC", items: ["Recarga de AC desde $129", "Diagnóstico y reparación de compresor — llame para cotización", "Reemplazo de filtro de aire de cabina desde $39"], note: "El precio depende de su vehículo y lo que encuentre el diagnóstico." },
    },
    image: { alt_en: "AC system recharge in progress — refrigerant service at Martinez Auto Repair", alt_es: "Recarga del sistema de AC en proceso — servicio de refrigerante en Martinez Auto Repair" },
  },
  "tire-services": {
    meta: {
      en: { title: "Tire Services Austin TX | Rotation from $29.99 | Martinez Auto Repair", description: "Tire rotation, balancing, flat repair, and new tire installation in East Austin. From $29.99. We match or beat dealer pricing." },
      es: { title: "Servicios de Llantas Austin TX | Rotación desde $29.99 | Martinez", description: "Rotación, balanceo, reparación de ponchadura e instalación de llantas nuevas en Este Austin. Desde $29.99. Igualamos precios del distribuidor." },
    },
    hero: {
      en: { headline: "Tire Services in East Austin — Fair Prices, No Runaround", subheadline: "Rotation, balancing, flat repair, and new tires. We match or beat dealer pricing. Walk-ins welcome.", cta: "Come In — No Appointment Needed" },
      es: { headline: "Servicios de Llantas en el Este de Austin — Precios Justos, Sin Rodeos", subheadline: "Rotación, balanceo, reparación de ponchadura y llantas nuevas. Igualamos o mejoramos el precio del distribuidor.", cta: "Venga — Sin Cita Necesaria" },
    },
    intro: {
      en: "Tires affect everything — your gas mileage, your braking, how your car handles in the rain. We keep it simple: tell us what you need, we'll take care of it fast and charge a fair price.",
      es: "Las llantas afectan todo — su consumo de gasolina, su frenado, cómo maneja su carro en la lluvia. Lo hacemos simple: díganos lo que necesita, lo hacemos rápido y cobramos un precio justo.",
    },
    benefits: {
      en: ["Walk-in tire rotation — no appointment", "Flat repair typically under 30 minutes", "Dealer price-match guarantee on new tires", "All brands, all sizes, domestic and import vehicles", "Free tire pressure check with every visit"],
      es: ["Rotación de llantas sin cita — venga directo", "Reparación de ponchadura típicamente en menos de 30 minutos", "Garantía de igualar precios del distribuidor en llantas nuevas", "Todas las marcas, todos los tamaños, vehículos domésticos e importados", "Revisión de presión de llantas gratis en cada visita"],
    },
    priceCallout: {
      en: { heading: "Tire Service Pricing", items: ["Tire rotation from $29.99", "Wheel balance from $15/tire", "Flat repair from $25", "New tire installation — call for current pricing"], note: "We match or beat dealer pricing on new tires. Bring us a quote." },
      es: { heading: "Precios del Servicio de Llantas", items: ["Rotación de llantas desde $29.99", "Balanceo desde $15/llanta", "Reparación de ponchadura desde $25", "Instalación de llantas nuevas — llame para precio actual"], note: "Igualamos o mejoramos precios del distribuidor. Tráiganos una cotización." },
    },
    image: { alt_en: "Tire mounting in progress on a professional tire machine", alt_es: "Montaje de neumático en proceso en una máquina profesional" },
  },
  "transmission": {
    meta: {
      en: { title: "Transmission Service Austin TX | Martinez Auto Repair East Austin", description: "Transmission fluid change, filter replacement, and diagnostics in East Austin. Manual and automatic, domestic and import. Honest pricing." },
      es: { title: "Servicio de Transmisión Austin TX | Martinez Auto Repair Este Austin", description: "Cambio de fluido, filtro y diagnóstico de transmisión en Este Austin. Manual y automática, domésticos e importados. Precios honestos." },
    },
    hero: {
      en: { headline: "Transmission Service in East Austin — We Diagnose Before We Quote", subheadline: "Manual and automatic, domestic and import. No guesswork, no surprise bills.", cta: "Call for a Quote" },
      es: { headline: "Servicio de Transmisión en el Este de Austin — Diagnosticamos Antes de Cotizar", subheadline: "Manual y automática, domésticos e importados. Sin suposiciones, sin facturas sorpresa.", cta: "Llame para Cotización" },
    },
    intro: {
      en: "Transmission problems are serious — and getting the wrong diagnosis is expensive. We take a thorough approach: diagnose first, quote second, repair third. You'll always know exactly what we're doing and why.",
      es: "Los problemas de transmisión son serios — y un diagnóstico incorrecto es caro. Tomamos un enfoque minucioso: primero diagnosticamos, luego cotizamos, luego reparamos. Siempre sabrá exactamente qué estamos haciendo y por qué.",
    },
    benefits: {
      en: ["Thorough diagnosis before any repair recommendation", "Manual and automatic transmission service", "Domestic and import vehicles covered", "Transparent quoting — you approve before we start", "Regular fluid service prevents costly major repairs"],
      es: ["Diagnóstico minucioso antes de cualquier recomendación de reparación", "Servicio de transmisión manual y automática", "Cobertura de vehículos domésticos e importados", "Cotización transparente — usted aprueba antes de que empecemos", "El servicio regular de fluidos previene reparaciones costosas"],
    },
    priceCallout: {
      en: { heading: "Transmission Service Pricing", items: ["Transmission fluid change — call for quote", "Filter replacement — call for quote", "Transmission diagnostic scan — call for quote"], note: "Transmission work varies significantly by vehicle. We diagnose and quote before starting any work." },
      es: { heading: "Precios del Servicio de Transmisión", items: ["Cambio de fluido de transmisión — llame para cotización", "Reemplazo de filtro — llame para cotización", "Escaneo diagnóstico de transmisión — llame para cotización"], note: "El trabajo de transmisión varía significativamente según el vehículo. Diagnosticamos y cotizamos antes de empezar cualquier trabajo." },
    },
    image: { alt_en: "Transmission removed for inspection and service at Martinez Auto Repair", alt_es: "Transmisión removida para inspección y servicio en Martinez Auto Repair" },
  },
};

const relatedServices: Record<string, string[]> = {
  "oil-change": ["brake-repair", "tire-services"],
  "brake-repair": ["oil-change", "tire-services"],
  "engine-diagnostics": ["oil-change", "transmission"],
  "ac-repair": ["engine-diagnostics", "oil-change"],
  "tire-services": ["brake-repair", "oil-change"],
  "transmission": ["engine-diagnostics", "oil-change"],
};

const serviceNames: Record<string, Record<Locale, string>> = {
  "oil-change": { en: "Oil Change", es: "Cambio de Aceite" },
  "brake-repair": { en: "Brake Repair", es: "Frenos" },
  "engine-diagnostics": { en: "Engine Diagnostics", es: "Diagnóstico de Motor" },
  "ac-repair": { en: "AC Repair", es: "Reparación de AC" },
  "tire-services": { en: "Tire Services", es: "Llantas" },
  "transmission": { en: "Transmission", es: "Transmisión" },
};

export async function generateStaticParams() {
  const slugs = ["oil-change", "brake-repair", "engine-diagnostics", "ac-repair", "tire-services", "transmission"];
  return [
    ...slugs.map((slug) => ({ locale: "en", slug })),
    ...slugs.map((slug) => ({ locale: "es", slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const service = serviceData[slug];
  if (!service) return {};
  const l: Locale = locale === "es" ? "es" : "en";
  return buildMetadata({
    title: service.meta[l].title,
    description: service.meta[l].description,
    path: `/services/${slug}`,
    locale,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const service = serviceData[slug];
  if (!service) notFound();

  const l: Locale = locale === "es" ? "es" : "en";
  const hero = service.hero[l];
  const intro = service.intro[l];
  const benefits = service.benefits[l];
  const price = service.priceCallout[l];
  const imageAlt = l === "es" ? service.image.alt_es : service.image.alt_en;
  const related = relatedServices[slug] ?? [];

  return (
    <>
      {/* Service Hero */}
      <section className="relative bg-[#0d1b2a] py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b2a] to-[#1e3a5f]/40" />
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #0d1b2a 100%)" }}
          aria-label={imageAlt}
          role="img"
        />
        <Container className="relative z-10">
          <h1 className="text-5xl sm:text-6xl font-bold text-white" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
            {hero.headline}
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-xl">{hero.subheadline}</p>
          <a
            href={siteConfig.contact.phoneHref}
            className="inline-flex mt-6 px-6 py-3 bg-[#b91c2c] text-white font-bold uppercase tracking-wide rounded hover:bg-[#8b1521] transition-colors"
            style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}
          >
            {hero.cta}
          </a>
        </Container>
      </section>

      {/* Service Details */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-lg text-[#78716c] leading-relaxed">{intro}</p>

              <h2 className="mt-8 text-2xl font-bold text-[#1c1917]" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
                {l === "es" ? "Por Qué Elegirnos" : "Why Choose Martinez Auto"}
              </h2>
              <ul className="mt-4 space-y-3">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#7a5c00] flex-shrink-0 mt-0.5" />
                    <span className="text-[#44403c]">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar */}
            <div>
              {/* Price Callout */}
              <div className="bg-[#faf9f7] rounded-xl p-6 border border-[#e7e5e4]">
                <h3 className="text-xl font-bold text-[#1c1917] mb-4" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
                  {price.heading}
                </h3>
                <ul className="space-y-2 mb-4">
                  {price.items.map((item, i) => (
                    <li key={i} className="text-sm text-[#44403c] py-2 border-b border-[#e7e5e4] last:border-0">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[#78716c] italic">{price.note}</p>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="w-full flex justify-center mt-4 px-4 py-3 bg-[#b91c2c] text-white font-bold uppercase tracking-wide rounded hover:bg-[#8b1521] transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}
                >
                  {l === "es" ? "Llamar Ahora" : "Call Now"}
                </a>
              </div>

              {/* Related services */}
              {related.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-[#1c1917] mb-3" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
                    {l === "es" ? "Otros Servicios" : "Related Services"}
                  </h3>
                  <div className="space-y-2">
                    {related.map((s) => (
                      <Link key={s} href={`/services/${s}`} className="block text-[#7a5c00] hover:text-[#1e3a5f] text-sm font-medium transition-colors">
                        → {serviceNames[s]?.[l] ?? s}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <CTA
        heading={l === "es" ? "¿Listo para Traer Su Carro?" : "Ready to Bring Your Car In?"}
        description={l === "es" ? "Se aceptan sin cita. Llame antes para trabajos más grandes." : "Walk-ins welcome. Call ahead for bigger jobs and we'll make sure we're ready for you."}
        cta={{ text: l === "es" ? "Llamar Ahora" : "Call Now", href: siteConfig.contact.phoneHref }}
      />
    </>
  );
}
