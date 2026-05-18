import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Cliente Mídia™ — Editorial")
    .items([
      S.listItem()
        .title("Configurações do portal")
        .child(
          S.document()
            .schemaType("settings")
            .documentId("settings")
            .title("Configurações")
        ),
      S.divider(),
      S.documentTypeListItem("article").title("Artigos"),
      S.documentTypeListItem("pillar").title("Pilares editoriais"),
      S.documentTypeListItem("author").title("Autores")
    ]);
