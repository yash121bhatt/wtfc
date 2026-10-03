import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Building2, Check, Network, Sprout, Users } from "lucide-react";
import { routing } from "@/i18n/routing";
import { assertLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { MembershipForm, SponsorForm, FORM_PANEL } from "@/components/join-forms";
import { SponsorshipTiers } from "@/components/home/sponsorship-tiers";
import { Faq } from "@/components/home/faq";
import { membershipTiers } from "@/data/membership";
import { pick } from "@/lib/site";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(assertLocale(locale), "meta.join");
}

export default async function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("joinPage");

  const reasons = [
    { key: "network", Icon: Network },
    { key: "learn", Icon: Sprout },
    { key: "impact", Icon: Check },
  ] as const;

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("body")}
        image="/images/events-3.jpg"
        imageAlt="WTFC members at a networking event"
      />

      {/* Membership options */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <ul className="grid gap-6 lg:grid-cols-2">
            {membershipTiers.map((tier, index) => (
              <Reveal as="li" key={tier.key} delay={index * 0.09}>
                <div
                  className={cn(
                    "flex h-full flex-col rounded-2xl border p-8",
                    tier.key === "corporate"
                      ? "border-brand-400 bg-brand-50/40"
                      : "border-line bg-white",
                  )}
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-brand-500 text-white">
                    {tier.Icon === "building" ? (
                      <Building2 className="size-5" aria-hidden="true" />
                    ) : (
                      <Users className="size-5" aria-hidden="true" />
                    )}
                  </span>
                  <h2 className="mt-5 text-2xl font-bold text-ink">
                    {pick(tier.title, locale)}
                  </h2>
                  <p className="mt-1.5 text-sm text-body">
                    {pick(tier.subtitle, locale)}
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
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <p className="mt-8 text-center text-sm text-body">{t("freeNote")}</p>
          </Reveal>
        </div>
      </section>

      {/* Why join */}
      <section className="band-surface border-y border-line py-20 sm:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              title={t("whyTitle")}
              align="center"
              className="mx-auto items-center"
            />
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {reasons.map(({ key, Icon }, index) => (
              <Reveal as="li" key={key} delay={index * 0.07}>
                <div className="h-full rounded-2xl border border-line bg-white p-7 text-center">
                  <span className="mx-auto grid size-12 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-bold text-ink">{t(`why.${key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {t(`why.${key}.text`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Application form */}
      <section className="bg-white py-20 sm:py-24" id="apply">
        <div className="container-page">
          <Reveal>
            <div className={FORM_PANEL}>
              <SectionHeading
                title={t("applyTitle")}
                description={t("applyBody")}
                className="mb-10"
              />
              <MembershipForm defaultType="individual" />
            </div>
          </Reveal>
        </div>
      </section>

      <SponsorshipTiers showFooterNote={false} />

      {/* Sponsor enquiry */}
      <section className="band-surface border-t border-line py-20 sm:py-24" id="sponsor">
        <div className="container-page">
          <Reveal>
            <div className={FORM_PANEL}>
              <SectionHeading
                eyebrow={t("sponsorEyebrow")}
                title={t("sponsorFormTitle")}
                description={t("sponsorFormBody")}
                className="mb-10"
              />
              <SponsorForm />
            </div>
          </Reveal>
        </div>
      </section>

      <Faq />
    </>
  );
}
