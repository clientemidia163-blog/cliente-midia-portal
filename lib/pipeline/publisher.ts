import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { resend, FROM_EMAIL } from "@/lib/resend";
import type { GeneratedArticle, ArticleSection } from "./writer";

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function key() {
  return Math.random().toString(36).slice(2, 10);
}

function sectionsToBlocks(sections: ArticleSection[]) {
  return sections.map((s) => {
    if (s.type === "pullquote") {
      return { _type: "pullquote", _key: key(), quote: s.quote ?? "", cite: undefined };
    }

    if (s.type === "dataPoint") {
      return {
        _type: "dataPoint",
        _key: key(),
        value: s.value ?? "",
        label: s.label ?? "",
        source: s.source,
      };
    }

    const styleMap: Record<string, string> = {
      paragraph: "normal",
      h2: "h2",
      h3: "h3",
    };

    return {
      _type: "block",
      _key: key(),
      style: styleMap[s.type] ?? "normal",
      children: [{ _type: "span", _key: key(), text: s.text ?? "", marks: [] }],
      markDefs: [],
    };
  });
}

export interface PublishResult {
  draftId: string;
  title: string;
  slug: string;
  studioUrl: string;
}

export async function publishDraft(
  article: GeneratedArticle & { slug: string },
  imageBuffer: Buffer | null,
  secondaryImageBuffer?: Buffer | null
): Promise<PublishResult> {
  let heroImage: object | undefined;
  let secondaryAssetId: string | undefined;

  if (imageBuffer) {
    try {
      const asset = await writeClient.assets.upload("image", imageBuffer, {
        filename: `${article.slug}-cover.jpg`,
        contentType: "image/jpeg",
      });
      heroImage = {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: article.title,
      };
    } catch {
      // imagem falhou — publica sem ela
    }
  }

  if (secondaryImageBuffer) {
    try {
      const asset = await writeClient.assets.upload("image", secondaryImageBuffer, {
        filename: `${article.slug}-secondary.jpg`,
        contentType: "image/jpeg",
      });
      secondaryAssetId = asset._id;
    } catch {
      // imagem secundária falhou — ignora
    }
  }

  const draftId = `drafts.article.${article.slug}-${Date.now()}`;

  const bodyBlocks: object[] = sectionsToBlocks(article.sections);

  // Insere a imagem secundária no meio do corpo do artigo
  if (secondaryAssetId && bodyBlocks.length > 6) {
    const midIndex = Math.floor(bodyBlocks.length / 2);
    bodyBlocks.splice(midIndex, 0, {
      _type: "image",
      _key: key(),
      asset: { _type: "reference", _ref: secondaryAssetId },
      alt: `Ilustração — ${article.title}`,
    });
  }

  await writeClient.createIfNotExists({
    _id: draftId,
    _type: "article",
    title: article.title,
    slug: { _type: "slug", current: article.slug },
    subtitle: article.subtitle,
    excerpt: article.excerpt,
    seoTitle: article.metaDescription?.substring(0, 70),
    readingTime: article.readingTime,
    publishedAt: new Date().toISOString(),
    featured: false,
    pillar: {
      _type: "reference",
      _ref: `pillar.${article.pillarSlug}`,
    },
    ...(heroImage ? { heroImage } : {}),
    body: bodyBlocks,
  });

  const studioUrl = `https://clientemidia.com.br/studio/desk/article;${draftId}`;

  await notifyByEmail(article.title, article.pillarSlug, studioUrl);

  return { draftId, title: article.title, slug: article.slug, studioUrl };
}

async function notifyByEmail(title: string, pillar: string, studioUrl: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: "clientemidia163@gmail.com",
      subject: `[Rascunho] Novo artigo gerado — ${title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #C9A35A;">Novo artigo disponível para revisão</h2>
          <p><strong>Título:</strong> ${title}</p>
          <p><strong>Pilar:</strong> ${pillar}</p>
          <p style="margin-top: 24px;">
            <a href="${studioUrl}"
               style="background: #C9A35A; color: #0B0B0B; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 600;">
              Revisar no Sanity Studio →
            </a>
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 32px;">
            Este artigo foi gerado automaticamente pelo pipeline Cliente Mídia™ e está salvo como rascunho.
            Publique no Studio após revisão.
          </p>
        </div>
      `,
    });
  } catch {
    // email falhou — não interrompe o pipeline
  }
}
