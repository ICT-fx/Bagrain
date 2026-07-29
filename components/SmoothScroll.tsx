"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { easeOutExpo, prefersReducedMotion } from "@/lib/animations";

declare global {
  interface Window {
    // eslint-disable-next-line no-var
    __lenis?: Lenis;
  }
}
export {};

/**
 * Scroll fluide global (Lenis) synchronisé avec ScrollTrigger.
 * Entièrement désactivé en mouvement réduit : le scroll natif reprend la main.
 */
export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: easeOutExpo,
    });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}
