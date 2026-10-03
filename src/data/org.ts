import type { Localized } from "@/lib/site";

export type Milestone = { year: string; title: Localized; text: Localized };

export const milestones: Milestone[] = [
  {
    year: "2015",
    title: { en: "WTFC Founded", fr: "Fondation de la FFCC" },
    text: {
      en: "Established to encourage employment of women in transportation",
      fr: "Fondée afin d'encourager l'emploi des femmes dans le transport",
    },
  },
  {
    year: "2017",
    title: { en: "National Expansion", fr: "Expansion nationale" },
    text: {
      en: "Expanded membership across all Canadian provinces",
      fr: "Adhésion élargie dans toutes les provinces canadiennes",
    },
  },
  {
    year: "2019",
    title: { en: "Corporate Partners", fr: "Partenaires corporatifs" },
    text: {
      en: "Launched corporate membership program with industry leaders",
      fr: "Lancement du programme d'adhésion corporative avec des chefs de file de l'industrie",
    },
  },
  {
    year: "2021",
    title: { en: "Mentorship Program", fr: "Programme de mentorat" },
    text: {
      en: "Initiated comprehensive mentorship for new drivers",
      fr: "Lancement d'un programme de mentorat complet pour les nouveaux chauffeurs",
    },
  },
  {
    year: "2023",
    title: { en: "30,000+ Followers", fr: "30 000+ abonnés" },
    text: {
      en: "Reached milestone of over 30,000 followers across our community",
      fr: "A franchi le cap des 30 000 abonnés au sein de notre communauté",
    },
  },
  {
    year: "2025",
    title: { en: "Digital Transformation", fr: "Transformation numérique" },
    text: {
      en: "Launched new digital platform for enhanced engagement",
      fr: "Lancement d'une nouvelle plateforme numérique pour une participation accrue",
    },
  },
  {
    year: "2026",
    title: { en: "10th Anniversary", fr: "10e anniversaire" },
    text: {
      en: "Celebrated a decade of community at Bridging the Barriers Ontario",
      fr: "Célébration d'une décennie de communauté à Bridging the Barriers Ontario",
    },
  },
];

export type BoardMember = {
  name: Localized;
  role: Localized;
  bio: Localized;
};

export const board: BoardMember[] = [
  {
    name: { en: "Danielle Côté", fr: "Danielle Côté" },
    role: { en: "President", fr: "Présidente" },
    bio: {
      en: "Twenty-two years behind the wheel and eight years on the board. Danielle leads WTFC's advocacy work on fair opportunity and driver recognition.",
      fr: "Vingt-deux ans derrière le volant et huit ans au conseil. Danielle dirige le travail de la FFCC en matière de plaidoyer sur l'équité d'emploi et la reconnaissance des chauffeurs.",
    },
  },
  {
    name: { en: "Renee Thunder", fr: "Renee Thunder" },
    role: { en: "Vice-President, Programs", fr: "Vice-présidente, programmes" },
    bio: {
      en: "Renee built the mentorship match process that now pairs over six hundred members a year, and still personally matches every new cohort.",
      fr: "Renee a mis au point le processus de jumelage qui associe maintenant plus de six cents membres par année, et apparie encore elle-même chaque nouvelle cohorte.",
    },
  },
  {
    name: { en: "Marie-Claude Gagnon", fr: "Marie-Claude Gagnon" },
    role: { en: "Director, Youth & Schools", fr: "Directrice, jeunesse et écoles" },
    bio: {
      en: "Marie-Claude takes WTFC into classrooms across Quebec and Ontario, and runs the Careers in Motion expo at national career fairs.",
      fr: "Marie-Claude amène la FFCC dans les écoles du Québec et de l'Ontario, et dirige l'expo Carrières en mouvement lors des salons nationaux.",
    },
  },
  {
    name: { en: "Priya Sharma", fr: "Priya Sharma" },
    role: { en: "Director, Corporate Partnerships", fr: "Directrice, partenariats corporatifs" },
    bio: {
      en: "Priya leads sponsor relations and is the point of contact for fleets building formal diversity and inclusion programmes.",
      fr: "Priya dirige les relations avec les parrains et est la personne à contacter pour les flottes qui mettant en place des programmes formels de diversité et d'inclusion.",
    },
  },
  {
    name: { en: "Aisha Mbeki", fr: "Aisha Mbeki" },
    role: { en: "Director, Safety & Standards", fr: "Directrice, sécurité et normes" },
    bio: {
      en: "A former driver trainer, Aisha shaped WTFC's professional standards campaign and its public safety messaging.",
      fr: "Ancienne formatrice en conduite, Aisha a façonné la campagne sur les normes professionnelles de la FFCC et ses messages de sécurité publique.",
    },
  },
  {
    name: { en: "Chantal Bouchard", fr: "Chantal Bouchard" },
    role: { en: "Secretary-Treasurer", fr: "Secrétaire-trésorière" },
    bio: {
      en: "Chantal keeps the books, publishes the annual transparency report, and insists that every dollar is accounted for in public.",
      fr: "Chantal tient la comptabilité, publie le rapport annuel de transparence et exige que chaque dollar soit rendu public.",
    },
  },
];
