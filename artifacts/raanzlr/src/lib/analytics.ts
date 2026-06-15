export const trackEvent = (name: string, properties: Record<string, unknown> = {}) => {
  try {
    if (typeof window !== "undefined" && (window as any).posthog?.capture) {
      (window as any).posthog.capture(name, properties);
    }
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", name, properties);
    }
  } catch (_) {}
};

export const EVENTS = {
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  SERVICE_FORM_SUBMIT: "service_form_submit",
  WHATSAPP_CLICK: "whatsapp_click",
  BOOK_CONSULTATION_CLICK: "book_consultation_click",
  EMAIL_CLICK: "email_click",
  CTA_CLICK: "cta_click",
};

export const buildWhatsAppUrl = (message?: string, phone?: string) => {
  const number = (phone || "").replace(/[^0-9]/g, "");
  const text = encodeURIComponent(
    message || "Hello Raanzlr, I want to explore automation opportunities for my company."
  );
  if (!number) return `https://wa.me/?text=${text}`;
  return `https://wa.me/${number}?text=${text}`;
};
