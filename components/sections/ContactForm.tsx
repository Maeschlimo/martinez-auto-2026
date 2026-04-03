"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

interface ContactFormProps {
  id?: string;
  heading?: string;
  description?: string;
  background?: "default" | "alt";
}

export function ContactForm({ id = "contact", heading, description, background = "alt" }: ContactFormProps) {
  const t = useTranslations("common");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id={id} background={background}>
      <Container className="max-w-2xl">
        {heading && <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">{heading}</h2>}
        {description && <p className="text-center text-[var(--color-text-muted)] mb-10">{description}</p>}
        {status === "success" ? (
          <p className="text-center text-[var(--color-success)] font-medium py-8">{t("thankYou")}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5">{t("name")} *</label>
                <input id="name" name="name" required className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">{t("email")} *</label>
                <input id="email" name="email" type="email" required className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1.5">{t("phone")}</label>
              <input id="phone" name="phone" type="tel" className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1.5">{t("message")} *</label>
              <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-y" />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
              {status === "submitting" ? t("submitting") : t("sendMessage")}
            </Button>
            {status === "error" && <p className="text-[var(--color-error)] text-sm text-center">{t("errorGeneric")}</p>}
          </form>
        )}
      </Container>
    </Section>
  );
}
