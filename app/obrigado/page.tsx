import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata = { title: "Obrigado" };

export default function ObrigadoPage() {
  return (
    <main>
      <Header />
      <section className="px-8 py-32 text-center">
        <div className="mx-auto max-w-[680px]">
          <div className="mb-6">
            <span className="eyebrow">Inscrição confirmada</span>
          </div>
          <h1 className="mb-8 font-serif text-5xl font-medium leading-tight tracking-tight md:text-6xl">
            O Relatório está a caminho da{" "}
            <em className="italic text-gold-soft">sua caixa</em>.
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-sepia">
            Em alguns minutos você recebe o Relatório Cliente Mídia™ 2026 no
            e-mail que você cadastrou. Se não chegar, dá uma olhada no spam — e
            depois volta aqui pra ler os artigos.
          </p>
          <Link href="/" className="btn-ghost">Voltar para a home →</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
