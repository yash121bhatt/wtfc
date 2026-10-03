import type { Localized } from "@/lib/site";

export type Partner = {
  id: string;
  title: Localized;
  description: Localized;
  href: string;
  image: string;
  /** Which call-to-action verb the partner card should use. */
  cta: "cta" | "ctaShop" | "ctaWatch";
};

/** The four partner cards rendered on the home page, mirroring wtfc.ca. */
export const partners: Partner[] = [
  {
    id: "ppe",
    title: { en: "Mark's Commercial Women's PPE", fr: "EPI pour femmes de Mark's Commercial" },
    description: {
      en: "Professional safety gear designed specifically for women in trucking",
      fr: "De l'équipement de protection professionnel conçu expressément pour les femmes du camionnage",
    },
    href: "https://www.markscommercial.com/en-ca/",
    image: "/images/partner-ppe.png",
    cta: "cta",
  },
  {
    id: "shop",
    title: { en: "WTFC Shop", fr: "Boutique FFCC" },
    description: {
      en: "Official WTFC merchandise and branded products",
      fr: "Articles et produits à l'effigie officielle de la FFCC",
    },
    href: "https://www.wtfc.shop/",
    image: "/images/partner-shop.png",
    cta: "cta",
  },
  {
    id: "timeas",
    title: { en: "Timea's Market", fr: "Marché Timea" },
    description: {
      en: "Shop products supporting our Know Human Trafficking campaign",
      fr: "Des produits qui soutiennent notre campagne « Le trafic d'humains, ça se voit »",
    },
    href: "https://timeasmarketonlinestore.com",
    image: "/images/partner-timeas.png",
    cta: "ctaShop",
  },
  {
    id: "youtube",
    title: { en: "YouTube Channel", fr: "Chaîne YouTube" },
    description: {
      en: "Educational content and community stories",
      fr: "Contenu éducatif et récits de la communauté",
    },
    href: "https://www.youtube.com/channel/UClepT4uuinCVdy4W6LUxOpQ",
    image: "/images/partner-youtube.png",
    cta: "ctaWatch",
  },
];

/** Fictional-but-plausible fleets shown in the corporate member marquee. */
export const corporateMembers: Localized[] = [
  { en: "Midland Transport", fr: "Midland Transport" },
  { en: "P Heald Transport", fr: "P Heald Transport" },
  { en: "Epic Trails", fr: "Epic Trails" },
  { en: "Aguirre Express", fr: "Aguirre Express" },
  { en: "Wilride Transport", fr: "Wilride Transport" },
  { en: "Watt & Stewart", fr: "Watt & Stewart" },
  { en: "Environmental 360", fr: "Environmental 360" },
  { en: "Bredin Institute", fr: "Institut Bredin" },
  { en: "Mark's Commercial", fr: "Mark's Commercial" },
  { en: "Northline Logistics", fr: "Northline Logistics" },
  { en: "Beaver Trucking", fr: "Beaver Trucking" },
  { en: "Saskatoon Freight", fr: "Saskatoon Freight" },
];
