/**
 * Configuration centrale du site.
 * TOUT ce qui doit être mis à jour avant impression du QR code est ici :
 * dates du salon, email de contact, réseaux sociaux, URL de production.
 */
export const siteConfig = {
  /** URL de production : sert aux liens absolus, au sitemap et aux partages. */
  url: "https://bagrain.fr",

  /**
   * Email de contact public, affiché en pied de page (les mentions légales
   * et la politique de confidentialité y renvoient).
   * Provisoire : passer à contact@<domaine> une fois le domaine acheté.
   */
  contactEmail: "l.bembekoff@gmail.com",

  /**
   * Emails envoyés par le site via Resend (formulaires).
   * `from` doit rester une adresse du domaine vérifié dans Resend.
   */
  mail: {
    from: "BAGRAIN <contact@bagrain.fr>",
    notifyTo: "l.bembekoff@gmail.com",
  },

  /** Réseaux sociaux — laisser vide ("") pour masquer le lien. */
  socials: {
    linkedin: "",
    instagram: "",
  },

  /**
   * Salon professionnel — À COMPLÉTER avant impression du QR code.
   * Tant que `confirmed` est false, le site affiche « dates à confirmer ».
   */
  event: {
    confirmed: true,
    name: "ISPO",
    city: "Amsterdam, RAI",
    hall: "BrandNew",
    stand: "BNB24",
    /** Format ISO : "2026-09-15T09:00:00+02:00" */
    start: "2026-11-04T09:00:00+01:00",
    end: "2026-11-05T17:00:00+01:00",
    /**
     * Page de réservation Calendly (créneaux limités aux jours du salon).
     * Le bouton « Prendre rendez-vous » disparaît après `end`.
     */
    bookingUrl: "https://calendly.com/l-bembekoff/bagrain-ispo",
    /** Affichage humain des dates, par langue. */
    datesLabel: {
      fr: "Dates à confirmer",
      en: "Dates to be confirmed",
    },
  },
} as const;
