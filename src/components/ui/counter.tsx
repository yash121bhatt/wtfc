"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "motion/react";

type Props = {
  value: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

const compact = (n: number) =>
  n >= 10_000 ? new Intl.NumberFormat("en-CA").format(n) : n.toString();

/**
 * Counts up to `value` the first time it scrolls into view.
 * Falls back to the final number when the user prefers reduced motion.
 */
export function Counter({
  value,
  suffix = "",
  durationMs = 1800,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration: durationMs / 1000,
    bounce: 0,
  });

  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    motionValue.set(value);
    const unsubscribe = spring.on("change", (latest) =>
      setDisplay(Math.round(latest)),
    );
    return () => unsubscribe();
  }, [inView, motionValue, spring, value, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {compact(display)}
      {suffix}
    </span>
  );
}
