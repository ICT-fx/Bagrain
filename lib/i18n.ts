/**
 * Dictionnaire bilingue FR / EN.
 * Aucune chaîne en dur dans les composants : tout passe par ici.
 */

export type Lang = "fr" | "en";

const fr = {
  meta: {
    title: "BAGRAIN® — Le sac à dos à capuche intégrée",
    description:
      "Un sac à dos avec une capuche de pluie intégrée qui se déploie en quelques secondes. Gardez les mains libres et la tête au sec. Conçu à Nantes, brevet déposé.",
  },
  a11y: {
    skip: "Aller au contenu",
    langSwitch: "Changer de langue",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    home: "BAGRAIN — retour à l’accueil",
    mainNav: "Navigation principale",
    mobileNav: "Navigation mobile",
  },
  nav: {
    sac: "Le sac",
    how: "Comment ça marche",
    anatomy: "Anatomie",
    team: "Équipe",
    salon: "Salon",
    cta: "Être prévenu du lancement",
  },
  hero: {
    kicker: "Nantes · France — Brevet déposé",
    titleLines: ["Gardez les mains libres.", "Et la tête au sec."],
    sub: "Le premier sac à dos à capuche intégrée. Rangée en haut du sac, déployée en quelques secondes, elle vous couvre la tête et les épaules pendant que vous continuez à vivre.",
    ctaPrimary: "Voir le sac",
    ctaSecondary: "Nous rencontrer au salon",
    scroll: "Défiler",
    imgAlt:
      "Sac à dos BAGRAIN vu de face, capuche de pluie repliée sur la partie haute du sac",
  },
  problem: {
    kicker: "Le problème",
    title: "Sous la pluie, on a toujours une main en moins.",
    body: "Un parapluie occupe une main, se retourne au vent, dégouline dans le métro et s’oublie sur une table. Une capuche de manteau ne tient pas et ne protège pas le sac. Le sac à dos, lui, est déjà sur vos épaules.",
    film: {
      alt: "Séquence en boucle du sac BAGRAIN : gros plans sur les bretelles et le tissu, un passant sous la pluie dans une rue de nuit, puis la capuche qui se déploie hors du sac.",
      pause: "Mettre l’animation en pause",
      play: "Lire l’animation",
    },
  },
  intro: {
    kicker: "Le sac",
    title: "La solution était déjà sur votre dos.",
    photoAlt:
      "Deux sacs à dos BAGRAIN vus de dos : à gauche la capuche rangée, à droite la capuche dépliée au-dessus des bretelles",
    body: "BAGRAIN est un sac à dos urbain et outdoor doté d’une capuche de pluie escamotable. Rangée dans une poche dédiée en haut du sac, elle se déploie en quelques secondes par un jeu de sangles, de crochets et d’aimants — et protège la tête et les épaules sans jamais occuper les mains.",
  },
  steps: {
    kicker: "Comment ça marche",
    title: "4 gestes. Et vous êtes au sec.",
    hint: "Continuez à défiler — la capuche se déploie.",
    items: [
      {
        title: "Accrocher les crochets",
        body: "Deux crochets à saisir en haut du sac. C’est le point de départ de la séquence.",
      },
      {
        title: "Enfiler la capuche",
        body: "Tirez les sangles d’un mouvement circulaire : la capuche passe par-dessus la tête.",
      },
      {
        title: "Libérer les aimants",
        body: "Tirez les sangles vers le bas pour libérer les aimants de leur position de rangement.",
      },
      {
        title: "Fermer sur l’avant",
        body: "Les aimants se rejoignent et ferment la capuche sur l’avant. Clic. Vous êtes couvert.",
      },
    ],
    counters: [
      { value: 4, prefix: "", suffix: "", label: "gestes" },
      { value: 6, prefix: "", suffix: "", label: "aimants" },
      { value: 5, prefix: "≈", suffix: " s", label: "pour se couvrir" },
    ],
    stageAlt: [
      "Étape 1 : capuche rangée dans sa poche en haut du sac, crochets accessibles",
      "Étape 2 : capuche en cours de déploiement au-dessus du sac",
      "Étape 3 : capuche enfilée sur la tête, doublure visible",
      "Étape 4 : capuche fermée sur l’avant par les aimants",
    ],
  },
  anatomy: {
    kicker: "Anatomie",
    title: "Chaque détail a une raison d’être.",
    intro:
      "Développé avec le bureau d’études OCCO et L’École de Design Nantes Atlantique. Survolez ou touchez les points pour explorer.",
    figureAlt:
      "Rendu du sac BAGRAIN, de trois quarts dos et de face, avec ses points d’intérêt annotés",
    hotspots: [
      {
        id: "hood-pocket",
        name: "Poche capuche",
        desc: "Logée en partie haute, elle range la capuche pliée — prête à sortir.",
      },
      {
        id: "straps",
        name: "Sangles d’ouverture",
        desc: "Deux sangles pour déployer la capuche d’un seul mouvement.",
      },
      {
        id: "cord",
        name: "Cordon élastique",
        desc: "Maintient la capuche pliée et guide son retour dans la poche.",
      },
      {
        id: "shoulder",
        name: "Bretelles rembourrées",
        desc: "Confort d’épaule, même sac chargé. Poche badge et poche CB intégrées.",
      },
      {
        id: "trolley",
        name: "Passant valise",
        desc: "Glissez le sac sur la poignée d’un trolley en déplacement.",
      },
      {
        id: "foam",
        name: "Mousses dorsales",
        desc: "Portage stable et dos aéré sur les trajets quotidiens.",
      },
      {
        id: "secret",
        name: "Poche secrète",
        desc: "Contre le dos, zip classique : passeport, clés, ce qui ne se prête pas.",
      },
      {
        id: "bottle",
        name: "Poches bidon",
        desc: "Extensibles, et parfaitement à plat quand elles ne servent pas.",
      },
      {
        id: "piping",
        name: "Liseré réfléchissant",
        desc: "Noir le jour, lumineux la nuit, sur les arêtes du sac.",
      },
      {
        id: "fabric",
        name: "Tissu texturé",
        desc: "Partie haute en tissu texturé, résistant à l’usage et à la pluie.",
      },
      {
        id: "rfid",
        name: "Poche CB anti-RFID",
        desc: "Sur la bretelle : votre carte reste illisible pour les scanners.",
      },
      {
        id: "laptop",
        name: "Compartiment 17 pouces",
        desc: "254 × 399 mm, mousses anti-chocs : l’ordinateur voyage protégé.",
      },
    ],
    tableTitle: "Fiche technique",
    specs: [
      ["Déploiement capuche", "≈ 5 secondes, sans les mains occupées"],
      ["Structure capuche", "Plaque PE périphérique rigide 1 mm"],
      ["Pliage", "Bandes thermosoudées guidant la forme du tour de visage"],
      ["Aimants", "Cousus 1,9 kg ×2 · disques 4,3 kg ×4"],
      ["Poche principale", "Zip classique"],
      ["Poche avant", "Zip invisible"],
      ["Poche secrète", "Contre le dos, zip classique"],
      ["Bretelle", "Poche badge classique + poche CB anti-RFID"],
      ["Ordinateur", "17 pouces — 254 × 399 mm, mousses anti-chocs"],
      ["Visibilité", "Liseré réfléchissant noir sur les arêtes"],
      ["Portage", "Bretelles rembourrées, mousses dorsales, passant valise"],
      ["Statut", "Brevet déposé · Marque déposée ®"],
    ],
  },
  usecases: {
    kicker: "Quand ça sert",
    title: "La pluie n’annule plus rien.",
    cards: [
      {
        title: "Sortir sans y penser",
        line: "L’averse commence, la capuche sort, vous continuez.",
      },
      {
        title: "Photographier, profiter du dehors",
        line: "Deux mains pour le boîtier, zéro pour le parapluie.",
      },
      {
        title: "Répondre au téléphone",
        line: "Décrocher, écrire, rester au sec — en marchant.",
      },
      {
        title: "Déjeuner, festival, stade",
        line: "Assis dehors, à l’abri, les mains occupées ailleurs.",
      },
    ],
  },
  why: {
    kicker: "Pourquoi BAGRAIN",
    title: "Une idée simple, tenue jusqu’au bout.",
    items: [
      {
        title: "Innovant",
        body: "Un produit disruptif, universel et polyvalent : la protection pluie intégrée à l’objet que vous portez déjà.",
      },
      {
        title: "Sans équivalent",
        body: "Aucun produit comparable identifié à ce jour. Demande de brevet déposée.",
      },
      {
        title: "Une communauté",
        body: "Des utilisateurs et des créateurs qui font vivre le produit, dès avant son lancement.",
      },
      {
        title: "Large public",
        body: "Des actifs de 15 à 65 ans, en ville comme en montagne, par tous les temps.",
      },
      {
        title: "Souple",
        body: "E-commerce en Europe, Asie et Amériques, réseau d’agents en Europe : la distribution s’adapte.",
      },
      {
        title: "Expérimenté",
        body: "Une équipe internationale issue de la bagagerie, du design produit et de l’import-export.",
      },
    ],
  },
  team: {
    kicker: "L’équipe",
    title: "Conçu à Nantes, pensé partout.",
    members: [
      { name: "Paul Duteil", role: "Fondateur & CEO", city: "Vienne, Autriche" },
      {
        name: "Stéphane Bembekoff",
        role: "Production & sourcing",
        city: "Hong Kong",
      },
      {
        name: "Olivier Pigasse",
        role: "Design produit & direction artistique",
        city: "Nantes, France",
      },
      {
        name: "Quentin Lebrec",
        role: "Commercial & développement",
        city: "Innsbruck, Autriche",
      },
      { name: "Benoit Duteil", role: "Incubateur", city: "France" },
    ],
    partnersTitle: "Ils développent le produit avec nous",
    partners: [
      "OCCO Bureau d’études",
      "L’École de Design Nantes Atlantique",
      "SPK Group",
      "RVDB Intellectual Property",
    ],
  },
  salon: {
    kicker: "Salon",
    title: "On se voit au salon ?",
    body: "Un prototype s’essaie mieux qu’il ne se raconte. Passez sur le stand : déployez la capuche vous-même, posez vos questions, repartez avec un contact direct.",
    eventName: "Nom du salon",
    dates: "Dates",
    place: "Lieu",
    hallStand: "Hall & stand",
    meet: "Prendre rendez-vous sur le stand",
    meetSubject: "Rendez-vous sur le stand BAGRAIN",
    addCal: "Ajouter au calendrier",
    icsDescription:
      "Rencontrez BAGRAIN sur son stand — le sac à dos à capuche intégrée.",
    photoAlt:
      "Stand BAGRAIN monté sur un salon professionnel : totems de marque, prototype porté et écran de démonstration",
    photoNote: "Le stand BAGRAIN — prototype à essayer sur place",
  },
  contact: {
    kicker: "Rester au courant",
    title: "Le lancement approche.",
    newsletter: {
      title: "Liste de lancement",
      body: "Une adresse email, et vous saurez avant tout le monde quand BAGRAIN devient disponible.",
      emailLabel: "Votre adresse email",
      emailPlaceholder: "prenom@exemple.fr",
      consent:
        "J’accepte que BAGRAIN utilise mon adresse pour m’informer du lancement. Désinscription en un clic, jamais de revente.",
      submit: "Me prévenir",
      sending: "Envoi en cours…",
      success: "C’est noté. Vous serez parmi les premiers prévenus.",
      errorInvalid: "Adresse email invalide — vérifiez le format.",
      errorConsent: "Cochez la case de consentement pour continuer.",
      errorServer: "L’envoi a échoué. Réessayez dans un instant.",
    },
    pro: {
      title: "Distributeurs, revendeurs, presse",
      body: "Vous voulez distribuer BAGRAIN, l’essayer, en parler ? Écrivez-nous, on répond vite.",
      name: "Nom",
      namePlaceholder: "Votre nom",
      email: "Email",
      emailPlaceholder: "vous@societe.fr",
      company: "Société",
      companyPlaceholder: "Nom de la société",
      country: "Pays",
      countryPlaceholder: "France",
      message: "Message",
      messagePlaceholder: "Votre demande en quelques lignes…",
      submit: "Envoyer",
      sending: "Envoi en cours…",
      success: "Message reçu. Nous revenons vers vous rapidement.",
      errorRequired: "Nom, email et message sont nécessaires pour vous répondre.",
      errorInvalid: "Adresse email invalide — vérifiez le format.",
      errorServer: "L’envoi a échoué. Réessayez dans un instant.",
    },
  },
  footer: {
    baseline: "Gardez les mains libres et la tête au sec.",
    navTitle: "Navigation",
    legalTitle: "Légal",
    legal: "Mentions légales",
    privacy: "Politique de confidentialité",
    followTitle: "Suivre",
    credits:
      "BAGRAIN® — marque déposée · demande de brevet déposée · Nantes, France · © 2026",
  },
  legal: {
    backHome: "Retour au site",
    mentions: {
      title: "Mentions légales",
      blocks: [
        {
          h: "Éditeur",
          p: "BAGRAIN — société fondée en février 2025 à Nantes, France. [Raison sociale, forme juridique, capital, SIREN et adresse du siège à compléter avant mise en ligne.] Directeur de la publication : Paul Duteil.",
        },
        {
          h: "Hébergement",
          p: "Site hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — vercel.com. [À adapter si l’hébergeur change ; privilégier une région d’hébergement UE.]",
        },
        {
          h: "Propriété intellectuelle",
          p: "BAGRAIN® est une marque déposée. Le produit fait l’objet d’une demande de brevet déposée. L’ensemble des contenus de ce site (textes, visuels, logo) est protégé ; toute reproduction sans autorisation est interdite.",
        },
        {
          h: "Contact",
          p: "Pour toute question relative au site : voir l’adresse de contact indiquée en pied de page.",
        },
      ],
    },
    privacy: {
      title: "Politique de confidentialité",
      blocks: [
        {
          h: "Ce que nous collectons",
          p: "Lorsque vous rejoignez la liste de lancement, nous collectons votre adresse email, avec votre consentement explicite. Lorsque vous utilisez le formulaire professionnel, nous collectons les informations que vous choisissez de transmettre (nom, email, société, pays, message).",
        },
        {
          h: "Pourquoi",
          p: "Uniquement pour vous informer du lancement de BAGRAIN et répondre à vos demandes. Vos données ne sont ni revendues, ni partagées à des fins publicitaires.",
        },
        {
          h: "Durée et hébergement",
          p: "Les données sont conservées jusqu’au lancement commercial puis au maximum 3 ans, sur des services hébergés de préférence dans l’Union européenne. [Préciser le prestataire d’emailing retenu avant mise en ligne.]",
        },
        {
          h: "Vos droits",
          p: "Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’opposition et de suppression. Chaque email envoyé contient un lien de désinscription en un clic. Pour exercer vos droits : voir l’adresse de contact en pied de page.",
        },
      ],
    },
  },
} as const;

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends number
      ? number
      : DeepStringify<T[K]>;
};

