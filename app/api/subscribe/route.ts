import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Inscription à la liste de lancement.
 * Sans prestataire branché, la soumission est journalisée côté serveur.
 * Pour brancher un service d'emailing : définir NEWSLETTER_WEBHOOK_URL
 * (le payload JSON y est transmis tel quel) — voir README.
 */
export async function POST(req: Request) {
  let body: { email?: string; consent?: boolean; lang?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email) || body.consent !== true) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const payload = {
    type: "newsletter",
    email,
    lang: body.lang === "en" ? "en" : "fr",
    consent: true,
    date: new Date().toISOString(),
  };

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
    } catch (err) {
      console.error("[subscribe] webhook failed:", err);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } else {
    console.log("[subscribe]", JSON.stringify(payload));
  }

  return NextResponse.json({ ok: true });
}
