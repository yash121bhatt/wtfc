"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { events, isPastOn } from "@/data/events";
import { pick } from "@/lib/site";
import { formatDateRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FILTERS = ["all", "upcoming", "past"] as const;
type Filter = (typeof FILTERS)[number];

export function EventsExplorer({ locale }: { locale: string }) {
  const t = useTranslations("eventsPage");
  const tCard = useTranslations("eventsSection");
  const [active, setActive] = useState<Filter>("all");

  const upcoming = events.filter((event) => !isPastOn(event.startDate));
  const past = events.filter((event) => isPastOn(event.startDate));

  const buckets: Record<Filter, typeof events> = {
    all: [...upcoming, ...past],
    upcoming,
    past,
  };
  const counts: Record<Filter, number> = {
    all: events.length,
    upcoming: upcoming.length,
    past: past.length,
  };

  const labels: Record<Filter, string> = {
    all: t("filterAll"),
    upcoming: t("filterUpcoming"),
    past: t("filterPast"),
  };

  const visible = buckets[active];

  return (
    <>
      <div
        role="tablist"
        aria-label={t("filterAll")}
        className="flex flex-wrap gap-2"
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

      {visible.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-line bg-surface px-6 py-16 text-center text-body">
          {tCard("empty")}
        </p>
      ) : (
        <ul className="mt-10 grid gap-6">
          {visible.map((event) => (
            <li key={event.slug}>
              <Link
                href={`/events/${event.slug}`}
                className="card-hover group grid overflow-hidden rounded-2xl border border-line bg-white sm:grid-cols-[minmax(0,18rem)_1fr]"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-surface sm:aspect-auto sm:h-full">
                  <Image
                    src={event.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 288px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-700">
                      {isPastOn(event.startDate) ? tCard("past") : tCard("upcoming")}
                    </span>
                    <span className="text-xs text-body">
                      <time dateTime={event.startDate}>
                        {formatDateRange(event.startDate, event.endDate, locale)}
                      </time>
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-bold leading-snug text-ink group-hover:text-brand-700 sm:text-2xl">
                    {pick(event.title, locale)}
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-body">
                    {pick(event.excerpt, locale)}
                  </p>

                  <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-body">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin
                        className="size-3.5 text-brand-500"
                        aria-hidden="true"
                      />
                      {pick(event.venue, locale)} — {pick(event.city, locale)},{" "}
                      {pick(event.province, locale)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays
                        className="size-3.5 text-brand-500"
                        aria-hidden="true"
                      />
                      {tCard("details")}
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
