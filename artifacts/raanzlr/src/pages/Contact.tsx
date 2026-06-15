import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Mail, MapPin, Activity } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import PulseDivider from "../components/PulseDivider";
import { Reveal } from "../components/Reveal";
import Heartbeat from "../components/Heartbeat";
import SEO from "../components/SEO";
import PhoneInput from "../components/PhoneInputWithSearch";

const N8N_CONTACT = import.meta.env.VITE_N8N_CONTACT_WEBHOOK;
const N8N_SERVICE = import.meta.env.VITE_N8N_SERVICE_WEBHOOK;

const fieldCls = "w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/50 transition-colors focus:outline-none";
const labelCls = "block text-xs font-mono-accent uppercase tracking-[0.18em] text-white/60 mb-2";

const SERVICES_LIST = ["AI Agents & Chatbots", "Workflow Automation", "Web Platforms & Apps", "Mobile App Development", "Custom AI Solutions", "API & Systems Integration", "UI/UX & Product Design", "Technical Audits & Consulting"];
const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];
const BUDGETS = ["< $5k", "$5k–$15k", "$15k–$50k", "$50k–$150k", "$150k+"];
const TIMES = ["Morning (9am–12pm)", "Afternoon (12pm–5pm)", "Evening (5pm–9pm)", "Flexible"];

