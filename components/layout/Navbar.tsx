"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Menu, X, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { mainNav } from "@/config/navigation";
import type { Locale } from "@/i18n/config";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const nav = mainNav[locale];

  function switchLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <header className="sticky top-0 z-50 bg-[#1e3a5f] shadow-md">
      <Container className="flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl text-white tracking-tight" style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}>
            Martinez Auto
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "text-[#c8922a]"
                  : "text-white/80 hover:text-[#c8922a]"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Language toggle */}
          <button
            onClick={() => switchLocale(locale === "en" ? "es" : "en")}
            className="flex items-center gap-1 px-3 py-1 rounded-full border border-white/30 text-sm font-medium text-white/70 hover:text-[#c8922a] hover:border-[#c8922a] transition-colors"
          >
            {locale === "en" ? "ES" : "EN"}
          </button>

          {/* Call Now CTA */}
          <a
            href={siteConfig.contact.phoneHref}
            className="flex items-center gap-2 px-4 py-2 bg-[#e63946] text-white text-sm font-bold uppercase tracking-wide rounded hover:bg-[#b82030] transition-colors"
            style={{ fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)' }}
          >
            <Phone className="w-4 h-4" />
            {t("callCta")}
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-white/20 bg-[#0f1f33]">
          <Container className="py-4 space-y-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  pathname === item.href ? "text-[#c8922a]" : "text-white/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                switchLocale(locale === "en" ? "es" : "en");
                setOpen(false);
              }}
              className="block py-2 text-sm font-medium text-white/60 uppercase"
            >
              {locale === "en" ? "Español" : "English"}
            </button>
            <a
              href={siteConfig.contact.phoneHref}
              className="flex items-center gap-2 mt-2 px-4 py-3 bg-[#e63946] text-white text-sm font-bold uppercase tracking-wide rounded justify-center"
            >
              <Phone className="w-4 h-4" />
              {t("callCta")}
            </a>
          </Container>
        </nav>
      )}
    </header>
  );
}
