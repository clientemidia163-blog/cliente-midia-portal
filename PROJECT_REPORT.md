# Project Report — Portal Cliente Mídia™

> **Para o próximo Claude (Cursor / Claude Code):** este documento é seu briefing completo. Leia até o fim antes de mexer em código. As últimas seções listam pendências e armadilhas conhecidas.

---

## 1. O que é esse projeto

**Portal Cliente Mídia™** — Centro de Autoridade editorial do varejo premium brasileiro, posicionado para nomear e documentar uma nova categoria de marketing chamada "Cliente Mídia™" (clientes reais funcionando como canal de distribuição orgânica de marca, em oposição a UGC contratado ou influencer).

**Dono:** Juliano (`grupodigital163@gmail.com`).
**Domínio:** `clientemidia.com.br` (registrado na Hostinger).
**Stack alvo:** Vercel + Next.js 14 (App Router) + Sanity CMS + Supabase (leads) + Resend (email) + Cloudinary (imagens).

**Relação com a Viralize Luxo:**
A Viralize Luxo (`viralizeluxo.com.br`) é a plataforma comercial que **operacionaliza** o modelo Cliente Mídia™. O portal é o **Centro de Autoridade editorial** — vende a categoria, não o produto. A hierarquia de conversão é: leitor entra pelo conteúdo → vai para `/simulador` (ferramenta gratuita, mantém no portal) → opcionalmente sai para a Viralize Luxo.

---

## 2. Stack técnico

```
Next.js 14.2.15 (App Router, RSC)
React 18.3.1
TypeScript 5.6.3
Tailwind 3.4.13
Sanity 3.62.2 (CMS embarcado em /studio)
Supabase 2.45.4 (lead capture)
Resend 4.0.0 (email)
Cloudinary 2.5.1 + next-cloudinary 6.16.0 (imagens, opcional)
Portable Text + @sanity/image-url (renderização de artigos)
```

Node `>=20`. Veja `package.json` na raiz.

---

## 3. Estrutura de pastas

```
portal/
├── app/                          Next.js App Router
│   ├── layout.tsx               Shell global, fonts (Cormorant Garamond + Inter)
│   ├── page.tsx                 Homepage
│   ├── globals.css              Tailwind base + custom components (btn-primary, eyebrow)
│   ├── manifesto/page.tsx       Manifesto longo da categoria
│   ├── relatorio/page.tsx       Landing do PDF + form de captura
│   ├── obrigado/page.tsx        Confirmação pós-form
│   ├── diagnostico/page.tsx     Pilar 1 (usa PillarPage)
│   ├── categoria/page.tsx       Pilar 2
│   ├── pesquisa/page.tsx        Pilar 3
│   ├── movimento/page.tsx       Pilar 4
│   ├── artigos/
│   │   ├── page.tsx             Arquivo completo de artigos
│   │   └── [slug]/page.tsx      Artigo individual (busca Sanity)
│   ├── studio/[[...tool]]/      Sanity Studio embarcado
│   └── api/
│       ├── leads/route.ts       POST → Supabase + Resend
│       └── seed/route.ts        Seed inicial dos artigos via Sanity API
│
├── components/
│   ├── site/
│   │   ├── Header.tsx           Top nav + CTA "✦ Simulador"
│   │   ├── Footer.tsx           4 colunas + linha final com Simulador/Viralize
│   │   ├── ArticleCard.tsx      Card de artigo (grid)
│   │   ├── PillarPage.tsx       Template reutilizável dos 4 pilares
│   │   └── SimuladorCTA.tsx     ★ Bloco de conversão (3 variantes)
│   └── article/
│       └── PortableTextBody.tsx Renderer do Sanity Portable Text
│
├── lib/
│   ├── sanity.ts                Cliente Sanity + image URL builder
│   ├── queries.ts               GROQ queries
│   ├── supabase.ts              Cliente Supabase (lead capture)
│   ├── resend.ts                Wrapper Resend
│   └── utils.ts                 cn() helper (clsx + tailwind-merge)
│
├── sanity/
│   ├── env.ts                   Validação de env vars Sanity
│   ├── structure.ts             Customiza a sidebar do Studio
│   └── schemas/
│       ├── index.ts             Exporta todos os schemas
│       ├── article.ts           Schema do artigo (slug, body, heroImage, author, pillar)
│       ├── pillar.ts            Schema do pilar (4 fixos)
│       ├── author.ts            Schema do autor
│       └── settings.ts          Schema de settings globais
│
├── data/
│   ├── seed-articles.ts         14 artigos seed iniciais
│   ├── seed-pillars.ts          4 pilares seed
│   └── seed-helpers.ts          Funções de seed
│
├── public/
│   └── simulador.html           ★ Simulador interativo standalone (HTML+CSS+JS)
│
├── docs/                         Artefatos de referência (não vão pro deploy)
│   ├── design-system.html       Mockup do sistema visual
│   ├── homepage-preview.html    Mockup HTML da homepage
│   ├── prompts-ia-imagens-anchors.html  Prompts para gerar covers de IA
│   ├── setup-guide-original.html        Guia de setup inicial
│   └── relatorio-cliente-midia-2026.pdf  PDF do relatório a ser distribuído via /relatorio
│
├── DEPLOY.md                     Passo a passo de deploy (GitHub + Vercel + DNS)
├── PROJECT_REPORT.md             Este documento
├── README.md                     README do repo
├── .env.example                  Template de env vars (preencher na Vercel)
├── .gitignore                    Padrão Next.js + .env + .vercel + sanity/dist
├── next.config.mjs               Rewrites + remotePatterns (Sanity, Cloudinary)
├── tailwind.config.ts            Design tokens (cores, fontes, tracking)
├── tsconfig.json                 Strict TS, paths "@/*"
├── postcss.config.mjs            Tailwind + Autoprefixer
└── package.json
```

