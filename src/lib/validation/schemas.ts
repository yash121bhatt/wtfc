import { z } from "zod";

/** Every form carries these two fields; they are the bot tripwires. */
const antiSpam = {
  /**
   * Honeypot. Left unconstrained on purpose: the handler answers non-empty
   * values as a silent success so the bot learns nothing, rather than
   * rejecting the submission and teaching it to drop the field.
   */
  website: z.string().max(200).optional(),
  /** Bot scripts fill the form instantly, humans take a moment. */
  renderedAt: z.coerce.number().int().nonnegative().optional(),
};

export const MIN_FILL_MS = 1200;

const name = z
  .string()
  .trim()
  .min(1, "required")
  .max(60, "tooLong");

const email = z
  .string()
  .trim()
  .min(1, "required")
  .max(254, "tooLong")
  .pipe(z.email("email"));

const phone = z
  .string()
  .trim()
  .max(30, "tooLong")
  .refine(
    (value) => value === "" || /^[+]?[\d\s().-]{7,}$/.test(value),
    "phone",
  );

export const newsletterSchema = z.object({
  firstName: z.string().trim().max(60).optional().or(z.literal("")),
  email,
  locale: z.enum(["en", "fr"]).default("en"),
  ...antiSpam,
});

export const contactSchema = z.object({
  firstName: name,
  lastName: name,
  email,
  phone: phone.optional().or(z.literal("")),
  subject: z.string().trim().min(1, "required").max(120, "tooLong"),
  message: z.string().trim().min(10, "minLength").max(4000, "tooLong"),
  locale: z.enum(["en", "fr"]).default("en"),
  ...antiSpam,
});

export const joinSchema = z.object({
  firstName: name,
  lastName: name,
  email,
  phone: phone.optional().or(z.literal("")),
  company: z.string().trim().max(120, "tooLong").optional().or(z.literal("")),
  role: z.string().trim().max(120, "tooLong").optional().or(z.literal("")),
  province: z.string().trim().max(80, "tooLong").optional().or(z.literal("")),
  membershipType: z.enum(["individual", "corporate"]),
  message: z.string().trim().max(2000, "tooLong").optional().or(z.literal("")),
  locale: z.enum(["en", "fr"]).default("en"),
  ...antiSpam,
});

export const sponsorSchema = z.object({
  firstName: name,
  lastName: name,
  email,
  phone: phone.optional().or(z.literal("")),
  company: z.string().trim().min(1, "required").max(120, "tooLong"),
  role: z.string().trim().max(120, "tooLong").optional().or(z.literal("")),
  tier: z.enum(["community", "partner", "premier", "founding", "custom"]),
  message: z.string().trim().max(2000, "tooLong").optional().or(z.literal("")),
  locale: z.enum(["en", "fr"]).default("en"),
  ...antiSpam,
});

/**
 * Each schema gets an explicit input/output pair. `z.coerce` and `.default()`
 * make the two differ, and react-hook-form's resolver is generic over both.
 */
type Pair<S extends z.ZodType> = {
  Input: z.input<S>;
  Values: z.output<S>;
};

export type NewsletterForm = Pair<typeof newsletterSchema>;
export type ContactForm = Pair<typeof contactSchema>;
export type JoinForm = Pair<typeof joinSchema>;
export type SponsorForm = Pair<typeof sponsorSchema>;

/** Codes the UI knows how to render; anything else becomes a neutral "invalid". */
const PUBLIC_CODES = [
  "required",
  "tooLong",
  "email",
  "phone",
  "minLength",
  "invalid",
] as const;

export type PublicCode = (typeof PUBLIC_CODES)[number];

/**
 * Zod speaks prose; the UI only renders a fixed, translatable set of codes.
 * Every custom message in this file is already a code, so this is a guard
 * against Zod's defaults leaking through on a future schema change.
 */
export function toPublicCode(message?: string): PublicCode | undefined {
  if (!message) return undefined;
  return (PUBLIC_CODES as readonly string[]).includes(message)
    ? (message as PublicCode)
    : "invalid";
}

/** Flattens a ZodError into `{ "email": "email", ... }` for inline field errors. */
export function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key !== "string" || out[key]) continue;
    out[key] = toPublicCode(issue.message) ?? "invalid";
  }
  return out;
}
