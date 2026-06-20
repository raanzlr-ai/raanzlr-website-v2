import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Globe2, TrendingUp, Building2, Zap, ArrowRight, 
  CheckCircle2, MapPin, Phone, Mail, ArrowLeft, ChevronDown 
} from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import Heartbeat from "../components/Heartbeat";
import SEO from "../components/SEO";
import SyriaFlag from "../components/SyriaFlag";
import { MARKET_DETAILS } from "../data/markets";

export default function MarketDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { isAr } = useLang();
  
  const market = MARKET_DETAILS.find(m => m.slug === slug);
  
  if (!market) {
    return <Navigate to="/markets" replace />;
  }

  const content = isAr ? market.ar : market.en;

  return (
    <div className="relative">
      <SEO
        title={`${market.en.name} — Market — Raanzlr`}
        titleAr={`${market.ar.name} — سوق — Raanzlr`}
        description={market.en.metaDescription}
        descriptionAr={market.ar.metaDescription}
        keywords={market.en.keywords}
        keywordsAr={market.ar.keywords}
        path={`/markets/${slug}`}
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0">
          <img
            src={market.heroImage}
            alt={content.name}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/85 to-[#050505]" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="noise absolute inset-0" />
        <div className="absolute -top-20 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/markets"
              className="inline-flex items-center gap-2 text-xs font-mono-accent uppercase tracking-[0.18em] text-white/50 hover:text-cyan-300 transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
              {isAr ? "العودة إلى الأسواق" : "Back to Markets"}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300"
          >
            <Globe2 className="h-3.5 w-3.5" /> 
            {content.region}
          </motion.div>

          <div className="mt-6 flex items-center gap-4">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={market.flag === "SYRIA_FLAG" ? "" : "text-6xl"}
            >
              {market.flag === "SYRIA_FLAG" ? (
                <SyriaFlag className="w-20 h-14" />
              ) : (
                market.flag
              )}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tighter text-chrome"
            >
              {content.heroTitle}
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 flex items-center gap-2 text-white/50"
          >
            <MapPin className="h-4 w-4 text-cyan-400" />
            <span className="text-sm">{content.cities}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-6 max-w-3xl text-base md:text-lg text-white/65 leading-relaxed"
          >
            {content.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton to="/contact">
              {isAr ? "تواصل معنا" : "Get Started"}
            </MagneticButton>
            <MagneticButton to="/contact" variant="ghost">
              {isAr ? "تواصل معنا" : "Get in Touch"}
            </MagneticButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-10"
          >
            <Heartbeat className="w-48 h-8" />
          </motion.div>
        </div>
      </section>

      <PulseDivider />

      {/* Why This Market */}
      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7">
                <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-4">
                  {isAr ? "// لماذا هذا السوق" : "// Why This Market"}
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-chrome mb-6">
                  {content.whyTitle}
                </h2>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  {content.whyParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.06] to-transparent p-8">
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="relative">
                    <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300 mb-6">
                      {isAr ? "// مزايا رئيسية" : "// Key Advantages"}
                    </div>
                    <ul className="space-y-4">
                      {content.keyAdvantages.map((adv, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-white/80">{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services for This Market */}
      <section className="relative py-20 sm:py-24 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-4">
              {isAr ? "// الخدمات" : "// Services"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-chrome mb-12">
              {content.servicesTitle}
            </h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {content.services.map((service, i) => (
              <StaggerItem key={i}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/30 transition-colors p-6 h-full">
                  <div className="shimmer-layer absolute inset-0 pointer-events-none" />
                  <div className="h-10 w-10 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center mb-4">
                    <Zap className="h-5 w-5 text-cyan-300" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.3}>
            <div className="mt-10 text-center">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-mono-accent uppercase tracking-[0.18em] text-cyan-300 hover:text-white transition-colors"
              >
                {isAr ? "عرض جميع الخدمات" : "View All Services"}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-4">
              {isAr ? "// القطاعات" : "// Industries"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-chrome mb-12">
              {content.industriesTitle}
            </h2>
          </Reveal>

          <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {content.industries.map((industry, i) => (
              <StaggerItem key={i}>
                <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/25 transition-colors p-5 text-center">
                  <div className="shimmer-layer absolute inset-0 pointer-events-none" />
                  <Building2 className="h-6 w-6 text-cyan-400/70 mx-auto mb-3" />
                  <div className="text-sm font-medium text-white/90">{industry}</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.3}>
            <div className="mt-10 text-center">
              <Link
                to="/industries"
                className="inline-flex items-center gap-2 text-sm font-mono-accent uppercase tracking-[0.18em] text-cyan-300 hover:text-white transition-colors"
              >
                {isAr ? "عرض جميع القطاعات" : "Explore All Industries"}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Use Cases */}
      <section className="relative py-20 sm:py-24 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-4">
              {isAr ? "// حالات استخدام" : "// Use Cases"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-chrome mb-6">
              {content.useCasesTitle}
            </h2>
            <p className="text-white/60 max-w-3xl mb-12">{content.useCasesIntro}</p>
          </Reveal>

          <Stagger className="grid md:grid-cols-2 gap-6">
            {content.useCases.map((useCase, i) => (
              <StaggerItem key={i}>
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 h-full">
                  <div className="shimmer-layer absolute inset-0 pointer-events-none" />
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center shrink-0">
                      <span className="text-cyan-300 font-mono-accent text-sm">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-white mb-2">
                        {useCase.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {useCase.description}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Raanzlr */}
      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.06] to-transparent p-10 sm:p-14">
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="relative">
                <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300 mb-4">
                  {isAr ? "// لماذا Raanzlr" : "// Why Raanzlr"}
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
                  {content.whyRaanzlrTitle}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                  {content.whyRaanzlr.map((reason, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-white/80">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 sm:py-24 bg-white/[0.01]">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-4">
              {isAr ? "// أسئلة شائعة" : "// FAQ"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-chrome mb-12">
              {content.faqTitle}
            </h2>
          </Reveal>

          <Stagger className="space-y-4">
            {content.faqs.map((faq, i) => (
              <StaggerItem key={i}>
                <details className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/30 transition-colors">
                  <summary className="relative px-6 py-5 cursor-pointer list-none flex items-start justify-between gap-4">
                    <span className="font-display text-base sm:text-lg font-semibold text-white pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown className="h-5 w-5 text-cyan-300 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5 text-white/70 leading-relaxed text-sm">
                    {faq.a}
                  </div>
                </details>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.06] to-transparent p-8 sm:p-12 text-center">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="relative">
                <Heartbeat className="w-40 h-8 mx-auto mb-6" />
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-chrome">
                  {content.ctaTitle}
                </h3>
                <p className="mt-4 text-white/60 max-w-xl mx-auto">
                  {content.ctaDescription}
                </p>
                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                  <MagneticButton to="/contact">
                    {isAr ? "تواصل معنا الآن" : "Contact Us Now"}
                  </MagneticButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
