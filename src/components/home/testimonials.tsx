"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { pick } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", loop: true });
  const [selected, setSelected] = useState(0);

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

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
    <section className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              className="max-w-2xl"
            />
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>

        <div ref={emblaRef} className="mt-12 overflow-hidden">
          <div className="flex gap-6">
            {testimonials.map((testimonial, index) => (
              <figure
                key={testimonial.name.en}
                className="flex min-w-0 flex-[0_0_100%] flex-col rounded-2xl border border-line bg-surface p-8 sm:flex-[0_0_calc(50%-0.75rem)] lg:flex-[0_0_calc(33.333%-1rem)]"
                aria-hidden={index !== selected && false}
              >
                <Quote
                  className="size-8 text-brand-300"
                  aria-hidden="true"
                />
                <blockquote className="mt-5 flex-1 text-base leading-relaxed text-ink">
                  {pick(testimonial.quote, locale)}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-500 text-sm font-bold text-white"
                  >
                    {testimonial.initials}
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">
                      {pick(testimonial.name, locale)}
                    </span>
                    <span className="block text-sm text-body">
                      {pick(testimonial.role, locale)}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="grid size-11 place-items-center rounded-full border border-line text-ink"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="grid size-11 place-items-center rounded-full border border-line text-ink"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5" aria-hidden="true">
          {testimonials.map((testimonial, index) => (
            <span
              key={testimonial.name.en}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === selected ? "w-7 bg-brand-500" : "w-1.5 bg-line",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
