import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
  actions?: React.ReactNode;
  /** Optional dark band behind the copy for pages that need more contrast. */
  tone?: "dark" | "light";
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "",
  actions,
  tone = "dark",
  className,
}: Props) {
  const dark = tone === "dark";

  return (
    <section className={cn("relative isolate overflow-hidden", className)}>
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        className={cn("absolute inset-0", dark ? "scrim-hero" : "scrim-bottom")}
        aria-hidden="true"
      />

      <div className="container-page relative flex min-h-80 flex-col justify-end py-16 sm:min-h-96 sm:py-20">
        <Reveal>
          <p
            className={cn(
              "mb-4 inline-flex items-center gap-2 self-start rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur-sm",
              dark
                ? "border-white/20 bg-white/10 text-white/90"
                : "border-ink/10 bg-white/70 text-brand-700",
            )}
          >
            <span
              className="size-1.5 rounded-full bg-brand-400"
              aria-hidden="true"
            />
            {eyebrow}
          </p>

          <h1
            className={cn(
              "max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl",
              dark ? "text-white" : "text-ink",
            )}
          >
            {title}
          </h1>

          {subtitle ? (
            <p
              className={cn(
                "mt-4 max-w-2xl text-base sm:text-lg",
                dark ? "text-white/75" : "text-body",
              )}
            >
              {subtitle}
            </p>
          ) : null}

          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}
