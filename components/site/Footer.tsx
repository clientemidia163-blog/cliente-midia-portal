import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line-dark bg-ink-deep px-8 py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-20 grid gap-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-baseline gap-1">
              <span className="font-serif text-[28px] font-medium">
                Cliente <em className="italic">Mídia</em>
              </span>
              <sup className="text-[11px] text-gold">TM</sup>
            </div>
            <p className="max-w-[340px] text-sm leading-relaxed text-sepia">
              Centro de autoridade da categoria Cliente Mídia™ no Brasil.
              Documentamos a transformação do varejo premium em uma nova era
              de distribuição orgânica.
            </p>
          </div>

          <FooterColumn
            title="Editorial"
            items={[
              { label: "Manifesto", href: "/manifesto" },
              { label: "Diagnóstico", href: "/diagnostico" },
              { label: "Categoria", href: "/categoria" },
              { label: "Pesquisa", href: "/pesquisa" },
              { label: "Movimento", href: "/movimento" },
              { label: "Método", href: "/metodo" }
            ]}
          />

          <FooterColumn
            title="Recursos"
            items={[
              { label: "✦ Simulador da loja", href: "/simulador", accent: true },
              { label: "Newsletter semanal", href: "/newsletter" },
              { label: "Casos & Resultados", href: "/casos" },
              { label: "Glossário", href: "/glossario" },
              { label: "Imprensa", href: "/imprensa" }
            ]}
          />

          <FooterColumn
            title="Institucional"
            items={[
              { label: "Sobre o portal", href: "/sobre" },
              { label: "Política editorial", href: "/politica-editorial" },
              { label: "Contato", href: "/contato" },
              { label: "Viralize Luxo ↗", href: "https://viralizeluxo.com.br", external: true, accent: true }
            ]}
          />
        </div>

        <div className="flex flex-col gap-3 border-t border-line-dark pt-8 text-xs tracking-wide text-sepia md:flex-row md:items-center md:justify-between">
          <div>© 2026 Cliente Mídia™ — Todos os direitos reservados.</div>
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-5">
            <Link href="/simulador" className="text-gold hover:opacity-80">
              ✦ Simular impacto na minha loja
            </Link>
            <span className="hidden h-3 w-px bg-line-dark md:inline" />
            <span>
              A plataforma que ativa o modelo é a{" "}
              <a
                href="https://viralizeluxo.com.br"
                target="_blank"
                rel="noreferrer"
                className="text-gold hover:opacity-80"
              >
                Viralize Luxo ↗
              </a>
              .
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items
}: {
  title: string;
  items: { label: string; href: string; external?: boolean; accent?: boolean }[];
}) {
  return (
    <div>
      <h4 className="mb-6 border-b border-line-dark pb-4 text-[11px] font-medium uppercase tracking-eyebrow text-gold">
        {title}
      </h4>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={`text-sm hover:opacity-80 ${item.accent ? "text-gold" : "text-cream-warm"}`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className={`text-sm hover:opacity-80 ${item.accent ? "text-gold" : "text-cream-warm"}`}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
