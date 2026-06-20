import { Helmet } from 'react-helmet-async';
import { useLang } from '../contexts/LanguageContext';
import { useLocation } from 'react-router-dom';

// Maps pageKey to translation seo keys
type SeoPageKey =
  | 'home'
  | 'services'
  | 'about'
  | 'contact'
  | 'faq'
  | 'insights'
  | 'caseStudies'
  | 'industries'
  | 'markets'
  | 'privacyPolicy'
  | 'termsOfService';

interface SEOProps {
  /** Use pageKey for standard pages backed by translations.seo */
  pageKey?: SeoPageKey;
  /** Override or custom title (used when pageKey not provided, or for dynamic pages) */
  title?: string;
  titleAr?: string;
  /** Override or custom description */
  description?: string;
  descriptionAr?: string;
  keywords?: string;
  keywordsAr?: string;
  image?: string;
  type?: 'website' | 'article';
  /** Path relative to domain, e.g. "/services/ai-chatbots" */
  path?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  schema?: object | object[];
  noIndex?: boolean;
}

// Fallback OG image — replace /Raanzlr.png with /opengraph.jpg once the 1200x630 file is created in /public/
const DEFAULT_OG_IMAGE = 'https://raanzlr.com/Raanzlr.png';

// Segment display names for breadcrumbs
const SEGMENT_NAMES: Record<string, { en: string; ar: string }> = {
  services: { en: 'Services', ar: 'الخدمات' },
  markets: { en: 'Markets', ar: 'الأسواق' },
  insights: { en: 'Insights', ar: 'المدونة' },
  'case-studies': { en: 'Case Studies', ar: 'دراسات الحالة' },
  industries: { en: 'Industries', ar: 'القطاعات' },
  about: { en: 'About', ar: 'عنا' },
  contact: { en: 'Contact', ar: 'تواصل معنا' },
  faq: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
};

export default function SEO({
  pageKey,
  title,
  titleAr,
  description,
  descriptionAr,
  keywords,
  keywordsAr,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  path: pathProp,
  article,
  schema,
  noIndex = false,
}: SEOProps) {
  const { lang, t } = useLang();
  const location = useLocation();
  const isAr = lang === 'ar';

  // Resolve path: use explicit prop, or derive from router location
  const rawPath = (pathProp ?? location.pathname.replace(/^\/(en|ar)/, '')) || '/';

  // Build canonical & alternate URLs
  const baseUrl = 'https://raanzlr.com';
  const enUrl = `${baseUrl}/en${rawPath === '/' ? '/' : rawPath}`;
  const arUrl = `${baseUrl}/ar${rawPath === '/' ? '/' : rawPath}`;
  const canonicalUrl = isAr ? arUrl : enUrl;

  // Resolve title / description / keywords from pageKey or explicit props
  const seo = t.seo as Record<string, { title: string; description: string; keywords: string }>;

  const resolvedTitle = isAr
    ? (titleAr ?? (pageKey && seo[pageKey]?.title) ?? title ?? 'Raanzlr')
    : (title ?? (pageKey && seo[pageKey]?.title) ?? 'Raanzlr');

  const resolvedDescription = isAr
    ? (descriptionAr ?? (pageKey && seo[pageKey]?.description) ?? description ?? '')
    : (description ?? (pageKey && seo[pageKey]?.description) ?? '');

  const resolvedKeywords = isAr
    ? (keywordsAr ?? (pageKey && seo[pageKey]?.keywords) ?? keywords)
    : (keywords ?? (pageKey && seo[pageKey]?.keywords));

  const locale = isAr ? 'ar_AE' : 'en_US';
  const alternateLocale = isAr ? 'en_US' : 'ar_AE';
  const htmlLang = isAr ? 'ar' : 'en';
  const htmlDir = isAr ? 'rtl' : 'ltr';

  // Build BreadcrumbList for detail/section pages
  const buildBreadcrumb = () => {
    const segments = rawPath.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
    if (segments.length < 2) return null; // Only show breadcrumb on depth >= 2

    const homeLabel = isAr ? 'الرئيسية' : 'Home';
    const homePath = isAr ? arUrl.replace(rawPath === '/' ? '/' : rawPath, '/') : enUrl.replace(rawPath === '/' ? '/' : rawPath, '/');
    const baseHome = `${baseUrl}/${isAr ? 'ar' : 'en'}/`;

    const items: Array<{ position: number; name: string; item?: string }> = [
      { position: 1, name: homeLabel, item: baseHome },
    ];

    // Section page (e.g. /services)
    const sectionKey = segments[0];
    const sectionName = isAr
      ? (SEGMENT_NAMES[sectionKey]?.ar ?? sectionKey)
      : (SEGMENT_NAMES[sectionKey]?.en ?? sectionKey);
    const sectionUrl = `${baseUrl}/${isAr ? 'ar' : 'en'}/${sectionKey}`;

    items.push({ position: 2, name: sectionName, item: sectionUrl });

    // Detail page (e.g. /services/ai-chatbots)
    if (segments.length >= 2) {
      items.push({
        position: 3,
        name: resolvedTitle.replace(' — Raanzlr', '').replace(' — Market — Raanzlr', '').replace(' — سوق — Raanzlr', ''),
      });
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item) => ({
        '@type': 'ListItem',
        position: item.position,
        name: item.name,
        ...(item.item ? { item: item.item } : {}),
      })),
    };
  };

  // Generate structured data
  const generateSchema = () => {
    const breadcrumb = buildBreadcrumb();

    const baseSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'BlogPosting' : 'WebPage',
      headline: resolvedTitle,
      description: resolvedDescription,
      url: canonicalUrl,
      inLanguage: htmlLang,
      image,
      ...(type === 'article' && article
        ? {
            datePublished: article.publishedTime,
            dateModified: article.modifiedTime,
            author: {
              '@type': 'Organization',
              name: article.author || 'Raanzlr',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Raanzlr',
              logo: {
                '@type': 'ImageObject',
                url: 'https://raanzlr.com/Raanzlr.png',
              },
            },
            articleSection: article.section,
            keywords: article.tags?.join(', '),
          }
        : {}),
    };

    const schemaList: object[] = [];

    if (schema) {
      if (Array.isArray(schema)) schemaList.push(...schema);
      else schemaList.push(schema);
    }
    schemaList.push(baseSchema);
    if (breadcrumb) schemaList.push(breadcrumb);

    return schemaList;
  };

  const schemas = generateSchema();

  return (
    <Helmet>
      {/* HTML attributes */}
      <html lang={htmlLang} dir={htmlDir} />

      {/* Primary Meta Tags */}
      <title>{resolvedTitle}</title>
      <meta name="title" content={resolvedTitle} />
      <meta name="description" content={resolvedDescription} />
      {resolvedKeywords && <meta name="keywords" content={resolvedKeywords} />}
      <meta
        name="robots"
        content={
          noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Tags */}
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="ar" href={arUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Raanzlr" />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={alternateLocale} />

      {/* Article specific OG tags */}
      {type === 'article' && article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@raanzlr" />
      <meta name="twitter:creator" content="@raanzlr" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={image} />
      <meta
        name="twitter:image:alt"
        content={resolvedTitle || 'Raanzlr — AI Automation & Software Engineering'}
      />

      {/* Structured Data (Schema.org) */}
      {schemas.map((schemaObj, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaObj)}
        </script>
      ))}
    </Helmet>
  );
}
