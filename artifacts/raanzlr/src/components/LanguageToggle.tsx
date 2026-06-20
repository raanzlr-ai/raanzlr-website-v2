import React from "react";
import { motion } from "framer-motion";
import { useLang } from "../contexts/LanguageContext";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, toggleLang } = useLang();
  const isAr = lang === "ar";

  return (
    <button
      onClick={toggleLang}
      aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
      className={`relative inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs font-mono-accent uppercase tracking-[0.18em] text-white/70 hover:border-cyan-400/40 hover:text-white transition-colors ${className}`}
    >
      <motion.span
        key={lang}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        transition={{ duration: 0.2 }}
        className="min-w-[2.8rem] text-center"
      >
        {isAr ? "EN" : "عربي"}
      </motion.span>
      <span className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse" />
    </button>
  );
}
