# Deploy — Portal Cliente Mídia™

Guia passo a passo para subir o portal de zero ao ar em **clientemidia.com.br**.
Tempo estimado: ~25 minutos (a maior parte é preencher env vars).

---

## 0. Pré-requisitos (você já deve ter)

- Conta no GitHub: https://github.com
- Conta na Vercel: https://vercel.com  (faça login com o mesmo GitHub)
- Git instalado no Windows: https://git-scm.com/download/win
- Domínio `clientemidia.com.br` registrado (Hostinger, segundo histórico)

---

## 1. Inicializar o repositório local (no Windows)

Abra o **Git Bash** ou **PowerShell** na pasta do portal:

```bash
cd "C:\Users\MASTER\AppData\Roaming\Claude\local-agent-mode-sessions\bae40d8f-f238-475a-9e04-e30144332933\f2d4ecb5-8a63-4033-83ea-77d55e53b7a4\local_db0b225e-862a-4991-b52a-cbf636e1d91f\outputs\portal"

# Remove o .git quebrado e recomeça limpo
rm -rf .git
git init -b main
git config user.email "grupodigital163@gmail.com"
git config user.name "Juliano"

git add .
git commit -m "feat: portal Cliente Midia inaugural com Simulador como conversao primaria"
```

> Esse único commit captura tudo: Sanity Studio, Supabase, Resend, simulador estático, todos os pilares, manifesto, relatório, artigos, CTAs reorganizados.

---

## 2. Criar o repositório no GitHub

1. Abra https://github.com/new
2. **Repository name:** `clientemidia-portal`
3. **Visibility:** Private (recomendado — pode mudar depois)
4. **NÃO marque** "Add README", "Add .gitignore" ou "Choose a license" — o repo local já tem
5. Clique **Create repository**
6. Na tela seguinte, copie a linha do bloco **"…or push an existing repository from the command line"**.  Vai ser algo como:
   ```bash
   git remote add origin https://github.com/SEU-USUARIO/clientemidia-portal.git
   git branch -M main
   git push -u origin main
   ```
7. Cole isso no terminal (na pasta `portal/`) e dá Enter.

Se for solicitada autenticação, o Git Credential Manager vai abrir uma janela do navegador — entre com sua conta GitHub.

---

## 3. Importar na Vercel

1. Abra https://vercel.com/new
2. Clique em **"Import Git Repository"** e selecione `clientemidia-portal`
   (Se ele não aparecer, clique em "Adjust GitHub App Permissions" e dê acesso ao repo.)
3. Na tela "Configure Project":
   - **Project Name:** `clientemidia-portal`  (pode manter)
   - **Framework Preset:** `Next.js`  (auto-detectado)
   - **Root Directory:** deixe vazio (raiz) — o `package.json` está na raiz do repo
   - **Build / Output / Install:** deixe os padrões da Vercel
4. **Environment Variables** — abra o accordion e cole cada par. Os valores você pega das contas correspondentes (instruções abaixo de cada bloco):

### 3.1 Sanity (CMS — onde os artigos vão morar)
```
NEXT_PUBLIC_SANITY_PROJECT_ID = <seu project id>
NEXT_PUBLIC_SANITY_DATASET    = production
SANITY_API_TOKEN              = <token com permissão de read+write>
```
> Onde achar: https://sanity.io/manage → seu projeto → **API** → "Tokens" (crie um com role `Editor`).

### 3.2 Supabase (leads do formulário do relatório)
```
NEXT_PUBLIC_SUPABASE_URL        = https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY   = <chave anônima>
SUPABASE_SERVICE_ROLE_KEY       = <chave service role>
```
> Onde achar: https://supabase.com/dashboard → seu projeto → **Settings** → **API**.

