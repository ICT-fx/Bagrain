"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLang } from "@/components/LangProvider";
import DomeEdge from "@/components/ui/DomeEdge";
import Reveal from "@/components/ui/Reveal";
import Lines from "@/components/ui/Lines";

/**
 * Positions des points chauds, en % du visuel `schema-technique.webp`.
 *
 * Elles sont relevées sur la planche « Bag synthesis » d'OCCO : chaque valeur
 * est la pointe de la ligne de rappel d'origine, convertie dans le repère du
 * fichier désannoté. `rfid` et `laptop` n'y étaient pas légendés — posés
 * respectivement sur la poche de bretelle et sur la face avant.
 * À recaler si le recadrage du visuel change.
 */
const HOTSPOT_POS: Record<string, { x: number; y: number }> = {
  straps: { x: 21.5, y: 7.5 },
  "hood-pocket": { x: 29.5, y: 12.1 },
  piping: { x: 91.2, y: 22.8 },
  rfid: { x: 7, y: 31.5 },
  cord: { x: 17.9, y: 32.2 },
  fabric: { x: 88.4, y: 32.1 },
  shoulder: { x: 5.5, y: 47.2 },
  trolley: { x: 21.3, y: 53.7 },
  laptop: { x: 76.4, y: 53.2 },
  foam: { x: 31.3, y: 75.6 },
  secret: { x: 37.5, y: 75.7 },
  bottle: { x: 43.2, y: 78.5 },
};

const FIGURE = { src: "/img/schema-technique.webp", width: 1015, height: 786 };

/**
 * Section claire : le rendu du bureau d'études devient interactif.
 * Desktop : points chauds pulsants + carte au survol / focus.
 * Mobile : le rendu, puis la liste des détails en accordéon.
 */
export default function Anatomy() {
  const { t } = useLang();
  const [openId, setOpenId] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="anatomie" className="relative bg-ink">
      <DomeEdge />
      <div className="on-light relative bg-mist pb-[clamp(56px,7.5vw,128px)] pt-[clamp(32px,4.5vw,72px)] text-ink">
        <div className="container-site">
          <div className="max-w-[62ch]">
            <Reveal>
              <p className="mono-label text-bagrain">{t.anatomy.kicker}</p>
            </Reveal>
            <Lines
              as="h2"
              lines={[t.anatomy.title]}
              className="display-l mt-6 text-balance text-ink"
            />
            <Reveal delay={120}>
              <p className="mt-6 text-pretty text-ink/70">{t.anatomy.intro}</p>
            </Reveal>
          </div>

          {/* Desktop : rendu + points chauds. Le rendu est resté sur son fond
              studio — la face avant du sac est aussi sombre que son ombre
              portée, aucun détourage ne les sépare proprement. */}
          <Reveal className="mt-10 hidden md:block">
            <div className="relative mx-auto max-w-[900px]">
              <div className="dome border border-[rgba(7,14,42,0.1)] bg-white p-6 shadow-[0_24px_60px_-32px_rgba(7,14,42,0.45)] sm:p-8">
                <div className="relative">
                  <Image
                    src={FIGURE.src}
                    alt={t.anatomy.figureAlt}
                    width={FIGURE.width}
                    height={FIGURE.height}
                    sizes="(min-width: 1024px) 836px, 90vw"
                    className="h-auto w-full"
                  />
                  {t.anatomy.hotspots.map((h) => {
                  const pos = HOTSPOT_POS[h.id as string];
                  if (!pos) return null;
                  const open = openId === h.id;
                  const onLeft = pos.x < 50;
                  return (
                    <div
                      key={h.id as string}
                      className="absolute"
                      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                      onMouseEnter={() => setOpenId(h.id as string)}
                      onMouseLeave={() =>
                        setOpenId((v) => (v === h.id ? null : v))
                      }
                    >
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={`spot-${h.id}`}
                        onClick={() =>
                          setOpenId(open ? null : (h.id as string))
                        }
                        onFocus={() => setOpenId(h.id as string)}
                        className="hotspot-dot hotspot-dot--light relative z-10 -ml-[9px] -mt-[9px] block h-[18px] w-[18px] rounded-full border border-bagrain/45 bg-mist/95"
                      >
                        <span className="absolute left-1/2 top-1/2 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bagrain" />
                        <span className="sr-only">{h.name}</span>
                      </button>
                      <div
                        id={`spot-${h.id}`}
                        role="status"
                        className={`absolute top-1/2 z-20 w-60 -translate-y-1/2 rounded-[4px] border border-[rgba(242,245,251,0.14)] bg-ink p-4 shadow-[0_16px_40px_rgba(7,14,42,0.35)] transition-opacity duration-200 ${
                          onLeft ? "left-6" : "right-6"
                        } ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
                      >
                        <p className="mono-label text-lining">{h.name}</p>
                        <p className="mt-2 text-[14px] leading-relaxed text-mist/85">
                          {h.desc}
                        </p>
                      </div>
                    </div>
                  );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Mobile : rendu + accordéon */}
          <div className="mt-8 md:hidden">
            <Reveal>
              <div className="dome border border-[rgba(7,14,42,0.1)] bg-white p-4">
                <Image
                  src={FIGURE.src}
                  alt={t.anatomy.figureAlt}
                  width={FIGURE.width}
                  height={FIGURE.height}
                  sizes="92vw"
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
            <ul className="mt-7 border-t border-[rgba(7,14,42,0.14)]">
              {t.anatomy.hotspots.map((h) => {
                const open = openAccordion === h.id;
                return (
                  <li
                    key={h.id as string}
                    className="border-b border-[rgba(7,14,42,0.14)]"
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`acc-${h.id}`}
                      onClick={() =>
                        setOpenAccordion(open ? null : (h.id as string))
                      }
                      className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    >
                      <span className="font-medium text-ink">{h.name}</span>
                      <span
                        aria-hidden="true"
                        className={`mono-label text-bagrain transition-transform duration-300 ${
                          open ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      id={`acc-${h.id}`}
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-4 text-[15px] text-ink/70">{h.desc}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Fiche technique */}
          <Reveal className="mt-10 sm:mt-12">
            <h3 className="mono-label text-bagrain">{t.anatomy.tableTitle}</h3>
            <dl className="mt-6 grid gap-x-12 sm:grid-cols-2">
              {t.anatomy.specs.map(([k, v], i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between gap-6 border-b border-[rgba(7,14,42,0.12)] py-3"
                >
                  <dt className="mono-label shrink-0 text-ink/65">{k}</dt>
                  <dd className="text-right font-mono text-[13px] text-ink/85">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
      <DomeEdge flip className="bg-ink" fill="var(--color-mist)" />
    </section>
  );
}
