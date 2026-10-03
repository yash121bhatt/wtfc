import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { events } from "@/data/events";
import { jobs } from "@/data/jobs";

const STATIC_PATHS = ["", "/about", "/events", "/careers", "/contact", "/join", "/impact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      const url = `${SITE.url}/${locale}${path}`;
      entries.push({
        url,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE.url}/${l}${path}`]),
          ),
        },
      });
    }

    for (const event of events) {
      entries.push({
        url: `${SITE.url}/${locale}/events/${event.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              `${SITE.url}/${l}/events/${event.slug}`,
            ]),
          ),
        },
      });
    }

    for (const job of jobs) {
      entries.push({
        url: `${SITE.url}/${locale}/careers/${job.slug}`,
        lastModified: new Date(job.posted),
        changeFrequency: "daily",
        priority: 0.5,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              `${SITE.url}/${l}/careers/${job.slug}`,
            ]),
          ),
        },
      });
    }
  }

  return entries;
}
