"use client";

import { useLang } from "@/components/LangProvider";
import Reveal from "@/components/ui/Reveal";
import Lines from "@/components/ui/Lines";
import ProblemFilm from "@/components/ProblemFilm";

/** Bandeau court, contraste fort : le problème du parapluie. */
export default function Problem() {
  const { t } = useLang();

  return (
    <section id="probleme" className="section-pad relative bg-ink">
      <div className="container-site">
        {/*
         * Le texte et la séquence se partagent la ligne à partir de lg : le
         * titre garde sa mesure dans 7 colonnes, la vidéo occupe les 5
         * restantes et se cale sur le milieu du bloc, plus haute que lui.
         *
         * En dessous de lg elle passe sous le texte, bornée à 420px : en
         * pleine largeur, un 4/5 mangeait un écran de téléphone entier avant
         * qu'on ait lu le paragraphe.
         */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mono-label kicker text-haze">{t.problem.kicker}</p>
            </Reveal>
            <Lines
              as="h2"
              lines={[t.problem.title]}
              className="display-l mt-6 text-balance text-mist"
            />
            <Reveal delay={120}>
              <p className="mt-6 max-w-[62ch] text-pretty text-[17px] text-mist/75 sm:mt-7 sm:text-lg">
                {t.problem.body}
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={200}
            className="mx-auto w-full max-w-[420px] lg:col-span-5 lg:max-w-none"
          >
            <ProblemFilm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
