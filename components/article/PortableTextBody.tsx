import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlForImage } from "@/lib/sanity";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-7 text-[18px] leading-[1.78] text-cream-warm">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-6 mt-16 font-serif text-3xl font-medium leading-tight md:text-[42px]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 mt-12 font-serif text-2xl font-medium leading-tight md:text-[30px]">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l border-gold pl-6 font-serif text-2xl italic leading-snug text-gold-soft md:text-[28px]">
        {children}
      </blockquote>
    )
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium text-cream">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const target = value?.newTab ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target ? "noreferrer" : undefined}
          className="border-b border-gold/40 text-gold hover:border-gold"
        >
          {children}
        </a>
      );
    }
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-7 space-y-2 pl-6 text-[18px] leading-[1.78] text-cream-warm marker:text-gold">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-7 list-decimal space-y-2 pl-6 text-[18px] leading-[1.78] text-cream-warm marker:text-gold">
        {children}
      </ol>
    )
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlForImage(value).width(1600).url();
      return (
        <figure className="my-12">
          <div className="relative aspect-[3/2] w-full overflow-hidden">
            <Image src={src} alt={value.alt || ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 760px" />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-xs uppercase tracking-[0.15em] text-sepia">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    pullquote: ({ value }) => (
      <figure className="my-16 border-y border-line-dark py-12 text-center">
        <blockquote className="mx-auto max-w-3xl font-serif text-3xl italic font-normal leading-snug text-gold-soft md:text-[40px]">
          &ldquo;{value.quote}&rdquo;
        </blockquote>
        {value.cite && (
          <figcaption className="mt-6 text-[11px] uppercase tracking-eyebrow text-sepia">
            — {value.cite}
          </figcaption>
        )}
      </figure>
    ),
    dataPoint: ({ value }) => (
      <aside className="my-12 border-l-2 border-gold bg-ink-elevated p-8">
        <div className="font-serif text-5xl font-medium leading-none tracking-tight text-gold md:text-6xl">
          {value.value}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-cream-warm">{value.label}</p>
        {value.source && (
          <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-sepia">Fonte: {value.source}</div>
        )}
      </aside>
    )
  }
};

export function PortableTextBody({ value }: { value: any[] }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