export default function Contact() {
  const { t, isAr } = useLang();
  const [params] = useSearchParams();
  const [tab, setTab] = useState<"general" | "service">("general");
  const preselect = params.get("service");

  useEffect(() => { if (preselect) setTab("service"); }, [preselect]);

  const [general, setGeneral] = useState({ name: "", email: "", phone_code: "+1", phone: "", subject: "", message: "" });
  const [generalLoading, setGeneralLoading] = useState(false);

  const [svc, setSvc] = useState({ service: preselect || SERVICES_LIST[0], full_name: "", email: "", phone_code: "+1", phone: "", role: "", company_type: "", company_size: "", budget_range: "", best_time: "", challenge: "" });
  const [svcLoading, setSvcLoading] = useState(false);

  const submitGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralLoading(true);
    try {
      if (N8N_CONTACT) {
        await axios.post(N8N_CONTACT, { ...general, phone: `${general.phone_code}${general.phone}` });
      } else {
        await new Promise(r => setTimeout(r, 800));
      }
      toast.success(t.contact.success);
      setGeneral({ name: "", email: "", phone_code: "+1", phone: "", subject: "", message: "" });
    } catch {
      toast.error(t.contact.error);
    } finally {
      setGeneralLoading(false);
    }
  };

  const submitService = async (e: React.FormEvent) => {
    e.preventDefault();
    setSvcLoading(true);
    try {
      if (N8N_SERVICE) {
        await axios.post(N8N_SERVICE, { ...svc, phone: `${svc.phone_code}${svc.phone}` });
      } else {
        await new Promise(r => setTimeout(r, 800));
      }
      toast.success(t.contact.success);
      setSvc({ service: SERVICES_LIST[0], full_name: "", email: "", phone_code: "+1", phone: "", role: "", company_type: "", company_size: "", budget_range: "", best_time: "", challenge: "" });
    } catch {
      toast.error(t.contact.error);
    } finally {
      setSvcLoading(false);
    }
  };

  return (
    <div className="relative">
      <SEO pageKey="contact" path="/contact" />

      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end overflow-hidden pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="absolute -top-40 right-1/4 h-[460px] w-[460px] rounded-full bg-cyan-400/10 blur-[110px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300">
            {t.contact.eyebrow}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.12 }}
            className="mt-6 max-w-4xl font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tighter text-chrome">
            {t.contact.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.28 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-white/65">
            {t.contact.sub}
          </motion.p>
        </div>
      </section>

      <PulseDivider />

      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-5">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-white/40 mb-4">{t.contact.emailUs}</div>
                <a href="mailto:contact@raanzlr.com" className="text-white hover:text-cyan-300 transition-colors font-display text-lg font-semibold">contact@raanzlr.com</a>
                <div className="mt-4 flex items-start gap-2 text-sm text-white/55">
                  <MapPin className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{t.about.address}</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-cyan-500/[0.04] p-6">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-cyan-300" />
                  <span className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300">{t.contact.responseTitle}</span>
                  <motion.span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-mono-accent text-cyan-300/80">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> live
                  </motion.span>
                </div>
                <div className="mt-3 font-display text-3xl text-white">{t.contact.responseValue}</div>
                <p className="mt-2 text-xs text-white/60">{t.contact.responseSub}</p>
                <Heartbeat className="mt-4 w-full h-6 opacity-70" />
              </div>
            </Reveal>
          </div>

          {/* Forms */}
          <div className="lg:col-span-8">
            <Reveal>
              {/* Tabs */}
              <div className="flex gap-1 p-1 rounded-xl border border-white/10 bg-white/[0.02] mb-8 w-fit">
                {(["general", "service"] as const).map(tab_ => (
                  <button key={tab_} type="button" onClick={() => setTab(tab_)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === tab_ ? "bg-white/[0.08] text-white" : "text-white/50 hover:text-white"}`}>
                    {tab_ === "general" ? t.contact.generalTab : t.contact.serviceTab}
                  </button>
                ))}
              </div>

              {tab === "general" ? (
                <form onSubmit={submitGeneral} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>{t.contact.general.name}</label>
                      <input type="text" required className={fieldCls} value={general.name} onChange={e => setGeneral(s => ({ ...s, name: e.target.value }))} />
                    </div>
                    <div>
                      <label className={labelCls}>{t.contact.general.email}</label>
                      <input type="email" required className={fieldCls} value={general.email} onChange={e => setGeneral(s => ({ ...s, email: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.general.phone}</label>
                    <PhoneInput value={general.phone} onChange={v => setGeneral(s => ({ ...s, phone: v }))} phoneCode={general.phone_code} onPhoneCodeChange={c => setGeneral(s => ({ ...s, phone_code: c }))} />
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.general.subject}</label>
                    <input type="text" className={fieldCls} value={general.subject} onChange={e => setGeneral(s => ({ ...s, subject: e.target.value }))} />
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.general.message}</label>
                    <textarea required rows={5} className={fieldCls} value={general.message} onChange={e => setGeneral(s => ({ ...s, message: e.target.value }))} />
                  </div>
                  <button type="submit" disabled={generalLoading}
                    className="w-full sm:w-auto rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-3 text-sm font-bold text-[#050505] shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-shadow disabled:opacity-60">
                    {generalLoading ? (isAr ? "جارٍ الإرسال..." : "Sending...") : t.cta.sendMessage}
                  </button>
                </form>
              ) : (
                <form onSubmit={submitService} className="space-y-5">
                  <div>
                    <label className={labelCls}>{t.contact.service.service}</label>
                    <select className={fieldCls} value={svc.service} onChange={e => setSvc(s => ({ ...s, service: e.target.value }))}>
                      {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>{t.contact.service.fullName}</label>
                      <input type="text" required className={fieldCls} value={svc.full_name} onChange={e => setSvc(s => ({ ...s, full_name: e.target.value }))} />
                    </div>
                    <div>
                      <label className={labelCls}>{t.contact.service.email}</label>
                      <input type="email" required className={fieldCls} value={svc.email} onChange={e => setSvc(s => ({ ...s, email: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.service.phone}</label>
                    <PhoneInput value={svc.phone} onChange={v => setSvc(s => ({ ...s, phone: v }))} phoneCode={svc.phone_code} onPhoneCodeChange={c => setSvc(s => ({ ...s, phone_code: c }))} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>{t.contact.service.role}</label>
                      <input type="text" className={fieldCls} value={svc.role} onChange={e => setSvc(s => ({ ...s, role: e.target.value }))} />
                    </div>
                    <div>
                      <label className={labelCls}>{t.contact.service.companyType}</label>
                      <input type="text" className={fieldCls} value={svc.company_type} onChange={e => setSvc(s => ({ ...s, company_type: e.target.value }))} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>{t.contact.service.companySize}</label>
                      <select className={fieldCls} value={svc.company_size} onChange={e => setSvc(s => ({ ...s, company_size: e.target.value }))}>
                        <option value="">—</option>
                        {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>{t.contact.service.budget}</label>
                      <select className={fieldCls} value={svc.budget_range} onChange={e => setSvc(s => ({ ...s, budget_range: e.target.value }))}>
                        <option value="">—</option>
                        {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.service.bestTime}</label>
                    <select className={fieldCls} value={svc.best_time} onChange={e => setSvc(s => ({ ...s, best_time: e.target.value }))}>
                      <option value="">—</option>
                      {TIMES.map(t_ => <option key={t_} value={t_}>{t_}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.service.challenge}</label>
                    <textarea required rows={4} className={fieldCls} value={svc.challenge} onChange={e => setSvc(s => ({ ...s, challenge: e.target.value }))} />
                  </div>
                  <button type="submit" disabled={svcLoading}
                    className="w-full sm:w-auto rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-3 text-sm font-bold text-[#050505] shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-shadow disabled:opacity-60">
                    {svcLoading ? (isAr ? "جارٍ الإرسال..." : "Submitting...") : t.cta.submitRequest}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
