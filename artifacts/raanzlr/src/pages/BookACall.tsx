import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle2, Mail } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import Heartbeat from "../components/Heartbeat";
import SEO from "../components/SEO";

const BENEFITS = {
  en: [
    "30-minute focused strategy session with a senior engineer",
    "Honest assessment of your automation opportunities",
    "Ballpark timeline and budget estimate",
    "No sales pressure — just genuine technical guidance",
  ],
  ar: [
    "جلسة استراتيجية مركزة لمدة 30 دقيقة مع مهندس كبير",
    "تقييم صادق لفرص الأتمتة لديك",
    "تقدير أولي للجدول الزمني والميزانية",
    "بدون ضغط مبيعات — فقط توجيه تقني حقيقي",
  ],
};

const TOPICS = {
  en: ["AI Agent / Chatbot Development", "Workflow Automation", "Web or Mobile App", "Custom AI / RAG System", "Systems Integration", "Technical Audit", "Other"],
  ar: ["تطوير وكيل ذكاء اصطناعي", "أتمتة سير العمل", "تطبيق ويب أو جوال", "نظام ذكاء اصطناعي مخصص / RAG", "تكامل الأنظمة", "تدقيق تقني", "أخرى"],
};

export default function BookACall() {
  const { isAr } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", topic: "", message: "" });

  const fieldCls = "w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/50 transition-colors focus:outline-none";
  const labelCls = "block text-xs font-mono-accent uppercase tracking-[0.18em] text-white/60 mb-2";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="relative">
      <SEO
        title={isAr ? "احجز مكالمة استراتيجية — Raanzlr" : "Book a Strategy Call — Raanzlr"}
        description={isAr ? "احجز مكالمة استراتيجية مجانية لمدة 30 دقيقة مع مهندس من Raanzlr لمناقشة فرص الذكاء الاصطناعي والأتمتة." : "Book a free 30-minute strategy call with a Raanzlr engineer to discuss your AI and automation opportunities."}
        path="/book-a-call"
      />

      <section className="relative min-h-[55vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-cyan-400/10 blur-[100px]" />
        <div className="noise absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 w-full py-16 sm:py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300">
            <Calendar className="h-3.5 w-3.5" /> {isAr ? "احجز مكالمة" : "BOOK A CALL"}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.04] tracking-tighter text-chrome">
            {isAr ? "لنتحدث عن فرصتك." : "Let's talk about your opportunity."}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-xl mx-auto text-base md:text-lg text-white/65">
            {isAr
              ? "احجز مكالمة مجانية لمدة 30 دقيقة مع أحد مهندسينا الكبار. لا توجد عروض مبيعات — فقط محادثة صادقة حول ما يمكننا بناؤه معاً."
              : "Book a free 30-minute call with one of our senior engineers. No sales pitch — just an honest conversation about what we could build together."}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }} className="mt-6 flex justify-center">
            <Heartbeat className="w-40 h-7" />
          </motion.div>
        </div>
      </section>

      <PulseDivider />

      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits */}
          <Reveal>
            <div>
              <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-6">
                {isAr ? "// ما ستحصل عليه" : "// what you get"}
              </div>
              <ul className="space-y-5">
                {(isAr ? BENEFITS.ar : BENEFITS.en).map((b, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-lg border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                    </div>
                    <span className="text-white/70 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-5 w-5 text-cyan-300" />
                  <span className="font-display font-semibold text-white">{isAr ? "30 دقيقة. مجاناً. بدون التزام." : "30 minutes. Free. No commitment."}</span>
                </div>
                <p className="text-sm text-white/55 leading-relaxed">
                  {isAr
                    ? "نحن نقدر وقتك. إذا لم تكن الجلسة مفيدة، لا نتوقع شيئاً — هذا وعدنا لك."
                    : "We respect your time. If the session isn't useful, we expect nothing — that's our commitment to you."}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-white/45">
                  <Mail className="h-4 w-4 text-cyan-400" />
                  <span>contact@raanzlr.com</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.2}>
            {submitted ? (
              <div className="rounded-3xl border border-cyan-400/30 bg-cyan-500/[0.05] p-10 text-center">
                <div className="h-16 w-16 rounded-full border border-cyan-400/40 bg-cyan-400/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-8 w-8 text-cyan-300" />
                </div>
                <h3 className="font-display text-2xl font-bold text-chrome">{isAr ? "تم تلقي طلبك!" : "Request Received!"}</h3>
                <p className="mt-4 text-white/60 leading-relaxed">
                  {isAr
                    ? "سنتواصل معك خلال 24 ساعة عمل بخيارات مواعيد متاحة. في انتظار محادثتنا!"
                    : "We'll reach out within 24 business hours with available appointment options. Looking forward to our conversation!"}
                </p>
                <div className="mt-8">
                  <MagneticButton to="/">{isAr ? "العودة للرئيسية" : "Back to Home"}</MagneticButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.02] p-8">
                <h3 className="font-display text-xl font-bold text-white mb-6">{isAr ? "طلب مكالمة استراتيجية" : "Request a Strategy Call"}</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>{isAr ? "الاسم الكامل" : "Full Name"}</label>
                    <input type="text" required className={fieldCls} value={form.name} onChange={e => setForm(s => ({ ...s, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className={labelCls}>{isAr ? "البريد الإلكتروني" : "Email"}</label>
                    <input type="email" required className={fieldCls} value={form.email} onChange={e => setForm(s => ({ ...s, email: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>{isAr ? "الشركة" : "Company"}</label>
                  <input type="text" className={fieldCls} value={form.company} onChange={e => setForm(s => ({ ...s, company: e.target.value }))} />
                </div>
                <div>
                  <label className={labelCls}>{isAr ? "الموضوع الرئيسي" : "Primary Topic"}</label>
                  <select required className={fieldCls} value={form.topic} onChange={e => setForm(s => ({ ...s, topic: e.target.value }))}>
                    <option value="">—</option>
                    {(isAr ? TOPICS.ar : TOPICS.en).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>{isAr ? "أخبرنا المزيد (اختياري)" : "Tell Us More (optional)"}</label>
                  <textarea rows={3} className={fieldCls} value={form.message} onChange={e => setForm(s => ({ ...s, message: e.target.value }))} />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-3.5 text-sm font-bold text-[#050505] shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-shadow disabled:opacity-60">
                  {loading ? (isAr ? "جارٍ الإرسال..." : "Submitting...") : (isAr ? "احجز مكالمتي المجانية" : "Book My Free Call")}
                </button>
                <p className="text-xs text-center text-white/35">{isAr ? "لن نشارك معلوماتك مع أي طرف ثالث." : "We never share your information with third parties."}</p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
