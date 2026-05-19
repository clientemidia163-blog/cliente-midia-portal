import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { fal } from "@fal-ai/client";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const maxDuration = 60;

const CRON_SECRET = process.env.CRON_SECRET ?? "cm-cron-7z9dus8m-2026";

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "raw" as const,
});

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

// ─── Pillar context for prompts ────────────────────────────────────────────────

const PILLAR_CONTEXT: Record<string, string> = {
  diagnostico:
    "expor o problema da dependência de mídia paga no varejo premium — custos crescentes, CAC inflacionado, jaula fiscal dos anúncios",
  categoria:
    "definir e explicar a categoria Cliente Mídia™ — o modelo onde clientes são canais ativos de distribuição orgânica",
  pesquisa:
    "apresentar dados, benchmarks e pesquisas que validam o modelo Cliente Mídia™ frente à mídia paga",
  movimento:
    "mostrar o futuro do varejo premium, tendências e por que 2026-2027 é o momento de adotar o modelo",
  metodo:
    "ensinar como implementar o modelo Cliente Mídia™ na prática — etapas, ferramentas, erros comuns",
};

const STYLE_SUFFIX = `
Style: high-end editorial photography, photorealistic, natural lighting, magazine quality. Brazilian premium retail context.
Composition: 16:9 landscape, professional framing, depth of field.
Restrictions: no text overlay, no logos, no watermarks, no cheesy stock photo look.`;

// ─── Helpers ───────────────────────────────────────────────────────────────────

function rkey() {
  return Math.random().toString(36).slice(2, 10);
}

function blocksToText(blocks: any[]): string {
  return (blocks || [])
    .map((b: any) => {
      if (b._type === "pullquote") return `[PULLQUOTE] "${b.quote ?? ""}"`;
      if (b._type === "dataPoint")
        return `[DADO] ${b.value ?? ""}: ${b.label ?? ""} (${b.source ?? ""})`;
      if (b._type === "block") {
        const text = (b.children || []).map((c: any) => c.text ?? "").join("");
        if (b.style === "h2") return `## ${text}`;
        if (b.style === "h3") return `### ${text}`;
        return text;
      }
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}

function sectionsToBlocks(sections: any[]) {
  return sections.map((s: any) => {
    if (s.type === "pullquote") {
      return { _type: "pullquote", _key: rkey(), quote: s.quote ?? "" };
    }
    if (s.type === "dataPoint") {
      return {
        _type: "dataPoint",
        _key: rkey(),
        value: s.value ?? "",
        label: s.label ?? "",
        source: s.source,
      };
    }
    const styleMap: Record<string, string> = { paragraph: "normal", h2: "h2", h3: "h3" };
    return {
      _type: "block",
      _key: rkey(),
      style: styleMap[s.type] ?? "normal",
      children: [{ _type: "span", _key: rkey(), text: s.text ?? "", marks: [] }],
      markDefs: [],
    };
  });
}

// ─── Groq: expand thin article ────────────────────────────────────────────────

async function expandArticle(article: {
  title: string;
  subtitle: string;
  excerpt: string;
  pillarSlug: string;
  existingText: string;
}): Promise<{ sections: any[]; visualConcept: string; secondaryVisualConcept: string }> {
  const context = PILLAR_CONTEXT[article.pillarSlug] ?? PILLAR_CONTEXT.diagnostico;

  const prompt = `Você é o editor-chefe do portal clientemidia.com.br — autoridade editorial sobre a categoria Cliente Mídia™ no varejo premium brasileiro.

ARTIGO A EXPANDIR:
Título: ${article.title}
Subtítulo: ${article.subtitle}
Resumo: ${article.excerpt}
Pilar: ${article.pillarSlug.toUpperCase()} — ${context}

CONTEÚDO ATUAL (preservar e aprofundar):
${article.existingText || "(sem conteúdo ainda)"}

TAREFA: Expanda este artigo para ter pelo menos 20 seções ricas. Preserve o título e a linha editorial. Adicione profundidade, exemplos concretos do varejo premium brasileiro, dados com fontes reais e pullquotes de impacto.

TOM: autoritário, jornalístico, nunca publicitário. Mínimo 1.200 palavras no corpo.

RETORNE APENAS UM JSON VÁLIDO (sem markdown, sem \`\`\`):
{
  "visualConcept": "descrição detalhada em inglês da cena ideal para a capa deste artigo — pessoas reais do varejo premium em situação que comunica o tema só de olhar",
  "secondaryVisualConcept": "descrição em inglês de imagem complementar, ângulo diferente do mesmo tema",
  "sections": [
    { "type": "paragraph", "text": "..." },
    { "type": "h2", "text": "..." },
    { "type": "h3", "text": "..." },
    { "type": "pullquote", "quote": "..." },
    { "type": "dataPoint", "value": "...", "label": "...", "source": "..." }
  ]
}

REGRAS: mínimo 20 seções, 3-4 pullquotes, 5-7 headings H2, máximo 2 dataPoints com fontes reais, parágrafos de 60-150 palavras.`;

  const { text } = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt,
    maxOutputTokens: 8000,
  });

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Groq não retornou JSON válido");

  const parsed = JSON.parse(match[0]);
  return {
    sections: parsed.sections ?? [],
    visualConcept: parsed.visualConcept ?? "",
    secondaryVisualConcept: parsed.secondaryVisualConcept ?? "",
  };
}

