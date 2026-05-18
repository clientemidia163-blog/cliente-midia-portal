import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArticleCard } from "@/components/site/ArticleCard";
import { sanityClient } from "@/lib/sanity";
import { ARTICLES_RECENT } from "@/lib/queries";

export const revalidate = 60;
export const metadata = { title: "Arquivo editorial" };

export default async function ArtigosPage() {
  const articles = await sanityClient.fetch(ARTICLES_RECENT, { limit: 100 }).catch(() => []);

  return (
    <main>
      <Header />

      <section className="border-b border-line-dark px-8 py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-8 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="eyebrow">Arquivo editorial</span>
          </div>
          <h1 className="mb-6 font-serif text-5xl font-medium leading-tight tracking-tight md:text-[72px]">
            Todos os artigos.
          </h1>
          <p className="max-w-[700px] text-lg font-light leading-relaxed text-sepia">
            Catálogo completo de tudo que já foi publicado no portal Cliente Mídia™. Organizado por
            data de publicação, com filtros por pilar editorial.
          </p>
        </div>
      </section>

      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1240px]">
          {articles.length > 0 ? (
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a: any) => <ArticleCard key={a._id} article={a} />)}
            </div>
          ) : (
            <div className="border border-line-dark p-12 text-center">
              <p className="font-serif text-2xl italic text-sepia">
                O arquivo está em construção. Os primeiros artigos serão publicados em breve.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
