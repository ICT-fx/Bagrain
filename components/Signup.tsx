"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLang } from "@/components/LangProvider";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Lines from "@/components/ui/Lines";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Message de succès : la région live reste montée en permanence (sinon
 * les lecteurs d'écran n'annoncent pas un contenu inséré avec elle) et
 * récupère le focus, que le démontage du formulaire ferait retomber
 * sur <body>.
 */
function SuccessMessage({ show, message }: { show: boolean; message: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (show) ref.current?.focus();
  }, [show]);

  return (
    // Jamais display:none : une région live masquée n'annonce rien.
    // Vide, le paragraphe n'occupe aucune place.
    <p
      ref={ref}
      role="status"
      aria-live="polite"
      tabIndex={show ? -1 : undefined}
      className={
        show
          ? "mt-8 rounded-[4px] border border-lining/40 bg-lining/10 p-4 text-[15px] text-mist"
          : ""
      }
    >
      {show ? message : ""}
    </p>
  );
}

/** Liste de lancement + contact professionnel. Tous les états rédigés. */
export default function Signup() {
  const { t, lang } = useLang();

  /* ——— Newsletter ——— */
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [nlStatus, setNlStatus] = useState<Status>("idle");
  const [nlError, setNlError] = useState("");

  const submitNewsletter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hp = (
      e.currentTarget.elements.namedItem("website") as HTMLInputElement
    )?.value;
    if (hp) return; // pot de miel anti-spam
    if (!EMAIL_RE.test(email)) {
      setNlStatus("error");
      setNlError(t.contact.newsletter.errorInvalid);
      return;
    }
    if (!consent) {
      setNlStatus("error");
      setNlError(t.contact.newsletter.errorConsent);
      return;
    }
    setNlStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setNlStatus("success");
    } catch {
      setNlStatus("error");
      setNlError(t.contact.newsletter.errorServer);
    }
  };

  /* ——— Formulaire pro ——— */
  const [pro, setPro] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    message: "",
  });
  const [proStatus, setProStatus] = useState<Status>("idle");
  const [proError, setProError] = useState("");

  const submitPro = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hp = (
      e.currentTarget.elements.namedItem("website") as HTMLInputElement
    )?.value;
    if (hp) return;
    if (!pro.name.trim() || !pro.email.trim() || !pro.message.trim()) {
      setProStatus("error");
      setProError(t.contact.pro.errorRequired);
      return;
    }
    // Sans adresse valide, « on répond vite » est une promesse en l'air.
    if (!EMAIL_RE.test(pro.email)) {
      setProStatus("error");
      setProError(t.contact.pro.errorInvalid);
      return;
    }
    setProStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...pro, lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setProStatus("success");
    } catch {
      setProStatus("error");
      setProError(t.contact.pro.errorServer);
    }
  };

  const n = t.contact.newsletter;
  const p = t.contact.pro;

  return (
    <section id="contact" className="section-pad hairline-t bg-ink">
      <div className="container-site">
        <Reveal>
          <p className="mono-label text-haze">{t.contact.kicker}</p>
        </Reveal>
        <Lines
          as="h2"
          lines={[t.contact.title]}
          className="display-l mt-6 text-mist"
        />

        <div className="mt-8 grid gap-10 sm:mt-12 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Liste de lancement */}
          <Reveal>
            <h3 className="heading-3 text-mist">{n.title}</h3>
            <p className="mt-3 max-w-[46ch] text-[15px] text-mist/65">
              {n.body}
            </p>

            <SuccessMessage show={nlStatus === "success"} message={n.success} />

            {nlStatus !== "success" && (
              <form onSubmit={submitNewsletter} className="mt-8" noValidate>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <label htmlFor="nl-email" className="mono-label text-mist/60">
                  {n.emailLabel}
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="nl-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder={n.emailPlaceholder}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (nlStatus === "error") setNlStatus("idle");
                    }}
                    aria-invalid={nlStatus === "error" || undefined}
                    aria-describedby={
                      nlStatus === "error" ? "nl-error" : undefined
                    }
                    className="field sm:flex-1"
                  />
                  <Button type="submit" disabled={nlStatus === "loading"}>
                    {nlStatus === "loading" ? n.sending : n.submit}
                  </Button>
                </div>
                <label className="mt-4 flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-mist/60">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (nlStatus === "error") setNlStatus("idle");
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#1544d6]"
                  />
                  <span>{n.consent}</span>
                </label>
                <p
                  id="nl-error"
                  role="alert"
                  aria-live="polite"
                  className={`mt-3 text-[14px] text-[#e0685e] ${
                    nlStatus === "error" ? "" : "hidden"
                  }`}
                >
                  {nlError}
                </p>
              </form>
            )}
          </Reveal>

          {/* Professionnels */}
          <Reveal delay={120}>
            <h3 className="heading-3 text-mist">{p.title}</h3>
            <p className="mt-3 max-w-[46ch] text-[15px] text-mist/65">
              {p.body}
            </p>

            <SuccessMessage show={proStatus === "success"} message={p.success} />

            {proStatus !== "success" && (
              <form onSubmit={submitPro} className="mt-8" noValidate>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="pro-name" className="mono-label text-mist/60">
                      {p.name}
                    </label>
                    <input
                      id="pro-name"
                      type="text"
                      autoComplete="name"
                      placeholder={p.namePlaceholder}
                      value={pro.name}
                      onChange={(e) => {
                        setPro({ ...pro, name: e.target.value });
                        if (proStatus === "error") setProStatus("idle");
                      }}
                      className="field mt-2"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pro-email"
                      className="mono-label text-mist/60"
                    >
                      {p.email}
                    </label>
                    <input
                      id="pro-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder={p.emailPlaceholder}
                      value={pro.email}
                      onChange={(e) => {
                        setPro({ ...pro, email: e.target.value });
                        if (proStatus === "error") setProStatus("idle");
                      }}
                      aria-invalid={proStatus === "error" || undefined}
                      aria-describedby={
                        proStatus === "error" ? "pro-error" : undefined
                      }
                      className="field mt-2"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pro-company"
                      className="mono-label text-mist/60"
                    >
                      {p.company}
                    </label>
                    <input
                      id="pro-company"
                      type="text"
                      autoComplete="organization"
                      placeholder={p.companyPlaceholder}
                      value={pro.company}
                      onChange={(e) =>
                        setPro({ ...pro, company: e.target.value })
                      }
                      className="field mt-2"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pro-country"
                      className="mono-label text-mist/60"
                    >
                      {p.country}
                    </label>
                    <input
                      id="pro-country"
                      type="text"
                      autoComplete="country-name"
                      placeholder={p.countryPlaceholder}
                      value={pro.country}
                      onChange={(e) =>
                        setPro({ ...pro, country: e.target.value })
                      }
                      className="field mt-2"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="pro-message"
                    className="mono-label text-mist/60"
                  >
                    {p.message}
                  </label>
                  <textarea
                    id="pro-message"
                    rows={4}
                    placeholder={p.messagePlaceholder}
                    value={pro.message}
                    onChange={(e) => {
                      setPro({ ...pro, message: e.target.value });
                      if (proStatus === "error") setProStatus("idle");
                    }}
                    aria-invalid={proStatus === "error" || undefined}
                    aria-describedby={
                      proStatus === "error" ? "pro-error" : undefined
                    }
                    className="field mt-2 resize-y"
                  />
                </div>
                <div className="mt-6">
                  <Button type="submit" disabled={proStatus === "loading"}>
                    {proStatus === "loading" ? p.sending : p.submit}
                  </Button>
                </div>
                <p
                  id="pro-error"
                  role="alert"
                  aria-live="polite"
                  className={`mt-3 text-[14px] text-[#e0685e] ${
                    proStatus === "error" ? "" : "hidden"
                  }`}
                >
                  {proError}
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
