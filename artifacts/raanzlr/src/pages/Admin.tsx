import React, { useState, useEffect, useCallback } from "react";
import { Mail, FileText, Eye, EyeOff, RefreshCw, LogOut, Clock, User, Phone, Plus, Pencil, Trash2, ChevronDown, ChevronUp, X, Star, Globe, CheckCircle, AlertCircle, Users } from "lucide-react";
import SEO from "../components/SEO";

const ADMIN_PASSWORD = "raanzlr-admin-2025";

const SUPABASE_URL = "https://dnpaagicskxzukeczifj.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucGFhZ2ljc2t4enVrZWN6aWZqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTg5NjI3OSwiZXhwIjoyMDk3NDcyMjc5fQ.idUWbOdKw_rRMSAuuK9mUcjmfvWrQmz6rZ3LyxKMXAc";

interface Contact {
  id: number;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string | null;
  service: string | null;
  role: string | null;
  company_type: string | null;
  company_size: string | null;
  budget_range: string | null;
  best_time: string | null;
  challenge: string | null;
  created_at: string;
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem("raanzlr_admin", "1");
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <img src="/Raanzlr.png" alt="Raanzlr" className="h-8 w-auto mx-auto mb-8 opacity-80" />
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h1 className="text-xl font-bold text-white mb-1">Admin Access</h1>
          <p className="text-sm text-white/40 mb-6">Raanzlr back office</p>
          <form onSubmit={submit} className="space-y-4">
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                placeholder="Admin password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 pr-11"
              />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3 text-white/30 hover:text-white/60">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && <p className="text-xs text-red-400">Incorrect password. Please try again.</p>}
            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 py-3 text-sm font-bold text-[#050505] hover:opacity-90 transition-opacity">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ContactsTab() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [filterType, setFilterType] = useState<"all" | "general" | "service">("all");

  const load = () => {
    setLoading(true);
    fetch(`${SUPABASE_URL}/rest/v1/contacts?order=created_at.desc`, {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
      }
    })
      .then(r => r.json())
      .then(d => { setContacts(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const fmt = (iso: string) => new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">Contact Submissions</h2>
          <p className="text-xs text-white/40 mt-0.5">{contacts.length} total submissions</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 text-xs text-white/50 hover:text-white border border-white/10 rounded-lg px-3 py-2 transition-colors">
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-white/30 text-sm">Loading…</div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-16 text-white/30 text-sm">No submissions yet.</div>
      ) : (
        <div className="space-y-3">
          {/* Filter bar */}
          {!loading && contacts.length > 0 && (
            <div className="flex gap-2 mb-5 flex-wrap">
              {([
                { key: "all", label: "All", count: contacts.length },
                { key: "general", label: "General Inquiry", count: contacts.filter(c => c.type === "general").length },
                { key: "service", label: "Project Brief", count: contacts.filter(c => c.type === "service").length },
              ] as const).map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilterType(f.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    filterType === f.key
                      ? "bg-cyan-400/15 text-cyan-300 border border-cyan-400/30"
                      : "text-white/40 hover:text-white border border-white/8 hover:border-white/20"
                  }`}
                >
                  {f.label}
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] leading-none ${filterType === f.key ? "bg-cyan-400/20 text-cyan-300" : "bg-white/8 text-white/30"}`}>
                    {f.count}
                  </span>
                </button>
              ))}
            </div>
          )}
          {(() => {
            const filtered = filterType === "all" ? contacts : contacts.filter(c => c.type === filterType);
            return filtered.map(c => (
            <div
              key={c.id}
              onClick={() => setSelected(selected?.id === c.id ? null : c)}
              className="rounded-xl border border-white/8 bg-white/[0.02] hover:border-cyan-400/20 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4 p-4">
                <div className="h-9 w-9 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-white text-sm">{c.name}</span>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${c.type === "service" ? "bg-blue-500/10 text-blue-300 border border-blue-500/20" : "bg-cyan-400/10 text-cyan-300 border border-cyan-400/20"}`}>
                      {c.type === "service" ? "Project Brief" : "General"}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 mt-0.5">{c.email}{c.phone ? ` · ${c.phone}` : ""}</p>
                  {c.subject && <p className="text-xs text-white/40 mt-1 truncate">{c.subject}</p>}
                  {c.message && <p className="text-xs text-white/35 mt-1 line-clamp-2">{c.message}</p>}
                  {c.challenge && <p className="text-xs text-white/35 mt-1 line-clamp-2">{c.challenge}</p>}
                </div>
                <div className="shrink-0 text-right">
                  <div className="flex items-center gap-1 text-[10px] text-white/30">
                    <Clock className="h-3 w-3" />
                    {fmt(c.created_at)}
                  </div>
                  {c.budget_range && (
                    <span className="text-[10px] text-emerald-400 mt-1 block">{c.budget_range}</span>
                  )}
                </div>
              </div>

              {selected?.id === c.id && (
                <div className="border-t border-white/8 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    ["Service", c.service],
                    ["Role", c.role],
                    ["Industry", c.company_type],
                    ["Company Size", c.company_size],
                    ["Budget", c.budget_range],
                    ["Best Time", c.best_time],
                  ].filter(([, v]) => v).map(([label, value]) => (
                    <div key={label as string}>
                      <p className="text-[10px] uppercase tracking-wider text-white/30 mb-0.5">{label}</p>
                      <p className="text-sm text-white/70">{value}</p>
                    </div>
                  ))}
                  {c.message && (
                    <div className="col-span-full">
                      <p className="text-[10px] uppercase tracking-wider text-white/30 mb-0.5">Message</p>
                      <p className="text-sm text-white/70 leading-relaxed">{c.message}</p>
                    </div>
                  )}
                  {c.challenge && (
                    <div className="col-span-full">
                      <p className="text-[10px] uppercase tracking-wider text-white/30 mb-0.5">Challenge</p>
                      <p className="text-sm text-white/70 leading-relaxed">{c.challenge}</p>
                    </div>
                  )}
                  <div className="col-span-full pt-2 flex gap-3">
                    <a href={`mailto:${c.email}?subject=Re: ${c.subject ?? "Your Inquiry"}`} className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> Reply by email
                    </a>
                    {c.phone && (
                      <a href={`tel:${c.phone}`} className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" /> {c.phone}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ));
          })()}
        </div>
      )}
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface PostSection {
  heading: { en: string; ar: string };
  body: { en: string; ar: string };
  image?: string;
}

interface PostForm {
  slug: string;
  title_en: string; title_ar: string;
  excerpt_en: string; excerpt_ar: string;
  tag_en: string; tag_ar: string;
  image: string;
  author: string;
  published: boolean;
  featured: boolean;
  published_at: string;
  seo_title_en: string; seo_title_ar: string;
  seo_description_en: string; seo_description_ar: string;
  seo_keywords_en: string; seo_keywords_ar: string;
  sections: PostSection[];
}

interface PostRecord {
  slug: string;
  title?: { en?: string; ar?: string } | string;
  title_en?: string;
  title_ar?: string;
  excerpt?: { en?: string; ar?: string } | string;
  excerpt_en?: string;
  excerpt_ar?: string;
  tag?: { en?: string; ar?: string } | string;
  tag_en?: string;
  tag_ar?: string;
  image?: string;
  author?: string;
  published?: boolean;
  featured?: boolean;
  published_at?: string;
  date?: string;
  readTime?: number;
  read_time?: number;
  sections?: PostSection[] | string;
  seo_title_en?: string; seo_title_ar?: string;
  seo_description_en?: string; seo_description_ar?: string;
  seo_keywords_en?: string; seo_keywords_ar?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const autoSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();

const defaultForm = (): PostForm => ({
  slug: "", title_en: "", title_ar: "",
  excerpt_en: "", excerpt_ar: "",
  tag_en: "General", tag_ar: "عام",
  image: "", author: "Raanzlr",
  published: true, featured: false,
  published_at: new Date().toISOString().split("T")[0],
  seo_title_en: "", seo_title_ar: "",
  seo_description_en: "", seo_description_ar: "",
  seo_keywords_en: "", seo_keywords_ar: "",
  sections: [{ heading: { en: "", ar: "" }, body: { en: "", ar: "" }, image: "" }],
});

function resolveField(obj: { en?: string; ar?: string } | string | undefined, lang: "en" | "ar"): string {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] ?? "";
}

function recordToForm(p: PostRecord): PostForm {
  let sections: PostSection[] = [{ heading: { en: "", ar: "" }, body: { en: "", ar: "" }, image: "" }];
  if (p.sections) {
    try {
      const raw = typeof p.sections === "string" ? JSON.parse(p.sections) : p.sections;
      if (Array.isArray(raw) && raw.length > 0) sections = raw;
    } catch { /* keep default */ }
  }
  return {
    slug: p.slug ?? "",
    title_en: p.title_en ?? resolveField(p.title as any, "en"),
    title_ar: p.title_ar ?? resolveField(p.title as any, "ar"),
    excerpt_en: p.excerpt_en ?? resolveField(p.excerpt as any, "en"),
    excerpt_ar: p.excerpt_ar ?? resolveField(p.excerpt as any, "ar"),
    tag_en: p.tag_en ?? resolveField(p.tag as any, "en") ?? "General",
    tag_ar: p.tag_ar ?? resolveField(p.tag as any, "ar") ?? "عام",
    image: p.image ?? "",
    author: p.author ?? "Raanzlr",
    published: p.published !== undefined ? p.published : true,
    featured: p.featured ?? false,
    published_at: p.published_at ?? p.date ?? new Date().toISOString().split("T")[0],
    seo_title_en: p.seo_title_en ?? "",
    seo_title_ar: p.seo_title_ar ?? "",
    seo_description_en: p.seo_description_en ?? "",
    seo_description_ar: p.seo_description_ar ?? "",
    seo_keywords_en: p.seo_keywords_en ?? "",
    seo_keywords_ar: p.seo_keywords_ar ?? "",
    sections,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20";
const labelCls = "text-[10px] uppercase tracking-wider text-white/30 mb-1.5 block";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className={labelCls}>{children}</label>;
}

function SectionEditor({
  section, index, total,
  onChange, onDelete,
}: {
  section: PostSection;
  index: number;
  total: number;
  onChange: (s: PostSection) => void;
  onDelete: () => void;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5 relative">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-mono tracking-widest text-cyan-400/60">SECTION {num}</span>
        {total > 1 && (
          <button
            type="button"
            onClick={onDelete}
            className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
          >
            <X className="h-3.5 w-3.5" /> Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <FieldLabel>Heading (EN)</FieldLabel>
          <input
            type="text"
            value={section.heading.en}
            onChange={e => onChange({ ...section, heading: { ...section.heading, en: e.target.value } })}
            placeholder="Section heading in English"
            className={inputCls}
          />
        </div>
        <div>
          <FieldLabel>🔤 Heading (AR)</FieldLabel>
          <input
            dir="rtl"
            type="text"
            value={section.heading.ar}
            onChange={e => onChange({ ...section, heading: { ...section.heading, ar: e.target.value } })}
            placeholder="عنوان القسم بالعربية"
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <FieldLabel>Body (EN)</FieldLabel>
          <textarea
            rows={6}
            value={section.body.en}
            onChange={e => onChange({ ...section, body: { ...section.body, en: e.target.value } })}
            placeholder="Section body text in English"
            className={inputCls + " resize-y"}
          />
        </div>
        <div>
          <FieldLabel>🔤 Body (AR)</FieldLabel>
          <textarea
            dir="rtl"
            rows={6}
            value={section.body.ar}
            onChange={e => onChange({ ...section, body: { ...section.body, ar: e.target.value } })}
            placeholder="نص القسم بالعربية"
            className={inputCls + " resize-y"}
          />
        </div>
      </div>

      <div>
        <FieldLabel>Section Image URL (optional)</FieldLabel>
        <input
          type="url"
          value={section.image ?? ""}
          onChange={e => onChange({ ...section, image: e.target.value })}
          placeholder="https://..."
          className={inputCls}
        />
        {section.image && section.image.startsWith("http") && (
          <img
            src={section.image}
            alt=""
            className="mt-2 h-20 w-auto rounded-lg object-cover border border-white/10"
            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Post Form ────────────────────────────────────────────────────────────────

function PostFormView({
  initial,
  editingSlug,
  onSave,
  onCancel,
}: {
  initial: PostForm;
  editingSlug: string | null;
  onSave: (slug: string) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<PostForm>(initial);
  const [prevAutoSlug, setPrevAutoSlug] = useState(autoSlug(initial.title_en));
  const [seoOpen, setSeoOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [imageMode, setImageMode] = useState<"upload" | "url">("url");
  const [imageUploading, setImageUploading] = useState(false);

  const set = useCallback(<K extends keyof PostForm>(key: K, val: PostForm[K]) => {
    setForm(f => ({ ...f, [key]: val }));
  }, []);

  const handleTitleEn = (val: string) => {
    const generated = autoSlug(val);
    setForm(f => {
      const shouldUpdate = !f.slug || f.slug === prevAutoSlug;
      return { ...f, title_en: val, slug: shouldUpdate ? generated : f.slug };
    });
    setPrevAutoSlug(generated);
  };

  const updateSection = (i: number, s: PostSection) => {
    setForm(f => {
      const sections = [...f.sections];
      sections[i] = s;
      return { ...f, sections };
    });
  };

  const addSection = () => {
    setForm(f => ({
      ...f,
      sections: [...f.sections, { heading: { en: "", ar: "" }, body: { en: "", ar: "" }, image: "" }],
    }));
  };

  const deleteSection = (i: number) => {
    setForm(f => ({ ...f, sections: f.sections.filter((_, idx) => idx !== i) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title_en.trim() || !form.title_ar.trim()) {
      setMsg({ type: "err", text: "Both English and Arabic titles are required." });
      return;
    }
    if (!form.excerpt_en.trim() || !form.excerpt_ar.trim()) {
      setMsg({ type: "err", text: "Both English and Arabic excerpts are required." });
      return;
    }
    setSaving(true);
    setMsg(null);

    const payload = {
      ...form,
      sections: JSON.stringify(form.sections),
    };

    try {
      let res: Response;
      if (editingSlug) {
        res = await fetch(`${SUPABASE_URL}/rest/v1/posts?slug=eq.${encodeURIComponent(editingSlug)}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "Prefer": "return=representation",
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "Prefer": "return=representation",
          },
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message ?? data.error ?? `Server error ${res.status}`);
      }
      setMsg({ type: "ok", text: editingSlug ? "Post updated successfully." : "Post created successfully." });
      setTimeout(() => onSave(form.slug), 800);
    } catch (err: any) {
      setMsg({ type: "err", text: err.message ?? "Failed to save post." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">{editingSlug ? "Edit Post" : "Create New Post"}</h2>
          <p className="text-xs text-white/40 mt-0.5">{editingSlug ? `Editing: ${editingSlug}` : "Fill in all required fields below"}</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-white/15 px-5 py-2 text-sm text-white/60 hover:text-white hover:border-white/30 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-2.5 text-sm font-bold text-[#050505] hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Post"}
          </button>
        </div>
      </div>

      {/* Status message */}
      {msg && (
        <div className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${msg.type === "ok" ? "bg-emerald-400/10 border border-emerald-400/20 text-emerald-300" : "bg-red-400/10 border border-red-400/20 text-red-300"}`}>
          {msg.type === "ok" ? <CheckCircle className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
          {msg.text}
        </div>
      )}

      {/* ── Basic Info ── */}
      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Basic Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Slug</FieldLabel>
            <input
              type="text"
              value={form.slug}
              onChange={e => set("slug", e.target.value)}
              placeholder="auto-generated-from-title"
              className={inputCls}
            />
            <p className="text-[10px] text-white/30 mt-1">Auto-generated from title if empty</p>
          </div>
          <div>
            <FieldLabel>Author</FieldLabel>
            <input
              type="text"
              value={form.author}
              onChange={e => set("author", e.target.value)}
              placeholder="Raanzlr"
              className={inputCls}
            />
          </div>
          <div>
            <FieldLabel>Published Date</FieldLabel>
            <input
              type="date"
              value={form.published_at}
              onChange={e => set("published_at", e.target.value)}
              className={inputCls + " [color-scheme:dark]"}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div
                  onClick={() => set("published", !form.published)}
                  className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${form.published ? "bg-cyan-400/80" : "bg-white/15"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${form.published ? "translate-x-5" : "translate-x-0"}`} />
                </div>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">Published</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div
                  onClick={() => set("featured", !form.featured)}
                  className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${form.featured ? "bg-amber-400/80" : "bg-white/15"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${form.featured ? "translate-x-5" : "translate-x-0"}`} />
                </div>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">Featured</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cover Image ── */}
      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Cover Image</h3>
        <p className="text-[10px] text-white/30 mb-4">Upload a file or paste an image URL</p>
        
        {/* Upload tab */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setImageMode("upload")}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${imageMode === "upload" ? "bg-cyan-400/15 text-cyan-300 border border-cyan-400/30" : "text-white/40 border border-white/10 hover:text-white"}`}
          >
            📁 Upload File
          </button>
          <button
            type="button"
            onClick={() => setImageMode("url")}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${imageMode === "url" ? "bg-cyan-400/15 text-cyan-300 border border-cyan-400/30" : "text-white/40 border border-white/10 hover:text-white"}`}
          >
            🔗 Image URL
          </button>
        </div>

        {imageMode === "upload" ? (
          <div>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setImageUploading(true);
                try {
                  const ext = file.name.split('.').pop() || 'png';
                  const fileName = `admin-${Date.now()}.${ext}`;
                  const uploadRes = await fetch(
                    `${SUPABASE_URL}/storage/v1/object/blog-images/covers/${fileName}`,
                    {
                      method: 'POST',
                      headers: {
                        'apikey': SUPABASE_KEY,
                        'Authorization': `Bearer ${SUPABASE_KEY}`,
                        'Content-Type': file.type,
                        'x-upsert': 'true',
                      },
                      body: file,
                    }
                  );
                  if (uploadRes.ok) {
                    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/blog-images/covers/${fileName}`;
                    set("image", publicUrl);
                    setMsg({ type: "ok", text: "Image uploaded successfully!" });
                  } else {
                    const errText = await uploadRes.text();
                    setMsg({ type: "err", text: `Upload failed: ${errText.substring(0, 100)}` });
                  }
                } catch (err) {
                  setMsg({ type: "err", text: "Upload error. Try again." });
                } finally {
                  setImageUploading(false);
                }
              }}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/60 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-400/15 file:text-cyan-300 hover:file:bg-cyan-400/25 cursor-pointer"
            />
            {imageUploading && (
              <p className="text-xs text-cyan-300 mt-2 flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full border border-cyan-400/30 border-t-cyan-400 animate-spin" />
                Uploading to Supabase Storage...
              </p>
            )}
          </div>
        ) : (
          <div>
            <FieldLabel>Image URL</FieldLabel>
            <input
              type="url"
              value={form.image}
              onChange={e => set("image", e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className={inputCls}
            />
          </div>
        )}
        
        {form.image && form.image.startsWith("http") && (
          <img
            src={form.image}
            alt="Cover preview"
            className="mt-3 h-36 w-full rounded-xl object-cover border border-white/10"
            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        )}
      </div>

      {/* ── English Content ── */}
      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-3.5 w-3.5 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">English Content</h3>
        </div>
        <div className="space-y-4">
          <div>
            <FieldLabel>Title (EN) *</FieldLabel>
            <input
              type="text"
              value={form.title_en}
              onChange={e => handleTitleEn(e.target.value)}
              placeholder="Post title in English"
              required
              className={inputCls}
            />
          </div>
          <div>
            <FieldLabel>Excerpt (EN) *</FieldLabel>
            <textarea
              rows={3}
              value={form.excerpt_en}
              onChange={e => set("excerpt_en", e.target.value)}
              placeholder="Short summary shown in listing"
              required
              className={inputCls + " resize-y"}
            />
          </div>
          <div>
            <FieldLabel>Tag (EN)</FieldLabel>
            <input
              type="text"
              value={form.tag_en}
              onChange={e => set("tag_en", e.target.value)}
              placeholder="e.g. AI Strategy"
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* ── Arabic Content ── */}
      <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.02] p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm">🔤</span>
          <h3 className="text-sm font-semibold text-white">Arabic Content</h3>
          <span className="text-[10px] text-cyan-400/60 border border-cyan-400/20 rounded-full px-2 py-0.5 ml-auto">RTL</span>
        </div>
        <div className="space-y-4">
          <div>
            <FieldLabel>🔤 Title (AR) *</FieldLabel>
            <input
              dir="rtl"
              type="text"
              value={form.title_ar}
              onChange={e => set("title_ar", e.target.value)}
              placeholder="عنوان المقال بالعربية"
              required
              className={inputCls}
            />
          </div>
          <div>
            <FieldLabel>🔤 Excerpt (AR) *</FieldLabel>
            <textarea
              dir="rtl"
              rows={3}
              value={form.excerpt_ar}
              onChange={e => set("excerpt_ar", e.target.value)}
              placeholder="ملخص قصير بالعربية"
              required
              className={inputCls + " resize-y"}
            />
          </div>
          <div>
            <FieldLabel>🔤 Tag (AR)</FieldLabel>
            <input
              dir="rtl"
              type="text"
              value={form.tag_ar}
              onChange={e => set("tag_ar", e.target.value)}
              placeholder="مثال: استراتيجية الذكاء الاصطناعي"
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* ── SEO Settings (collapsible) ── */}
      <div className="rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden">
        <button
          type="button"
          onClick={() => setSeoOpen(o => !o)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white">SEO Settings</h3>
            <span className="text-[10px] text-white/30 border border-white/10 rounded-full px-2 py-0.5">Optional</span>
          </div>
          {seoOpen ? <ChevronUp className="h-4 w-4 text-white/40" /> : <ChevronDown className="h-4 w-4 text-white/40" />}
        </button>
        {seoOpen && (
          <div className="border-t border-white/8 p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FieldLabel>SEO Title (EN)</FieldLabel>
                <input type="text" value={form.seo_title_en} onChange={e => set("seo_title_en", e.target.value)} placeholder="Overrides page title for search engines" className={inputCls} />
              </div>
              <div>
                <FieldLabel>🔤 SEO Title (AR)</FieldLabel>
                <input dir="rtl" type="text" value={form.seo_title_ar} onChange={e => set("seo_title_ar", e.target.value)} placeholder="عنوان SEO بالعربية" className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Meta Description (EN)</FieldLabel>
                <textarea rows={2} value={form.seo_description_en} onChange={e => set("seo_description_en", e.target.value)} placeholder="Shown in Google results, 150-160 chars" className={inputCls + " resize-y"} />
              </div>
              <div>
                <FieldLabel>🔤 Meta Description (AR)</FieldLabel>
                <textarea dir="rtl" rows={2} value={form.seo_description_ar} onChange={e => set("seo_description_ar", e.target.value)} placeholder="الوصف بالعربية للمحركات" className={inputCls + " resize-y"} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Keywords (EN)</FieldLabel>
                <input type="text" value={form.seo_keywords_en} onChange={e => set("seo_keywords_en", e.target.value)} placeholder="Comma-separated keywords" className={inputCls} />
              </div>
              <div>
                <FieldLabel>🔤 Keywords (AR)</FieldLabel>
                <input dir="rtl" type="text" value={form.seo_keywords_ar} onChange={e => set("seo_keywords_ar", e.target.value)} placeholder="كلمات مفتاحية مفصولة بفواصل" className={inputCls} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Sections ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Content Sections</h3>
          <button
            type="button"
            onClick={addSection}
            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 border border-cyan-400/20 hover:border-cyan-400/40 rounded-lg px-3 py-2 transition-all"
          >
            <Plus className="h-3.5 w-3.5" /> Add Section
          </button>
        </div>
        <div className="space-y-4">
          {form.sections.map((s, i) => (
            <SectionEditor
              key={i}
              section={s}
              index={i}
              total={form.sections.length}
              onChange={s => updateSection(i, s)}
              onDelete={() => deleteSection(i)}
            />
          ))}
        </div>
      </div>

      {/* ── Form Actions (bottom) ── */}
      <div className="border-t border-white/8 pt-6 flex items-center justify-between">
        {msg && (
          <div className={`flex items-center gap-2 text-sm ${msg.type === "ok" ? "text-emerald-300" : "text-red-300"}`}>
            {msg.type === "ok" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            {msg.text}
          </div>
        )}
        <div className="flex gap-3 ml-auto">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-white/15 px-5 py-2 text-sm text-white/60 hover:text-white hover:border-white/30 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-2.5 text-sm font-bold text-[#050505] hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Post"}
          </button>
        </div>
      </div>
    </form>
  );
}

// ─── Post List ────────────────────────────────────────────────────────────────

function PostCard({
  post,
  onEdit,
  onDelete,
}: {
  post: PostRecord;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const titleEn = post.title_en ?? resolveField(post.title as any, "en");
  const titleAr = post.title_ar ?? resolveField(post.title as any, "ar");
  const tagEn = post.tag_en ?? resolveField(post.tag as any, "en");
  const date = post.published_at ?? post.date ?? "";
  const isPublished = post.published !== false;
  const isFeatured = post.featured === true;

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete();
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 flex gap-4 hover:border-white/15 transition-all">
      {/* Thumbnail */}
      {post.image ? (
        <img
          src={post.image}
          alt=""
          className="h-16 w-24 rounded-lg object-cover border border-white/10 shrink-0"
          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      ) : (
        <div className="h-16 w-24 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
          <FileText className="h-5 w-5 text-white/20" />
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <span className="font-medium text-white text-sm leading-tight truncate max-w-xs">{titleEn || "Untitled"}</span>
          {isFeatured && (
            <span className="flex items-center gap-0.5 text-[10px] text-amber-300 bg-amber-400/10 border border-amber-400/20 rounded-full px-2 py-0.5 shrink-0">
              <Star className="h-2.5 w-2.5" /> Featured
            </span>
          )}
          <span className={`text-[10px] rounded-full px-2 py-0.5 border shrink-0 ${isPublished ? "text-emerald-300 bg-emerald-400/10 border-emerald-400/20" : "text-white/40 bg-white/5 border-white/10"}`}>
            {isPublished ? "Published" : "Draft"}
          </span>
        </div>
        {titleAr && <p className="text-xs text-white/40 mt-0.5 truncate" dir="rtl">{titleAr}</p>}
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          {tagEn && (
            <span className="text-[10px] text-cyan-300 bg-cyan-400/10 border border-cyan-400/15 rounded-full px-2 py-0.5">{tagEn}</span>
          )}
          {date && <span className="text-[10px] text-white/30">{date}</span>}
          {post.author && <span className="text-[10px] text-white/30">{post.author}</span>}
          {(post.readTime ?? post.read_time) && (
            <span className="text-[10px] text-white/30">{post.readTime ?? post.read_time} min read</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 shrink-0">
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/25 rounded-lg px-3 py-1.5 transition-all"
        >
          <Pencil className="h-3 w-3" /> Edit
        </button>
        <button
          onClick={async (e) => {
            e.stopPropagation();
            const newPublished = !isPublished;
            try {
              const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?slug=eq.${encodeURIComponent(post.slug)}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  "apikey": SUPABASE_KEY,
                  "Authorization": `Bearer ${SUPABASE_KEY}`,
                  "Prefer": "return=minimal",
                },
                body: JSON.stringify({ published: newPublished }),
              });
              if (res.ok) {
                onDelete(); // reuse reload trigger — this refreshes the list
              }
            } catch {}
          }}
          className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
            isPublished
              ? "text-emerald-300 border-emerald-400/20 hover:bg-red-400/10 hover:text-red-300 hover:border-red-400/20"
              : "text-white/40 border-white/10 hover:bg-emerald-400/10 hover:text-emerald-300 hover:border-emerald-400/20"
          }`}
          title={isPublished ? "Click to Unpublish" : "Click to Publish"}
        >
          {isPublished ? "● Published" : "○ Draft"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className={`flex items-center gap-1.5 text-xs rounded-lg px-3 py-1.5 transition-all border ${confirmDelete ? "text-white bg-red-500/20 border-red-500/40 hover:bg-red-500/30" : "text-red-400 hover:text-red-300 border-white/10 hover:border-red-400/20"}`}
        >
          <Trash2 className="h-3 w-3" />
          {confirmDelete ? "Confirm?" : "Delete"}
        </button>
      </div>
    </div>
  );
}

// ─── BlogTab ──────────────────────────────────────────────────────────────────

function BlogTab({ onPostCountChange }: { onPostCountChange?: (n: number) => void }) {
  const [posts, setPosts] = useState<PostRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editingPost, setEditingPost] = useState<PostRecord | null>(null);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/posts?order=created_at.desc`, {
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
        }
      });
      const data = await r.json();
      const postList = Array.isArray(data) ? data : [];
      setPosts(postList);
      onPostCountChange?.(postList.length);
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [onPostCountChange]);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const handleDelete = async (slug: string) => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?slug=eq.${encodeURIComponent(slug)}`, {
        method: "DELETE",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
        }
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      setMsg({ type: "ok", text: `Post "${slug}" deleted.` });
      loadPosts();
      setTimeout(() => setMsg(null), 3000);
    } catch (err: any) {
      setMsg({ type: "err", text: err.message ?? "Failed to delete post." });
    }
  };

  const handleSave = (_slug: string) => {
    setView("list");
    setEditingPost(null);
    loadPosts();
  };

  const handleEdit = (post: PostRecord) => {
    setEditingPost(post);
    setView("edit");
  };

  const handleCreate = () => {
    setEditingPost(null);
    setView("create");
  };

  const handleCancel = () => {
    setView("list");
    setEditingPost(null);
  };

  if (view === "create") {
    return (
      <PostFormView
        initial={defaultForm()}
        editingSlug={null}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  if (view === "edit" && editingPost) {
    return (
      <PostFormView
        initial={recordToForm(editingPost)}
        editingSlug={editingPost.slug}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  // List view
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">Blog Posts</h2>
          <p className="text-xs text-white/40 mt-0.5">{posts.length} post{posts.length !== 1 ? "s" : ""} total</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadPosts}
            className="flex items-center gap-2 text-xs text-white/50 hover:text-white border border-white/10 rounded-lg px-3 py-2 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2 text-sm font-bold text-[#050505] hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" /> Create New Post
          </button>
        </div>
      </div>

      {msg && (
        <div className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm mb-4 ${msg.type === "ok" ? "bg-emerald-400/10 border border-emerald-400/20 text-emerald-300" : "bg-red-400/10 border border-red-400/20 text-red-300"}`}>
          {msg.type === "ok" ? <CheckCircle className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
          {msg.text}
        </div>
      )}

