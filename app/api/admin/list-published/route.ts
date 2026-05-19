import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const CRON_SECRET = process.env.CRON_SECRET ?? "cm-cron-7z9dus8m-2026";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "published" as const,
});

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  const auth = req.headers.get("authorization");
  if (key !== CRON_SECRET && auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const articles = await client.fetch(
      `*[_type == "article" && defined(slug.current)] | order(publishedAt desc) {
        _id,
        _updatedAt,
        title,
        "slug": slug.current,
        excerpt,
        "pillarTitle": pillar->title,
        "pillarSlug": pillar->slug.current,
        "hasHeroImage": defined(heroImage),
        "bodyLength": length(body)
      }`
    );

    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
