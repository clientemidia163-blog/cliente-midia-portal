import { sanityClient } from "@/lib/sanity";
import { ARTICLES_BY_PILLAR } from "@/lib/queries";
import { PillarPage } from "@/components/site/PillarPage";

export const revalidate = 60;
export const metadata = { title: "Pesquisa" };

export default async function PesquisaPage() {
  const articles = await sanityClient.fetch(ARTICLES_BY_PILLAR, {
    pillarSlug: "pesquisa"
  }).catch(() => []);

  return (
    <PillarPage
      numeral="iii."
      title="Pesquisa"
      tagline="Relatórios, benchmarks, estudos de caso, dados primários do varejo premium brasileiro em 2026."
      longDescription="Este pilar concentra a evidência empírica que sustenta a categoria — desde dados públicos curados até pesquisa primária inédita conduzida com lojistas, gestoras e consumidoras do varejo premium."
      articles={articles}
      fallbackArticles={[
        { tag: "Em produção", title: "Relatório Cliente Mídia™ 2026.", subtitle: "Setenta e duas páginas de pesquisa primária e análise estratégica. Distribuição restrita.", meta: "Previsto · Junho 2026" },
        { tag: "Em produção", title: "Por que sua melhor cliente nunca foi seu anúncio.", subtitle: "O boca a boca digital responde por 33% das descobertas de marca. Os anúncios? Custam 11 vezes mais por conversão.", meta: "Previsto · Maio 2026" },
        { tag: "Em produção", title: "Benchmark: ROI orgânico vs ROI pago no varejo premium.", subtitle: "Comparativo conduzido com 50 lojistas premium brasileiras ao longo de 90 dias.", meta: "Previsto · Julho 2026" }
      ]}
    />
  );
}
