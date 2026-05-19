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

type ItemStatus = "pending" | "processing" | "done" | "error";

export default function AdminArtigosPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [status, setStatus] = useState<Record<string, ItemStatus>>({});
  const [errorMsg, setErrorMsg] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [processingAll, setProcessingAll] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  useEffect(() => {
    fetch(`/api/admin/list-drafts?key=${API_KEY}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setFetchError(data.error);
        } else {
          setDrafts(data.drafts ?? []);
        }
        setLoading(false);
      })
      .catch((e) => {
        setFetchError(String(e));
        setLoading(false);
      });
  }, []);

  const processOne = useCallback(async (id: string) => {
    setStatus((s) => ({ ...s, [id]: "processing" }));
    setErrorMsg((m) => { const next = { ...m }; delete next[id]; return next; });

    try {
      const res = await fetch("/api/admin/process-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, key: API_KEY }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus((s) => ({ ...s, [id]: "done" }));
      } else {
        setStatus((s) => ({ ...s, [id]: "error" }));
        setErrorMsg((m) => ({ ...m, [id]: data.error ?? "Erro desconhecido" }));
      }
    } catch (e) {
      setStatus((s) => ({ ...s, [id]: "error" }));
      setErrorMsg((m) => ({ ...m, [id]: String(e) }));
    }
  }, []);

  async function processAll() {
    const toProcess = drafts.filter((d) => status[d._id] !== "done");
    if (toProcess.length === 0) return;

    setProcessingAll(true);
    setProgress({ done: 0, total: toProcess.length });

    for (const draft of toProcess) {
      await processOne(draft._id);
      setProgress((p) => ({ ...p, done: p.done + 1 }));
    }

    setProcessingAll(false);
  }

  const doneCount = Object.values(status).filter((s) => s === "done").length;

  return (
    <main className="min-h-screen bg-ink-deep px-8 py-16 text-cream-warm">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-12 border-b border-line-dark pb-8">
          <div className="mb-4 flex items-baseline gap-2">
            <span className="font-serif text-[32px] font-medium">
              Cliente <em className="italic">Mídia</em>
            </span>
            <sup className="text-xs text-gold">TM</sup>
          </div>
          <h1 className="mb-2 font-serif text-4xl font-medium text-gold-soft">
            Admin — Publicação de Artigos
          </h1>
          <p className="text-sm text-sepia">
            Expande conteúdo escasso com IA, gera imagens com Fal.ai e publica no Sanity.
          </p>
        </div>

        {/* Status summary */}
        {drafts.length > 0 && (
          <div className="mb-8 grid grid-cols-3 gap-4">
            <div className="border border-line-dark p-4">
              <div className="font-serif text-3xl text-cream-warm">{drafts.length}</div>
              <div className="mt-1 text-xs text-sepia uppercase tracking-eyebrow">Rascunhos</div>
            </div>
            <div className="border border-line-dark p-4">
              <div className="font-serif text-3xl text-gold">
                {drafts.filter((d) => d.bodyLength < 10).length}
              </div>
              <div className="mt-1 text-xs text-sepia uppercase tracking-eyebrow">Precisam expansão</div>
            </div>
            <div className="border border-line-dark p-4">
              <div className="font-serif text-3xl text-green-400">{doneCount}</div>
              <div className="mt-1 text-xs text-sepia uppercase tracking-eyebrow">Publicados agora</div>
            </div>
          </div>
        )}

        {/* Actions */}
        {drafts.length > 0 && (
          <div className="mb-10 flex items-center gap-6">
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
              <p className="text-sm text-sepia">
                Não feche esta janela. Cada artigo leva ±30 segundos.
              </p>
            )}
          </div>
        )}

        {/* Loading / empty / error states */}
        {loading && (
          <p className="py-12 text-center text-sepia">Carregando rascunhos do Sanity…</p>
        )}

        {!loading && fetchError && (
          <div className="rounded border border-red-800 bg-red-950/30 p-4 text-sm text-red-400">
            Erro ao buscar rascunhos: {fetchError}
          </div>
        )}

        {!loading && !fetchError && drafts.length === 0 && (
          <div className="py-16 text-center text-sepia">
            <p className="mb-2 font-serif text-2xl">Nenhum rascunho encontrado.</p>
            <p className="text-sm">Todos os artigos já foram publicados ou o Sanity está vazio.</p>
          </div>
        )}

        {/* Articles list */}
        {!loading && drafts.length > 0 && (
          <div className="divide-y divide-line-dark">
            {drafts.map((draft) => {
              const st = status[draft._id] ?? "pending";
              const isThin = draft.bodyLength < 10;

              return (
                <div
                  key={draft._id}
                  className="grid gap-6 py-8 md:grid-cols-[1fr_180px]"
                >
                  {/* Info */}
                  <div className="flex gap-4">
                    {/* Status dot */}
                    <div className="mt-2 flex-shrink-0">
                      <span
                        className={`block h-2.5 w-2.5 rounded-full ${
                          st === "done"
                            ? "bg-green-500"
                            : st === "error"
                            ? "bg-red-500"
                            : st === "processing"
                            ? "animate-pulse bg-yellow-400"
                            : "bg-line-dark"
                        }`}
                      />
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-serif text-xl leading-tight text-cream-warm">
                        {draft.title}
                      </h2>

                      {/* Badges */}
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                        <span className="text-gold">{draft.pillarTitle ?? draft.pillarSlug}</span>
                        <span className="text-sepia">
                          {draft.bodyLength} blocos
                          {isThin && (
                            <span className="ml-1 text-yellow-400">⚠ escasso — será expandido</span>
                          )}
                        </span>
                        {draft.hasHeroImage ? (
                          <span className="text-green-400">✓ imagem</span>
                        ) : (
                          <span className="text-sepia">sem imagem — será gerada</span>
                        )}
                      </div>

                      {/* Excerpt */}
                      {draft.excerpt && (
                        <p className="mt-3 text-sm leading-relaxed text-sepia line-clamp-2">
                          {draft.excerpt}
                        </p>
                      )}

                      {/* Error message */}
                      {st === "error" && errorMsg[draft._id] && (
                        <p className="mt-2 text-xs text-red-400">
                          {errorMsg[draft._id]}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-end">
                    {st === "done" ? (
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-400">✓ Publicado</div>
                        <a
                          href={`/artigos/${draft.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 block text-xs text-sepia hover:text-gold"
                        >
                          Ver artigo →
                        </a>
                      </div>
                    ) : st === "error" ? (
                      <button
                        onClick={() => processOne(draft._id)}
                        className="text-sm text-red-400 hover:text-red-300"
                      >
                        Erro — Tentar novamente
                      </button>
                    ) : st === "processing" ? (
                      <div className="text-sm text-yellow-400">Processando…</div>
                    ) : (
                      <button
                        onClick={() => processOne(draft._id)}
                        disabled={processingAll}
                        className="btn-primary py-2 px-5 text-sm disabled:opacity-40"
                      >
                        Processar →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer note */}
        <div className="mt-16 border-t border-line-dark pt-8 text-xs text-sepia">
          <p>
            Cada artigo: expande conteúdo escasso com Groq, gera imagem com Fal.ai flux/dev, publica
            no Sanity. Artigos completos só recebem imagem e são publicados.
          </p>
          <p className="mt-1">
            Timeout máximo por artigo: 60 segundos. Se expirar, clique em "Tentar novamente".
          </p>
        </div>
      </div>
    </main>
  );
}