// ─── Groq: generate visual concept only (for complete articles) ───────────────

async function generateVisualConcept(
  title: string,
  excerpt: string,
  pillarSlug: string
): Promise<{ visualConcept: string; secondaryVisualConcept: string }> {
  const context = PILLAR_CONTEXT[pillarSlug] ?? PILLAR_CONTEXT.diagnostico;

  const prompt = `Você é um diretor criativo de editorial de moda premium brasileira.

Para o artigo abaixo, crie dois conceitos visuais detalhados para as imagens de capa:

Título: ${title}
Resumo: ${excerpt}
Contexto: ${context}

RETORNE APENAS UM JSON VÁLIDO:
{
  "visualConcept": "descrição detalhada em inglês da cena ideal para capa — pessoas reais do varejo premium em situação que comunica o tema só de olhar. Específico, cinematográfico, sem texto na imagem",
  "secondaryVisualConcept": "descrição em inglês de cena complementar, ângulo diferente do mesmo tema"
}`;

  const { text } = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt,
    maxOutputTokens: 800,
  });

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    return {
      visualConcept: `Brazilian luxury boutique scene illustrating: ${title}`,
      secondaryVisualConcept: `Premium retail moment in Brazil related to: ${excerpt}`,
    };
  }

  const parsed = JSON.parse(match[0]);
  return {
    visualConcept: parsed.visualConcept ?? `Brazilian luxury boutique scene: ${title}`,
    secondaryVisualConcept: parsed.secondaryVisualConcept ?? "",
  };
}

// ─── Fal.ai: generate image ────────────────────────────────────────────────────

async function generateImage(visualConcept: string): Promise<Buffer | null> {
  try {
    const result = await fal.subscribe("fal-ai/flux/dev", {
      input: {
        prompt: `${visualConcept}${STYLE_SUFFIX}`,
        image_size: "landscape_16_9",
        num_inference_steps: 25,
        num_images: 1,
        enable_safety_checker: true,
      },
    });

    const imageUrl = (result.data as any).images?.[0]?.url;
    if (!imageUrl) return null;

    const response = await fetch(imageUrl);
    if (!response.ok) return null;

    return Buffer.from(await response.arrayBuffer());
  } catch {
    return null;
  }
}

// ─── Sanity: upload image ──────────────────────────────────────────────────────

async function uploadImage(buffer: Buffer, filename: string): Promise<string | null> {
  try {
    const asset = await writeClient.assets.upload("image", buffer, {
      filename,
      contentType: "image/jpeg",
    });
    return asset._id;
  } catch {
    return null;
  }
}

