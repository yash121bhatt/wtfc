/**
 * Impact counters. `value` and `suffix` are numeric/universal and live here
 * rather than in the message catalogues so the components never need `t.raw()`.
 * `labelKey` points at the translated label in `messages/<locale>.json`.
 */

export type StatKey =
  | "years"
  | "followers"
  | "corporate"
  | "events"
  | "placed"
  | "placementRate";

export type Stat = {
  key: StatKey;
  value: number;
  suffix: string;
};

export const STATS: Stat[] = [
  { key: "years", value: 10, suffix: "+" },
  { key: "followers", value: 30_000, suffix: "+" },
  { key: "corporate", value: 8, suffix: "+" },
  { key: "events", value: 20, suffix: "+" },
  { key: "placed", value: 500, suffix: "+" },
  { key: "placementRate", value: 95, suffix: "%" },
];

/** The four shown in the About page strip. */
export const ABOUT_STAT_KEYS: StatKey[] = [
  "years",
  "followers",
  "corporate",
  "events",
];

export function getStat(key: StatKey): Stat {
  return STATS.find((stat) => stat.key === key) ?? STATS[0]!;
}
