"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 bg-[var(--color-surface)]/95 backdrop-blur border-b border-[var(--color-border)]">
      <Container className="flex items-center justify-between h-16">
        <Link href="/" className="font-bold text-xl">{siteConfig.name}</Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={`text-sm font-medium transition-colors hover:text-[var(--color-primary)] ${pathname === item.href ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"}`}>
              {item.label}
            </Link>
          ))}
          <button onClick={() => switchLocale(locale === "en" ? "es" : "en")} className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] uppercase">
            {locale === "en" ? "ES" : "EN"}
          </button>
          <Link href="/contact"><Button size="sm">{t("contact")}</Button></Link>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <Container className="py-4 space-y-3">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block py-2 text-sm font-medium">
                {item.label}
              </Link>
            ))}
            <button onClick={() => { switchLocale(locale === "en" ? "es" : "en"); setOpen(false); }} className="block py-2 text-sm font-medium text-[var(--color-text-muted)] uppercase">
              {locale === "en" ? "Español" : "English"}
            </button>
          </Container>
        </nav>
      )}
    </header>
  );
}
