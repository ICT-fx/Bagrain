"use client";

import { useLang } from "@/components/LangProvider";
import Reveal from "@/components/ui/Reveal";
import Lines from "@/components/ui/Lines";

/** Bandeau court, contraste fort : le problème du parapluie. */
export default function Problem() {
  const { t } = useLang();

  return (
    <section id="probleme" className="section-pad relative bg-ink">
      <div className="container-site">
        {/*
         * La séquence vidéo est retirée pour l'instant (voir ProblemFilm) :
         * seul reste le texte, centré sur la page et borné à sa mesure de
         * lecture pour que les lignes restent courtes.
         */}
        <div className="mx-auto max-w-[62ch] text-center">
          <Reveal>
            <p className="mono-label kicker text-haze">{t.problem.kicker}</p>
          </Reveal>
          <Lines
            as="h2"
            lines={[t.problem.title]}
            className="display-l mt-6 text-balance text-mist"
          />
          <Reveal delay={120}>
            <p className="mt-6 text-pretty text-[17px] text-mist/75 sm:mt-7 sm:text-lg">
              {t.problem.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
