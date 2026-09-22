"use client";

import Image from "next/image";

import { useLang } from "@/components/LangProvider";
import DomeEdge from "@/components/ui/DomeEdge";
import Reveal from "@/components/ui/Reveal";
import Lines from "@/components/ui/Lines";

/**
 * Les sources fournies venaient chacune d'une lumière différente (studio,
 * salon, plein soleil, intérieur de bar, duotone bleu). Elles sont recadrées
 * en 3:4 dans `public/img/team/` et rendues en noir et blanc : c'est ce qui
 * les fait tenir comme une seule série. Un visage sans photo retombe sur ses
 * initiales.
 */
const PORTRAITS: Record<string, string> = {
  "Lola Bembekoff": "/img/team/lola-bembekoff.jpg",
  "Paul Duteil": "/img/team/paul-duteil-2.jpg",
  "Stéphane Bembekoff": "/img/team/stephane-bembekoff-4.jpg",
  "Olivier Pigasse": "/img/team/olivier-pigasse-2.jpg",
  "Quentin Lebrec": "/img/team/quentin-lebrec-2.jpg",
  "Hippolyte Langlois": "/img/team/hippolyte-langlois.jpg",
};

/**
 * Section claire : 6 portraits, format vertical homogène.
 */
export default function Team() {
  const { t } = useLang();

  return (
    <section id="equipe" className="relative bg-ink">
      <DomeEdge />
      <div className="on-light relative bg-paper pb-[clamp(56px,7.5vw,128px)] pt-[clamp(32px,4.5vw,72px)] text-ink">
        <div className="container-site">
          <Reveal>
            <p className="mono-label kicker text-bagrain">{t.team.kicker}</p>
          </Reveal>
          <Lines
            as="h2"
            lines={[t.team.title]}
            className="display-l mt-6 max-w-[18ch] text-balance text-ink"
          />

          {/* 6 portraits : deux rangées de 3 dès la tablette, 2 par ligne
              sur mobile. */}
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
            {t.team.members.map((m, i) => {
              const name = m.name as string;
              const portrait = PORTRAITS[name];
              const initials = name
                .split(" ")
                .map((p) => p[0])
                .join("");
              return (
                <Reveal as="li" key={name} delay={i * 80}>
                  <article className="text-center">
                    <div className="dome relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-ink-2 to-ink ring-1 ring-[rgba(7,14,42,0.1)]">
                      {portrait ? (
                        <>
                          {/* Le nom et le rôle sont juste dessous : la photo
                              n'ajoute rien à un lecteur d'écran. */}
                          <Image
                            src={portrait}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 216px, (min-width: 640px) 30vw, 42vw"
                            className="object-cover grayscale contrast-[1.04]"
                          />
                          {/* Les fonds d'origine vont du studio blanc au bar
                              sombre : ce voile les rassoit dans la nuit de la
                              marque et raccroche la carte au texte. */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/30 mix-blend-multiply"
                          />
                        </>
                      ) : (
                        <span
                          aria-hidden="true"
                          className="display-l absolute inset-x-0 bottom-4 select-none text-center text-mist/15 sm:bottom-6"
                        >
                          {initials}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 font-medium text-ink">{m.name}</h3>
                    <p className="text-[14px] text-ink/65">{m.role}</p>
                    <p className="mono-label mt-1 text-ink/60">{m.city}</p>
                  </article>
                </Reveal>
              );
            })}
          </ul>

          {/* Frise partenaires : défilement infini très lent */}
          <Reveal className="mt-10 sm:mt-14">
            <p className="mono-label text-bagrain">{t.team.partnersTitle}</p>
            <div
              className="marquee mt-6 overflow-hidden border-y border-[rgba(7,14,42,0.12)] py-5 sm:py-6"
              aria-label={t.team.partnersTitle}
            >
              <div className="marquee-track flex w-max items-center gap-10 pr-10 sm:gap-16 sm:pr-16">
                {[0, 1].map((dup) => (
                  <div
                    key={dup}
                    aria-hidden={dup === 1}
                    className="flex items-center gap-10 sm:gap-16"
                  >
                    {t.team.partners.map((p) => (
                      <span
                        key={`${dup}-${p.name}`}
                        className="mono-label whitespace-nowrap text-center text-ink/60 transition-colors duration-300 hover:text-bagrain"
                      >
                        {p.name}
                        {/* Le contact du partenaire passe sous son nom :
                            deux informations, deux lignes. */}
                        {p.note ? (
                          <span className="mt-1 block normal-case tracking-normal text-ink/45">
                            {p.note}
                          </span>
                        ) : null}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <DomeEdge flip className="bg-ink" fill="var(--color-paper)" />
    </section>
  );
}
