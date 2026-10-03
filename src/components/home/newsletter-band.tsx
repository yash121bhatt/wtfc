import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function NewsletterBand() {
  const t = useTranslations("newsletter");

  return (
    <section className="relative overflow-hidden bg-night py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(45rem 25rem at 20% 0%, rgb(198 47 160 / 0.28), transparent 65%), radial-gradient(40rem 24rem at 85% 100%, rgb(198 47 160 / 0.18), transparent 65%)",
        }}
      />

      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-brand-500/15 text-brand-300">
              <Mail className="size-6" aria-hidden="true" />
            </span>

            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("body")}
              align="center"
              tone="dark"
              className="items-center"
            />

            <NewsletterForm layout="inline" className="w-full max-w-2xl" />

            <p className="text-xs text-white/45">{t("privacy")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
