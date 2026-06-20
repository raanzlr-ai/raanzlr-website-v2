import React from "react";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, UserCheck, Mail } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import SEO from "../components/SEO";

const SECTIONS_EN = [
  { icon: Eye, title: "Data We Collect", content: ["When you interact with our website or services, we collect:", "• Identity Information: Full name, email address, phone number, job title, and company name.", "• Usage Data: IP address, browser type, operating system, pages visited, and session duration.", "• Communication Data: Any information you voluntarily provide through contact forms or email."] },
  { icon: Lock, title: "How We Use Your Data", content: ["We use the information we collect for:", "• Service Delivery: Process your requests, respond to inquiries, and execute agreed-upon projects.", "• Analytics & Improvement: Understand how our website is used to improve performance and user experience.", "• Marketing & Communications: Send updates about our services (you can opt out anytime).", "• Legal Compliance: Fulfill legal and regulatory obligations."] },
  { icon: UserCheck, title: "Third-Party Services", content: ["We use trusted third-party services:", "• Vercel Analytics & Speed Insights: For monitoring website performance.", "• PostHog: For understanding user behavior and improving the product experience.", "• Google Fonts: For loading the typefaces used on our website.", "We do not sell or share your personal information with third parties for marketing purposes without your explicit consent."] },
  { icon: Shield, title: "Your Rights", content: ["Under GDPR and applicable local laws, you have the right to:", "• Access: Request a copy of all the data we hold about you.", "• Rectification: Request correction of any inaccurate information.", "• Erasure: Request complete deletion of your personal data.", "• Data Portability: Receive your data in a portable format.", "• Object: Object to the use of your data for marketing purposes.", "To exercise any of these rights, contact us at: info@raanzlr.com"] },
  { icon: Mail, title: "Contact Us", content: ["If you have any questions or concerns about this privacy policy:", "Email: info@raanzlr.com", "Address: 9 Branch Brook Dr #10030, Belleville, NJ 07109, USA", "We commit to responding to all inquiries within 48 business hours."] },
];

const SECTIONS_AR = [
  { icon: Eye, title: "البيانات التي نجمعها", content: ["عندما تتفاعل مع موقعنا أو خدماتنا، نجمع:", "• معلومات الهوية: الاسم الكامل، البريد الإلكتروني، رقم الهاتف، المسمى الوظيفي، واسم الشركة.", "• بيانات الاستخدام: عنوان IP، نوع المتصفح، نظام التشغيل، الصفحات التي زرتها.", "• بيانات الاتصال: أي معلومات تشاركها طوعاً عبر نماذج الاتصال."] },
  { icon: Lock, title: "كيف نستخدم معلوماتك", content: ["نستخدم البيانات لـ:", "• تقديم الخدمات: معالجة طلباتك والرد على استفساراتك.", "• التحسين والتحليل: فهم كيفية استخدام الموقع لتحسين الأداء.", "• التواصل التسويقي: إرسال تحديثات حول خدماتنا (يمكنك إلغاء الاشتراك في أي وقت).", "• الامتثال القانوني: الوفاء بالمتطلبات القانونية."] },
  { icon: UserCheck, title: "الخدمات الخارجية", content: ["نعتمد على خدمات موثوقة:", "• Vercel Analytics: لمراقبة أداء الموقع.", "• PostHog: لفهم سلوك المستخدمين.", "• Google Fonts: لتحميل الخطوط.", "لا نبيع أو نشارك معلوماتك الشخصية مع أطراف خارجية لأغراض تسويقية بدون موافقتك."] },
  { icon: Shield, title: "حقوقك", content: ["وفقاً للائحة GDPR والقوانين المحلية، لديك حق:", "• الوصول: طلب نسخة من بياناتك.", "• التصحيح: طلب تصحيح معلومات غير دقيقة.", "• الحذف: طلب حذف بياناتك الشخصية.", "• نقل البيانات: الحصول على بياناتك بصيغة قابلة للنقل.", "• الاعتراض: الاعتراض على استخدام بياناتك للتسويق.", "للتواصل: info@raanzlr.com"] },
  { icon: Mail, title: "تواصل معنا", content: ["إذا كان لديك أي استفسار:", "البريد الإلكتروني: info@raanzlr.com", "العنوان: 9 Branch Brook Dr #10030, Belleville, NJ 07109, USA", "نلتزم بالرد خلال 48 ساعة عمل."] },
];

export default function PrivacyPolicy() {
  const { isAr } = useLang();
  const sections = isAr ? SECTIONS_AR : SECTIONS_EN;
  const lastUpdated = "May 9, 2026";

  return (
    <div className="relative">
      <SEO pageKey="privacyPolicy" path="/privacy-policy" />

      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300 mb-6">
            <Shield className="h-3.5 w-3.5" /> {isAr ? "سياسة الخصوصية" : "PRIVACY POLICY"}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-chrome">
            {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
          </motion.h1>
          <p className="mt-4 text-sm text-white/40 font-mono-accent">
            {isAr ? "آخر تحديث:" : "Last updated:"} {lastUpdated}
          </p>
          <p className="mt-6 text-base text-white/65 leading-relaxed max-w-2xl">
            {isAr
              ? "في Raanzlr، نولي خصوصيتك أهمية قصوى. تشرح هذه السياسة كيفية جمعنا لبياناتك واستخدامها وحمايتها."
              : "At Raanzlr, your privacy is paramount. This policy explains how we collect, use, and protect your data."}
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
                  <div className="space-y-2">
                    {s.content.map((line, j) => (
                      <p key={j} className={`leading-relaxed ${line.startsWith("•") ? "text-sm text-white/60 rtl:pr-4 pl-4 rtl:pl-0" : "text-white/70"}`}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}

          <Reveal>
            <div className="text-center pt-6">
              <MagneticButton to="/contact">{isAr ? "تواصل بشأن الخصوصية" : "Contact Us About Privacy"}</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
