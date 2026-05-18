import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { PILLARS_SEED } from "@/data/seed-pillars";
import { ARTICLES_SEED } from "@/data/seed-articles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SEED_SECRET = process.env.SEED_SECRET || "cm-seed-7z9dus8m-2026";

export async function GET(req: Request) {
  return handle(req);
}

export async function POST(req: Request) {
  return handle(req);
}

async function handle(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("key") !== SEED_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!process.env.SANITY_API_TOKEN) {
    return NextResponse.json(
      { error: "missing_SANITY_API_TOKEN" },
      { status: 500 }
    );
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false
  });

  const results: { pillars: string[]; articles: string[]; errors: string[] } = {
    pillars: [],
    articles: [],
    errors: []
  };

  // PILARES (publicados — você quer ver eles ativos imediatamente)
  for (const pillar of PILLARS_SEED) {
    try {
      const doc = await client.createIfNotExists({
        _id: `pillar.${pillar.slug}`,
        _type: "pillar",
        title: pillar.title,
        slug: { _type: "slug", current: pillar.slug },
        order: pillar.order,
        numeral: pillar.numeral,
        tagline: pillar.tagline,
        longDescription: pillar.longDescription
      });
      results.pillars.push(doc.title as string);
    } catch (e: any) {
      results.errors.push(`pillar ${pillar.slug}: ${e?.message || e}`);
    }
  }

  // ARTIGOS (como DRAFTS para você revisar antes de publicar)
  for (const article of ARTICLES_SEED) {
    try {
      const doc = await client.createIfNotExists({
        _id: `drafts.article.${article.slug}`,
        _type: "article",
        title: article.title,
        slug: { _type: "slug", current: article.slug },
        subtitle: article.subtitle,
        pillar: {
          _type: "reference",
          _ref: `pillar.${article.pillarSlug}`
        },
        publishedAt: new Date().toISOString(),
        readingTime: article.readingTime,
        excerpt: article.excerpt,
        featured: article.featured || false,
        body: article.body
      });
      results.articles.push(doc.title as string);
    } catch (e: any) {
      results.errors.push(`article ${article.slug}: ${e?.message || e}`);
    }
  }

  return NextResponse.json({ ok: true, ...results });
}
