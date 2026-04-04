import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { Phone, MapPin, Clock, ExternalLink } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0d1b2a] border-t-[3px] border-[#c8922a]">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand column */}
          <div>
            <p className="font-bold text-2xl text-white" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
              Martinez Auto
            </p>
            <p className="mt-2 text-sm text-white/60 max-w-xs leading-relaxed">
              {t("tagline")}
            </p>
            {siteConfig.social.facebook && (
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-[#c8922a] hover:text-white transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                {t("findUsOn")}
              </a>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-semibold text-white mb-4">{t("quickLinks")}</p>
            <div className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/about", label: "About Us" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-[#c8922a] hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <p className="font-semibold text-white mb-4">{t("contactInfo")}</p>
            <div className="space-y-3 text-sm text-white/70">
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-2 text-[#c8922a] hover:text-white transition-colors font-medium"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                {siteConfig.contact.phone}
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#c8922a]" />
                <span>
                  {siteConfig.contact.address.street}<br />
                  {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#c8922a]" />
                <span>{t("hours")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-white/40">
          &copy; {year} Martinez Auto Repair. {t("rights")}
        </div>
      </Container>
    </footer>
  );
}
