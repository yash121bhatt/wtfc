"use client";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one full loop. */
  duration?: number;
};

/**
 * Infinite logo strip. The track is duplicated once and translated -50%, so the
 * seam is invisible. Pauses on hover and disables entirely under reduced motion.
 */
export function Marquee({ children, className, duration = 42 }: Props) {
  return (
    <div
      className={`marquee-wrap relative overflow-hidden ${
        className ?? ""
      }`}
      style={
        { "--marquee-duration": `${duration}s` } as React.CSSProperties
      }
    >
      <div
        aria-hidden="false"
        className="flex w-max animate-marquee items-center"
      >
        <ul className="flex items-center">{children}</ul>
        <ul className="flex items-center" aria-hidden="true">
          {children}
        </ul>
      </div>
    </div>
  );
}
