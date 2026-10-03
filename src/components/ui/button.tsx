import { forwardRef } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const VARIANTS = {
  primary:
    "bg-brand-500 text-white shadow-[0_10px_30px_-12px_rgb(198_47_160/0.7)] hover:bg-brand-700",
  secondary:
    "bg-white text-brand-700 border border-brand-200 hover:border-brand-400 hover:bg-brand-50",
  ghost: "text-ink hover:bg-brand-50 hover:text-brand-700",
  onDark:
    "bg-white/10 text-white border border-white/25 backdrop-blur-sm hover:bg-white/20",
  onDarkSolid: "bg-white text-ink hover:bg-brand-50",
} as const;

const SIZES = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
} as const;

type Variant = keyof typeof VARIANTS;
type Size = keyof typeof SIZES;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

function classes(variant: Variant, size: Size, className?: string) {
  return cn(base, VARIANTS[variant], SIZES[size], className);
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={classes(variant, size, className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
};

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonLinkProps) {
  return <Link className={classes(variant, size, className)} {...props} />;
}
