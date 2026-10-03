import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { events, sortByDate } from "@/data/events";
import { pick } from "@/lib/site";
import { formatEventDate, isPast } from "@/lib/date";

export function EventsPreview() {
  const t = useTranslations("eventsSection");
  const locale = useLocale();

  // Newest three, so a just-finished event still shows up on the home page.
  const featured = sortByDate(events, "desc").slice(0, 3);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
            <ButtonLink href="/events" variant="secondary" size="sm">
              {t("viewAll")}
            </ButtonLink>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {featured.map((event, index) => {
            const past = isPast(event.startDate);

            return (
              <Reveal as="li" key={event.slug} delay={index * 0.08}>
                <Link
                  href={`/events/${event.slug}`}
                  className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-surface">
                    <Image
                      src={event.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-lg bg-night/85 px-3 py-1.5 text-center backdrop-blur-sm">
                      <span className="block text-[0.65rem] font-semibold uppercase tracking-wider text-brand-300">
                        {formatEventDate(event.startDate, locale, "month")}
                      </span>
                      <span className="block text-lg font-extrabold leading-none text-white">
                        {formatEventDate(event.startDate, locale, "day")}
                      </span>
                    </span>
                    {past ? (
                      <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-body">
                        {t("past")}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold leading-snug text-ink">
                      {pick(event.title, locale)}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
                      {pick(event.excerpt, locale)}
                    </p>
                    <p className="mt-5 flex items-start gap-2 text-xs text-body">
                      <MapPin className="mt-0.5 size-3.5 shrink-0 text-brand-500" aria-hidden="true" />
                      {pick(event.venue, locale)} — {pick(event.city, locale)},{" "}
                      {pick(event.province, locale)}
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-xs text-body">
                      <CalendarDays className="size-3.5 shrink-0 text-brand-500" aria-hidden="true" />
                      {formatEventDate(event.startDate, locale, "long")}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
