import React from "react";
import { motion } from "framer-motion";
import { Building2, ShoppingCart, Heart, GraduationCap, Truck, Hotel, Scale, Factory, ArrowRight } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import SEO from "../components/SEO";

const INDUSTRIES = [
  {
    icon: Building2,
    key: "finance",
    en: { title: "Finance & Banking", desc: "AI-powered compliance monitoring, intelligent fraud detection, automated KYC, and 24/7 multilingual customer support bots for banks and fintech firms across the GCC.", tags: ["Fraud Detection", "KYC Automation", "Chatbots", "Compliance AI"] },
    ar: { title: "المالية والمصرفية", desc: "مراقبة الامتثال بالذكاء الاصطناعي، كشف الاحتيال الذكي، أتمتة KYC، ودعم العملاء متعدد اللغات على مدار الساعة للبنوك وشركات التقنية المالية.", tags: ["كشف الاحتيال", "أتمتة KYC", "روبوتات دعم", "امتثال AI"] },
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: ShoppingCart,
    key: "retail",
    en: { title: "Retail & E-Commerce", desc: "Personalised product recommendations, AI-driven inventory forecasting, WhatsApp shopping assistants, and automated order tracking for MENA's booming retail sector.", tags: ["Recommendation AI", "Inventory AI", "WhatsApp Bot", "Order Automation"] },
    ar: { title: "التجزئة والتجارة الإلكترونية", desc: "توصيات المنتجات المخصصة، توقع المخزون بالذكاء الاصطناعي، مساعدو التسوق عبر واتساب، وتتبع الطلبات الآلي لقطاع التجزئة.", tags: ["AI توصيات", "ذكاء المخزون", "بوت واتساب", "أتمتة الطلبات"] },
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Heart,
    key: "healthcare",
    en: { title: "Healthcare", desc: "Patient intake automation, appointment scheduling bots, medical record summarization, and HIPAA-compliant AI tools for clinics and hospitals across the region.", tags: ["Appointment Bots", "Record Summarization", "Patient Intake", "Compliance"] },
    ar: { title: "الرعاية الصحية", desc: "أتمتة استقبال المرضى، روبوتات جدولة المواعيد، تلخيص السجلات الطبية، وأدوات ذكاء اصطناعي متوافقة للعيادات والمستشفيات.", tags: ["روبوتات المواعيد", "تلخيص السجلات", "استقبال المرضى", "الامتثال"] },
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: GraduationCap,
    key: "education",
    en: { title: "Education & EdTech", desc: "Adaptive learning platforms, AI tutoring assistants, automated grading pipelines, and multilingual student support systems for universities and online academies.", tags: ["AI Tutoring", "Adaptive Learning", "Auto-Grading", "Student Support"] },
    ar: { title: "التعليم والتكنولوجيا التعليمية", desc: "منصات التعلم التكيفي، مساعدو الذكاء الاصطناعي للتدريس، خطوط التصحيح الآلي، وأنظمة دعم الطلاب متعددة اللغات.", tags: ["توجيه AI", "تعلم تكيفي", "تصحيح آلي", "دعم الطلاب"] },
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Truck,
    key: "logistics",
    en: { title: "Logistics & Supply Chain", desc: "Real-time shipment tracking bots, predictive maintenance AI, route optimization algorithms, and automated supplier communication for GCC freight and logistics operators.", tags: ["Shipment Tracking", "Route Optimization", "Predictive Maintenance", "Supplier Automation"] },
    ar: { title: "اللوجستيات وسلسلة التوريد", desc: "روبوتات تتبع الشحنات في الوقت الفعلي، ذكاء اصطناعي للصيانة التنبؤية، خوارزميات تحسين المسار، وتواصل آلي مع الموردين.", tags: ["تتبع الشحنات", "تحسين المسارات", "صيانة تنبؤية", "أتمتة الموردين"] },
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Hotel,
    key: "hospitality",
    en: { title: "Hospitality & Tourism", desc: "AI concierge bots for hotels, automated reservation management, multilingual guest support in Arabic/English/Turkish, and review sentiment analysis for hospitality brands.", tags: ["AI Concierge", "Reservation Automation", "Guest Support", "Sentiment Analysis"] },
    ar: { title: "الضيافة والسياحة", desc: "روبوتات كونسيرج للفنادق، إدارة الحجوزات الآلية، دعم الضيوف متعدد اللغات، وتحليل مشاعر التقييمات لعلامات الضيافة.", tags: ["كونسيرج AI", "أتمتة الحجوزات", "دعم الضيوف", "تحليل المشاعر"] },
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Scale,
    key: "legal",
    en: { title: "Legal & Professional Services", desc: "Contract analysis AI, legal document summarization, client intake automation, and intelligent billing systems for law firms and professional service firms.", tags: ["Contract AI", "Document Summarization", "Client Intake", "Billing Automation"] },
    ar: { title: "الخدمات القانونية والمهنية", desc: "ذكاء اصطناعي لتحليل العقود، تلخيص المستندات القانونية، أتمتة استقبال العملاء، وأنظمة فوترة ذكية للمكاتب القانونية.", tags: ["AI عقود", "تلخيص الوثائق", "استقبال العملاء", "أتمتة الفوترة"] },
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Factory,
    key: "manufacturing",
    en: { title: "Manufacturing & Industry", desc: "Predictive quality control, automated defect detection with computer vision, smart production scheduling, and IoT data pipeline automation for factories.", tags: ["Quality Control AI", "Computer Vision", "Production Scheduling", "IoT Automation"] },
    ar: { title: "التصنيع والصناعة", desc: "ضبط الجودة التنبؤي، كشف العيوب الآلي بالرؤية الحاسوبية، جدولة الإنتاج الذكية، وأتمتة خطوط بيانات IoT للمصانع.", tags: ["AI جودة", "رؤية حاسوبية", "جدولة الإنتاج", "أتمتة IoT"] },
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Industries() {
  const { isAr } = useLang();

  return (
    <div className="relative">
      <SEO
        title={isAr ? "القطاعات — Raanzlr" : "Industries We Serve — Raanzlr"}
        description={isAr ? "Raanzlr تقدم حلول الذكاء الاصطناعي والأتمتة المخصصة لمختلف القطاعات في منطقة الخليج والشرق الأوسط." : "Raanzlr delivers AI automation and software engineering solutions tailored to industries across the GCC and MENA region."}
        path="/industries"
      />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="absolute -top-20 left-1/3 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="noise absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300">
            {isAr ? "القطاعات" : "INDUSTRIES"}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-4xl font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.04] tracking-tighter text-chrome">
            {isAr ? "نهندس حلولاً لكل قطاع." : "Engineering solutions for every industry."}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-white/65">
            {isAr
              ? "خبرتنا العميقة في قطاعات الأعمال الرئيسية تمكّننا من تقديم حلول ذكاء اصطناعي وأتمتة مصممة خصيصاً لتحديات صناعتك."
              : "Our deep expertise across key business verticals enables us to deliver AI and automation solutions precisely engineered for your industry's unique challenges."}
          </motion.p>
        </div>
      </section>

      <PulseDivider />

      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {INDUSTRIES.map((ind) => {
              const Icon = ind.icon;
              const content = isAr ? ind.ar : ind.en;
              return (
                <StaggerItem key={ind.key}>
                  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/30 transition-colors h-full flex flex-col">
                    <div className="relative h-36 overflow-hidden">
                      <img src={ind.image} alt={content.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]" />
                      <div className="absolute bottom-3 left-4">
                        <div className="h-10 w-10 rounded-xl border border-cyan-400/40 bg-cyan-400/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-cyan-300" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-lg font-semibold text-white">{content.title}</h3>
                      <p className="mt-2 text-sm text-white/55 leading-relaxed flex-1">{content.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {content.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-mono-accent uppercase tracking-[0.15em] px-2 py-1 rounded-full border border-cyan-400/20 text-cyan-300/70 bg-cyan-400/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
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
              {isAr ? "لم تجد قطاعك هنا؟" : "Don't see your industry here?"}
            </h2>
            <p className="mt-4 text-white/60 max-w-lg mx-auto">
              {isAr
                ? "نعمل مع شركات في طيف واسع من القطاعات. تواصل معنا لنناقش كيف يمكننا تطبيق تخصصنا في حل تحديات قطاعك."
                : "We work with companies across a wide spectrum of verticals. Reach out to discuss how we can apply our expertise to your industry's unique challenges."}
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <MagneticButton to="/contact">{isAr ? "تحدث مع خبير" : "Talk to an Expert"}</MagneticButton>
              <MagneticButton to="/services" variant="ghost">{isAr ? "استعرض الخدمات" : "View Our Services"}</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
