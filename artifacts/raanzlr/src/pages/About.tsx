import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Rocket, ShieldCheck, Headphones } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import PulseDivider from "../components/PulseDivider";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import MagneticButton from "../components/MagneticButton";
import Heartbeat from "../components/Heartbeat";
import SEO from "../components/SEO";

const VALUE_ICONS = [Rocket, ShieldCheck, Headphones];

export default function About() {
  const { t, isAr } = useLang();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <div className="relative">
      <SEO pageKey="about" path="/about" />

      <section ref={heroRef} className="relative min-h-[100vh] overflow-hidden flex items-center">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1772090131833-f7db87feab28?crop=entropy&cs=srgb&fm=jpg&q=85&w=1800"
            alt=""
            role="presentation"
            loading="eager"
            fetchPriority="high"
            className="w-full h-[130%] object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/70 to-[#050505]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 to-transparent" />
        </motion.div>
        <div className="absolute inset-0 bg-grid opacity-30" />

        <motion.div style={{ y: textY, opacity }} className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-28 md:py-32">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300">
            {t.about.eyebrow}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.12 }}
            className="mt-6 max-w-4xl font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tighter text-chrome">
            {t.about.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-6 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed">
            {t.about.sub}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="mt-10">
            <Heartbeat className="w-56 sm:w-64 h-10" />
          </motion.div>
        </motion.div>
      </section>

      <PulseDivider />

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90">{t.about.principlesLabel}</div>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-chrome">{t.about.principlesTitle}</h2>
            </div>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.about.values.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <StaggerItem key={i}>
                  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 h-full hover:border-cyan-400/30 transition-colors">
                    <div className="shimmer-layer absolute inset-0 pointer-events-none" />
                    <div className="h-12 w-12 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center mb-5">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white">{v.title}</h3>
                    <p className="mt-3 text-sm text-white/60 leading-relaxed">{v.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <PulseDivider />

      {/* HQ */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-4">{t.about.hqLabel}</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-chrome">{t.about.hqTitle}</h2>
              <p className="mt-4 text-white/60 leading-relaxed">{t.about.hqDesc}</p>
              <div className="mt-6 flex items-start gap-3">
                <MapPin className="h-4 w-4 text-cyan-400 shrink-0 mt-1" />
                <span className="text-sm text-white/60">{t.about.address}</span>
              </div>
              <div className="mt-8 flex gap-4 flex-wrap">
                <MagneticButton to="/contact">{t.cta.contactUs}</MagneticButton>
                <MagneticButton to="/contact" variant="ghost">{t.cta.contactUs}</MagneticButton>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-xs text-white/40 font-mono-accent uppercase tracking-[0.18em]">
                  {isAr ? "تابعنا:" : "Follow us:"}
                </span>
                <a href="https://www.facebook.com/Raanzlr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="h-8 w-8 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-[#1877F2] hover:border-[#1877F2]/40 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/raanzlr.tech" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="h-8 w-8 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-[#E4405F] hover:border-[#E4405F]/40 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/raanzlr" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="h-8 w-8 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80"
                  alt="Global operations"
                  loading="lazy"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs font-mono-accent uppercase tracking-[0.28em] text-cyan-300/70 mb-1">{t.about.hq}</div>
                  <p className="text-sm text-white/80">{t.about.address}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
