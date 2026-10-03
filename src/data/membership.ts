import type { Localized } from "@/lib/site";

export type MembershipTier = {
  key: "individual" | "corporate";
  title: Localized;
  subtitle: Localized;
  Icon: "user" | "building";
  features: Localized[];
};

export const membershipTiers: MembershipTier[] = [
  {
    key: "individual",
    Icon: "user",
    title: {
      en: "Individual Membership",
      fr: "Adhésion individuelle",
    },
    subtitle: {
      en: "For professionals in the trucking industry",
      fr: "Pour les professionnels et professionnelles du camionnage",
    },
    features: [
      {
        en: "Access to mentorship programs and networking events",
        fr: "Accès aux programmes de mentorat et aux activités de maillage",
      },
      {
        en: "Member-only resources and training materials",
        fr: "Ressources et matériel de formation réservés aux membres",
      },
      {
        en: "Newsletter with industry updates and opportunities",
        fr: "Bulletin avec les nouvelles de l'industrie et les occasions",
      },
      {
        en: "Connect with like-minded professionals across Canada",
        fr: "Échanges avec des personnes de pensée similaire partout au Canada",
      },
      {
        en: "Exclusive access to career board job postings",
        fr: "Accès exclusif aux offres d'emploi du babillard des carrières",
      },
    ],
  },
  {
    key: "corporate",
    Icon: "building",
    title: {
      en: "Corporate Membership",
      fr: "Adhésion corporative",
    },
    subtitle: {
      en: "For companies and organizations",
      fr: "Pour les entreprises et organisations",
    },
    features: [
      {
        en: "Company profile on our members directory",
        fr: "Profil d'entreprise dans notre répertoire des membres",
      },
      {
        en: "Post job opportunities on our career board",
        fr: "Publication d'emplois sur notre babillard des carrières",
      },
      {
        en: "Sponsorship opportunities at events and conferences",
        fr: "Occasions de parrainage lors d'événements et de conférences",
      },
      {
        en: "Access to our network of qualified professionals",
        fr: "Accès à notre réseau de professionnels qualifiés",
      },
      {
        en: "Support diversity initiatives in the industry",
        fr: "Soutien aux initiatives de diversité dans l'industrie",
      },
    ],
  },
];
