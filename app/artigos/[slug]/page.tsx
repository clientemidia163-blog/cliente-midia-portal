import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PortableTextBody } from "@/components/article/PortableTextBody";
import { SimuladorCTA } from "@/components/site/SimuladorCTA";
import { sanityClient, urlForImage } from "@/lib/sanity";
import { ARTICLE_BY_SLUG, ARTICLE_SLUGS } from "@/lib/queries";
import { articleSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams() {
  try {
    const slugs: string[] = await sanityClient.fetch(ARTICLE_SLUGS);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Params }) {
  const article = await sanityClient.fetch(ARTICLE_BY_SLUG, { slug: params.slug }).catch(() => null);
  if (!article) return { title: "Artigo" };
  return {
    title: article.seoTitle || article.title,
    description: article.excerpt
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const article = await sanityClient.fetch(ARTICLE_BY_SLUG, { slug: params.slug }).catch(() => null);
  if (!article) notFound();

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
    : "";

  const heroSrc = article.heroImage ? urlForImage(article.heroImage).width(1800).url() : null;

  const ldArticle = articleSchema({
    title: article.title,
    subtitle: article.subtitle,
    excerpt: article.excerpt,
    slug: params.slug,
    publishedAt: article.publishedAt,
    readingTime: article.readingTime,
    seoKeyword: article.seoKeyword,
    heroImageUrl: heroSrc ?? undefined,
    pillarTitle: article.pillar?.title
  });

  const ldBreadcrumb = breadcrumbSchema([
    { name: "Home", url: "https://clientemidia.com.br" },
    { name: "Artigos", url: "https://clientemidia.com.br/artigos" },
    { name: article.title, url: `https://clientemidia.com.br/artigos/${params.slug}` }
  ]);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }} />
      <Header />

      <article className="px-8 pb-32 pt-20">
        <div className="mx-auto max-w-[820px]">
          {article.pillar && (
            <div className="mb-8 flex items-center gap-4">
              <Link href={`/${article.pillar.slug}`} className="text-[11px] font-medium uppercase tracking-eyebrow text-gold hover:opacity-80">
                {article.pillar.title}
              </Link>
              <span className="h-px w-10 bg-line-dark" />
              <span className="text-[11px] uppercase tracking-[0.15em] text-sepia">{date}</span>
              {article.readingTime && (
                <>
                  <span className="h-px w-10 bg-line-dark" />
                  <span className="text-[11px] uppercase tracking-[0.15em] text-sepia">{article.readingTime} min</span>
                </>
              )}
            </div>
          )}

          <h1 className="mb-8 font-serif text-5xl font-medium leading-[1.04] tracking-tight md:text-[72px]">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="mb-12 text-2xl font-light leading-snug text-sepia md:text-[28px]">
              {article.subtitle}
            </p>
          )}
        </div>

        {heroSrc && (
          <div className="mx-auto mb-16 max-w-[1100px]">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image src={heroSrc} alt={article.heroImage?.alt || article.title} fill priority sizes="(max-width: 1100px) 100vw, 1100px" className="object-cover" />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-[760px]">
          <PortableTextBody value={article.body} />
        </div>

        {article.author && (
          <div className="mx-auto mt-20 max-w-[760px] border-t border-line-dark pt-10">
            <div className="text-[11px] uppercase tracking-eyebrow text-sepia">Sobre o autor</div>
            <div className="mt-3 font-serif text-2xl">{article.author.name}</div>
            {article.author.role && (
              <div className="mt-1 text-sm text-sepia">{article.author.role}</div>
            )}
          </div>
        )}
      </article>

      {/* Conversão primária — simulador como ponte entre leitura e ação */}
      <SimuladorCTA variant="article" contextLabel="Depois desta leitura" />

      <Footer />
    </main>
  );
}
