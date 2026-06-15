import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { HelpCircle, Search, ChevronDown } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import SEO from "../components/SEO";

interface FAQ { q: string; a: string; }
interface FAQCat { title: string; questions: FAQ[]; }

export default function FAQ() {
  const { t, isAr } = useLang();
  const [searchQuery, setSearchQuery] = useState("");

  const faqData: Record<string, FAQCat> = useMemo(() => isAr ? {
    services: { title: "الخدمات", questions: [
      { q: "ما هي الخدمات التي تقدمها Raanzlr؟", a: "نقدم مجموعة شاملة من خدمات هندسة البرمجيات والذكاء الاصطناعي، بما في ذلك: تطوير وكلاء الذكاء الاصطناعي وروبوتات المحادثة، أتمتة سير العمل، تطوير مواقع الويب وتطبيقات الهاتف المحمول، حلول الذكاء الاصطناعي المخصصة، تكامل الأنظمة وواجهات برمجة التطبيقات، تصميم واجهات المستخدم وتجربة المستخدم، والتدقيق التقني والاستشارات." },
      { q: "هل تدعمون اللغة العربية في مشاريعكم؟", a: "نعم، بالتأكيد! نحن متخصصون في بناء حلول متعددة اللغات مع دعم كامل للغة العربية (RTL)، الإنجليزية، والتركية." },
      { q: "ما الفرق بين روبوتات المحادثة العادية ووكلاء الذكاء الاصطناعي؟", a: "روبوتات المحادثة التقليدية تعتمد على قواعد محددة مسبقاً. أما وكلاء الذكاء الاصطناعي فيستخدمون نماذج لغوية متقدمة (LLMs) لفهم السياق والتكامل مع أنظمتك الحالية." },
      { q: "هل يمكنكم التكامل مع أنظمتنا الحالية؟", a: "نعم، نتخصص في تكامل الأنظمة. نربط حلولنا مع منصات CRM (HubSpot, Salesforce, Zoho)، أنظمة ERP، قواعد البيانات، وأي واجهات برمجة تطبيقات مخصصة." },
    ]},
    pricing: { title: "التسعير والميزانية", questions: [
      { q: "كيف تحددون أسعار مشاريعكم؟", a: "نحدد الأسعار بناءً على نطاق المشروع، التعقيد، الجدول الزمني، والتقنيات المطلوبة. نقدم عرض أسعار شفاف ومفصل بعد مناقشة متطلباتك." },
      { q: "ما هو متوسط تكلفة مشروع روبوت محادثة ذكي؟", a: "تتراوح تكلفة روبوت محادثة ذكي أساسي من $5,000 إلى $15,000، بينما الحلول المتقدمة مع تكامل CRM قد تتراوح من $15,000 إلى $50,000+." },
      { q: "هل تقدمون خطط دفع شهرية أو اشتراكات؟", a: "نعم، نقدم نماذج تسعير مرنة. للمشاريع الكبيرة، نقدم دفعات على مراحل. كما نقدم عقود صيانة ودعم شهرية." },
      { q: "هل هناك تكاليف خفية أو رسوم إضافية؟", a: "لا، نحن نؤمن بالشفافية الكاملة. جميع التكاليف يتم توضيحها بوضوح في عرض الأسعار." },
    ]},
    process: { title: "العملية والجدول الزمني", questions: [
      { q: "كم من الوقت يستغرق إنجاز مشروع نموذجي؟", a: "روبوت محادثة بسيط: 2-4 أسابيع. موقع ويب: 4-8 أسابيع. تطبيق جوال: 8-16 أسبوعاً. حلول الذكاء الاصطناعي: 6-12 أسبوعاً." },
      { q: "كيف تبدو عملية التطوير لديكم؟", a: "نتبع منهجية Agile: الاكتشاف والتخطيط، التصميم والنماذج الأولية، التطوير التكراري، الاختبار والضمان، ثم الإطلاق والدعم." },
      { q: "هل يمكنني طلب تعديلات أثناء التطوير؟", a: "نعم، نرحب بالملاحظات والتعديلات! نقدم جولات مراجعة منتظمة. التعديلات الصغيرة ضمن النطاق مشمولة." },
      { q: "ماذا يحدث بعد إطلاق المشروع؟", a: "نقدم فترة ضمان (30-90 يوماً) لإصلاح أي أخطاء، ثم عقود صيانة ودعم اختيارية." },
    ]},
    support: { title: "الدعم والتواصل", questions: [
      { q: "كيف يمكنني التواصل معكم؟", a: "عبر نموذج الاتصال على موقعنا، أو مراسلتنا على contact@raanzlr.com. سنرد خلال 24 ساعة عمل." },
      { q: "هل تقدمون استشارات مجانية؟", a: "نعم! نقدم استشارة أولية مجانية (30-45 دقيقة) لفهم احتياجاتك ومناقشة الحلول الممكنة." },
      { q: "في أي مناطق زمنية تعملون؟", a: "مقرنا في نيوجيرسي (EST/EDT)، ولدينا فرق في الشرق الأوسط (GST/AST) وأوروبا (CET/EET)." },
      { q: "ما هي لغات التواصل التي تدعمونها؟", a: "نتحدث بطلاقة العربية والإنجليزية والتركية. جميع اجتماعاتنا ووثائقنا متوفرة باللغة التي تفضلها." },
    ]},
  } : {
    services: { title: "Services", questions: [
      { q: "What services does Raanzlr offer?", a: "We offer a comprehensive range of software engineering and AI services: AI agents & chatbots, workflow automation, web & mobile app development, custom AI solutions, systems integration & APIs, UI/UX design, and technical audits & consulting." },
      { q: "Do you support Arabic in your projects?", a: "Absolutely! We specialize in building multilingual solutions with full support for Arabic (RTL), English, and Turkish. All our products are designed to work seamlessly with the languages your target markets use." },
      { q: "What's the difference between regular chatbots and AI agents?", a: "Traditional chatbots rely on predefined rules and canned responses. The AI agents we develop use advanced LLMs to understand context, learn from conversations, and integrate with your existing systems." },
      { q: "Can you integrate with our existing systems?", a: "Yes, we specialize in systems integration. We connect our solutions with CRM platforms (HubSpot, Salesforce, Zoho), ERP systems, databases, and any custom APIs." },
    ]},
    pricing: { title: "Pricing & Budget", questions: [
      { q: "How do you price your projects?", a: "We price based on project scope, complexity, timeline, and required technologies. After discussing your requirements, we provide a transparent, detailed quote outlining costs, deliverables, and milestones." },
      { q: "What's the average cost of an AI chatbot project?", a: "A basic AI chatbot ranges from $5,000 to $15,000, while advanced solutions with CRM integration and custom training can range from $15,000 to $50,000+. We offer a free consultation to assess your needs." },
      { q: "Do you offer monthly payment plans or subscriptions?", a: "Yes, we offer flexible pricing models. For larger projects, we provide milestone-based payments (30-50% upfront). We also offer monthly maintenance and support contracts after project launch." },
      { q: "Are there any hidden costs or additional fees?", a: "No, we believe in complete transparency. All costs (development, hosting, licenses, third-party services) are clearly outlined in the quote. Any scope changes are discussed and approved in writing." },
    ]},
    process: { title: "Process & Timeline", questions: [
      { q: "How long does a typical project take?", a: "Simple chatbot: 2-4 weeks. Medium-complexity website: 4-8 weeks. Full mobile app: 8-16 weeks. Custom AI solutions: 6-12 weeks. We provide a detailed timeline with clear milestones at project start." },
      { q: "What does your development process look like?", a: "We follow an Agile methodology: (1) Discovery & Planning, (2) Design & Prototyping, (3) Iterative Development, (4) Testing & QA, (5) Launch & Support." },
      { q: "Can I request changes during development?", a: "Yes, we welcome feedback and revisions! We provide regular review cycles at each stage. Minor adjustments within the agreed scope are included. Major scope changes are assessed and priced separately." },
      { q: "What happens after the project launches?", a: "We provide a warranty period (typically 30-90 days) to fix any bugs or issues. After that, we offer optional maintenance and support contracts." },
    ]},
    support: { title: "Support & Communication", questions: [
      { q: "How can I get in touch to start a project?", a: "You can reach us through the contact form on our website, or email us directly at contact@raanzlr.com. One of our engineers will respond within 24 business hours." },
      { q: "Do you offer free consultations?", a: "Yes! We offer a free initial consultation (30-45 minutes) to understand your needs, discuss possible solutions, and provide a preliminary cost and timeline estimate." },
      { q: "What time zones do you operate in?", a: "Our headquarters is in New Jersey, USA (EST/EDT), and we have distributed teams in the Middle East (GST/AST) and Europe (CET/EET)." },
      { q: "What languages do you support for communication?", a: "We are fluent in Arabic, English, and Turkish. All our meetings, documentation, and support are available in your preferred language." },
    ]},
  }, [isAr]);

  const allQ = useMemo(() => Object.entries(faqData).flatMap(([catKey, cat]) =>
    cat.questions.map((q, idx) => ({ ...q, category: cat.title, catKey, id: `${catKey}-${idx}` }))
  ), [faqData]);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return allQ;
    const q = searchQuery.toLowerCase();
    return allQ.filter(i => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q));
  }, [searchQuery, allQ]);

  const grouped = useMemo(() => {
    const g: Record<string, { title: string; questions: typeof filtered }> = {};
    filtered.forEach(q => {
      if (!g[q.catKey]) g[q.catKey] = { title: q.category, questions: [] };
      g[q.catKey].questions.push(q);
    });
    return g;
  }, [filtered]);

  return (
    <div className="relative">
      <SEO title={isAr ? "الأسئلة الشائعة — Raanzlr" : "Frequently Asked Questions — Raanzlr"} path="/faq" />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="noise absolute inset-0" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8 w-full py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300">
            <HelpCircle className="h-3.5 w-3.5" /> {isAr ? "الأسئلة الشائعة" : "FAQ"}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-3xl font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.04] tracking-tighter text-chrome">
            {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-white/65">
            {isAr ? "إجابات سريعة وواضحة على الأسئلة الأكثر شيوعاً." : "Quick, clear answers to the most common questions about our services, pricing, process, and support."}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="text"
                placeholder={isAr ? "ابحث في الأسئلة..." : "Search questions..."}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/15 bg-white/[0.02] px-12 py-4 text-white placeholder:text-white/40 focus:border-cyan-400/50 focus:outline-none transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <PulseDivider />

      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {Object.keys(grouped).length === 0 ? (
            <Reveal>
              <div className="text-center py-16">
                <HelpCircle className="h-16 w-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">{isAr ? "لم يتم العثور على نتائج." : "No results found."}</p>
              </div>
            </Reveal>
          ) : (
            <Stagger className="space-y-12">
              {Object.entries(grouped).map(([catKey, cat]) => (
                <StaggerItem key={catKey}>
                  <h2 className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-6">{cat.title}</h2>
                  <div className="space-y-4">
                    {cat.questions.map(item => (
                      <details key={item.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/30 transition-colors">
                        <summary className="relative px-6 py-5 cursor-pointer list-none flex items-center justify-between gap-4">
                          <span className="font-display text-base sm:text-lg font-semibold text-white">{item.q}</span>
                          <ChevronDown className="h-5 w-5 text-cyan-300 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                        </summary>
                        <div className="px-6 pb-5 text-white/70 leading-relaxed text-sm">{item.a}</div>
                      </details>
                    ))}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          )}

          <Reveal delay={0.4}>
            <div className="mt-16 text-center">
              <div className="inline-flex flex-col items-center gap-6 rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.06] to-transparent p-8 sm:p-10">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-chrome">{isAr ? "لم تجد إجابتك؟" : "Didn't Find Your Answer?"}</h3>
                <p className="text-white/60 max-w-md">{isAr ? "إذا كان لديك سؤال لم يتم تغطيته هنا، لا تتردد في التواصل معنا." : "If you have a question that's not covered here, don't hesitate to reach out."}</p>
                <MagneticButton to="/contact">{isAr ? "تواصل معنا" : "Contact Us"}</MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
