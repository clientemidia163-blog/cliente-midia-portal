import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata = {
  title: "Casos & Resultados — Cliente Mídia™",
  description:
    "Como lojas de moda premium estão trocando dependência de anúncios por distribuição orgânica. Projeções baseadas em dados reais do varejo brasileiro."
};

const CASOS = [
  {
    numero: "01",
    tipo: "Boutique feminina premium",
    cidade: "São Paulo · SP",
    fase: "Projeção · Dados reais de mercado",
    problema:
      "A loja investia R$6.000/mês em Meta Ads para alcançar cerca de 8.000 pessoas por semana. O CAC havia subido para R$33 por cliente novo, e qualquer pausa nos anúncios gerava queda imediata nas vendas. A dependência estava instalada.",
    solucao:
      "Mapeamento das 180 clientes mensais por potencial de compartilhamento. Ativação das 30 com maior rede e engajamento como primeiras Clientes Mídia. Criação de experiências de compra pensadas para gerar conteúdo espontâneo.",
    metricas: [
      { valor: "63.000", unidade: "pessoas/mês", descricao: "Alcance orgânico estimado" },
      { valor: "−60%", unidade: "", descricao: "Redução em Meta Ads" },
      { valor: "23", unidade: "clientes/mês", descricao: "Novos por indicação" }
    ],
    metodologia: "180 clientes × 350 seguidores médios × 1 compartilhamento/mês"
  },
  {
    numero: "02",
    tipo: "Multi-marcas de luxo",
    cidade: "Rio de Janeiro · RJ",
    fase: "Projeção · Dados reais de mercado",
    problema:
      "A loja tinha uma base fiel de 400 clientes recorrentes, mas não existia nenhuma estrutura para transformar essa lealdade em distribuição. R$8.000/mês em anúncios para atingir pessoas que nunca haviam entrado na loja enquanto as melhores embaixadoras já estavam comprando.",
    solucao:
      "Segmentação da base por frequência de compra e comportamento social. Identificação de 60 clientes com alto potencial (NPS > 8 + presença ativa no Instagram). Programa de ativação em três etapas: experiência diferenciada, facilitação do compartilhamento, reconhecimento.",
    metricas: [
      { valor: "78.000", unidade: "pessoas/mês", descricao: "Alcance orgânico estimado" },
      { valor: "R$ 0", unidade: "em novos anúncios", descricao: "Para ativar esse alcance" },
      { valor: "4,2×", unidade: "", descricao: "ROI vs mídia paga equivalente" }
    ],
    metodologia: "60 Clientes Mídia × 1.300 seguidores médios × 1 post/mês"
  },
  {
    numero: "03",
    tipo: "Ateliê de moda autoral",
    cidade: "Belo Horizonte · MG",
    fase: "Projeção · Dados reais de mercado",
    problema:
      "Operação menor, com 40 clientes por mês e R$2.500 em anúncios — proporcionalmente caro para o porte. O produto era de altíssima qualidade e as clientes que compravam amavam a marca, mas nada disso se traduzia em novos clientes.",
    solucao:
      "Por ser uma operação menor, cada cliente tem mais peso. Ativação das 12 clientes mais engajadas como Clientes Mídia com tratamento VIP e acesso antecipado a coleções. A escassez do produto premium tornou o compartilhamento aspiracional.",
    metricas: [
      { valor: "19.200", unidade: "pessoas/mês", descricao: "Alcance orgânico estimado" },
      { valor: "+35%", unidade: "", descricao: "Crescimento da base em 6 meses" },
      { valor: "R$ 0", unidade: "adicionais", descricao: "Investido em mídia paga" }
    ],
    metodologia: "12 Clientes Mídia × 1.600 seguidores médios × 1 post/mês"
  }
];

const BENCHMARKS = [
  { valor: "350", label: "Seguidores médios de uma compradora premium brasileira" },
  { valor: "68%", label: "Tasa de confiança em recomendações de pessoas conhecidas" },
  { valor: "11×", label: "Menor custo por conversão vs anúncios pagos" },
  { valor: "6 meses", label: "Tempo médio para primeiros resultados mensuráveis" }
];

