const SITE_URL = "https://clientemidia.com.br";
const ORG_NAME = "Cliente Mídia™";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: ORG_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`
  },
  sameAs: ["https://viralizeluxo.com.br"],
  description:
    "Centro de autoridade da categoria Cliente Mídia™ no Brasil. Documentamos a transformação do varejo premium em uma nova era de distribuição orgânica.",
  foundingDate: "2026",
  areaServed: "BR",
  knowsAbout: [
    "Marketing orgânico",
    "Varejo premium brasileiro",
    "Distribuição orgânica",
    "Cliente Mídia",
    "Moda premium"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: ORG_NAME,
  description:
    "A nova categoria do varejo premium brasileiro. Documentamos a transformação.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "pt-BR",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/artigos?q={search_term_string}` },
    "query-input": "required name=search_term_string"
  }
};

export function articleSchema(article: {
  title: string;
  subtitle?: string;
  excerpt?: string;
  slug: string;
  publishedAt?: string;
  readingTime?: number;
  seoKeyword?: string;
  heroImageUrl?: string;
  pillarTitle?: string;
}) {
  const url = `${SITE_URL}/artigos/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.excerpt || article.subtitle || "",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: article.publishedAt || new Date().toISOString(),
    dateModified: article.publishedAt || new Date().toISOString(),
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: ORG_NAME
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: ORG_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` }
    },
    inLanguage: "pt-BR",
    ...(article.heroImageUrl ? { image: { "@type": "ImageObject", url: article.heroImageUrl } } : {}),
    ...(article.seoKeyword ? { keywords: article.seoKeyword } : {}),
    ...(article.readingTime ? { timeRequired: `PT${article.readingTime}M` } : {}),
    ...(article.pillarTitle ? { articleSection: article.pillarTitle } : {}),
    isPartOf: { "@id": `${SITE_URL}/#website` }
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function definedTermSetSchema(
  terms: { term: string; definition: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${SITE_URL}/glossario#termset`,
    name: "Glossário Cliente Mídia™",
    description:
      "Os termos da categoria Cliente Mídia™ definidos com precisão — o vocabulário do novo varejo premium.",
    url: `${SITE_URL}/glossario`,
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE_URL}/#organization` },
    definedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      inDefinedTermSet: `${SITE_URL}/glossario#termset`
    }))
  };
}
