import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Mail, MapPin, Activity, ChevronDown } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import PulseDivider from "../components/PulseDivider";
import { Reveal } from "../components/Reveal";
import Heartbeat from "../components/Heartbeat";
import SEO from "../components/SEO";
import PhoneInput from "../components/PhoneInputWithSearch";

const SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucGFhZ2ljc2t4enVrZWN6aWZqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTg5NjI3OSwiZXhwIjoyMDk3NDcyMjc5fQ.idUWbOdKw_rRMSAuuK9mUcjmfvWrQmz6rZ3LyxKMXAc";
const N8N_CONTACT = import.meta.env.VITE_N8N_CONTACT_WEBHOOK;
const N8N_SERVICE = import.meta.env.VITE_N8N_SERVICE_WEBHOOK;

const fieldCls = "w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/50 transition-colors focus:outline-none";
const selectCls = "w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/50 transition-colors focus:outline-none appearance-none cursor-pointer";
const labelCls = "block text-xs font-mono-accent uppercase tracking-[0.18em] text-white/60 mb-2";

const SERVICES_LIST = ["AI Agents & Chatbots", "Workflow Automation", "AI Video Dubbing & Localization", "Web Platforms & Apps", "Mobile App Development", "Custom AI Solutions", "API & Systems Integration", "UI/UX & Product Design", "Technical Audits & Consulting"];
const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];
const BUDGETS = ["< $5k", "$5k–$15k", "$15k–$50k", "$50k–$150k", "$150k+"];

// Styled select wrapper with chevron
function SelectField({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="relative">
        <select
          className={selectCls + " ltr:pr-8 rtl:pl-8"}
          value={value}
          onChange={e => onChange(e.target.value)}
          dir="ltr"
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 rtl:right-auto rtl:left-3" />
      </div>
    </div>
  );
}

