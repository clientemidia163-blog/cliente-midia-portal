import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  title: "Autor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (r) => r.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required()
    }),
    defineField({
      name: "role",
      title: "Cargo / função",
      type: "string"
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true }
    })
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" }
  }
});
