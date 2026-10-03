import { useLocale, useTranslations } from "next-intl";
import { Check, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { sponsorTiers, POPULAR_LABEL } from "@/data/sponsors";
import { pick } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SponsorshipTiers({
  showFooterNote = true,
  id,
}: {
  showFooterNote?: boolean;
  id?: string;
}) {
  const t = useTranslations("sponsors");
  const locale = useLocale();

  return (
    <section id={id} className="band-tint scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("body")}
            align="center"
            className="mx-auto items-center"
          />
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sponsorTiers.map((tier, index) => (
            <Reveal as="li" key={tier.key} delay={index * 0.07}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-white p-7",
                  tier.popular
                    ? "border-brand-500 shadow-[0_30px_60px_-40px_rgb(198_47_160/0.8)] lg:-my-4"
                    : "border-line",
                )}
              >
                {tier.popular ? (
                  <span className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                    <Sparkles className="size-3" aria-hidden="true" />
                    {pick(POPULAR_LABEL, locale)}
                  </span>
                ) : null}

                <h3 className="text-lg font-bold text-ink">
                  {pick(tier.name, locale)}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-600">
                  {pick(tier.cadence, locale)}
                </p>

                <p className="mt-5 text-3xl font-extrabold tracking-tight text-ink">
                  {pick(tier.price, locale)}
                </p>
                <p className="mt-2 min-h-12 text-sm leading-relaxed text-body">
                  {pick(tier.blurb, locale)}
                </p>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature.en}
                      className="flex gap-2.5 text-sm leading-snug text-body"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-brand-600"
                        aria-hidden="true"
                      />
                      {pick(feature, locale)}
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href="/contact"
                  variant={tier.popular ? "primary" : "secondary"}
                  size="sm"
                  className="mt-7 w-full"
                >
                  {t("cta")}
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </ul>

        {showFooterNote ? (
          <Reveal>
            <p className="mt-10 text-center text-sm text-body">
              {t("ctaSecondary")}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
