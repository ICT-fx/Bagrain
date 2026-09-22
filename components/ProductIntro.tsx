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
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          <div className="max-w-[62ch]">
            <Reveal>
              <p className="mono-label kicker text-haze">{t.intro.kicker}</p>
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

          {/* Le sac porté, de dos : le logo et la capuche repliée se lisent
              d'un coup d'œil, à taille réelle sur une silhouette. Placée à
              gauche sur grand écran, sous le texte sur mobile. */}
          <Reveal
            delay={160}
            as="figure"
            className="mx-auto w-full max-w-[480px] overflow-hidden lg:order-first rounded-[14px] border border-[rgba(242,245,251,0.08)] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)] lg:max-w-none"
          >
            <Image
              src="/img/sac-porte-pluie.jpg"
              alt={t.intro.wornAlt}
              width={1123}
              height={1401}
              quality={90}
              sizes="(min-width: 1024px) 520px, (min-width: 640px) 480px, 92vw"
              className="h-auto w-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
