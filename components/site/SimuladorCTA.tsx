import Link from "next/link";

type Variant = "article" | "pillar" | "compact";

type Props = {
  variant?: Variant;
  /** Opcional: contexto que ancora o CTA — ex: "Depois deste artigo". */
  contextLabel?: string;
};

/**
 * SimuladorCTA — bloco editorial que conduz o leitor ao Simulador Cliente Mídia™.
 *
 * Hierarquia de conversão (Fase 7):
 *   1º  /simulador  — destino primário (ferramenta interativa, mantém no portal)
 *   2º  viralizeluxo.com.br — destino secundário (plataforma comercial)
 *
 * Three variants:
 *   - article (default): bloco completo para final de artigo
 *   - pillar: bloco para final da página de pilar
 *   - compact: linha enxuta para sidebar / meio de artigo
 */
export function SimuladorCTA({ variant = "article", contextLabel }: Props) {
  if (variant === "compact") {
    return (
      <aside className="my-12 flex flex-col gap-4 border border-line-dark bg-ink-elevated p-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 text-[10px] font-medium uppercase tracking-eyebrow text-gold">
            Ferramenta gratuita
          </div>
          <p className="text-base text-cream-warm">
            Simule o impacto do modelo Cliente Mídia™ na sua loja em 3 passos.
          </p>
        </div>
        <Link
          href="/simulador"
          className="inline-flex shrink-0 items-center gap-2 self-start border-b border-gold pb-1 text-[12px] font-medium uppercase tracking-wider text-gold hover:opacity-80 sm:self-auto"
        >
          Abrir simulador →
        </Link>
      </aside>
    );
  }

  return (
    <section
      className={`${
        variant === "pillar"
          ? "border-t border-line-dark bg-ink-deep"
          : "border-y border-line-dark"
      } px-8 py-20 md:py-24`}
    >
      <div className="mx-auto max-w-[920px]">
        <div className="mb-8 inline-flex items-center gap-3">
          <span className="h-px w-8 bg-gold" />
          <span className="eyebrow">
            {contextLabel ?? "Da leitura à decisão"}
          </span>
        </div>

        <h3 className="mb-8 max-w-[680px] font-serif text-3xl font-medium leading-tight md:text-[44px]">
          Simule o impacto do modelo{" "}
          <em className="italic text-gold-soft">na sua loja</em>.
        </h3>

        <p className="mb-10 max-w-[640px] text-lg leading-relaxed text-sepia">
          Coloque três números que você já sabe de cabeça — clientes/mês, gasto
          em mídia e ticket médio. Em 60 segundos a ferramenta mostra o alcance
          orgânico potencial, o custo por pessoa alcançada e o comparativo
          contra Meta Ads. <strong className="font-medium text-cream-warm">É gratuito e funciona pela sua própria realidade.</strong>
        </p>

        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Link href="/simulador" className="btn-primary">
            Simular impacto na minha loja →
          </Link>
          <a
            href="https://viralizeluxo.com.br"
            target="_blank"
            rel="noreferrer"
            className="btn-text"
          >
            Conhecer a Viralize Luxo ↗
          </a>
        </div>

        <p className="mt-8 max-w-[520px] text-xs leading-relaxed text-dim">
          O simulador é uma ferramenta editorial do Centro de Autoridade
          Cliente Mídia™ — a Viralize Luxo é a plataforma que operacionaliza
          o modelo na sua loja.
        </p>
      </div>
    </section>
  );
}
