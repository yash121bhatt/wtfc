import type { Localized } from "@/lib/site";

export type Testimonial = {
  name: Localized;
  role: Localized;
  quote: Localized;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    name: { en: "Sarah Okonkwo", fr: "Sarah Okonkwo" },
    role: {
      en: "Long Haul Driver · Member since 2021",
      fr: "Chauffeuse longue distance · Membre depuis 2021",
    },
    initials: "SO",
    quote: {
      en: "I came into the industry at twenty-three with no connections and no idea how to negotiate. My mentor walked me through my first year, my first raise, and my first run of the Trans-Canada. I own my truck now.",
      fr: "Je suis entrée dans l'industrie à vingt-trois ans, sans relations et sans savoir négocier. Ma mentore m'a accompagnée pendant ma première année, ma première augmentation et ma première tournée du Trans-Canada. Je suis propriétaire de mon camion aujourd'hui.",
    },
  },
  {
    name: { en: "Lise Bergeron", fr: "Lise Bergeron" },
    role: {
      en: "Fleet Manager · Rimouski, QC",
      fr: "Gestionnaire de flotte · Rimouski (Qc.)",
    },
    initials: "LB",
    quote: {
      en: "WTFC gave me the language to advocate for my own crew inside my own company. That is not something a certification gives you — that is something a community gives you.",
      fr: "La FFCC m'a donné les mots pour défendre mon équipe au sein de ma propre entreprise. Ce n'est pas un certificat qui vous offre cela — c'est une communauté.",
    },
  },
  {
    name: { en: "Priya Raman", fr: "Priya Raman" },
    role: {
      en: "Owner-Operator · Mississauga, ON",
      fr: "Propriétaire-opératrice · Mississauga (Ont.)",
    },
    initials: "PR",
    quote: {
      en: "I went from dispatcher to owner-operator in fourteen months. The career board found me the first interview; the network is what kept me in the seat when I wanted to quit.",
      fr: "Je suis passée de répartitrice à propriétaire-opératrice en quatorze mois. Le babillard des carrières m'a trouvé le premier entretien; c'est le réseau qui m'a gardée au volant quand je voulais abandonner.",
    },
  },
  {
    name: { en: "Jenna McLeod", fr: "Jenna McLeod" },
    role: {
      en: "Apprentice Technician · Calgary, AB",
      fr: "Apprenti technicien Calgary (Alb.)",
    },
    initials: "JM",
    quote: {
      en: "Nobody in my shop had done this before me, so I had no one to ask. My mentor sat down with my employer and helped me build a real training pathway. Two years later I train the apprentices.",
      fr: "Personne dans mon atelier n'avait fait cela avant moi; je n'avais personne à qui demander. Ma mentore s'est assise avec mon employeur pour construire un vrai parcours de formation. Deux ans plus tard, c'est moi qui forme les apprentis.",
    },
  },
  {
    name: { en: "Amara Diallo", fr: "Amara Diallo" },
    role: {
      en: "Driver Trainer · Ottawa, ON",
      fr: "Formatrice en conduite · Ottawa (Ont.)",
    },
    initials: "AD",
    quote: {
      en: "The Bridging the Barriers conference is where I met two people who changed my career path. One became my mentor. The other hired me.",
      fr: "C'est à la conférence Bridging the Barriers que j'ai rencontré deux personnes qui ont changé mon parcours. L'une est devenue ma mentore. L'autre m'a embauchée.",
    },
  },
];