async function submitToSupabase(table: string, payload: Record<string, unknown>) {
  const url = `https://dnpaagicskxzukeczifj.supabase.co/rest/v1/${table}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_SERVICE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
      "Prefer": "return=minimal",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errText = await res.text();
    console.error("[Contact Form] Supabase insert failed:", res.status, errText);
    throw new Error(`Supabase error ${res.status}: ${errText}`);
  }
}

export default function Contact() {
  const { t, isAr } = useLang();
  const [params] = useSearchParams();
  const [tab, setTab] = useState<"general" | "service">("general");
  const preselect = params.get("service");

  useEffect(() => { if (preselect) setTab("service"); }, [preselect]);

  const [general, setGeneral] = useState({ name: "", email: "", phone_code: "+1", phone: "", subject: "", message: "", best_time: "" });
  const [generalLoading, setGeneralLoading] = useState(false);

  const [svc, setSvc] = useState({ service: preselect || SERVICES_LIST[0], full_name: "", email: "", phone_code: "+1", phone: "", role: "", company_type: "", company_size: "", budget_range: "", best_time: "", challenge: "" });
  const [svcLoading, setSvcLoading] = useState(false);

  const submitGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralLoading(true);
    try {
      const payload = {
        type: "general",
        name: general.name,
        email: general.email,
        phone: `${general.phone_code}${general.phone}`,
        subject: general.subject || null,
        message: general.message,
        best_time: general.best_time || null,
      };
      await submitToSupabase("contacts", payload);
      if (N8N_CONTACT) fetch(N8N_CONTACT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => {});
      toast.success(t.contact.success);
      setGeneral({ name: "", email: "", phone_code: "+1", phone: "", subject: "", message: "", best_time: "" });
    } catch (err) {
      console.error("[Contact Form] General submit error:", err);
      toast.error(t.contact.error);
    } finally {
      setGeneralLoading(false);
    }
  };

  const submitService = async (e: React.FormEvent) => {
    e.preventDefault();
    setSvcLoading(true);
    try {
      const payload = {
        type: "service",
        name: svc.full_name,
        email: svc.email,
        phone: `${svc.phone_code}${svc.phone}`,
        service: svc.service,
        role: svc.role || null,
        company_type: svc.company_type || null,
        company_size: svc.company_size || null,
        budget_range: svc.budget_range || null,
        best_time: svc.best_time || null,
        challenge: svc.challenge,
      };
      await submitToSupabase("contacts", payload);
      if (N8N_SERVICE) fetch(N8N_SERVICE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => {});
      toast.success(t.contact.success);
      setSvc({ service: SERVICES_LIST[0], full_name: "", email: "", phone_code: "+1", phone: "", role: "", company_type: "", company_size: "", budget_range: "", best_time: "", challenge: "" });
    } catch (err) {
      console.error("[Contact Form] Service submit error:", err);
      toast.error(t.contact.error);
    } finally {
      setSvcLoading(false);
    }
  };

  const datetimeLabel = isAr ? "أفضل وقت للتواصل" : "Best Time to Connect";

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

      <section id="contact-form" className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-5">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-white/40 mb-4">{t.contact.emailUs}</div>
                <a href="mailto:info@raanzlr.com" className="text-white hover:text-cyan-300 transition-colors font-display text-lg font-semibold">info@raanzlr.com</a>
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
            <Reveal delay={0.3}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-white/40 mb-4">
                  {isAr ? "تابعنا" : "Follow Us"}
                </div>
                <div className="flex items-center gap-3">
                  <a href="https://www.facebook.com/Raanzlr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                    className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-[#1877F2] hover:border-[#1877F2]/40 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/raanzlr.tech" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-[#E4405F] hover:border-[#E4405F]/40 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href="https://www.linkedin.com/company/raanzlr" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                    className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Forms */}
          <div className="lg:col-span-8">
            <Reveal>
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
                    <div dir="ltr">
                      <PhoneInput value={general.phone} onChange={v => setGeneral(s => ({ ...s, phone: v }))} phoneCode={general.phone_code} onPhoneCodeChange={c => setGeneral(s => ({ ...s, phone_code: c }))} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.general.subject}</label>
                    <input type="text" className={fieldCls} value={general.subject} onChange={e => setGeneral(s => ({ ...s, subject: e.target.value }))} />
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.general.message}</label>
                    <textarea required rows={5} className={fieldCls} value={general.message} onChange={e => setGeneral(s => ({ ...s, message: e.target.value }))} />
                  </div>
                  <div>
                    <label className={labelCls}>{datetimeLabel}</label>
                    <input type="datetime-local" className={fieldCls + " [color-scheme:dark]"} value={general.best_time} onChange={e => setGeneral(s => ({ ...s, best_time: e.target.value }))} />
                  </div>
                  <button type="submit" disabled={generalLoading}
                    className="w-full sm:w-auto rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-3 text-sm font-bold text-[#050505] shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-shadow disabled:opacity-60">
                    {generalLoading ? (isAr ? "جارٍ الإرسال..." : "Sending...") : t.cta.sendMessage}
                  </button>
                </form>
              ) : (
                <form onSubmit={submitService} className="space-y-5">
                  <SelectField label={t.contact.service.service} value={svc.service} onChange={v => setSvc(s => ({ ...s, service: v }))}>
                    {SERVICES_LIST.map(s => <option key={s} value={s} className="bg-[#0a0a0a] text-white">{s}</option>)}
                  </SelectField>
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
                    <div dir="ltr">
                      <PhoneInput value={svc.phone} onChange={v => setSvc(s => ({ ...s, phone: v }))} phoneCode={svc.phone_code} onPhoneCodeChange={c => setSvc(s => ({ ...s, phone_code: c }))} />
                    </div>
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
                    <SelectField label={t.contact.service.companySize} value={svc.company_size} onChange={v => setSvc(s => ({ ...s, company_size: v }))}>
                      <option value="" className="bg-[#0a0a0a] text-white/50">—</option>
                      {COMPANY_SIZES.map(s => <option key={s} value={s} className="bg-[#0a0a0a] text-white">{s}</option>)}
                    </SelectField>
                    <SelectField label={t.contact.service.budget} value={svc.budget_range} onChange={v => setSvc(s => ({ ...s, budget_range: v }))}>
                      <option value="" className="bg-[#0a0a0a] text-white/50">—</option>
                      {BUDGETS.map(b => <option key={b} value={b} className="bg-[#0a0a0a] text-white">{b}</option>)}
                    </SelectField>
                  </div>
                  <div>
                    <label className={labelCls}>{datetimeLabel}</label>
                    <input type="datetime-local" className={fieldCls + " [color-scheme:dark]"} value={svc.best_time} onChange={e => setSvc(s => ({ ...s, best_time: e.target.value }))} />
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
