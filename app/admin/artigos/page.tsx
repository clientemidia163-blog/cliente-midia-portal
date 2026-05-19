"use client";

import { useState, useEffect, useCallback } from "react";

const API_KEY = "cm-cron-7z9dus8m-2026";

type Draft = {
  _id: string;
  _updatedAt: string;
  title: string;
  slug: string;
  pillarTitle: string;
  pillarSlug: string;
  bodyLength: number;
  hasHeroImage: boolean;
  excerpt: string;
};

type Published = {
  _id: string;
  title: string;
  slug: string;
  pillarTitle: string;
  pillarSlug: string;
  hasHeroImage: boolean;
  bodyLength: number;
};

type ItemStatus = "pending" | "processing" | "done" | "error";
type Tab = "drafts" | "published";

export default function AdminArtigosPage() {
  const [tab, setTab] = useState<Tab>("drafts");

  // ── Rascunhos ────────────────────────────────────────────────────────────
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [draftStatus, setDraftStatus] = useState<Record<string, ItemStatus>>({});
  const [draftError, setDraftError] = useState<Record<string, string>>({});
  const [loadingDrafts, setLoadingDrafts] = useState(true);
  const [processingAll, setProcessingAll] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  // ── Publicados ───────────────────────────────────────────────────────────
  const [published, setPublished] = useState<Published[]>([]);
  const [regenStatus, setRegenStatus] = useState<Record<string, ItemStatus>>({});
  const [regenError, setRegenError] = useState<Record<string, string>>({});
  const [regenConcept, setRegenConcept] = useState<Record<string, string>>({});
  const [loadingPublished, setLoadingPublished] = useState(false);
  const [publishedFetched, setPublishedFetched] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/list-drafts?key=${API_KEY}`)
      .then((r) => r.json())
      .then((data) => {
        setDrafts(data.drafts ?? []);
        setLoadingDrafts(false);
      })
      .catch(() => setLoadingDrafts(false));
  }, []);

  function fetchPublished() {
    if (publishedFetched) return;
    setLoadingPublished(true);
    fetch(`/api/admin/list-published?key=${API_KEY}`)
      .then((r) => r.json())
      .then((data) => {
        setPublished(data.articles ?? []);
        setLoadingPublished(false);
        setPublishedFetched(true);
      })
      .catch(() => setLoadingPublished(false));
  }

  function switchTab(t: Tab) {
    setTab(t);
    if (t === "published") fetchPublished();
  }

  // ── Processar rascunho ───────────────────────────────────────────────────
  const processOne = useCallback(async (id: string) => {
    setDraftStatus((s) => ({ ...s, [id]: "processing" }));
    setDraftError((m) => { const next = { ...m }; delete next[id]; return next; });

    try {
      const res = await fetch("/api/admin/process-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, key: API_KEY }),
      });
      const data = await res.json();
      if (res.ok) {
        setDraftStatus((s) => ({ ...s, [id]: "done" }));
      } else {
        setDraftStatus((s) => ({ ...s, [id]: "error" }));
        setDraftError((m) => ({ ...m, [id]: data.error ?? "Erro desconhecido" }));
      }
    } catch (e) {
      setDraftStatus((s) => ({ ...s, [id]: "error" }));
      setDraftError((m) => ({ ...m, [id]: String(e) }));
    }
  }, []);

  async function processAll() {
    const toProcess = drafts.filter((d) => draftStatus[d._id] !== "done");
    if (!toProcess.length) return;
    setProcessingAll(true);
    setProgress({ done: 0, total: toProcess.length });
    for (const draft of toProcess) {
      await processOne(draft._id);
      setProgress((p) => ({ ...p, done: p.done + 1 }));
    }
    setProcessingAll(false);
  }

  // ── Regenerar imagem ─────────────────────────────────────────────────────
  const regenerateImage = useCallback(async (slug: string) => {
    setRegenStatus((s) => ({ ...s, [slug]: "processing" }));
    setRegenError((m) => { const next = { ...m }; delete next[slug]; return next; });
    setRegenConcept((m) => { const next = { ...m }; delete next[slug]; return next; });

    try {
      const res = await fetch("/api/admin/regenerate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, key: API_KEY }),
      });
      const data = await res.json();
      if (res.ok) {
        setRegenStatus((s) => ({ ...s, [slug]: "done" }));
        // Mostra o conceito visual gerado para referência
        if (data.visualConcept) {
          setRegenConcept((m) => ({ ...m, [slug]: data.visualConcept }));
        }
        // Marca como com imagem
        setPublished((prev) =>
          prev.map((a) => (a.slug === slug ? { ...a, hasHeroImage: true } : a))
        );
      } else {
        setRegenStatus((s) => ({ ...s, [slug]: "error" }));
        setRegenError((m) => ({ ...m, [slug]: data.error ?? "Erro desconhecido" }));
      }
    } catch (e) {
      setRegenStatus((s) => ({ ...s, [slug]: "error" }));
      setRegenError((m) => ({ ...m, [slug]: String(e) }));
    }
  }, []);

  const doneCount = Object.values(draftStatus).filter((s) => s === "done").length;

  return (
    <main className="min-h-screen bg-ink-deep px-8 py-16 text-cream-warm">
      <div className="mx-auto max-w-[1200px]">

        {/* Header */}
        <div className="mb-10 border-b border-line-dark pb-8">
          <div className="mb-3 flex items-baseline gap-2">
            <span className="font-serif text-[28px] font-medium">
              Cliente <em className="italic">Mídia</em>
            </span>
            <sup className="text-xs text-gold">TM</sup>
          </div>
          <h1 className="font-serif text-4xl font-medium text-gold-soft">
            Admin — Artigos
          </h1>
          <p className="mt-2 text-sm text-sepia">
            Expande conteúdo com IA, gera imagens lendo o artigo completo e publica no Sanity.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-1 border-b border-line-dark">
          <button
            onClick={() => switchTab("drafts")}
            className={`px-5 py-3 text-sm font-medium transition-colors ${
              tab === "drafts"
                ? "border-b-2 border-gold text-gold"
                : "text-sepia hover:text-cream-warm"
            }`}
          >
            Rascunhos{drafts.length > 0 && ` (${drafts.length})`}
          </button>
          <button
            onClick={() => switchTab("published")}
            className={`px-5 py-3 text-sm font-medium transition-colors ${
              tab === "published"
                ? "border-b-2 border-gold text-gold"
                : "text-sepia hover:text-cream-warm"
            }`}
          >
            Publicados — Regenerar Imagem
          </button>
        </div>

        {/* ── ABA: RASCUNHOS ──────────────────────────────────────────────── */}
        {tab === "drafts" && (
          <>
            {/* Counters */}
            {drafts.length > 0 && (
              <div className="mb-8 grid grid-cols-3 gap-4">
                <div className="border border-line-dark p-4">
                  <div className="font-serif text-3xl">{drafts.length}</div>
                  <div className="mt-1 text-xs uppercase tracking-eyebrow text-sepia">Rascunhos</div>
                </div>
                <div className="border border-line-dark p-4">
                  <div className="font-serif text-3xl text-yellow-400">
                    {drafts.filter((d) => d.bodyLength < 10).length}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-eyebrow text-sepia">Precisam expansão</div>
                </div>
                <div className="border border-line-dark p-4">
                  <div className="font-serif text-3xl text-green-400">{doneCount}</div>
                  <div className="mt-1 text-xs uppercase tracking-eyebrow text-sepia">Publicados agora</div>
                </div>
              </div>
            )}

            {/* Processar Todos */}
            {drafts.length > 0 && (
              <div className="mb-8 flex items-center gap-5">
                <button
                  onClick={processAll}
                  disabled={processingAll || doneCount === drafts.length}
                  className="btn-primary disabled:opacity-40"
                >
                  {processingAll
                    ? `Processando ${progress.done + 1}/${progress.total}…`
                    : doneCount === drafts.length
                    ? "✓ Todos publicados"
                    : `✦ Processar Todos (${drafts.length - doneCount} restantes)`}
                </button>
                {processingAll && (
                  <p className="text-sm text-sepia">Não feche esta janela. ~30s por artigo.</p>
                )}
              </div>
            )}

            {loadingDrafts && (
              <p className="py-12 text-center text-sepia">Carregando rascunhos…</p>
            )}

            {!loadingDrafts && drafts.length === 0 && (
              <div className="py-16 text-center text-sepia">
                <p className="font-serif text-2xl">Nenhum rascunho encontrado.</p>
                <p className="mt-2 text-sm">
                  Todos os artigos já foram publicados ou o pipeline ainda não rodou.
                </p>
              </div>
            )}

            <div className="divide-y divide-line-dark">
              {drafts.map((draft) => {
                const st = draftStatus[draft._id] ?? "pending";
                const isThin = draft.bodyLength < 10;

                return (
                  <div key={draft._id} className="grid gap-6 py-8 md:grid-cols-[1fr_180px]">
                    <div className="flex gap-4">
                      <span className={`mt-2 block h-2.5 w-2.5 flex-shrink-0 rounded-full ${
                        st === "done" ? "bg-green-500"
                        : st === "error" ? "bg-red-500"
                        : st === "processing" ? "animate-pulse bg-yellow-400"
                        : "bg-line-dark"
                      }`} />
                      <div className="min-w-0">
                        <h2 className="font-serif text-xl leading-tight">{draft.title}</h2>
                        <div className="mt-2 flex flex-wrap gap-3 text-xs">
                          <span className="text-gold">{draft.pillarTitle ?? draft.pillarSlug}</span>
                          <span className="text-sepia">
                            {draft.bodyLength} blocos
                            {isThin && <span className="ml-1 text-yellow-400">⚠ será expandido</span>}
                          </span>
                          {draft.hasHeroImage
                            ? <span className="text-green-400">✓ imagem</span>
                            : <span className="text-sepia">sem imagem — será gerada</span>}
                        </div>
                        {draft.excerpt && (
                          <p className="mt-2 text-sm leading-relaxed text-sepia line-clamp-2">{draft.excerpt}</p>
                        )}
                        {st === "error" && draftError[draft._id] && (
                          <p className="mt-2 text-xs text-red-400">{draftError[draft._id]}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      {st === "done" ? (
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-400">✓ Publicado</div>
                          <a href={`/artigos/${draft.slug}`} target="_blank" rel="noreferrer"
                            className="mt-1 block text-xs text-sepia hover:text-gold">
                            Ver artigo →
                          </a>
                        </div>
                      ) : st === "error" ? (
                        <button onClick={() => processOne(draft._id)}
                          className="text-sm text-red-400 hover:text-red-300">
                          Erro — Tentar novamente
                        </button>
                      ) : st === "processing" ? (
                        <div className="text-sm text-yellow-400">Processando…</div>
                      ) : (
                        <button onClick={() => processOne(draft._id)} disabled={processingAll}
                          className="btn-primary px-5 py-2 text-sm disabled:opacity-40">
                          Processar →
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {drafts.length > 0 && (
              <p className="mt-12 border-t border-line-dark pt-8 text-xs text-sepia">
                Artigos escassos são expandidos com Groq. Imagens geradas com Fal.ai flux/dev — o Groq lê
                o artigo completo para criar o conceito visual mais preciso possível. Timeout: 60s por artigo.
              </p>
            )}
          </>
        )}

        {/* ── ABA: PUBLICADOS ─────────────────────────────────────────────── */}
        {tab === "published" && (
          <>
            <div className="mb-8">
              <p className="text-sm leading-relaxed text-sepia">
                Clique em <strong className="text-cream-warm">Regenerar Imagem</strong> em qualquer artigo
                para gerar uma nova capa. O Groq lê o artigo inteiro — título, subtítulo e todos os
                parágrafos — e cria o conceito visual mais preciso antes de enviar pro Fal.ai. Leva ~30s.
              </p>
            </div>

            {loadingPublished && (
              <p className="py-12 text-center text-sepia">Carregando artigos publicados…</p>
            )}

            {!loadingPublished && published.length === 0 && publishedFetched && (
              <div className="py-16 text-center text-sepia">
                <p className="font-serif text-2xl">Nenhum artigo publicado ainda.</p>
                <p className="mt-2 text-sm">Processe os rascunhos primeiro na aba anterior.</p>
              </div>
            )}

            <div className="divide-y divide-line-dark">
              {published.map((article) => {
                const st = regenStatus[article.slug] ?? "pending";

                return (
                  <div key={article._id} className="grid gap-6 py-8 md:grid-cols-[1fr_200px]">
                    <div>
                      <h2 className="font-serif text-xl leading-tight">{article.title}</h2>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs">
                        <span className="text-gold">{article.pillarTitle ?? article.pillarSlug}</span>
                        <span className="text-sepia">{article.bodyLength} blocos</span>
                        {article.hasHeroImage
                          ? <span className="text-green-400">✓ imagem atual</span>
                          : <span className="text-yellow-400">sem imagem</span>}
                      </div>

                      {/* Conceito visual gerado pelo Groq — visível após regenerar */}
                      {regenConcept[article.slug] && (
                        <div className="mt-4 border-l-2 border-gold pl-4">
                          <p className="text-[11px] uppercase tracking-eyebrow text-gold">
                            Conceito visual usado:
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-sepia italic">
                            {regenConcept[article.slug]}
                          </p>
                        </div>
                      )}

                      {st === "error" && regenError[article.slug] && (
                        <p className="mt-2 text-xs text-red-400">{regenError[article.slug]}</p>
                      )}
                    </div>

                    <div className="flex flex-col items-end justify-center gap-2">
                      {st === "done" ? (
                        <>
                          <div className="text-sm font-medium text-green-400">✓ Nova imagem aplicada</div>
                          <button
                            onClick={() => regenerateImage(article.slug)}
                            className="text-xs text-sepia hover:text-gold"
                          >
                            Gerar outra →
                          </button>
                          <a href={`/artigos/${article.slug}`} target="_blank" rel="noreferrer"
                            className="text-xs text-sepia hover:text-gold">
                            Ver artigo →
                          </a>
                        </>
                      ) : st === "error" ? (
                        <button onClick={() => regenerateImage(article.slug)}
                          className="text-sm text-red-400 hover:text-red-300">
                          Erro — Tentar novamente
                        </button>
                      ) : st === "processing" ? (
                        <div className="text-center">
                          <div className="text-sm text-yellow-400">Gerando…</div>
                          <div className="mt-1 text-xs text-sepia">Groq lendo artigo → Fal.ai</div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => regenerateImage(article.slug)}
                            className="btn-primary px-4 py-2 text-sm"
                          >
                            ↺ Regenerar Imagem
                          </button>
                          <a href={`/artigos/${article.slug}`} target="_blank" rel="noreferrer"
                            className="text-xs text-sepia hover:text-gold">
                            Ver artigo →
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {published.length > 0 && (
              <p className="mt-12 border-t border-line-dark pt-8 text-xs text-sepia">
                Fluxo: Groq lê o artigo completo → identifica o tema central → cria conceito visual em inglês → Fal.ai
                gera a imagem → Sanity atualiza o heroImage. O conceito visual ficará visível após a geração para
                você avaliar o raciocínio da IA.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
