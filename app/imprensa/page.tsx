import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata = {
  title: "Imprensa — Cliente Mídia™",
  description:
    "Informações para jornalistas, pesquisadores e veículos de comunicação sobre o portal Cliente Mídia™ e a categoria que ele documenta."
};

const DADOS = [
  { valor: "2026", label: "Ano de fundação" },
  { valor: "5", label: "Pilares editoriais" },
  { valor: "São Paulo", label: "Base editorial" },
  { valor: "Mensal", label: "Frequência de publicação" }
];

export default function ImprensaPage() {
  return (
    <main>
      <Header />

      {/* HERO */}
      <section className="border-b border-line-dark px-8 py-24 md:py-32">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-8 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="eyebrow">Institucional · Imprensa</span>
          </div>
          <h1 className="mb-8 max-w-3xl font-serif text-5xl font-medium leading-[1.04] tracking-tight md:text-[76px]">
            Informações para a{" "}
            <em className="italic text-gold-soft">imprensa</em>.
          </h1>
          <p className="max-w-[600px] text-lg font-light leading-relaxed text-sepia">
            Para jornalistas, pesquisadores e veículos que desejam cobrir a
            categoria Cliente Mídia™, o varejo premium brasileiro ou a
            transformação do modelo de distribuição orgânica.
          </p>
        </div>
      </section>

      {/* DADOS DO PORTAL */}
      <section className="border-b border-line-dark bg-ink-deep px-8 py-20">
        <div className="mx-auto max-w-[1240px]">
          <span className="eyebrow mb-10 block">O portal em números</span>
          <div className="grid border-t border-line-dark md:grid-cols-4">
            {DADOS.map((d, i) => (
              <div
                key={d.label}
                className={`px-0 py-10 md:px-10 ${i > 0 ? "border-t border-line-dark md:border-l md:border-t-0" : ""}`}
              >
                <div className="mb-3 font-serif text-4xl font-medium text-gold md:text-5xl">
                  {d.valor}
                </div>
                <p className="text-sm text-sepia">{d.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE A CATEGORIA */}
      <section className="border-b border-line-dark px-8 py-24">
        <div className="mx-auto max-w-[1240px] grid gap-20 md:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="eyebrow mb-6 block">Contexto editorial</span>
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight md:text-[40px]">
              O que é o portal Cliente Mídia™.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-sepia">
            <p>
              O portal clientemidia.com.br é o Centro de Autoridade da categoria
              Cliente Mídia™ no Brasil — um modelo editorial que documenta,
              pesquisa e torna pública a transformação do varejo premium em uma
              nova era de distribuição orgânica.
            </p>
            <p>
              A tese central: as lojas de moda premium brasileiras estão
              estruturalmente dependentes de plataformas de mídia paga cujos
              custos crescem todo ano, cujo alcance não pertence à marca e cujo
              retorno se deteriora à medida que a concorrência aumenta. A saída
              está na própria base de clientes — transformada em canal ativo de
              distribuição.
            </p>
            <p>
              O portal é mantido pela equipe da Viralize Luxo, plataforma
              especializada na implementação do modelo Cliente Mídia™ no varejo
              premium brasileiro.
            </p>
          </div>
        </div>
      </section>

      {/* PAUTAS SUGERIDAS */}
      <section className="border-b border-line-dark px-8 py-24">
        <div className="mx-auto max-w-[1240px]">
          <span className="eyebrow mb-10 block">Pautas sugeridas</span>
          <div className="grid gap-px border border-line-dark md:grid-cols-2">
            {[
              {
                tema: "O impacto tributário de 2026 no varejo de moda",
                desc: "A reforma tributária encareou os Meta Ads em 12,15% a partir de janeiro de 2026. O que isso significa para as margens do varejo premium?"
              },
              {
                tema: "Cliente Mídia™ como categoria emergente",
                desc: "Como uma nova forma de pensar distribuição está sendo construída no Brasil — e por que ela é diferente de influencer marketing e UGC."
              },
              {
                tema: "O fim do alcance alugado no varejo premium",
                desc: "Por que lojas de moda premium estão migrando de estratégias de mídia paga para infraestrutura de distribuição própria."
              },
              {
                tema: "A dependência estrutural do varejo brasileiro de Meta Ads",
                desc: "Análise da concentração de investimento em publicidade digital no varejo de moda e os riscos sistêmicos do modelo."
              }
            ].map((p) => (
              <div key={p.tema} className="bg-ink p-10">
                <h3 className="mb-3 font-serif text-xl font-medium leading-snug">
                  {p.tema}
                </h3>
                <p className="text-sm leading-relaxed text-sepia">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1240px] grid gap-12 md:grid-cols-2">
          <div>
            <span className="eyebrow mb-6 block">Contato para imprensa</span>
            <h2 className="mb-6 font-serif text-3xl font-medium leading-tight md:text-[40px]">
              Fale com a equipe editorial.
            </h2>
            <p className="mb-8 text-base leading-relaxed text-sepia">
              Respondemos solicitações de pauta, entrevistas, dados de pesquisa
              e materiais de apoio em até 48 horas úteis.
            </p>
            <div className="space-y-4">
              <div>
                <p className="mb-1 text-[11px] uppercase tracking-eyebrow text-gold">
                  E-mail de imprensa
                </p>
                <a
                  href="mailto:imprensa@clientemidia.com.br"
                  className="font-serif text-xl text-cream-warm hover:text-gold transition-colors"
                >
                  imprensa@clientemidia.com.br
                </a>
              </div>
              <div>
                <p className="mb-1 text-[11px] uppercase tracking-eyebrow text-gold">
                  Contato geral
                </p>
                <a
                  href="mailto:contato@clientemidia.com.br"
                  className="text-cream-warm hover:text-gold transition-colors"
                >
                  contato@clientemidia.com.br
                </a>
              </div>
            </div>
          </div>
          <div className="border border-line-dark p-10">
            <h3 className="mb-6 text-[11px] font-medium uppercase tracking-eyebrow text-gold">
              Kit de imprensa inclui
            </h3>
            <ul className="space-y-4 text-sm leading-relaxed text-sepia">
              {[
                "Dados de mercado sobre publicidade digital no varejo brasileiro",
                "Definição oficial da categoria Cliente Mídia™",
                "Contexto sobre o impacto da reforma tributária de 2026",
                "Porta-voz disponível para entrevistas",
                "Logotipo e identidade visual em alta resolução"
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-px w-4 shrink-0 bg-gold-deep" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href="mailto:imprensa@clientemidia.com.br?subject=Solicitação de kit de imprensa"
                className="btn-primary inline-block"
              >
                Solicitar kit de imprensa →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
