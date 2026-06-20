import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Workflow,
  Globe2,
  Smartphone,
  Sparkles,
  PlugZap,
  PenTool,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import SEO from "../components/SEO";

const icons: Record<string, React.ElementType> = {
  "ai-chatbots": Bot,
  "workflow-automation": Workflow,
  "web-development": Globe2,
  "mobile-apps": Smartphone,
  "custom-ai": Sparkles,
  "crm-integration": PlugZap,
  "ui-ux": PenTool,
  consulting: ShieldCheck,
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, isAr } = useLang();

  const service = t.services.items.find((s: any) => s.key === slug);
  if (!service) return <Navigate to="/services" replace />;

  // Get both language versions for proper bilingual SEO
  const enSvc = translations.en.services.items.find((s: any) => s.key === slug);
  const arSvc = translations.ar.services.items.find((s: any) => s.key === slug);

  const Icon = icons[service.key] ?? Sparkles;
  const others = t.services.items.filter((s: any) => s.key !== slug).slice(0, 3);

  return (
    <div className="relative">
      <SEO
        title={`${enSvc?.title ?? service.title} — Raanzlr`}
        titleAr={`${arSvc?.title ?? service.title} — Raanzlr`}
        description={enSvc?.desc ?? service.desc}
        descriptionAr={arSvc?.desc ?? service.desc}
        keywords={`${enSvc?.title}, AI GCC, automation MENA, software development`}
        keywordsAr={`${arSvc?.title}، ذكاء اصطناعي الخليج، أتمتة الشرق الأوسط`}
        path={`/services/${service.key}`}
      />

      {/* Hero */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.title}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/80 to-[#050505]" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -top-20 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="noise absolute inset-0" />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 w-full py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-mono-accent uppercase tracking-[0.18em] text-white/50 hover:text-cyan-300 transition-colors mb-8"
            >
              <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
              {isAr ? "العودة إلى الخدمات" : "Back to Services"}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center h-16 w-16 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 mb-6"
          >
            <Icon className="h-8 w-8 text-cyan-300" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mb-4"
          >
            <span
              className={`inline-flex items-center gap-1.5 text-[10px] font-mono-accent uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border ${
                service.tier === "high"
                  ? "border-cyan-400/40 text-cyan-300 bg-cyan-400/10"
                  : "border-white/15 text-white/50"
              }`}
            >
              {service.tier === "high"
                ? isAr
                  ? "طلب مرتفع"
                  : t.services.highDemand
                : isAr
                ? "متاح"
                : t.services.standard}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.04] tracking-tighter text-chrome max-w-3xl"
          >
            {service.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-white/65 leading-relaxed"
          >
            {service.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <MagneticButton to={`/contact?service=${encodeURIComponent(service.title)}`}>
              {t.cta.requestService}
            </MagneticButton>
            <MagneticButton to="/case-studies" variant="ghost">
              {isAr ? "عرض الأعمال" : "View Our Work"}
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <PulseDivider />

      {/* Detail */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-14">
            {/* Long description */}
            <div className="lg:col-span-3">
              <Reveal>
                <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300 mb-5">
                  {isAr ? "// نظرة عامة" : "// Overview"}
                </p>
                <p className="text-white/70 text-base sm:text-lg leading-[1.85]">
                  {service.long}
                </p>
              </Reveal>
            </div>

            {/* Helps list */}
            <div className="lg:col-span-2">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                  <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-white/40 mb-6">
                    {isAr ? "// كيف يساعدك هذا" : "// How This Helps You"}
                  </p>
                  <ul className="space-y-4">
                    {service.helps.map((h: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-white/70 leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Reveal>
            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.04] px-8 py-12 sm:py-16">
              <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300 mb-4">
                {isAr ? "// ابدأ مشروعك" : "// Start Your Project"}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                {isAr
                  ? `هل تحتاج إلى ${service.title}?`
                  : `Ready to build ${service.title}?`}
              </h2>
              <p className="text-white/55 mb-8 max-w-md mx-auto">
                {isAr
                  ? "أخبرنا عن مشروعك وسيتواصل معك مهندس أول خلال يوم عمل واحد."
                  : "Tell us about your project and a senior engineer will be in touch within one business day."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <MagneticButton
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                >
                  {t.cta.requestService}
                </MagneticButton>
                <MagneticButton to="/contact" variant="ghost">
                  {t.cta.contactUs}
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other services */}
      {others.length > 0 && (
        <section className="relative pb-24 pt-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <div className="flex items-center justify-between mb-8">
                <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-white/40">
                  {isAr ? "// خدمات أخرى" : "// Other Services"}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200 transition-colors font-mono-accent"
                >
                  {isAr ? "كل الخدمات" : "All services"}
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </Reveal>
            <Stagger className="grid sm:grid-cols-3 gap-5">
              {others.map((s: any) => {
                const OtherIcon = icons[s.key] ?? Sparkles;
                return (
                  <StaggerItem key={s.key}>
                    <Link
                      to={`/services/${s.key}`}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/25 transition-colors p-6 flex flex-col h-full block"
                    >
                      <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-white/15 bg-white/[0.04] mb-4 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/8 transition-colors">
                        <OtherIcon className="h-5 w-5 text-white/60 group-hover:text-cyan-300 transition-colors" />
                      </div>
                      <h3 className="font-display text-base font-semibold text-white mb-2 leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed flex-1">{s.desc}</p>
                      <div className="mt-4 flex items-center gap-1.5 text-xs text-cyan-400 font-mono-accent">
                        {isAr ? "تعرف أكثر" : "Learn more"}
                        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}
    </div>
  );
}
