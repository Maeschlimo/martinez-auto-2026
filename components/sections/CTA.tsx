import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

interface CTAProps {
  id?: string;
  heading: string;
  description?: string;
  cta: { text: string; href: string };
  variant?: "banner" | "inline";
}

export function CTA({ id = "cta", heading, description, cta, variant = "banner" }: CTAProps) {
  if (variant === "inline") {
    return (
      <div id={id} className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-[var(--radius-xl)] bg-[var(--color-primary-light)] border border-[var(--color-primary)]/20">
        <div>
          <h3 className="text-xl font-semibold">{heading}</h3>
          {description && <p className="mt-1 text-[var(--color-text-muted)]">{description}</p>}
        </div>
        <Link href={cta.href}><Button>{cta.text}</Button></Link>
      </div>
    );
  }

  return (
    <section id={id} className="py-16 sm:py-20 bg-[var(--color-primary)] text-white">
      <Container className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">{heading}</h2>
        {description && <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">{description}</p>}
        <div className="mt-8">
          <Link href={cta.href}>
            <Button size="lg" className="bg-white text-[var(--color-primary)] hover:bg-white/90">{cta.text}</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
