import { NextResponse } from "next/server";
import type { ZodType } from "zod";
import { MIN_FILL_MS, fieldErrors } from "@/lib/validation/schemas";
import { append, findByEmail, type SubmissionKind } from "@/lib/server/store";
import { clientIp, rateLimit } from "@/lib/server/rate-limit";

type Options<S extends ZodType> = {
  schema: S;
  kind: SubmissionKind;
  /** Emails must be unique for this kind (newsletter signups, contact dedupe). */
  uniqueByEmail?: boolean;
  successStatus?: number;
};

/**
 * Shared pipeline for every form endpoint: rate limit → parse → bot checks →
 * validation → dedupe → persist. Keeps the route files down to a config object.
 */
export async function handleSubmission<S extends ZodType>(
  request: Request,
  { schema, kind, uniqueByEmail = false, successStatus = 201 }: Options<S>,
): Promise<NextResponse> {
  const limit = rateLimit(`${kind}:${clientIp(request)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: "rateLimited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "invalidBody" },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, fields: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  const data = parsed.data as Record<string, unknown> & { email: string };

  // Honeypot: a real user never sees or fills this field. Answer as if it
  // worked so the bot learns nothing.
  if (typeof data.website === "string" && data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: successStatus });
  }

  // Time trap: scripts submit faster than a human can read the form.
  if (typeof data.renderedAt === "number" && Date.now() - data.renderedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true }, { status: successStatus });
  }

  if (uniqueByEmail) {
    const existing = await findByEmail(kind, String(data.email));
    if (existing) {
      return NextResponse.json({ ok: true, duplicate: true });
    }
  }

  // Strip the bot-tripwire fields before anything touches disk.
  const { website, renderedAt, ...clean } = data;
  void website;
  void renderedAt;
  await append(kind, clean);

  return NextResponse.json({ ok: true }, { status: successStatus });
}
