import Image from "next/image";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  image?: { src: string; alt: string; width?: number; height?: number };
}

export function Card({ children, className = "", image }: CardProps) {
  return (
    <div className={`rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden ${className}`}>
      {image && (
        <div className="relative aspect-video">
          <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
