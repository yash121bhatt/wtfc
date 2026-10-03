import type { Localized } from "@/lib/site";

export type ScheduleItem = { time: Localized; title: Localized };
export type Speaker = { name: Localized; role: Localized };
export type Fee = { label: Localized; amount: string };

export type Event = {
  slug: string;
  /** ISO 8601 — used for sorting and for the <time> element. */
  startDate: string;
  endDate: string;
  image: string;
  venue: Localized;
  address: Localized;
  city: Localized;
  province: Localized;
  title: Localized;
  excerpt: Localized;
  body: Localized[];
  schedule?: ScheduleItem[];
  speakers?: Speaker[];
  fees?: Fee[];
  /** Registration only opens for future events. */
  registrationOpen: boolean;
};

export const events: Event[] = [
  {
    slug: "bridging-the-barriers-2027-ontario",
    startDate: "2027-10-05",
    endDate: "2027-10-06",
    image: "/images/events-4.jpg",
    venue: { en: "Oakville Conference Centre", fr: "Centre de congrès d'Oakville" },
    address: {
      en: "2515 Wyecroft Rd, Oakville, ON",
      fr: "2515, ch. Wyecroft, Oakville (Ont.)",
    },
    city: { en: "Oakville", fr: "Oakville" },
    province: { en: "Ontario", fr: "Ontario" },
    title: {
      en: "Bridging the Barriers 2027 — Ontario",
      fr: "Bridging the Barriers 2027 — Ontario",
    },
    excerpt: {
      en: "Our flagship annual conference returns. One full day of honest conversation, practical workshops, and the networking that changes careers.",
      fr: "Notre conférence annuelle phare est de retour. Une journée complète de conversations franches, d'ateliers pratiques et de maillage qui change des carrières.",
    },
    body: [
      {
        en: "Bridging the Barriers 2027 brings together drivers, technicians, trainers, executives and advocates for a day built around one question: what would it take for this industry to look like in five years?",
        fr: "Bridging the Barriers 2027 réunit chauffeurs, techniciens, formateurs, cadres et défenseurs pour une journée centrée sur une seule question : à quoi devrait ressembler cette industrie dans cinq ans?",
      },
      {
        en: "Expect the same format members have relied on since 2016 — a morning of keynotes, afternoon breakout sessions, and a networking hour that is consistently where the most useful conversations actually happen.",
        fr: "Attendez-vous au même format que les membres utilisent depuis 2016 — une matinée de conférences, des ateliers l'après-midi et une heure de maillage où surviennent systématiquement les conversations les plus utiles.",
      },
    ],
    schedule: [
      {
        time: { en: "Oct 4 — 5:00 PM to 8:00 PM", fr: "4 oct. — 17 h à 20 h" },
        title: { en: "Networking Reception & Early Registration", fr: "5 à 7 et inscription hâtive" },
      },
      {
        time: { en: "Oct 5 — 7:30 AM to 8:30 AM", fr: "5 oct. — 7 h 30 à 8 h 30" },
        title: { en: "Registration and Full Breakfast", fr: "Inscription et petit-déjeuner complet" },
      },
      {
        time: { en: "Oct 5 — 8:30 AM to 4:30 PM", fr: "5 oct. — 8 h 30 à 16 h 30" },
        title: { en: "Conference & Breakouts", fr: "Conférence et ateliers" },
      },
    ],
    speakers: [
      {
        name: { en: "To be announced", fr: "À confirmer" },
        role: { en: "Keynote", fr: "Conférence principale" },
      },
      {
        name: { en: "To be announced", fr: "À confirmer" },
        role: { en: "Featured Speaker", fr: "Conférencière vedette" },
      },
    ],
    fees: [
      { label: { en: "Member", fr: "Membre" }, amount: "$345 + tax" },
      {
        label: { en: "Member — table of 6", fr: "Membre — table de 6" },
        amount: "$1,725 + tax",
      },
      { label: { en: "Non-Member", fr: "Non-membre" }, amount: "$400 + tax" },
      { label: { en: "Networking Only", fr: "5 à 7 seulement" }, amount: "$95 + tax" },
    ],
    registrationOpen: true,
  },
  {
    slug: "mentorship-mentee-speed-meeting-2027",
    startDate: "2027-02-11",
    endDate: "2027-02-11",
    image: "/images/events-1.jpg",
    venue: { en: "Online — Zoom", fr: "En ligne — Zoom" },
    address: {
      en: "A link is emailed to registered attendees 48 hours in advance",
      fr: "Un lien est envoyé par courriel 48 heures à l'avance",
    },
    city: { en: "National", fr: "National" },
    province: { en: "Canada", fr: "Canada" },
    title: {
      en: "Mentorship Mentee–Mentor Speed Meeting",
      fr: "5 à 7 de jumelage mentor–mentor",
    },
    excerpt: {
      en: "A free, one-hour virtual meet-and-match for anyone looking for a mentor — or willing to become one.",
      fr: "Une rencontre virtuelle gratuite d'une heure pour qui cherche un mentor — ou veut en devenir un.",
    },
    body: [
      {
        en: "WTFC runs a formal mentorship programme, but not every pairing works right the first time. This open speed-meeting exists so anyone can meet five potential mentors or mentees in an hour and find the right fit.",
        fr: "La FFCC tient un programme de mentorat structuré, mais tous les jumelages ne fonctionnent pas du premier coup. Cette rencontre ouverte permet de rencontrer cinq mentors ou mentorés potentiels en une heure et de trouver la bonne personne.",
      },
      {
        en: "Bring a short introduction of yourself and what you want help with. No membership required to attend.",
        fr: "Apportez une courte présentation de vous-même et de ce sur quoi vous souhaitez de l'aide. Aucune adhésion n'est requise pour participer.",
      },
    ],
    registrationOpen: true,
  },
  {
    slug: "bridging-the-barriers-2026-ontario",
    startDate: "2026-09-14",
    endDate: "2026-09-15",
    image: "/images/event-btb-ontario.png",
    venue: { en: "Oakville Conference Centre", fr: "Centre de congrès d'Oakville" },
    address: {
      en: "2515 Wyecroft Rd, Oakville, ON",
      fr: "2515, ch. Wyecroft, Oakville (Ont.)",
    },
    city: { en: "Oakville", fr: "Oakville" },
    province: { en: "Ontario", fr: "Ontario" },
    title: {
      en: "Bridging the Barriers 2026 — Ontario",
      fr: "Bridging the Barriers 2026 — Ontario",
    },
    excerpt: {
      en: "Our 10th Anniversary conference. Industry leaders, advocates and professionals together for a day of meaningful discussion, networking and inspiration.",
      fr: "Notre conférence du 10e anniversaire. Des chefs de file, des défenseurs et des professionnels réunis pour une journée de discussions constructive, de maillage et d'inspiration.",
    },
    body: [
      {
        en: "WTFC is proud to celebrate its 10th Anniversary by welcoming everyone back together for Bridging the Barriers Ontario 2026! This important event continues the conversation around breaking barriers, creating opportunities and advancing the role of women in the Trucking Industry.",
        fr: "La FFCC est fière de célébrer son 10e anniversaire en réunissant tout le monde pour Bridging the Barriers Ontario 2026! Cet événement important poursuit la conversation sur la destruction des barrières, la création d'occasions et l'avancement du rôle des femmes dans l'industrie du camionnage.",
      },
      {
        en: "We look forward to bringing industry leaders, advocates and professionals together again for meaningful discussion, networking and inspiration.",
        fr: "Nous avons hâte de réunir de nouveau des chefs de file de l'industrie, des défenseurs et des professionnels pour des échanges significatifs, du maillage et de l'inspiration.",
      },
    ],
    schedule: [
      {
        time: { en: "Sept 14 — 5:00 PM to 8:00 PM", fr: "14 sept. — 17 h à 20 h" },
        title: {
          en: "Networking Event & Early Registration",
          fr: "5 à 7 de l'industrie et inscription hâtive",
        },
      },
      {
        time: { en: "Sept 15 — 7:30 AM to 8:30 AM", fr: "15 sept. — 7 h 30 à 8 h 30" },
        title: {
          en: "Registration and Full Breakfast",
          fr: "Inscription et petit-déjeuner complet",
        },
      },
      {
        time: { en: "Sept 15 — 8:30 AM to 4:00 PM", fr: "15 sept. — 8 h 30 à 16 h" },
        title: { en: "Conference", fr: "Conférence" },
      },
    ],
    speakers: [
      {
        name: { en: "Anne Miner", fr: "Anne Miner" },
        role: { en: "Keynote", fr: "Conférence principale" },
      },
      {
        name: { en: "Allison Greco", fr: "Allison Greco" },
        role: { en: "Featured Speaker", fr: "Conférencière vedette" },
      },
      {
        name: {
          en: "Ruby Murphy-Collins, CPA, CMA",
          fr: "Ruby Murphy-Collins, CPA, CMA",
        },
        role: { en: "Featured Speaker", fr: "Conférencière vedette" },
      },
    ],
    fees: [
      { label: { en: "Member", fr: "Membre" }, amount: "$330 + tax" },
      {
        label: { en: "Member — table of 6", fr: "Membre — table de 6" },
        amount: "$1,650 + tax",
      },
      {
        label: { en: "Non-Member", fr: "Non-membre" },
        amount: "$385 + tax",
      },
      {
        label: { en: "Non-Member — table of 6", fr: "Non-membre — table de 6" },
        amount: "$1,925 + tax",
      },
      { label: { en: "Networking Only", fr: "5 à 7 seulement" }, amount: "$85 + tax" },
    ],
    registrationOpen: true,
  },
  {
    slug: "bridging-the-barriers-western-canada",
    startDate: "2026-05-27",
    endDate: "2026-05-28",
    image: "/images/event-btb-west.png",
    venue: {
      en: "Holiday Inn & Suites Calgary South Conference Centre",
      fr: "Holiday Inn & Suites Calgary South Conference Centre",
    },
    address: {
      en: "8360 Blackfoot Trail SE, Calgary, Alberta T2J 7E1",
      fr: "8360, promenade Blackfoot SE, Calgary (Alberta) T2J 7E1",
    },
    city: { en: "Calgary", fr: "Calgary" },
    province: { en: "Alberta", fr: "Alberta" },
    title: {
      en: "Bridging The Barriers Western Canada",
      fr: "Bridging The Barriers — Canada occidental",
    },
    excerpt: {
      en: "A welcoming, safe space for honest conversations, learning, and connection as we work together to strengthen the trucking industry.",
      fr: "Un espace accueillant et sécurisé pour des conversations franches, de l'apprentissage et des échanges, alors que nous travaillons ensemble à renforcer l'industrie du camionnage.",
    },
    body: [
      {
        en: "Bridging The Barriers Western Canada is a welcoming, safe space for honest conversations, learning, and connection as we work together to strengthen the trucking industry.",
        fr: "Bridging The Barriers — Canada occidental est un espace accueillant et sécurisé pour des conversations franches, de l'apprentissage et des échanges, alors que nous travaillons ensemble à renforcer l'industrie du camionnage.",
      },
      {
        en: "Western Canadian drivers, dispatchers, technicians and fleet leaders spend a full day with the people shaping the region's freight economy — and leave with a network they can call on.",
        fr: "Les chauffeurs, répartiteurs, techniciens et responsables de flotte de l'Ouest canadien passent une journée complète avec les personnes qui façonnent l'économie du fret de la région — et repartent avec un réseau vers lequel ils peuvent se tourner.",
      },
    ],
    registrationOpen: true,
  },
  {
    slug: "amta-88th-annual-conference-2026",
    startDate: "2026-04-22",
    endDate: "2026-04-24",
    image: "/images/event-amta.jpg",
    venue: {
      en: "Grey Eagle Events Centre",
      fr: "Grey Eagle Events Centre",
    },
    address: {
      en: "Grey Eagle Events Centre in Calgary, Alberta",
      fr: "Grey Eagle Events Centre, Calgary (Alberta)",
    },
    city: { en: "Calgary", fr: "Calgary" },
    province: { en: "Alberta", fr: "Alberta" },
    title: {
      en: "AMTA's 88th Annual Conference 2026 — On the Move: Shaping Industry for Tomorrow, Today",
      fr: "Conférence annuelle 2026 de l'AMTA — En mouvement : façonner l'industrie de demain, aujourd'hui",
    },
    excerpt: {
      en: "Alberta's premier gathering for the commercial transportation sector brings together industry leaders for three days of strategy, policy and connection.",
      fr: "Le grand rendez-vous de l'Alberta pour le transport commercial réunit des chefs de file pendant trois jours de stratégie, de politique et d'échanges.",
    },
    body: [
      {
        en: "The Alberta Motor Transport Association (AMTA) is hosting its 88th Annual Conference on April 22–23, 2026 at the Grey Eagle Events Centre in Calgary. As Alberta's premier gathering for the commercial transportation sector, the conference brings together industry leaders, operators, and advocates from across the province and beyond.",
        fr: "L'Alberta Motor Transport Association (AMTA) accueille sa 88e conférence annuelle les 22 et 23 avril 2026 au Grey Eagle Events Centre de Calgary. Grand rendez-vous de l'Alberta pour le transport commercial, la conférence réunit des chefs de file, des exploitants et des défenseurs de partout dans la province et au-delà.",
      },
      {
        en: "WTFC members attended as guests and volunteers, continuing our work connecting women in trucking with the decision-makers who shape the region's operating environment.",
        fr: "Des membres de la FFCC ont participé comme invités et bénévoles, poursuivant notre travail de mise en relation des femmes du camionnage avec les décideurs qui façonnent l'environnement d'exploitation de la région.",
      },
    ],
    registrationOpen: false,
  },
  {
    slug: "bridging-the-barriers-ontario-2025",
    startDate: "2025-10-02",
    endDate: "2025-10-02",
    image: "/images/conference.jpg",
    venue: {
      en: "Oakville Conference Centre",
      fr: "Centre de congrès d'Oakville",
    },
    address: {
      en: "2515 Wyecroft Rd, Oakville, ON",
      fr: "2515, ch. Wyecroft, Oakville (Ont.)",
    },
    city: { en: "Oakville", fr: "Oakville" },
    province: { en: "Ontario", fr: "Ontario" },
    title: {
      en: "Bridging the Barriers Ontario",
      fr: "Bridging the Barriers Ontario",
    },
    excerpt: {
      en: "Our annual Ontario conference — a safe, respectful environment where industry professionals can learn, connect, and drive meaningful change.",
      fr: "Notre conférence annuelle en Ontario — un environnement sûr et respectueux où les professionnels de l'industrie peuvent apprendre, créer des liens et des changements significatifs.",
    },
    body: [
      {
        en: "Join us in a safe, respectful environment where industry professionals can learn, connect, and drive meaningful change.",
        fr: "Joignez-vous à nous dans un environnement sûr et respectueux où les professionnels de l'industrie peuvent apprendre, créer des liens et des changements significatifs.",
      },
    ],
    registrationOpen: false,
  },
];

/**
 * Deterministic "has this already happened?" check. Named distinctly from the
 * `isPast` date helper so client components can import it from the data module
 * without dragging the server-side helper along.
 */
export function isPastOn(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year ?? 1970, (month ?? 1) - 1, day ?? 1).getTime() < Date.now();
}

export function getEvent(slug: string) {
  return events.find((event) => event.slug === slug);
}

/** Future events first, soonest leading. */
export function sortByDate(list: Event[], direction: "asc" | "desc" = "asc") {
  return [...list].sort((a, b) => {
    const delta = a.startDate.localeCompare(b.startDate);
    return direction === "asc" ? delta : -delta;
  });
}