export default function CasosPage() {
  return (
    <main>
      <Header />

      {/* HERO */}
      <section className="border-b border-line-dark px-8 py-24 md:py-32">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-8 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="eyebrow">Evidência · Casos & Resultados</span>
          </div>
          <h1 className="mb-8 max-w-4xl font-serif text-5xl font-medium leading-[1.04] tracking-tight md:text-[76px]">
            O modelo em{" "}
            <em className="italic text-gold-soft">números reais</em>.
          </h1>
          <p className="mb-6 max-w-[680px] text-lg font-light leading-relaxed text-sepia">
            Projeções construídas com dados reais do varejo premium brasileiro.
            Cada caso parte de uma operação real — tamanho, investimento e base
            de clientes verificáveis — e aplica a metodologia Cliente Mídia™ com
            transparência total nos cálculos.
          </p>
          <p className="max-w-[560px] text-sm leading-relaxed text-sepia/70">
            Fase 1 — projeções baseadas em dados de mercado. Fase 2 —
            resultados reais de clientes Viralize Luxo, disponíveis em 2026.
          </p>
        </div>
      </section>

      {/* BENCHMARKS */}
      <section className="border-b border-line-dark bg-ink-deep px-8 py-20">
        <div className="mx-auto max-w-[1240px]">
          <p className="eyebrow mb-10">Base de cálculo — dados do mercado</p>
          <div className="grid border-t border-line-dark md:grid-cols-4">
            {BENCHMARKS.map((b, i) => (
              <div
                key={b.label}
                className={`py-10 md:px-10 ${i > 0 ? "border-t border-line-dark md:border-l md:border-t-0" : ""}`}
              >
                <div className="mb-3 font-serif text-4xl font-medium text-gold">
                  {b.valor}
                </div>
                <p className="text-sm leading-relaxed text-sepia">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASOS */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1240px] space-y-0 divide-y divide-line-dark">
          {CASOS.map((caso) => (
            <div key={caso.numero} className="py-20">
              {/* HEADER DO CASO */}
              <div className="mb-12 grid gap-6 md:grid-cols-[auto_1fr]">
                <div className="font-serif text-[80px] font-medium leading-none text-line-dark md:text-[100px]">
                  {caso.numero}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="mb-2 text-[11px] font-medium uppercase tracking-eyebrow text-gold">
                    {caso.fase}
                  </div>
                  <h2 className="font-serif text-3xl font-medium leading-tight md:text-[40px]">
                    {caso.tipo}
                  </h2>
                  <p className="mt-2 text-sm text-sepia">{caso.cidade}</p>
                </div>
              </div>

              {/* CONTEÚDO */}
              <div className="grid gap-16 md:grid-cols-[1fr_1fr_1fr]">
                <div>
                  <h3 className="mb-4 text-[11px] font-medium uppercase tracking-eyebrow text-sepia">
                    O problema
                  </h3>
                  <p className="text-sm leading-relaxed text-sepia">
                    {caso.problema}
                  </p>
                </div>
                <div>
                  <h3 className="mb-4 text-[11px] font-medium uppercase tracking-eyebrow text-sepia">
                    A solução aplicada
                  </h3>
                  <p className="text-sm leading-relaxed text-sepia">
                    {caso.solucao}
                  </p>
                </div>
                <div>
                  <h3 className="mb-4 text-[11px] font-medium uppercase tracking-eyebrow text-sepia">
                    Resultados projetados
                  </h3>
                  <div className="space-y-6">
                    {caso.metricas.map((m) => (
                      <div key={m.descricao}>
                        <div className="font-serif text-3xl font-medium text-gold">
                          {m.valor}
                          {m.unidade && (
                            <span className="ml-1 text-base font-sans font-normal text-sepia">
                              {m.unidade}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-sepia">{m.descricao}</p>
                      </div>
                    ))}
                    <p className="border-t border-line-dark pt-4 text-[10px] leading-relaxed text-sepia/60">
                      Metodologia: {caso.metodologia}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DISCLAIMER + CTA */}
      <section className="border-t border-line-dark bg-ink-deep px-8 py-24">
        <div className="mx-auto max-w-[1240px] grid gap-16 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="mb-6 font-serif text-3xl font-medium leading-tight md:text-[42px]">
              Calcule o potencial da sua loja.
            </h2>
            <p className="mb-8 text-base leading-relaxed text-sepia">
              Os casos acima usam médias de mercado. O Simulador Cliente Mídia™
              usa os números reais da sua operação — clientes por mês, gasto em
              mídia paga e ticket médio — para projetar o alcance orgânico
              específico da sua loja.
            </p>
            <Link href="/simulador" className="btn-primary inline-block">
              ✦ Simular impacto na minha loja →
            </Link>
          </div>
          <div className="border border-line-dark p-8">
            <h3 className="mb-5 text-[11px] font-medium uppercase tracking-eyebrow text-gold">
              Sobre as projeções
            </h3>
            <ul className="space-y-4 text-sm leading-relaxed text-sepia">
              {[
                "Baseadas em dados públicos do varejo premium brasileiro (2024-2026)",
                "Cálculo de alcance: clientes ativados × seguidores médios × frequência de compartilhamento",
                "Taxa de engajamento conservadora (1 compartilhamento por mês por cliente ativado)",
                "Sem inflacionamento — os números reais podem ser maiores ou menores",
                "Fase 2 com resultados reais de clientes Viralize Luxo em publicação contínua"
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-px w-4 shrink-0 bg-gold-deep" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* VIRALIZE LUXO CTA */}
      <section className="bg-cream px-8 py-32 text-ink-elevated">
        <div className="mx-auto max-w-[880px] text-center">
          <div className="mb-8 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold-deep" />
            <span className="text-[11px] font-medium uppercase tracking-eyebrow text-gold-deep">
              Pronto para implementar?
            </span>
            <span className="h-px w-10 bg-gold-deep" />
          </div>
          <h2 className="mb-6 font-serif text-4xl font-medium leading-tight tracking-tight md:text-5xl">
            O modelo existe. A plataforma também.
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-[#5A544A]">
            A Viralize Luxo é a plataforma que transforma esses números em
            realidade na sua loja — com sistema de ativação de clientes,
            rastreamento de indicações e dashboard de alcance orgânico.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/simulador" className="btn-primary">
              ✦ Ver o potencial da minha loja →
            </Link>
            <a
              href="https://viralizeluxo.com.br"
              target="_blank"
              rel="noreferrer"
              className="btn-text text-gold-deep hover:opacity-80"
            >
              Conhecer a Viralize Luxo ↗
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
