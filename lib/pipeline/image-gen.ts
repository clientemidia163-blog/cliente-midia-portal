import { fal } from "@fal-ai/client";

const STYLE_SUFFIX = `
Style: high-end editorial photography, photorealistic, natural lighting, magazine quality. Brazilian premium retail context.
Composition: 16:9 landscape, professional framing, depth of field.
Restrictions: no text overlay, no logos, no watermarks, no cheesy stock photo look.`;

async function buildAndGenerate(visualConcept: string): Promise<{ url: string; buffer: Buffer }> {
  const prompt = `${visualConcept}${STYLE_SUFFIX}`;

  const result = await fal.subscribe("fal-ai/flux-pro/v1.1", {
    input: {
      prompt,
      image_size: "landscape_16_9",
      num_images: 1,
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
    "Brazilian luxury boutique owner — a focused man or woman — reviewing rising ad costs on a laptop, Meta Ads dashboard with red numbers, dark premium store environment, cinematic lighting",
  categoria:
    "A stylish Brazilian shopper in a premium boutique — could be a woman in a dress boutique or a man in a menswear store — smiling at their smartphone while a golden network of glowing connections spreads from the phone to multiple people around them, warm cinematic atmosphere",
  pesquisa:
    "A boutique owner in a luxury retail setting reviewing a chart showing organic reach outperforming paid ads, clean desk with gold and dark aesthetic, confident expression, gender-neutral professional environment",
  movimento:
    "Modern Brazilian luxury retail store — a well-dressed owner, man or woman — confidently looking toward the horizon through large display windows filled with premium fashion, golden light, forward-looking atmosphere",
  metodo:
    "A premium retail consultant presenting a structured framework to a boutique owner at a sleek table, both could be male or female, elegant boardroom with dark wood and gold accents, collaborative and focused mood",
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
