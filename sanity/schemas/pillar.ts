import { defineType, defineField } from "sanity";

export const pillar = defineType({
  name: "pillar",
  title: "Pilar editorial",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (r) => r.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required()
    }),
    defineField({
      name: "order",
      title: "Ordem (i, ii, iii, iv)",
      type: "number",
      description: "Ordem de aparição no portal (1 a 5)",
      validation: (r) => r.required().min(1).max(5)
    }),
    defineField({
      name: "numeral",
      title: "Numeral romano",
      type: "string",
      description: 'Ex: "i.", "ii.", "iii.", "iv."',
      validation: (r) => r.required()
    }),
    defineField({
      name: "tagline",
      title: "Descrição curta",
      type: "text",
      rows: 3,
      description: "Aparece no cartão do pilar na home"
    }),
    defineField({
      name: "longDescription",
      title: "Descrição editorial",
      type: "text",
      rows: 5,
      description: "Aparece no topo da página do pilar"
    })
  ],
  orderings: [
    {
      title: "Ordem editorial",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }]
    }
  ],
  preview: {
    select: { title: "title", subtitle: "numeral" }
  }
});
