"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/components/LangProvider";
import Counter from "@/components/ui/Counter";
import LoopFilm from "@/components/ui/LoopFilm";
import Reveal from "@/components/ui/Reveal";
import { prefersReducedMotion } from "@/lib/animations";

/**
 * Le morceau de bravoure : section sticky.
 * À droite, le film du sac tourne en boucle ; à gauche, le scroll allume
 * les 3 étapes l'une après l'autre. En mouvement réduit : liste verticale
 * classique, film à l'arrêt sur sa première image.
 */
const STEP_COUNT = 3;

/** Film vertical 720×1280, 30 s, sans piste audio, encodé à 1,2 Mb/s. */
const FILM = {
  src: "/video/capuche-deploiement.mp4",
  poster: "/img/capuche-deploiement-poster.webp",
  width: 720,
  height: 1280,
};

export default function HoodSequence() {
  const { t } = useLang();
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reduced !== false) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    gsap.registerPlugin(ScrollTrigger);

    let current = 0;
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      onToggle: (self) => {
        // La jauge n'existe que pendant l'épinglage : elle apparaît au
        // moment précis où la page « se fige » et disparaît à la sortie.
        if (barRef.current) barRef.current.style.opacity = self.isActive ? "1" : "0";
      },
      onUpdate: (self) => {
        const p = self.progress;
        if (fillRef.current) {
          fillRef.current.style.transform = `scaleX(${p})`;
        }
        const step = Math.min(STEP_COUNT - 1, Math.floor(p * STEP_COUNT));
        if (step !== current) {
          current = step;
          setActiveStep(step);
        }
      },
    });
    return () => st.kill();
  }, [reduced]);

  const steps = t.steps.items;

  /* ——— Repli mouvement réduit : liste verticale, film à côté ——— */
  if (reduced === true) {
    return (
      <section id="solution" className="section-pad bg-ink">
        <div className="container-site">
          <p className="mono-label kicker text-haze">{t.steps.kicker}</p>
          <h2 className="display-l mt-6 max-w-[20ch] text-mist">
            {t.steps.title}
          </h2>
          <div className="mt-8 grid items-center gap-10 sm:mt-12 md:grid-cols-[1fr_320px] md:gap-12">
            <ol className="grid gap-8 sm:gap-12">
              {steps.map((step, i) => (
                <li key={i}>
                  <p className="mono-label text-bagrain">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="heading-3 mt-3 text-mist">{step.title}</h3>
                  <p className="mt-3 max-w-[46ch] text-mist/70">{step.body}</p>
                </li>
              ))}
            </ol>
            <HoodFilm className="mx-auto aspect-[9/16] w-full max-w-[280px] md:max-w-none" />
          </div>
          <CountersRow />
        </div>
      </section>
    );
  }

  return (
    <section id="solution" className="bg-ink">
      {/*
       * Jauge de séquence, collée sous la nav. Le scroll est capté par la
       * section pendant 400vh : sans repère, l'arrêt de la page se lit comme
       * un blocage. Les deux encoches marquent les changements d'étape.
       */}
      <div
        ref={barRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 z-[45] opacity-0 transition-opacity duration-500"
        style={{ top: "var(--nav-h)" }}
      >
        <div className="relative h-[3px] w-full bg-[rgba(242,245,251,0.14)]">
          <div
            ref={fillRef}
            className="h-full w-full origin-left bg-bagrain"
            style={{ transform: "scaleX(0)" }}
          />
          {[1 / 3, 2 / 3].map((p) => (
            <span
              key={p}
              className="absolute top-0 h-full w-[3px] -translate-x-1/2 bg-ink"
              style={{ left: `${p * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* L'épinglage capte le scroll : à 400vh la séquence coûtait trois
          écrans pleins, le poste le plus lourd de la page. À 340vh il reste
          85vh par étape — la lecture tient, la page raccourcit d'un demi
          écran. La progression est calculée sur la course, pas sur la
          hauteur : ce réglage est libre. */}
      <div ref={wrapRef} className="relative h-[300vh] md:h-[340vh]">
        <div className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden supports-[height:100svh]:h-[100svh]">
          <div className="container-site flex min-h-0 flex-1 flex-col pt-[calc(var(--nav-h)+8px)] lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-12">
            {/* Étapes */}
            <div className="order-2 pb-6 lg:order-1 lg:pb-0">
              <p className="mono-label kicker hidden text-haze lg:block">
                {t.steps.kicker}
              </p>
              {/* sr-only sous lg : le titre reste dans l'arbre
                  d'accessibilité même quand la mise en page le masque. */}
              <h2 className="heading-2 mt-3 max-w-[18ch] text-mist sr-only lg:not-sr-only lg:block">
                {t.steps.title}
              </h2>
              <ol className="mt-2 flex flex-col gap-3 lg:mt-10 lg:gap-6">
                {steps.map((step, i) => {
                  const active = activeStep === i;
                  return (
                    <li
                      key={i}
                      className={`flex items-baseline gap-4 transition-opacity duration-500 ${
                        active ? "opacity-100" : "opacity-35"
                      }`}
                      aria-current={active ? "step" : undefined}
                    >
                      <span
                        className={`mono-label transition-colors duration-300 ${
                          active ? "text-bagrain" : "text-mist/50"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="heading-3 flex items-center gap-3 text-mist">
                          {step.title}
                          {i === steps.length - 1 && (
                            <span
                              aria-hidden="true"
                              className={`inline-flex items-center gap-[14px] ${
                                active ? "magnets-on" : ""
                              }`}
                            >
                              <span className="magnet-dot magnet-dot-l h-[7px] w-[7px] rounded-full bg-[#d8dce3]" />
                              <span className="magnet-dot magnet-dot-r h-[7px] w-[7px] rounded-full bg-[#d8dce3]" />
                            </span>
                          )}
                        </h3>
                        <p
                          className={`mt-1 max-w-[44ch] text-[15px] text-mist/70 transition-[max-height,opacity] lg:text-base ${
                            active ? "" : "hidden lg:block"
                          }`}
                        >
                          {step.body}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Film vertical : sa hauteur suit l'écran, la largeur découle
                du format 9:16. */}
            <div className="relative order-1 min-h-0 flex-1 lg:order-2 lg:h-[78vh] lg:flex-none">
              <div className="absolute inset-0 flex items-center justify-center pb-4 lg:pb-0">
                <HoodFilm className="aspect-[9/16] h-full max-h-[74vh] max-w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-site">
        <CountersRow />
      </div>
    </section>
  );
}

function HoodFilm({ className }: { className: string }) {
  const { t } = useLang();
  return (
    <LoopFilm
      {...FILM}
      alt={t.steps.film.alt}
      playLabel={t.steps.film.play}
      pauseLabel={t.steps.film.pause}
      className={className}
    />
  );
}

function CountersRow() {
  const { t } = useLang();
  return (
    <Reveal className="mt-4 pb-12 sm:pb-16 lg:pb-20">
      <div className="hairline-t grid grid-cols-3 gap-4 pt-8 sm:gap-6 sm:pt-10">
        {t.steps.counters.map((c, i) => (
          <div key={i} className="text-center">
            <p className="display-l text-mist">
              <Counter
                value={c.value as number}
                prefix={c.prefix as string}
              />
              {/* Unité en retrait du chiffre : « 5 secondes » tient sur la
                  largeur d'une colonne, même sur téléphone. */}
              {c.suffix && (
                <span className="ml-[0.2em] text-[0.4em] tracking-normal">
                  {(c.suffix as string).trim()}
                </span>
              )}
            </p>
            <p className="mono-label mt-2 text-mist/50">{c.label}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
