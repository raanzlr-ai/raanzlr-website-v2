import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import Heartbeat from "./Heartbeat";

const LINKS = {
  company: [
    { href: "/", en: "Home", ar: "الرئيسية" },
    { href: "/services", en: "Services", ar: "الخدمات" },
    { href: "/about", en: "About Us", ar: "عنا" },
    { href: "/case-studies", en: "Case Studies", ar: "دراسات الحالة" },
    { href: "/insights", en: "Insights", ar: "المدونة" },
  ],
  resources: [
    { href: "/industries", en: "Industries", ar: "القطاعات" },
    { href: "/markets", en: "Markets", ar: "الأسواق" },
    { href: "/faq", en: "FAQ", ar: "الأسئلة الشائعة" },
    { href: "/book-a-call", en: "Book a Call", ar: "احجز مكالمة" },
    { href: "/contact", en: "Contact", ar: "تواصل معنا" },
  ],
  legal: [
    { href: "/privacy-policy", en: "Privacy Policy", ar: "سياسة الخصوصية" },
    { href: "/terms-of-service", en: "Terms of Service", ar: "شروط الخدمة" },
  ],
};

export default function Footer() {
  const { t, isAr } = useLang();

  return (
    <footer className="relative border-t border-white/8 mt-8">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/">
              <img src="/Raanzlr.png" alt="Raanzlr" className="h-8 w-auto mb-4" />
            </Link>
            <p className="text-sm text-white/55 leading-relaxed max-w-xs">{t.footer.tagline}</p>
            <div className="mt-5">
              <Heartbeat className="w-32 h-7 opacity-70" />
            </div>
            <div className="mt-5 space-y-2">
              <a href="mailto:contact@raanzlr.com" className="flex items-center gap-2 text-xs text-white/45 hover:text-cyan-300 transition-colors">
                <Mail className="h-3.5 w-3.5 text-cyan-400" />
                contact@raanzlr.com
              </a>
              <div className="flex items-start gap-2 text-xs text-white/45">
                <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{t.about.address}</span>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-section-label uppercase text-white/40 mb-4">
              {isAr ? "الشركة" : "Company"}
            </h4>
            <ul className="space-y-2.5">
              {LINKS.company.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-white/55 hover:text-white transition-colors">
                    {isAr ? l.ar : l.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[10px] font-section-label uppercase text-white/40 mb-4">
              {isAr ? "الموارد" : "Resources"}
            </h4>
            <ul className="space-y-2.5">
              {LINKS.resources.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-white/55 hover:text-white transition-colors">
                    {isAr ? l.ar : l.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & CTA */}
          <div>
            <h4 className="text-[10px] font-section-label uppercase text-white/40 mb-4">
              {isAr ? "قانوني" : "Legal"}
            </h4>
            <ul className="space-y-2.5">
              {LINKS.legal.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-white/55 hover:text-white transition-colors">
                    {isAr ? l.ar : l.en}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                to="/book-a-call"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2.5 text-sm font-bold text-[#050505] shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                {isAr ? "احجز مكالمة" : "Book a Call"}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Raanzlr. {t.footer.rights}
          </p>
          <p className="text-[10px] font-mono-accent uppercase tracking-[0.32em] text-white/25">
            {t.footer.engineered}
          </p>
        </div>
      </div>
    </footer>
  );
}
