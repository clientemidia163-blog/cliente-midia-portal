import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArticleCard } from "@/components/site/ArticleCard";
import { SimuladorCTA } from "@/components/site/SimuladorCTA";

type Props = {
  numeral: string;
  title: string;
  tagline: string;
  longDescription?: string;
  articles?: any[];
  fallbackArticles?: { title: string; subtitle?: string; tag?: string; meta?: string }[];
};

export function PillarPage({
  numeral,
  title,
  tagline,
  longDescription,
  articles = [],
  fallbackArticles = []
}: Props) {
  const hasSanityArticles = articles.length > 0;
  return (
    <main>
      <Header />

      <section className="border-b border-line-dark px-8 py-24 md:py-28">
        <div className="mx-auto max-w-[1080px]">
          <div className="mb-8 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="eyebrow">Pilar editorial</span>
          </div>
          <div className="mb-6 font-serif text-2xl italic text-gold">{numeral}</div>
          <h1 className="mb-8 font-serif text-5xl font-medium leading-[1.04] tracking-tight md:text-[80px]">
            {title}
          </h1>
          <p className="max-w-[720px] text-lg font-light leading-relaxed text-sepia md:text-xl">
            {tagline}
          </p>
          {longDescription && (
            <p className="mt-6 max-w-[720px] text-base leading-relaxed text-sepia">
              {longDescription}
            </p>
          )}
        </div>
      </section>

      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-14 flex items-end justify-between border-b border-line-dark pb-8">
            <h2 className="font-serif text-3xl font-medium md:text-[36px]">
              {hasSanityArticles ? "Artigos publicados" : "Em produção editorial"}
            </h2>
            <Link href="/artigos" className="btn-text">Arquivo completo →</Link>
          </div>

          {hasSanityArticles ? (
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a: any) => <ArticleCard key={a._id} article={a} />)}
            </div>
          ) : (
            <div className="space-y-6">
              {fallbackArticles.map((a, i) => (
                <div key={i} className="border-b border-line-dark py-8">
                  {a.tag && (
                    <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                      {a.tag}
                    </div>
                  )}
                  <h3 className="mb-2 font-serif text-2xl font-medium md:text-3xl">{a.title}</h3>
                  {a.subtitle && (
                    <p className="mb-3 text-base leading-relaxed text-sepia">{a.subtitle}</p>
                  )}
                  {a.meta && (
                    <div className="text-[11px] uppercase tracking-[0.15em] text-sepia">{a.meta}</div>
                  )}
                </div>
              ))}
              <p className="mt-10 text-sm italic text-dim">
                Os artigos deste pilar serão publicados em sequência ao longo das próximas semanas.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Ponte entre conteúdo do pilar e ação prática */}
      <SimuladorCTA variant="pillar" contextLabel="Da teoria à prática" />

      <Footer />
    </main>
  );
}
