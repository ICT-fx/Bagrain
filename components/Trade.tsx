"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import { useLang } from "@/components/LangProvider";
import { siteConfig } from "@/lib/site-config";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Lines from "@/components/ui/Lines";

const CALENDLY_JS = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";

type CalendlyApi = { initPopupWidget: (opts: { url: string }) => void };

let calendlyLoading: Promise<CalendlyApi> | null = null;

/** Charge le widget Calendly au premier clic seulement : rien à payer au chargement de la page. */
function loadCalendly(): Promise<CalendlyApi> {
  const w = window as unknown as { Calendly?: CalendlyApi };
  if (w.Calendly) return Promise.resolve(w.Calendly);
  if (!calendlyLoading) {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = CALENDLY_CSS;
    document.head.appendChild(css);

    calendlyLoading = new Promise((resolve, reject) => {
      const js = document.createElement("script");
      js.src = CALENDLY_JS;
      js.async = true;
      js.onload = () =>
        w.Calendly ? resolve(w.Calendly) : reject(new Error("calendly"));
      js.onerror = () => {
        calendlyLoading = null;
        reject(new Error("calendly"));
      };
      document.head.appendChild(js);
    });
  }
  return calendlyLoading;
}

/** La section la plus utile pendant l'événement : infos stand + RDV. */
export default function Trade() {
  const { t, lang } = useLang();
  const ev = siteConfig.event;

  // Évalué côté client : la page est statique, la date du build ne dit
  // rien de la date de visite.
  const [salonOver, setSalonOver] = useState(false);
  useEffect(() => {
    setSalonOver(Date.now() > new Date(ev.end).getTime());
  }, [ev.end]);

  const openBooking = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    loadCalendly()
      .then((c) => c.initPopupWidget({ url: ev.bookingUrl }))
      // Widget bloqué (bloqueur de pub, réseau) : la page Calendly directe.
      .catch(() => window.open(ev.bookingUrl, "_blank", "noopener"));
  };

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
        {/* Photo centrée verticalement sur le bloc de texte à côté. */}
        <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <p className="mono-label kicker text-haze">{t.salon.kicker}</p>
            </Reveal>
            <Lines
              as="h2"
              lines={[t.salon.title]}
              /* « Meet us at ISPO » dépasse d'un cheveu la demi-colonne :
                 le titre prend la largeur de son texte pour tenir sur une
                 ligne, le débord se perd dans la gouttière. */
              className="display-l mt-6 w-max whitespace-nowrap text-mist"
            />
            <Reveal delay={120}>
              <p className="mt-6 max-w-[52ch] whitespace-pre-line text-pretty text-mist/75 sm:mt-7">
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
                    <dt className="mono-label text-haze">{k}</dt>
                    <dd className="text-right font-mono text-[13px] text-mist/90">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
                {!salonOver && (
                  <Button href={ev.bookingUrl} onClick={openBooking}>
                    {t.salon.meet}
                  </Button>
                )}
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

          {/* Photo du stand ISPO, cadrée à l’horizontale (1024 × 768, 4:3). Cadre à coins
              arrondis plutôt qu'en arche : l'arche rognait l'enseigne ISPO
              dans l'angle haut droit. Même traitement que la photo « Le sac ». */}
          <Reveal delay={150}>
            <figure className="mx-auto w-full max-w-[340px] sm:max-w-[520px]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] border border-[rgba(242,245,251,0.1)] bg-ink-2">
                <Image
                  src="/img/stand-ispo-3.jpg"
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
