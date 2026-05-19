import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const CRON_SECRET = process.env.CRON_SECRET ?? "cm-cron-7z9dus8m-2026";

const rawClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "raw" as const,
});

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  const auth = req.headers.get("authorization");
  if (key !== CRON_SECRET && auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const drafts = await rawClient.fetch(
      `*[_type == "article" && _id match "drafts.*"] | order(_updatedAt desc) {
        _id,
        _updatedAt,
        title,
        "slug": slug.current,
        excerpt,
        "pillarSlug": pillar->slug.current,
        "pillarTitle": pillar->title,
        "bodyLength": length(body),
        "hasHeroImage": defined(heroImage)
      }`
    );

    return NextResponse.json({ drafts });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
