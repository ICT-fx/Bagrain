import { siteConfig } from "@/lib/site-config";
import { dictionaries } from "@/lib/i18n";

/** Convertit une date ISO en format ICS UTC (YYYYMMDDTHHMMSSZ). */
function toICS(iso: string): string {
  return new Date(iso)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

function esc(v: string): string {
  return v.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,");
}

/** Fichier .ics « Ajouter au calendrier » pour le salon. */
export async function GET(request: Request) {
  const ev = siteConfig.event;

  // Sans dates confirmées, la config ne contient que des valeurs
  // provisoires : mieux vaut ne rien servir qu'un rendez-vous inventé.
  if (!ev.confirmed) {
    return new Response(null, { status: 404 });
  }

  const lang =
    new URL(request.url).searchParams.get("lang") === "en" ? "en" : "fr";
  const t = dictionaries[lang];

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BAGRAIN//Site vitrine//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:salon-${toICS(ev.start)}@bagrain`,
    `DTSTAMP:${toICS(ev.start)}`,
    `DTSTART:${toICS(ev.start)}`,
    `DTEND:${toICS(ev.end)}`,
    `SUMMARY:${esc(`BAGRAIN — ${ev.name}`)}`,
    `LOCATION:${esc(`${ev.city} · ${ev.hall} · ${ev.stand}`)}`,
    `DESCRIPTION:${esc(t.salon.icsDescription)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="bagrain-salon.ics"',
    },
  });
}
