import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Bot, Workflow, Globe2, Smartphone, Sparkles, PlugZap, PenTool, ShieldCheck, Clock, TrendingUp, Award, Languages, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import ParticlesHero from "../components/ParticlesHero";
import MagneticButton from "../components/MagneticButton";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import Heartbeat from "../components/Heartbeat";
import SEO from "../components/SEO";

const featureIcons = [Clock, TrendingUp, Award, Languages];
const serviceIcons: Record<string, React.ElementType> = {
  "ai-chatbots": Bot,
  "workflow-automation": Workflow,
  "web-development": Globe2,
  "mobile-apps": Smartphone,
  "custom-ai": Sparkles,
  "crm-integration": PlugZap,
  "ui-ux": PenTool,
  "consulting": ShieldCheck,
};

const HeroLogoStage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) / r.width);
    my.set((e.clientY - (r.top + r.height / 2)) / r.height);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className="relative aspect-square w-full max-w-[560px] mx-auto rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden"
    >
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <div className="absolute inset-0 slow-spin" style={{ background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0,240,255,0.55) 45deg, transparent 90deg, transparent 180deg, rgba(37,99,235,0.45) 225deg, transparent 270deg)", filter: "blur(40px)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-6 rounded-full border border-cyan-400/20" />
        <div className="absolute inset-16 rounded-full border border-blue-400/15" />
        <div className="absolute inset-28 rounded-full border border-white/10" />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ y: "-110%" }}
          animate={{ y: "120%" }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-32"
          style={{ background: "linear-gradient(180deg, transparent, rgba(0,240,255,0.12), transparent)", filter: "blur(6px)" }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.img
          src="/Raanzlr.png"
          alt="Raanzlr"
          className="h-[50%] w-[50%] object-contain floaty drop-shadow-[0_0_60px_rgba(0,240,255,0.55)]"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>
      <div className="absolute left-0 right-0 bottom-12">
        <Heartbeat className="w-full h-16" />
      </div>
      {[["top-3 left-3", "border-t border-l"], ["top-3 right-3", "border-t border-r"], ["bottom-3 left-3", "border-b border-l"], ["bottom-3 right-3", "border-b border-r"]].map(([pos, b], i) => (
        <span key={i} className={`absolute ${pos} h-5 w-5 ${b} border-cyan-400/40`} />
      ))}
      <div className="absolute inset-x-0 bottom-4 text-center text-[10px] font-mono-accent tracking-[0.32em] text-white/40 uppercase">signal · 01 · global</div>
    </motion.div>
  );
};

function HomeFAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border transition-colors overflow-hidden ${open ? "border-cyan-400/30 bg-cyan-400/[0.03]" : "border-white/8 bg-white/[0.02] hover:border-white/15"}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left rtl:text-right"
      >
        <span className="text-sm font-medium text-white">{q}</span>
        <ChevronDown className={`h-4 w-4 text-white/40 shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-cyan-300" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm text-white/60 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { t, isAr } = useLang();

  return (
    <div data-testid="home-page" className="relative">
      <SEO pageKey="home" path="/" />

      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="absolute inset-0"><ParticlesHero /></div>
        <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="noise absolute inset-0" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-32 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            <div className="lg:col-span-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-[10px] sm:text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {t.home.eyebrow}
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tighter">
                <span className="text-chrome">{t.home.heroTitle}</span>{" "}
                <span className="text-electric glow-text">{t.home.heroTitleAccent}</span>
                {!isAr && <br />}
                <span className="text-chrome">{isAr ? " " : ""}{t.home.heroTitleEnd}</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
                className="mt-7 max-w-xl text-base md:text-lg leading-relaxed text-white/65">
                {t.home.heroSub}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
                <MagneticButton to="/contact" testId="hero-cta-getstarted">
                  {t.cta.getStarted} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </MagneticButton>
                <MagneticButton to="/services" variant="ghost" testId="hero-cta-services">
                  {t.cta.learnMore}
                </MagneticButton>
              </motion.div>
              <div className="mt-14 hidden sm:flex flex-wrap items-center gap-3 text-white/40 font-mono-accent text-[10px] uppercase tracking-[0.28em]">
                {t.home.heroChips.map((c, i) => (
                  <React.Fragment key={i}>
                    <span>{c}</span>
                    {i < t.home.heroChips.length - 1 && <span className="opacity-50">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6 relative">
              <HeroLogoStage />
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 inset-x-0 hidden md:flex justify-center">
          <div className="h-10 w-6 rounded-full border border-white/15 flex items-start justify-center p-1">
            <div className="h-2 w-1 rounded-full bg-cyan-300 animate-bounce" />
          </div>
        </div>
      </section>

      <PulseDivider />

      {/* WHY */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90">{t.home.whyLabel}</div>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-chrome">{t.home.whyTitle}</h2>
              <p className="mt-4 text-white/60">{t.home.whySub}</p>
            </div>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.home.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <StaggerItem key={i}>
                  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 h-full hover:border-cyan-400/40 transition-colors">
                    <div className="shimmer-layer absolute inset-0 pointer-events-none" />
                    <div className="flex items-center justify-between">
                      <div className="h-11 w-11 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </div>
                      <span className="text-[10px] font-mono-accent text-white/30 uppercase tracking-[0.2em]">0{i + 1}</span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-white">{f.title}</h3>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed">{f.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-radial-fade opacity-60" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90">{t.home.servicesLabel}</div>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-chrome">{t.home.servicesPreview}</h2>
                <p className="mt-4 text-white/60">{t.home.servicesPreviewSub}</p>
              </div>
              <Link to="/services" className="inline-flex items-center gap-2 text-sm font-mono-accent uppercase tracking-[0.22em] text-cyan-300 hover:text-white transition-colors">
                {t.cta.viewAll} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.services.items.slice(0, 6).map((s) => {
              const Icon = serviceIcons[s.key] || Bot;
              return (
                <StaggerItem key={s.key}>
                  <Link to={`/services?open=${s.key}`} className="group relative block rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-cyan-400/40 transition-colors overflow-hidden">
                    <div className="shimmer-layer absolute inset-0 pointer-events-none" />
                    <div className="h-11 w-11 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm text-white/55 leading-relaxed">{s.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-mono-accent uppercase tracking-[0.18em] text-cyan-300 group-hover:text-white transition-colors">
                      {t.cta.viewDetails} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-4">
                {isAr ? "// الأسئلة الشائعة" : "// FAQ"}
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-chrome">
                {isAr ? "أسئلة يطرحها الناس دائماً" : "Questions people always ask"}
              </h2>
            </div>
          </Reveal>
          <div className="space-y-3">
            {(isAr ? [
              { q: "ما هي الخدمات التي تقدمها Raanzlr؟", a: "نقدم وكلاء ذكاء اصطناعي وروبوتات محادثة، أتمتة سير العمل، تطوير مواقع وتطبيقات الهاتف المحمول، تكامل الأنظمة، وحلول ذكاء اصطناعي مخصصة للشركات." },
              { q: "هل تدعمون اللغة العربية بشكل كامل؟", a: "نعم، نبني جميع حلولنا مع دعم كامل للغة العربية وتخطيط RTL من اليوم الأول — وليس كإضافة لاحقة." },
              { q: "كم يستغرق إنجاز مشروع نموذجي؟", a: "روبوت محادثة بسيط: 2-4 أسابيع. موقع ويب: 4-8 أسابيع. حلول ذكاء اصطناعي مخصصة: 6-12 أسبوعاً." },
              { q: "هل تقدمون استشارة مجانية؟", a: "نعم، نقدم استشارة أولية مجانية (30-45 دقيقة) لفهم احتياجاتك ومناقشة الحلول الممكنة دون أي التزام." },
              { q: "ما نماذج التسعير المتاحة؟", a: "نقدم تسعيراً بناءً على المشروع، ودفعات على مراحل، وعقود صيانة شهرية. نوضح جميع التكاليف بشفافية كاملة قبل البدء." },
            ] : [
              { q: "What services does Raanzlr offer?", a: "We build AI agents & chatbots, workflow automation, web & mobile apps, systems integration, and custom AI solutions for businesses." },
              { q: "Do you fully support Arabic?", a: "Yes — we build every solution with full Arabic support and RTL layout from day one, not as an afterthought." },
              { q: "How long does a typical project take?", a: "Simple chatbot: 2-4 weeks. Website: 4-8 weeks. Custom AI solutions: 6-12 weeks. We provide detailed timelines at project start." },
              { q: "Do you offer a free consultation?", a: "Yes. We offer a free 30-45 minute discovery call to understand your needs and discuss possible solutions — no commitment needed." },
              { q: "What pricing models do you offer?", a: "We offer project-based pricing, milestone payments, and monthly maintenance contracts. All costs are outlined transparently upfront." },
            ]).map((item, i) => (
              <HomeFAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <Link to={isAr ? "/ar/faq" : "/faq"} className="inline-flex items-center gap-2 text-sm font-mono-accent uppercase tracking-[0.18em] text-cyan-300 hover:text-white transition-colors">
                {isAr ? "عرض جميع الأسئلة" : "View all questions"} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.06] to-transparent p-8 sm:p-12 text-center">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="relative">
                <Heartbeat className="w-40 h-8 mx-auto mb-6" />
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-chrome">
                  {t.services.customEngagementTitle}
                </h3>
                <p className="mt-4 text-white/60 max-w-xl mx-auto">{t.services.customEngagementDesc}</p>
                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                  <MagneticButton to="/contact">{t.cta.getStarted}</MagneticButton>
                  <MagneticButton to="/contact" variant="ghost">{t.cta.contactUs}</MagneticButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
