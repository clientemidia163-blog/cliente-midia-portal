import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const PILLARS = [
  { num: "i.", title: "Diagnóstico", desc: "O problema do alcance alugado. O custo real do CAC. A jaula fiscal do Instagram. Por que o modelo antigo está rachando.", count: "04 artigos", href: "/diagnostico" },
  { num: "ii.", title: "Categoria", desc: "O que é Cliente Mídia™. As diferenças entre UGC, influencer e Cliente Mídia. Os pilares da distribuição orgânica.", count: "04 artigos", href: "/categoria" },
  { num: "iii.", title: "Pesquisa", desc: "Relatórios, benchmarks, estudos de caso, dados primários do varejo premium brasileiro em 2026.", count: "03 artigos", href: "/pesquisa" },
  { num: "iv.", title: "Movimento", desc: "O futuro da categoria. Predições. Entrevistas com lojistas pioneiros. A construção do novo padrão do varejo.", count: "03 artigos", href: "/movimento" },
  { num: "v.", title: "Método", desc: "Como implementar o modelo Cliente Mídia™. Etapas, ferramentas, rituais e os erros mais comuns de quem começa errado.", count: "Em breve", href: "/metodo" }
];

const ARTICLES = [
  { tag: "Categoria", title: "Cliente Mídia™ — a definição oficial.", excerpt: "A nomenclatura, a infraestrutura e os limites da categoria que está sendo construída no varejo premium brasileiro.", meta: "08 min · Maio 2026" },
  { tag: "Diagnóstico", title: "O verdadeiro custo do CAC no varejo de moda em 2026.", excerpt: "Uma análise das margens, da inflação dos leilões e do que cada novo cliente realmente custa hoje no Brasil.", meta: "10 min · Maio 2026" },
  { tag: "Pesquisa", title: "Por que seu melhor cliente nunca foi seu anúncio.", excerpt: "O boca a boca digital responde por 33% das descobertas de marca. Os anúncios? Custam 11 vezes mais por conversão.", meta: "14 min · Maio 2026" },
  { tag: "Categoria", title: "UGC, influencer ou Cliente Mídia? As três distinções que ninguém faz.", excerpt: "Por que esses três modelos foram confundidos durante uma década — e por que essa confusão custou bilhões ao varejo.", meta: "09 min · Maio 2026" },
  { tag: "Movimento", title: "A nova infraestrutura do varejo premium brasileiro.", excerpt: "O que muda quando a distribuição da marca deixa de ser comprada e passa a ser cultivada na própria base de clientes.", meta: "16 min · Maio 2026" },
  { tag: "Diagnóstico", title: "A reforma tributária e o novo piso dos Meta Ads.", excerpt: "O impacto permanente do PIS/COFINS e ISS sobre o custo da mídia paga — e o que isso significa para sua margem.", meta: "07 min · Maio 2026" }
];

