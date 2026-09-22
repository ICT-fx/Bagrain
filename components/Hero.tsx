"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLang } from "@/components/LangProvider";
import RainCanvas from "@/components/RainCanvas";
import Button from "@/components/ui/Button";
import Lines from "@/components/ui/Lines";
import Reveal from "@/components/ui/Reveal";
import { scrollToAnchor } from "@/lib/scroll";
import { prefersReducedMotion } from "@/lib/animations";
import { BAG_IMAGE, BAG_TOP_EDGE } from "@/lib/bag-silhouette";

/**
 * Hero plein écran : pluie sur tout le cadre, et le sac — détouré, en grand
 * à droite — l'arrête pour de bon. Rien n'est dessiné derrière lui : la zone
 * sèche épouse la silhouette de la capuche, la démonstration se suffit.
 *
 * La séquence d'entrée est en CSS pur (classes .enter / .enter-lines) :
 * le texte est peint dès l'arrivée du HTML, sans attendre l'hydratation.
 * Le script inline du layout pose .intro-done si la séquence a déjà été
 * vue dans la session, ce qui supprime la cascade de délais.
 */
export default function Hero() {
  const { t } = useLang();
  const productRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  // Partagé avec la pluie : l'abri doit suivre le sac au pixel près.
  const parallaxOffset = useRef({ x: 0, y: 0 });

  // Parallaxe souris ±8px sur le produit (desktop, mouvement autorisé).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    const el = parallaxRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        parallaxOffset.current.x = nx * 16;
        parallaxOffset.current.y = ny * 16;
        el.style.transform = `translate(${nx * 16}px, ${ny * 16}px)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToAnchor(hash);
    history.replaceState(null, "", hash);
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-ink supports-[min-height:100svh]:min-h-[100svh]"
    >
      <RainCanvas
        shelterRef={productRef}
        profile={BAG_TOP_EDGE}
        offsetRef={parallaxOffset}
      />

      {/* Voile pour la lisibilité du titre sur la pluie */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 28% 45%, rgba(7,14,42,0.55) 0%, rgba(7,14,42,0.2) 55%, transparent 100%)",
        }}
      />

      <div className="container-site relative z-10 flex flex-1 items-center pb-20 pt-[calc(var(--nav-h)+16px)] sm:pt-[calc(var(--nav-h)+24px)]">
        <div className="grid w-full items-center gap-8 sm:gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* Texte */}
          <div>
            <Reveal onLoad delay={350}>
              <p className="mono-label kicker text-haze">{t.hero.kicker}</p>
            </Reveal>
            <Lines
              onLoad
              as="h1"
              lines={t.hero.titleLines}
              delay={500}
              className="hero-title mt-6 text-mist"
            />
            <Reveal onLoad delay={850}>
              <p className="mt-5 max-w-[52ch] text-pretty text-mist/80 sm:mt-7">
                {t.hero.sub}
              </p>
            </Reveal>
            <Reveal onLoad delay={1000}>
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
                <Button href="#sac" onClick={go("#sac")}>
                  {t.hero.ctaPrimary}
                </Button>
                <Button href="#salon" onClick={go("#salon")} variant="ghost">
                  {t.hero.ctaSecondary}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Le sac, seul, en lévitation. Sur grand écran c'est la hauteur
              du viewport qui plafonne sa taille — à 0,771 de ratio, un sac
              large devient vite plus haut que le hero. */}
          <Reveal
            onLoad
            delay={650}
            className="relative w-full max-w-[min(100%,240px)] justify-self-center sm:max-w-[min(100%,340px)] lg:max-w-[min(520px,calc(72svh*0.771))] lg:justify-self-end"
          >
            <div ref={parallaxRef} className="will-change-transform">
              <div className="floaty">
                <div ref={productRef} className="relative">
                  <Image
                    src="/img/sac-hero-capuche-repliee.webp"
                    alt={t.hero.imgAlt}
                    width={BAG_IMAGE.width}
                    height={BAG_IMAGE.height}
                    priority
                    quality={90}
                    sizes="(min-width: 1024px) 560px, (min-width: 640px) 60vw, 80vw"
                    className="h-auto w-full drop-shadow-[0_36px_60px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <Reveal onLoad delay={1200} className="flex flex-col items-center gap-3">
          <span className="mono-label text-mist/60">{t.hero.scroll}</span>
          <span className="scroll-line" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}
