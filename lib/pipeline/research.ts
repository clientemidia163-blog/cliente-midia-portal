import { tavily } from "@tavily/core";

const client = tavily({ apiKey: process.env.TAVILY_API_KEY! });

const PILLAR_QUERIES: Record<string, string[]> = {
  diagnostico: [
    "custo meta ads brasil 2026 varejo moda premium",
    "CAC custo aquisição cliente varejo moda brasil aumento",
    "dependência tráfego pago varejo boutique brasil tendências",
  ],
  categoria: [
    "cliente embaixador marca varejo premium brasil 2026",
    "marketing boca a boca digital moda boutique brasil",
    "UGC orgânico varejo moda premium estratégia",
  ],
  pesquisa: [
    "dados comportamento consumidor moda premium brasil 2025 2026",
    "benchmarks ROI marketing orgânico vs pago varejo brasil",
    "pesquisa descoberta marca indicação redes sociais brasil",
  ],
  movimento: [
    "futuro varejo premium brasil tendências 2027",
    "infraestrutura marketing próprio boutique moda tendências",
    "inovação varejo premium experiência cliente brasil 2026",
  ],
  metodo: [
    "como implementar programa clientes embaixadores loja moda",
    "sistema indicação clientes varejo moda premium implementação",
    "gestão experiência cliente boutique luxury best practices",
  ],
};

export interface ResearchResult {
  query: string;
  results: { title: string; content: string; url: string }[];
}

export async function researchTopic(pillarSlug: string): Promise<ResearchResult[]> {
  const queries = PILLAR_QUERIES[pillarSlug] ?? PILLAR_QUERIES.diagnostico;
  const selected = queries.slice(0, 2);

  const results: ResearchResult[] = [];

  for (const query of selected) {
    try {
      const response = await client.search(query, {
        searchDepth: "advanced",
        maxResults: 4,
        includeAnswer: true,
      });

      results.push({
        query,
        results: (response.results ?? []).map((r: any) => ({
          title: r.title ?? "",
          content: r.content ?? r.snippet ?? "",
          url: r.url ?? "",
        })),
      });
    } catch {
      // continua sem essa query se falhar
    }
  }

  return results;
}
