import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check, Compass, Handshake, Layers, TrendingUp } from "lucide-react";
import { routing } from "@/i18n/routing";
import { assertLocale } from "@/lib/locale";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { pick } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { CtaBand } from "@/components/home/cta-band";
import { milestones, board } from "@/data/org";
import { ABOUT_STAT_KEYS, getStat } from "@/data/stats";

const OBJECTIVE_ICONS = [
  Check,
  TrendingUp,
  Layers,
  Compass,
  Handshake,
  Check,
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
  return buildMetadata(assertLocale(locale), "meta.about");
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");
  const tStats = await getTranslations("stats");

  const objectiveKeys = [
    "empower",
    "employment",
    "training",
    "safety",
    "mentorship",
    "allyship",
  ] as const;

  const jsonLd = breadcrumbJsonLd(locale, [
    { name: t("eyebrow"), path: "/about" },
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
        subtitle={t("subtitle")}
        image="/images/about-hero.jpg"
        imageAlt="WTFC members at an awareness campaign"
        actions={
          <>
            <ButtonLink href="/join">{t("primaryCta")}</ButtonLink>
            <ButtonLink href="#board" variant="onDark">
              {t("secondaryCta")}
            </ButtonLink>
          </>
        }
      />

      {/* Stat strip */}
      <section className="border-b border-line bg-white">
        <div className="container-page">
          <dl className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
            {ABOUT_STAT_KEYS.map((key, index) => {
              const stat = getStat(key);
              return (
                <Reveal key={key} delay={index * 0.06}>
                  <div className="h-full bg-white py-10 text-center">
                    <dd className="text-4xl font-extrabold tracking-tight text-brand-600 sm:text-5xl">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </dd>
                    <dt className="mt-2 text-sm text-body">
                      {tStats(`items.${key}.label`)}
                    </dt>
                  </div>
                </Reveal>
              );
            })}
          </dl>
        </div>
      </section>

      {/* Purpose */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow={t("purposeEyebrow")}
                title={t("purposeTitle")}
              />
              <div className="mt-7 flex flex-col gap-4 text-base leading-relaxed text-body">
                <p>{t("purposeBody")}</p>
                <p>{t("purposeBody2")}</p>
                <p>{t("purposeBody3")}</p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {(
                  ["inclusive", "growth", "leadership"] as const
                ).map((pillar) => (
                  <li
                    key={pillar}
                    className="rounded-2xl border border-brand-200 bg-brand-50/50 p-6"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-brand-500 text-white">
                      <Handshake className="size-5" aria-hidden="true" />
                    </span>
                    <p className="mt-4 font-semibold text-ink">
                      {t(`pillars.${pillar}`)}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mentorship */}
      <section className="band-surface border-y border-line py-20 sm:py-28">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-[0_40px_80px_-50px_rgb(14_16_20/0.7)]">
                <Image
                  src="/images/about-mentorship.jpg"
                  alt={t("mentorshipTitle")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <SectionHeading
                eyebrow={t("mentorshipEyebrow")}
                title={t("mentorshipTitle")}
                description={tStats("footnote")}
              />
              <div className="mt-8 grid grid-cols-2 gap-4">
                {(["mentorship", "youth"] as const).map((key) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-line bg-white p-6"
                  >
                    <p className="text-2xl font-extrabold text-brand-600">
                      {key === "mentorship" ? "640+" : "38"}
                    </p>
                    <p className="mt-1.5 text-sm text-body">
                      {key === "mentorship"
                        ? t("objectives.mentorship.title")
                        : t("purposeEyebrow")}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core objectives */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow={t("objectivesEyebrow")}
              title={t("objectivesTitle")}
              description={t("objectivesSubtitle")}
              align="center"
              className="mx-auto items-center"
            />
          </Reveal>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {objectiveKeys.map((key, index) => {
              const Icon = OBJECTIVE_ICONS[index] ?? Check;
              return (
                <Reveal as="li" key={key} delay={index * 0.06}>
                  <div className="card-hover h-full rounded-2xl border border-line bg-white p-7">
                    <span className="grid size-11 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-ink">
                      {t(`objectives.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">
                      {t(`objectives.${key}.text`)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Board */}
      <section id="board" className="band-surface scroll-mt-24 border-y border-line py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow={t("boardEyebrow")}
              title={t("boardTitle")}
              description={t("boardBody")}
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
                  <h3 className="mt-5 font-bold text-ink">
                    {pick(member.name, locale)}
                  </h3>
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
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow={t("journeyEyebrow")}
              title={t("journeyTitle")}
              description={t("journeySubtitle")}
              align="center"
              className="mx-auto items-center"
            />
          </Reveal>

          <ol className="relative mx-auto mt-16 max-w-3xl">
            <span
              aria-hidden="true"
              className="absolute left-[0.9rem] top-2 bottom-2 w-px bg-line sm:left-1/2"
            />
            {milestones.map((milestone, index) => (
              <Reveal as="li" key={milestone.year} delay={index * 0.05}>
                <div
                  className={`relative flex flex-col gap-2 pb-10 pl-12 sm:pl-0 ${
                    index % 2 === 0
                      ? "sm:items-end sm:pr-12 sm:text-right"
                      : "sm:ml-auto sm:items-start sm:pl-12"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-1.5 size-4 rounded-full border-2 border-brand-500 bg-white ${
                      index % 2 === 0 ? "left-[0.35rem] sm:left-auto sm:-right-2" : "left-[0.35rem]"
                    }`}
                  />
                  <p className="text-sm font-extrabold tracking-widest text-brand-600">
                    {milestone.year}
                  </p>
                  <h3 className="text-lg font-bold text-ink">
                    {pick(milestone.title, locale)}
                  </h3>
                  <p className="text-sm leading-relaxed text-body">
                    {pick(milestone.text, locale)}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