### 3.3 Resend (envio do PDF do relatório por email)
```
RESEND_API_KEY     = re_xxx
RESEND_FROM_EMAIL  = noreply@clientemidia.com.br
```
> Onde achar: https://resend.com/api-keys → "Create API Key" → permission `Full access`.
> O domínio `clientemidia.com.br` deve estar **verificado** no Resend antes do primeiro envio (Fase 6.2).

### 3.4 Cloudinary (imagens dos covers, se for usar)
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = <cloud name>
CLOUDINARY_API_KEY                = <api key>
CLOUDINARY_API_SECRET             = <api secret>
```
> Onde achar: https://console.cloudinary.com → "Settings" → "Access Keys".
> Se ainda não vai usar Cloudinary, pode preencher os 3 com `dummy` e configurar depois — o build não quebra.

### 3.5 Site
```
NEXT_PUBLIC_SITE_URL = https://clientemidia.com.br
```

5. Clique **Deploy**.

A primeira build leva ~2-3 minutos. Você vai ver o log em tempo real. Se quebrar, copia o erro e me manda aqui — geralmente é env var faltando.

---

## 4. Configurar o domínio clientemidia.com.br

1. Depois do deploy ok, na Vercel: **Project → Settings → Domains**
2. Em "Add domain" digite: `clientemidia.com.br`
3. A Vercel vai pedir registros DNS — algo como:
   ```
   A      @       76.76.21.21
   CNAME  www     cname.vercel-dns.com
   ```
4. No **Hostinger** (onde o domínio está registrado):
   - hPanel → Domínios → `clientemidia.com.br` → **Zona DNS**
   - Apague os registros A/CNAME antigos do `@` e `www` (se existirem e apontarem para outro lugar)
   - Adicione os registros que a Vercel pediu
5. Volte na Vercel e clique em **Refresh** ao lado do domínio. Em 5-30 min ele valida e gera o SSL automaticamente.

---

## 5. Seed inicial dos artigos (Sanity)

Com o site no ar:
1. Acesse https://clientemidia.com.br/studio  → faça login com a conta Sanity
2. Acesse https://clientemidia.com.br/api/seed → popular os 14 artigos iniciais via API
   (o endpoint só roda se `SANITY_API_TOKEN` tiver permissão de write)

---

## 6. Deploys futuros — workflow padrão

A partir daqui, cada `git push` na branch `main` dispara um deploy automático na Vercel:

```bash
cd portal
git add .
git commit -m "feat: nova landing X"
git push
```

Em ~2 minutos a nova versão está em produção. Preview branches (`git checkout -b feature/algo`) ganham URL própria de staging automaticamente.

---

## 7. Checklist de smoke test pós-deploy

Quando o domínio estiver ativo, abra:

- [ ] `https://clientemidia.com.br/` — homepage carrega com CTA do Simulador
- [ ] `https://clientemidia.com.br/simulador` — simulador interativo carrega, sliders funcionam
- [ ] `https://clientemidia.com.br/manifesto` — texto longo + CTAs no fim
- [ ] `https://clientemidia.com.br/relatorio` — formulário visível
- [ ] `https://clientemidia.com.br/diagnostico` — pilar carrega
- [ ] `https://clientemidia.com.br/artigos` — listagem de artigos
- [ ] `https://clientemidia.com.br/studio` — Sanity Studio abre
- [ ] Submeter o form de relatório com seu próprio email — confirmar que chega via Resend

---

## Dúvidas / problemas comuns

**"Build failed: Module not found"** → falta dependência ou import errado. Cola o log aqui.

**"Environment variable X is required"** → falta uma env var no Vercel. Adiciona em Settings → Environment Variables e clica em "Redeploy" no último deploy.

**SSL não valida no domínio** → registros DNS errados ou TTL alto. Espera 30 min e dá refresh. Se persistir, verifica no https://dnschecker.org se o A record já propagou.

**Resend não envia** → domínio não verificado. Vai em https://resend.com/domains, adiciona `clientemidia.com.br`, copia os registros DKIM/SPF/DMARC e cola no DNS do Hostinger.
