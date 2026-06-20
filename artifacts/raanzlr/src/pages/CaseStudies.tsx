import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import SEO from "../components/SEO";
import { CASES } from "../data/cases";

export default function CaseStudies() {
  const { isAr } = useLang();

  return (
    <div className="relative">
      <SEO pageKey="caseStudies" path="/case-studies" />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="noise absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300">
            <TrendingUp className="h-3.5 w-3.5" /> {isAr ? "دراسات الحالة" : "CASE STUDIES"}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-4xl font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.04] tracking-tighter text-chrome">
            {isAr ? "ما نستطيع بناؤه لك." : "What we build for you."}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-white/65">
            {isAr
              ? "هذه نماذج تمثيلية للمشاريع التي نبنيها — تعكس الأنواع الحقيقية من التحديات التي نحلها وأسلوب عملنا. نحافظ على سرية بيانات عملائنا الفعليين."
              : "These showcase the types of projects we engineer — reflecting real challenge patterns and our delivery approach. Actual client details are kept confidential."}
          </motion.p>
        </div>
      </section>

      <PulseDivider />

      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Stagger className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CASES.map((c) => (
              <StaggerItem key={c.slug}>
                <Link to={`/case-studies/${c.slug}`} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/25 transition-all h-full flex flex-col block">
                  <div className="relative h-48 overflow-hidden">
                    <img src={c.image} alt={isAr ? c.title.ar : c.title.en} className="w-full h-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]" />
                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex gap-2">
                      <span className="text-[10px] font-mono-accent uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-cyan-400/40 text-cyan-300 bg-cyan-400/10">
                        {isAr ? c.tag.ar : c.tag.en}
                      </span>
                      <span className="text-[10px] font-mono-accent uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-white/15 text-white/50">
                        {isAr ? c.industry.ar : c.industry.en}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">{isAr ? c.title.ar : c.title.en}</h3>
                      <ArrowUpRight className="h-5 w-5 text-white/30 group-hover:text-cyan-300 shrink-0 mt-1 transition-colors rtl:-scale-x-100" />
                    </div>
                    <p className="mt-3 text-sm text-white/60 leading-relaxed flex-1">{isAr ? c.desc.ar : c.desc.en}</p>
                    <div className="mt-6 grid grid-cols-3 gap-4 pt-5 border-t border-white/8">
                      {c.metrics.map((m, j) => (
                        <div key={j} className="text-center">
                          <div className="font-display text-2xl font-bold text-electric">{m.value}</div>
                          <div className="mt-1 text-[10px] font-mono-accent uppercase tracking-[0.15em] text-white/40">{isAr ? m.label.ar : m.label.en}</div>
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

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-white/40 text-sm font-mono-accent uppercase tracking-[0.22em] mb-4">{isAr ? "ابنِ قصتك القادمة" : "BUILD YOUR NEXT SUCCESS STORY"}</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-chrome">{isAr ? "مشروعك يمكن أن يكون التالي." : "Your project could be next."}</h2>
            <p className="mt-4 text-white/60 max-w-md mx-auto">{isAr ? "احجز استشارة مجانية ودعنا نناقش كيف يمكننا مساعدتك في تحقيق نتائج مماثلة." : "Book a free consultation and let's discuss how we can help you achieve similar results."}</p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <MagneticButton to="/contact">{isAr ? "تواصل معنا للبدء" : "Get in Touch"}</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
