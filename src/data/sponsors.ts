import type { Localized } from "@/lib/site";

export type SponsorTier = {
  key: "community" | "partner" | "premier" | "founding";
  popular?: boolean;
  name: Localized;
  price: Localized;
  cadence: Localized;
  blurb: Localized;
  features: Localized[];
};

export const sponsorTiers: SponsorTier[] = [
  {
    key: "community",
    name: { en: "Community Supporter", fr: "Soutien communautaire" },
    price: { en: "$1,500", fr: "1 500 $" },
    cadence: { en: "one-time", fr: "une fois" },
    blurb: {
      en: "For local businesses and small fleets who want to show up.",
      fr: "Pour les entreprises locales et les petites flottes qui veulent être de la partie.",
    },
    features: [
      {
        en: "Logo on the WTFC partners wall",
        fr: "Logo sur le mur des partenaires de la FFCC",
      },
      {
        en: "Two event passes per year",
        fr: "Deux billets d'événement par année",
      },
      {
        en: "Quarterly impact update",
        fr: "Bulletin d'impact trimestriel",
      },
    ],
  },
  {
    key: "partner",
    popular: true,
    name: { en: "Industry Partner", fr: "Partenaire de l'industrie" },
    price: { en: "$5,000", fr: "5 000 $" },
    cadence: { en: "annually", fr: "par année" },
    blurb: {
      en: "The working partnership — visibility plus a seat at the table.",
      fr: "Le partenariat de travail — visibilité et place à la table.",
    },
    features: [
      { en: "Everything in Community Supporter", fr: "Tout ce qu'inclut Soutien communautaire" },
      {
        en: "Featured logo on the home page",
        fr: "Logo en vedette sur la page d'accueil",
      },
      {
        en: "Mentorship program sponsorship",
        fr: "Parrainage du programme de mentorat",
      },
      {
        en: "Career board recruitment listing",
        fr: "Annonce sur le babillard des carrières",
      },
      { en: "One conference booth", fr: "Un kiosque à la conférence" },
    ],
  },
  {
    key: "premier",
    name: { en: "Premier Partner", fr: "Partenaire principal" },
    price: { en: "$15,000", fr: "15 000 $" },
    cadence: { en: "annually", fr: "par année" },
    blurb: {
      en: "For fleets committing to measurable change in their own operation.",
      fr: "Pour les flottes qui s'engagent vers un changement mesurable dans leurs propres opérations.",
    },
    features: [
      {
        en: "Everything in Industry Partner",
        fr: "Tout ce qu'inclut Partenaire de l'industrie",
      },
      {
        en: "Joint media and press announcement",
        fr: "Annonce commune dans les médias",
      },
      { en: "Two conference booths", fr: "Deux kiosques à la conférence" },
      {
        en: "Co-branded training material",
        fr: "Matériel de formation co-signé",
      },
      {
        en: "Annual impact report acknowledgement",
        fr: "Mention dans le rapport d'impact annuel",
      },
    ],
  },
  {
    key: "founding",
    name: { en: "Founding Partner", fr: "Partenaire fondateur" },
    price: { en: "$50,000+", fr: "50 000 $ et +" },
    cadence: { en: "multi-year", fr: "multi-annuel" },
    blurb: {
      en: "Multi-year commitment shaping the next decade of trucking.",
      fr: "Un engagement pluriannuel qui façonne la prochaine décennie du camionnage.",
    },
    features: [
      {
        en: "Everything in Premier Partner",
        fr: "Tout ce qu'inclut Partenaire principal",
      },
      { en: "Board observer seat", fr: "Siège d'observateur au conseil" },
      {
        en: "Naming rights on a flagship programme",
        fr: "Droit de nommage sur un programme phare",
      },
      {
        en: "First access to every WTFC event",
        fr: "Accès prioritaire à tous les événements de la FFCC",
      },
    ],
  },
];

export const POPULAR_LABEL: Localized = {
  en: "Most Popular",
  fr: "Le plus choisi",
};
