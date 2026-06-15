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
  const { t } = useLang();
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
            alt="Modern skyline"
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
                <MagneticButton to="/book-a-call" variant="ghost">{t.cta.bookCall}</MagneticButton>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80"
                  alt="Global operations"
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
