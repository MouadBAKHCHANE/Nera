import type { PrestationBlock } from "@/content/prestation-pages";

/**
 * Rendu des blocs de contenu des pages prestation (`content/prestation-pages.ts`),
 * partagé par le gabarit des six pages et par l'index `/prestations`.
 * Le rendu est récursif : un bloc `sub` porte ses propres blocs.
 */
export function Blocks({ blocks }: { blocks: PrestationBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p key={i} className="mt-4 text-body-md leading-[1.8] text-body first:mt-0">
                {b.text}
              </p>
            );
          case "ul":
            return (
              // Une puce par ligne : le texte client ne doit jamais se couper en deux.
              <ul key={i} className="mt-5 space-y-2.5 first:mt-0">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-body-md leading-[1.6] text-body">
                    <span className="mt-[0.65em] size-1.5 shrink-0 bg-accent" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "steps":
            return (
              <ol key={i} className="mt-6 first:mt-0">
                {b.items.map((s, j) => (
                  <li key={j} className="relative flex gap-5 pb-8 last:pb-0">
                    {j < b.items.length - 1 && (
                      <span className="absolute bottom-0 left-[15px] top-9 w-px bg-hairline" aria-hidden />
                    )}
                    <span className="relative z-10 flex size-8 shrink-0 items-center justify-center border border-nera-navy/25 bg-canvas font-display text-[13px] font-medium text-nera-navy">
                      {j + 1}
                    </span>
                    <div className="pt-1">
                      <p className="font-display text-[1.0625rem] font-medium leading-[1.3] text-nera-navy">{s.title}</p>
                      <p className="mt-1.5 text-body-md leading-[1.7] text-body">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            );
          case "cards":
            return (
              <div key={i} className="mt-6 grid gap-4 first:mt-0 md:grid-cols-3">
                {b.items.map((c, j) => (
                  <div key={j} className="clip-notch border-t-2 border-accent bg-nera-white p-6">
                    <p className="font-display text-[1.0625rem] font-medium leading-[1.3] text-nera-navy">{c.title}</p>
                    <p className="mt-3 text-body-sm leading-[1.7] text-body">{c.text}</p>
                  </div>
                ))}
              </div>
            );
          case "sub":
            return (
              <div key={i} className="mt-9 first:mt-6">
                <h3 className="font-display text-[1.1875rem] font-medium leading-[1.3] text-nera-navy">{b.title}</h3>
                <div className="mt-3">
                  <Blocks blocks={b.blocks} />
                </div>
              </div>
            );
        }
      })}
    </>
  );
}
