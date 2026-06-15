import React from "react";
import { motion } from "framer-motion";
import { Globe2, TrendingUp, Users, MapPin } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import Heartbeat from "../components/Heartbeat";
import SEO from "../components/SEO";

const MARKETS = [
  {
    flag: "🇸🇦",
    code: "SA",
    en: { name: "Saudi Arabia", region: "GCC", sub: "Riyadh & KSA", desc: "Saudi Vision 2030 is driving unprecedented demand for AI and automation. We help Saudi enterprises, government entities, and startups embed intelligent technology into their core operations.", highlights: ["Arabic-first AI systems", "Vision 2030 alignment", "Riyadh-timezone delivery"] },
    ar: { name: "المملكة العربية السعودية", region: "الخليج", sub: "الرياض والمملكة", desc: "رؤية السعودية 2030 تدفع طلباً غير مسبوق على الذكاء الاصطناعي والأتمتة. نساعد المؤسسات السعودية على دمج التكنولوجيا الذكية في عملياتهم الأساسية.", highlights: ["أنظمة ذكاء اصطناعي عربية أولاً", "توافق مع رؤية 2030", "تسليم بالمنطقة الزمنية للرياض"] },
  },
  {
    flag: "🇦🇪",
    code: "AE",
    en: { name: "UAE", region: "GCC", sub: "Dubai & Abu Dhabi", desc: "The UAE's AI national strategy and thriving startup ecosystem make it a powerhouse for tech adoption. We partner with Dubai and Abu Dhabi enterprises pushing for operational excellence.", highlights: ["UAE AI Strategy alignment", "Fintech & PropTech expertise", "Multi-emirate delivery"] },
    ar: { name: "الإمارات العربية المتحدة", region: "الخليج", sub: "دبي وأبوظبي", desc: "الاستراتيجية الوطنية للذكاء الاصطناعي في الإمارات ونظامها البيئي المزدهر للشركات الناشئة يجعلها قوة للتبني التكنولوجي.", highlights: ["توافق استراتيجية UAE AI", "خبرة FinTech وPropTech", "تسليم متعدد الإمارات"] },
  },
  {
    flag: "🇰🇼",
    code: "KW",
    en: { name: "Kuwait", region: "GCC", sub: "Kuwait City", desc: "Kuwait's financial services and logistics sectors are ripe for AI transformation. We help Kuwaiti businesses automate complex workflows and launch multilingual digital products.", highlights: ["Financial services AI", "Arabic/English bilingual systems", "Same-timezone support"] },
    ar: { name: "الكويت", region: "الخليج", sub: "الكويت العاصمة", desc: "قطاعات الخدمات المالية والخدمات اللوجستية في الكويت جاهزة للتحول بالذكاء الاصطناعي. نساعد الشركات الكويتية على أتمتة سير العمل المعقدة.", highlights: ["ذكاء اصطناعي للخدمات المالية", "أنظمة عربية-إنجليزية ثنائية", "دعم بنفس المنطقة الزمنية"] },
  },
  {
    flag: "🇶🇦",
    code: "QA",
    en: { name: "Qatar", region: "GCC", sub: "Doha", desc: "Qatar's National Vision 2030 and robust investment climate are accelerating enterprise technology. We serve Qatari corporates, government, and hospitality sectors.", highlights: ["NV2030 tech alignment", "Hospitality & Events AI", "Arabic-first products"] },
    ar: { name: "قطر", region: "الخليج", sub: "الدوحة", desc: "الرؤية الوطنية القطرية 2030 ومناخ الاستثمار القوي يسرّعان التكنولوجيا المؤسسية. نخدم الشركات القطرية والقطاع الحكومي وقطاع الضيافة.", highlights: ["توافق تقني مع الرؤية 2030", "ذكاء اصطناعي للضيافة والفعاليات", "منتجات عربية أولاً"] },
  },
  {
    flag: "🇧🇭",
    code: "BH",
    en: { name: "Bahrain", region: "GCC", sub: "Manama", desc: "Bahrain's progressive regulatory environment and fintech leadership make it an ideal market for AI innovation. We support Bahrain's digital transformation agenda.", highlights: ["Fintech innovation hub", "Regulatory-compliant AI", "Gulf connectivity"] },
    ar: { name: "البحرين", region: "الخليج", sub: "المنامة", desc: "البيئة التنظيمية التقدمية في البحرين وريادتها في التقنية المالية تجعلها سوقاً مثالية لابتكار الذكاء الاصطناعي.", highlights: ["مركز ابتكار FinTech", "ذكاء اصطناعي متوافق تنظيمياً", "اتصالية الخليج"] },
  },
  {
    flag: "🇴🇲",
    code: "OM",
    en: { name: "Oman", region: "GCC", sub: "Muscat", desc: "Oman's Vision 2040 industrial diversification opens significant opportunities for technology-driven transformation. We help Omani enterprises modernize operations with AI.", highlights: ["Vision 2040 alignment", "Industrial AI solutions", "Arabic-first delivery"] },
    ar: { name: "عُمان", region: "الخليج", sub: "مسقط", desc: "التنويع الصناعي في رؤية عُمان 2040 يفتح فرصاً كبيرة للتحول التكنولوجي. نساعد المؤسسات العُمانية على تحديث العمليات بالذكاء الاصطناعي.", highlights: ["توافق مع رؤية 2040", "حلول AI صناعية", "تسليم بالعربية أولاً"] },
  },
  {
    flag: "🇹🇷",
    code: "TR",
    en: { name: "Turkey (Türkiye)", region: "Europe/Asia", sub: "Istanbul & Ankara", desc: "Turkey's dynamic startup ecosystem and growing enterprise sector make it a strategic market. We deliver Turkish-language AI solutions and digital transformation for Türkiye's ambitious companies.", highlights: ["Turkish-language AI systems", "Istanbul-based partnerships", "EU market bridge"] },
    ar: { name: "تركيا", region: "أوروبا/آسيا", sub: "إسطنبول وأنقرة", desc: "النظام البيئي الديناميكي للشركات الناشئة في تركيا يجعلها سوقاً استراتيجية. نقدم حلول ذكاء اصطناعي باللغة التركية للشركات الطموحة.", highlights: ["أنظمة ذكاء اصطناعي باللغة التركية", "شراكات إسطنبول", "جسر السوق الأوروبية"] },
  },
  {
    flag: "🇪🇺",
    code: "EU",
    en: { name: "Europe", region: "EMEA", sub: "Germany, Netherlands & beyond", desc: "European enterprises seeking AI and automation capabilities for MENA expansion or local transformation benefit from our cross-cultural engineering expertise and GDPR-conscious design.", highlights: ["GDPR-compliant AI", "MENA expansion support", "Cross-border delivery"] },
    ar: { name: "أوروبا", region: "أوروبا والشرق الأوسط", sub: "ألمانيا وهولندا وما بعدها", desc: "الشركات الأوروبية الساعية لقدرات الذكاء الاصطناعي والأتمتة تستفيد من خبرتنا الهندسية متعددة الثقافات والتصميم المتوافق مع GDPR.", highlights: ["ذكاء اصطناعي متوافق مع GDPR", "دعم التوسع في الشرق الأوسط", "تسليم عبر الحدود"] },
  },
];

