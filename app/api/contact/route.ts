import { NextResponse } from "next/server";

/**
 * Contact professionnel (distributeurs, revendeurs, presse).
 * Sans prestataire branché, la soumission est journalisée côté serveur.
 * Pour recevoir les messages : définir CONTACT_WEBHOOK_URL — voir README.
 */
export async function POST(req: Request) {
  let body: {
    name?: string;
    email?: string;
    company?: string;
    country?: string;
    message?: string;
    lang?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const clean = (v: unknown, max: number) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  const name = clean(body.name, 200);
  const email = clean(body.email, 320);
  const message = clean(body.message, 4000);
  // L'email est obligatoire : c'est la seule voie de réponse.
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const payload = {
    type: "pro-contact",
    name,
    email,
    company: clean(body.company, 200),
    country: clean(body.country, 100),
    message,
    lang: body.lang === "en" ? "en" : "fr",
    date: new Date().toISOString(),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
    } catch (err) {
      console.error("[contact] webhook failed:", err);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } else {
    console.log("[contact]", JSON.stringify(payload));
  }

  return NextResponse.json({ ok: true });
}