---

## 4. Design system

Em `tailwind.config.ts` e `app/globals.css`:

**Cores principais:**
| Token | Hex | Uso |
|---|---|---|
| `ink` | `#0B0B0B` | Fundo padrão (escuro) |
| `ink-deep` | `#080808` | Fundo das seções alternadas |
| `ink-elevated` | `#141210` | Cards e callouts |
| `cream` | `#F4EFE3` | Fundo claro (manifesto, blocos invertidos) |
| `cream-warm` | `#EDE7D9` | Texto principal sobre escuro |
| `gold` | `#C9A35A` | Acento primário (botões, eyebrow, links) |
| `gold-soft` | `#D9BC7E` | Acento serif italic |
| `gold-deep` | `#A8853F` | Hover do gold + texto sobre cream |
| `sepia` | `#9B9485` | Texto secundário sobre escuro |
| `dim` | `#5F5A50` | Texto terciário, captions |
| `line-dark` | `#1E1C18` | Bordas sobre fundo escuro |

**Tipografia:**
- Serif: **Cormorant Garamond** (variable `--font-cormorant`) — títulos, blockquotes, italics
- Sans: **Inter** (variable `--font-inter`) — body, UI

**Componentes utilitários** (em `globals.css`):
- `.btn-primary` — dourado sólido, uppercase, tracking wider
- `.btn-ghost` — outlined com border-line-dark
- `.btn-text` — apenas borda inferior dourada
- `.eyebrow` — `text-[11px] font-medium uppercase tracking-eyebrow text-gold`
- `.tag-pill` — `border-b border-gold`

---

## 5. Estratégia de conversão (Fase 7 — atual)

A hierarquia de CTAs foi reorganizada em **maio/2026** para promover o `/simulador` como destino primário de toda jornada editorial.

### Hierarquia oficial
1. **Primário** — `/simulador` (ferramenta interativa, mantém o leitor no portal)
2. **Secundário** — `viralizeluxo.com.br` (plataforma comercial, abre em nova aba)

### Onde os CTAs aparecem
| Localização | CTA primário | CTA secundário |
|---|---|---|
| `Header.tsx` (todas as páginas) | ✦ Simulador (botão outline gold) | — |
| Hero homepage | ✦ Simular impacto na minha loja | Ler manifesto / Baixar relatório |
| Homepage (seção dedicada) | ✦ Abrir o simulador | — |
| Final do `/manifesto` | ✦ Simular impacto na minha loja | Baixar Relatório / Ler artigos |
| Final de cada **artigo** | `<SimuladorCTA variant="article">` | Conhecer Viralize Luxo |
| Final de cada **pilar** | `<SimuladorCTA variant="pillar">` | Conhecer Viralize Luxo |
| `Footer.tsx` → Recursos | ✦ Simulador da loja | (lista de recursos) |
| `Footer.tsx` → linha final | ✦ Simular minha loja | Viralize Luxo ↗ |

### Componente `SimuladorCTA`
`components/site/SimuladorCTA.tsx` — 3 variantes (`article` | `pillar` | `compact`). Use `contextLabel` pra customizar o eyebrow ("Depois desta leitura", "Da teoria à prática", etc.). Não criar variantes ad-hoc espalhadas — sempre passar pelo componente.

