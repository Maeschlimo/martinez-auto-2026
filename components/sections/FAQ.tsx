"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  id?: string;
  heading?: string;
  items: FAQItem[];
  background?: "default" | "alt";
}

export function FAQ({ id = "faq", heading, items, background = "default" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id={id} background={background}>
      <Container className="max-w-3xl">
        {heading && <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">{heading}</h2>}
        <div className="divide-y divide-[var(--color-border)]">
          {items.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="w-full py-5 flex items-center justify-between text-left font-medium hover:text-[var(--color-primary)] transition-colors"
              >
                <span>{item.question}</span>
                <ChevronDown className={`w-5 h-5 shrink-0 ml-4 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="pb-5 text-[var(--color-text-muted)] leading-relaxed">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
