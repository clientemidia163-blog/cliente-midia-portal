import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata = {
  title: "Política Editorial — Cliente Mídia™",
  description:
    "Como o conteúdo do portal Cliente Mídia™ é produzido, revisado e publicado. Transparência total sobre metodologia, uso de IA e independência editorial."
};

const SECTIONS = [
  {
    titulo: "1. Missão editorial",
    texto: `O portal clientemidia.com.br tem como missão documentar, pesquisar e tornar pública a categoria Cliente Mídia™ no varejo premium brasileiro. Todo o conteúdo publicado é orientado por um único critério: ser genuinamente útil para donos e gestores de lojas de moda premium que buscam entender e implementar modelos de distribuição orgânica.

O portal não é um canal de entretenimento. Não é um blog de tendências. É um centro de autoridade — e toda decisão editorial segue esse propósito.`
  },
  {
    titulo: "2. Processo de produção",
    texto: `O conteúdo do portal é produzido por um pipeline editorial que combina pesquisa assistida por inteligência artificial com revisão humana obrigatória.

Etapas do processo:

1. Pesquisa de mercado — realizada com ferramentas de busca especializadas (Tavily) para coletar dados, relatórios e notícias recentes sobre o tema do artigo.

2. Redação assistida por IA — o rascunho inicial é gerado por um modelo de linguagem de grande escala com base nos dados coletados e nas diretrizes editoriais do portal.

3. Revisão editorial — todo rascunho gerado automaticamente é salvo como rascunho no sistema de gerenciamento de conteúdo e revisado pela equipe editorial antes de qualquer publicação.

4. Aprovação e publicação — apenas conteúdo aprovado pela equipe editorial chega aos leitores.

Nenhum artigo é publicado automaticamente sem revisão humana.`
  },
  {
    titulo: "3. Uso de inteligência artificial",
    texto: `O portal Cliente Mídia™ utiliza inteligência artificial como ferramenta editorial — não como substituto do julgamento editorial humano.

O uso de IA é transparente e limitado às seguintes funções:
— Pesquisa e curadoria de dados públicos
— Redação de rascunhos iniciais a partir de briefings editoriais
— Geração de imagens de capa com base em diretrizes visuais da marca

Todos os dados citados nos artigos são verificados antes da publicação. Dados fabricados ou não verificáveis são removidos na revisão. Quando um dado não pode ser verificado com precisão, o artigo é reestruturado para prescindir dele.

A identidade editorial — voz, tom, posicionamento, argumento central — é sempre humana.`
  },
  {
    titulo: "4. Fontes e dados",
    texto: `O portal cita fontes sempre que apresenta dados quantitativos. O formato padrão de citação é: Nome da fonte · Ano (ex: "EmbedSocial · 2024").

Fontes aceitas: relatórios de institutos de pesquisa, publicações acadêmicas, dados oficiais de plataformas, veículos jornalísticos de referência e pesquisa primária própria.

Fontes não aceitas: dados sem origem rastreável, estimativas de terceiros sem metodologia declarada, fontes anônimas para afirmações quantitativas.

Quando um dado não pode ser verificado, ele não é publicado. Quando há incerteza sobre um número, isso é explicitado no texto.`
  },
  {
    titulo: "5. Independência editorial e conflito de interesses",
    texto: `O portal clientemidia.com.br é mantido pela equipe da Viralize Luxo, plataforma que implementa o modelo Cliente Mídia™. Essa relação é pública e declarada.

Como consequência, o portal tem interesse declarado na disseminação do modelo Cliente Mídia™. Esse interesse não compromete a integridade dos dados e análises publicados — mas deve ser considerado pelo leitor ao avaliar o conteúdo.

Política de menção comercial: a Viralize Luxo pode ser mencionada nos artigos do portal como solução prática para o problema discutido. Essa menção ocorre no máximo uma vez por artigo, sempre no final, sempre como consequência natural do argumento — nunca como premissa.

O portal não aceita conteúdo patrocinado de terceiros. Não há espaços publicitários para venda. Não existe relação editorial com anunciantes.`
  },
  {
    titulo: "6. Correções e atualizações",
    texto: `Erros factuais identificados após a publicação são corrigidos com transparência. A correção é indicada no corpo do artigo, com nota explicando o que foi alterado e quando.

Atualizações de conteúdo — para incorporar novos dados ou desenvolvimentos relevantes — são indicadas com a data de atualização ao lado da data de publicação original.

Para reportar um erro, escreva para: contato@clientemidia.com.br com o assunto "Correção editorial".`
  },
  {
    titulo: "7. Direitos autorais",
    texto: `Todo o conteúdo publicado neste portal — textos, imagens, dados organizados e identidade visual — é de propriedade do portal clientemidia.com.br e da Viralize Luxo.

É permitida a reprodução parcial de trechos para fins jornalísticos, acadêmicos ou educacionais, desde que citada a fonte com link para o artigo original.

Reprodução integral sem autorização é vedada. Para solicitar autorização de uso, escreva para: contato@clientemidia.com.br.`
  }
];

export default function PoliticaEditorialPage() {
  return (
    <main>
      <Header />

      {/* HERO */}
      <section className="border-b border-line-dark px-8 py-24 md:py-32">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-8 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="eyebrow">Institucional · Política Editorial</span>
          </div>
          <h1 className="mb-8 max-w-3xl font-serif text-5xl font-medium leading-[1.04] tracking-tight md:text-[72px]">
            Como este portal{" "}
            <em className="italic text-gold-soft">funciona</em>.
          </h1>
          <p className="max-w-[600px] text-lg font-light leading-relaxed text-sepia">
            Transparência total sobre como o conteúdo do portal Cliente Mídia™
            é produzido, revisado, publicado e corrigido.
          </p>
          <p className="mt-4 text-sm text-sepia">
            Última atualização: maio de 2026
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-0 md:grid-cols-[280px_1fr]">
            {/* INDEX */}
            <aside className="hidden md:block">
              <div className="sticky top-8">
                <p className="mb-4 text-[11px] font-medium uppercase tracking-eyebrow text-gold">
                  Índice
                </p>
                <ul className="space-y-3">
                  {SECTIONS.map((s) => (
                    <li key={s.titulo}>
                      <a
                        href={`#${s.titulo.replace(/\s+/g, "-").toLowerCase()}`}
                        className="text-sm text-sepia hover:text-cream-warm transition-colors"
                      >
                        {s.titulo}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* SECTIONS */}
            <div className="divide-y divide-line-dark">
              {SECTIONS.map((s) => (
                <div
                  key={s.titulo}
                  id={s.titulo.replace(/\s+/g, "-").toLowerCase()}
                  className="py-12"
                >
                  <h2 className="mb-6 font-serif text-2xl font-medium leading-tight md:text-[28px]">
                    {s.titulo}
                  </h2>
                  <div className="space-y-4">
                    {s.texto.split("\n\n").map((par, i) => (
                      <p key={i} className="text-base leading-relaxed text-sepia whitespace-pre-line">
                        {par}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