export default function HomePage() {
  return (
    <main>
      <Header />

      {/* HERO */}
      <section className="border-b border-line-dark px-8 py-24 md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-8 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="eyebrow">Manifesto · Edição inaugural</span>
          </div>
          <h1 className="mb-8 max-w-5xl font-serif text-5xl font-medium leading-[1.04] tracking-tight md:text-[88px]">
            Sua loja investe em alcance.<br />
            Mas o alcance <em className="italic text-gold-soft">não é seu</em>.
          </h1>
          <p className="mb-12 max-w-[680px] text-lg font-light leading-relaxed text-sepia">
            Em 2026, anunciar no Instagram ficou <strong className="font-medium text-cream-warm">12% mais caro</strong> — só de imposto. O custo por clique sobe todo ano. O algoritmo muda sem avisar. E quando você para de pagar, você desaparece. <strong className="font-medium text-cream-warm">Existe uma saída.</strong> Ela não vem de mais anúncios. Ela vem de quem já comprou na sua loja.
          </p>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Link href="/simulador" className="btn-primary">✦ Simular impacto na minha loja →</Link>
            <Link href="/manifesto" className="btn-text">Ler o manifesto →</Link>
            <Link href="/relatorio" className="btn-text">Baixar o Relatório 2026 →</Link>
          </div>
          <p className="mt-6 max-w-[560px] text-xs leading-relaxed text-dim">
            Em 3 passos a ferramenta mostra o alcance orgânico potencial da sua loja —
            usando os números que você já sabe de cabeça.
          </p>
        </div>
      </section>

      {/* DATA */}
      <section className="border-b border-line-dark bg-ink-deep px-8 py-28">
        <div className="mx-auto mb-20 max-w-[880px] text-center">
          <div className="mb-5">
            <span className="eyebrow">O problema em números</span>
          </div>
          <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight md:text-[46px]">
            O mercado está preso num modelo caro, frágil e{" "}
            <em className="italic text-gold-soft">alugado</em>.
          </h2>
        </div>
        <div className="mx-auto max-w-[1240px] grid border-t border-line-dark md:grid-cols-3">
          <DataItem number="R$ 8,68" unit=" bi" label="investidos em publicidade digital no Brasil em 2024" />
          <DataItem number="92" unit="%" label="dos consumidores confiam mais em pessoas reais do que em anúncios" border />
          <DataItem number="+12,15" unit="%" label="de aumento no custo dos Meta Ads a partir de janeiro de 2026" border />
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-b border-line-dark bg-ink px-8 py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-20 text-center">
            <div className="mb-5">
              <span className="eyebrow">Os cinco pilares editoriais</span>
            </div>
            <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight md:text-5xl">
              Onde uma nova categoria é{" "}
              <em className="italic text-gold-soft">documentada</em>.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            {PILLARS.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group relative overflow-hidden border border-line-dark bg-ink p-9 transition-all hover:-translate-y-1 hover:border-[#2A2722]"
              >
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                <div className="mb-6 font-serif text-sm tracking-wider text-gold">
                  <em className="italic">{p.num}</em>
                </div>
                <h3 className="mb-4 font-serif text-2xl font-medium leading-tight md:text-[28px]">
                  {p.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-sepia">{p.desc}</p>
                <div className="text-[11px] font-medium uppercase tracking-eyebrow text-gold">
                  {p.count} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-cream px-8 py-32 text-ink-elevated">
        <div className="mx-auto max-w-[900px] text-center">
          <div className="mb-10 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold-deep" />
            <span className="text-[11px] font-medium uppercase tracking-eyebrow text-gold-deep">
              Declaração de categoria
            </span>
            <span className="h-px w-10 bg-gold-deep" />
          </div>
          <blockquote className="mb-10 font-serif text-3xl italic font-normal leading-tight md:text-[52px]">
            &ldquo;O maior ativo do varejo premium não está nos anúncios. Está nas{" "}
            <span className="not-italic font-medium text-gold-deep">
              pessoas que já te escolheram
            </span>
            .&rdquo;
          </blockquote>
          <div className="text-[11px] font-medium uppercase tracking-eyebrow text-[#5A544A]">
            — Manifesto Cliente Mídia™ · 2026
          </div>
        </div>
      </section>

      {/* SIMULADOR — ferramenta primária de conversão */}
      <section className="border-b border-line-dark px-8 py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid items-center gap-16 md:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="mb-8 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="eyebrow">Ferramenta interativa · Gratuita</span>
              </div>
              <h2 className="mb-8 font-serif text-4xl font-medium leading-[1.06] tracking-tight md:text-[60px]">
                Quanto o modelo Cliente Mídia™ vale{" "}
                <em className="italic text-gold-soft">na sua loja</em>?
              </h2>
              <p className="mb-8 max-w-[540px] text-lg leading-relaxed text-sepia">
                Coloque três números — clientes/mês, gasto em mídia paga e ticket
                médio. Em 60 segundos a ferramenta mostra o alcance orgânico
                potencial, a estimativa de receita adicional e o comparativo
                contra Meta Ads e influenciadores. Tudo com metodologia
                transparente.
              </p>
              <ul className="mb-10 space-y-3 text-sepia">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-px w-4 bg-gold-deep" />
                  <span>3 passos · sem cadastro · sem fricção</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-px w-4 bg-gold-deep" />
                  <span>Personalizado pelos números da sua operação</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-px w-4 bg-gold-deep" />
                  <span>Comparativo lado a lado: Meta Ads · Influencer · Cliente Mídia™</span>
                </li>
              </ul>
              <Link href="/simulador" className="btn-primary">
                ✦ Abrir o simulador →
              </Link>
            </div>

            {/* Card visual do simulador — mockup leve */}
            <div className="relative">
              <div className="relative overflow-hidden border border-gold/40 bg-gradient-to-br from-[#1a1612] to-ink p-8 md:p-10">
                <div className="absolute inset-3 border border-gold-deep/30" />
                <div className="relative z-10">
                  <div className="mb-6 text-[10px] font-medium uppercase tracking-eyebrow text-gold">
                    Passo 1 de 3 · Sua loja
                  </div>
                  <div className="mb-8">
                    <div className="mb-2 text-[13px] text-cream-warm">
                      Clientes/mês na sua loja
                    </div>
                    <div className="mb-4 font-serif text-4xl text-gold md:text-[44px]">150</div>
                    <div className="h-[3px] w-full overflow-hidden rounded-full bg-line-dark">
                      <div className="h-full w-[22%] rounded-full bg-gold" />
                    </div>
                  </div>
                  <div className="mb-8">
                    <div className="mb-2 text-[13px] text-cream-warm">
                      Gasto em anúncios/mês
                    </div>
                    <div className="mb-4 font-serif text-4xl text-gold md:text-[44px]">R$ 3.000</div>
                    <div className="h-[3px] w-full overflow-hidden rounded-full bg-line-dark">
                      <div className="h-full w-[18%] rounded-full bg-gold" />
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="mb-2 text-[13px] text-cream-warm">Ticket médio</div>
                    <div className="font-serif text-4xl text-gold md:text-[44px]">R$ 380</div>
                  </div>
                  <div className="mt-8 border-t border-gold/30 pt-6">
                    <div className="mb-1 text-[10px] uppercase tracking-eyebrow text-gold">
                      Alcance orgânico estimado
                    </div>
                    <div className="font-serif text-2xl text-cream md:text-[28px]">
                      52,5k pessoas/mês
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="px-8 py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-16 flex items-end justify-between border-b border-line-dark pb-12">
            <div>
              <div className="mb-5">
                <span className="eyebrow">Edição inaugural</span>
              </div>
              <h2 className="font-serif text-4xl font-medium tracking-tight md:text-[42px]">
                Artigos recentes
              </h2>
            </div>
            <Link href="/artigos" className="btn-text">Arquivo completo →</Link>
          </div>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((a) => (
              <article key={a.title} className="group cursor-pointer">
                <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#1a1815] to-[#2a2520]">
                  <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 border border-gold/60" />
                </div>
                <div className="mb-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                  {a.tag}
                </div>
                <h3 className="mb-3.5 font-serif text-[22px] font-medium leading-snug transition-colors group-hover:text-gold-soft md:text-[28px]">
                  {a.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-sepia">{a.excerpt}</p>
                <div className="text-[11px] uppercase tracking-[0.15em] text-sepia">
                  {a.meta}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REPORT CTA */}
      <section className="bg-cream px-8 py-32 text-ink-elevated">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid items-center gap-20 md:grid-cols-2">
            <div className="relative flex aspect-[3/4] items-center justify-center border border-gold bg-gradient-to-br from-[#1a1612] to-ink p-12 text-center">
              <div className="absolute inset-3.5 border border-gold-deep/40" />
              <div className="relative z-10">
                <div className="mb-8 text-[11px] font-medium uppercase tracking-eyebrow text-gold">
                  Relatório anual
                </div>
                <h3 className="mb-3 font-serif text-4xl font-medium leading-tight text-gold-soft md:text-[42px]">
                  Cliente Mídia™
                </h3>
                <div className="font-serif text-7xl italic text-gold md:text-[80px]">
                  2026
                </div>
              </div>
            </div>
            <div>
              <div className="mb-6">
                <span className="text-[11px] font-medium uppercase tracking-eyebrow text-gold-deep">
                  Documento inaugural
                </span>
              </div>
              <h2 className="mb-6 font-serif text-4xl font-medium leading-tight tracking-tight md:text-5xl">
                O Relatório Cliente Mídia™ 2026.
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-[#5A544A]">
                Setenta e duas páginas de pesquisa primária, dados de mercado
                e análise estratégica sobre a categoria que está sendo
                construída no varejo premium brasileiro. Distribuição
                restrita a lojistas, gestoras e estrategistas.
              </p>
              <form
                action="/api/leads"
                method="POST"
                className="mb-4 flex gap-3 border-b border-ink-elevated pb-3"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="seu e-mail profissional"
                  className="flex-1 bg-transparent py-2 text-base text-ink-elevated outline-none placeholder:text-[#5A544A]"
                />
                <input type="hidden" name="source" value="homepage_report" />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-gold-deep"
                >
                  Receber o relatório →
                </button>
              </form>
              <p className="text-xs text-[#5A544A]">
                Envio imediato. Sem listas alugadas. Cancele quando quiser.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function DataItem({
  number,
  unit,
  label,
  border = false
}: {
  number: string;
  unit: string;
  label: string;
  border?: boolean;
}) {
  return (
    <div
      className={`px-10 py-16 text-center ${border ? "border-t border-line-dark md:border-l md:border-t-0" : ""}`}
    >
      <div className="mb-5 font-serif text-6xl font-medium leading-none tracking-tight text-gold md:text-[76px]">
        {number}
        <span className="text-3xl md:text-[32px]">{unit}</span>
      </div>
      <p className="mx-auto max-w-[240px] text-sm leading-relaxed text-sepia">{label}</p>
    </div>
  );
}
