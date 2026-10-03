"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Briefcase, Clock, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { jobs, countByType, type EmploymentType } from "@/data/jobs";
import { pick } from "@/lib/site";
import { formatDate } from "@/lib/date";
import { Counter } from "@/components/ui/counter";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FILTERS = ["all", "fullTime", "partTime", "contract"] as const;
type Filter = (typeof FILTERS)[number];

export function CareersExplorer({ locale }: { locale: string }) {
  const t = useTranslations("careersPage");
  const [active, setActive] = useState<Filter>("all");

  const labels: Record<Filter, string> = {
    all: t("allJobs"),
    fullTime: t("fullTime"),
    partTime: t("partTime"),
    contract: t("contract"),
  };

  const counts: Record<Filter, number> = {
    all: jobs.length,
    fullTime: countByType(jobs, "fullTime"),
    partTime: countByType(jobs, "partTime"),
    contract: countByType(jobs, "contract"),
  };

  const visible =
    active === "all"
      ? jobs
      : jobs.filter((job) => job.employmentType === (active as EmploymentType));

  return (
    <>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 lg:grid-cols-4">
        {(
          [
            { key: "positions", value: jobs.length, suffix: "" },
            { key: "partners", value: 8, suffix: "+" },
            { key: "womenPlaced", value: 500, suffix: "+" },
            { key: "placementRate", value: 95, suffix: "%" },
          ] as const
        ).map((stat) => (
          <div key={stat.key} className="bg-night p-7 text-center">
            <dd className="text-4xl font-extrabold tracking-tight text-brand-300 sm:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </dd>
            <dt className="mt-2 text-sm text-white/65">{t(stat.key)}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-20">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">
          {t("available")} <span className="text-brand-600">{jobs.length}</span>
        </h2>

        <div
          role="tablist"
          aria-label={t("jobType")}
          className="mt-6 flex flex-wrap gap-2"
        >
          {FILTERS.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active === key}
              onClick={() => setActive(key)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                active === key
                  ? "bg-brand-500 text-white"
                  : "border border-line bg-white text-body hover:border-brand-300 hover:text-brand-700",
              )}
            >
              {labels[key]}
              <span
                className={cn(
                  "ml-2 text-xs",
                  active === key ? "text-white/70" : "text-body/60",
                )}
              >
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        <ul className="mt-8 grid gap-5">
          {visible.map((job) => (
            <li key={job.slug}>
              <Link
                href={`/careers/${job.slug}`}
                className="card-hover group grid gap-5 rounded-2xl border border-line bg-white p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-7"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-700">
                      <Clock className="size-3" aria-hidden="true" />
                      {labels[job.employmentType]}
                    </span>
                    <span className="text-xs text-body/70">
                      {t("postedOn")}{" "}
                      <time dateTime={job.posted}>
                        {formatDate(job.posted, locale, "short")}
                      </time>
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-ink group-hover:text-brand-700 sm:text-xl">
                    {pick(job.title, locale)}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-brand-600">
                    {pick(job.company, locale)}
                  </p>

                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-body">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {pick(job.location, locale)}
                  </p>
                </div>

                <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white">
                  <Briefcase className="size-4" aria-hidden="true" />
                  {t("viewDetails")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 grid gap-6 rounded-3xl border border-brand-200 bg-brand-50/50 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">
            {t("hireTitle")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-body">
            {t("hireBody")}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <ButtonLink href="/contact">{t("postJob")}</ButtonLink>
          <ButtonLink href="/impact" variant="secondary">
            {t("learnPartnerships")}
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
