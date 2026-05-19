"use client";

import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default function NewsletterPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter" }),
      });

      if (res.ok || res.status === 303) {
        setStatus("done");
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
        <div className="mx-auto max-w-[1240px] grid gap-20 md:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <div className="mb-8 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="eyebrow">Newsletter semanal · Gratuita</span>
            </div>
            <h1 className="mb-8 font-serif text-5xl font-medium leading-[1.04] tracking-tight md:text-[72px]">
              Inteligência{" "}
              <em className="italic text-gold-soft">Cliente Mídia™</em>.
            </h1>
            <p className="mb-10 max-w-[520px] text-lg font-light leading-relaxed text-sepia">
              Toda semana: um dado novo do varejo premium, um insight estratégico
              e uma pergunta que vai fazer você pensar diferente sobre a sua loja.
              Em menos de 3 minutos de leitura.
            </p>

            {status === "done" ? (
              <div className="border border-gold/40 bg-ink-deep p-8">
                <p className="font-serif text-2xl text-gold mb-2">✦ Inscrito.</p>
                <p className="text-sepia text-sm">
                  Você receberá a próxima edição na terça-feira às 9h.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-[480px]">
                <div className="flex gap-3 border-b border-line-dark pb-3 mb-4">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="seu@email.com"
                    className="flex-1 bg-transparent text-base text-cream-warm outline-none placeholder:text-sepia"
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-gold hover:opacity-80 disabled:opacity-50"
                  >
                    {status === "sending" ? "..." : "Inscrever →"}
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-sm text-red-400">Erro ao inscrever. Tente novamente.</p>
                )}
                <p className="text-xs text-sepia">
                  Gratuita. Sem spam. Cancele quando quiser respondendo o email.
                </p>
              </form>
            )}
          </div>

          {/* PREVIEW */}
          <div className="relative border border-line-dark bg-ink-deep p-8 md:p-10">
            <div className="absolute inset-3 border border-gold-deep/20" />
            <div className="relative z-10">
              <div className="mb-6 flex justify-between items-start">
                <p className="text-[10px] font-medium uppercase tracking-eyebrow text-gold">
                  Inteligência Cliente Mídia™
                </p>
                <p className="text-[10px] text-sepia">Semana 3 · Maio 2026</p>
              </div>

              <div className="mb-6 border border-line-dark p-5">
                <p className="mb-3 text-[10px] uppercase tracking-eyebrow text-gold">
                  O dado da semana
                </p>
                <p className="mb-2 font-serif text-4xl text-gold">92%</p>
                <p className="mb-3 text-xs text-sepia leading-relaxed">
                  dos consumidores confiam mais em indicações de pessoas reais do
                  que em anúncios · EmbedSocial 2024
                </p>
                <p className="font-serif text-sm italic text-cream-warm leading-relaxed border-l-2 border-gold pl-3">
                  Sua melhor campanha nunca foi o anúncio — foi a cliente que indicou.
                </p>
              </div>

              <div className="mb-6">
                <p className="mb-2 text-[10px] uppercase tracking-eyebrow text-gold">
                  O insight da semana
                </p>
                <p className="mb-2 font-serif text-lg text-cream-warm">
                  A confiança não se compra. Ela se cultiva.
                </p>
                <p className="text-xs text-sepia leading-relaxed line-clamp-3">
                  Existe uma diferença fundamental entre o alcance que você paga
                  e o alcance que as suas clientes geram. Um desaparece quando
                  você para de pagar. O outro cresce enquanto você dorme...
                </p>
              </div>

              <div className="border-t border-line-dark pt-5">
                <p className="mb-2 text-[10px] uppercase tracking-eyebrow text-gold">
                  A pergunta da semana
                </p>
                <p className="font-serif text-sm italic text-cream-warm leading-relaxed">
                  &ldquo;Se você desligasse todos os seus anúncios amanhã, quantas
                  clientes novas chegaria por indicação no mês que vem?&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE VOCÊ RECEBE */}
      <section className="border-b border-line-dark bg-ink-deep px-8 py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-16 text-center">
            <span className="eyebrow">Formato · Toda terça-feira</span>
          </div>
          <div className="grid gap-px border border-line-dark md:grid-cols-3">
            {[
              {
                num: "01",
                titulo: "Um dado",
                desc: "Número concreto e verificado sobre varejo premium, comportamento do consumidor ou marketing digital no Brasil. Com fonte e com impacto calculado para a sua realidade."
              },
              {
                num: "02",
                titulo: "Um insight",
                desc: "Análise estratégica de 2-3 parágrafos conectando o dado ao modelo Cliente Mídia™. O tipo de raciocínio que leva tempo para construir — entregue pronto para você aplicar."
              },
              {
                num: "03",
                titulo: "Uma pergunta",
                desc: "Provocação reflexiva e personalíssima sobre a sua loja. Não é genérica. É a pergunta que faz você olhar para o seu próprio negócio com um ângulo diferente."
              }
            ].map((item) => (
              <div key={item.num} className="bg-ink p-10">
                <div className="mb-4 font-serif text-5xl font-medium text-line-dark">
                  {item.num}
                </div>
                <h3 className="mb-4 font-serif text-2xl font-medium text-gold-soft">
                  {item.titulo}
                </h3>
                <p className="text-sm leading-relaxed text-sepia">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[680px] text-center">
          <h2 className="mb-8 font-serif text-4xl font-medium leading-tight md:text-[48px]">
            3 minutos por semana.<br />
            <em className="italic text-gold-soft">Uma perspectiva diferente.</em>
          </h2>
          {status === "done" ? (
            <p className="text-gold font-serif text-xl">✦ Você já está inscrito.</p>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto max-w-[400px]">
              <div className="flex gap-3 border-b border-line-dark pb-3 mb-4">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="seu@email.com"
                  className="flex-1 bg-transparent text-base text-cream-warm outline-none placeholder:text-sepia"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-gold hover:opacity-80 disabled:opacity-50"
                >
                  {status === "sending" ? "..." : "Inscrever →"}
                </button>
              </div>
              <p className="text-xs text-sepia">Gratuita · Semanal · Cancele quando quiser</p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
