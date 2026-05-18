import { defineType, defineField } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Configurações do portal",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Nome do portal",
      type: "string",
      initialValue: "Cliente Mídia™"
    }),
    defineField({
      name: "editionLabel",
      title: "Selo da edição (top bar)",
      type: "string",
      initialValue: "Edição Nº 01 · Maio 2026"
    }),
    defineField({
      name: "heroHeadline",
      title: "Manchete do hero",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "heroLead",
      title: "Lead do hero",
      type: "text",
      rows: 5
    }),
    defineField({
      name: "reportTitle",
      title: "Título do relatório",
      type: "string",
      initialValue: "Cliente Mídia™ 2026"
    }),
    defineField({
      name: "reportDescription",
      title: "Descrição do relatório",
      type: "text",
      rows: 5
    })
  ],
  preview: {
    prepare: () => ({ title: "Configurações do portal" })
  }
});
