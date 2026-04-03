interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: "default" | "alt" | "primary" | "dark";
}

const bgMap = {
  default: "bg-[var(--color-surface)]",
  alt: "bg-[var(--color-surface-alt)]",
  primary: "bg-[var(--color-primary)] text-white",
  dark: "bg-[var(--color-text)] text-white",
};

export function Section({ children, id, className = "", background = "default" }: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${bgMap[background]} ${className}`}>
      {children}
    </section>
  );
}
