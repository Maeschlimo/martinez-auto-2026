import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

interface HeroProps {
  headline: string;
  subheadline?: string;
  cta?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
  image?: { src: string; alt: string };
  variant?: "centered" | "split" | "image-bg";
  overlay?: number;
}

export function Hero({
  headline,
  subheadline,
  cta,
  ctaSecondary,
  image,
  variant = "centered",
  overlay = 40,
}: HeroProps) {
  if (variant === "image-bg" && image) {
    return (
      <section className="relative min-h-[80vh] flex items-center">
        <Image src={image.src} alt={image.alt} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${overlay / 100})` }} />
        <Container className="relative z-10 text-center text-white py-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto">{headline}</h1>
          {subheadline && <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto opacity-90">{subheadline}</p>}
          {cta && (
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link href={cta.href}><Button size="lg">{cta.text}</Button></Link>
              {ctaSecondary && <Link href={ctaSecondary.href}><Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">{ctaSecondary.text}</Button></Link>}
            </div>
          )}
        </Container>
      </section>
    );
  }

  if (variant === "split" && image) {
    return (
      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">{headline}</h1>
            {subheadline && <p className="mt-6 text-lg text-[var(--color-text-muted)]">{subheadline}</p>}
            {cta && (
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href={cta.href}><Button size="lg">{cta.text}</Button></Link>
                {ctaSecondary && <Link href={ctaSecondary.href}><Button variant="outline" size="lg">{ctaSecondary.text}</Button></Link>}
              </div>
            )}
          </div>
          <div className="relative aspect-[4/3] rounded-[var(--radius-xl)] overflow-hidden">
            <Image src={image.src} alt={image.alt} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </Container>
      </section>
    );
  }

  // Default: centered
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container className="text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto">{headline}</h1>
        {subheadline && <p className="mt-6 text-lg sm:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">{subheadline}</p>}
        {cta && (
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link href={cta.href}><Button size="lg">{cta.text}</Button></Link>
            {ctaSecondary && <Link href={ctaSecondary.href}><Button variant="outline" size="lg">{ctaSecondary.text}</Button></Link>}
          </div>
        )}
      </Container>
    </section>
  );
}
