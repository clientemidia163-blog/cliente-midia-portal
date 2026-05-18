import { fal } from "@fal-ai/client";

const PILLAR_MOOD: Record<string, string> = {
  diagnostico: "dark ominous atmosphere, broken chains, red accent lighting, tension",
  categoria: "transformation, golden light emerging from darkness, elegant movement",
  pesquisa: "data visualization aesthetics, geometric patterns, analytical precision",
  movimento: "forward motion, horizon, golden sunrise over luxury retail cityscape",
  metodo: "structured elegance, architectural lines, systematic beauty",
};

export async function generateCoverImage(
  title: string,
  pillarSlug: string
): Promise<{ url: string; buffer: Buffer }> {
  const mood = PILLAR_MOOD[pillarSlug] ?? PILLAR_MOOD.categoria;

  const prompt = `Editorial fashion magazine cover artwork. ${mood}.
Deep black background (#0B0B0B), warm gold (#C9A35A) accent lighting, cream tones.
Premium luxury retail aesthetic. Abstract and atmospheric.
Inspired by: "${title.substring(0, 60)}".
No text, no people, no logos. High-end photographic editorial style.
16:9 landscape format. Cinematic quality.`;

  const result = await fal.subscribe("fal-ai/flux/schnell", {
    input: {
      prompt,
      image_size: "landscape_16_9",
      num_inference_steps: 4,
      num_images: 1,
      enable_safety_checker: true,
    },
  });

  const imageUrl = (result.data as any).images?.[0]?.url;
  if (!imageUrl) throw new Error("Fal.ai não retornou URL de imagem");

  const response = await fetch(imageUrl);
  if (!response.ok) throw new Error(`Falha ao baixar imagem: ${response.status}`);

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return { url: imageUrl, buffer };
}
