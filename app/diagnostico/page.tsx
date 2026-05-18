import { sanityClient } from "@/lib/sanity";
import { ARTICLES_BY_PILLAR } from "@/lib/queries";
import { PillarPage } from "@/components/site/PillarPage";

export const revalidate = 60;
export const metadata = { title: "Diagnóstico" };

export default async function DiagnosticoPage() {
  const articles = await sanityClient.fetch(ARTICLES_BY_PILLAR, {
    pillarSlug: "diagnostico"
  }).catch(() => []);

  return (
    <PillarPage
      numeral="i."
      title="Diagnóstico"
      tagline="O problema do alcance alugado. O custo real do CAC. A jaula fiscal do Instagram. Por que o modelo antigo está rachando."
      longDescription="Este pilar reúne as análises estruturais sobre a crise do modelo de aquisição baseado em mídia paga — e por que ela é mais profunda do que o aumento de 12,15% no custo dos Meta Ads em 2026."
      articles={articles}
      fallbackArticles={[
        { tag: "Em produção", title: "O verdadeiro custo do CAC no varejo de moda em 2026.", subtitle: "Análise das margens, da inflação dos leilões e do que cada nova cliente realmente custa hoje no Brasil.", meta: "Previsto · Maio 2026" },
        { tag: "Em produção", title: "A jaula fiscal do Instagram.", subtitle: "Como o repasse de PIS/COFINS e ISS transformou a publicidade digital em um novo patamar permanente de custos.", meta: "Previsto · Maio 2026" },
        { tag: "Em produção", title: "Anatomia de uma loja que parou de anunciar.", subtitle: "Estudo de caso sobre o que acontece com uma marca de moda premium quando ela desliga os ads.", meta: "Previsto · Junho 2026" },
        { tag: "Em produção", title: "O fim do alcance alugado.", subtitle: "Por que o varejo premium brasileiro precisa parar de alugar atenção e começar a construir presença.", meta: "Previsto · Maio 2026" }
      ]}
    />
  );
}