      {loading ? (
        <div className="text-center py-16 text-white/30 text-sm">Loading posts…</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="h-10 w-10 text-white/15 mx-auto mb-3" />
          <p className="text-white/40 text-sm">No posts yet.</p>
          <button
            onClick={handleCreate}
            className="mt-4 text-xs text-cyan-400 hover:text-cyan-300 border border-cyan-400/20 hover:border-cyan-400/40 rounded-lg px-4 py-2 transition-all"
          >
            Create your first post
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(p => (
            <PostCard
              key={p.slug}
              post={p}
              onEdit={() => handleEdit(p)}
              onDelete={() => handleDelete(p.slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SubscribersTab ───────────────────────────────────────────────────────────

interface Subscriber {
  id?: number;
  name: string;
  email: string;
  country?: string;
  status?: string;
  created_at: string;
}

function SubscribersTab() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${SUPABASE_URL}/rest/v1/subscribers?order=created_at.desc`, {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
      }
    })
      .then(r => r.json())
      .then(d => { setSubscribers(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleRemove = async (email: string) => {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/subscribers?email=eq.${encodeURIComponent(email)}`, {
        method: "DELETE",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
        }
      });
      setSubscribers(prev => prev.filter(s => s.email !== email));
    } catch {
      // silently ignore
    }
  };

  const fmt = (iso: string) => new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">Subscribers</h2>
          <p className="text-xs text-white/40 mt-0.5">{subscribers.length} total subscribers</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 text-xs text-white/50 hover:text-white border border-white/10 rounded-lg px-3 py-2 transition-colors">
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-white/30 text-sm">Loading…</div>
      ) : subscribers.length === 0 ? (
        <div className="text-center py-16 text-white/30 text-sm">No subscribers yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.02]">
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-white/30 font-medium">Name</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-white/30 font-medium">Email</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-white/30 font-medium">Country</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-white/30 font-medium">Status</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-white/30 font-medium">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s, i) => (
                <tr key={s.email + i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-white/80">{s.name || "—"}</td>
                  <td className="px-4 py-3 text-white/60">{s.email}</td>
                  <td className="px-4 py-3 text-white/50">{s.country || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] rounded-full px-2 py-0.5 border ${s.status === "active" || !s.status ? "text-emerald-300 bg-emerald-400/10 border-emerald-400/20" : "text-white/40 bg-white/5 border-white/10"}`}>
                      {s.status || "active"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-white/30">{fmt(s.created_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleRemove(s.email)}
                      className="text-xs text-red-400 hover:text-red-300 border border-white/10 hover:border-red-400/20 rounded-lg px-3 py-1.5 transition-all"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("raanzlr_admin") === "1");
  const [tab, setTab] = useState<"contacts" | "subscribers" | "blog">("contacts");
  const [postCount, setPostCount] = useState<number | null>(null);

  if (!authed) {
    return (
      <>
        <SEO title="Admin — Raanzlr" path="/admin" noIndex />
        <LoginScreen onLogin={() => setAuthed(true)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SEO title="Admin — Raanzlr" path="/admin" noIndex />
      {/* Top bar */}
      <div className="border-b border-white/8 bg-[#050505] sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/Raanzlr.png" alt="Raanzlr" className="h-6 w-auto opacity-70" />
            <span className="text-xs text-white/30 border-l border-white/10 pl-4">Admin</span>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem("raanzlr_admin"); setAuthed(false); }}
            className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white/5 rounded-xl p-1 w-fit">
          <button
            onClick={() => setTab("contacts")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${tab === "contacts" ? "bg-white/10 text-white font-medium" : "text-white/40 hover:text-white/70"}`}
          >
            <Mail className="h-3.5 w-3.5" /> Contact Forms
          </button>
          <button
            onClick={() => setTab("subscribers")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${tab === "subscribers" ? "bg-white/10 text-white font-medium" : "text-white/40 hover:text-white/70"}`}
          >
            <Users className="h-3.5 w-3.5" /> Subscribers
          </button>
          <button
            onClick={() => setTab("blog")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${tab === "blog" ? "bg-white/10 text-white font-medium" : "text-white/40 hover:text-white/70"}`}
          >
            <FileText className="h-3.5 w-3.5" /> Blog Posts
            {postCount !== null && (
              <span className="text-[10px] bg-white/10 text-white/60 rounded-full px-1.5 py-0.5 leading-none">
                {postCount}
              </span>
            )}
          </button>
        </div>

        {tab === "contacts" ? <ContactsTab /> : tab === "subscribers" ? <SubscribersTab /> : <BlogTab onPostCountChange={setPostCount} />}
      </div>
    </div>
  );
}
