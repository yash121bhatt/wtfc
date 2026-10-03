import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-body/60 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/12 disabled:cursor-not-allowed disabled:bg-surface";

function wrapperClass(invalid?: boolean) {
  return cn(field, invalid ? "border-red-400" : "border-line");
}

type FieldShellProps = {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  optionalLabel?: string;
  children: React.ReactNode;
  className?: string;
};

export function FieldShell({
  label,
  htmlFor,
  error,
  required,
  optionalLabel,
  children,
  className,
}: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-brand-600">
            *
          </span>
        ) : optionalLabel ? (
          <span className="ml-1 font-normal text-body/70">
            ({optionalLabel})
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="text-xs font-medium text-red-600"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Honeypot + render timestamp, shared by every form. Invisible to humans. */
export function SpamGuards() {
  return (
    <div
      aria-hidden="true"
      className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
    >
      <label htmlFor="website-field">Website</label>
      <input
        id="website-field"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}

export const TextInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(wrapperClass(invalid), className)}
    aria-invalid={invalid || undefined}
    {...props}
  />
));
TextInput.displayName = "TextInput";

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(wrapperClass(invalid), "min-h-10 resize-y", className)}
    aria-invalid={invalid || undefined}
    {...props}
  />
));
TextArea.displayName = "TextArea";

export const Select = forwardRef<
  HTMLSelectElement,
  React.ComponentProps<"select"> & { invalid?: boolean }
>(({ className, invalid, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(wrapperClass(invalid), "appearance-none pr-10", className)}
    aria-invalid={invalid || undefined}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";

/**
 * Wraps a select so the chevron can sit on top without shifting layout. The
 * chevron is decorative — the select already has a label, so no extra text is
 * needed for screen readers.
 */
export function SelectWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-body"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="m5 7.5 5 5 5-5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}