import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { STATS } from "@/data/stats";

export function ImpactStats() {
  const t = useTranslations("stats");

  return (
    <section className="bg-night py-20 text-white sm:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            align="center"
            tone="dark"
            className="mx-auto items-center"
          />
        </Reveal>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map((stat, index) => (
            <Reveal key={stat.key} delay={index * 0.06}>
              <div className="h-full bg-night p-8 transition-colors hover:bg-white/5">
                <dd className="text-4xl font-extrabold tracking-tight text-brand-300 sm:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-3 text-sm text-white/65">
                  {t(`items.${stat.key}.label`)}
                </dt>
              </div>
            </Reveal>
          ))}
        </dl>

        <p className="mt-8 text-center text-xs text-white/45">{t("footnote")}</p>
      </div>
    </section>
  );
}
