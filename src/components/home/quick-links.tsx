import { useTranslations } from "next-intl";
import { CalendarDays, ClipboardList, Trophy } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";

const ITEMS = [
  { key: "events", href: "/events", Icon: CalendarDays },
  { key: "registration", href: "/events/bridging-the-barriers-2026-ontario", Icon: ClipboardList },
  { key: "awards", href: "/about", Icon: Trophy },
] as const;

export function QuickLinks() {
  const t = useTranslations("quickLinks");

  return (
    // The overlap reads as intentional on desktop, where the hero has spare
    // room. On mobile the hero copy is taller, so the cards sit below it.
    <section className="relative z-10 mt-10 sm:-mt-10">
      <div className="container-page">
        <ul className="grid gap-4 sm:grid-cols-3">
          {ITEMS.map(({ key, href, Icon }, index) => (
            <Reveal as="li" key={key} delay={index * 0.08}>
              <Link
                href={href}
                className="card-hover group flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-6 shadow-[0_18px_40px_-32px_rgb(14_16_20/0.5)]"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold text-ink">{t(`${key}.title`)}</span>
                  <span className="mt-1 block text-sm text-body">{t(`${key}.text`)}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
