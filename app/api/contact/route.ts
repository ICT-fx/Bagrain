import { NextResponse } from "next/server";
import { notifyTeam, resendConfigured } from "@/lib/resend";

/**
 * Contact professionnel (distributeurs, revendeurs, presse) : le message
 * arrive par email à l'équipe, « Répondre » écrit directement au visiteur.
 * Sans RESEND_API_KEY (développement local), la soumission est journalisée.
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

  // Les champs finissent dans un en-tête d'email : pas de retour à la ligne.
  const line = (v: unknown, max: number) =>
    typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";

  const name = line(body.name, 200);
  const email = line(body.email, 320);
  const company = line(body.company, 200);
  const country = line(body.country, 100);
  const message =
    typeof body.message === "string" ? body.message.trim().slice(0, 4000) : "";
  const lang = body.lang === "en" ? "en" : "fr";

  // L'email est obligatoire : c'est la seule voie de réponse.
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!resendConfigured()) {
    console.log(
      "[contact]",
      JSON.stringify({ name, email, company, country, message, lang }),
    );
    return NextResponse.json({ ok: true });
  }

  try {
    await notifyTeam({
      subject: `[BAGRAIN pro] ${name}${company ? ` — ${company}` : ""}`,
      replyTo: email,
      text: [
        `Nom : ${name}`,
        `Email : ${email}`,
        `Société : ${company || "—"}`,
        `Pays : ${country || "—"}`,
        `Langue du site : ${lang.toUpperCase()}`,
        "",
        "Message :",
        message,
        "",
        "—",
        "Envoyé depuis le formulaire professionnel du site. Répondez directement à cet email pour écrire à l'expéditeur.",
      ].join("\n"),
    });
  } catch (err) {
    console.error("[contact] email failed:", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
