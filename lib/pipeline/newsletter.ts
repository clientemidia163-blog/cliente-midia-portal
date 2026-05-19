import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { researchTopic } from "./research";

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

export interface NewsletterContent {
  semana: string;
  dado: {
    numero: string;
    contexto: string;
    impacto: string;
  };
  insight: {
    titulo: string;
    texto: string;
  };
  pergunta: string;
  linkArtigo?: string;
}

function getSemana(): string {
  const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  const now = new Date();
  const semanaDoMes = Math.ceil(now.getDate() / 7);
  return `Semana ${semanaDoMes} · ${meses[now.getMonth()]} ${now.getFullYear()}`;
}

export async function generateNewsletter(): Promise<NewsletterContent> {
  // Pesquisa rápida de contexto — usa pilar diagnóstico como base
  let researchContext = "";
  try {
    const research = await researchTopic("diagnostico");
    researchContext = research
      .flatMap((r) => r.results.map((item) => `- ${item.title}: ${item.content.slice(0, 200)}`))
      .slice(0, 5)
      .join("\n");
  } catch {
    // sem pesquisa — Groq gera com conhecimento próprio
  }

  const prompt = `Você é o editor da newsletter "Inteligência Cliente Mídia™" — publicação semanal para donos de lojas de moda premium brasileiras.

FORMATO DA NEWSLETTER: 3 elementos semanais
1. UM DADO — número concreto e impactante sobre varejo, marketing digital ou comportamento do consumidor premium no Brasil
2. UM INSIGHT — análise estratégica de 2-3 parágrafos conectada ao dado, sempre com ângulo do modelo Cliente Mídia™
3. UMA PERGUNTA — provocação reflexiva personalíssima para o leitor sobre a sua própria loja

TOM: direto, inteligente, nunca genérico. O leitor é um lojista ou lojista de moda premium — boutiques femininas, masculinas ou mistas. Cada palavra precisa valer.

CONTEXTO DE PESQUISA RECENTE (use se relevante):
${researchContext || "Sem dados externos desta semana — use conhecimento geral sobre varejo premium BR 2026."}

RETORNE APENAS JSON VÁLIDO (sem markdown, sem \`\`\`json):
{
  "dado": {
    "numero": "número ou percentual impactante (ex: 92% ou R$ 8,68 bi)",
    "contexto": "frase curta explicando o dado com fonte (ex: 'dos consumidores confiam mais em pessoas reais do que em anúncios · EmbedSocial 2024')",
    "impacto": "1 frase sobre o que esse dado significa para uma loja de moda premium brasileira"
  },
  "insight": {
    "titulo": "Título do insight em forma de afirmação ou descoberta",
    "texto": "2-3 parágrafos ricos, com argumento construído. Conecta o dado da semana ao modelo Cliente Mídia™. Tom jornalístico, nunca publicitário. Máx 250 palavras."
  },
  "pergunta": "Pergunta reflexiva, específica e pessoal. Deve fazer o leitor pensar sobre sua própria loja. Não pode ser genérica. Ex: 'Se você desligasse todos os seus anúncios amanhã, quantas clientes novas chegaria por indicação no mês que vem?' Máx 2 frases."
}`;

  const { text } = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt,
    maxOutputTokens: 2000,
  });

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Groq não retornou JSON válido para newsletter");

  const parsed = JSON.parse(jsonMatch[0]);

  return {
    semana: getSemana(),
    dado: parsed.dado,
    insight: parsed.insight,
    pergunta: parsed.pergunta,
  };
}
