"use client";

import { useLang } from "@/components/LangProvider";
import AnatomyGallery from "@/components/AnatomyGallery";
import DomeEdge from "@/components/ui/DomeEdge";
import Reveal from "@/components/ui/Reveal";
import Lines from "@/components/ui/Lines";

/**
 * Section claire : les visuels du sac, avec leurs points interactifs, qui
 * défilent au scroll, puis la fiche technique.
 */
export default function Anatomy() {
  const { t } = useLang();

  return (
    <section id="anatomie" className="relative bg-ink">
      <DomeEdge />
      <div className="on-light relative bg-paper pb-[clamp(56px,7.5vw,128px)] pt-[clamp(32px,4.5vw,72px)] text-ink">
        <div className="container-site">
          {/* La mesure de lecture s'applique au paragraphe seul : le titre,
              court, garde toute la largeur pour tenir sur une ligne. */}
          <div>
            <Reveal>
              <p className="mono-label kicker text-bagrain">{t.anatomy.kicker}</p>
            </Reveal>
            <Lines
              as="h2"
              lines={[t.anatomy.title]}
              className="display-l mt-6 text-balance text-ink"
            />
            <Reveal delay={120}>
              <p className="mt-6 max-w-[62ch] whitespace-pre-line text-pretty text-ink/70">{t.anatomy.intro}</p>
            </Reveal>
          </div>

          <AnatomyGallery />

          {/* Fiche technique */}
          <Reveal className="mt-10 sm:mt-12">
            <h3 className="mono-label text-bagrain">{t.anatomy.tableTitle}</h3>
            <p className="mt-3 text-ink/50">
              <span className="mono-label block">{t.anatomy.tableNote[0]}</span>
              <span className="mt-1 block whitespace-nowrap text-[13px]">
                {t.anatomy.tableNote[1]}
              </span>
            </p>
            {/* Un bloc par thème : SAC à gauche, CAPUCHE à droite. Les deux
                intitulés partent de la même ligne ; sur mobile, les blocs
                s'empilent dans cet ordre. */}
            <div className="mt-6 grid items-start gap-x-12 gap-y-10 sm:grid-cols-2">
              {t.anatomy.specGroups.map((group) => (
                <div key={group.title}>
                  <h4 className="mono-label text-ink/50">{group.title}</h4>
                  <dl className="mt-3">
                    {group.rows.map(([k, v], i) => (
                      <div
                        key={i}
                        className="flex items-baseline justify-between gap-6 border-b border-[rgba(7,14,42,0.12)] py-3"
                      >
                        <dt className="mono-label shrink-0 text-ink/65">{k}</dt>
                        <dd
                          /* Valeur bornée à 60 % de la ligne : une phrase
                             longue passe à la ligne au lieu de filer vers
                             le libellé. */
                          className="max-w-[60%] whitespace-pre-line text-right font-mono text-[13px] text-ink/85"
                        >
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
      <DomeEdge flip className="bg-ink" fill="var(--color-paper)" />
    </section>
  );
}
