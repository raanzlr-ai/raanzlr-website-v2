import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "industries", href: "/industries" },
  { key: "markets", href: "/markets" },
  { key: "case-studies", href: "/case-studies" },
  { key: "insights", href: "/insights" },
];

const NAV_LABELS: Record<string, { en: string; ar: string }> = {
  home: { en: "Home", ar: "الرئيسية" },
  services: { en: "Services", ar: "الخدمات" },
  industries: { en: "Industries", ar: "القطاعات" },
  markets: { en: "Markets", ar: "الأسواق" },
  "case-studies": { en: "Case Studies", ar: "دراسات الحالة" },
  insights: { en: "Insights", ar: "المدونة" },
  about: { en: "About", ar: "من نحن" },
};

export default function Navbar() {
  const { isAr, localizedPath } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname.replace(/^\/(en|ar)(?=\/|$)/, "") || "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-white/8 bg-[#050505]/90 backdrop-blur-xl" : "bg-transparent"}`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <Link to={localizedPath("/")} className="flex items-center gap-2.5 shrink-0" aria-label="Raanzlr Home">
              <img src="/logo raanzlr.png" alt="Raanzlr Logo" className={`h-9 w-9 ${isAr ? "order-last" : "order-first"}`} />
              <img src="/Raanzlr.png" alt="Raanzlr" className="h-7 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((l) => {
                const isActive = currentPath === l.href;
                const label = isAr ? NAV_LABELS[l.key].ar : NAV_LABELS[l.key].en;
                return (
                  <Link
                    key={l.key}
                    to={localizedPath(l.href)}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg ${isActive ? "text-white" : "text-white/55 hover:text-white"}`}
                  >
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-white/[0.06]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">
              <LanguageToggle className="hidden sm:flex" />
              <Link
                to={localizedPath("/contact")}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-xs font-bold text-[#050505] shadow-[0_0_16px_rgba(0,240,255,0.3)] hover:shadow-[0_0_24px_rgba(0,240,255,0.5)] transition-shadow"
              >
                {isAr ? "تواصل" : "Contact"}
              </Link>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2 rounded-lg text-white/60 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 lg:hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {NAV_LINKS.map((l) => {
                const label = isAr ? NAV_LABELS[l.key].ar : NAV_LABELS[l.key].en;
                return (
                  <Link
                    key={l.key}
                    to={localizedPath(l.href)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${currentPath === l.href ? "bg-white/[0.06] text-white" : "text-white/60 hover:text-white"}`}
                  >
                    {label}
                  </Link>
                );
              })}
              <div className="pt-4 flex items-center gap-3">
                <LanguageToggle />
                <Link
                  to={localizedPath("/contact")}
                  className="inline-flex rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-sm font-bold text-[#050505]"
                >
                  {isAr ? "تواصل معنا" : "Contact Us"}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
