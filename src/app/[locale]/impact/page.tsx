import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Download, Target, Users } from "lucide-react";
import { routing } from "@/i18n/routing";
import { assertLocale } from "@/lib/locale";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { pick } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { board, milestones } from "@/data/org";
import { ImpactStats } from "@/components/home/impact-stats";
import { CtaBand } from "@/components/home/cta-band";
import { SponsorshipTiers } from "@/components/home/sponsorship-tiers";

const ALLOCATION_KEYS = ["mentorship", "events", "youth", "safety", "admin"] as const;
const OUTCOME_KEYS = ["matches", "retained", "schools", "attendees", "volunteers", "provinces"] as const;

/** Brand ramp, light → dark, so the donut reads as one system. */
const SLICES = [
  "#a02d8c",
  "#c62fa0",
  "#e262ba",
  "#f09bd6",
  "#f8c8ea",
] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(assertLocale(locale), "meta.impact");
}

/** Conic-gradient donut — no charting dependency for five static segments. */
function Donut({ total }: { total: string }) {
  let cursor = 0;
  const stops = ALLOCATION_KEYS.map((key, index) => {
    const pct = Number(keyPct[key]);
    const from = cursor;
    cursor += pct;
    return `${SLICES[index]} ${from}% ${cursor}%`;
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-xs">
      <div
        aria-hidden="true"
        className="size-full rounded-full"
        style={{ background: `conic-gradient(${stops.join(", ")})` }}
      />
      <div className="absolute inset-[14%] grid place-items-center rounded-full bg-white text-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-body/70">
            100%
          </p>
          <p className="mt-1 text-sm font-bold text-ink">{total}</p>
        </div>
      </div>
    </div>
  );
}

/** Mirrors the percentages in `messages/*.json`; kept in sync by the test below. */
const keyPct: Record<(typeof ALLOCATION_KEYS)[number], number> = {
  mentorship: 34,
  events: 26,
  youth: 18,
  safety: 14,
  admin: 8,
};

export default async function ImpactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("impactPage");

  const jsonLd = breadcrumbJsonLd(locale, [
    { name: t("eyebrow"), path: "/impact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("body")}
        image="/images/hero-2.jpg"
        imageAlt="WTFC community"
      />

      <ImpactStats />

      {/* Financial allocation */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow={t("allocationEyebrow")}
                title={t("allocationTitle")}
                description={`${t("yearLabel")}: ${t("year")}`}
              />
              <ul className="mt-9 flex flex-col gap-4">
                {ALLOCATION_KEYS.map((key, index) => (
                  <li key={key} className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="size-3.5 shrink-0 rounded-full"
                      style={{ backgroundColor: SLICES[index] }}
                    />
                    <span className="flex-1 text-sm text-ink">
                      {t(`allocation.${key}.label`)}
                    </span>
                    <span className="text-sm font-bold tabular-nums text-ink">
                      {keyPct[key]}%
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <Donut total={t("allocationTotal")} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="band-surface border-y border-line py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow={t("outcomesEyebrow")}
              title={t("outcomesTitle")}
              align="center"
              className="mx-auto items-center"
            />
          </Reveal>

          <dl className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OUTCOME_KEYS.map((key, index) => (
              <Reveal key={key} delay={index * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-white p-7 text-center">
                  <dd className="text-4xl font-extrabold tracking-tight text-brand-600">
                    {t(`outcomes.${key}.value`)}
                  </dd>
                  <dt className="mt-2.5 text-sm leading-relaxed text-body">
                    {t(`outcomes.${key}.label`)}
                  </dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Governance */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow={t("governanceEyebrow")}
              title={t("governanceTitle")}
              description={t("governanceBody")}
              align="center"
              className="mx-auto items-center"
            />
          </Reveal>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {board.map((member, index) => (
              <Reveal as="li" key={member.name.en} delay={index * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-white p-7">
                  <span
                    aria-hidden="true"
                    className="grid size-14 place-items-center rounded-full bg-brand-500/12 text-base font-extrabold text-brand-700"
                  >
                    {member.name.en
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <h3 className="mt-5 font-bold text-ink">{pick(member.name, locale)}</h3>
                  <p className="mt-0.5 text-sm font-medium text-brand-600">
                    {pick(member.role, locale)}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-body">
                    {pick(member.bio, locale)}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Milestones */}
      <section className="band-surface border-y border-line py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow={t("milestonesEyebrow")}
              title={t("milestonesTitle")}
              align="center"
              className="mx-auto items-center"
            />
          </Reveal>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone, index) => (
              <Reveal as="li" key={milestone.year} delay={index * 0.05}>
                <div className="h-full rounded-2xl border border-line bg-white p-6">
                  <p className="text-sm font-extrabold tracking-widest text-brand-600">
                    {milestone.year}
                  </p>
                  <h3 className="mt-2 font-bold text-ink">
                    {pick(milestone.title, locale)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">
                    {pick(milestone.text, locale)}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Fund the next milestone */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <Reveal>
            <div className="grid gap-8 rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="grid size-12 place-items-center rounded-xl bg-brand-500 text-white">
                  <Target className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  {t("sponsorCtaTitle")}
                </h2>
                <p className="mt-2.5 max-w-xl text-base text-body">
                  {t("sponsorCtaBody")}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <ButtonLink href="/join#sponsor" size="lg">
                  <Users className="size-4" aria-hidden="true" />
                  {t("sponsorCtaButton")}
                </ButtonLink>
                <ButtonLink href="/impact#tiers" size="lg" variant="secondary">
                  <Download className="size-4" aria-hidden="true" />
                  {t("viewTiers")}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SponsorshipTiers id="tiers" showFooterNote={false} />

      <CtaBand />
    </>
  );
}
