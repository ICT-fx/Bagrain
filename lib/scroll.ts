/**
 * Défilement vers une ancre — fluide si Lenis est monté, natif sinon.
 * Volontairement sans import de Lenis/GSAP : ce module est chargé par la
 * navigation (chemin critique), les librairies d'animation ne le sont pas.
 */
export function scrollToAnchor(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  const lenis = window.__lenis;
  if (lenis) {
    // Pas d'offset ici : Lenis soustrait déjà le scroll-padding-top de
    // <html> (hauteur de nav + 16px), comme le fait scrollIntoView.
    lenis.scrollTo(el as HTMLElement);
  } else {
    (el as HTMLElement).scrollIntoView({ behavior: "auto", block: "start" });
  }
}
