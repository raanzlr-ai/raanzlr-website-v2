import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import MagneticButton from "./MagneticButton";

interface ServiceItem {
  key: string;
  title: string;
  desc: string;
  long: string;
  helps: string[];
  image: string;
  tier: string;
}

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const { t, isAr } = useLang();

  return (
    <AnimatePresence>
      {service && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-4 top-[5%] bottom-[5%] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-2xl z-[101] flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {/* Image header */}
            <div className="relative h-44 sm:h-52 shrink-0 overflow-hidden">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 h-9 w-9 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 px-6 sm:px-8 pb-8 -mt-8 relative">
              <span className={`inline-flex items-center text-[10px] font-mono-accent uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border mb-4 ${service.tier === "high" ? "border-cyan-400/50 text-cyan-300 bg-cyan-400/10" : "border-white/10 text-white/40"}`}>
                {service.tier === "high" ? t.services.highDemand : t.services.standard}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-chrome mt-2">{service.title}</h2>
              <p className="mt-4 text-white/65 leading-relaxed">{service.long}</p>

              <div className="mt-6">
                <h3 className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/80 mb-4">
                  {isAr ? "كيف يساعدك ذلك" : "How this helps you"}
                </h3>
                <ul className="space-y-3">
                  {service.helps.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-white/70">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <MagneticButton to={`/contact?service=${service.key}`} testId="modal-cta">
                  {t.cta.requestService}
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
