import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
  token: process.env.SANITY_API_TOKEN
});

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source: SanityImageSource) => builder.image(source);