### Simulador standalone
`public/simulador.html` — HTML+CSS+JS puro, ~723 linhas. **Não é React.** Servido como arquivo estático em `/simulador` via rewrite no `next.config.mjs`:
```js
async rewrites() {
  return [{ source: "/simulador", destination: "/simulador.html" }];
}
```
Tem uma "portal bar" no topo (vínculo editorial → volta pro `/`) e CTA final apontando para WhatsApp da Viralize Luxo. Calcula em tempo real: alcance orgânico, receita estimada, comparativo Meta Ads vs Influencer vs Viralize Luxo.

**Se for editar o simulador:** trabalhe direto no HTML. **Não tente convertê-lo pra React** sem motivo forte — a transparência metodológica e a velocidade de carregamento dependem dele ser estático.

---

## 6. Conteúdo editorial

### Pilares (4 fixos)
1. **Diagnóstico** — o problema do alcance alugado, CAC, jaula fiscal Meta Ads
2. **Categoria** — definição de Cliente Mídia™, distinção de UGC/influencer
3. **Pesquisa** — relatórios, benchmarks, dados primários
4. **Movimento** — futuro, predições, entrevistas com lojistas pioneiros

### Artigos seed
14 artigos iniciais em `data/seed-articles.ts`, divididos entre os pilares. Endpoint `/api/seed` popula no Sanity (precisa de `SANITY_API_TOKEN` com permissão write).

### Manifesto
Hardcoded em `app/manifesto/page.tsx` — 4 seções numeradas (01–04). Texto canônico que nomeou a categoria.

### Relatório 2026
PDF está em `docs/relatorio-cliente-midia-2026.pdf`. Quando o lead preenche o form em `/relatorio`, o endpoint `/api/leads`:
1. Grava o lead em Supabase (tabela `leads`)
2. Dispara email via Resend com link/anexo do PDF

---

## 7. Env vars (precisam ir pra Vercel)

Veja `.env.example` para o template. **Onde achar cada valor:**

| Var | Onde |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | sanity.io/manage → projeto → "Project ID" |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` (padrão) |
| `SANITY_API_TOKEN` | sanity.io/manage → projeto → API → Tokens (role Editor) |
| `NEXT_PUBLIC_SUPABASE_URL` | supabase.com/dashboard → Settings → API → URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Settings → API → service_role (secret) |
| `RESEND_API_KEY` | resend.com/api-keys → Create API Key |
| `RESEND_FROM_EMAIL` | `noreply@clientemidia.com.br` (precisa domínio verificado no Resend) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | console.cloudinary.com → Dashboard |
| `CLOUDINARY_API_KEY` | console.cloudinary.com → Settings → Access Keys |
| `CLOUDINARY_API_SECRET` | idem (secret) |
| `NEXT_PUBLIC_SITE_URL` | `https://clientemidia.com.br` |

> Veja também `outputs/credenciais-cliente-midia.env` — pode ter valores pré-preenchidos das contas do Juliano. **Não comitar.**

---

## 8. Estado atual do projeto (snapshot maio/2026)

### O que está pronto
- ✅ Toda a estrutura Next.js 14 com App Router
- ✅ Sanity Studio embarcado em `/studio` com schemas dos 4 pilares
- ✅ 14 artigos seed prontos pra popular
- ✅ Manifesto canônico publicado em `/manifesto`
- ✅ 4 páginas de pilar usando `PillarPage` template
- ✅ Form de captura de leads (`/relatorio`) com integração Supabase + Resend
- ✅ Simulador interativo (`/simulador`) — Fase 7 concluída
- ✅ Sistema de CTAs reorganizado (Simulador como conversão primária)
- ✅ Header com nav + CTA Simulador
- ✅ Footer com Simulador destacado em Recursos + linha final
- ✅ Design system completo (tokens Tailwind + components utility)
- ✅ `DEPLOY.md` com checklist passo a passo

