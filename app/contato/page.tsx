"use client";

import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const SUBJECTS = [
  "Quero entender melhor o modelo Cliente Mídia™",
  "Tenho interesse na Viralize Luxo",
  "Proposta de parceria editorial",
  "Imprensa e mídia",
  "Outro assunto"
];

export default function ContatoPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        body: new URLSearchParams({
          email: data.get("email") as string,
          name: data.get("name") as string,
          source: `contato_${(data.get("subject") as string).toLowerCase().replace(/\s+/g, "_").slice(0, 30)}`
        })
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main>
      <Header />

      {/* HERO */}
      <section className="border-b border-line-dark px-8 py-24 md:py-32">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-8 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="eyebrow">Institucional · Contato</span>
          </div>
          <h1 className="mb-8 max-w-3xl font-serif text-5xl font-medium leading-[1.04] tracking-tight md:text-[76px]">
            Fale com o time{" "}
            <em className="italic text-gold-soft">Cliente Mídia™</em>.
          </h1>
          <p className="max-w-[600px] text-lg font-light leading-relaxed text-sepia">
            Para questões editoriais, parcerias, imprensa ou interesse na
            plataforma Viralize Luxo. Respondemos em até 48 horas úteis.
          </p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1240px] grid gap-20 md:grid-cols-[1.4fr_1fr]">

          {/* FORM */}
          <div>
            {status === "sent" ? (
              <div className="border border-gold/40 bg-ink-deep p-12 text-center">
                <div className="mb-4 font-serif text-4xl text-gold">✦</div>
                <h2 className="mb-4 font-serif text-2xl font-medium">
                  Mensagem recebida.
                </h2>
                <p className="text-sepia">
                  Retornaremos em até 48 horas úteis no e-mail informado.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="border-b border-line-dark pb-3">
                    <label className="mb-2 block text-[11px] uppercase tracking-eyebrow text-gold">
                      Nome
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Seu nome"
                      className="w-full bg-transparent text-base text-cream-warm outline-none placeholder:text-sepia"
                    />
                  </div>
                  <div className="border-b border-line-dark pb-3">
                    <label className="mb-2 block text-[11px] uppercase tracking-eyebrow text-gold">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="seu@email.com"
                      className="w-full bg-transparent text-base text-cream-warm outline-none placeholder:text-sepia"
                    />
                  </div>
                </div>

                <div className="border-b border-line-dark pb-3">
                  <label className="mb-2 block text-[11px] uppercase tracking-eyebrow text-gold">
                    Assunto
                  </label>
                  <select
                    name="subject"
                    required
                    className="w-full bg-transparent text-base text-cream-warm outline-none"
                  >
                    <option value="" disabled selected className="bg-ink">
                      Selecione o assunto
                    </option>
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s} className="bg-ink">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-b border-line-dark pb-3">
                  <label className="mb-2 block text-[11px] uppercase tracking-eyebrow text-gold">
                    Mensagem
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Descreva brevemente o que você precisa..."
                    className="w-full bg-transparent text-base text-cream-warm outline-none placeholder:text-sepia resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">
                    Erro ao enviar. Tente novamente ou escreva diretamente para{" "}
                    <a href="mailto:contato@clientemidia.com.br" className="text-gold underline">
                      contato@clientemidia.com.br
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary disabled:opacity-50"
                >
                  {status === "sending" ? "Enviando..." : "Enviar mensagem →"}
                </button>
              </form>
            )}
          </div>

          {/* INFO */}
          <div className="space-y-12">
            <div>
              <h3 className="mb-4 border-b border-line-dark pb-4 text-[11px] font-medium uppercase tracking-eyebrow text-gold">
                E-mail direto
              </h3>
              <a
                href="mailto:contato@clientemidia.com.br"
                className="font-serif text-xl text-cream-warm hover:text-gold transition-colors"
              >
                contato@clientemidia.com.br
              </a>
            </div>

            <div>
              <h3 className="mb-4 border-b border-line-dark pb-4 text-[11px] font-medium uppercase tracking-eyebrow text-gold">
                Imprensa
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-sepia">
                Para solicitações de pauta, entrevistas e dados de pesquisa.
              </p>
              <a
                href="mailto:imprensa@clientemidia.com.br"
                className="text-sm text-cream-warm hover:text-gold transition-colors"
              >
                imprensa@clientemidia.com.br
              </a>
            </div>

            <div>
              <h3 className="mb-4 border-b border-line-dark pb-4 text-[11px] font-medium uppercase tracking-eyebrow text-gold">
                A plataforma
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-sepia">
                Para implementar o modelo Cliente Mídia™ na sua loja, acesse a
                Viralize Luxo — a plataforma oficial do método.
              </p>
              <a
                href="https://viralizeluxo.com.br"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gold hover:opacity-80 transition-opacity"
              >
                viralizeluxo.com.br ↗
              </a>
            </div>

            <div>
              <h3 className="mb-4 border-b border-line-dark pb-4 text-[11px] font-medium uppercase tracking-eyebrow text-gold">
                Localização editorial
              </h3>
              <p className="text-sm leading-relaxed text-sepia">
                São Paulo · Brasil<br />
                Publicação digital · Sem escritório físico
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
