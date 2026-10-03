import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Briefcase, CalendarDays, Check, Clock, MapPin } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { assertLocale } from "@/lib/locale";
import { buildMetadata, jobJsonLd } from "@/lib/seo";
import { pick } from "@/lib/site";
import { formatDate } from "@/lib/date";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { getJob, jobs } from "@/data/jobs";
import { CtaBand } from "@/components/home/cta-band";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    jobs.map((job) => ({ locale, slug: job.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = assertLocale(raw);
  const job = getJob(slug);
  if (!job) return {};

  const title = `${pick(job.title, locale)} — ${pick(job.company, locale)}`;
  const description = pick(job.overview, locale);

  return {
    ...buildMetadata(locale, "meta.careers"),
    title,
    description,
    alternates: {
      canonical: `/${locale}/careers/${slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/careers/${slug}`]),
      ),
    },
    openGraph: {
      title,
      description,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: locale === "fr" ? "en_CA" : "fr_CA",
    },
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = assertLocale(raw);
  setRequestLocale(locale);

  const job = getJob(slug);
  if (!job) notFound();

  const t = await getTranslations("careersPage");

  const jsonLd = jobJsonLd(locale, {
    title: pick(job.title, locale),
    company: pick(job.company, locale),
    description: pick(job.overview, locale),
    posted: job.posted,
    location: pick(job.location, locale),
  });

  const sections = [
    { key: "responsibilities", items: job.responsibilities },
    { key: "requirements", items: job.requirements },
    { key: "benefits", items: job.benefits },
  ] as const;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="band-tint border-b border-line py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <Link
              href="/careers"
              className="text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              ← {t("backToBoard")}
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-700">
                <Clock className="size-3" aria-hidden="true" />
                {t(job.employmentType)}
              </span>
              <span className="text-xs text-body">
                {t("postedOn")}{" "}
                <time dateTime={job.posted}>
                  {formatDate(job.posted, locale, "short")}
                </time>
              </span>
            </div>

            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {pick(job.title, locale)}
            </h1>

            <p className="mt-3 text-lg font-medium text-brand-600">
              <span className="inline-flex items-center gap-2">
                <Briefcase className="size-4" aria-hidden="true" />
                {pick(job.company, locale)}
              </span>
            </p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-body">
              <MapPin className="size-4" aria-hidden="true" />
              {pick(job.location, locale)}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {job.applyUrl ? (
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center rounded-full bg-brand-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  {t("applyNow")}
                </a>
              ) : null}
              <ButtonLink href="/contact" variant="secondary">
                {t("applyNote")}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div className="flex flex-col gap-12">
              <Reveal>
                <h2 className="text-2xl font-bold text-ink">
                  {t("companyOverview")}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-body">
                  {pick(job.overview, locale)}
                </p>
              </Reveal>

              {sections.map((section, index) => (
                <Reveal key={section.key} delay={index * 0.06}>
                  <h2 className="text-2xl font-bold text-ink">
                    {t(section.key)}
                  </h2>
                  <ul className="mt-5 flex flex-col gap-3.5">
                    {section.items.map((item) => (
                      <li key={item.en} className="flex gap-3 text-base leading-relaxed text-body">
                        <Check
                          className="mt-1 size-4 shrink-0 text-brand-600"
                          aria-hidden="true"
                        />
                        {pick(item, locale)}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-line bg-surface p-7">
                  <h2 className="text-lg font-bold text-ink">{t("quickFacts")}</h2>
                  <dl className="mt-5 flex flex-col gap-4 text-sm">
                    <div>
                      <dt className="text-body/70">{t("employmentType")}</dt>
                      <dd className="mt-0.5 font-semibold text-ink">
                        {t(job.employmentType)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-body/70">{t("company")}</dt>
                      <dd className="mt-0.5 font-semibold text-ink">
                        {pick(job.company, locale)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-body/70">{t("location")}</dt>
                      <dd className="mt-0.5 font-semibold text-ink">
                        {pick(job.location, locale)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-body/70">{t("postedOn")}</dt>
                      <dd className="mt-0.5 font-semibold text-ink">
                        <time dateTime={job.posted}>
                          {formatDate(job.posted, locale, "long")}
                        </time>
                      </dd>
                    </div>
                  </dl>

                  {job.applyUrl ? (
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                    >
                      <CalendarDays className="size-4" aria-hidden="true" />
                      {t("applyNow")}
                    </a>
                  ) : (
                    <ButtonLink href="/contact" className="mt-6 w-full">
                      {t("applyNote")}
                    </ButtonLink>
                  )}
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
