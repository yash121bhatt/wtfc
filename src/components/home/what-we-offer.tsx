import { useTranslations } from "next-intl";
import Image from "next/image";
import { BrainCircuit, GraduationCap, HeartHandshake, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const ITEMS = [
  { key: "mentorship", Icon: HeartHandshake },
  { key: "youth", Icon: GraduationCap },
  { key: "advocacy", Icon: BrainCircuit },
  { key: "standards", Icon: ShieldCheck },
] as const;

export function WhatWeOffer() {
  const t = useTranslations("offer");

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-[0_40px_80px_-50px_rgb(14_16_20/0.7)]">
                <Image
                  src="/images/conference.jpg"
                  alt={t("title")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-line bg-white p-5 shadow-xl sm:block">
                <p className="text-3xl font-extrabold text-brand-600">94%</p>
                <p className="mt-1 max-w-32 text-xs leading-snug text-body">
                  {t("items.mentorship.title")}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("body")}
            />

            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {ITEMS.map(({ key, Icon }) => (
                <li key={key} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-body">
                      {t(`items.${key}.text`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