### O que está pendente
- ❌ **Deploy:** o repo nunca foi inicializado num git válido (a tentativa anterior caiu por causa do `.git` corrompido no caminho do session). Precisa `rm -rf .git && git init -b main && git add . && git commit`.
- ❌ **Remote GitHub:** não criado ainda. Precisa `gh repo create` ou criar no web UI.
- ❌ **Projeto Vercel:** não criado. Precisa importar do GitHub na Vercel após o push.
- ❌ **Env vars na Vercel:** nenhuma preenchida ainda.
- ❌ **Domínio `clientemidia.com.br`:** apontado para Hostinger, mas o DNS ainda não foi configurado pra apontar pra Vercel (registros A + CNAME pendentes).
- ❌ **Domínio no Resend:** Fase 6.2 foi marcada como concluída em forma de instrução, mas não verifiquei se de fato `clientemidia.com.br` foi adicionado e os registros DKIM/SPF/DMARC propagaram. Confirmar em https://resend.com/domains.
- ❌ **Seed inicial Sanity:** o endpoint `/api/seed` existe mas ainda não foi disparado. Roda depois do primeiro deploy.
- ❌ **Página `/como-funciona`:** marcada como concluída no task list de uma fase anterior, mas o arquivo não existe (`app/como-funciona/page.tsx` ausente). Decidir: criar ou remover referências (no momento não há links pra ela em nenhum lugar).
- ❌ **Covers de artigo:** componente `ArticleCover` SVG editorial foi criado (Fase 4.1) — verificar uso em `ArticleCard`. Prompts de IA pra gerar covers reais estão em `docs/prompts-ia-imagens-anchors.html`.

### Armadilhas conhecidas
- O `.gitignore` está correto, mas confira que `.env.local`, `credenciais-*.env` e `.vercel/` realmente estão sendo ignorados antes do primeiro push.
- O Sanity Studio em `/studio` é público — qualquer um acessa, mas só edita quem tem conta vinculada ao projeto Sanity. Confirme o controle de acesso em sanity.io/manage.
- O `simulador.html` é renderizado FORA do React. Não tenta passar estado entre o Next.js e ele — qualquer comunicação tem que ser via URL params ou postMessage.
- O `RESEND_FROM_EMAIL` só funciona se o domínio estiver verificado no Resend. Antes da verificação, use `onboarding@resend.dev` pra testar.
- A Vercel auto-detecta Next.js — não precisa configurar build/output manualmente.

---

## 9. Próximos passos imediatos (para o Claude do Cursor)

1. **Mover o projeto pra uma pasta limpa** (fora do session folder do Claude Desktop). Sugestão: `C:\Projetos\clientemidia-portal`.
2. **`rm -rf .git && git init -b main`** dentro de `portal/`, configurar `user.name` e `user.email`.
3. **`git add . && git commit -m "feat: portal Cliente Midia inaugural"`** — primeiro commit que captura tudo.
4. **Criar repo no GitHub** (`gh repo create clientemidia-portal --private --source=. --remote=origin --push`) ou via web UI.
5. **Importar na Vercel** apontando para o repo. Framework Preset = Next.js (auto-detectado).
6. **Preencher env vars na Vercel** (veja seção 7). Sem isso, o primeiro deploy quebra na build.
7. **Apontar DNS** no Hostinger para a Vercel (a Vercel mostra os registros A + CNAME na hora de adicionar o domínio).
8. **Verificar domínio no Resend** se ainda não foi feito (DKIM, SPF, DMARC no DNS).
9. **Rodar `/api/seed`** depois do primeiro deploy bem-sucedido pra popular os 14 artigos.
10. **Smoke test** em todas as rotas listadas no DEPLOY.md seção 7.

O `DEPLOY.md` na raiz tem o passo a passo completo de cada um desses itens.

---

## 10. Histórico de conversa anterior (contexto para você)

Esse projeto foi construído em sessões iterativas com o Juliano. As decisões estratégicas mais importantes:

- **Posicionar como Centro de Autoridade editorial** (não como site da Viralize Luxo) — isso permite atrair tráfego orgânico que confia no conteúdo antes de chegar na oferta comercial. A Viralize Luxo aparece como "plataforma que ativa o modelo", nunca como dona do portal.
- **Nomear a categoria "Cliente Mídia™"** — registrar marca, criar o glossário canônico, distinguir de UGC/influencer. O termo é repetido com persistência editorial em todos os documentos.
- **Promover o Simulador como conversão primária** — substitui o "Conhecer Viralize Luxo" como CTA dominante. Razão: mantém o leitor no portal, personaliza com os números reais da loja dele, e o próprio simulador já tem CTA WhatsApp no final. Tripla camada de confiança (autoridade do portal → transparência do simulador → solução da Viralize Luxo).
- **Stack pragmática, Vercel-first** — Next.js + Sanity é o caminho mais curto entre "publicar artigo" e "ar". Tudo o que não é absolutamente necessário pra MVP foi adiado (analytics avançado, A/B testing, comunidade).

Bom trabalho. — *Claude, da sessão anterior, Cowork mode*
