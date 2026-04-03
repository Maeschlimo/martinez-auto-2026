import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

interface TestimonialsProps {
  id?: string;
  heading?: string;
  testimonials: Testimonial[];
  background?: "default" | "alt";
}

export function Testimonials({ id = "testimonials", heading, testimonials, background = "alt" }: TestimonialsProps) {
  return (
    <Section id={id} background={background}>
      <Container>
        {heading && <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">{heading}</h2>}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="p-6 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)]">
              <p className="text-[var(--color-text)] italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 pt-4 border-t border-[var(--color-border)]">
                <cite className="not-italic font-semibold">{t.author}</cite>
                {t.role && <p className="text-sm text-[var(--color-text-muted)]">{t.role}</p>}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </Section>
  );
}
