import { groq } from "next-sanity";

export const ARTICLES_RECENT = groq`
*[_type == "article" && defined(slug.current)] | order(publishedAt desc) [0...$limit] {
  _id,
  title,
  "slug": slug.current,
  subtitle,
  excerpt,
  readingTime,
  publishedAt,
  heroImage,
  featured,
  "pillar": pillar->{ title, "slug": slug.current, numeral }
}
`;

export const ARTICLES_BY_PILLAR = groq`
*[_type == "article" && pillar->slug.current == $pillarSlug && defined(slug.current)]
| order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  subtitle,
  excerpt,
  readingTime,
  publishedAt,
  heroImage,
  "pillar": pillar->{ title, "slug": slug.current, numeral }
}
`;

export const ARTICLE_BY_SLUG = groq`
*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  subtitle,
  excerpt,
  readingTime,
  publishedAt,
  heroImage,
  body,
  "pillar": pillar->{ title, "slug": slug.current, numeral },
  "author": author->{ name, role, image }
}
`;

export const ARTICLE_SLUGS = groq`
*[_type == "article" && defined(slug.current)][].slug.current
`;

export const PILLARS_ALL = groq`
*[_type == "pillar"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  numeral,
  tagline,
  longDescription,
  "articleCount": count(*[_type == "article" && references(^._id)])
}
`;

export const PILLAR_BY_SLUG = groq`
*[_type == "pillar" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  numeral,
  tagline,
  longDescription
}
`;

export const SETTINGS = groq`
*[_type == "settings"][0] {
  siteTitle,
  editionLabel,
  heroHeadline,
  heroLead,
  reportTitle,
  reportDescription
}
`;