export type Dict = DeepStringify<typeof fr>;

const en: Dict = {
  meta: {
    title: "BAGRAIN® — The backpack with a built-in hood",
    description:
      "A backpack with a built-in rain hood that deploys in seconds. Keep your hands free and your head dry. Designed in Nantes, patent pending.",
  },
  a11y: {
    skip: "Skip to content",
    langSwitch: "Switch language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "BAGRAIN — back to top",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
  },
  nav: {
    sac: "The bag",
    how: "How it works",
    anatomy: "Anatomy",
    team: "Team",
    salon: "Trade show",
    cta: "Get launch updates",
  },
  hero: {
    kicker: "Nantes · France — Patent pending",
    titleLines: ["Keep your hands free.", "And your head dry."],
    sub: "The first backpack with a built-in hood. Stowed in the top pocket, deployed in seconds, it covers your head and shoulders while you get on with your day.",
    ctaPrimary: "See the bag",
    ctaSecondary: "Meet us at the show",
    scroll: "Scroll",
    imgAlt:
      "BAGRAIN backpack seen from the front, rain hood folded over the top of the bag",
  },
  problem: {
    kicker: "The problem",
    title: "In the rain, you’re always one hand short.",
    body: "An umbrella takes a hand, flips in the wind, drips on the metro and gets left on a table. A coat hood won’t stay up and won’t protect your bag. Your backpack is already on your shoulders.",
    film: {
      alt: "Looping sequence of the BAGRAIN backpack: close-ups of the shoulder straps and fabric, a passer-by in the rain on a night street, then the hood unfolding out of the bag.",
      pause: "Pause the animation",
      play: "Play the animation",
    },
  },
  intro: {
    kicker: "The bag",
    title: "The solution was already on your back.",
    photoAlt:
      "Two BAGRAIN backpacks seen from the back: hood stowed on the left, hood deployed above the shoulder straps on the right",
    body: "BAGRAIN is an urban and outdoor backpack with a retractable rain hood. Stowed in a dedicated pocket at the top of the bag, it deploys in seconds through a system of straps, hooks and magnets — covering your head and shoulders without ever taking a hand.",
  },
  steps: {
    kicker: "How it works",
    title: "4 moves. And you stay dry.",
    hint: "Keep scrolling — the hood deploys.",
    items: [
      {
        title: "Grab the hooks",
        body: "Two hooks to grab at the top of the bag. The sequence starts here.",
      },
      {
        title: "Pull the hood on",
        body: "Pull the straps in a circular motion: the hood swings over your head.",
      },
      {
        title: "Release the magnets",
        body: "Pull the straps down to release the magnets from their stowed position.",
      },
      {
        title: "Close at the front",
        body: "The magnets snap together and close the hood at the front. Click. You’re covered.",
      },
    ],
    counters: [
      { value: 4, prefix: "", suffix: "", label: "moves" },
      { value: 6, prefix: "", suffix: "", label: "magnets" },
      { value: 5, prefix: "≈", suffix: " s", label: "to get covered" },
    ],
    stageAlt: [
      "Step 1: hood stowed in its top pocket, hooks within reach",
      "Step 2: hood mid-deployment above the bag",
      "Step 3: hood on, lining visible",
      "Step 4: hood closed at the front by the magnets",
    ],
  },
  anatomy: {
    kicker: "Anatomy",
    title: "Every detail earns its place.",
    intro:
      "Developed with the OCCO engineering firm and L’École de Design Nantes Atlantique. Hover or tap the dots to explore.",
    figureAlt:
      "Render of the BAGRAIN bag, three-quarter back and front views, with annotated features",
    hotspots: [
      {
        id: "hood-pocket",
        name: "Hood pocket",
        desc: "Sits at the top of the bag and holds the folded hood — ready to go.",
      },
      {
        id: "straps",
        name: "Opening straps",
        desc: "Two straps deploy the hood in a single motion.",
      },
      {
        id: "cord",
        name: "Elastic cord",
        desc: "Keeps the hood folded and guides it back into its pocket.",
      },
      {
        id: "shoulder",
        name: "Padded shoulder straps",
        desc: "Comfortable even fully loaded. Badge and card pockets built in.",
      },
      {
        id: "trolley",
        name: "Trolley sleeve",
        desc: "Slips over a trolley handle when you travel.",
      },
      {
        id: "foam",
        name: "Back foam pads",
        desc: "Stable carry and a ventilated back on daily commutes.",
      },
      {
        id: "secret",
        name: "Secret pocket",
        desc: "Against your back, classic zip: passport, keys, what you won’t lend.",
      },
      {
        id: "bottle",
        name: "Bottle pockets",
        desc: "Expandable — and perfectly flat when not in use.",
      },
      {
        id: "piping",
        name: "Reflective piping",
        desc: "Black by day, bright at night, along the edges of the bag.",
      },
      {
        id: "fabric",
        name: "Textured fabric",
        desc: "Textured upper section, built for wear and rain.",
      },
      {
        id: "rfid",
        name: "RFID-blocking card pocket",
        desc: "On the strap: your card stays unreadable to scanners.",
      },
      {
        id: "laptop",
        name: "17-inch compartment",
        desc: "254 × 399 mm with shock-absorbing foam: your laptop travels safe.",
      },
    ],
    tableTitle: "Spec sheet",
    specs: [
      ["Hood deployment", "≈ 5 seconds, hands stay free"],
      ["Hood structure", "Rigid peripheral PE plate, 1 mm"],
      ["Folding", "Heat-sealed strips shape the face opening"],
      ["Magnets", "Sewn-in 1.9 kg ×2 · disc 4.3 kg ×4"],
      ["Main pocket", "Classic zip"],
      ["Front pocket", "Invisible zip"],
      ["Secret pocket", "Against the back, classic zip"],
      ["Strap", "Classic badge pocket + RFID-blocking card pocket"],
      ["Laptop", "17 inches — 254 × 399 mm, shock-absorbing foam"],
      ["Visibility", "Reflective black piping on the edges"],
      ["Carry", "Padded straps, back foam pads, trolley sleeve"],
      ["Status", "Patent pending · Registered trademark ®"],
    ],
  },
  usecases: {
    kicker: "When it helps",
    title: "Rain cancels nothing anymore.",
    cards: [
      {
        title: "Head out without thinking",
        line: "The rain starts, the hood comes out, you keep going.",
      },
      {
        title: "Shoot photos, stay outside",
        line: "Both hands for the camera, none for an umbrella.",
      },
      {
        title: "Answer the phone",
        line: "Pick up, type, stay dry — while walking.",
      },
      {
        title: "Lunch, festival, stadium",
        line: "Seated outside, sheltered, hands busy elsewhere.",
      },
    ],
  },
  why: {
    kicker: "Why BAGRAIN",
    title: "A simple idea, carried all the way.",
    items: [
      {
        title: "Innovative",
        body: "A disruptive, universal, versatile product: rain protection built into the thing you already carry.",
      },
      {
        title: "Unmatched",
        body: "No comparable product identified to date. Patent application filed.",
      },
      {
        title: "A community",
        body: "Users and creators bringing the product to life, even before launch.",
      },
      {
        title: "Broad audience",
        body: "Active people from 15 to 65, in the city and in the mountains, whatever the weather.",
      },
      {
        title: "Flexible",
        body: "E-commerce across Europe, Asia and the Americas, sales agents in Europe: distribution adapts.",
      },
      {
        title: "Experienced",
        body: "An international team from the luggage industry, product design and import-export.",
      },
    ],
  },
  team: {
    kicker: "The team",
    title: "Designed in Nantes, made for everywhere.",
    members: [
      { name: "Paul Duteil", role: "Founder & CEO", city: "Vienna, Austria" },
      {
        name: "Stéphane Bembekoff",
        role: "Production & sourcing",
        city: "Hong Kong",
      },
      {
        name: "Olivier Pigasse",
        role: "Product design & art direction",
        city: "Nantes, France",
      },
      {
        name: "Quentin Lebrec",
        role: "Sales & business development",
        city: "Innsbruck, Austria",
      },
      { name: "Benoit Duteil", role: "Incubator", city: "France" },
    ],
    partnersTitle: "Developing the product with us",
    partners: [
      "OCCO Bureau d’études",
      "L’École de Design Nantes Atlantique",
      "SPK Group",
      "RVDB Intellectual Property",
    ],
  },
  salon: {
    kicker: "Trade show",
    title: "See you at the show?",
    body: "The prototype is better tried than described. Stop by the stand: deploy the hood yourself, ask your questions, leave with a direct contact.",
    eventName: "Show name",
    dates: "Dates",
    place: "Location",
    hallStand: "Hall & stand",
    meet: "Book a meeting at the stand",
    meetSubject: "Meeting at the BAGRAIN stand",
    addCal: "Add to calendar",
    icsDescription:
      "Meet BAGRAIN at the stand — the backpack with a built-in hood.",
    photoAlt:
      "BAGRAIN stand set up at a trade show: brand totems, prototype worn on a figure and a demo screen",
    photoNote: "The BAGRAIN stand — prototype to try on site",
  },
  contact: {
    kicker: "Stay in the loop",
    title: "Launch is coming.",
    newsletter: {
      title: "Launch list",
      body: "One email address, and you’ll know before anyone else when BAGRAIN becomes available.",
      emailLabel: "Your email address",
      emailPlaceholder: "name@example.com",
      consent:
        "I agree that BAGRAIN may use my address to keep me informed about the launch. One-click unsubscribe, never sold.",
      submit: "Notify me",
      sending: "Sending…",
      success: "Noted. You’ll be among the first to know.",
      errorInvalid: "Invalid email address — check the format.",
      errorConsent: "Please tick the consent box to continue.",
      errorServer: "Sending failed. Please try again in a moment.",
    },
    pro: {
      title: "Distributors, retailers, press",
      body: "Want to distribute BAGRAIN, try it, or write about it? Drop us a line — we answer fast.",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      company: "Company",
      companyPlaceholder: "Company name",
      country: "Country",
      countryPlaceholder: "France",
      message: "Message",
      messagePlaceholder: "Your request in a few lines…",
      submit: "Send",
      sending: "Sending…",
      success: "Message received. We’ll get back to you shortly.",
      errorRequired: "Name, email and message are needed so we can reply.",
      errorInvalid: "Invalid email address — check the format.",
      errorServer: "Sending failed. Please try again in a moment.",
    },
  },
  footer: {
    baseline: "Keep your hands free and your head dry.",
    navTitle: "Navigation",
    legalTitle: "Legal",
    legal: "Legal notice",
    privacy: "Privacy policy",
    followTitle: "Follow",
    credits:
      "BAGRAIN® — registered trademark · patent pending · Nantes, France · © 2026",
  },
  legal: {
    backHome: "Back to the site",
    mentions: {
      title: "Legal notice",
      blocks: [
        {
          h: "Publisher",
          p: "BAGRAIN — company founded in February 2025 in Nantes, France. [Legal name, legal form, capital, registration number and registered office to be completed before going live.] Publishing director: Paul Duteil.",
        },
        {
          h: "Hosting",
          p: "Site hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA — vercel.com. [Adjust if the host changes; prefer an EU hosting region.]",
        },
        {
          h: "Intellectual property",
          p: "BAGRAIN® is a registered trademark. The product is the subject of a filed patent application. All content on this site (texts, visuals, logo) is protected; any reproduction without permission is prohibited.",
        },
        {
          h: "Contact",
          p: "For any question about this site: see the contact address in the footer.",
        },
      ],
    },
    privacy: {
      title: "Privacy policy",
      blocks: [
        {
          h: "What we collect",
          p: "When you join the launch list, we collect your email address with your explicit consent. When you use the professional form, we collect the information you choose to share (name, email, company, country, message).",
        },
        {
          h: "Why",
          p: "Solely to keep you informed about the BAGRAIN launch and to answer your requests. Your data is never sold or shared for advertising purposes.",
        },
        {
          h: "Retention and hosting",
          p: "Data is kept until the commercial launch and for a maximum of 3 years, on services hosted preferably in the European Union. [Specify the chosen emailing provider before going live.]",
        },
        {
          h: "Your rights",
          p: "Under the GDPR you have the right to access, rectify, object to and delete your data. Every email we send includes a one-click unsubscribe link. To exercise your rights: see the contact address in the footer.",
        },
      ],
    },
  },
};

export const dictionaries: Record<Lang, Dict> = { fr, en };

export const defaultLang: Lang = "fr";
