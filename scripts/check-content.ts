/**
 * Content consistency checks. These guard the two things most likely to rot
 * silently:
 *
 *   1. a message key present in one locale but missing from the other, and
 *   2. a `t()` call pointing at a key that resolves to an object or is absent
 *      from the catalogue (next-intl reports both only at render time, as an
 *      `INSUFFICIENT_PATH` / `MISSING_MESSAGE` log line).
 *
 * Template-literal keys (`` t(`items.${key}`) ``) can't be resolved statically
 * and are skipped; the catalogues are still expected to be exercised by the
 * `pnpm build` prerender, which surfaces anything left over.
 */
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import en from "../src/messages/en.json" with { type: "json" };
import fr from "../src/messages/fr.json" with { type: "json" };

type Leaf = string | number | boolean | null;
type Tree = { [key: string]: Leaf | Leaf[] | Tree };

const here = path.dirname(fileURLToPath(import.meta.url));
const srcRoot = path.join(here, "../src");

/* ------------------------------------------------------------------ */
/* catalogue traversal                                                 */
/* ------------------------------------------------------------------ */

function leafKeys(node: unknown, prefix = ""): string[] {
  if (node === null || typeof node !== "object" || Array.isArray(node)) {
    return [prefix];
  }
  return Object.entries(node as Tree).flatMap(([key, value]) =>
    leafKeys(value, prefix ? `${prefix}.${key}` : key),
  );
}

function resolve(root: unknown, dotted: string): unknown {
  let node: unknown = root;
  for (const segment of dotted.split(".")) {
    if (node === null || typeof node !== "object") return undefined;
    node = (node as Record<string, unknown>)[segment];
  }
  return node;
}

function section(root: unknown, ...keys: string[]): Record<string, unknown> {
  let node = root as Record<string, unknown>;
  for (const key of keys) node = node[key] as Record<string, unknown>;
  return node;
}

/* ------------------------------------------------------------------ */
/* source scan                                                         */
/* ------------------------------------------------------------------ */

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...sourceFiles(full));
    else if (/\.tsx?$/.test(full)) out.push(full);
  }
  return out;
}

/**
 * Maps every local translator alias to its namespace, e.g.
 *   const t = useTranslations("nav");    const tNav = useTranslations("nav");
 * A single file can bind several namespaces (eventsPage + eventsSection), so
 * each alias has to be validated against its own.
 */
function translatorAliases(source: string): Map<string, string> {
  const aliases = new Map<string, string>();
  const binding =
    /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:await\s+)?(useTranslations|getTranslations)\(\s*["'`]([^"'`]+)["'`]/g;
  let match: RegExpExecArray | null;
  while ((match = binding.exec(source)) !== null) {
    const [, alias, , namespace] = match;
    if (alias && namespace) aliases.set(alias, namespace);
  }
  return aliases;
}

function checkTranslationCalls() {
  const problems: string[] = [];

  for (const file of sourceFiles(srcRoot)) {
    const source = readFileSync(file, "utf8");
    const translators = translatorAliases(source);
    if (translators.size === 0) continue;

    // Only single-argument string literals; template literals are skipped.
    const call = /\b([A-Za-z_$][\w$]*)(?:\.raw)?\(\s*["']([^"']+)["']/g;
    let match: RegExpExecArray | null;

    while ((match = call.exec(source)) !== null) {
      const [, alias, key] = match;
      const namespace = alias ? translators.get(alias) : undefined;
      if (!namespace || !key) continue;

      const full = `${namespace}.${key}`;
      const value = resolve(en, full);

      if (value === undefined) {
        problems.push(
          `${file}: ${alias}("${key}") is missing from messages/en.json`,
        );
      } else if (typeof value === "object") {
        problems.push(
          `${file}: ${alias}("${key}") resolves to ${
            Array.isArray(value) ? "an array" : "an object"
          } — translate a leaf instead`,
        );
      }
    }
  }

  if (problems.length > 0) {
    console.error("\n✗ Invalid translation calls:");
    for (const problem of problems) console.error(`  ${problem}`);
    process.exitCode = 1;
    return;
  }
  console.log("✓ every literal translator call resolves to a message leaf");
}

function bail(): never {
  console.error("\n✗ content check failed");
  process.exit(1);
}

/* ------------------------------------------------------------------ */

function run() {
  const enKeys = leafKeys(en).sort();
  const frKeys = leafKeys(fr).sort();

  const missingInFr = enKeys.filter((key) => !frKeys.includes(key));
  const missingInEn = frKeys.filter((key) => !enKeys.includes(key));

  if (missingInFr.length > 0) {
    console.error(`✗ Missing French messages: ${missingInFr.join(", ")}`);
    bail();
  }
  if (missingInEn.length > 0) {
    console.error(`✗ Missing English messages: ${missingInEn.join(", ")}`);
    bail();
  }
  console.log(`✓ message parity — ${enKeys.length} keys in both locales`);

  checkTranslationCalls();

  // Percentages rendered by the impact donut live in both the catalogue and the
  // component; this catches drift.
  const impactSource = readFileSync(
    path.join(srcRoot, "app/[locale]/impact/page.tsx"),
    "utf8",
  );
  const donutBlock = impactSource.match(/const keyPct[^=]*=\s*\{([\s\S]*?)\};/)?.[1];
  assert.ok(donutBlock, "keyPct map not found in impact page");

  for (const key of ["mentorship", "events", "youth", "safety", "admin"]) {
    const componentPct: number = Number(
      donutBlock.match(new RegExp(`${key}:\\s*(\\d+)`))?.[1],
    );
    const { pct } = section(en, "impactPage", "allocation")[key] as { pct: number };
    assert.equal(
      componentPct,
      pct,
      `Allocation mismatch for "${key}": component=${componentPct} messages=${pct}`,
    );
  }

  const total = Object.values(
    section(en, "impactPage", "allocation") as Record<string, { pct: number }>,
  ).reduce((sum, slice) => sum + slice.pct, 0);
  assert.equal(total, 100, `Allocation must total 100%, got ${total}%`);
  console.log("✓ allocation percentages match the catalogue and total 100%");
}

run();
