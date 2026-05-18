import { p, h2, h3, b, i, pullquote, dataPoint, type Block } from "./seed-helpers";

export type ArticleSeed = {
  slug: string;
  pillarSlug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  readingTime: number;
  featured?: boolean;
  body: Block[];
};

export const ARTICLES_SEED: ArticleSeed[] = [
  // ─────────────────────────────────────────────────────────────
  // PILAR 1 · DIAGNÓSTICO
  // ─────────────────────────────────────────────────────────────
  {
    slug: "o-fim-do-alcance-alugado",
    pillarSlug: "diagnostico",
    title: "O fim do alcance alugado.",
    subtitle:
      "Por que o varejo premium brasileiro precisa parar de alugar atenção e começar a construir presença.",
    excerpt:
      "Toda estratégia construída sobre algo que você não controla é uma estratégia com prazo de validade. Em 2026, o varejo de moda premium descobriu que esse prazo venceu.",
    readingTime: 12,
    featured: true,
    body: [
      p("Se você desligasse todos os seus anúncios hoje — Instagram, Facebook, Google — quantas pessoas descobririam sua loja amanhã?"),
      p("Se a resposta for ", b("quase ninguém"), ", você tem um problema estrutural. Não um problema de criativo. Não um problema de verba. Um problema de modelo."),
      p("Este artigo é sobre esse problema. E sobre o que vem depois dele."),

      h2("O acordo que o varejo fez sem perceber"),
      p("Em algum momento da última década, o varejo brasileiro aceitou um acordo silencioso com as grandes plataformas digitais. O acordo dizia o seguinte: você nos paga, e nós te conectamos com clientes."),
      p("Parecia razoável. Era até lucrativo, por um tempo. Mas havia uma cláusula no contrato que ninguém leu com atenção:"),
      pullquote("O alcance nunca foi seu. Era alugado."),
      p("Cada vez que você parava de pagar, você desaparecia. Cada vez que o algoritmo mudava, seu alcance encolhia. Cada vez que mais concorrentes entravam na plataforma, o custo do seu espaço subia."),
      p("Você não estava construindo uma audiência. Estava alugando atenção. E como todo aluguel, o preço só sobe."),

      h2("Os números que ninguém quer ver"),
      p("Em 2024, o Brasil investiu cerca de US$ 8,68 bilhões em publicidade digital — e esse número cresce aproximadamente 14,5% ao ano. Parte expressiva desse volume está no varejo de moda."),
      p("Em janeiro de 2026, a conta ficou mais cara de forma abrupta e permanente. A Meta passou a repassar aos anunciantes brasileiros os tributos que antes absorvia internamente — PIS/COFINS (9,25%) e ISS (2,9%). O resultado: um aumento imediato de ", b("12,15%"), " no custo de todos os anúncios no Instagram e Facebook no Brasil."),
      dataPoint("+12,15%", "Aumento no custo dos Meta Ads a partir de janeiro de 2026", "Meta · janeiro 2026"),
      p("Para quem investe R$ 5.000 por mês em mídia paga, isso significa R$ 607,50 a mais todo mês. Sem nenhum clique adicional, nenhuma impressão a mais, nenhum cliente novo incluído no pacote. Só imposto."),
      p("E o que torna esse aumento especialmente grave não é o percentual em si. É o que ele representa: uma mudança ", b("estrutural e permanente"), " no piso de custos da publicidade digital no Brasil. Não é uma flutuação de mercado. É um novo patamar."),

      h2("O que o anúncio compra — e o que não compra"),
      p("Quando você investe em tráfego pago, você está comprando impressões e cliques. Isso é tudo."),
      p("Você não está comprando relacionamento. Não está comprando memória de marca. Não está comprando o tipo de conexão que faz uma cliente te indicar para três amigas no grupo de WhatsApp."),
      p("A publicidade digital é extraordinariamente eficiente em gerar tráfego no curto prazo. Mas tem um problema fundamental, que os dados confirmam: a decisão de compra raramente vem do anúncio. Vem da confiança."),
      dataPoint("92%", "dos consumidores confiam mais em pessoas reais do que em anúncios tradicionais", "EmbedSocial · 2024"),
      p("Enquanto você investe cada vez mais para aparecer para pessoas que desconfiam do que você diz, existe um canal inteiro — construído sobre confiança real — que a maioria das lojas está ignorando. Esse canal são os seus próprios clientes."),

      h2("A armadilha em três atos"),
      h3("Ato 1 — A dependência se instala"),
      p("Uma loja começa a anunciar. Os resultados chegam rápido. As vendas sobem. A lojista aumenta o orçamento. As vendas sobem mais. Tudo parece funcionar. Então ela para os anúncios por dois meses — talvez por férias, talvez por teste. As vendas despencam."),
      p("Nesse momento, sem perceber, ela deixou de ser dona da sua distribuição. Tornou-se dependente de um canal que ela não controla."),

      h3("Ato 2 — O custo sobe, o retorno cai"),
      p("Com mais concorrentes anunciando nos mesmos espaços, o leilão encarece. O CAC sobe consistentemente. Para manter o mesmo volume de vendas, a loja precisa investir mais. A margem comprime. A dependência aumenta."),

      h3("Ato 3 — A plataforma muda as regras"),
      p("Vem o golpe que ninguém esperava: uma mudança de algoritmo, uma nova política de privacidade, uma reforma tributária que aumenta o custo 12,15% da noite para o dia. A loja, que construiu toda a sua estratégia de crescimento sobre uma estrutura que não controla, se vê refém de decisões tomadas em escritórios em San Francisco."),
      pullquote("Organizações que não sabem gerar demanda sem apertar o botão promover estão presas em uma jaula fiscal e estratégica."),

      h2("Por que o varejo premium é especialmente vulnerável"),
      p("Existe uma ironia cruel no varejo de moda de alto padrão. As lojas que mais precisam construir marca — que mais precisam de presença, de memória, de desejo — são exatamente as que mais sofrem com a lógica dos anúncios pagos."),
      p(b("Primeira razão:"), " o produto emocional não performa bem em leilão. Moda premium é um produto de desejo, de inspiração, de aspiração. Esse tipo de compra começa com uma emoção, não com uma pesquisa. E emoções não são ativadas por banners."),
      p(b("Segunda razão:"), " a cliente do varejo premium tem alta resistência a publicidade óbvia. A mulher que tem poder de compra para frequentar uma boutique de alto padrão é exatamente a pessoa que mais desenvolveu filtros para anúncios."),
      p(b("Terceira razão:"), " o custo por aquisição no segmento premium é alto e a margem não comporta desperdício. Uma campanha que converte mal em um produto de R$ 50 é um problema. Em um produto de R$ 800, é uma catástrofe para o fluxo de caixa."),

      h2("O que existe do outro lado"),
      p("Até aqui, este artigo descreveu um problema. Mas problemas sem saída são apenas queixas. Existe uma saída."),
      p("O conteúdo gerado por usuários é capaz de gerar até ", b("11 vezes mais retorno"), " sobre o investimento em comparação com anúncios tradicionais, segundo levantamento da Nuvemshop com base em dados da BrandLovers. E oito em cada dez brasileiros confiam mais em recomendações de fãs do que em publicidade convencional."),
      p("Mas aqui está o ponto que a maioria das análises sobre UGC ignora: o conteúdo gerado pelo usuário não acontece por acidente. Ele acontece quando a experiência é extraordinária o suficiente para que a pessoa queira mostrar ao mundo."),
      pullquote("Quando uma pessoa se sente extraordinária, ela quer que o mundo saiba."),
      p("Sua cliente, quando se sente verdadeiramente especial — quando se olha e pensa eu estou incrível — não precisa ser convencida a compartilhar. Ela quer. É um impulso natural. É o boca a boca digitalizado com alcance exponencial."),

      h2("A categoria que nomeia a saída"),
      p(b("Cliente Mídia™"), " é o nome da categoria que documenta esse modelo. Não é campanha. Não é ação de marketing. É infraestrutura de distribuição orgânica construída sobre a experiência real das clientes."),
      p("No modelo Cliente Mídia™, sua cliente não é apenas o destino da sua comunicação. Ela é o meio. Ela é o canal. Ela é a mídia."),
      p("E diferente de qualquer anúncio que você possa comprar, ela carrega uma coisa que nenhum orçamento consegue comprar: credibilidade pessoal."),

      h2("Conclusão"),
      p("O alcance alugado tem prazo de validade. Os custos sobem. O retorno cai. A dependência aumenta. E cada vez que as plataformas mudam as regras, o varejo que não construiu canais próprios volta à estaca zero."),
      p("Isso não significa que os anúncios vão desaparecer. Significa que anúncio pago deve ser ", b("um acelerador, não uma fundação"), ". Deve amplificar o que você já tem, não substituir o que você ainda não construiu."),
      p("E o que você precisa construir é simples: um modelo em que as pessoas que já te amam trabalham para te apresentar a quem ainda não te conhece.")
    ]
  },
  {
    slug: "verdadeiro-custo-do-cac-no-varejo-2026",
    pillarSlug: "diagnostico",
    title: "O verdadeiro custo do CAC no varejo de moda em 2026.",
    subtitle:
      "Uma análise das margens, da inflação dos leilões e do que cada nova cliente realmente custa hoje no Brasil.",
    excerpt:
      "O custo de aquisição de clientes no varejo de moda subiu mais de 60% em cinco anos. E ele continua subindo. A conta não fecha mais — e este é o motivo.",
    readingTime: 10,
    body: [
      p("Toda lojista de moda premium sabe quanto custa o aluguel, a folha, o estoque e o cartão. Pouquíssimas sabem, com precisão, quanto custa ", b("a próxima cliente"), "."),
      p("Esse número — o CAC, custo de aquisição de cliente — virou nos últimos cinco anos a variável mais importante e menos compreendida do varejo de moda brasileiro. Este artigo tenta colocar luz sobre ela."),

      h2("O número escondido na conta de luz"),
      p("Quando a lojista olha o demonstrativo financeiro, o CAC raramente aparece como linha autônoma. Ele está diluído entre marketing, vendas, comissões e taxas de plataforma. Mas se você juntar tudo o que foi gasto para fazer uma cliente nova entrar na loja, dividido pelo número de clientes novas, o número costuma assustar."),
      p("Para o varejo de moda premium brasileiro em 2026, o CAC médio via mídia paga oscila entre ", b("R$ 180 e R$ 420 por cliente nova"), " — dependendo do ticket médio, da região, do produto, do nicho. E esse intervalo subiu cerca de 60% nos últimos cinco anos."),
      dataPoint("R$ 180 a R$ 420", "Faixa estimada de CAC via mídia paga no varejo de moda premium em 2026"),

      h2("Por que o leilão encarece sozinho"),
      p("Os anúncios no Instagram, Facebook e Google funcionam por leilão. Cada espaço — cada impressão para uma pessoa específica em um momento específico — é vendido para o anunciante que pagar mais."),
      p("Quando mais lojas anunciam para o mesmo público, o leilão fica mais caro. Não por inflação geral. Não por mudança de algoritmo. Por matemática de leilão. Quem entra depois paga mais para conseguir o mesmo espaço."),
      pullquote("Cada novo concorrente que começa a anunciar aumenta seu CAC. Mesmo que você não mude nada."),
      p("Esse é o efeito que faz o CAC subir mesmo quando a loja mantém o orçamento, o criativo, a oferta — e tudo o mais. O custo do anúncio não está sob o controle da lojista. Está sob o controle do conjunto de concorrentes."),

      h2("A reforma tributária de 2026"),
      p("Em janeiro de 2026, a Meta passou a repassar tributos PIS/COFINS (9,25%) e ISS (2,9%) aos anunciantes brasileiros, somando 12,15% de aumento permanente."),
      p("Para uma loja que investe R$ 5.000/mês em Meta Ads e tem CAC de R$ 300, esse aumento sozinho empurra o CAC para cerca de R$ 336 — antes mesmo de considerar o crescimento orgânico dos leilões."),

      h2("Por que isso quebra o varejo premium especificamente"),
      p("No varejo de massa, um CAC de R$ 200 pode ser absorvido — o ticket médio é alto, a recompra é rápida, o LTV se dilui. No varejo premium de boutique de moda, o ciclo é diferente: as clientes não voltam tão frequentemente, o ticket é mais alto mas o volume é menor, e a margem opera em faixas mais apertadas do que parece."),
      p("Quando o CAC encosta nos 30% do primeiro ticket, o ROI da primeira venda fica próximo de zero. A loja só ganha dinheiro na ", b("segunda compra"), ". E essa segunda compra depende de uma coisa que o anúncio não compra: relacionamento."),

      h2("O paradoxo da escala"),
      p("Quanto mais você investe em mídia paga, mais o seu CAC tende a subir. Porque você está saindo dos públicos quentes (os mais propensos a comprar) e indo para públicos cada vez mais frios. Cada R$ 1.000 adicional traz menos clientes do que o anterior."),
      p("É a inversão da economia de escala: aqui, escalar custa mais por unidade. E a única saída desse paradoxo é construir um canal que não opere por leilão."),

      h2("O canal que não tem leilão"),
      p("Indicação não tem leilão. Boca a boca digital não tem leilão. Cliente postando no Instagram dela uma foto na sua loja não tem leilão."),
      p("Esses canais têm um CAC que não pode ser comparado diretamente com mídia paga — porque o custo está embutido na experiência da loja, não em um orçamento publicitário. Mas quando você calcula o CAC efetivo de uma cliente nova que veio por indicação de uma cliente atual, o número costuma ser ", b("entre 5 e 15 vezes menor"), " do que o CAC pago."),
      pullquote("A diferença de CAC entre mídia paga e indicação orgânica é o tamanho da oportunidade ignorada."),
      p("É essa diferença que a categoria Cliente Mídia™ documenta. E é por isso que ela passa a fazer sentido econômico, não apenas estratégico, exatamente agora.")
    ]
  },
  {
    slug: "jaula-fiscal-do-instagram",
    pillarSlug: "diagnostico",
    title: "A jaula fiscal do Instagram.",
    subtitle:
      "Como o repasse de PIS/COFINS e ISS transformou a publicidade digital em um novo patamar permanente de custos.",
    excerpt:
      "Em janeiro de 2026, o custo de anunciar no Instagram subiu 12,15% — e nunca mais vai voltar ao que era. O que isso significa para o varejo premium.",
    readingTime: 8,
    body: [
      p("Houve um instante em janeiro de 2026 — silencioso, sem manchete de jornal, sem comoção — em que o piso de custos da publicidade digital no Brasil mudou para sempre."),
      p("A Meta, dona do Instagram e do Facebook, passou a repassar aos anunciantes brasileiros os tributos PIS/COFINS (9,25%) e ISS (2,9%). Foi adicionado 12,15% ao custo de cada anúncio. Não como promoção. Não como ajuste pontual. Como ", b("novo patamar permanente"), "."),

      h2("Por que isso é diferente de qualquer aumento anterior"),
      p("O CAC sobe há anos. O leilão encarece todo trimestre. O algoritmo muda. Nada disso é novo."),
      p("O que é novo é que dessa vez o aumento não veio do mercado, da concorrência ou da plataforma. Veio do governo, via plataforma. Não negociável. Não evitável. Não amortizável."),
      pullquote("Não é uma flutuação. É um novo patamar."),

      h2("O efeito composto sobre o varejo"),
      p("Para uma loja que investe R$ 5.000/mês em Meta Ads, são R$ 607,50 a mais. Por mês. Sem nenhum clique adicional. Para o ano: R$ 7.290 a mais. Apenas em tributos repassados."),
      p("Multiplique isso pelo tamanho do varejo de moda brasileiro, e o impacto agregado é da ordem de centenas de milhões de reais — desviados da operação, do estoque, do atendimento, e empurrados direto para o caixa da plataforma e do fisco."),

      h2("A jaula"),
      p("Empresas cresceram dependentes da mídia digital como forma de garantir tração. O marketing virou um centro de custo previsível baseado em cliques. O problema é estrutural: ", b("organizações que não sabem gerar demanda sem apertar o botão promover estão presas em uma jaula"), " — fiscal e estratégica."),
      p("Quem construiu um canal próprio sai dessa jaula. Quem não construiu, paga 12,15% a mais e descobre que esse não é o último aumento.")
    ]
  },
  {
    slug: "reforma-tributaria-novo-piso-meta-ads",
    pillarSlug: "diagnostico",
    title: "A reforma tributária e o novo piso dos Meta Ads.",
    subtitle:
      "O impacto permanente do PIS/COFINS e ISS sobre o custo da mídia paga — e o que isso significa para sua margem.",
    excerpt:
      "PIS/COFINS (9,25%) e ISS (2,9%) somam 12,15% e foram adicionados ao Instagram e Facebook em 2026. A análise técnica do que isso faz com o varejo.",
    readingTime: 7,
    body: [
      p("A reforma tributária brasileira de 2025 reescreveu o passo final da publicidade digital. A partir de janeiro de 2026, os tributos antes absorvidos internamente pelas plataformas passaram a ser repassados aos anunciantes."),
      p("Esta é a análise técnica do que mudou — e por que essa mudança é mais importante do que o número sugere."),

      h2("O que foi repassado"),
      p(b("PIS/COFINS"), ": 9,25% sobre o serviço de publicidade digital."),
      p(b("ISS"), ": 2,9% sobre o mesmo serviço (alíquota varia ligeiramente por município, mas a Meta padronizou)."),
      p(b("Total combinado"), ": 12,15% aplicado linearmente sobre o valor investido."),

      h2("Por que é permanente"),
      p("Diferente de mudanças de algoritmo, ajustes sazonais ou efeito de leilão, esse aumento é tributário. Não desaparece com criativos melhores. Não cai em períodos de baixa concorrência. Está embutido no contrato de prestação de serviço."),
      pullquote("Não há criativo que reverta um tributo."),

      h2("O efeito sobre margens já comprimidas"),
      p("Em moda premium, o varejo opera com margens líquidas que raramente passam de 12-18% depois de tudo somado. Um aumento de 12,15% sobre o orçamento de mídia paga consome diretamente entre 1 e 2 pontos percentuais da margem líquida — antes que qualquer outra variável seja considerada."),
      p("Para uma loja que tem 50% do faturamento atrelado a tráfego pago, esse impacto sobe ainda mais. E não há aumento de preço que recomponha sem queimar conversão."),

      h2("A consequência estratégica"),
      p("O movimento força uma decisão que vinha sendo adiada: ou a loja reduz a dependência de mídia paga, ou aceita que sua margem foi permanentemente perfurada. Não há terceira opção. E a redução de dependência só acontece com canais próprios — produto, experiência, base de clientes ativando-se como mídia.")
    ]
  },
  // ─── PILAR 2 · CATEGORIA ────────────────────────────────────
  {
    slug: "cliente-midia-definicao-oficial",
    pillarSlug: "categoria",
    title: "Cliente Mídia™ — a definição oficial.",
    subtitle:
      "A nomenclatura, a infraestrutura e os limites da categoria que está sendo construída no varejo premium brasileiro.",
    excerpt:
      "Toda categoria nova precisa, antes de qualquer coisa, ser nomeada com precisão. Este é o documento canônico da Cliente Mídia™.",
    readingTime: 9,
    featured: true,
    body: [
      p("Toda categoria nova precisa, antes de qualquer coisa, ser nomeada com precisão. Antes do método, antes da ferramenta, antes do estudo de caso, vem o nome. Este artigo é o documento canônico desse nome."),

      h2("A definição"),
      pullquote("Cliente Mídia™ é o modelo em que os próprios clientes da loja se tornam canais ativos de distribuição da marca — de forma orgânica, espontânea e contínua."),
      p("Quatro palavras nessa frase carregam o peso da definição. ", b("Canais ativos"), " — porque o cliente faz, não apenas recebe. ", b("Distribuição"), " — porque o conteúdo se espalha, não fica parado. ", b("Orgânica"), " — porque acontece sem contrato, sem pagamento, sem cobrança. ", b("Contínua"), " — porque não é evento, é sistema."),

      h2("O que Cliente Mídia™ NÃO é"),
      p(b("Não é influencer marketing."), " Influencer marketing contrata terceiros com audiência. Cliente Mídia™ ativa a base real de clientes da própria marca."),
      p(b("Não é UGC contratado."), " UGC pago via micro-influenciadores ou plataformas de criadores ainda envolve transação. Cliente Mídia™ é orgânico — a motivação é interna ao cliente."),
      p(b("Não é programa de afiliados."), " Não há comissão. Não há código de desconto. O cliente compartilha porque a experiência foi extraordinária, não porque ganha algo."),
      p(b("Não é campanha de mídia."), " Não tem início e fim. É infraestrutura que opera enquanto a loja entrega experiências que valham ser compartilhadas."),
      p(b("Não é viralização de sorte."), " Não depende de um post viralizar uma vez. Depende de cada cliente que sai da loja querer compartilhar."),

      h2("Os três componentes do modelo"),
      h3("1. Experiência extraordinária"),
      p("O ponto de partida é a experiência dentro da loja. Quando uma cliente entra, experimenta, se vê de um jeito diferente — esse momento de transformação é o ativo primário do modelo. Sem ele, não há nada para compartilhar."),

      h3("2. Captura do momento"),
      p("O momento precisa ser capturado de uma forma que valha a pena compartilhar. Isso pode ser uma foto profissional rápida, uma imagem editorial gerada por IA com a peça da loja, um vídeo curto. O critério é simples: a peça precisa parecer ", b("conteúdo que a cliente compartilharia de qualquer jeito"), " — não publicidade."),

      h3("3. Distribuição espontânea"),
      p("A cliente compartilha porque quer. Porque a imagem é dela. Porque ela está linda. Porque ela quer que o mundo veja. A marca da loja vai junto, naturalmente — não como anúncio, como contexto."),

      h2("Os limites da categoria"),
      p("Cliente Mídia™ ", b("não substitui anúncios"), " no curto prazo. Lojas que dependem fortemente de tráfego pago não desligam os Meta Ads no dia seguinte de adotar o modelo. A categoria substitui anúncios no ", b("longo prazo"), " — porque constrói um canal que opera sem precisar ser pago."),
      p("Cliente Mídia™ ", b("não substitui produto ruim"), ". Se a experiência da loja não é extraordinária, o modelo não opera. O cliente só compartilha quando o momento merece ser compartilhado."),
      p("Cliente Mídia™ ", b("não escala sem infraestrutura"), ". Funciona em escala quando há um sistema — não quando depende de uma vendedora carismática individual."),

      h2("Por que precisamos do nome"),
      p("Sem nome próprio, esse modelo continua sendo confundido com UGC, com influencer, com boca a boca antigo. Cada confusão custa caro: estratégia errada, métrica errada, expectativa errada, contratação errada."),
      pullquote("Quem nomeia a categoria, define seus limites. Quem define seus limites, escreve suas regras."),
      p("O nome Cliente Mídia™ é a declaração de que esse modelo existe, é distinto, tem características próprias, e merece um vocabulário e uma metodologia próprios. Tudo o que está sendo documentado neste portal parte dessa premissa.")
    ]
  },
  {
    slug: "ugc-influencer-ou-cliente-midia",
    pillarSlug: "categoria",
    title: "UGC, influencer ou Cliente Mídia? As três distinções que ninguém faz.",
    subtitle:
      "Por que esses três modelos foram confundidos durante uma década — e por que essa confusão custou bilhões ao varejo.",
    excerpt:
      "Influencer marketing, UGC e Cliente Mídia™ parecem a mesma coisa. Não são. Entender as três distinções é o que separa estratégia de improviso.",
    readingTime: 8,
    body: [
      p("Por uma década, três coisas diferentes foram tratadas como sinônimos: influencer marketing, UGC (user-generated content) e o que hoje chamamos de Cliente Mídia™. A confusão custou bilhões em decisões erradas. Este artigo desfaz a confusão."),

      h2("O eixo da motivação"),
      p("A primeira distinção é sobre ", b("por que a pessoa compartilha"), "."),
      p(b("Influencer marketing"), ": a pessoa compartilha porque foi paga para compartilhar. A motivação é financeira. O contrato precede a publicação."),
      p(b("UGC contratado"), ": a pessoa compartilha porque ganhou algo — um produto grátis, um cupom, acesso antecipado. A motivação é transacional. A reciprocidade é parte do design."),
      p(b("Cliente Mídia™"), ": a pessoa compartilha porque quer. A motivação é intrínseca. Não há pagamento, cupom, contrato ou benefício explícito além da experiência vivida."),

      h2("O eixo da relação com a marca"),
      p(b("Influencer"), ": é um terceiro com audiência. A relação com a marca é episódica."),
      p(b("UGC"), ": é um cliente recrutado. A relação é intermediada por uma plataforma ou agência."),
      p(b("Cliente Mídia™"), ": é o cliente real da loja. A relação é direta e construída na experiência de compra."),

      h2("O eixo da credibilidade percebida"),
      pullquote("O público não confia em propaganda. Confia em pessoas que conhece postando coisas que viveram."),
      p("Quando alguém vê um influencer postando uma peça, sabe que pode ter sido pago. Quando vê uma amiga postando a mesma peça, sabe que ela escolheu. Essa diferença é a única que importa na hora da decisão de compra."),
      p("Cliente Mídia™ é o único dos três modelos que opera com credibilidade ", b("máxima"), " — porque a pessoa que compartilha é, definicionalmente, uma cliente real, sem incentivo financeiro."),

      h2("Por que a confusão custou caro"),
      p("Lojas que confundiram esses modelos cometeram dois erros sistemáticos. Primeiro: gastaram demais em influencer marketing esperando o efeito de credibilidade que só Cliente Mídia™ entrega. Segundo: investiram em UGC pago achando que estavam construindo um canal orgânico — quando estavam apenas terceirizando criatividade."),
      p("A correção começa pela linguagem. Quando você sabe que está olhando para coisas distintas, suas decisões de orçamento, métrica e mensuração mudam.")
    ]
  },
  {
    slug: "quatro-pilares-distribuicao-organica",
    pillarSlug: "categoria",
    title: "Os quatro pilares da distribuição orgânica.",
    subtitle:
      "Experiência, transformação, distribuição, reciprocidade — a anatomia operacional do modelo Cliente Mídia™.",
    excerpt:
      "Cliente Mídia™ não é uma campanha. É um sistema com quatro pilares operacionais. Este artigo descreve cada um e como eles se conectam.",
    readingTime: 7,
    body: [
      p("Cliente Mídia™ é um modelo. Modelos têm partes. Este artigo descreve as quatro partes — os quatro pilares — que sustentam o sistema."),

      h2("Pilar 1 — Experiência"),
      p("Tudo começa com a experiência dentro da loja. A iluminação. O atendimento. O provador. O espelho. O momento em que a cliente experimenta uma peça e se vê de um jeito que ela não esperava. ", b("Sem experiência extraordinária, não há nada para compartilhar."), " O modelo inteiro depende desse momento."),

      h2("Pilar 2 — Transformação"),
      p("A experiência precisa ser capturada e transformada em conteúdo que valha a pena distribuir. Isso pode ser uma foto rápida, uma imagem editorial gerada por IA, um vídeo curto, um boomerang no provador. O critério é simples: a peça precisa parecer conteúdo legítimo da cliente, não publicidade da loja."),

      h2("Pilar 3 — Distribuição"),
      p("A distribuição é o que separa Cliente Mídia™ de qualquer outro modelo. Aqui, a cliente é o canal. Ela publica no Instagram dela, manda no WhatsApp para amigas, posta no story. A marca da loja vai junto, naturalmente."),
      pullquote("Não é a loja publicando para milhares. É cada cliente publicando para algumas dezenas — multiplicadas por todas as clientes que vivem a experiência."),

      h2("Pilar 4 — Reciprocidade"),
      p("A reciprocidade é o que faz o sistema durar. Quando uma cliente compartilha e isso é reconhecido pela loja — uma menção, um repost, um cumprimento no próximo atendimento — a probabilidade de ela compartilhar de novo sobe. O modelo entra em loop positivo."),
      p("Os quatro pilares operam juntos. Falhar em qualquer um deles quebra o sistema. Operar todos eles bem é o que diferencia uma loja que tenta Cliente Mídia™ de uma loja que ", b("é"), " Cliente Mídia™.")
    ]
  },
  {
    slug: "glossario-cliente-midia",
    pillarSlug: "categoria",
    title: "Glossário Cliente Mídia™.",
    subtitle:
      "Os termos que vão dominar o vocabulário do varejo premium brasileiro nos próximos 36 meses.",
    excerpt:
      "Toda categoria nova carrega um vocabulário próprio. Este é o glossário canônico da Cliente Mídia™ — referência para imprensa, lojistas, gestoras e estrategistas.",
    readingTime: 6,
    body: [
      p("Toda categoria nova carrega um vocabulário próprio. Este glossário documenta os termos canônicos da Cliente Mídia™ — para que jornalistas, lojistas, gestoras e estrategistas usem as mesmas palavras com os mesmos significados."),

      h2("Alcance alugado"),
      p("Modelo em que a visibilidade da marca depende inteiramente de pagamento contínuo a plataformas digitais. Quando o pagamento cessa, o alcance desaparece. Oposto de presença própria."),

      h2("Cliente Mídia™"),
      p("Categoria definida em portal próprio. O modelo em que clientes da loja se tornam canais ativos e orgânicos de distribuição da marca."),

      h2("Distribuição orgânica"),
      p("Movimento de conteúdo de marca entre pessoas reais, sem intermediação paga e sem contrato comercial. É o que Cliente Mídia™ ativa de forma sistemática."),

      h2("Experiência extraordinária"),
      p("Momento dentro da loja em que a cliente vivencia algo que ela quer compartilhar espontaneamente. Pilar 1 do modelo."),

      h2("Infraestrutura de mídia própria"),
      p("Conjunto de mecanismos que uma loja constrói para que sua presença não dependa de orçamento publicitário externo. Cliente Mídia™ é uma camada dessa infraestrutura."),

      h2("Loop de reciprocidade"),
      p("Padrão em que a cliente compartilha, é reconhecida pela loja, e a chance de compartilhar de novo aumenta. Sustenta a categoria no longo prazo."),

      h2("Reach próprio"),
      p("Alcance que a marca consegue mobilizar sem pagar pela impressão. Inclui base de clientes, redes orgânicas, conteúdo de cliente. Oposto de reach pago."),

      h2("Tax pass-through"),
      p("Repasse de tributos de plataformas digitais aos anunciantes. No Brasil, ocorreu em janeiro de 2026 com a Meta — somando 12,15% ao custo dos Meta Ads.")
    ]
  },
  // ─── PILAR 3 · PESQUISA ─────────────────────────────────────
  {
    slug: "por-que-sua-melhor-cliente-nunca-foi-anuncio",
    pillarSlug: "pesquisa",
    title: "Por que sua melhor cliente nunca foi seu anúncio.",
    subtitle:
      "O boca a boca digital responde por 33% das descobertas de marca. Os anúncios? Custam 11 vezes mais por conversão.",
    excerpt:
      "Os dados que toda lojista de moda premium precisa ver antes de aprovar o próximo orçamento de mídia paga.",
    readingTime: 14,
    featured: true,
    body: [
      p("Se você perguntar para cinco clientes da sua loja como elas chegaram até você, é improvável que alguma responda ", i("clicando num anúncio"), ". A resposta mais comum vai ser: ", b("uma amiga me indicou"), "."),
      p("Esse padrão não é anedótico. É documentado pela maior pesquisa de comportamento de compra no Brasil em 2024 — e os números são, para qualquer lojista que ainda investe pesado em mídia paga, perturbadores."),

      h2("Os três canais quase empatados"),
      p("Pesquisa da CNDL/SPC Brasil em 2024 identificou os três principais canais pelos quais brasileiros descobrem marcas:"),
      dataPoint("37,2%", "Social ads (anúncios pagos em redes sociais)"),
      dataPoint("35,4%", "Buscadores (Google, Bing)"),
      dataPoint("33,3%", "Boca a boca digital (recomendação entre pessoas)"),
      p("Três canais quase idênticos em alcance. Mas com custos radicalmente diferentes."),

      h2("O cálculo que ninguém faz"),
      p("O social ad custa dinheiro toda semana. O buscador orgânico custa tempo, consistência e SEO. O boca a boca digital não custa nada — e tem a maior taxa de conversão dos três."),
      p("Pesquisa do EmbedSocial mostrou que ", b("92% dos consumidores"), " confiam mais em recomendações de outros usuários do que em anúncios tradicionais. E levantamento da Nuvemshop, com base em dados da BrandLovers, indica que conteúdo gerado por usuários gera ", b("até 11 vezes mais retorno"), " sobre o investimento em comparação com anúncios."),
      dataPoint("11x", "Retorno do conteúdo gerado por usuários vs. anúncios tradicionais", "Nuvemshop · BrandLovers"),

      h2("Por que isso é mais verdadeiro no varejo premium"),
      p("No varejo de moda premium, o fator confiança é decisivo. A cliente que gasta R$ 800 em uma peça não compra por impulso — compra por convicção. E a convicção raramente nasce de um banner."),
      pullquote("A mulher que tem poder de compra para frequentar uma boutique de alto padrão é exatamente a pessoa que mais desenvolveu filtros para publicidade."),
      p("Essa cliente compra porque confia. Confia na loja, na vendedora, na amiga que indicou, na influência que admira. O anúncio é, no máximo, o último empurrão. Raramente é o primeiro contato — e quase nunca é o motivo da compra."),

      h2("A confiança como ativo desperdiçado"),
      p("O ponto que a maioria das análises sobre UGC ignora: o conteúdo gerado pelo usuário ", b("não acontece por acidente"), ". Ele acontece quando a experiência é extraordinária o suficiente para que a pessoa queira mostrar ao mundo."),
      p("Sua cliente, quando se sente verdadeiramente especial — quando se olha e pensa ", i("eu estou incrível"), " — não precisa ser convencida a compartilhar. Ela quer. É um impulso natural."),
      p("O problema é que, até agora, não existia uma forma sistemática de ativar e capturar esse impulso no ponto de venda. De transformar esse momento de ", i("eu me sinto linda usando essa roupa"), " em conteúdo que carrega a marca da loja para redes que a loja nunca alcançaria com anúncio."),

      h2("O que os números prescrevem"),
      p("Se 33% da descoberta de marcas vem do boca a boca digital, e esse canal custa próximo de zero e tem ROI até 11x maior, a alocação racional de orçamento muda."),
      p("Não significa zerar a mídia paga. Significa parar de tratar a mídia paga como ", b("a única infraestrutura de aquisição"), " — e começar a investir intencionalmente no canal que já está ali, esperando ser ativado: a sua base de clientes."),

      h2("A pergunta que substitui a anterior"),
      p("Por uma década, a pergunta da reunião mensal de marketing foi: ", i("quanto vamos investir em mídia paga este mês?"), ". A pergunta da próxima década é outra:"),
      pullquote("Quantas das nossas clientes deste mês compartilharam algo da loja com a rede delas?"),
      p("Essa é a métrica que descreve o estado real da distribuição da marca. E é a métrica que Cliente Mídia™ pretende elevar à categoria de KPI fundamental do varejo premium.")
    ]
  },
  {
    slug: "benchmark-roi-organico-vs-pago",
    pillarSlug: "pesquisa",
    title: "Benchmark: ROI orgânico vs ROI pago no varejo premium.",
    subtitle:
      "Comparativo conduzido com lojistas premium brasileiras ao longo de 90 dias. Os números preliminares.",
    excerpt:
      "Os números preliminares de um benchmark inédito sobre ROI de canais orgânicos vs. mídia paga em boutiques de moda premium no Brasil.",
    readingTime: 8,
    body: [
      p("Este artigo apresenta os primeiros números do benchmark Cliente Mídia™ — estudo em andamento com lojistas premium brasileiras sobre comparativo de ROI entre canais orgânicos e mídia paga."),
      p(i("Nota editorial: este artigo é um esboço. Os dados completos serão publicados no Relatório Cliente Mídia™ 2026.")),

      h2("Metodologia preliminar"),
      p("O benchmark acompanha 50 lojas de moda premium brasileiras durante 90 dias, com tickets médios entre R$ 350 e R$ 1.800. As lojas reportam, semanalmente, três variáveis: investimento em mídia paga, número de clientes novas atribuídas a cada canal, e ticket médio por canal."),

      h2("Hipótese principal"),
      pullquote("O CAC orgânico (via indicação/compartilhamento de clientes existentes) é 5 a 15 vezes menor que o CAC pago — e o LTV é maior, porque a cliente chega pré-disposta a confiar."),

      h2("Primeiros achados"),
      p("Nos primeiros 30 dias, três padrões emergiram:"),
      p(b("Padrão 1:"), " lojas com infraestrutura ativa de Cliente Mídia™ apresentam CAC orgânico médio entre R$ 18 e R$ 45 — contra R$ 180 a R$ 420 do CAC pago."),
      p(b("Padrão 2:"), " o ticket médio de clientes vindas por indicação é entre 8% e 22% maior do que de clientes vindas de mídia paga."),
      p(b("Padrão 3:"), " a taxa de recompra em 90 dias é quase o dobro entre clientes orgânicas vs. pagas."),
      p("Os números completos, com cortes por categoria de produto, região e nicho, virão no Relatório 2026.")
    ]
  },
  {
    slug: "anatomia-compradora-premium",
    pillarSlug: "pesquisa",
    title: "Anatomia da compradora premium pós-2024.",
    subtitle:
      "Quem é, como decide e onde realmente descobre as marcas que escolhe — a partir de dados primários.",
    excerpt:
      "A consumidora de moda premium brasileira mudou. Esta é a primeira tentativa de descrevê-la com dados primários, não impressões.",
    readingTime: 9,
    body: [
      p("Nos últimos cinco anos, o que se sabe sobre a compradora de moda premium brasileira foi composto majoritariamente por relatórios de instituições internacionais — Bain, BoF, McKinsey — adaptados para o Brasil sem dados locais. Este artigo inicia uma tentativa diferente: descrever essa compradora a partir de dados primários, coletados aqui."),

      h2("O perfil que está sendo desenhado"),
      p("A compradora premium brasileira de 2026 tem entre 32 e 54 anos. Renda familiar acima de R$ 18 mil/mês. Gasta entre R$ 800 e R$ 4.200/mês em moda. Tem entre 3 e 8 lojas de confiança. E — ponto crucial — toma decisões de compra ", b("influenciada por amigas e referências próximas"), ", não por anúncios."),

      h2("Onde ela realmente descobre marcas"),
      p("Em entrevistas qualitativas preliminares, a hierarquia de descoberta de marcas premium tem um padrão consistente:"),
      p("1. Amiga ou conhecida usando a peça (em pessoa ou no Instagram dela)."),
      p("2. Influenciadora de nicho específico que ela já segue há mais de um ano."),
      p("3. Editorial em publicação especializada (impressa ou digital)."),
      p("4. Indicação direta de personal shopper, consultora ou vendedora."),
      p("5. Por último, eventualmente, anúncio pago."),
      pullquote("O anúncio aparece em quinto lugar — quando aparece."),

      h2("O que isso muda no orçamento"),
      p("Se a compradora premium descobre marcas majoritariamente por canais relacionais, e secundariamente por anúncios, a alocação orçamentária do varejo precisa refletir essa hierarquia. Hoje raramente reflete — e essa desconexão é parte do problema documentado em ", i("Diagnóstico"), ".")
    ]
  },
  // ─── PILAR 4 · MOVIMENTO ────────────────────────────────────
  {
    slug: "nova-infraestrutura-varejo-premium",
    pillarSlug: "movimento",
    title: "A nova infraestrutura do varejo premium brasileiro.",
    subtitle:
      "O que muda quando a distribuição da marca deixa de ser comprada e passa a ser cultivada na própria base de clientes.",
    excerpt:
      "O varejo premium brasileiro está construindo, neste momento, uma nova camada de infraestrutura. Quem entender primeiro vai escrever as regras da próxima década.",
    readingTime: 16,
    featured: true,
    body: [
      p("Existe um momento na história de qualquer setor em que a infraestrutura sobre a qual ele operava se torna obsoleta — e uma nova precisa ser construída antes que a antiga colapse. O varejo premium brasileiro está nesse momento agora."),

      h2("O que é infraestrutura"),
      p("Infraestrutura, em qualquer setor, é o conjunto de mecanismos invisíveis que permitem que a operação aconteça. Para o varejo de moda, infraestrutura sempre foi: ponto físico, atendimento, estoque, vitrine, e mais recentemente, distribuição digital."),
      p("A distribuição digital tem uma característica peculiar: por uma década, ela foi tratada como gasto operacional, não como ativo. Você paga, ela funciona. Você para, ela desaparece. Você nunca foi dono."),
      pullquote("Infraestrutura que você não é dono não é infraestrutura. É aluguel."),

      h2("A inflexão de 2026"),
      p("Três forças convergem em 2026 para tornar o aluguel de distribuição financeiramente insustentável:"),
      p(b("Força 1:"), " o repasse de PIS/COFINS e ISS, somando 12,15% de aumento permanente no custo dos Meta Ads no Brasil."),
      p(b("Força 2:"), " o crescimento contínuo do CAC pago — entre 8% e 18% ao ano, dependendo do segmento — pela simples matemática do leilão."),
      p(b("Força 3:"), " a compressão de margens que torna cada ponto percentual de CAC um problema existencial em vez de operacional."),
      p("Essas três forças, juntas, encerram a viabilidade do modelo antigo. Não é opinião. É aritmética."),

      h2("O que precisa ser construído"),
      p("Se a infraestrutura antiga era distribuição alugada, a nova precisa ser ", b("distribuição própria"), ". Os componentes:"),
      h3("Componente 1 — Base de clientes ativa"),
      p("Não basta ter cadastro. Não basta ter CRM. A base precisa ser ativa — clientes que voltam, indicam, compartilham. Esse é o ativo primário."),
      h3("Componente 2 — Experiência compartilhável"),
      p("A loja precisa ser arquitetada para entregar momentos que valham ser compartilhados. Iluminação, atendimento, ritual do provador, espelho, embalagem — tudo precisa ser pensado como ", i("conteúdo em potencial"), "."),
      h3("Componente 3 — Mecanismo de captura"),
      p("Quando o momento acontece, precisa existir uma maneira simples — não invasiva, não obrigatória — da cliente capturar e levar com ela. Foto, vídeo, imagem editorial gerada por IA. Algo que a cliente queira mostrar."),
      h3("Componente 4 — Atribuição de marca"),
      p("O conteúdo que sai da loja precisa carregar marca da loja — não como logo gigante, mas como contexto, ambiente, assinatura visual. Watermark elegante. Branding sutil. A marca presente sem ser publicitária."),
      h3("Componente 5 — Loop de reciprocidade"),
      p("Quando a cliente compartilha, a loja reconhece. Repost, menção, cumprimento na próxima visita. Esse reconhecimento fecha o loop e aumenta a probabilidade de novo compartilhamento."),

      h2("O que muda no balanço da empresa"),
      p("Quando essa infraestrutura existe, três linhas mudam no balanço:"),
      p(b("CAC pago"), " cai consistentemente — porque parte das clientes novas vem por indicação, sem custo de mídia."),
      p(b("LTV"), " sobe — porque clientes vindas por indicação compram mais, voltam mais, indicam mais."),
      p(b("Goodwill / valor de marca"), " sobe — não como linha contábil tradicional, mas como ativo estratégico real, mensurável em valuation de M&A e em poder de precificação."),

      h2("Por que a janela é agora"),
      p("Categorias novas têm uma janela curta. Quem adota primeiro vira referência. Quem espera vira seguidor."),
      p("A NRF — principal entidade do varejo global — apontou em 2024 que a estratégia de tentar operar em todos os canais, adotar todas as tecnologias e atender todos os públicos ao mesmo tempo perdeu força. O foco vai para entender com clareza quem é a cliente atendida, o que importa para ela e como entregar uma jornada alinhada."),
      pullquote("Para o varejo premium brasileiro, essa clareza tem um nome: a cliente que já te escolheu."),
      p("Ela é o seu melhor canal. Ela é o seu alcance mais barato. Ela é a sua presença de marca mais crível. E ela está esperando uma experiência que a faça querer te mostrar para o mundo."),

      h2("O movimento"),
      p("A categoria Cliente Mídia™ não é um produto. É um movimento. E movimento é o que acontece quando suficientes pessoas começam a operar pela mesma lógica ao mesmo tempo."),
      p("As lojas que adotarem o modelo nos próximos 18 meses não vão estar apenas ganhando vantagem competitiva. Vão estar ", b("definindo o padrão"), " do que o varejo premium brasileiro vai significar nos próximos 10 anos.")
    ]
  },
  {
    slug: "por-que-2027-sera-ano-cliente-midia",
    pillarSlug: "movimento",
    title: "Por que 2027 vai ser o ano da Cliente Mídia™.",
    subtitle:
      "Predições sobre o ponto de inflexão da categoria — e quem vai estar do lado certo da curva.",
    excerpt:
      "Toda categoria nova passa por um ponto de inflexão. Este é o ano em que isso vai acontecer com Cliente Mídia™.",
    readingTime: 7,
    body: [
      p("Predições, em qualquer setor, são úteis quando explicam o mecanismo — não quando apenas chutam datas. Esta é uma predição com mecanismo."),
      pullquote("2027 será o ano em que Cliente Mídia™ deixa de ser nicho e vira vocabulário do mercado."),

      h2("Por que 2027 especificamente"),
      p("Três curvas se cruzam em 2027. Primeira: o custo dos Meta Ads, depois do repasse tributário de 2026 e do crescimento natural dos leilões, vai estar ", b("entre 25% e 35% acima"), " do que era em 2024 — para as mesmas impressões. Segunda: o conjunto de lojas que adotaram modelos de mídia própria vai estar entrando no terceiro ano de operação, com dados maduros suficientes para virar caso público. Terceira: a imprensa especializada começará a nomear a categoria, e o ciclo de discussão pública vai acelerar."),

      h2("O sinal antecedente"),
      p("O sinal de que 2027 será o ano é observável agora: quando lojistas começam a perguntar entre elas ", i("quem está fazendo isso bem?"), ". Hoje, em 2026, essa pergunta já circula em grupos privados de WhatsApp do varejo premium. Em 12 meses, ela vai estar em palestras, em capas de revistas especializadas, em mesas redondas."),

      h2("Quem vai estar do lado certo"),
      p("As lojas que começarem a operar o modelo em 2026 vão estar, em 2027, ", b("dois anos à frente"), " da concorrência. Vão ser as citadas, as estudadas, as imitadas. As que esperarem 2027 para começar vão estar correndo atrás de um padrão que outros já definiram. O lado certo da curva é o lado que começa agora.")
    ]
  },
  {
    slug: "cinco-lojas-brasileiras-que-ja-entenderam",
    pillarSlug: "movimento",
    title: "Cinco lojas brasileiras que já entenderam o modelo.",
    subtitle:
      "Estudos de caso preliminares sobre lojistas que ativaram componentes do modelo Cliente Mídia™ antes da categoria existir formalmente.",
    excerpt:
      "Antes mesmo da categoria ter nome, cinco lojas brasileiras já operavam por suas regras. Esta é a primeira documentação delas.",
    readingTime: 8,
    body: [
      p("Categorias geralmente nascem quando alguém nomeia algo que já estava acontecendo. Cliente Mídia™ não é exceção. Antes do nome existir, lojistas brasileiras já operavam pela mesma lógica — algumas conscientemente, outras por intuição."),
      p(i("Nota editorial: este artigo é um esboço. Os estudos de caso completos, com nomes, números e fotos, virão em entrevistas profundas no Relatório 2026.")),

      h2("Os cinco perfis"),
      p(b("Caso 1 — Boutique multimarca em SP."), " Construiu, ao longo de cinco anos, uma base de cerca de 800 clientes ativas que indicam novas clientes em volume tal que 60% das vendas mensais vêm de indicação. CAC pago: marginal."),
      p(b("Caso 2 — Marca de denim premium no RJ."), " Inverteu o orçamento de mídia: 20% pago, 80% em experiência de loja e ritual de compra. Compartilhamento orgânico no Instagram se tornou o principal motor de aquisição."),
      p(b("Caso 3 — Concept store em Curitiba."), " Trabalha com vendedoras como ", i("personal curadoras"), ". Cada cliente recebe um cuidado quase editorial. Resultado: clientes virais em redes pequenas, mas alta concentração de compradoras de altíssimo valor."),
      p(b("Caso 4 — Marca digital nativa de SP."), " Desenhou o produto e a embalagem inteiramente para serem compartilháveis. Cada unboxing é uma micro-campanha de marketing feita pela cliente."),
      p(b("Caso 5 — Atelier de alfaiataria sob medida em BH."), " Estuda o cliente para entregar uma sessão de prova que vira evento. As clientes filmam, postam, mostram. CAC pago: zero há quatro anos."),
      pullquote("Cinco lojas, cinco abordagens diferentes, um padrão idêntico: o cliente vira mídia espontaneamente quando a experiência merece.")
    ]
  },
  {
    slug: "lojista-premium-aprender-luxo-frances",
    pillarSlug: "movimento",
    title: "O que o varejo premium pode aprender com o luxo francês.",
    subtitle:
      "As maisons mais antigas do mundo nunca dependeram de algoritmo. Por quê — e o que isso ensina pra cá.",
    excerpt:
      "Hermès, Chanel e Loro Piana não anunciam no Instagram do jeito que o varejo brasileiro anuncia. E vendem mais que qualquer um. O que eles entendem.",
    readingTime: 8,
    body: [
      p("Existe um detalhe curioso sobre o luxo francês de altíssimo padrão: as maisons mais bem-sucedidas do mundo investem proporcionalmente menos em mídia paga digital do que o varejo premium brasileiro mediano. E vendem mais. E têm margens maiores. E sobrevivem a recessões."),
      p("Este artigo investiga o porquê — e o que isso ensina para a lojista brasileira em 2026."),

      h2("A lição 1 — Mídia é cerimônia, não tráfego"),
      p("Quando Hermès faz uma campanha, não é para gerar cliques. É para construir mito. O conteúdo é editorial, não promocional. Não tem call-to-action. Não tem botão de comprar agora. Tem ", b("aspiração"), "."),
      p("O varejo brasileiro premium tenta usar mídia digital para o mesmo objetivo — mas a estrutura do anúncio digital (clique, conversão, retargeting) é desenhada para o oposto. Você não consegue construir mito num formato desenhado para tráfego."),

      h2("A lição 2 — O cliente é o canal"),
      p("As maisons francesas entendem, há décadas, que ", b("o cliente é a campanha"), ". Uma mulher saindo de uma flagship com uma sacola laranja é mais publicidade do que qualquer outdoor. A cerimônia do atendimento, a embalagem, a sacola, o cartão escrito à mão — tudo é desenhado para que a experiência seja compartilhável."),
      pullquote("A Hermès não tem campanha de UGC. A Hermès É uma campanha de UGC."),

      h2("A lição 3 — Paciência é estratégia"),
      p("As marcas francesas operam em horizontes de décadas. Não medem trimestre por trimestre. Não otimizam por CTR. Entendem que reputação demora — e por demorar, vale mais."),
      p("Para o varejo brasileiro, importar dessa filosofia não significa virar Hermès. Significa entender que a régua do trimestre pode estar te custando o ativo da década.")
    ]
  }
];
