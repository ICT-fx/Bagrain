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
   * Tant que le domaine n'est pas vérifié dans Resend, l'expéditeur doit
   * rester onboarding@resend.dev, et Resend n'accepte d'écrire qu'à
   * l'adresse du compte : `notifyTo` doit donc être celle-là.
   */
  mail: {
    from: "BAGRAIN <onboarding@resend.dev>",
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
