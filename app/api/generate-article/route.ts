import { NextResponse } from "next/server";
import { researchTopic } from "@/lib/pipeline/research";
import { writeArticle } from "@/lib/pipeline/writer";
import { generateCoverImage } from "@/lib/pipeline/image-gen";
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

    // 3. Imagem (não bloqueia o pipeline se falhar)
    let imageBuffer: Buffer | null = null;
    try {
      const img = await generateCoverImage(article.title, pillarSlug);
      imageBuffer = img.buffer;
    } catch (imgErr) {
      console.error("[pipeline] imagem falhou:", imgErr);
    }

    // 4. Publicação como rascunho
    const result = await publishDraft(article, imageBuffer);

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
