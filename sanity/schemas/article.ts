import { defineType, defineField, defineArrayMember } from "sanity";

export const article = defineType({
  name: "article",
  title: "Artigo",
  type: "document",
  groups: [
    { name: "content", title: "Conteúdo", default: true },
    { name: "meta", title: "Metadados" },
    { name: "seo", title: "SEO" }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      group: "content",
      validation: (r) => r.required().max(140)
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required()
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo / lead",
      type: "text",
      rows: 3,
      group: "content",
      description: "Aparece logo abaixo do título"
    }),
    defineField({
      name: "pillar",
      title: "Pilar editorial",
      type: "reference",
      to: [{ type: "pillar" }],
      group: "content",
      validation: (r) => r.required()
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "reference",
      to: [{ type: "author" }],
      group: "content"
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required()
    }),
    defineField({
      name: "readingTime",
      title: "Tempo de leitura (min)",
      type: "number",
      group: "meta",
      validation: (r) => r.min(1).max(60)
    }),
    defineField({
      name: "heroImage",
      title: "Imagem hero",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt", type: "string" }]
    }),
    defineField({
      name: "body",
      title: "Corpo do artigo",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Parágrafo", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Citação", value: "blockquote" }
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" }
          ],
          marks: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Itálico", value: "em" }
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                  { name: "newTab", type: "boolean", title: "Abrir em nova aba" }
                ]
              }
            ]
          }
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt" },
            { name: "caption", type: "string", title: "Legenda" }
          ]
        }),
        defineArrayMember({
          name: "pullquote",
          title: "Pull quote",
          type: "object",
          fields: [
            { name: "quote", type: "text", title: "Citação" },
            { name: "cite", type: "string", title: "Atribuição" }
          ],
          preview: {
            select: { title: "quote", subtitle: "cite" }
          }
        }),
        defineArrayMember({
          name: "dataPoint",
          title: "Dado em destaque",
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Valor" },
            { name: "label", type: "string", title: "Descrição" },
            { name: "source", type: "string", title: "Fonte" }
          ],
          preview: {
            select: { title: "value", subtitle: "label" }
          }
        })
      ]
    }),
    defineField({
      name: "excerpt",
      title: "Resumo (cartão / SEO)",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Aparece em cartões e meta description",
      validation: (r) => r.max(220)
    }),
    defineField({
      name: "seoTitle",
      title: "Título SEO (opcional)",
      type: "string",
      group: "seo",
      validation: (r) => r.max(70)
    }),
    defineField({
      name: "featured",
      title: "Destaque na home?",
      type: "boolean",
      group: "meta",
      initialValue: false
    })
  ],
  orderings: [
    {
      title: "Publicação (mais recente)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }]
    }
  ],
  preview: {
    select: { title: "title", subtitle: "pillar.title", media: "heroImage" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle ? `Pilar: ${subtitle}` : "Sem pilar",
      media
    })
  }
});
