import React from "react";
import { motion } from "framer-motion";
import { FileText, Scale, AlertCircle, CreditCard, MessageSquare } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import SEO from "../components/SEO";

const SECTIONS_EN = [
  { icon: FileText, title: "Acceptance of Terms", content: ["By accessing or using Raanzlr's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.", "These terms apply to all visitors, users, and clients of Raanzlr's website and services. We reserve the right to update these terms at any time, with changes effective upon posting."] },
  { icon: Scale, title: "Our Services", content: ["Raanzlr provides software engineering, AI development, workflow automation, and related consulting services. Specific terms for each engagement are governed by individual service agreements or statements of work.", "We reserve the right to modify, suspend, or discontinue any aspect of our services at any time. We will provide reasonable notice for any significant changes affecting active client engagements."] },
  { icon: CreditCard, title: "Payments & Billing", content: ["Payment terms are specified in individual project agreements. Standard terms include an upfront deposit (typically 30-50%) with the remainder due upon milestone completion or project delivery.", "All prices are quoted in USD unless otherwise specified. Late payments may be subject to interest charges. We reserve the right to suspend work on projects with outstanding invoices."] },
  { icon: AlertCircle, title: "Intellectual Property", content: ["Upon full payment, clients receive ownership of all custom code, designs, and deliverables created specifically for their project.", "Raanzlr retains ownership of any pre-existing proprietary frameworks, tools, libraries, or methodologies used in project delivery. Open-source components are licensed under their respective licenses.", "Neither party may use the other's trademarks, logos, or brand materials without prior written consent."] },
  { icon: Scale, title: "Limitation of Liability", content: ["Raanzlr's liability to clients is limited to the total amount paid for the specific service giving rise to the claim. We are not liable for indirect, incidental, special, or consequential damages.", "We make no warranties that our services will be error-free or uninterrupted. Software development involves inherent uncertainties, and we work diligently to mitigate risks but cannot guarantee specific outcomes."] },
  { icon: MessageSquare, title: "Governing Law & Disputes", content: ["These terms are governed by the laws of the State of New Jersey, United States. Any disputes arising from these terms or our services will be resolved through good-faith negotiation before pursuing formal legal proceedings.", "For any questions about these terms or to resolve a dispute, contact us at: info@raanzlr.com or 9 Branch Brook Dr #10030, Belleville, NJ 07109, USA."] },
];

const SECTIONS_AR = [
  { icon: FileText, title: "قبول الشروط", content: ["باستخدام موقع Raanzlr وخدماتها، فإنك توافق على الالتزام بهذه الشروط. إذا كنت لا توافق، يرجى عدم استخدام خدماتنا.", "تنطبق هذه الشروط على جميع زوار الموقع والمستخدمين والعملاء. نحتفظ بحق تحديث هذه الشروط في أي وقت."] },
  { icon: Scale, title: "خدماتنا", content: ["تقدم Raanzlr خدمات هندسة البرمجيات والذكاء الاصطناعي وأتمتة سير العمل والاستشارات ذات الصلة. تُحكم شروط محددة لكل مشاركة من خلال اتفاقيات خدمة أو بيانات عمل فردية.", "نحتفظ بالحق في تعديل أو تعليق أو إيقاف أي جانب من خدماتنا في أي وقت مع إشعار معقول."] },
  { icon: CreditCard, title: "المدفوعات والفوترة", content: ["شروط الدفع محددة في اتفاقيات المشروع الفردية. تتضمن الشروط القياسية دفعة مقدمة (عادة 30-50%) والباقي عند اكتمال المعالم أو تسليم المشروع.", "جميع الأسعار مقتبسة بالدولار الأمريكي ما لم يُنص على خلاف ذلك. قد تخضع المدفوعات المتأخرة لرسوم فائدة."] },
  { icon: AlertCircle, title: "الملكية الفكرية", content: ["عند الدفع الكامل، يحصل العملاء على ملكية جميع الأكواد المخصصة والتصاميم والمخرجات المنشأة خصيصاً لمشروعهم.", "تحتفظ Raanzlr بملكية أي أطر أو أدوات أو مكتبات أو منهجيات خاصة موجودة مسبقاً تُستخدم في تسليم المشروع.", "لا يجوز لأي طرف استخدام العلامات التجارية أو الشعارات أو مواد العلامة التجارية للطرف الآخر دون موافقة خطية مسبقة."] },
  { icon: Scale, title: "حدود المسؤولية", content: ["تقتصر مسؤولية Raanzlr تجاه العملاء على إجمالي المبلغ المدفوع مقابل الخدمة المحددة التي أدت إلى المطالبة.", "لا نقدم ضمانات بأن خدماتنا ستكون خالية من الأخطاء أو غير منقطعة. نعمل بجد للحد من المخاطر لكن لا يمكننا ضمان نتائج محددة."] },
  { icon: MessageSquare, title: "القانون الحاكم والنزاعات", content: ["تخضع هذه الشروط لقوانين ولاية نيوجيرسي، الولايات المتحدة. أي نزاعات تُحل أولاً من خلال التفاوض بحسن نية.", "للتواصل: info@raanzlr.com أو 9 Branch Brook Dr #10030, Belleville, NJ 07109, USA."] },
];

export default function TermsOfService() {
  const { isAr } = useLang();
  const sections = isAr ? SECTIONS_AR : SECTIONS_EN;
  const lastUpdated = "May 9, 2026";

  return (
    <div className="relative">
      <SEO pageKey="termsOfService" path="/terms-of-service" />

      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300 mb-6">
            <FileText className="h-3.5 w-3.5" /> {isAr ? "شروط الخدمة" : "TERMS OF SERVICE"}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-chrome">
            {isAr ? "شروط الخدمة" : "Terms of Service"}
          </motion.h1>
          <p className="mt-4 text-sm text-white/40 font-mono-accent">
            {isAr ? "آخر تحديث:" : "Last updated:"} {lastUpdated}
          </p>
          <p className="mt-6 text-base text-white/65 leading-relaxed max-w-2xl">
            {isAr
              ? "يرجى قراءة شروط الخدمة هذه بعناية قبل استخدام خدمات Raanzlr. تحكم هذه الشروط علاقتنا بك."
              : "Please read these Terms of Service carefully before using Raanzlr's services. These terms govern our relationship with you."}
          </p>
        </div>
      </section>

      <PulseDivider />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-10">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-8">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-11 w-11 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-white">{s.title}</h2>
                  </div>
                  <div className="space-y-3">
                    {s.content.map((para, j) => (
                      <p key={j} className="text-white/65 leading-relaxed text-sm">{para}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}

          <Reveal>
            <div className="text-center pt-6">
              <MagneticButton to="/contact">{isAr ? "تواصل بشأن الشروط" : "Questions About These Terms"}</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
