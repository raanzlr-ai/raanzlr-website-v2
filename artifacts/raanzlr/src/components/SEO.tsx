import React from "react";
import { Helmet } from "react-helmet-async";
import { useLang } from "../contexts/LanguageContext";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
  pageKey?: "home" | "services" | "about" | "contact";
}

const BASE_URL = "https://raanzlr.com";

export default function SEO({ title, description, keywords, path = "/", pageKey }: SEOProps) {
  const { t, isAr } = useLang();

  const seoData = pageKey ? t.seo[pageKey] : null;
  const finalTitle = title || seoData?.title || "Raanzlr — AI, Automation & Software Engineering";
  const finalDesc = description || seoData?.description || "Elite software engineering, AI agents, and automation for the modern enterprise.";
  const finalKeywords = keywords || seoData?.keywords || "";

  const canonical = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <html lang={isAr ? "ar" : "en"} dir={isAr ? "rtl" : "ltr"} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Raanzlr" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
    </Helmet>
  );
}
