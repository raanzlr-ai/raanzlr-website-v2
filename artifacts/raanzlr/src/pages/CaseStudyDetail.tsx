import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, TrendingUp } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import SEO from "../components/SEO";
import { CASES } from "../data/cases";

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { isAr } = useLang();

  const study = CASES.find((c) => c.slug === slug);
  if (!study) return <Navigate to="/case-studies" replace />;

  const others = CASES.filter((c) => c.slug !== slug).slice(0, 2);

  return (
    <div className="relative">
      <SEO
        title={`${study.title.en} — Raanzlr`}
        titleAr={`${study.title.ar} — Raanzlr`}
        description={study.desc.en}
        descriptionAr={study.desc.ar}
        keywords={`${study.industry?.en || ''} case study, AI automation case study GCC, ${study.tag?.en || ''}`}
        keywordsAr={`دراسة حالة ${study.industry?.ar || ''}، أتمتة بالذكاء الاصطناعي الخليج، ${study.tag?.ar || ''}`}
        path={`/case-studies/${study.slug}`}
        type="article"
        article={{
          publishedTime: `${study.date}T00:00:00Z`,
          author: "Raanzlr",
          section: study.industry?.en || "Technology",
          tags: study.tag ? [study.tag.en] : [],
        }}
      />

      {/* Hero */}
      <section className="relative min-h-[58vh] flex items-end overflow-hidden pt-28 sm:pt-32 pb-14">
        <div className="absolute inset-0">
          <img
            src={study.image}
            alt={isAr ? study.title.ar : study.title.en}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-[#050505]/50" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="noise absolute inset-0" />

        <div className="relative mx-auto max-w-5xl px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-xs font-mono-accent uppercase tracking-[0.18em] text-white/50 hover:text-cyan-300 transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
              {isAr ? "العودة إلى دراسات الحالة" : "Back to Case Studies"}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3 mb-5"
          >
            <span className="text-[10px] font-mono-accent uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-cyan-400/40 text-cyan-300 bg-cyan-400/10">
              {isAr ? study.tag.ar : study.tag.en}
            </span>
            <span className="text-[10px] font-mono-accent uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-white/15 text-white/50">
              {isAr ? study.industry.ar : study.industry.en}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-chrome max-w-4xl"
          >
            {isAr ? study.title.ar : study.title.en}
          </motion.h1>
        </div>
      </section>

      {/* Metrics bar */}
      <div className="relative bg-white/[0.02] border-y border-white/8">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-6">
            {study.metrics.map((m, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl sm:text-4xl font-bold text-electric">{m.value}</div>
                <div className="mt-2 text-[10px] font-mono-accent uppercase tracking-[0.18em] text-white/45">
                  {isAr ? m.label.ar : m.label.en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PulseDivider />

      {/* Content */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-12">
              <Reveal>
                <div>
                  <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300 mb-4">
                    {isAr ? "// التحدي" : "// The Challenge"}
                  </p>
                  <p className="text-white/70 leading-[1.85] text-base sm:text-lg">
                    {isAr ? study.challenge.ar : study.challenge.en}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div>
                  <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300 mb-4">
                    {isAr ? "// الحل" : "// The Solution"}
                  </p>
                  <p className="text-white/70 leading-[1.85] text-base sm:text-lg">
                    {isAr ? study.solution.ar : study.solution.en}
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-2 space-y-5">
              <Reveal delay={0.15}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-white/40 mb-4">
                    {isAr ? "// نتائج القياس" : "// Measured Outcomes"}
                  </p>
                  <div className="space-y-4">
                    {study.metrics.map((m, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b border-white/8 last:border-0">
                        <span className="text-sm text-white/60">
                          {isAr ? m.label.ar : m.label.en}
                        </span>
                        <span className="font-display text-xl font-bold text-electric">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-white/40 mb-3">
                    {isAr ? "// القطاع" : "// Industry"}
                  </p>
                  <span className="text-sm text-white font-semibold">
                    {isAr ? study.industry.ar : study.industry.en}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-6">
                  <p className="text-sm text-white/70 mb-4">
                    {isAr
                      ? "هل مشروعك يواجه تحديات مماثلة؟"
                      : "Facing similar challenges in your business?"}
                  </p>
                  <MagneticButton to="/contact">
                    {isAr ? "تحدث مع فريقنا" : "Talk to Our Team"}
                  </MagneticButton>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Other case studies */}
      {others.length > 0 && (
        <section className="relative pb-24 pt-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <div className="flex items-center justify-between mb-8">
                <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-white/40">
                  {isAr ? "// دراسات أخرى" : "// More Case Studies"}
                </p>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200 transition-colors font-mono-accent"
                >
                  {isAr ? "كل الدراسات" : "All case studies"}
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </Reveal>

            <Stagger className="grid sm:grid-cols-2 gap-6">
              {others.map((c) => (
                <StaggerItem key={c.slug}>
                  <Link
                    to={`/case-studies/${c.slug}`}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/25 transition-all h-full flex flex-col block"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={c.image}
                        alt={isAr ? c.title.ar : c.title.en}
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]" />
                      <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex gap-2">
                        <span className="text-[10px] font-mono-accent uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-cyan-400/40 text-cyan-300 bg-cyan-400/10">
                          {isAr ? c.tag.ar : c.tag.en}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display text-lg font-bold text-white leading-snug">
                        {isAr ? c.title.ar : c.title.en}
                      </h3>
                      <div className="mt-6 grid grid-cols-3 gap-3 pt-4 border-t border-white/8">
                        {c.metrics.map((m, j) => (
                          <div key={j} className="text-center">
                            <div className="font-display text-xl font-bold text-electric">{m.value}</div>
                            <div className="mt-1 text-[9px] font-mono-accent uppercase tracking-[0.12em] text-white/40">
                              {isAr ? m.label.ar : m.label.en}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}
    </div>
  );
}
