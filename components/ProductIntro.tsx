"use client";

import Image from "next/image";
import { useLang } from "@/components/LangProvider";
import Reveal from "@/components/ui/Reveal";
import Lines from "@/components/ui/Lines";

/** Bloc d'introduction du produit — ancre « Le sac » de la navigation. */
export default function ProductIntro() {
  const { t } = useLang();

  return (
    <section id="sac" className="section-pad bg-ink">
      <div className="container-site">
        <div className="max-w-[62ch]">
          <Reveal>
            <p className="mono-label text-haze">{t.intro.kicker}</p>
          </Reveal>
          <Lines
            as="h2"
            lines={[t.intro.title]}
            className="display-l mt-6 text-balance text-mist"
          />
          <Reveal delay={120}>
            <p className="mt-6 text-pretty text-[17px] text-mist/75 sm:mt-7 sm:text-lg">
              {t.intro.body}
            </p>
          </Reveal>
        </div>

        {/* Rangée, puis déployée : le rendu se lit de gauche à droite comme
            la démonstration elle-même. Le visuel est détouré, donc posé à
            même la nuit de la section — pas de cadre à dessiner autour. */}
        <Reveal delay={200} as="figure" className="mt-10 sm:mt-12">
          <Image
            src="/img/capuche-depliee.webp"
            alt={t.intro.photoAlt}
            width={1058}
            height={912}
            sizes="(min-width: 1024px) 900px, 92vw"
            className="mx-auto h-auto w-full max-w-[900px] drop-shadow-[0_40px_70px_rgba(0,0,0,0.55)]"
          />
        </Reveal>
      </div>
    </section>
  );
}
