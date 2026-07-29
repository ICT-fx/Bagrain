/**
 * Configuration centrale du site.
 * TOUT ce qui doit être mis à jour avant impression du QR code est ici :
 * dates du salon, email de contact, réseaux sociaux, URL de production.
 */
export const siteConfig = {
  /** URL de production — à remplacer par le domaine définitif. */
  url: "https://bagrain.example.com",

  /** Email de contact public — À REMPLACER avant mise en ligne. */
  contactEmail: "contact@bagrain.example.com",

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
    confirmed: false,
    name: "Salon professionnel",
    city: "—",
    hall: "—",
    stand: "—",
    /** Format ISO : "2026-09-15T09:00:00+02:00" */
    start: "2026-09-15T09:00:00+02:00",
    end: "2026-09-17T18:00:00+02:00",
    /** Affichage humain des dates, par langue. */
    datesLabel: {
      fr: "Dates à confirmer",
      en: "Dates to be confirmed",
    },
  },
} as const;
