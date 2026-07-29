"use client";

import Image from "next/image";
import { useLang } from "@/components/LangProvider";
import { siteConfig } from "@/lib/site-config";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Lines from "@/components/ui/Lines";

/** La section la plus utile pendant l'événement : infos stand + RDV. */
export default function Trade() {
  const { t, lang } = useLang();
  const ev = siteConfig.event;

  const dates = ev.confirmed
    ? new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).formatRange(new Date(ev.start), new Date(ev.end))
    : ev.datesLabel[lang];

  const rows: Array<[string, string]> = [
    [t.salon.eventName, ev.name],
    [t.salon.dates, dates],
    [t.salon.place, ev.city],
    [t.salon.hallStand, `${ev.hall} · ${ev.stand}`],
  ];

  return (
    <section id="salon" className="section-pad bg-ink">
      <div className="container-site">
        <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="mono-label text-haze">{t.salon.kicker}</p>
            </Reveal>
            <Lines
              as="h2"
              lines={[t.salon.title]}
              className="display-l mt-6 text-balance text-mist"
            />
            <Reveal delay={120}>
              <p className="mt-6 max-w-[52ch] text-pretty text-mist/75 sm:mt-7">
                {t.salon.body}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <dl className="mt-8 max-w-[440px] sm:mt-10">
                {rows.map(([k, v]) => (
                  <div
                    key={k}
                    className="hairline-t flex items-baseline justify-between gap-6 py-3"
                  >
                    <dt className="mono-label text-mist/50">{k}</dt>
                    <dd className="text-right font-mono text-[13px] text-mist/90">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
                <Button
                  href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
                    t.salon.meetSubject,
                  )}`}
                >
                  {t.salon.meet}
                </Button>
                {/* Tant que les dates ne sont pas confirmées, pas de .ics :
                    il enverrait un rendez-vous fictif dans l'agenda. */}
                {ev.confirmed && (
                  <Button href={`/api/calendar?lang=${lang}`} variant="ghost">
                    {t.salon.addCal}
                  </Button>
                )}
              </div>
            </Reveal>
          </div>

          {/* Photo du stand — source carrée de 1254 px de côté. */}
          <Reveal delay={150}>
            <figure className="mx-auto w-full max-w-[340px] sm:max-w-[520px]">
              <div className="dome relative aspect-square border border-[rgba(242,245,251,0.1)] bg-ink-2">
                <Image
                  src="/img/stand-salon.webp"
                  alt={t.salon.photoAlt}
                  fill
                  sizes="(min-width: 640px) 520px, 340px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mono-label mt-4 text-mist/55">
                {t.salon.photoNote}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
