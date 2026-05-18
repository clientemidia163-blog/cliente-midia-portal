// Helpers para gerar blocos PortableText
let counter = 0;
const k = () => `bk${++counter}`;

export type Block =
  | {
      _type: "block";
      _key: string;
      style: string;
      children: { _type: "span"; _key: string; text: string; marks?: string[] }[];
      markDefs: any[];
    }
  | {
      _type: "pullquote";
      _key: string;
      quote: string;
      cite?: string;
    }
  | {
      _type: "dataPoint";
      _key: string;
      value: string;
      label: string;
      source?: string;
    };

export function block(style: string, parts: (string | { text: string; mark: "strong" | "em" })[]): Block {
  const children = parts.map((part) =>
    typeof part === "string"
      ? { _type: "span" as const, _key: k(), text: part, marks: [] }
      : { _type: "span" as const, _key: k(), text: part.text, marks: [part.mark] }
  );
  return { _type: "block", _key: k(), style, children, markDefs: [] };
}

export const p = (...parts: (string | { text: string; mark: "strong" | "em" })[]) => block("normal", parts);
export const h2 = (text: string) => block("h2", [text]);
export const h3 = (text: string) => block("h3", [text]);
export const quote = (text: string) => block("blockquote", [text]);
export const b = (text: string) => ({ text, mark: "strong" as const });
export const i = (text: string) => ({ text, mark: "em" as const });

export const pullquote = (quoteText: string, cite?: string): Block => ({
  _type: "pullquote",
  _key: k(),
  quote: quoteText,
  cite
});

export const dataPoint = (value: string, label: string, source?: string): Block => ({
  _type: "dataPoint",
  _key: k(),
  value,
  label,
  source
});
