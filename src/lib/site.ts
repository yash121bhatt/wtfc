/** A string that exists in both the English and French catalogues. */
export type Localized = { en: string; fr: string };

export function pick(value: Localized, locale: string): string {
  return value[locale as keyof Localized] ?? value.en;
}

export const SITE = {
  name: "Women's Trucking Federation of Canada",
  shortName: "WTFC",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wtfc.ca",
  email: "inquiries@wtfc.ca",
  eventEmail: "bridgingthebarriers@wtfc.ca",
  social: [
    { label: "Facebook", href: "https://facebook.com/WTFC2015", icon: "facebook" },
    { label: "Twitter", href: "https://twitter.com/WTFC7", icon: "twitter" },
    { label: "Instagram", href: "https://instagram.com/wtfc2015", icon: "instagram" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/women-s-trucking-federation-of-canada",
      icon: "linkedin",
    },
  ],
} as const;
