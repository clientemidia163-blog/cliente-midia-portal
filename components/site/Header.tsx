import Link from "next/link";

const NAV = [
  { label: "Manifesto", href: "/manifesto" },
  { label: "Diagnóstico", href: "/diagnostico" },
  { label: "Categoria", href: "/categoria" },
  { label: "Pesquisa", href: "/pesquisa" },
  { label: "Movimento", href: "/movimento" },
  { label: "Relatório", href: "/relatorio" }
];

export function Header() {
  return (
    <>
      <div className="border-b border-line-dark bg-ink-deep py-2.5 text-[11px] uppercase tracking-[0.12em] text-sepia">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-8">
          <span>Edição Nº 01 · Maio 2026</span>
          <span>
            <span className="text-gold">Cliente Mídia™</span> · Centro de
            Autoridade
          </span>
          <span className="hidden md:inline">São Paulo · Brasil</span>
        </div>
      </div>
      <header className="border-b border-line-dark py-7">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-8">
          <Link href="/" className="flex items-baseline gap-1">
            <span className="font-serif text-[28px] font-medium tracking-wide">
              Cliente <em className="italic">Mídia</em>
            </span>
            <sup className="text-[11px] text-gold">TM</sup>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-9">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative pb-1 text-[13px] uppercase tracking-[0.08em] text-cream-warm hover:opacity-80"
                  >
                    {item.label}
                    <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA persistente — Simulador como destino primário */}
          <Link
            href="/simulador"
            className="hidden shrink-0 items-center gap-2 border border-gold px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-gold transition-colors hover:bg-gold hover:text-ink md:inline-flex"
          >
            <span className="text-[10px]">✦</span>
            Simulador
          </Link>
        </div>
      </header>
    </>
  );
}
