import { useTranslations } from "next-intl";
import Image from "next/image";
import { Award, GraduationCap, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const ITEMS = [
  { key: "elevate", Icon: GraduationCap },
  { key: "safety", Icon: Award },
  { key: "community", Icon: Users },
] as const;

export function Mission() {
  const t = useTranslations("mission");

  return (
    <section className="band-surface border-y border-line py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-body">{t("body")}</p>
            <p className="mt-6 font-semibold text-ink">{t("missionLabel")}</p>

            <ul className="mt-5 flex flex-col gap-4">
              {ITEMS.map(({ key, Icon }) => (
                <li key={key} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-500/10 text-brand-600">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <p className="text-sm leading-relaxed text-body sm:text-base">
                    {t(`items.${key}`)}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-base leading-relaxed text-body">
              {t("closing")}
            </p>

            <ButtonLink href="/about" variant="secondary" className="mt-8">
              {t("cta")}
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.12} className="lg:pt-4">
            <ul className="grid grid-cols-2 gap-4">
              {[
                { src: "/images/team.jpg", alt: "WTFC team members" },
                { src: "/images/truck.jpg", alt: "WTFC branded truck" },
                { src: "/images/group.jpg", alt: "WTFC community event" },
                { src: "/images/about-hero.jpg", alt: "WTFC awareness campaign" },
              ].map((image) => (
                <li key={image.src} className="overflow-hidden rounded-2xl">
                  <div className="relative aspect-4/5">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
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
