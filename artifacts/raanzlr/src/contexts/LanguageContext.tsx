import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "../lib/translations";

type Lang = "en" | "ar";

interface LangContextValue {
  lang: Lang;
  isAr: boolean;
  t: typeof translations.en;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("raanzlr-lang");
    if (stored === "ar" || stored === "en") return stored;
    const browser = navigator.language.toLowerCase();
    return browser.startsWith("ar") ? "ar" : "en";
  });

  const isAr = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem("raanzlr-lang", lang);
  }, [lang, isAr]);

  const setLang = (l: Lang) => setLangState(l);
  const toggleLang = () => setLangState((prev) => (prev === "en" ? "ar" : "en"));

  const t = isAr ? translations.ar : translations.en;

  return (
    <LangContext.Provider value={{ lang, isAr, t, setLang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
