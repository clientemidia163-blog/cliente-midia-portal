import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata = {
  title: "Relatório Cliente Mídia™ 2026",
  description: "Setenta e duas páginas de pesquisa primária e análise estratégica sobre a nova categoria do varejo premium brasileiro."
};

export default function RelatorioPage() {
  return (
    <main>
      <Header />

      <section className="bg-cream px-8 py-24 text-ink-elevated md:py-32">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid items-center gap-20 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="mb-6">
                <span className="text-[11px] font-medium uppercase tracking-eyebrow text-gold-deep">
                  Documento inaugural · Distribuição restrita
                </span>
              </div>
              <h1 className="mb-8 font-serif text-5xl font-medium leading-[1.05] tracking-tight md:text-[72px]">
                O Relatório Cliente Mídia™ 2026.
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-[#5A544A] md:text-xl">
                Setenta e duas páginas de pesquisa primária, dados de mercado e análise estratégica
                sobre a categoria que está sendo construída no varejo premium brasileiro. Para
                lojistas, gestoras e estrategistas que querem entender o próximo movimento antes
                da concorrência.
              </p>

              <ul className="mb-10 space-y-3 text-[#5A544A]">
                <li className="flex items-start gap-3"><span className="mt-2 h-px w-4 bg-gold-deep" /> Diagnóstico estrutural do mercado em 2026</li>
                <li className="flex items-start gap-3"><span className="mt-2 h-px w-4 bg-gold-deep" /> Benchmark de CAC orgânico vs pago no varejo premium</li>
                <li className="flex items-start gap-3"><span className="mt-2 h-px w-4 bg-gold-deep" /> Casos de lojistas pioneiros do modelo Cliente Mídia™</li>
                <li className="flex items-start gap-3"><span className="mt-2 h-px w-4 bg-gold-deep" /> Glossário canônico e métricas-padrão da categoria</li>
              </ul>

              <form
                action="/api/leads"
                method="POST"
                className="mb-4 flex flex-col gap-3 border-b border-ink-elevated pb-3 sm:flex-row"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="seu e-mail profissional"
                  className="flex-1 bg-transparent py-2 text-base text-ink-elevated outline-none placeholder:text-[#5A544A]"
                />
                <input type="hidden" name="source" value="relatorio_page" />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 self-start text-[11px] font-medium uppercase tracking-[0.2em] text-gold-deep sm:self-auto"
                >
                  Receber o relatório →
                </button>
              </form>
              <p className="text-xs text-[#5A544A]">Envio imediato. Sem listas alugadas. Cancele quando quiser.</p>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative mx-auto flex aspect-[3/4] max-w-md items-center justify-center border border-gold bg-gradient-to-br from-[#1a1612] to-ink p-12 text-center">
                <div className="absolute inset-3.5 border border-gold-deep/40" />
                <div className="relative z-10">
                  <div className="mb-8 text-[11px] font-medium uppercase tracking-eyebrow text-gold">
                    Relatório anual
                  </div>
                  <h2 className="mb-4 font-serif text-4xl font-medium leading-tight text-gold-soft md:text-5xl">
                    Cliente Mídia™
                  </h2>
                  <div className="font-serif text-7xl italic text-gold md:text-[96px]">2026</div>
                  <div className="mt-8 text-[10px] uppercase tracking-[0.22em] text-gold-deep">
                    72 páginas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
