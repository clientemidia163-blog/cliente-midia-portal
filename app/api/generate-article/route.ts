import { NextResponse } from "next/server";
import { researchTopic } from "@/lib/pipeline/research";
import { writeArticle } from "@/lib/pipeline/writer";
import { generateArticleImages } from "@/lib/pipeline/image-gen";
import { publishDraft } from "@/lib/pipeline/publisher";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const PILLARS_ROTATION = ["diagnostico", "categoria", "pesquisa", "movimento", "metodo"];

// Vercel Cron chama este endpoint — não precisa de body
export async function GET(req: Request) {
  return handle(req);
}

export async function POST(req: Request) {
  return handle(req);
}

async function handle(req: Request) {
  // Segurança: aceita chamada do Vercel Cron ou com chave manual
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  const { searchParams } = new URL(req.url);
  const manualKey = searchParams.get("key");

  const isCron = authHeader === `Bearer ${cronSecret}`;
  const isManual = manualKey === cronSecret;

  if (cronSecret && !isCron && !isManual) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Pilar pode ser forçado via query param: ?pillar=pesquisa
  const forcedPillar = searchParams.get("pillar");
  const pillarSlug = forcedPillar && PILLARS_ROTATION.includes(forcedPillar)
    ? forcedPillar
    : pickNextPillar();

  try {
    // 1. Pesquisa
    const research = await researchTopic(pillarSlug);

    // 2. Redação
    const article = await writeArticle(pillarSlug, research);

    // 3. Imagens baseadas no conteúdo do artigo
    const keyThemes = article.sections
      .filter((s) => s.type === "h2")
      .map((s) => s.text ?? "")
      .filter(Boolean);

    let heroBuffer: Buffer | null = null;
    let secondaryBuffer: Buffer | null = null;
    try {
      const imgs = await generateArticleImages(
        article.title,
        pillarSlug,
        article.excerpt,
        keyThemes,
        article.sections.length
      );
      heroBuffer = imgs.hero.buffer;
      secondaryBuffer = imgs.secondary?.buffer ?? null;
    } catch (imgErr) {
      console.error("[pipeline] imagem falhou:", imgErr);
    }

    // 4. Publicação como rascunho
    const result = await publishDraft(article, heroBuffer, secondaryBuffer);

    return NextResponse.json({
      ok: true,
      pillar: pillarSlug,
      title: result.title,
      slug: result.slug,
      draftId: result.draftId,
      studioUrl: result.studioUrl,
    });
  } catch (err: any) {
    console.error("[pipeline] erro:", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Erro desconhecido" },
      { status: 500 }
    );
  }
}

function pickNextPillar(): string {
  // Rotação simples baseada no dia da semana
  const dayOfWeek = new Date().getDay(); // 0=dom, 1=seg...
  return PILLARS_ROTATION[dayOfWeek % PILLARS_ROTATION.length];
}
