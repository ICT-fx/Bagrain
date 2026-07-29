/**
 * Easings et durées partagés — une seule source de vérité
 * pour que tout le site respire au même rythme.
 */

export const EASE_OUT_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
export const EASE_MAGNET = "cubic-bezier(0.34, 1.56, 0.64, 1)";

/** Fonction équivalente pour Lenis / GSAP (expo.out). */
export const easeOutExpo = (t: number): number =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

export const DURATION = {
  reveal: 0.7,
  line: 0.8,
  counter: 1.2,
  microDelay: 0.09,
} as const;

/** Détection SSR-safe du mode mouvement réduit. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
