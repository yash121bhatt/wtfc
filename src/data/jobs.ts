import type { Localized } from "@/lib/site";

export type EmploymentType = "fullTime" | "partTime" | "contract";

export type Job = {
  slug: string;
  title: Localized;
  company: Localized;
  location: Localized;
  employmentType: EmploymentType;
  posted: string;
  applyUrl?: string;
  overview: Localized;
  responsibilities: Localized[];
  requirements: Localized[];
  benefits: Localized[];
};

export const jobs: Job[] = [
  {
    slug: "class-3-driver-midland-transport",
    title: { en: "Class 3 Driver", fr: "Chauffeur classe 3" },
    company: { en: "Midland Transport Limited", fr: "Midland Transport Limited" },
    location: { en: "Moncton, NB", fr: "Moncton (N.-B.)" },
    employmentType: "fullTime",
    posted: "2026-08-19",
    applyUrl: "http://r.rfer.us/JDIJFmGxu",
    overview: {
      en: "Midland Transport Limited is a Canadian-owned, family-run transportation company operating across Eastern Canada. This Class 3 position operates a straight truck delivering to retail and food-service accounts across the Moncton area.",
      fr: "Midland Transport Limited est une entreprise de transport canadienne familiale exploitant ses activités dans l'Est du Canada. Ce poste de classe 3 consiste à conduire un camion droit pour livrer aux clients de détail et de restauration de la région de Moncton.",
    },
    responsibilities: [
      {
        en: "Operate a straight truck on scheduled delivery routes within Moncton and surrounding area",
        fr: "Conduire un camion droit sur des itinéraires de livraison planifiés à Moncton et dans les environs",
      },
      {
        en: "Complete pre-trip inspections and log defects before departure",
        fr: "Effectuer les inspections avant départ et consigner les défectuosités",
      },
      {
        en: "Maintain accurate delivery records and paperwork",
        fr: "Tenir à jour les registres de livraison et la paperasse avec exactitude",
      },
      {
        en: "Deliver safely and professionally to our customers",
        fr: "Effectuer les livraisons de façon sûre et professionnelle auprès de nos clients",
      },
    ],
    requirements: [
      {
        en: "Valid Class 3 driver's licence with clean abstract",
        fr: "Permis de conduire classe 3 valide avec dossier vierge",
      },
      {
        en: "Minimum 2 years of straight truck experience",
        fr: "Au moins 2 ans d'expérience avec un camion droit",
      },
      { en: "Clean Criminal Record Check", fr: "Vérification d'antécédents criminels clean" },
      {
        en: "Strong customer service and communication skills",
        fr: "Solides compétences en service client et communication",
      },
    ],
    benefits: [
      { en: "Health and dental benefits", fr: "Avantages santé et dentaire" },
      { en: "Paid safety training", fr: "Formation en sécurité rémunérée" },
      { en: "Consistent regional routes", fr: "Itinéraires régionaux constants" },
    ],
  },
  {
    slug: "heavy-truck-driver-p-heald",
    title: { en: "Heavy Truck Driver", fr: "Chauffeur de camion lourd" },
    company: { en: "P Heald Transport LTD", fr: "P Heald Transport LTD" },
    location: { en: "Canada", fr: "Canada" },
    employmentType: "fullTime",
    posted: "2026-08-15",
    overview: {
      en: "P Heald Transport is a flatbed and heavy-haul carrier serving construction, energy and manufacturing clients nationwide. We run an owner-operator friendly culture with modern equipment and regional flexibility.",
      fr: "P Heald Transport est un transporteur de plateaux et de charges lourdes au service de clients des secteurs de la construction, de l'énergie et de la fabrication à l'échelle nationale. Nous cultivons une culture respectueuse des propriétaires-opérateurs, avec de l'équipement moderne et une flexibilité régionale.",
    },
    responsibilities: [
      {
        en: "Operate a tractor-trailer on regional and national lanes",
        fr: "Conduire un tracteur-remorque sur des routes régionales et nationales",
      },
      {
        en: "Secure and tarp loads to DOT and provincial requirements",
        fr: "Arrimer et couvrir les cargaisons selon les exigences fédérales et provinciales",
      },
      { en: "Perform daily inspections and defect reporting", fr: "Effectuer les inspections quotidiennes et signaler les défectuosités" },
      { en: "Communicate dispatch and customers professionally", fr: "Communiquer de façon professionnelle avec la répartition et les clients" },
    ],
    requirements: [
      { en: "Valid AZ Class 1 licence", fr: "Permis AZ classe 1 valide" },
      { en: "Fast Transit certificate an asset", fr: "Certificat Fast Transit un atout" },
      { en: "Clean Criminal Record Check", fr: "Vérification d'antécédents criminels clean" },
      { en: "Safety training completion", fr: "Avoir terminé la formation en sécurité" },
    ],
    benefits: [
      { en: "Performance bonuses", fr: "Prime de rendement" },
      { en: "Owner-operator friendly", fr: "Milieu favorable aux propriétaires-opérateurs" },
      { en: "Modern equipment", fr: "Équipement moderne" },
    ],
  },
  {
    slug: "long-haul-truck-drivers-epic-trails",
    title: { en: "Long Haul Truck Drivers", fr: "Chauffeurs longue distance" },
    company: { en: "Epic Trails Ltd.", fr: "Epic Trails Ltd." },
    location: { en: "Canada", fr: "Canada" },
    employmentType: "fullTime",
    posted: "2026-08-12",
    overview: {
      en: "Epic Trails Ltd. is a temperature-controlled carrier moving retail, food and pharmaceutical freight across Canada and into the United States. We are hiring multiple drivers for both company and lease-to-own arrangements.",
      fr: "Epic Trails Ltd. est un transporteur à température contrôlée qui transporte des marchandises de détail, alimentaires et pharmaceutiques à travers le Canada et aux États-Unis. Nous recrutons plusieurs chauffeurs, à titre de salariés ou en location avec option d'achat.",
    },
    responsibilities: [
      { en: "Haul refrigerated and dry van freight across Canada and the US", fr: "Transporter des marchandises réfrigérées et sèches sur des lignes Canada–États-Unis" },
      { en: "Maintain reefer unit temperature and log readings", fr: "Maintenir la température des unités réfrigérées et consigner les relevés" },
      { en: "Follow Hours of Service and electronic logging requirements", fr: "Respecter les heures de conduite et le journal de bord électronique" },
      { en: "Deliver on time to retail and food distribution centres", fr: "Livrer à temps aux centres de distribution de détail et alimentaires" },
    ],
    requirements: [
      { en: "Valid AZ licence and clean abstract", fr: "Permis AZ valide et dossier vierge" },
      { en: "2+ years of long-haul experience preferred", fr: "2 ans et plus d'expérience en longue distance" },
      { en: "Clean Criminal Record Check", fr: "Vérification d'antécédents criminels clean" },
    ],
    benefits: [
      { en: "Lease-to-own opportunities", fr: "Possibilités de location avec option d'achat" },
      { en: "Company drivers on paid benefits", fr: "Chauffeurs salariés avec avantages" },
      { en: "Home time guaranteed", fr: "Temps à la maison garanti" },
    ],
  },
  {
    slug: "class-1-drivers-midland-transport",
    title: { en: "Class 1 Drivers", fr: "Chauffeurs classe 1" },
    company: { en: "Midland Transport Limited", fr: "Midland Transport Limited" },
    location: { en: "Moncton, NB", fr: "Moncton (N.-B.)" },
    employmentType: "fullTime",
    posted: "2026-08-19",
    overview: {
      en: "Midland Transport is hiring Class 1 drivers for regional and overnight freight assignments out of the Moncton terminal. New graduates with a clean abstract are encouraged to apply — we fund AZ upgrades for successful candidates.",
      fr: "Midland Transport recrute des chauffeurs classe 1 pour des affectations régionales et de nuit au terminal de Moncton. Les nouveaux diplômés au dossier vierge sont encouragés à postuler — nous finançons le passage à l'AZ pour les candidats réussis.",
    },
    responsibilities: [
      { en: "Operate a tractor-trailer on regional assignments", fr: "Conduire un tracteur-remorque sur des affectations régionales" },
      { en: "Complete pre-trip and post-trip inspections", fr: "Effectuer les inspections avant et après trajet" },
      { en: "Maintain ELD compliance and accurate logs", fr: "Respecter le CPE et tenir un journal exact" },
      { en: "Deliver safely to customers across New Brunswick", fr: "Livrer de façon sûre aux clients partout au Nouveau-Brunswick" },
    ],
    requirements: [
      { en: "Valid AZ licence preferred; we will consider upgrading candidates", fr: "Permis AZ préféré; nous considérons les candidats prêts à l'obtenir" },
      { en: "Clean Criminal Record Check", fr: "Vérification d'antécédents criminels clean" },
      { en: "Willingness to run overnight and weekends as needed", fr: "Disposition à faire des nuits et des fins de semaine au besoin" },
    ],
    benefits: [
      { en: "Company-funded AZ upgrade", fr: "Formation AZ financée par l'employeur" },
      { en: "Benefits from day one", fr: "Avantages dès le premier jour" },
      { en: "Home terminal in Moncton", fr: "Terminal de base à Moncton" },
    ],
  },
  {
    slug: "long-haul-truck-driver-aguirre-express",
    title: { en: "Long Haul Truck Driver", fr: "Chauffeur longue distance" },
    company: { en: "Aguirre Express Ltd.", fr: "Aguirre Express Ltd." },
    location: { en: "Canada", fr: "Canada" },
    employmentType: "fullTime",
    posted: "2026-07-28",
    overview: {
      en: "Aguirre Express Ltd. is a cross-border carrier running refrigerated freight between Canada and the United States from its Mississauga terminal. We are looking for an experienced driver for an east coast and mid-west rotation.",
      fr: "Aguirre Express Ltd. est un transporteur transfrontalier de marchandises réfrigérées entre le Canada et les États-Unis, à partir de son terminal de Mississauga. Nous cherchons un chauffeur expérimenté pour une rotation vers la côte est et le Midwest.",
    },
    responsibilities: [
      { en: "Operate cross-border reefer freight between Canada and the US", fr: "Conduire des marchandises réfrigérées transfrontalières Canada–États-Unis" },
      { en: "Complete CBP and border documentation accurately", fr: "Remplir avec exactitude les documents douaniers et frontaliers" },
      { en: "Monitor and record cargo temperature continuously", fr: "Surveiller et consigner en continu la température de la cargaison" },
      { en: "Communicate with dispatch throughout the rotation", fr: "Communiquer avec la répartition tout au long de la rotation" },
    ],
    requirements: [
      { en: "Valid AZ licence with clean abstract", fr: "Permis AZ valide au dossier vierge" },
      { en: "Cross-border experience an asset", fr: "Une expérience transfrontalière est un atout" },
      { en: "Clean Criminal Record Check", fr: "Vérification d'antécédents criminels clean" },
      { en: "FAST card preferred", fr: "Carte FAST préférée" },
    ],
    benefits: [
      { en: "Consistent cross-border lanes", fr: "Trajets transfrontaliers réguliers" },
      { en: "Modern reefer equipment", fr: "Équipement réfrigéré moderne" },
      { en: "Paid weekly direct deposit", fr: "Dépôt direct hebdomadaire rémunéré" },
    ],
  },
  {
    slug: "multiple-positions-wilride-transport",
    title: { en: "We're Hiring! — Multiple Positions", fr: "Nous recrutons! — Plusieurs postes" },
    company: { en: "Wilride Transport Ltd.", fr: "Wilride Transport Ltd." },
    location: { en: "Canada", fr: "Canada" },
    employmentType: "fullTime",
    posted: "2026-07-30",
    overview: {
      en: "Wilride Transport Ltd. is looking for experienced AZ cross-border drivers to run east coast, mid-west, south and western Canada lanes. Multiple positions available with flexible scheduling for drivers who value time at home.",
      fr: "Wilride Transport Ltd. recherche des chauffeurs AZ d'expérience transfrontalière pour couvrir les lignes de la côte est, du Midwest, du sud et de l'Ouest canadien. Plusieurs postes sont affichés avec des horaires flexibles pour les chauffeurs qui tiennent à passer du temps à la maison.",
    },
    responsibilities: [
      { en: "Operate AZ equipment on assigned cross-border and regional lanes", fr: "Conduire de l'équipement AZ sur les lignes transfrontalières et régionales attribuées" },
      { en: "Adhere to company safety policies and provincial regulations", fr: "Respecter les politiques de sécurité de l'entreprise et la réglementation provinciale" },
      { en: "Complete documentation and border clearance", fr: "Remplir la documentation et les formalités frontalières" },
      { en: "Report vehicle defects promptly", fr: "Signaler rapidement toute défectuosité du véhicule" },
    ],
    requirements: [
      { en: "Valid AZ licence", fr: "Permis AZ valide" },
      { en: "3+ years of AZ experience", fr: "3 ans et plus d'expérience en AZ" },
      { en: "Clean Criminal Record Check", fr: "Vérification d'antécédents criminels clean" },
    ],
    benefits: [
      { en: "Flexible scheduling", fr: "Horaires flexibles" },
      { en: "Paid benefits for company drivers", fr: "Avantages payés pour les chauffeurs salariés" },
      { en: "On-time weekly pay", fr: "Paie hebdomadaire versée à temps" },
    ],
  },
  {
    slug: "fully-funded-equipment-operator-training-bredin",
    title: {
      en: "Fully Funded Equipment Operator Training Program",
      fr: "Programme de formation d'opérateurs entièrement financé",
    },
    company: { en: "Bredin Institute", fr: "Bredin Institute" },
    location: { en: "Alberta", fr: "Alberta" },
    employmentType: "fullTime",
    posted: "2026-07-10",
    overview: {
      en: "The Bredin Institute is offering a fully funded Heavy Equipment Operator training program for residents of Alberta. No prior experience is required. Training combines classroom instruction, hands-on pit work, and a guaranteed job placement component — a strong entry point into the transportation and construction equipment sector.",
      fr: "Le Bredin Institute offre un programme de formation d'opérateur d'engin lourd entièrement financé aux résidants de l'Alberta. Aucune expérience préalable n'est requise. La formation combine l'instruction en classe, les travaux pratiques en fosse et un volet de placement garanti en emploi — un point d'entrée solide vers le secteur du transport et de l'équipement de construction.",
    },
    responsibilities: [
      { en: "Attend classroom theory instruction", fr: "Suivre l'instruction théorique en classe" },
      { en: "Complete supervised hands-on equipment operation", fr: "Réaliser des travaux pratiques supervisés en équipement" },
      { en: "Maintain safety awareness and certification standards", fr: "Maintenir la conscience de la sécurité et les normes de certification" },
      { en: "Complete assessments and workplace placements", fr: "Terminer les évaluations et les stages en milieu de travail" },
    ],
    requirements: [
      { en: "Resident of Alberta", fr: "Résidant de l'Alberta" },
      { en: "No prior operating experience required", fr: "Aucune expérience d'opérateur préalable requise" },
      { en: "Must pass a criminal record check", fr: "Doit passer une vérification des antécédents criminels" },
      { en: "Able to work outdoors in varying conditions", fr: "Apte à travailler à l'extérieur par conditions variables" },
    ],
    benefits: [
      { en: "Fully funded — no tuition cost", fr: "Entièrement financé — aucuns frais de scolarité" },
      { en: "Guaranteed job placement support", fr: "Soutien garanti au placement en emploi" },
      { en: "Industry-recognized certification", fr: "Certification reconnue par l'industrie" },
    ],
  },
  {
    slug: "long-haul-truck-driver-watt-stewart",
    title: {
      en: "Long Haul Truck Driver Needed",
      fr: "Chauffeur longue distance requis",
    },
    company: { en: "Watt & Stewart Commodities Inc.", fr: "Watt & Stewart Commodities Inc." },
    location: { en: "Canada", fr: "Canada" },
    employmentType: "fullTime",
    posted: "2026-06-24",
    overview: {
      en: "Watt & Stewart Commodities Inc. is a bulk and agricultural commodities carrier. We are looking for a long-haul driver to move bulk freight between Prairie terminals and destination markets across Canada.",
      fr: "Watt & Stewart Commodities Inc. est un transporteur de marchandises en vrac et de produits agricoles. Nous cherchons un chauffeur longue distance pour acheminer du fret en vrac entre les terminaux des Prairies et les marchés de destination partout au Canada.",
    },
    responsibilities: [
      { en: "Operate bulk and agricultural loads between terminals", fr: "Conduire des chargements en vrac et agricoles entre les terminaux" },
      { en: "Complete pre-trip inspections and load securement checks", fr: "Effectuer les inspections avant départ et vérifier l'arrimage" },
      { en: "Maintain communication with dispatch and receivers", fr: "Maintenir la communication avec la répartition et les réceptionnaires" },
      { en: "Adhere to all hours of service and weight regulations", fr: "Respecter la réglementation sur les heures de conduite et les poids" },
    ],
    requirements: [
      { en: "Valid AZ licence with clean abstract", fr: "Permis AZ valide au dossier vierge" },
      { en: "Previous bulk or agricultural experience an asset", fr: "Une expérience en vrac ou agricole est un atout" },
      { en: "Clean Criminal Record Check", fr: "Vérification d'antécédents criminels clean" },
    ],
    benefits: [
      { en: "Consistent agricultural schedules", fr: "Horaires agricoles réguliers" },
      { en: "Modern equipment", fr: "Équipement moderne" },
      { en: "Safety-first culture", fr: "Culture axée sur la sécurité" },
    ],
  },
  {
    slug: "dz-driver-wanted-e360s",
    title: { en: "DZ Driver Wanted", fr: "Chauffeur DZ recherché" },
    company: { en: "Environmental 360 Solutions", fr: "Environmental 360 Solutions" },
    location: { en: "Location TBD", fr: "Lieu à déterminer" },
    employmentType: "fullTime",
    posted: "2026-06-18",
    overview: {
      en: "Founded in 2018, Environmental 360 Solutions (E360S) is dedicated to becoming North America's leading environmental services contractor. This DZ role supports residential and commercial waste and recycling collection routes.",
      fr: "Fondée en 2018, Environmental 360 Solutions (E360S) s'est donné pour mission de devenir le principal entrepreneur de services environnementaux en Amérique du Nord. Ce poste en classe 3 soutient les tournées de collecte des déchets et du recyclage résidentiels et commerciaux.",
    },
    responsibilities: [
      { en: "Operate a DZ vehicle on residential and commercial collection routes", fr: "Conduire un véhicule de classe 3 sur les tournées de collecte résidentielles et commerciales" },
      { en: "Complete pre-trip inspections and log defects", fr: "Effectuer les inspections avant départ et consigner les défectuosités" },
      { en: "Deliver materials to approved processing facilities", fr: "Livrer les matières aux sites de traitement approuvés" },
      { en: "Uphold environmental and road safety standards", fr: "Respecter les normes environnementales et de sécurité routière" },
    ],
    requirements: [
      { en: "Valid DZ driver's licence", fr: "Permis de conduire classe 3 valide" },
      { en: "Clean Criminal Record Check", fr: "Vérification d'antécédents criminels clean" },
      { en: "Physically able to assist with lifting and loading", fr: "Aptitude physique à aider au levage et au chargement" },
    ],
    benefits: [
      { en: "Meaningful environmental work", fr: "Travail environnemental significatif" },
      { en: "Local routes", fr: "Tournées locales" },
      { en: "Training provided", fr: "Formation fournie" },
    ],
  },
];

export function getJob(slug: string) {
  return jobs.find((job) => job.slug === slug);
}

export function countByType(list: Job[], type: EmploymentType) {
  return list.filter((job) => job.employmentType === type).length;
}
