import { siteConfig } from "@/lib/site-config";

const API = "https://api.resend.com";

/** Sans clé (développement local), les formulaires se contentent de journaliser. */
export const resendConfigured = () => Boolean(process.env.RESEND_API_KEY);

async function call(path: string, body: unknown): Promise<Response> {
  return fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

/**
 * Ajoute l'adresse aux contacts Resend (liste de lancement).
 * Une adresse déjà inscrite n'est pas une erreur pour le visiteur.
 */
export async function addContact(email: string): Promise<void> {
  const res = await call("/contacts", { email, unsubscribed: false });
  if (res.ok) return;
  const text = await res.text();
  if (res.status === 409 || /already exists/i.test(text)) return;
  throw new Error(`resend contacts ${res.status}: ${text}`);
}

/** Envoie un email à l'équipe (adresse du compte Resend). */
export async function notifyTeam(opts: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const res = await call("/emails", {
    from: siteConfig.mail.from,
    to: [siteConfig.mail.notifyTo],
    subject: opts.subject,
    text: opts.text,
    ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
  });
  if (!res.ok) {
    throw new Error(`resend emails ${res.status}: ${await res.text()}`);
  }
}
