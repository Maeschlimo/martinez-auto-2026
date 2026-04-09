import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { Phone, MapPin, Clock, ExternalLink } from "lucide-react";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Contact Martinez Auto Repair | East Austin TX | Call or Visit",
    es: "Contacto Martinez Auto Repair | Este Austin TX | Llame o Visítenos",
  };
  const descriptions: Record<string, string> = {
    en: "Visit Martinez Auto Repair in East Austin (78702). Get directions, business hours, phone number, and our contact form. Same-day appointments available.",
    es: "Visite Martinez Auto Repair en Este Austin (78702). Obtenga indicaciones, horario, teléfono y nuestro formulario de contacto.",
  };
  return buildMetadata({
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    path: "/contact",
    locale,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

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

      {/* Main content */}
      <section className="py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-[#1c1917] mb-6" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
                {t("formHeading")}
              </h2>
              <ContactForm
                heading=""
                description={t("intro")}
              />
            </div>

            {/* Business Info */}
            <div className="space-y-8">
              {/* Hours */}
              <div>
                <h2 className="text-2xl font-bold text-[#1c1917] mb-4" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
                  {t("hoursHeading")}
                </h2>
                <div className="space-y-2 text-[#44403c]">
                  <div className="flex justify-between py-2 border-b border-[#e7e5e4]">
                    <span className="font-medium">{t("monFri")}</span>
                    <span>{t("monFriHours")}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#e7e5e4]">
                    <span className="font-medium">{t("saturday")}</span>
                    <span>{t("saturdayHours")}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">{t("sunday")}</span>
                    <span className="text-[#78716c]">{t("sundayHours")}</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-[#78716c] italic">{t("hoursNote")}</p>
              </div>

              {/* Location */}
              <div>
                <h2 className="text-2xl font-bold text-[#1c1917] mb-4" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
                  {t("locationHeading")}
                </h2>
                <div className="space-y-3">
                  <a href={siteConfig.contact.phoneHref} className="flex items-center gap-3 text-[#7a5c00] hover:text-[#1e3a5f] font-medium">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    {siteConfig.contact.phone}
                  </a>
                  <div className="flex items-start gap-3 text-[#44403c]">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#7a5c00]" />
                    <div>
                      <p>{siteConfig.contact.address.street}</p>
                      <p>{siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}</p>
                      <a
                        href="https://maps.google.com/?q=East+7th+Street+Austin+TX+78702"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#7a5c00] hover:text-[#1e3a5f] text-sm font-medium mt-1 inline-block"
                      >
                        {t("directionsLabel")} →
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[#44403c]">
                    <Clock className="w-5 h-5 flex-shrink-0 text-[#7a5c00]" />
                    <span className="text-sm">{locale === "es" ? "Lun–Vie: 7:30AM–6PM · Sáb: 8AM–4PM" : "Mon–Fri: 7:30AM–6PM · Sat: 8AM–4PM"}</span>
                  </div>
                  {siteConfig.social.facebook && (
                    <a
                      href={siteConfig.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-[#7a5c00] hover:text-[#1e3a5f] text-sm font-medium"
                    >
                      <ExternalLink className="w-5 h-5 flex-shrink-0" />
                      {t("facebookLabel")}
                    </a>
                  )}
                </div>
              </div>

              {/* Google Maps embed */}
              <div className="rounded-xl overflow-hidden border border-[#e7e5e4]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.8!2d-97.7431!3d30.2672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDE2JzAxLjkiTiA5N8KwNDQnMzUuMiJX!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Martinez Auto Repair — East Austin, TX"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
