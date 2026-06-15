import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import SEO from "../components/SEO";
import { POSTS } from "../data/posts";

export default function Insights() {
  const { isAr } = useLang();
  const featured = POSTS.find(p => p.featured);
  const rest = POSTS.filter(p => !p.featured);

  const fmt = (d: string) => new Date(d).toLocaleDateString(isAr ? "ar-SA" : "en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="relative">
      <SEO
        title={isAr ? "المدونة والرؤى — Raanzlr" : "Insights & Blog — Raanzlr"}
        description={isAr ? "مقالات ودراسات عميقة حول الذكاء الاصطناعي والأتمتة والهندسة البرمجية من فريق Raanzlr." : "Deep-dive articles on AI, automation, and software engineering from the Raanzlr team."}
        path="/insights"
      />

      <section className="relative min-h-[55vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="noise absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300">
            <BookOpen className="h-3.5 w-3.5" /> {isAr ? "المدونة والرؤى" : "INSIGHTS & BLOG"}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-3xl font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.04] tracking-tighter text-chrome">
            {isAr ? "رؤى الذكاء الاصطناعي والهندسة." : "AI & Engineering Insights."}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-white/65">
            {isAr
              ? "تحليلات عميقة، أدلة تقنية، ودراسات من فريق Raanzlr الهندسي — مصممة لمساعدة قادة الأعمال والمهندسين على البقاء في المقدمة."
              : "Deep analyses, technical guides, and studies from the Raanzlr engineering team — designed to help business leaders and engineers stay ahead."}
          </motion.p>
        </div>
      </section>

      <PulseDivider />

      {/* Featured */}
      {featured && (
        <section className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <Link to={`/insights/${featured.slug}`} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/20 transition-colors block">
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <img src={featured.image} alt={isAr ? featured.title.ar : featured.title.en} className="w-full h-full object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]/80 lg:bg-gradient-to-b" />
                  </div>
                  <div className="p-8 sm:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-mono-accent uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-cyan-400/40 text-cyan-300 bg-cyan-400/10">
                        {isAr ? featured.tag.ar : featured.tag.en}
                      </span>
                      <span className="text-[10px] font-mono-accent uppercase tracking-[0.18em] px-2 py-1 rounded-full border border-white/10 text-white/40">
                        {isAr ? "مقالة مميزة" : "FEATURED"}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug">{isAr ? featured.title.ar : featured.title.en}</h2>
                    <p className="mt-4 text-white/60 leading-relaxed">{isAr ? featured.excerpt.ar : featured.excerpt.en}</p>
                    <div className="mt-6 flex items-center gap-4 text-xs text-white/40 font-mono-accent">
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {featured.readTime} {isAr ? "دقائق" : "min read"}</span>
                      <span>{fmt(featured.date)}</span>
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                      {isAr ? "اقرأ المقالة" : "Read Article"} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="relative py-8 sm:py-12 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <StaggerItem key={post.slug}>
                <Link to={`/insights/${post.slug}`} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/25 transition-colors h-full flex flex-col block">
                  <div className="relative h-44 overflow-hidden">
                    <img src={post.image} alt={isAr ? post.title.ar : post.title.en} className="w-full h-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]" />
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                      <span className="text-[10px] font-mono-accent uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border border-cyan-400/35 text-cyan-300 bg-cyan-400/10">
                        {isAr ? post.tag.ar : post.tag.en}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-lg font-bold text-white leading-snug flex-1">{isAr ? post.title.ar : post.title.en}</h3>
                    <p className="mt-3 text-sm text-white/55 leading-relaxed">{isAr ? post.excerpt.ar : post.excerpt.en}</p>
                    <div className="mt-5 flex items-center justify-between text-[10px] text-white/35 font-mono-accent">
                      <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {post.readTime} {isAr ? "دقائق" : "min"}</span>
                      <span>{fmt(post.date)}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-cyan-400 group-hover:text-cyan-300 font-mono-accent transition-colors">
                      {isAr ? "اقرأ أكثر" : "Read more"} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.3}>
            <div className="mt-16 text-center">
              <p className="text-white/50 text-sm mb-6">{isAr ? "هل تريد الوصول إلى مقالات أعمق ودراسات حالة حصرية؟" : "Want access to deeper articles and exclusive case studies?"}</p>
              <MagneticButton to="/contact">{isAr ? "اشترك في النشرة الإخبارية" : "Subscribe to Our Newsletter"}</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
