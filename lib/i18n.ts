/**
 * Dictionnaire bilingue FR / EN.
 * Aucune chaîne en dur dans les composants : tout passe par ici.
 */

export type Lang = "fr" | "en";

const fr = {
  meta: {
    title: "BAGRAIN® — Le sac à dos à capuche intégrée",
    description:
      "Un sac à dos avec une capuche de pluie intégrée qui se déploie en quelques secondes. Garde les mains libres et la tête au sec. Conçu à Nantes, brevet français.",
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
    kicker: "BAGRAIN® — brevet français",
    titleLines: ["Garde les mains libres,", "et la tête au sec."],
    sub: "Une nouvelle solution intégrée au sac pour te protéger de la pluie et continuer tes activités, sans jamais te ralentir. La capuche se déploie en quelques secondes et couvre ta tête tout en gardant tes mains libres.",
    ctaPrimary: "Voir le sac",
    ctaSecondary: "Nous rencontrer au salon",
    scroll: "Défiler",
    imgAlt:
      "Sac à dos BAGRAIN vu de face : logo bleu sur le tissu gris, poche avant noire et capuche de pluie repliée en arceau au-dessus du sac",
  },
  problem: {
    kicker: "Le problème",
    title: "La pluie nous ralentit.",
    body: "Un parapluie occupe une main, se retourne au vent, dégouline dans le métro et s’oublie sur une table. Une capuche de manteau ne tient pas et ne protège pas le sac. Le sac à dos est déjà sur tes épaules.",
    film: {
      alt: "Séquence en boucle du sac BAGRAIN : gros plans sur les bretelles et le tissu, un passant sous la pluie dans une rue de nuit, puis la capuche qui se déploie hors du sac.",
      pause: "Mettre l’animation en pause",
      play: "Lire l’animation",
    },
  },
  intro: {
    kicker: "Le sac",
    title: "La solution est déjà sur ton dos.",
    wornAlt:
      "Une femme vue de dos sur une passerelle mouillée en ville, le sac BAGRAIN sur les épaules, logo bleu bien visible et capuche repliée",
    body: "BAGRAIN est un sac à dos urbain & outdoor doté d’une capuche. Rangée dans un compartiment adapté en haut du sac, elle se déploie par un tirage de sangles et d’attaches aimantées. Elle protège la tête en laissant les mains libres.",
  },
  steps: {
    kicker: "Comment ça marche",
    title: "3 étapes pour être au sec",
    hint: "Continue à défiler — la capuche se déploie.",
    items: [
      {
        title: "Tire les sangles vers le haut",
        body: "2 sangles magnétisées sur les bretelles du sac.",
      },
      {
        title: "Déploie la capuche",
        body: "La capuche vient se déposer au-dessus de ta tête pour te protéger.",
      },
      {
        title: "La capuche se ferme sur l’avant",
        body: "Les aimants se rejoignent et ferment la capuche sur l’avant. Tu es couvert.",
      },
    ],
    counters: [
      { value: 3, prefix: "", suffix: "", label: "étapes" },
      { value: 3, prefix: "", suffix: "", label: "paires d’aimants" },
      { value: 3, prefix: "", suffix: " secondes", label: "pour se couvrir" },
    ],
    stageAlt: [
      "Étape 1 : la main passe par-dessus l’épaule et tire les sangles vers le haut, capuche encore rangée",
      "Étape 2 : la capuche sort du sac et se dépose au-dessus de la tête, les aimants se libèrent",
      "Étape 3 : la main réunit les aimants sous le menton, la capuche est fermée sur l’avant",
    ],
  },
  anatomy: {
    kicker: "Anatomie",
    title: "Le souci du détail",
    intro:
      "Développé avec le bureau d’études OCCO et L’École de Design Nantes Atlantique.\nClique pour explorer.",
    shotAlt: [
      "Un homme sous la pluie en ville, la capuche BAGRAIN déployée sur la tête, téléphone et café en main",
      "Le sac BAGRAIN vu de face sur fond blanc, capuche repliée en arceau au-dessus du sac, logo bleu sur le tissu gris",
      "Rendu du sac vu de dos : bretelles rembourrées, mousses dorsales, passant valise et boucle de portage",
    ],
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
        desc: "Deux sangles pour déployer la capuche d’un seul geste.",
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
        desc: "Glisse le sac sur la poignée d’un trolley en déplacement.",
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
        name: "Poches bouteille",
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
        name: "Poche à carte anti-RFID",
        desc: "Sur la bretelle : ta carte reste illisible pour les scanners.",
      },
      {
        id: "laptop",
        name: "Compartiment 17 pouces",
        desc: "254 × 399 mm, mousses anti-chocs : l’ordinateur voyage protégé.",
      },
    ],
    tableTitle: "Fiche technique",
    tableNote: ["Protection intellectuelle", "Breveté · Marque déposée ®"],
    // Deux blocs thématiques, un par colonne : SAC à gauche, CAPUCHE à droite
    // (empilés dans cet ordre sur mobile).
    specGroups: [
      {
        title: "Sac",
        rows: [
          ["Poche ordinateur", "Compatible 17 pouces, fond anti-chocs"],
          ["Poche principale", "Zip étanche"],
          ["Poche frontale", "Zip étanche dissimulé"],
          ["Poche secrète", "Contre le dos, zip classique, inaccessible sac porté"],
          ["Poches bretelles", "Poche à carte anti-RFID + poche à badge"],
          ["Portage", "Bretelles aérées, dos ventilé ergonomique, passant valise"],
        ],
      },
      {
        title: "Capuche",
        rows: [
          ["Déploiement", "En 3 secondes"],
          ["Structure", "Armature PE (polyéthylène) 1 mm"],
          ["Maintien de forme", "Bandes thermosoudées guidant la forme du tour de visage"],
          ["Aimants", "6 aimants néodyme · 1,9 à 4,3 kg de force d’adhérence"],
          ["Visibilité", "Bandes réfléchissantes"],
        ],
      },
    ],
  },
  usecases: {
    kicker: "Pourquoi BAGRAIN ?",
    title: "Être mobile partout, même sous la pluie",
    cards: [
      {
        title: "Se sentir mieux protégé",
        line: "La pluie commence, tu as une protection facile à ta disposition, grâce au BAGRAIN.",
      },
      {
        title: "Photographier sans inconvénient",
        line: "Prendre des photos confortablement, sans être gêné par la pluie.",
      },
      {
        title: "Garder ses mains pour répondre au téléphone",
        line: "Décrocher, écrire en marchant et au sec.",
      },
      {
        title: "Mieux profiter des événements et du quotidien",
        line: "Faire des gestes simples avec moins de contraintes.",
      },
    ],
  },
  team: {
    kicker: "L’équipe",
    title: "Que des passionnés !",
    members: [
      { name: "Lola Bembekoff", role: "Project Manager", city: "Annecy, France" },
      {
        name: "Stéphane Bembekoff",
        role: "Sourcing & Production",
        city: "Hong Kong",
      },
      {
        name: "Olivier Pigasse",
        role: "Design & Développement Produit",
        city: "Nantes, France",
      },
      {
        name: "Quentin Lebrec",
        role: "Ventes & Développement Commercial",
        city: "Lausanne, Suisse",
      },
      { name: "Paul Duteil", role: "CEO & Management", city: "Vienne, Autriche" },
      { name: "Hippolyte Langlois", role: "Project Contributor", city: "Angers, France" },
    ],
    partnersTitle: "Ils développent le produit avec nous",
    partners: [
      { name: "MEPCO — Incubation & business support", note: "Benoît Duteil, dirigeant" },
      { name: "OCCO Bureau d’études", note: "" },
      { name: "L’École de Design Nantes Atlantique", note: "" },
      { name: "SPK Group", note: "" },
      { name: "RVDB Intellectual Property", note: "" },
      { name: "Bpifrance", note: "" },
    ],
  },
  salon: {
    kicker: "Salon",
    title: "RDV à ISPO",
    body: "Un prototype s’essaie mieux qu’il ne se raconte.\nPasse sur le stand : déploie la capuche toi-même, pose-nous tes questions !",
    eventName: "Nom du salon",
    dates: "Dates",
    place: "Lieu",
    hallStand: "Hall & stand",
    meet: "Prendre rendez-vous sur le stand",
    addCal: "Ajouter au calendrier",
    icsDescription:
      "Rencontrez BAGRAIN sur son stand — le sac à dos à capuche intégrée.",
    photoAlt:
      "Le stand BAGRAIN à ISPO Amsterdam : mannequin portant le sac capuche déployée, sac posé sur le comptoir et kakémono de présentation",
    photoNote: "Le stand BAGRAIN : produit à essayer sur place",
  },
  contact: {
    kicker: "Rester au courant",
    title: "Lancement en approche",
    newsletter: {
      title: "Liste de lancement",
      body: "Une adresse email, et tu sauras avant tout le monde quand BAGRAIN sera disponible.",
      emailLabel: "Ton adresse email",
      emailPlaceholder: "prenom@exemple.fr",
      consent:
        "J’accepte que BAGRAIN utilise mon adresse pour m’informer du lancement. Désinscription en un clic, jamais de revente.",
      submit: "Me prévenir",
      sending: "Envoi en cours…",
      success: "C’est noté. Tu seras parmi les premiers prévenus.",
      errorInvalid: "Adresse email invalide — vérifie le format.",
      errorConsent: "Coche la case de consentement pour continuer.",
      errorServer: "L’envoi a échoué. Réessaie dans un instant.",
    },
    pro: {
      title: "Distributeurs, revendeurs, presse",
      body: "Tu veux distribuer BAGRAIN, l’essayer, en parler ? Écris-nous, on répond vite.",
      name: "Nom",
      namePlaceholder: "Ton nom",
      email: "Email",
      emailPlaceholder: "toi@societe.com",
      company: "Société",
      companyPlaceholder: "Nom de la société",
      country: "Pays",
      countryPlaceholder: "France",
      message: "Message",
      messagePlaceholder: "Ta demande en quelques lignes…",
      submit: "Envoyer",
      sending: "Envoi en cours…",
      success: "Message reçu. On revient vers toi rapidement.",
      errorRequired: "Nom, email et message sont nécessaires pour te répondre.",
      errorInvalid: "Adresse email invalide — vérifie le format.",
      errorServer: "L’envoi a échoué. Réessaie dans un instant.",
    },
  },
  footer: {
    baseline: "Garde les mains libres, et la tête au sec.",
    navTitle: "Navigation",
    legalTitle: "Légal",
    legal: "Mentions légales",
    privacy: "Politique de confidentialité",
    followTitle: "Suivre",
    credits:
      "BAGRAIN® — marque déposée · brevet français · Nantes, France · © 2026",
  },
  legal: {
    backHome: "Retour au site",
    mentions: {
      title: "Mentions légales",
      blocks: [
        {
          h: "Éditeur",
          p: "BAGRAIN, société par actions simplifiée au capital de 65 000 €, immatriculée au RCS de Nantes sous le numéro 940 333 925. Siège social : 1 rue du Fondeur, 44800 Saint-Herblain, France. N° TVA intracommunautaire : FR63 940 333 925. Directeur de la publication : Paul Duteil.",
        },
        {
          h: "Hébergement",
          p: "Site hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — vercel.com.",
        },
        {
          h: "Propriété intellectuelle",
          p: "BAGRAIN® est une marque déposée. Le produit est protégé par un brevet français. L’ensemble des contenus de ce site (textes, visuels, logo) est protégé ; toute reproduction sans autorisation est interdite.",
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
          h: "Prise de rendez-vous",
          p: "La réservation d’un rendez-vous sur notre stand passe par Calendly (Calendly LLC), qui recueille les informations saisies (nom, email, société, fonction, téléphone) pour organiser la rencontre. Voir la politique de confidentialité de Calendly : calendly.com/privacy.",
        },
        {
          h: "Durée et hébergement",
          p: "Les données sont conservées jusqu’au lancement commercial puis au maximum 3 ans, sur des services hébergés de préférence dans l’Union européenne. Les adresses et messages sont traités par Resend (Resend, Inc., États-Unis), notre prestataire d’envoi d’emails.",
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
      "A backpack with a built-in rain hood that deploys in seconds. Keep your hands free and your head dry. Designed in Nantes, French patent granted.",
  },
  a11y: {
    skip: "Skip to content",
    langSwitch: "Switch language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "BAGRAIN — back to home",
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
    kicker: "BAGRAIN® — French patent",
    titleLines: ["Keep your hands free,", "and your head dry."],
    sub: "A new solution integrated into your backpack to protect you from the rain and keep you moving, without ever slowing you down. The hood deploys in seconds, covering your head while keeping your hands free.",
    ctaPrimary: "See the bag",
    ctaSecondary: "Meet us at the show",
    scroll: "Scroll",
    imgAlt:
      "BAGRAIN backpack seen from the front: blue logo on grey fabric, black front pocket and rain hood folded as an arch over the top of the bag",
  },
  problem: {
    kicker: "The problem",
    title: "Rain slows us down.",
    body: "An umbrella takes a hand, flips in the wind, drips on the metro and gets left on a table. A coat hood won’t stay up and won’t protect your bag. The backpack is already on your shoulders.",
    film: {
      alt: "Looping sequence of the BAGRAIN backpack: close-ups of the shoulder straps and fabric, a passer-by in the rain on a night street, then the hood unfolding out of the bag.",
      pause: "Pause the animation",
      play: "Play the animation",
    },
  },
  intro: {
    kicker: "The bag",
    title: "The solution is already on your back.",
    wornAlt:
      "A woman seen from behind on a wet city footbridge, wearing the BAGRAIN backpack, blue logo clearly visible and hood folded",
    body: "BAGRAIN is an urban & outdoor backpack with an integrated hood. Stored in a dedicated compartment at the top of the backpack, the hood deploys in seconds using straps and magnetic fasteners. It protects your head while keeping your hands free.",
  },
  steps: {
    kicker: "How it works",
    title: "3 steps to stay dry",
    hint: "Keep scrolling — the hood deploys.",
    items: [
      {
        title: "Pull the straps up",
        body: "2 magnetic straps on the bag’s shoulder straps.",
      },
      {
        title: "Deploy the hood",
        body: "The hood settles over your head to protect you.",
      },
      {
        title: "The hood closes at the front",
        body: "The magnets snap together and close the hood at the front. You are covered.",
      },
    ],
    counters: [
      { value: 3, prefix: "", suffix: "", label: "steps" },
      { value: 3, prefix: "", suffix: "", label: "pairs of magnets" },
      { value: 3, prefix: "", suffix: " seconds", label: "to get covered" },
    ],
    stageAlt: [
      "Step 1: the hand reaches over the shoulder and pulls the straps up, hood still stowed",
      "Step 2: the hood comes out of the bag and settles over the head, the magnets are released",
      "Step 3: the hand brings the magnets together under the chin, hood closed at the front",
    ],
  },
  anatomy: {
    kicker: "Anatomy",
    title: "Attention to detail",
    intro:
      "Developed with OCCO design office and L’École de Design Nantes Atlantique.\nClick to explore.",
    shotAlt: [
      "A man in the rain in the city, the BAGRAIN hood deployed over the head, phone and coffee in hand",
      "The BAGRAIN backpack seen from the front on a white background, hood folded in an arc above the bag, blue logo on grey fabric",
      "Render of the bag from the back: padded shoulder straps, back foam panels, suitcase strap and carry loop",
    ],
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
    tableNote: ["Intellectual property", "Patented · Registered trademark ®"],
    specGroups: [
      {
        title: "Bag",
        rows: [
          ["Laptop pocket", "Fits 17-inch laptops, shock-absorbing base"],
          ["Main pocket", "Waterproof zip"],
          ["Front pocket", "Concealed waterproof zip"],
          ["Secret pocket", "Against the back, classic zip, out of reach when worn"],
          ["Strap pockets", "RFID-blocking card pocket + badge pocket"],
          ["Carry", "Breathable shoulder straps, ergonomic ventilated back panel, suitcase loop"],
        ],
      },
      {
        title: "Hood",
        rows: [
          ["Deployment", "In 3 seconds"],
          ["Structure", "PE (polyethylene) frame, 1 mm"],
          ["Shape retention", "Heat-sealed strips that help maintain the shape of the face contour"],
          ["Magnets", "6 neodymium magnets · 1.9 to 4.3 kg holding force"],
          ["Visibility", "Reflective strips"],
        ],
      },
    ],
  },
  usecases: {
    kicker: "Why BAGRAIN?",
    title: "Stay on the move everywhere, even in the rain",
    cards: [
      {
        title: "Feel better protected",
        line: "The rain starts, and easy protection is right at hand, thanks to BAGRAIN.",
      },
      {
        title: "Take photos, hassle-free",
        line: "Shoot comfortably, without the rain getting in the way.",
      },
      {
        title: "Keep your hands free to take calls",
        line: "Pick up, write while walking, and stay dry.",
      },
      {
        title: "Make the most of events and everyday life",
        line: "Simple everyday moves, with fewer constraints.",
      },
    ],
  },
  team: {
    kicker: "The team",
    title: "Nothing but enthusiasts!",
    members: [
      { name: "Lola Bembekoff", role: "Project Manager", city: "Annecy, France" },
      {
        name: "Stéphane Bembekoff",
        role: "Sourcing & Production",
        city: "Hong Kong",
      },
      {
        name: "Olivier Pigasse",
        role: "Product Design & Development",
        city: "Nantes, France",
      },
      {
        name: "Quentin Lebrec",
        role: "Sales & Business Development",
        city: "Lausanne, Switzerland",
      },
      { name: "Paul Duteil", role: "CEO & Management", city: "Vienna, Austria" },
      { name: "Hippolyte Langlois", role: "Project Contributor", city: "Angers, France" },
    ],
    partnersTitle: "They are developing the product with us",
    partners: [
      { name: "MEPCO — Incubation & business support", note: "Benoît Duteil, director" },
      { name: "OCCO Bureau d’études", note: "" },
      { name: "L’École de Design Nantes Atlantique", note: "" },
      { name: "SPK Group", note: "" },
      { name: "RVDB Intellectual Property", note: "" },
      { name: "Bpifrance", note: "" },
    ],
  },
  salon: {
    kicker: "Trade show",
    title: "Meet us at ISPO",
    body: "A prototype is better experienced than explained.\nStop by our booth: deploy the hood yourself and ask us anything!",
    eventName: "Show name",
    dates: "Dates",
    place: "Location",
    hallStand: "Hall & stand",
    meet: "Book a meeting at the stand",
    addCal: "Add to calendar",
    icsDescription:
      "Meet BAGRAIN at the stand — the backpack with a built-in hood.",
    photoAlt:
      "The BAGRAIN stand at ISPO Amsterdam: a mannequin wearing the bag with the hood up, a bag on the counter and a presentation roll-up",
    photoNote: "The BAGRAIN stand: product to try on site",
  },
  contact: {
    kicker: "Stay in the loop",
    title: "Launch approaching",
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
      body: "Want to distribute BAGRAIN, try it, or write about it? Drop us a line, we answer fast.",
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
      "BAGRAIN® — registered trademark · French patent · Nantes, France · © 2026",
  },
  legal: {
    backHome: "Back to the site",
    mentions: {
      title: "Legal notice",
      blocks: [
        {
          h: "Publisher",
          p: "BAGRAIN, a French société par actions simplifiée (simplified joint-stock company) with a share capital of €65,000, registered with the Nantes Trade and Companies Register under number 940 333 925. Registered office: 1 rue du Fondeur, 44800 Saint-Herblain, France. VAT number: FR63 940 333 925. Publishing director: Paul Duteil.",
        },
        {
          h: "Hosting",
          p: "Site hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA — vercel.com.",
        },
        {
          h: "Intellectual property",
          p: "BAGRAIN® is a registered trademark. The product is protected by a French patent. All content on this site (texts, visuals, logo) is protected; any reproduction without permission is prohibited.",
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
          h: "Booking a meeting",
          p: "Meetings at our stand are booked through Calendly (Calendly LLC), which collects the details you enter (name, email, company, job title, phone) to organise the meeting. See Calendly’s privacy policy: calendly.com/privacy.",
        },
        {
          h: "Retention and hosting",
          p: "Data is kept until the commercial launch and for a maximum of 3 years, on services hosted preferably in the European Union. Addresses and messages are processed by Resend (Resend, Inc., USA), our email delivery provider.",
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
