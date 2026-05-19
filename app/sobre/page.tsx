import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata = {
  title: "Sobre o Portal — Cliente Mídia™",
  description:
    "O Centro de Autoridade da categoria Cliente Mídia™ no Brasil. Documentamos a transformação do varejo premium em uma nova era de distribuição orgânica."
};

export default function SobrePage() {
  return (
    <main>
      <Header />

      {/* HERO */}
      <section className="border-b border-line-dark px-8 py-24 md:py-32">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-8 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="eyebrow">Institucional · Sobre o portal</span>
          </div>
          <h1 className="mb-8 max-w-4xl font-serif text-5xl font-medium leading-[1.04] tracking-tight md:text-[76px]">
            Uma nova categoria precisa de um{" "}
            <em className="italic text-gold-soft">centro de autoridade</em>.
          </h1>
          <p className="max-w-[680px] text-lg font-light leading-relaxed text-sepia">
            O portal clientemidia.com.br é o repositório editorial da categoria
            Cliente Mídia™ no Brasil. Não é um blog. Não é um canal de vendas.
            É o lugar onde uma nova forma de pensar distribuição no varejo
            premium está sendo documentada, pesquisada e tornada pública.
          </p>
        </div>
      </section>

      {/* MISSÃO */}
      <section className="border-b border-line-dark px-8 py-24">
        <div className="mx-auto max-w-[1240px] grid gap-20 md:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="eyebrow mb-6 block">Missão</span>
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight md:text-[42px]">
              Educar antes de vender.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-sepia">
            <p>
              O modelo Cliente Mídia™ é contra-intuitivo. Dizer a uma lojista
              que os seus melhores canais de marketing já estão dentro da sua
              base de clientes — e que ela está pagando para ignorá-los — exige
              evidência, argumentação e tempo.
            </p>
            <p>
              Este portal existe para fazer esse trabalho editorial antes de
              qualquer conversa comercial. Cada artigo, cada dado, cada análise
              publicada aqui tem um propósito: elevar o nível de consciência de
              quem opera varejo premium no Brasil.
            </p>
            <p>
              Quando uma lojista chega ao fim de um artigo desta plataforma e
              pensa{" "}
              <em className="italic text-cream-warm">
                &ldquo;isso faz sentido para o meu negócio&rdquo;
              </em>
              , a missão editorial foi cumprida.
            </p>
          </div>
        </div>
      </section>

      {/* PILARES */}
      <section className="border-b border-line-dark bg-ink-deep px-8 py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-16">
            <span className="eyebrow mb-4 block">Estrutura editorial</span>
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight md:text-[42px]">
              Cinco pilares. Um argumento.
            </h2>
          </div>
          <div className="grid gap-px border border-line-dark md:grid-cols-5">
            {[
              { num: "i.", title: "Diagnóstico", desc: "O problema do modelo atual." },
              { num: "ii.", title: "Categoria", desc: "O que é Cliente Mídia™." },
              { num: "iii.", title: "Pesquisa", desc: "A evidência empírica." },
              { num: "iv.", title: "Movimento", desc: "O futuro do varejo." },
              { num: "v.", title: "Método", desc: "Como implementar." }
            ].map((p) => (
              <div key={p.title} className="bg-ink p-8">
                <div className="mb-4 font-serif text-sm italic text-gold">{p.num}</div>
                <h3 className="mb-2 font-serif text-xl font-medium">{p.title}</h3>
                <p className="text-sm leading-relaxed text-sepia">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METODOLOGIA */}
      <section className="border-b border-line-dark px-8 py-24">
        <div className="mx-auto max-w-[1240px] grid gap-20 md:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="eyebrow mb-6 block">Metodologia</span>
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight md:text-[42px]">
              Como o conteúdo é produzido.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-sepia">
            <p>
              Todo artigo publicado neste portal passa por um processo editorial
              que combina pesquisa de mercado atualizada, dados públicos
              verificados e análise estratégica focada no varejo premium
              brasileiro.
            </p>
            <p>
              O pipeline editorial é assistido por inteligência artificial —
              pesquisa com Tavily, redação com modelos de linguagem de última
              geração, geração de imagem com Fal.ai — mas cada artigo é
              revisado e aprovado pelo time editorial antes de ser publicado.
            </p>
            <p>
              Tom: jornalístico, autoritário, nunca publicitário. Dados sempre
              com fonte citada. Opiniões editoriais claramente identificadas.
              O Viralize Luxo pode ser mencionado como solução — uma vez, no
              final, como consequência natural do argumento.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream px-8 py-32 text-ink-elevated">
        <div className="mx-auto max-w-[880px] text-center">
          <div className="mb-8 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold-deep" />
            <span className="text-[11px] font-medium uppercase tracking-eyebrow text-gold-deep">
              A plataforma que ativa o modelo
            </span>
            <span className="h-px w-10 bg-gold-deep" />
          </div>
          <h2 className="mb-6 font-serif text-4xl font-medium leading-tight tracking-tight md:text-5xl">
            O portal educa. A Viralize Luxo implementa.
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-[#5A544A]">
            Se você leu o suficiente e quer implementar o modelo Cliente Mídia™
            na sua loja, o próximo passo é a Viralize Luxo — a plataforma que
            transforma sua base de clientes em um canal ativo de distribuição.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/simulador" className="btn-primary">
              ✦ Simular impacto na minha loja →
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
