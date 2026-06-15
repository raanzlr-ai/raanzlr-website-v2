import React, { useState, useEffect } from "react";
import { Mail, FileText, Eye, EyeOff, RefreshCw, LogOut, Clock, User, Building, Phone } from "lucide-react";

const ADMIN_PASSWORD = "raanzlr-admin-2025";

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

  const load = () => {
    setLoading(true);
    fetch("/api/contacts")
      .then(r => r.json())
      .then(d => { setContacts(d.contacts ?? []); setLoading(false); })
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
          {contacts.map(c => (
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
          ))}
        </div>
      )}
    </div>
  );
}

function BlogTab() {
  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-1">Blog / Insights</h2>
      <p className="text-xs text-white/40 mb-6">How to publish new posts</p>

      <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-5 mb-6">
        <p className="text-sm text-amber-300 font-medium mb-1">📝 Posts are stored in code</p>
        <p className="text-xs text-amber-200/70 leading-relaxed">
          Blog posts live in <code className="bg-white/10 px-1 rounded">artifacts/raanzlr/src/data/posts.ts</code>.
          To publish a new post, add an entry to the <code className="bg-white/10 px-1 rounded">POSTS</code> array and redeploy.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Post object structure</h3>
          <pre className="text-xs text-cyan-300/80 bg-black/40 rounded-lg p-4 overflow-x-auto leading-relaxed">{`{
  slug: "your-post-slug",          // URL: /insights/your-post-slug
  title: {
    en: "Post Title",
    ar: "عنوان المقال",
  },
  excerpt: {
    en: "Short summary...",
    ar: "ملخص قصير...",
  },
  date: "2026-06-15",
  readTime: 5,                     // minutes
  tag: { en: "AI Strategy", ar: "استراتيجية الذكاء الاصطناعي" },
  image: "https://...",            // Unsplash URL recommended
  sections: [
    {
      heading: { en: "Section Title", ar: "عنوان القسم" },
      body: { en: "Body text...", ar: "النص..." },
    },
  ],
}`}</pre>
        </div>

        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
          <h3 className="text-sm font-semibold text-white mb-2">Steps to publish</h3>
          <ol className="text-sm text-white/60 space-y-2 list-decimal list-inside">
            <li>Open <code className="text-cyan-400 bg-white/5 px-1 rounded">artifacts/raanzlr/src/data/posts.ts</code></li>
            <li>Add a new object to the <code className="text-cyan-400 bg-white/5 px-1 rounded">POSTS</code> array (newest first)</li>
            <li>Fill in both <code className="text-cyan-400 bg-white/5 px-1 rounded">en</code> and <code className="text-cyan-400 bg-white/5 px-1 rounded">ar</code> fields</li>
            <li>Save the file — the dev server hot-reloads instantly</li>
            <li>Redeploy the app to go live on production</li>
          </ol>
        </div>

        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
          <h3 className="text-sm font-semibold text-white mb-2">Want a full CMS instead?</h3>
          <p className="text-xs text-white/50 leading-relaxed">
            For a proper content management system (login, WYSIWYG editor, media uploads, scheduled publishing),
            a headless CMS like <strong className="text-white/70">Sanity</strong>, <strong className="text-white/70">Contentful</strong>,
            or a custom admin backend can be integrated. Ask Raanzlr's team to set this up.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("raanzlr_admin") === "1");
  const [tab, setTab] = useState<"contacts" | "blog">("contacts");

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
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
          {([["contacts", <Mail className="h-3.5 w-3.5" />, "Contact Forms"] as const, ["blog", <FileText className="h-3.5 w-3.5" />, "Blog Posts"] as const]).map(([id, icon, label]) => (
            <button
              key={id}
              onClick={() => setTab(id as "contacts" | "blog")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${tab === id ? "bg-white/10 text-white font-medium" : "text-white/40 hover:text-white/70"}`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {tab === "contacts" ? <ContactsTab /> : <BlogTab />}
      </div>
    </div>
  );
}
