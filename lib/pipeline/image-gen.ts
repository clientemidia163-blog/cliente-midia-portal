import { fal } from "@fal-ai/client";

const STYLE_SUFFIX = `
Color palette: deep black (#0B0B0B) dominant background, warm gold (#C9A35A) accent lighting, cream and sepia highlights.
Style: luxury premium editorial photography, cinematic quality, Brazilian premium retail aesthetic, magazine campaign.
Lighting: dramatic, warm, directional — gold rim lighting on subjects.
Format: 16:9 landscape, cinematic composition.
Restrictions: no text overlay, no logos, no watermarks, no stock photo look.`;

async function buildAndGenerate(visualConcept: string): Promise<{ url: string; buffer: Buffer }> {
  const prompt = `${visualConcept}${STYLE_SUFFIX}`;

  const result = await fal.subscribe("fal-ai/flux/dev", {
    input: {
      prompt,
      image_size: "landscape_16_9",
      num_inference_steps: 25,
      num_images: 1,
      enable_safety_checker: true,
    },
  });

  const imageUrl = (result.data as any).images?.[0]?.url;
  if (!imageUrl) throw new Error("Fal.ai não retornou URL de imagem");

  const response = await fetch(imageUrl);
  if (!response.ok) throw new Error(`Falha ao baixar imagem: ${response.status}`);

  const buffer = Buffer.from(await response.arrayBuffer());
  return { url: imageUrl, buffer };
}

// Fallback para chamadas legadas sem visualConcept
const PILLAR_FALLBACK: Record<string, string> = {
  diagnostico:
    "Brazilian luxury boutique owner looking worried at a laptop showing rising ad costs, Meta Ads dashboard with red numbers, dark premium office atmosphere",
  categoria:
    "Elegant Brazilian woman in a luxury boutique sharing a photo on her smartphone, golden network of glowing connections spreading from her phone to multiple follower icons around her, warm dark background",
  pesquisa:
    "Data analyst in a luxury setting reviewing charts that show organic reach outperforming paid ads, graphs with gold and black aesthetic, premium office environment",
  movimento:
    "Modern Brazilian luxury retail store, stylish owner confidently looking toward the horizon, golden light streaming through large windows, forward-looking atmosphere",
  metodo:
    "Premium retail consultant showing a structured step-by-step framework on a sleek presentation to a boutique owner, elegant boardroom, gold and black aesthetic",
};

export async function generateCoverImage(
  title: string,
  pillarSlug: string,
  excerpt: string = "",
  keyThemes: string[] = [],
  visualConcept?: string
): Promise<{ url: string; buffer: Buffer }> {
  const concept = visualConcept || PILLAR_FALLBACK[pillarSlug] || PILLAR_FALLBACK.categoria;
  return buildAndGenerate(concept);
}

export async function generateArticleImages(
  title: string,
  pillarSlug: string,
  excerpt: string,
  keyThemes: string[],
  sectionCount: number,
  visualConcept?: string,
  secondaryVisualConcept?: string
): Promise<{ hero: { url: string; buffer: Buffer }; secondary: { url: string; buffer: Buffer } | null }> {
  const heroConcept = visualConcept || PILLAR_FALLBACK[pillarSlug] || PILLAR_FALLBACK.categoria;
  const isLong = sectionCount > 18;

  if (isLong && secondaryVisualConcept) {
    const [hero, secondary] = await Promise.all([
      buildAndGenerate(heroConcept),
      buildAndGenerate(secondaryVisualConcept),
    ]);
    return { hero, secondary };
  }

  const hero = await buildAndGenerate(heroConcept);
  return { hero, secondary: null };
}
