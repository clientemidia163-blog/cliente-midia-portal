import { sanityClient } from "@/lib/sanity";
import { ARTICLES_BY_PILLAR } from "@/lib/queries";
import { PillarPage } from "@/components/site/PillarPage";

export const revalidate = 60;
export const metadata = { title: "Categoria" };

export default async function CategoriaPage() {
  const articles = await sanityClient.fetch(ARTICLES_BY_PILLAR, {
    pillarSlug: "categoria"
  }).catch(() => []);

  return (
    <PillarPage
      numeral="ii."
      title="Categoria"
      tagline="O que é Cliente Mídia™. As diferenças entre UGC, influencer e Cliente Mídia. Os pilares da distribuição orgânica."
      longDescription="Este pilar documenta a categoria propriamente dita: definições, distinções, glossário, marcos conceituais. É a referência canônica para quem precisa entender — ou citar — o modelo Cliente Mídia™."
      articles={articles}
      fallbackArticles={[
        { tag: "Em produção", title: "Cliente Mídia™ — a definição oficial.", subtitle: "A nomenclatura, a infraestrutura e os limites da categoria que está sendo construída no varejo premium brasileiro.", meta: "Previsto · Maio 2026" },
        { tag: "Em produção", title: "UGC, influencer ou Cliente Mídia? As três distinções que ninguém faz.", subtitle: "Por que esses três modelos foram confundidos durante uma década — e por que essa confusão custou bilhões.", meta: "Previsto · Maio 2026" },
        { tag: "Em produção", title: "Os quatro pilares da distribuição orgânica.", subtitle: "Experiência, transformação, distribuição, reciprocidade — a anatomia operacional do modelo.", meta: "Previsto · Junho 2026" },
        { tag: "Em produção", title: "Glossário Cliente Mídia™.", subtitle: "Os termos que vão dominar o vocabulário do varejo premium brasileiro nos próximos 36 meses.", meta: "Previsto · Junho 2026" }
      ]}
    />
  );
}
