import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { definedTermSetSchema } from "@/lib/jsonld";

export const metadata = {
  title: "Glossário — Cliente Mídia™",
  description:
    "Os termos da categoria Cliente Mídia™ definidos com precisão. Do CAC ao alcance orgânico — o vocabulário do novo varejo premium."
};

const TERMS = [
  {
    term: "Cliente Mídia™",
    definition:
      "Cliente que, além de comprar, torna-se canal ativo de distribuição orgânica da marca — gerando alcance, credibilidade e novas vendas a partir de sua própria rede. Não é influenciadora. Não é embaixadora contratada. É uma compradora real que escolhe compartilhar porque a experiência valeu o compartilhamento."
  },
  {
    term: "Alcance Orgânico",
    definition:
      "Visibilidade gerada sem investimento direto em mídia paga. No modelo Cliente Mídia™, o alcance orgânico é produzido pela rede de relacionamentos das clientes da loja — grupos de WhatsApp, conversas, indicações, menções espontâneas. Diferente do alcance pago, não desaparece quando você para de investir."
  },
  {
    term: "Alcance Alugado",
    definition:
      "Metáfora para a visibilidade obtida exclusivamente via plataformas pagas. É alugado porque você não o possui: ele existe enquanto você paga e desaparece quando você para. O custo do aluguel aumenta todo ano. A propriedade — sua base de clientes — não."
  },
  {
    term: "CAC (Custo de Aquisição de Cliente)",
    definition:
      "Valor total investido para conquistar um novo cliente. Inclui mídia paga, agência, produção criativa e qualquer custo diretamente associado à aquisição. No varejo premium, o CAC via mídia paga aumenta consistentemente à medida que mais concorrentes disputam os mesmos espaços publicitários."
  },
  {
    term: "Distribuição Orgânica",
    definition:
      "Modelo onde a distribuição da marca ocorre através das redes de relacionamento das próprias clientes, sem custo de mídia. Não é fruto do acaso — é uma infraestrutura deliberadamente construída para transformar a experiência de compra em combustível para indicações e menções."
  },
  {
    term: "UGC (User Generated Content)",
    definition:
      "Conteúdo criado por usuários ou clientes sobre uma marca. Diferente do Cliente Mídia™, o UGC é geralmente reativo e não estruturado — acontece quando o cliente quer, não quando a marca precisa. O modelo Cliente Mídia™ vai além do UGC: cria as condições para que o conteúdo e as indicações aconteçam de forma consistente."
  },
  {
    term: "Varejo Premium",
    definition:
      "Segmento do varejo caracterizado por ticket médio elevado, experiência de compra diferenciada e clientela com perfil de renda e exigência acima da média. No Brasil, inclui boutiques de moda, ateliês, marcas autorais e multi-marcas de posicionamento aspiracional. É o segmento onde o modelo Cliente Mídia™ tem maior potencial de aplicação."
  },
  {
    term: "Infraestrutura de Mídia Própria",
    definition:
      "Conjunto de ativos e processos que uma marca constrói para gerar distribuição sem depender de plataformas pagas. Inclui base de clientes segmentada, cadência de relacionamento, critérios de ativação e rituais de experiência que incentivam o compartilhamento espontâneo."
  },
  {
    term: "Tráfego Pago",
    definition:
      "Visitantes, seguidores ou audiência obtidos através de investimento direto em plataformas de anúncio (Meta Ads, Google Ads, TikTok Ads etc.). Altamente previsível no curto prazo, mas estruturalmente dependente de investimento contínuo. Em 2026, ficou 12,15% mais caro no Brasil devido ao repasse tributário da Meta."
  },
  {
    term: "NPS (Net Promoter Score)",
    definition:
      "Métrica que mede a propensão de um cliente a recomendar uma marca para outras pessoas. Clientes com NPS alto são candidatos naturais ao modelo Cliente Mídia™. No varejo premium, um NPS elevado é um ativo subaproveitado quando não existe infraestrutura para transformar lealdade em distribuição."
  },
  {
    term: "Funil de Consciência",
    definition:
      "Modelo que descreve a jornada de um potencial cliente desde o primeiro contato com a marca até a decisão de compra. O portal clientemidia.com.br opera como um funil de consciência: educa o leitor sobre o problema (dependência de mídia paga) antes de apresentar a solução (modelo Cliente Mídia™ via Viralize Luxo)."
  },
  {
    term: "Viralize Luxo",
    definition:
      "Plataforma que implementa o modelo Cliente Mídia™ na prática. Enquanto este portal documenta e educa sobre a categoria, a Viralize Luxo é a ferramenta que transforma a base de clientes de uma loja premium em um canal estruturado de distribuição orgânica."
  }
];

export default function GlossarioPage() {
  const ldGlossario = definedTermSetSchema(
    TERMS.map((t) => ({ term: t.term, definition: t.definition }))
  );

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldGlossario) }} />
      <Header />

      {/* HERO */}
      <section className="border-b border-line-dark px-8 py-24 md:py-32">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-8 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="eyebrow">Recursos · Glossário</span>
          </div>
          <h1 className="mb-8 max-w-3xl font-serif text-5xl font-medium leading-[1.04] tracking-tight md:text-[76px]">
            O vocabulário da nova{" "}
            <em className="italic text-gold-soft">distribuição</em>.
          </h1>
          <p className="max-w-[620px] text-lg font-light leading-relaxed text-sepia">
            Uma nova categoria precisa de linguagem precisa. Aqui estão os
            termos essenciais do modelo Cliente Mídia™ — definidos sem
            ambiguidade para quem opera varejo premium no Brasil.
          </p>
        </div>
      </section>

      {/* GLOSSARY */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="divide-y divide-line-dark">
            {TERMS.map((item) => (
              <div key={item.term} className="grid gap-8 py-12 md:grid-cols-[280px_1fr]">
                <div>
                  <h2 className="font-serif text-2xl font-medium leading-tight text-gold-soft md:text-[28px]">
                    {item.term}
                  </h2>
                </div>
                <p className="text-base leading-relaxed text-sepia md:text-lg">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line-dark bg-ink-deep px-8 py-24">
        <div className="mx-auto max-w-[880px] text-center">
          <p className="mb-6 text-sm uppercase tracking-eyebrow text-gold">
            Quer ver o modelo em números?
          </p>
          <h2 className="mb-8 font-serif text-3xl font-medium leading-tight md:text-[42px]">
            Simule o impacto na sua loja.
          </h2>
          <a
            href="/simulador"
            className="btn-primary inline-block"
          >
            ✦ Abrir o simulador →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
