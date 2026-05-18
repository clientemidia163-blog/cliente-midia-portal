import { sanityClient } from "@/lib/sanity";
import { ARTICLES_BY_PILLAR } from "@/lib/queries";
import { PillarPage } from "@/components/site/PillarPage";

export const revalidate = 60;
export const metadata = { title: "Método — Cliente Mídia™" };

export default async function MetodoPage() {
  const articles = await sanityClient
    .fetch(ARTICLES_BY_PILLAR, { pillarSlug: "metodo" })
    .catch(() => []);

  return (
    <PillarPage
      numeral="v."
      title="Método"
      tagline="Como implementar o modelo Cliente Mídia™. Etapas, ferramentas, rituais e os erros mais comuns de quem começa errado."
      longDescription="Este pilar é o manual de campo da categoria. Enquanto os outros pilares explicam o problema, definem a solução e apresentam a evidência, o Método mostra o caminho. Etapa por etapa, decisão por decisão — o que fazer na primeira semana, no primeiro mês e no primeiro ano de implantação do modelo Cliente Mídia™ no seu varejo."
      articles={articles}
      fallbackArticles={[
        {
          tag: "Em produção",
          title: "O primeiro passo antes de qualquer ferramenta.",
          subtitle: "Por que a maioria das lojas falha na implementação antes mesmo de começar — e o diagnóstico interno que muda tudo.",
          meta: "Previsto · Junho 2026"
        },
        {
          tag: "Em produção",
          title: "As três estruturas que toda loja precisa antes de ativar o modelo.",
          subtitle: "Base de dados, cadência de contato e critério de seleção — os alicerces operacionais do Cliente Mídia™.",
          meta: "Previsto · Junho 2026"
        },
        {
          tag: "Em produção",
          title: "Qual cliente ativar primeiro — e por que a resposta surpreende.",
          subtitle: "A segmentação inicial não é sobre quem mais compra. É sobre quem mais fala. Como identificar suas primeiras Clientes Mídia.",
          meta: "Previsto · Julho 2026"
        },
        {
          tag: "Em produção",
          title: "Os cinco erros de quem começa o modelo sem fundação.",
          subtitle: "Ativar sem critério, pular etapas, confundir com programa de fidelidade — os erros mais comuns e como evitá-los.",
          meta: "Previsto · Julho 2026"
        }
      ]}
    />
  );
}
