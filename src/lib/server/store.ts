import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

/**
 * Append-only JSON store. Deliberately dependency-free: this is a demo-grade
 * persistence layer, not a database. Swap `readAll`/`append` for a real driver
 * when you outgrow it.
 */

const DATA_DIR = path.join(process.cwd(), ".data");

export type SubmissionKind = "newsletter" | "contact" | "join" | "sponsor";

export type Submission = {
  id: string;
  kind: SubmissionKind;
  createdAt: string;
  data: Record<string, unknown>;
};

function fileFor(kind: SubmissionKind) {
  return path.join(DATA_DIR, `${kind}.json`);
}

async function readAll(kind: SubmissionKind): Promise<Submission[]> {
  try {
    const raw = await fs.readFile(fileFor(kind), "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Submission[]) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function append(
  kind: SubmissionKind,
  data: Record<string, unknown>,
): Promise<Submission> {
  const submission: Submission = {
    id: randomUUID(),
    kind,
    createdAt: new Date().toISOString(),
    data,
  };

  await fs.mkdir(DATA_DIR, { recursive: true });
  // Read-modify-write. A queue would be needed for real concurrency.
  const existing = await readAll(kind);
  await fs.writeFile(
    fileFor(kind),
    JSON.stringify([...existing, submission], null, 2),
    "utf8",
  );

  return submission;
}

export async function findByEmail(
  kind: SubmissionKind,
  email: string,
): Promise<Submission | undefined> {
  const needle = email.trim().toLowerCase();
  const all = await readAll(kind);
  return all.find(
    (entry) =>
      typeof entry.data.email === "string" &&
      entry.data.email.trim().toLowerCase() === needle,
  );
}
