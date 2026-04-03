import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import type { LucideIcon } from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
}

interface ServicesGridProps {
  id?: string;
  heading?: string;
  subheading?: string;
  services: ServiceItem[];
  columns?: 2 | 3;
  background?: "default" | "alt";
}

export function ServicesGrid({
  id = "services",
  heading,
  subheading,
  services,
  columns = 3,
  background = "default",
}: ServicesGridProps) {
  const gridCols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <Section id={id} background={background}>
      <Container>
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && <h2 className="text-3xl sm:text-4xl font-bold">{heading}</h2>}
            {subheading && <p className="mt-4 text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">{subheading}</p>}
          </div>
        )}
        <div className={`grid gap-8 ${gridCols}`}>
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="group block p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-sm transition-all">
              {service.icon && <service.icon className="w-8 h-8 text-[var(--color-primary)] mb-4" />}
              <h3 className="text-xl font-semibold group-hover:text-[var(--color-primary)] transition-colors">{service.title}</h3>
              <p className="mt-2 text-[var(--color-text-muted)]">{service.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
