import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { partners } from "@/data/partners";
import { pick } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Partners() {
  const t = useTranslations("partners");
  const locale = useLocale();

  return (
    <section className="band-tint py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            align="center"
            className="mx-auto items-center"
          />
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {partners.map((partner, index) => (
            <Reveal as="li" key={partner.id} delay={index * 0.07}>
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white"
              >
                <div className="relative aspect-16/9 overflow-hidden bg-surface">
                  <Image
                    src={partner.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-ink">
                    {pick(partner.title, locale)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
                    {pick(partner.description, locale)}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                    {t(partner.cta)}
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="mt-12 text-center text-sm text-body">{t("footNote")}</p>
        </Reveal>
      </div>
    </section>
  );
}
