import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clientemidia.com.br"),
  title: {
    default: "Cliente Mídia™ — A nova categoria do varejo premium brasileiro",
    template: "%s · Cliente Mídia™"
  },
  description:
    "Centro de autoridade da categoria Cliente Mídia™. Documentamos a transformação do varejo premium brasileiro em uma nova era de distribuição orgânica.",
  openGraph: {
    title: "Cliente Mídia™ — A nova categoria do varejo premium brasileiro",
    description:
      "Sua loja investe em alcance. Mas o alcance não é seu. Isso está prestes a mudar.",
    url: "https://clientemidia.com.br",
    siteName: "Cliente Mídia™",
    locale: "pt_BR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Cliente Mídia™",
    description:
      "A nova categoria do varejo premium brasileiro. Documentamos a transformação."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
