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
  perspective: "published" as const,
});

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

const STYLE_SUFFIX = `
Style: high-end editorial photography, photorealistic, natural lighting, magazine quality. Brazilian premium retail context.
Composition: 16:9 landscape, professional framing, depth of field.
Restrictions: no text overlay, no logos, no watermarks, no cheesy stock photo look.`;

// ─── Extrai texto completo do artigo ─────────────────────────────────────────

function blocksToFullText(blocks: any[]): string {
  return (blocks || [])
    .map((b: any) => {
      if (b._type === "pullquote") return `"${b.quote ?? ""}"`;
      if (b._type === "dataPoint") return `${b.value ?? ""}: ${b.label ?? ""}`;
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

// ─── Groq: lê o artigo inteiro e cria o melhor conceito visual ───────────────

async function deriveVisualConcept(article: {
  title: string;
  subtitle: string;
  excerpt: string;
  pillarSlug: string;
  fullText: string;
}): Promise<{ visualConcept: string }> {
  const prompt = `Você é um diretor criativo especializado em moda premium brasileira e design editorial.

Leia o artigo completo abaixo e crie o conceito visual mais preciso e impactante possível para a imagem de capa. A imagem deve comunicar o TEMA CENTRAL do artigo só de olhar — sem texto, sem logos, sem elementos gráficos.

ARTIGO COMPLETO:
Título: ${article.title}
Subtítulo: ${article.subtitle}
${article.fullText}

REGRAS PARA O CONCEITO VISUAL:
- Baseado no conteúdo real do artigo, não em generalidades
- Descreva uma cena concreta: quem está na cena, o que está fazendo, onde está, qual emoção transmite
- Pode ter pessoas reais em situações do varejo premium brasileiro — INCLUA AMBOS OS GÊNEROS: boutiques femininas (mulheres comprando moda) e masculinas (homens comprando ternos, camisas, etc.) fazem parte do modelo Cliente Mídia™
- Deve capturar o CONFLITO ou TRANSFORMAÇÃO central do artigo (ex: dependência vs liberdade, custo vs resultado, antigo vs novo modelo)
- Cinematográfico, editorial, fotorrealista
- Sem texto, logos ou elementos genéricos de stock photo

RETORNE APENAS UM JSON VÁLIDO:
{
  "visualConcept": "descrição detalhada em inglês da cena ideal para a capa deste artigo específico — mínimo 3 frases descrevendo pessoas, ação, ambiente, luz e emoção"
}`;

  const { text } = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt,
    maxOutputTokens: 600,
  });

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    return {
      visualConcept: `Brazilian luxury boutique scene illustrating the theme: ${article.title}. Premium retail context, cinematic lighting, photorealistic.`,
    };
  }

  const parsed = JSON.parse(match[0]);
  return { visualConcept: parsed.visualConcept ?? `Scene for: ${article.title}` };
}

// ─── Fal.ai: gera imagem ──────────────────────────────────────────────────────

async function generateImage(visualConcept: string): Promise<Buffer | null> {
  try {
    const result = await fal.subscribe("fal-ai/flux-pro/v1.1", {
      input: {
        prompt: `${visualConcept}${STYLE_SUFFIX}`,
        image_size: "landscape_16_9",
        num_images: 1,
      },
    });

    const imageUrl = (result.data as any).images?.[0]?.url;
    if (!imageUrl) return null;

    const res = await fetch(imageUrl);
    if (!res.ok) return null;

    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const key = body.key ?? req.nextUrl.searchParams.get("key");
  const auth = req.headers.get("authorization");

  if (key !== CRON_SECRET && auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug: string = body.slug;
  if (!slug) {
    return NextResponse.json({ error: "slug obrigatório" }, { status: 400 });
  }

  try {
    // 1. Busca o artigo publicado completo (título + corpo inteiro)
    const article = await writeClient.fetch(
      `*[_type == "article" && slug.current == $slug][0] {
        _id,
        title,
        subtitle,
        excerpt,
        "slug": slug.current,
        "pillarSlug": pillar->slug.current,
        body
      }`,
      { slug }
    );

    if (!article) {
      return NextResponse.json({ error: "Artigo não encontrado" }, { status: 404 });
    }

    // 2. Extrai o texto completo do artigo
    const fullText = blocksToFullText(article.body ?? []);

    // 3. Groq lê o artigo completo e gera o conceito visual ideal
    const { visualConcept } = await deriveVisualConcept({
      title: article.title ?? "",
      subtitle: article.subtitle ?? "",
      excerpt: article.excerpt ?? "",
      pillarSlug: article.pillarSlug ?? "categoria",
      fullText,
    });

    // 4. Gera a imagem com Fal.ai
    const imageBuffer = await generateImage(visualConcept);
    if (!imageBuffer) {
      return NextResponse.json({ error: "Fal.ai não retornou imagem" }, { status: 502 });
    }

    // 5. Faz upload do asset no Sanity
    const asset = await writeClient.assets.upload("image", imageBuffer, {
      filename: `${slug}-cover-${Date.now()}.jpg`,
      contentType: "image/jpeg",
    });

    // 6. Atualiza o heroImage no artigo publicado
    await writeClient
      .patch(article._id)
      .set({
        heroImage: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
          alt: article.title,
        },
      })
      .commit();

    return NextResponse.json({
      ok: true,
      slug,
      title: article.title,
      visualConcept,
      assetId: asset._id,
    });
  } catch (error) {
    console.error("[regenerate-image]", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
