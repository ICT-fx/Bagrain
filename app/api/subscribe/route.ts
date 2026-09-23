import { NextResponse } from "next/server";
import { addContact, resendConfigured } from "@/lib/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Inscription à la liste de lancement : l'adresse rejoint les contacts
 * Resend, d'où partira l'email de lancement. Pas de copie par email à
 * l'équipe : la liste se consulte dans Resend, une boîte submergée ne se
 * lit plus.
 * Sans RESEND_API_KEY (développement local), la soumission est journalisée.
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
  const lang = body.lang === "en" ? "en" : "fr";

  if (!resendConfigured()) {
    console.log("[subscribe]", JSON.stringify({ email, lang }));
    return NextResponse.json({ ok: true });
  }

  try {
    await addContact(email);
  } catch (err) {
    console.error("[subscribe] contact failed:", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
