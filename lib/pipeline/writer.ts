import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
import type { ResearchResult } from "./research";

export interface ArticleSection {
  type: "paragraph" | "h2" | "h3" | "pullquote" | "dataPoint";
  text?: string;
  quote?: string;
  value?: string;
  label?: string;
  source?: string;
}

export interface GeneratedArticle {
  title: string;
  subtitle: string;
  excerpt: string;
  readingTime: number;
  seoKeyword: string;
  metaDescription: string;
  pillarSlug: string;
  sections: ArticleSection[];
  visualConcept: string;
  secondaryVisualConcept: string;
}

const PILLAR_CONTEXT: Record<string, string> = {
  diagnostico: "expor o problema da dependência de mídia paga no varejo premium — custos crescentes, CAC inflacionado, jaula fiscal dos anúncios",
  categoria: "definir e explicar a categoria Cliente Mídia™ — o modelo onde clientes são canais ativos de distribuição orgânica",
  pesquisa: "apresentar dados, benchmarks e pesquisas que validam o modelo Cliente Mídia™ frente à mídia paga",
  movimento: "mostrar o futuro do varejo premium, tendências e por que 2026-2027 é o momento de adotar o modelo",
  metodo: "ensinar como implementar o modelo Cliente Mídia™ na prática — etapas, ferramentas, erros comuns",
};

const PILLAR_KEYWORDS: Record<string, string[]> = {
  diagnostico: ["custo tráfego pago varejo", "dependência meta ads boutique", "CAC varejo moda premium"],
  categoria: ["cliente mídia varejo premium", "distribuição orgânica loja moda", "cliente como canal de marketing"],
  pesquisa: ["dados marketing orgânico varejo", "benchmarks cliente mídia", "ROI boca a boca digital"],
  movimento: ["futuro varejo premium brasil", "tendências moda premium 2027", "infraestrutura mídia própria loja"],
  metodo: ["como implementar cliente mídia", "programa clientes embaixadores loja", "método distribuição orgânica varejo"],
};

function buildPrompt(pillarSlug: string, research: ResearchResult[]): string {
  const context = PILLAR_CONTEXT[pillarSlug] ?? PILLAR_CONTEXT.diagnostico;
  const keywords = PILLAR_KEYWORDS[pillarSlug] ?? [];

  const researchText = research
    .flatMap((r) => r.results.map((item) => `- ${item.title}: ${item.content.slice(0, 300)}`))
    .slice(0, 8)
    .join("\n");

  return `Você é o editor-chefe do portal clientemidia.com.br — autoridade editorial sobre a categoria Cliente Mídia™ no varejo premium brasileiro.

MISSÃO DO PORTAL:
Educar donos e donas de lojas de moda premium — boutiques femininas, masculinas e mistas — sobre como transformar seus próprios clientes em canais orgânicos de distribuição da marca. O portal funciona como funil de consciência: o leitor nunca deve se sentir vendido — ele deve chegar à conclusão de que o modelo Cliente Mídia™ é a resposta lógica ao problema dele.

PÚBLICO DO VAREJO PREMIUM BRASILEIRO:
O modelo Cliente Mídia™ serve tanto lojas femininas quanto masculinas. Ao criar exemplos e cenários, inclua naturalmente os dois públicos — a compradora de moda feminina E o comprador de moda masculina, a lojista E o lojista. Use linguagem inclusiva: "clientes" (plural neutro), "quem compra", "o/a lojista" quando necessário. Evite exemplos exclusivamente femininos.

PILAR DESTE ARTIGO: ${pillarSlug.toUpperCase()}
OBJETIVO DO PILAR: ${context}

TOM EDITORIAL:
- Autoritário, jornalístico, nunca publicitário
- Usa dados reais com fonte citada (ex: "EmbedSocial, 2024")
- Títulos terminam com ponto final: "O fim do alcance alugado."
- Pullquotes são frases de impacto, icônicas
- DataPoints trazem números específicos com fonte
- Mínimo 1.200 palavras no corpo
- O Viralize Luxo pode ser mencionado uma vez, no final, como consequência natural

DADOS DE PESQUISA RECENTES (use quando relevante, cite a fonte):
${researchText || "Sem dados externos — baseie-se em conhecimento geral sobre varejo premium e marketing digital no Brasil."}

KEYWORDS SEO A USAR NATURALMENTE: ${keywords.join(", ")}

RETORNE APENAS UM JSON VÁLIDO com esta estrutura exata (sem markdown, sem \`\`\`json, só o objeto bruto):
{
  "title": "Título do artigo com ponto final.",
  "subtitle": "Subtítulo expandindo o tema em 1-2 frases.",
  "excerpt": "Resumo de 1-2 frases para preview e SEO (máx 200 chars).",
  "readingTime": 10,
  "seoKeyword": "keyword principal do artigo",
  "metaDescription": "Descrição SEO de 130-155 chars com CTA implícito.",
  "visualConcept": "Descrição detalhada em inglês da imagem de capa ideal para este artigo. Deve ser uma cena que comunica o conceito central do artigo só de olhar. Inclua pessoas de ambos os gêneros quando fizer sentido — boutiques femininas E masculinas fazem parte do varejo premium. Exemplos: 'A Brazilian boutique owner reviewing rising ad costs on a laptop', 'A stylish man in a premium menswear store sharing content on his phone', 'A woman and a man choosing premium fashion in an upscale boutique'. Seja específico e criativo — descreva pessoas, ambiente, ação, emoção, sem texto na imagem.",
  "secondaryVisualConcept": "Descrição detalhada em inglês de uma segunda imagem que complementa a capa, explorando um ângulo diferente do mesmo tema. Para artigos sobre dados: pode mostrar contraste entre o modelo antigo e o novo. Para artigos sobre método: pode mostrar o resultado final, a transformação.",
  "sections": [
    { "type": "paragraph", "text": "parágrafo de abertura impactante" },
    { "type": "h2", "text": "Primeiro título de seção" },
    { "type": "paragraph", "text": "..." },
    { "type": "pullquote", "quote": "Frase de impacto para destaque." },
    { "type": "dataPoint", "value": "92%", "label": "descrição do dado", "source": "Fonte · Ano" },
    { "type": "h2", "text": "..." },
    { "type": "paragraph", "text": "..." }
  ]
}

REGRAS DO JSON:
- Mínimo 20 seções (parágrafos + headings + elementos especiais)
- Máximo 2 dataPoints por artigo (apenas se tiver dado real com fonte)
- 3-4 pullquotes por artigo
- 5-7 seções H2, com H3 quando necessário
- Parágrafos ricos, entre 60-150 palavras cada
- Não invente dados sem fonte — prefira argumentos qualitativos
- visualConcept e secondaryVisualConcept: OBRIGATÓRIOS, em inglês, detalhados, criativos e específicos ao conteúdo do artigo`;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 80)
    .replace(/-$/, "");
}

export async function writeArticle(
  pillarSlug: string,
  research: ResearchResult[]
): Promise<GeneratedArticle & { slug: string }> {
  const prompt = buildPrompt(pillarSlug, research);

  const { text } = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt,
    maxOutputTokens: 8000,
  });

  // Extrai JSON mesmo que haja texto ao redor
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Gemini não retornou JSON válido");

  const parsed = JSON.parse(jsonMatch[0]) as GeneratedArticle;

  return {
    ...parsed,
    pillarSlug,
    slug: slugify(parsed.title),
  };
}
