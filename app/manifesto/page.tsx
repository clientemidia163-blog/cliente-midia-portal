import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata = {
  title: "Manifesto",
  description:
    "Sua loja investe em alcance. Mas o alcance não é seu. O manifesto que nomeou a categoria Cliente Mídia™ no varejo premium brasileiro."
};

const SECTIONS = [
  {
    eyebrow: "01",
    title: "O acordo que o varejo fez sem perceber",
    paragraphs: [
      "Em algum momento da última década, o varejo brasileiro aceitou um acordo silencioso com as grandes plataformas digitais. O acordo dizia o seguinte: você nos paga, e nós te conectamos com clientes.",
      "Parecia razoável. Era até lucrativo, por um tempo. Mas havia uma cláusula no contrato que ninguém leu com atenção:",
      "**O alcance nunca foi seu. Era alugado.**",
      "Cada vez que você parava de pagar, você desaparecia. Cada vez que o algoritmo mudava, seu alcance encolhia. Cada vez que mais concorrentes entravam na plataforma, o custo do seu espaço subia."
    ]
  },
  {
    eyebrow: "02",
    title: "Os números que ninguém quer ver",
    paragraphs: [
      "Em 2024, o Brasil investiu **R$ 8,68 bilhões** em publicidade digital — e esse número cresce cerca de 14,5% ao ano. Parte expressiva está no varejo de moda.",
      "Em janeiro de 2026, a conta ficou mais cara de forma abrupta e permanente. A Meta passou a repassar PIS/COFINS (9,25%) e ISS (2,9%) aos anunciantes brasileiros. O resultado: **+12,15%** de aumento imediato no custo de todos os anúncios no Instagram e Facebook no Brasil.",
      "Para quem investe R$ 5.000/mês em mídia paga, são R$ 607,50 a mais. Todo mês. Sem nenhum clique adicional, nenhuma impressão a mais. Só imposto.",
      "Não é uma flutuação. É um novo patamar."
    ]
  },
  {
    eyebrow: "03",
    title: "O que o anúncio não compra",
    paragraphs: [
      "Quando você investe em tráfego pago, você compra impressões e cliques. Isso é tudo.",
      "Você não está comprando relacionamento. Não está comprando memória de marca. Não está comprando o tipo de conexão que faz um cliente indicar sua loja para contatos no WhatsApp.",
      "Pesquisa do EmbedSocial: **92% dos consumidores confiam mais em recomendações de outros usuários** do que em anúncios tradicionais.",
      "Enquanto você investe cada vez mais para aparecer para pessoas que desconfiam do que você diz, existe um canal inteiro — construído sobre confiança real — que a maioria das lojas está ignorando."
    ]
  },
  {
    eyebrow: "04",
    title: "A saída tem nome",
    paragraphs: [
      "**Cliente Mídia™** é o nome de uma nova categoria no varejo premium brasileiro. É o modelo em que os próprios clientes da loja se tornam canais ativos de distribuição da marca — de forma orgânica, espontânea e contínua.",
      "Não é influencer. Não é UGC contratado. Não é campanha. É o seu cliente — homem ou mulher — que comprou na sua loja, se apaixonou pela experiência e quis mostrar isso para o mundo.",
      "Não é uma campanha. É uma infraestrutura. Não é uma ação de marketing. É uma nova forma de crescer. Não é o futuro. Está acontecendo agora."
    ]
  }
];

export default function ManifestoPage() {
  return (
    <main>
      <Header />

      <section className="border-b border-line-dark px-8 py-24 md:py-32">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-10 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="eyebrow">Manifesto · Edição inaugural · Maio 2026</span>
          </div>
          <h1 className="mb-10 font-serif text-5xl font-medium leading-[1.04] tracking-tight md:text-[88px]">
            Sua loja investe em alcance.<br />
            Mas o alcance <em className="italic text-gold-soft">não é seu</em>.
          </h1>
          <p className="text-2xl font-light leading-snug text-sepia md:text-[28px]">
            O manifesto que nomeou a categoria Cliente Mídia™ — e o problema estrutural do
            varejo premium brasileiro que ela vem resolver.
          </p>
        </div>
      </section>

      <section className="px-8 py-24">
        <div className="mx-auto max-w-[760px] space-y-24">
          {SECTIONS.map((s) => (
            <div key={s.eyebrow}>
              <div className="mb-6 font-serif text-sm italic text-gold">{s.eyebrow}</div>
              <h2 className="mb-10 font-serif text-3xl font-medium leading-tight md:text-[44px]">
                {s.title}
              </h2>
              {s.paragraphs.map((p, i) => {
                const html = p.replace(/\*\*(.+?)\*\*/g, '<strong class="font-medium text-cream">$1</strong>');
                return (
                  <p
                    key={i}
                    className="mb-7 text-[18px] leading-[1.78] text-cream-warm"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream px-8 py-32 text-ink-elevated">
        <div className="mx-auto max-w-[820px] text-center">
          <blockquote className="font-serif text-3xl italic leading-tight md:text-[52px]">
            &ldquo;O maior ativo do varejo premium não está nos anúncios.<br />
            Está nas <span className="not-italic font-medium text-gold-deep">pessoas que já te escolheram</span>.&rdquo;
          </blockquote>
        </div>
      </section>

      <section className="px-8 py-24">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="mb-8 font-serif text-3xl font-medium leading-tight md:text-[44px]">
            Bem-vindo à <em className="italic text-gold-soft">era Cliente Mídia™</em>.
          </h2>
          <p className="mb-12 text-lg leading-relaxed text-sepia">
            Comece pelo que importa: o impacto disso na sua loja.
          </p>
          <div className="mb-8 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link href="/simulador" className="btn-primary">
              ✦ Simular impacto na minha loja →
            </Link>
            <Link href="/relatorio" className="btn-text">Baixar o Relatório 2026 →</Link>
          </div>
          <Link href="/artigos" className="text-sm text-dim hover:text-cream-warm">
            Ler todos os artigos →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
