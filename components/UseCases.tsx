"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/components/LangProvider";
import Reveal from "@/components/ui/Reveal";
import Lines from "@/components/ui/Lines";
import { prefersReducedMotion } from "@/lib/animations";

/** Quatre cartes en dôme, cascade 80 ms, légère parallaxe verticale. */
export default function UseCases() {
  const { t } = useLang();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const grid = gridRef.current;
    if (!grid) return;
    gsap.registerPlugin(ScrollTrigger);
    /*
     * On anime les <article> internes, pas les wrappers .reveal : ceux-ci
     * portent une transition CSS sur transform, que chaque écriture de
     * ScrollTrigger relancerait — parallaxe en retard et animation
     * d'entrée écrasée.
     */
    const cards = Array.from(grid.children)
      .map((wrapper) => wrapper.firstElementChild)
      .filter((el): el is Element => el !== null);
    // Amplitude réduite sur les cartes compactes du téléphone : ±24px sur
    // une vignette de 160px de haut se lit comme un tremblement, pas une
    // parallaxe.
    const amp = window.innerWidth < 640 ? 0.4 : 1;
    const tweens = cards.map((card, i) =>
      gsap.fromTo(
        card,
        { y: (i % 2 === 0 ? 24 : -16) * amp },
        {
          y: (i % 2 === 0 ? -24 : 16) * amp,
          ease: "none",
          scrollTrigger: {
            trigger: grid,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      ),
    );
    return () =>
      tweens.forEach((tw) => {
        tw.scrollTrigger?.kill();
        tw.kill();
      });
  }, []);

  return (
    <section id="usages" className="section-pad bg-ink">
      <div className="container-site">
        <Reveal>
          <p className="mono-label text-haze">{t.usecases.kicker}</p>
        </Reveal>
        <Lines
          as="h2"
          lines={[t.usecases.title]}
          className="display-l mt-6 max-w-[16ch] text-balance text-mist"
        />

        {/* Deux colonnes dès le téléphone : empilées, les quatre cartes en
            dôme faisaient à elles seules plus d'un écran et demi. */}
        <div
          ref={gridRef}
          className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4"
        >
          {t.usecases.cards.map((card, i) => (
            <Reveal key={i} delay={i * 80} className="h-full">
              <article className="card-hover dome flex h-full min-h-[168px] flex-col justify-end border border-[rgba(242,245,251,0.1)] bg-ink-2 p-4 pt-11 sm:min-h-[240px] sm:p-6 sm:pt-14">
                <h3 className="heading-3 text-mist">{card.title}</h3>
                <p className="mt-2 text-[14px] leading-snug text-mist/65 sm:mt-3 sm:text-[15px] sm:leading-normal">
                  {card.line}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
