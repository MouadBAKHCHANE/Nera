"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

/**
 * Liste déroulante dessinée par le site, à la place du `<select>` natif.
 *
 * Pourquoi : dans le pop-up devis, la liste native s'ouvrait lentement et affichait d'abord un
 * cadre sombre avant ses choix (signalé par le client, septembre 2026). La liste native est
 * dessinée par le système, par-dessus le voile flouté plein écran de la modale : Chrome sous
 * Windows la compose mal. Une liste à nous s'ouvre instantanément, toujours sur fond blanc, et
 * ressemble au reste du formulaire sur tous les navigateurs.
 *
 * La liste est rendue dans `document.body` (portail) et placée en `position: fixed` sous son
 * champ. Dans la modale devis, les champs défilent dans une zone à hauteur fixe : une liste
 * rendue sur place y serait coupée. Elle se ferme dès que la page ou cette zone défile, pour ne
 * jamais flotter loin de son champ.
 *
 * Accessibilité (motif « select-only combobox » de l'APG du W3C) : le bouton porte
 * `role="combobox"`, la liste `role="listbox"`, l'option active est annoncée par
 * `aria-activedescendant`. Le focus reste sur le bouton pendant toute l'interaction.
 * Clavier : flèches, Début, Fin, Entrée ou Espace pour choisir, Échap pour fermer sans
 * refermer la modale, Tab pour fermer et passer au champ suivant, et une lettre saute à la
 * première option qui commence par elle.
 */
export function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
  className = "",
  invalid = false,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  /** Classes du champ, pour reprendre exactement l'apparence des autres champs du formulaire. */
  className?: string;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [pos, setPos] = useState<{ left: number; width: number; top?: number; bottom?: number; maxHeight: number } | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const optId = (i: number) => `${listId}-o${i}`;

  const show = (index: number) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    // Sous le champ, sauf si la place y manque et qu'il y en a davantage au-dessus.
    // 352 px : les sept prestations tiennent sans défiler.
    const below = window.innerHeight - r.bottom - 12;
    const above = r.top - 12;
    const upward = below < 240 && above > below;
    const maxHeight = Math.min(352, upward ? above : below);
    setPos(
      upward
        ? { left: r.left, width: r.width, bottom: window.innerHeight - r.top + 4, maxHeight }
        : { left: r.left, width: r.width, top: r.bottom + 4, maxHeight },
    );
    setActive(index);
    setOpen(true);
    // Safari ne donne pas le focus à un bouton cliqué : sans cela, les flèches et Échap
    // n'arriveraient pas jusqu'à la liste après une ouverture à la souris.
    button.current?.focus();
  };
  const choose = (i: number) => {
    onChange(options[i]);
    setOpen(false);
  };

  // Clic ou toucher hors du champ et de la liste, défilement ailleurs que dans la liste,
  // redimensionnement : la liste se ferme.
  useEffect(() => {
    if (!open) return;
    const inside = (t: EventTarget | null) =>
      t instanceof Node && (wrap.current?.contains(t) || list.current?.contains(t));
    const onDown = (e: PointerEvent) => {
      if (!inside(e.target)) setOpen(false);
    };
    const onScroll = (e: Event) => {
      if (!inside(e.target)) setOpen(false);
    };
    const onResize = () => setOpen(false);
    // Échap ferme la liste, et seulement elle. Écouté sur la fenêtre en phase de capture, donc
    // avant l'écouteur de la modale : Échap ne ferme plus tout le formulaire, où que soit le focus.
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
    };
    window.addEventListener("keydown", onKey, true);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  // L'option active reste visible quand on la déplace au clavier dans une liste qui défile.
  useEffect(() => {
    if (open && active >= 0) document.getElementById(optId(active))?.scrollIntoView({ block: "nearest" });
    // optId ne dépend que de listId, stable pour la vie du composant.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, active]);

  const current = options.indexOf(value);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        show(current >= 0 ? current : e.key === "ArrowUp" ? last : 0);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(a + 1, last));
        return;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
        return;
      case "Home":
        e.preventDefault();
        setActive(0);
        return;
      case "End":
        e.preventDefault();
        setActive(last);
        return;
      case "Enter":
      case " ":
        e.preventDefault();
        if (active >= 0) choose(active);
        return;
      case "Tab":
        setOpen(false);
        return;
    }
    if (e.key.length === 1) {
      const k = e.key.toLowerCase();
      const i = options.findIndex((o) => o.toLowerCase().startsWith(k));
      if (i >= 0) setActive(i);
    }
  };

  return (
    <div ref={wrap} className="relative">
      <button
        ref={button}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && active >= 0 ? optId(active) : undefined}
        aria-invalid={invalid || undefined}
        onClick={() => (open ? setOpen(false) : show(current >= 0 ? current : 0))}
        onKeyDown={onKeyDown}
        className={`flex items-center justify-between gap-3 text-left ${className}`}
      >
        <span className={`truncate ${value ? "" : "text-mute"}`}>{value || placeholder}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-mute transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.75}
          aria-hidden
        />
      </button>

      {open &&
        pos &&
        createPortal(
        <ul
          ref={list}
          id={listId}
          role="listbox"
          aria-labelledby={id}
          style={{ left: pos.left, width: pos.width, top: pos.top, bottom: pos.bottom, maxHeight: pos.maxHeight }}
          // Au-dessus de la modale (z-[100]).
          className="fixed z-[120] overflow-y-auto rounded-sm border border-hairline bg-white py-1 shadow-[0_12px_32px_rgba(10,36,64,0.16)]"
        >
          {options.map((o, i) => {
            const selected = o === value;
            return (
              <li
                key={o}
                id={optId(i)}
                role="option"
                aria-selected={selected}
                // pointerdown évite que le bouton perde le focus avant le choix.
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => choose(i)}
                onPointerMove={() => setActive(i)}
                className={`flex cursor-pointer items-center justify-between gap-3 px-3 py-2.5 text-body-sm sm:px-3.5 sm:text-body-md ${
                  i === active ? "bg-accent/10 text-nera-navy" : "text-nera-ink"
                } ${selected ? "font-medium" : ""}`}
              >
                <span>{o}</span>
                {selected && <Check className="size-4 shrink-0 text-accent" strokeWidth={2} aria-hidden />}
              </li>
            );
          })}
        </ul>,
          document.body,
        )}
    </div>
  );
}
