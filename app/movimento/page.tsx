import { sanityClient } from "@/lib/sanity";
import { ARTICLES_BY_PILLAR } from "@/lib/queries";
import { PillarPage } from "@/components/site/PillarPage";

export const revalidate = 60;
export const metadata = { title: "Movimento" };

export default async function MovimentoPage() {
  const articles = await sanityClient.fetch(ARTICLES_BY_PILLAR, {
    pillarSlug: "movimento"
  }).catch(() => []);

  return (
    <PillarPage
      numeral="iv."
      title="Movimento"
      tagline="O futuro da categoria. Predições. Entrevistas com lojistas pioneiros. A construção do novo padrão do varejo."
      longDescription="Este pilar olha pra frente. Aqui ficam os manifestos secundários, as predições, as entrevistas com as primeiras lojistas que adotaram o modelo Cliente Mídia™, e os ensaios sobre o futuro do varejo premium brasileiro."
      articles={articles}
      fallbackArticles={[
        { tag: "Em produção", title: "Por que 2027 vai ser o ano da Cliente Mídia™.", subtitle: "Predições sobre o ponto de inflexão da categoria — e quem vai estar do lado certo da curva.", meta: "Previsto · Junho 2026" },
        { tag: "Em produção", title: "A nova infraestrutura do varejo premium brasileiro.", subtitle: "O que muda quando a distribuição da marca deixa de ser comprada e passa a ser cultivada na própria base de clientes.", meta: "Previsto · Maio 2026" },
        { tag: "Em produção", title: "Cinco lojas brasileiras que já entenderam o modelo.", subtitle: "Estudos de caso reais sobre lojistas que ativaram o modelo Cliente Mídia™ antes da concorrência.", meta: "Previsto · Julho 2026" }
      ]}
    />
  );
}
