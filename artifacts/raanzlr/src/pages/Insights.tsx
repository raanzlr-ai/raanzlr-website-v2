import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, BookOpen, X, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import SEO from "../components/SEO";
import { POSTS } from "../data/posts";
import { Post, fromStaticPost, fetchAllPosts } from "../lib/posts";

const SUPABASE_URL = "https://dnpaagicskxzukeczifj.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucGFhZ2ljc2t4enVrZWN6aWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4OTYyNzksImV4cCI6MjA5NzQ3MjI3OX0.fI0GuwGnTQU7k7HOCwTBP2q0xIjR0s9bmDl0b9SfWN0";

// ---------------------------------------------------------------------------
// SubscribeModal
// ---------------------------------------------------------------------------
interface SubscribeModalProps {
  open: boolean;
  onClose: () => void;
  isAr: boolean;
}

function SubscribeModal({ open, onClose, isAr }: SubscribeModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset state each time modal opens
  useEffect(() => {
    if (open) {
      setName("");
      setEmail("");
      setCountry("");
      setLoading(false);
      setSuccess(false);
      setError(null);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/subscribers`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ email, name, country: country || null }),
      });

      if (res.status === 201 || res.status === 200) {
        setSuccess(true);
        // TODO: Email notification sending is handled by n8n workflow
        // Set up Supabase webhook → n8n → email service (SendGrid/Resend) for automatic notifications
        setTimeout(() => {
          onClose();
        }, 2000);
      } else if (res.status === 409) {
        setError(isAr ? "أنت مشترك بالفعل!" : "You're already subscribed!");
      } else {
        const body = await res.json().catch(() => ({}));
        // Supabase unique violation code
        if (body?.code === "23505" || body?.message?.includes("unique")) {
          setError(isAr ? "أنت مشترك بالفعل!" : "You're already subscribed!");
        } else {
          setError(isAr ? "حدث خطأ. حاول مرة أخرى." : "Something went wrong. Please try again.");
        }
      }
    } catch {
      setError(isAr ? "حدث خطأ في الاتصال." : "Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="subscribe-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            key="subscribe-card"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#0c0c0c] p-8 shadow-2xl"
            dir={isAr ? "rtl" : "ltr"}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="text-3xl mb-3">📬</div>
              <h2 className="font-display text-xl font-bold text-white">
                {isAr ? "اشترك في الرؤى" : "Subscribe to Insights"}
              </h2>
              <p className="mt-2 text-sm text-white/55 leading-relaxed">
                {isAr
                  ? "احصل على إشعار عند نشر رؤى جديدة."
                  : "Get notified when we publish new AI and automation insights."}
              </p>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 py-6 text-center"
              >
                <CheckCircle className="h-12 w-12 text-green-400" />
                <p className="text-lg font-semibold text-white">
                  {isAr ? "تم الاشتراك! 🎉" : "You're subscribed! 🎉"}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 font-mono-accent uppercase tracking-wide">
                    {isAr ? "الاسم الكامل" : "Full Name"} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? "أدخل اسمك الكامل" : "Enter your full name"}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-colors focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/50 mb-1.5 font-mono-accent uppercase tracking-wide">
                    {isAr ? "البريد الإلكتروني" : "Email"} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isAr ? "أدخل بريدك الإلكتروني" : "you@example.com"}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-colors focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/50 mb-1.5 font-mono-accent uppercase tracking-wide">
                    {isAr ? "الدولة" : "Country"}{" "}
                    <span className="text-white/30 normal-case tracking-normal">
                      ({isAr ? "اختياري" : "optional"})
                    </span>
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Saudi Arabia, UAE, Egypt..."
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-colors focus:outline-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 py-3 text-sm font-bold text-[#050505] shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_28px_rgba(0,240,255,0.45)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                >
                  {loading
                    ? isAr
                      ? "جاري الإرسال..."
                      : "Subscribing..."
                    : isAr
                    ? "اشتراك"
                    : "Subscribe"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Insights page
// ---------------------------------------------------------------------------
export default function Insights() {
  const { isAr } = useLang();

  const [apiPosts, setApiPosts] = useState<Post[]>([]);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);

  const staticPosts = POSTS.map(fromStaticPost);

  useEffect(() => {
    fetchAllPosts()
      .then(posts => {
        if (posts.length > 0) setApiPosts(posts);
        setPostsLoaded(true);
      })
      .catch(() => setPostsLoaded(true));
  }, []);

  const allPosts = postsLoaded && apiPosts.length > 0
    ? apiPosts
    : [...staticPosts];

  const featured = allPosts.find(p => p.featured);
  const rest = allPosts.filter(p => !p.featured);

  const fmt = (d: string) => new Date(d).toLocaleDateString(isAr ? "ar-SA" : "en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="relative">
      <SEO pageKey="insights" path="/insights" />

      <SubscribeModal open={showSubscribe} onClose={() => setShowSubscribe(false)} isAr={isAr} />

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
            {isAr ? "رؤى عملية في الذكاء الاصطناعي والهندسة." : "Practical AI and engineering notes."}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-white/65">
            {isAr
              ? "نكتب عن ما نراه في المشاريع الحقيقية: أتمتة، وكلاء ذكاء اصطناعي، معالجة اللغة العربية، وربط الأنظمة بطريقة يفهمها قادة الأعمال والفرق التقنية."
              : "We write from real project work: automation, AI agents, Arabic language systems, integrations, and product engineering explained for both leaders and technical teams."}
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
              <button
                onClick={() => setShowSubscribe(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold text-white hover:border-cyan-400/40 hover:bg-cyan-400/5 hover:text-cyan-300 transition-all duration-200 cursor-pointer"
              >
                {isAr ? "اشترك في النشرة الإخبارية" : "Subscribe to Our Newsletter"}
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
