import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] py-12 bg-[var(--color-surface-alt)]">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-bold text-lg">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{siteConfig.description}</p>
          </div>
          <div>
            <p className="font-semibold mb-3">Contact</p>
            <div className="space-y-1 text-sm text-[var(--color-text-muted)]">
              <p>{siteConfig.contact.email}</p>
              <p>{siteConfig.contact.phone}</p>
              <p>{siteConfig.contact.address.street}</p>
              <p>{siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}</p>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-3">Links</p>
            <div className="space-y-1 text-sm">
              <Link href="/services" className="block text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">Services</Link>
              <Link href="/about" className="block text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">About</Link>
              <Link href="/blog" className="block text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">Blog</Link>
              <Link href="/contact" className="block text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">Contact</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[var(--color-border)] text-center text-sm text-[var(--color-text-muted)]">
          &copy; {year} {siteConfig.name}. {t("rights")}
        </div>
      </Container>
    </footer>
  );
}
