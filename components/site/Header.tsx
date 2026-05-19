"use client";

import { useState } from "react";
import Link from "next/link";

const NAV = [
  { label: "Artigos", href: "/artigos" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Diagnóstico", href: "/diagnostico" },
  { label: "Categoria", href: "/categoria" },
  { label: "Pesquisa", href: "/pesquisa" },
  { label: "Movimento", href: "/movimento" },
  { label: "Método", href: "/metodo" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Faixa editorial superior ──────────────────────────────────── */}
      <div className="border-b border-line-dark bg-ink-deep py-2.5 text-[11px] uppercase tracking-[0.12em] text-sepia">
        <div className="mx-auto max-w-[1240px] px-8">
          {/* Mobile: só a marca, centrada */}
          <div className="flex justify-center sm:hidden">
            <span>
              <span className="text-gold">Cliente Mídia™</span>
              {" "}· Centro de Autoridade
            </span>
          </div>
          {/* Desktop: três colunas */}
          <div className="hidden sm:flex items-center justify-between">
            <span>Edição Nº 01 · Maio 2026</span>
            <span>
              <span className="text-gold">Cliente Mídia™</span>
              {" "}· Centro de Autoridade
            </span>
            <span className="hidden md:inline">São Paulo · Brasil</span>
          </div>
        </div>
      </div>

      {/* ── Header principal ─────────────────────────────────────────── */}
      <header className="relative border-b border-line-dark py-5">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-6 md:px-8">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-baseline gap-1 shrink-0"
            onClick={() => setOpen(false)}
          >
            <span className="font-serif text-[26px] font-medium tracking-wide md:text-[28px]">
              Cliente <em className="italic">Mídia</em>
            </span>
            <sup className="text-[11px] text-gold">TM</sup>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-7 lg:gap-9">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative pb-1 text-[12px] uppercase tracking-[0.08em] text-cream-warm hover:opacity-80"
                  >
                    {item.label}
                    <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA desktop */}
          <Link
            href="/simulador"
            className="hidden shrink-0 items-center gap-2 border border-gold px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-gold transition-colors hover:bg-gold hover:text-ink md:inline-flex"
          >
            <span className="text-[10px]">✦</span>
            Simulador
          </Link>

          {/* Botão sanduíche — mobile only */}
          <button
            className="flex flex-col gap-[5px] p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            <span
              className={`block h-[1.5px] w-6 origin-center bg-cream-warm transition-all duration-300 ${
                open ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-6 bg-cream-warm transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-6 origin-center bg-cream-warm transition-all duration-300 ${
                open ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* ── Drawer mobile ─────────────────────────────────────────── */}
        <nav
          className={`absolute inset-x-0 top-full z-50 bg-ink-deep transition-all duration-300 md:hidden ${
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <ul className="border-b border-line-dark px-6 pb-2 pt-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-line-dark py-5 font-serif text-[22px] italic text-cream-warm transition-colors hover:text-gold-soft"
                >
                  {item.label}
                  <span className="text-sm not-italic text-gold">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 py-6">
            <Link
              href="/simulador"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 border border-gold py-4 text-[11px] font-medium uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              ✦ Abrir o Simulador
            </Link>
          </div>
        </nav>
      </header>

      {/* Overlay transparente — fecha o menu ao clicar fora */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
