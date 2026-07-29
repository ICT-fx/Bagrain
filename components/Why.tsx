"use client";

import { useLang } from "@/components/LangProvider";
import Reveal from "@/components/ui/Reveal";
import Lines from "@/components/ui/Lines";

/**
 * Six arguments en grille asymétrique — pas de numérotation :
 * ce n'est pas une séquence, juste un ensemble.
 */
const SPANS = [
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-12",
];

export default function Why() {
  const { t } = useLang();

  return (
    <section id="pourquoi" className="section-pad bg-ink">
      <div className="container-site">
        <Reveal>
          <p className="mono-label text-haze">{t.why.kicker}</p>
        </Reveal>
        <Lines
          as="h2"
          lines={[t.why.title]}
          className="display-l mt-6 max-w-[18ch] text-balance text-mist"
        />

        <ul className="mt-8 grid gap-4 sm:mt-12 sm:gap-4 md:grid-cols-2 lg:grid-cols-12">
          {t.why.items.map((item, i) => {
            const highlight = i === 1;
            return (
              <Reveal
                as="li"
                key={i}
                delay={(i % 3) * 80}
                className={`${SPANS[i]} h-full`}
              >
                <article
                  className={`card-hover h-full rounded-[4px] border p-5 sm:p-7 ${
                    highlight
                      ? "border-transparent bg-bagrain"
                      : "border-[rgba(242,245,251,0.1)] bg-ink-2"
                  } ${i === 5 ? "lg:flex lg:items-baseline lg:gap-10" : ""}`}
                >
                  <h3
                    className={`heading-3 ${highlight ? "text-mist" : "text-mist"} ${
                      i === 5 ? "lg:shrink-0" : ""
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-2 max-w-[58ch] text-[14px] leading-relaxed sm:mt-3 sm:text-[15px] ${
                      highlight ? "text-mist/85" : "text-mist/65"
                    } ${i === 5 ? "lg:mt-0" : ""}`}
                  >
                    {item.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
