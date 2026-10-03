# WTFC — Women's Trucking Federation of Canada

A rebuild of [wtfc.ca](https://wtfc.ca/) in Next.js: same brand, same content and
imagery, rebuilt as a bilingual (EN/FR), investor-facing site.

```bash
pnpm install
pnpm dev          # http://localhost:3000 → redirects to /en
```

## Commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` / `pnpm start` | Production build and serve |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint (`next/core-web-vitals` + `next/typescript`) |
| `pnpm check:content` | Translation + content consistency checks |
| `pnpm verify` | All four, in order — use before shipping |
| `pnpm fetch:assets` | Re-download the 24 source images from wtfc.ca into `public/images` |
| `pnpm prepare:hero` | Re-crop the 6 banner images (run after `fetch:assets`) |

## Stack

| Package | Version | Notes |
| --- | --- | --- |
| `next` | 15.5.26 | App Router, RSC, static generation |
| `react` | 19.3.0 | |
| `next-intl` | 4.14.8 | `[locale]` routing, `en` + `fr` |
| `tailwindcss` | 4.3.3 | v4 CSS-first config, tokens in `globals.css` |
| `motion` | 13.4.6 | Scroll reveals, count-up counters |
| `embla-carousel-react` | 8.6.0 | Hero slider, testimonials |
| `lucide-react` | 1.49.0 | Icons (brand glyphs are local — see below) |
| `zod` | 4.6.5 | Server-side validation |
| `react-hook-form` + `@hookform/resolvers` | 7.89 / 5.9 | Forms |
| `clsx` + `tailwind-merge` | 2.1 / 3.7 | `cn()` |

Deliberately **not** used: TypeScript 7 (native port, too new), `lucide`'s brand
icons (removed in 1.x — the four social marks live in
`src/components/ui/social-icon.tsx`), and a charting library (the impact donut is
one `conic-gradient`).

## Routes

All locale-prefixed. `/` 307-redirects to `/en`.

```
/[locale]                        Home
/[locale]/about
/[locale]/events                 + /[locale]/events/[slug]
/[locale]/careers                + /[locale]/careers/[slug]
/[locale]/contact
/[locale]/join
/[locale]/impact                 Annual impact & transparency report
```

Plus `app/sitemap.ts`, `app/robots.ts`, `app/icon.png`, and two `not-found`
boundaries (root + locale-aware).

### A note on the layout tree

There is deliberately **no `app/layout.tsx`**. Because `localePrefix: "always"`
puts the locale segment at the top of the tree, `app/[locale]/layout.tsx` owns
`<html>`, the Poppins variable and the `NextIntlClientProvider`. A pass-through
root layout breaks the 404 boundaries, and a `<html>`-providing root layout would
nest two `<html>` elements.

## Content

Two kinds, deliberately separated:

- **UI chrome** → `src/messages/{en,fr}.json`, consumed via `useTranslations` /
  `getTranslations`. Keep both catalogues at exact key parity.
- **Records** (events, jobs, testimonials, sponsors, board, milestones) →
  `src/data/*.ts`, with `{ en, fr }` pairs and a `pick(value, locale)` helper.
  Use this for anything that needs structured access or arrays of strings —
  `t()` on an array or object message does not work in next-intl and fails
  silently at build time as `INVALID_MESSAGE` / `INSUFFICIENT_PATH`.

Numbers that are locale-invariant (stat values, allocation percentages) live in
`src/data/stats.ts` and in the `keyPct` map on the impact page — not in the
message catalogues — so components never need `t.raw()`.

### `pnpm check:content`

Three assertions, all of which have caught real bugs during the build:

1. `en.json` and `fr.json` have identical key sets.
2. Every literal `translator("key")` call in `src/` resolves to a **string leaf**
   in `messages/en.json`. (This is what caught `t("footer")` and `t("primary")`,
   which pointed at `{ label: … }` objects and produced one `INSUFFICIENT_PATH`
   per page.)
3. The impact donut's hard-coded percentages match the catalogue and total 100%.

Template-literal keys (`` t(`items.${key}.title`) ``) can't be resolved
statically and are skipped — the build prerender is what catches those.

## API

Four Route Handlers, all sharing one pipeline
(`src/lib/server/handle.ts`): rate limit → parse → bot checks → validate →
dedupe → persist.

| Endpoint | Body | Notes |
| --- | --- | --- |
| `POST /api/newsletter` | `email`, optional `firstName` | Deduplicated by email |
| `POST /api/contact` | `firstName`, `lastName`, `email`, `subject`, `message`, optional `phone` | |
| `POST /api/join` | `membershipType`, contact fields, optional `company`/`role`/`province` | |
| `POST /api/sponsor` | `tier`, `company`, contact fields | |

Shared behaviour:

- **Honeypot** — a visually hidden `website` field. Non-empty values get a
  *fake success* so the bot learns nothing, rather than a rejection.
- **Time trap** — `renderedAt` must be at least 1.2 s in the past, so scripts
  that fill instantly are silently absorbed.
- **Rate limit** — 5 requests/minute/IP per endpoint, in-memory fixed window
  (`429` + `Retry-After`). Resets on deploy; swap for Redis if you scale out.
- **Error shape** — `{ ok: false, fields: { email: "email" } }`. Zod's prose is
  never forwarded; `toPublicCode()` maps messages onto a fixed set the UI
  translates (`src/lib/validation/schemas.ts`).

Submissions are appended to `.data/{kind}.json` via `src/lib/server/store.ts` —
a dependency-free stand-in, **not** a database. Replace `readAll`/`append` with a
real driver before production; the directory is gitignored.

## Images

All 24 assets are mirrored from wtfc.ca into `public/images/` with clean
filenames (`pnpm fetch:assets` re-fetches them). Nothing is hotlinked. Served
through `next/image` as AVIF/WebP.

### The hero banner

Every image on wtfc.ca is a **designed social graphic with a text banner baked
into the top edge** — `DRIVERS HELPING DRIVERS`, `EVERY ROLE. EVERY VOICE.`,
`WE ARE ALL PIECES OF THE PUZZLE`, and so on. Putting an HTML headline on top of
those produces text-on-text, which is what the first version of the hero did.

`pnpm prepare:hero` fixes this once, offline: `scripts/prepare-hero-images.ts`
uses sharp to trim each banner and writes `hero-a-…` … `hero-f-…`. Only the two
photographs that were already clean pass through untouched. The result is a
plain photograph at every aspect ratio, so nothing reappears on mobile — CSS
`object-position` cannot fix this, because a landscape source in a portrait
container is never vertically cropped.

Re-run it whenever the source images change. Mapping is recorded in
`public/images/HERO-SOURCES.txt`.

## Design system

Tokens sampled from the live wtfc.ca stylesheet, in `src/app/globals.css`:

| Token | Value |
| --- | --- |
| Brand | `#c62fa0` (hover `#a02d8c`) |
| Ink / body / muted | `#1a1d23` / `#555c6d` / `#374151` |
| Surface | `#fafafa` |
| Type | Poppins, 400–800, via `next/font` |

Alternating page bands use `.band-tint` (magenta radial wash) and `.band-surface`.
Photography always sits under `.scrim-hero` so white text stays legible.

Accessibility: skip link, labelled fields with `role="alert"` errors, visible
focus rings, semantic headings, `aria-live` form status, `aria-current` on
pagination and the language switcher. Every animation is disabled under
`prefers-reduced-motion`.

## Known gaps

- The logo is raster (`logo.png`, 1116×1145). Swap in an SVG for crisp scaling.
- Two event images are large portrait PNGs (~1–2 MB); first-request
  optimization is slow on a cold cache. Converting them to JPEG would help.
- `sharp` is a **devDependency** because `prepare:hero` only runs at
  authoring time. If you move image preparation into a deploy step, promote it
  to a regular dependency.
- The `Member Login` / `Admin Login` header links point at `/join` — there is no
  auth backend yet.
- `corporateMembers` in `src/data/partners.ts` is plausible-but-fictional. Replace
  with real logos before going live.