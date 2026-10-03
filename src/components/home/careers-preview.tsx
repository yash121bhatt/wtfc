import { useLocale, useTranslations } from "next-intl";
import { Briefcase, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { jobs } from "@/data/jobs";
import { pick } from "@/lib/site";
import { formatDate } from "@/lib/date";

export function CareersPreview() {
  const t = useTranslations("careersSection");
  const tCareers = useTranslations("careersPage");
  const locale = useLocale();

  return (
    <section className="band-surface border-y border-line py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
            <ButtonLink href="/careers" variant="secondary" size="sm">
              {t("viewAll")}
            </ButtonLink>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {jobs.slice(0, 3).map((job, index) => (
            <Reveal as="li" key={job.slug} delay={index * 0.08}>
              <Link
                href={`/careers/${job.slug}`}
                className="card-hover group flex h-full flex-col rounded-2xl border border-line bg-white p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold leading-snug text-ink group-hover:text-brand-700">
                    {pick(job.title, locale)}
                  </h3>
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                    <Briefcase className="size-4.5" aria-hidden="true" />
                  </span>
                </div>

                <p className="mt-1.5 text-sm font-medium text-brand-600">
                  {pick(job.company, locale)}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-body">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {pick(job.location, locale)}
                  </span>
                  <span className="rounded-full bg-surface px-2.5 py-0.5 font-medium capitalize">
                    {tCareers(job.employmentType)}
                  </span>
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-body">
                  {pick(job.overview, locale)}
                </p>

                <p className="mt-5 text-xs text-body/70">
                  {t("posted")}{" "}
                  <time dateTime={job.posted}>{formatDate(job.posted, locale, "short")}</time>
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
