"use client";

import { useLang } from "@/components/LangProvider";
import type { Lang } from "@/lib/i18n";

/** Sélecteur FR / EN persistant (localStorage). */
export default function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLang();

  const opt = (code: Lang) => (
    <button
      type="button"
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      // 44px de haut au doigt ; sur pointeur fin, la cible revient à la
      // hauteur du texte pour ne pas gonfler la barre de navigation.
      className={`mono-label inline-flex min-h-[44px] min-w-[36px] items-center justify-center px-2 transition-colors lg:min-h-0 lg:min-w-0 lg:py-1 ${
        lang === code ? "text-mist" : "text-mist/60 hover:text-mist/70"
      }`}
    >
      {code.toUpperCase()}
    </button>
  );

  return (
    <div
      role="group"
      aria-label={t.a11y.langSwitch}
      className={`flex items-center ${className}`}
    >
      {opt("fr")}
      <span aria-hidden="true" className="text-mist/25">
        /
      </span>
      {opt("en")}
    </div>
  );
}
