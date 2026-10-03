"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SocialIcon, type SocialName } from "@/components/ui/social-icon";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Banner images produced by `pnpm prepare:hero`.
 *
 * Every image on wtfc.ca is a designed social graphic with a text banner baked
 * into the top edge — overlaying an HTML headline on those gives text-on-text.
 * The prepare step crops each banner away once, offline, so what ships is a
 * plain photograph at every aspect ratio. See scripts/prepare-hero-images.ts.
 */
const SLIDES = [
  { src: "/images/hero-a-truck.jpg", alt: "The WTFC branded tractor unit" },
  { src: "/images/hero-f-vests.jpg", alt: "WTFC members in high-visibility vests" },
  { src: "/images/hero-c-yard.jpg", alt: "Drivers and technicians at the yard" },
  { src: "/images/hero-b-members.jpg", alt: "WTFC members beside the trucks" },
  { src: "/images/hero-d-gathering.jpg", alt: "WTFC members at a gathering" },
  { src: "/images/hero-e-career-fair.jpg", alt: "WTFC members at a career fair" },
];

const SOCIAL = SITE.social.map((social) => ({
  href: social.href,
  label: social.label,
  icon: social.icon as SocialName,
}));

export function Hero() {
  const t = useTranslations("hero");
  const tCta = useTranslations("cta");

  const [emblaRef, embla] = useEmblaCarousel({ loop: true, duration: 28 });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);
  const scrollTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla]);

  return (
    <section className="relative isolate overflow-hidden bg-night">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {SLIDES.map((slide, index) => (
            <div
              key={`${slide.src}-${index}`}
              className="relative min-w-0 flex-[0_0_100%]"
              aria-hidden={index !== selected}
            >
              <div className="relative min-h-[42rem] w-full overflow-hidden sm:min-h-[42rem] lg:min-h-[46rem]">
                <Image
                  src={slide.src}
                  alt={index === selected ? slide.alt : ""}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="scrim-hero absolute inset-0" aria-hidden="true" />
      <div className="scrim-bottom absolute inset-0" aria-hidden="true" />

      <div className="absolute inset-x-0 top-0 h-full">
        <div className="container-page flex h-full flex-col justify-center pb-28 pt-28 sm:pb-20">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-brand-400" aria-hidden="true" />
              {t("eyebrow")}
            </p>

            <h1 className="text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>

            <p className="mt-5 text-lg font-medium text-brand-100 sm:text-xl">
              {t("subtitle")}
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              {t("body")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/join" size="lg" variant="primary">
                {tCta("primary")}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="onDark">
                <MapPin className="size-4" aria-hidden="true" />
                {tCta("secondary")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      {/* Social rail. Inset with rounded corners so it reads as a floating
          control rather than a shape clipped against the viewport edge. */}
      <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 rounded-2xl border border-white/15 bg-night/40 py-5 backdrop-blur-md xl:block">
        <ul className="flex flex-col gap-5 px-3.5">
          {SOCIAL.map(({ href, icon, label }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full text-white/70 transition-colors hover:bg-brand-500 hover:text-white"
              >
                <SocialIcon name={icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Slide dots. On `sm+` the quick-link cards overlap the hero by 40px,
          so the dots sit above that band to stay clickable. */}
      <div className="container-page absolute inset-x-0 bottom-8 sm:bottom-16">
        <div className="flex items-center gap-2.5">
          {SLIDES.map((slide, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={t("slideOf", { current: index + 1, total: SLIDES.length })}
              aria-current={index === selected ? "true" : undefined}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === selected ? "w-9 bg-brand-400" : "w-1.5 bg-white/40 hover:bg-white/70",
              )}
            />
          ))}
        </div>
      </div>

      {/* Keeps prev/next wired for keyboard users without visible arrows. */}
      <div className="sr-only">
        <button type="button" onClick={scrollPrev}>
          Previous slide
        </button>
        <button type="button" onClick={scrollNext}>
          Next slide
        </button>
      </div>
    </section>
  );
}
