/**
 * Produces banner-ready hero images.
 *
 * Every image on wtfc.ca is a designed social graphic with a text banner and a
 * watermark logo baked into the top edge. Overlaying an HTML headline on top of
 * those gives text-on-text, which reads as a mistake.
 *
 * These images crop the top banner away once, offline, and save the result as a
 * new file. Doing it here rather than with CSS insets means the crop is exact
 * and permanent — no percentage guessing that breaks at other aspect ratios.
 *
 * Run: pnpm prepare:hero
 */
import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(here, "../public/images");

/** Fraction of the height trimmed off the top. */
type Slide = { src: string; out: string; trimTop: number; quality?: number };

const SLIDES: Slide[] = [
  // Already clean photographs — copied through untouched.
  { src: "truck.jpg", out: "hero-a-truck.jpg", trimTop: 0 },
  { src: "hero-1.jpg", out: "hero-b-members.jpg", trimTop: 0 },

  // Banners sit in the top ~16%; trim a little past them.
  { src: "events-3.jpg", out: "hero-c-yard.jpg", trimTop: 0.2 },
  { src: "hero-3.jpg", out: "hero-d-gathering.jpg", trimTop: 0.22 },
  { src: "events-1.jpg", out: "hero-e-career-fair.jpg", trimTop: 0.32 },
  { src: "events-2.jpg", out: "hero-f-vests.jpg", trimTop: 0.3 },
];

async function run() {
  await mkdir(imagesDir, { recursive: true });

  for (const slide of SLIDES) {
    const input = path.join(imagesDir, slide.src);
    const output = path.join(imagesDir, slide.out);

    const source = sharp(input);
    const meta = await source.metadata();
    const width = meta.width ?? 0;
    const height = meta.height ?? 0;

    if (!width || !height) throw new Error(`${slide.src}: unreadable dimensions`);

    const top = Math.round(height * slide.trimTop);

    let pipeline = sharp(input);
    if (top > 0) pipeline = pipeline.extract({ left: 0, top, width, height: height - top });

    // Re-encoding to JPEG keeps the bundle small; these are photographic
    // backgrounds that already sit behind a dark scrim.
    await pipeline
      .jpeg({ quality: slide.quality ?? 82, progressive: true, mozjpeg: true })
      .toFile(output);

    const outMeta = await sharp(output).metadata();
    const { size } = await import("node:fs/promises").then((fs) =>
      fs.stat(output),
    );

    console.log(
      `  ${slide.src.padEnd(16)} ${String(width).padStart(4)}x${String(height).padEnd(4)}` +
        ` (trim ${(slide.trimTop * 100).toFixed(0).padStart(3)}%)  ->  ` +
        `${slide.out.padEnd(24)} ${outMeta.width}x${outMeta.height}  ${(size / 1024).toFixed(0)}kB`,
    );
  }

  // Keep the originals available; only the cropped copies are shipped.
  await writeFile(
    path.join(imagesDir, "HERO-SOURCES.txt"),
    SLIDES.map((s) => `${s.out}  <-  ${s.src} (trim ${s.trimTop})`).join("\n") + "\n",
    "utf8",
  );

  console.log(`\n✓ ${SLIDES.length} hero images prepared in public/images`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});