// ─── Sanity: publish draft ─────────────────────────────────────────────────────

async function publishDraft(
  draft: any,
  newBody: object[] | null,
  heroAssetId: string | null
): Promise<void> {
  const slug = draft.slug ?? draft._id.replace(/^drafts\.article\./, "").replace(/-\d{13}$/, "");
  const publishedId = `article.${slug}`;

  const heroImage = heroAssetId
    ? {
        _type: "image",
        asset: { _type: "reference", _ref: heroAssetId },
        alt: draft.title,
      }
    : undefined;

  const doc: Record<string, any> = {
    _id: publishedId,
    _type: "article",
    title: draft.title,
    slug: { _type: "slug", current: slug },
    subtitle: draft.subtitle,
    excerpt: draft.excerpt,
    seoTitle: draft.seoTitle,
    readingTime: draft.readingTime,
    publishedAt: draft.publishedAt || new Date().toISOString(),
    featured: draft.featured ?? false,
    pillar: draft.pillar,
    body: newBody ?? draft.body,
  };

  if (heroImage) doc.heroImage = heroImage;
  else if (draft.heroImage) doc.heroImage = draft.heroImage;

  await writeClient.transaction().createOrReplace(doc).delete(draft._id).commit();
}

// ─── Main handler ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const key = body.key ?? req.nextUrl.searchParams.get("key");
  const auth = req.headers.get("authorization");

  if (key !== CRON_SECRET && auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const draftId: string = body.id;
  if (!draftId) {
    return NextResponse.json({ error: "id obrigatório" }, { status: 400 });
  }

  try {
    // 1. Fetch draft from Sanity
    const draft = await writeClient.fetch(
      `*[_id == $id][0] {
        _id,
        title,
        subtitle,
        excerpt,
        "slug": slug.current,
        seoTitle,
        readingTime,
        publishedAt,
        featured,
        pillar,
        heroImage,
        body
      }`,
      { id: draftId }
    );

    if (!draft) {
      return NextResponse.json({ error: "Rascunho não encontrado" }, { status: 404 });
    }

    const pillarSlug: string =
      draft.pillar?._ref?.replace("pillar.", "") ?? "categoria";

    const bodyLength = (draft.body ?? []).length;
    const isThin = bodyLength < 10;
    const hasHeroImage = !!draft.heroImage;

    let newBody: object[] | null = null;
    let visualConcept = "";
    let secondaryVisualConcept = "";

    // 2. Expand thin articles with Groq
    if (isThin) {
      const existingText = blocksToText(draft.body ?? []);
      const expanded = await expandArticle({
        title: draft.title ?? "",
        subtitle: draft.subtitle ?? "",
        excerpt: draft.excerpt ?? "",
        pillarSlug,
        existingText,
      });
      newBody = sectionsToBlocks(expanded.sections);
      visualConcept = expanded.visualConcept;
      secondaryVisualConcept = expanded.secondaryVisualConcept;
    } else {
      // 3. Generate visual concept for complete articles
      const concepts = await generateVisualConcept(
        draft.title ?? "",
        draft.excerpt ?? "",
        pillarSlug
      );
      visualConcept = concepts.visualConcept;
      secondaryVisualConcept = concepts.secondaryVisualConcept;
    }

    // 4. Generate cover image (skip if already has one)
    let heroAssetId: string | null = null;
    if (!hasHeroImage && visualConcept) {
      const imageBuffer = await generateImage(visualConcept);
      if (imageBuffer) {
        heroAssetId = await uploadImage(
          imageBuffer,
          `${draft.slug ?? draftId}-cover.jpg`
        );
      }
    }

    // 5. Publish (create published doc, delete draft)
    await publishDraft(draft, newBody, heroAssetId);

    return NextResponse.json({
      ok: true,
      slug: draft.slug,
      title: draft.title,
      expanded: isThin,
      imageGenerated: !!heroAssetId,
      url: `https://clientemidia.com.br/artigos/${draft.slug}`,
    });
  } catch (error) {
    console.error("[process-article]", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
