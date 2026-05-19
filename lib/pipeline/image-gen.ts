import { fal } from "@fal-ai/client";

const PILLAR_MOOD: Record<string, string> = {
  diagnostico:
    "tension, fragility, economic pressure — cracked structures, dim red warning light on black, expensive machinery breaking down, chains or debt symbolism",
  categoria:
    "transformation, emergence, paradigm shift — golden light cutting through darkness, flowing organic forms, elegant metamorphosis from shadow to gold",
  pesquisa:
    "data, precision, evidence — geometric grids, analytical patterns, structured information layers, microscopic detail at macro scale, scientific beauty",
  movimento:
    "momentum, future, forward motion — golden horizon over luxury cityscape, architectural scale, motion blur suggesting speed, optimistic yet premium",
  metodo:
    "structure, mastery, systematic elegance — architectural blueprints, precision layers, craftsmanship tools, orderly frameworks, expertise made visible",
};

interface ImageParams {
  title: string;
  pillarSlug: string;
  excerpt: string;
  keyThemes: string[];
  imageIndex?: number;
}

async function buildAndGenerate(params: ImageParams): Promise<{ url: string; buffer: Buffer }> {
  const { title, pillarSlug, excerpt, keyThemes, imageIndex = 0 } = params;
  const mood = PILLAR_MOOD[pillarSlug] ?? PILLAR_MOOD.categoria;

  const themes =
    imageIndex === 0
      ? keyThemes.slice(0, 4).join(" · ")
      : keyThemes.slice(4).join(" · ") || keyThemes.slice(0, 4).join(" · ");

  const role =
    imageIndex === 0
      ? "Hero cover image — striking, impactful, sets the tone for the entire article."
      : "Secondary editorial illustration — complements the opening image, explores a different dimension of the same concept.";

  const prompt = `Premium editorial photograph for a long-form article.

Article concept: "${excerpt.substring(0, 180)}".
Visual themes to represent: ${themes || title.substring(0, 100)}.
Atmospheric mood: ${mood}.
${role}

Color palette: deep black (#0B0B0B) dominant background, warm gold (#C9A35A) accent lighting, cream and sepia highlights.
Style: luxury fashion magazine editorial, abstract and atmospheric, high-end photographic quality.
Composition: cinematic 16:9 landscape, dramatic lighting, depth and texture.

Strict restrictions: absolutely no text, no readable words, no human faces, no logos, no charts or graphs. Pure visual atmosphere only.`;

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

export async function generateCoverImage(
  title: string,
  pillarSlug: string,
  excerpt: string = "",
  keyThemes: string[] = []
): Promise<{ url: string; buffer: Buffer }> {
  return buildAndGenerate({ title, pillarSlug, excerpt, keyThemes, imageIndex: 0 });
}

export async function generateArticleImages(
  title: string,
  pillarSlug: string,
  excerpt: string,
  keyThemes: string[],
  sectionCount: number
): Promise<{ hero: { url: string; buffer: Buffer }; secondary: { url: string; buffer: Buffer } | null }> {
  const isLong = sectionCount > 18;

  if (isLong && keyThemes.length >= 3) {
    const [hero, secondary] = await Promise.all([
      buildAndGenerate({ title, pillarSlug, excerpt, keyThemes, imageIndex: 0 }),
      buildAndGenerate({ title, pillarSlug, excerpt, keyThemes, imageIndex: 1 }),
    ]);
    return { hero, secondary };
  }

  const hero = await buildAndGenerate({ title, pillarSlug, excerpt, keyThemes, imageIndex: 0 });
  return { hero, secondary: null };
}
