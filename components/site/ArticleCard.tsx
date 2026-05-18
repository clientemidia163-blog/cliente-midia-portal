import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity";

type Props = {
  article: {
    title: string;
    slug: string;
    excerpt?: string;
    subtitle?: string;
    readingTime?: number;
    publishedAt?: string;
    heroImage?: any;
    pillar?: { title: string; slug: string };
  };
};

export function ArticleCard({ article }: Props) {
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("pt-BR", {
        month: "short",
        year: "numeric"
      })
    : "";
  const imageSrc = article.heroImage
    ? urlForImage(article.heroImage).width(900).height(680).url()
    : null;

  return (
    <Link href={`/artigos/${article.slug}`} className="group block cursor-pointer">
      <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#1a1815] to-[#2a2520]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 border border-gold/60" />
        )}
      </div>
      {article.pillar && (
        <div className="mb-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
          {article.pillar.title}
        </div>
      )}
      <h3 className="mb-3.5 font-serif text-[22px] font-medium leading-snug transition-colors group-hover:text-gold-soft md:text-[28px]">
        {article.title}
      </h3>
      {(article.excerpt || article.subtitle) && (
        <p className="mb-4 text-sm leading-relaxed text-sepia">
          {article.excerpt || article.subtitle}
        </p>
      )}
      <div className="text-[11px] uppercase tracking-[0.15em] text-sepia">
        {article.readingTime ? `${article.readingTime} min · ` : ""}
        {date}
      </div>
    </Link>
  );
}
