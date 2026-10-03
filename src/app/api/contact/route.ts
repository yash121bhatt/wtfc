import { contactSchema } from "@/lib/validation/schemas";
import { handleSubmission } from "@/lib/server/handle";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleSubmission(request, {
    schema: contactSchema,
    kind: "contact",
  });
}
