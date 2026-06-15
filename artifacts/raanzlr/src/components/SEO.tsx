import React from "react";
import { Helmet } from "react-helmet-async";
import { useLang } from "../contexts/LanguageContext";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
  pageKey?: "home" | "services" | "about" | "contact" | "insights" | "caseStudies" | "industries" | "markets" | "faq";
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  schemaType?: "WebPage" | "Article" | "BlogPosting" | "FAQPage";
  schemaDatum?: Record<string, unknown>;
}

const BASE_URL = "https://raanzlr.com";
const DEFAULT_OG_IMAGE = "https://raanzlr.com/og-image.png";

export default function SEO({
  title,
  description,
  keywords,
  path = "/",
  pageKey,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  publishedTime,
  modifiedTime,
  schemaType = "WebPage",
  schemaDatum,
}: SEOProps) {
  const { t, isAr } = useLang();

  const seoData = pageKey ? (t.seo as Record<string, { title: string; description: string; keywords: string }>)[pageKey] ?? null : null;
  const finalTitle = title || seoData?.title || (isAr
    ? "Raanzlr — حلول الذكاء الاصطناعي، الأتمتة، وهندسة البرمجيات"
    : "Raanzlr — AI, Automation & Software Engineering Studio");
  const finalDesc = description || seoData?.description || (isAr
    ? "Raanzlr هو استوديو هندسي يبتكر وكلاء الذكاء الاصطناعي وأتمتة العمليات للشركات في الخليج وتركيا وأوروبا."
    : "Raanzlr engineers AI agents, workflow automations, web platforms, and mobile apps for enterprises in MENA, Türkiye, and Europe.");
  const finalKeywords = keywords || seoData?.keywords || "";

  const canonical = `${BASE_URL}${path}`;
  const lang = isAr ? "ar" : "en";

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: finalTitle,
    description: finalDesc,
    url: canonical,
    ...(ogType === "article" && publishedTime ? { datePublished: publishedTime } : {}),
    ...(ogType === "article" && modifiedTime ? { dateModified: modifiedTime } : {}),
    publisher: {
      "@type": "Organization",
      name: "Raanzlr",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/Raanzlr.png` },
    },
    ...(schemaDatum ?? {}),
  };

  return (
    <Helmet>
      <html lang={lang} dir={isAr ? "rtl" : "ltr"} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      <link rel="canonical" href={canonical} />

      {/* hreflang: this site serves both languages at the same URL */}
      <link rel="alternate" hreflang="en" href={`${BASE_URL}${path}`} />
      <link rel="alternate" hreflang="ar" href={`${BASE_URL}${path}`} />
      <link rel="alternate" hreflang="x-default" href={`${BASE_URL}${path}`} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Raanzlr" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={isAr ? "ar_AE" : "en_US"} />
      <meta property="og:locale:alternate" content={isAr ? "en_US" : "ar_AE"} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@raanzlr" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD structured data */}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