export default function Markets() {
  const { isAr } = useLang();

  return (
    <div className="relative">
      <SEO
        title={isAr ? "أسواقنا — Raanzlr" : "Markets We Serve — Raanzlr"}
        description={isAr ? "Raanzlr تقدم حلول الذكاء الاصطناعي والبرمجيات في السعودية والإمارات والكويت وقطر والبحرين وعُمان وتركيا وأوروبا." : "Raanzlr delivers AI and software solutions across Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman, Turkey, and Europe."}
        path="/markets"
      />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="noise absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300">
            <Globe2 className="h-3.5 w-3.5" /> {isAr ? "الأسواق" : "MARKETS"}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-4xl font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.04] tracking-tighter text-chrome">
            {isAr ? "نبني للأسواق الأكثر طموحاً في العالم." : "We build for the world's most ambitious markets."}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-white/65">
            {isAr
              ? "من دول الخليج العربي إلى تركيا وأوروبا، نقدم هندسة برمجية ومنتجات ذكاء اصطناعي مصممة للبيئة التنافسية في كل سوق."
              : "From the Gulf states to Turkey and Europe, we deliver software engineering and AI products tailored to the competitive realities of each market."}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="mt-8">
            <Heartbeat className="w-48 h-8" />
          </motion.div>
        </div>
      </section>

      <PulseDivider />

      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MARKETS.map((m) => {
              const content = isAr ? m.ar : m.en;
              return (
                <StaggerItem key={m.code}>
                  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/30 transition-colors p-6 h-full flex flex-col">
                    <div className="shimmer-layer absolute inset-0 pointer-events-none" />
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{m.flag}</span>
                      <span className="text-[10px] font-mono-accent uppercase tracking-[0.18em] px-2 py-1 rounded-full border border-white/10 text-white/40">{content.region}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">{content.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1 mb-3">
                      <MapPin className="h-3 w-3 text-cyan-400" />
                      <span className="text-xs text-white/45">{content.sub}</span>
                    </div>
                    <p className="text-sm text-white/55 leading-relaxed flex-1">{content.desc}</p>
                    <ul className="mt-5 space-y-2 pt-4 border-t border-white/8">
                      {content.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-cyan-300/80">
                          <span className="h-1 w-1 rounded-full bg-cyan-400 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-chrome">
              {isAr ? "مقرنا في الولايات المتحدة. عملياتنا عالمية." : "Headquartered in the U.S. Operating globally."}
            </h2>
            <p className="mt-4 text-white/60 max-w-lg mx-auto">
              {isAr
                ? "فريقنا الموزع يضمن أوقات استجابة سريعة وفهماً ثقافياً عميقاً في كل سوق نخدمه."
                : "Our distributed team ensures fast response times and deep cultural understanding across every market we serve."}
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <MagneticButton to="/contact">{isAr ? "تواصل معنا" : "Contact Us"}</MagneticButton>
              <MagneticButton to="/book-a-call" variant="ghost">{isAr ? "احجز مكالمة" : "Book a Call"}</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
