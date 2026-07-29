"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { defaultLang, dictionaries, type Dict, type Lang } from "@/lib/i18n";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
};

const LangContext = createContext<LangContextValue>({
  lang: defaultLang,
  setLang: () => {},
  t: dictionaries[defaultLang],
});

const STORAGE_KEY = "bagrain:lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(defaultLang);

  useEffect(() => {
    // Priorité : ?lang= > localStorage > langue du navigateur > FR.
    const param = new URLSearchParams(window.location.search).get("lang");
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const fromNav = navigator.language?.toLowerCase().startsWith("fr")
      ? "fr"
      : "en";
    const resolved = (
      param === "fr" || param === "en"
        ? param
        : stored === "fr" || stored === "en"
          ? stored
          : fromNav
    ) as Lang;
    setLangState(resolved);
  }, []);

  useEffect(() => {
    // Le rendu serveur est en français : aligner l'onglet et la meta
    // description sur la langue réellement affichée.
    document.documentElement.lang = lang;
    const dict = dictionaries[lang];
    document.title = dict.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", dict.meta.description);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* stockage indisponible : la langue reste valable pour la session */
    }
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}
