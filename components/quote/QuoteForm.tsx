"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Paperclip, X } from "lucide-react";
import {
  devisPrestations,
  devisBatiments,
  devisCantons,
  devisObjectifs,
  devisNote,
  devisAccept,
  devisMaxFiles,
  devisMaxFileMb,
  type DevisPayload,
} from "@/content/devis";

const steps = ["Prestation", "Bâtiment", "Coordonnées", "Synthèse"] as const;

const empty: DevisPayload = {
  prestation: "",
  batiment: "",
  commune: "",
  canton: "",
  annee: "",
  surface: "",
  objectif: "",
  nom: "",
  email: "",
  telephone: "",
  message: "",
};

const field =
  "w-full rounded-sm border border-hairline bg-canvas-alt px-3 py-2.5 text-body-sm sm:px-3.5 sm:py-3 sm:text-body-md text-nera-ink placeholder:text-mute focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";
const label = "mb-1.5 block text-body-sm font-medium text-nera-navy";
const btnPrimary =
  "inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-accent px-5 text-[14px] sm:h-12 sm:px-6 sm:text-[15px] font-medium text-white transition-colors duration-base hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-60";
const btnGhost =
  "inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-hairline px-4 text-[14px] sm:h-12 sm:px-5 sm:text-[15px] font-medium text-nera-navy transition-colors duration-base hover:border-nera-navy";

/**
 * Formulaire de devis gratuit en quatre étapes (direction i-neea.ch) avec les champs
 * du document « Instructions formulaires ». Envoi vers /api/devis en multipart.
 * `initialPrestation` permet de pré-remplir depuis une page prestation.
 */
export function QuoteForm({ initialPrestation = "", onDone }: { initialPrestation?: string; onDone?: () => void }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<DevisPayload>({ ...empty, prestation: initialPrestation });
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (k: keyof DevisPayload) => (e: { target: { value: string } }) => setData((d) => ({ ...d, [k]: e.target.value }));

  const validate = (s: number): string | null => {
    if (s === 0 && !data.prestation) return "Choisissez une prestation.";
    if (s === 1) {
      if (!data.batiment) return "Indiquez le type de bâtiment.";
      if (!data.commune.trim() || !data.canton) return "Indiquez la commune et le canton.";
    }
    if (s === 2) {
      if (!data.nom.trim()) return "Indiquez votre nom.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Indiquez une adresse e-mail valide.";
      if (!data.telephone.trim()) return "Indiquez un numéro de téléphone.";
    }
    return null;
  };

  const next = () => {
    const err = validate(step);
    setError(err);
    if (!err) setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const back = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files];
    for (const f of Array.from(list)) {
      if (next.length >= devisMaxFiles) break;
      if (f.size > devisMaxFileMb * 1024 * 1024) {
        setError(`« ${f.name} » dépasse ${devisMaxFileMb} Mo.`);
        continue;
      }
      next.push(f);
    }
    setFiles(next);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    for (let s = 0; s < 3; s++) {
      const err = validate(s);
      if (err) {
        setStep(s);
        setError(err);
        return;
      }
    }
    setStatus("sending");
    setError(null);
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => fd.append(k, v));
    files.forEach((f) => fd.append("fichiers", f));
    fd.append("website", ""); // honeypot
    try {
      const res = await fetch("/api/devis", { method: "POST", body: fd });
      if (!res.ok) throw new Error(await res.text());
      setStatus("sent");
    } catch {
      setStatus("idle");
      setError("L'envoi a échoué. Réessayez ou écrivez-nous à info@nera-ing.ch.");
    }
  };

  if (status === "sent") {
    return (
      <div className="py-6 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-nera-green-soft text-accent-deep">
          <Check className="size-7" strokeWidth={2} />
        </span>
        <h3 className="mt-6 font-display text-display-sm text-nera-navy">Demande envoyée</h3>
        <p className="mx-auto mt-3 max-w-sm text-body-md text-body">
          Merci, {data.nom.split(" ")[0]}. Un accusé de réception vous a été envoyé à {data.email}. {devisNote}
        </p>
        {onDone && (
          <button type="button" onClick={onDone} className={`${btnPrimary} mt-8`}>
            Fermer
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      {/* Étapes */}
      {/* Mobile : étape courante en toutes lettres ; dès sm : les quatre libellés */}
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-nera-navy sm:hidden">
        Étape {step + 1}/{steps.length} · {steps[step]}
      </p>
      <ol className="mb-6 grid grid-cols-4 gap-1.5 sm:mb-8 sm:gap-2" aria-label="Étapes">
        {steps.map((s, i) => (
          <li key={s} className="text-center">
            <span className={`hidden text-[11px] font-medium uppercase tracking-[0.1em] sm:block ${i <= step ? "text-nera-navy" : "text-mute"}`}>{s}</span>
            <span className={`block h-1 rounded-full sm:mt-2 ${i <= step ? "bg-accent" : "bg-hairline"}`} aria-hidden />
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="space-y-4 sm:space-y-5">
          <div>
            <label htmlFor="q-prestation" className={label}>Prestation souhaitée*</label>
            <select id="q-prestation" value={data.prestation} onChange={set("prestation")} className={field} required>
              <option value="" disabled>Choisir une prestation</option>
              {devisPrestations.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="q-objectif" className={label}>Objectif</label>
            <select id="q-objectif" value={data.objectif} onChange={set("objectif")} className={field}>
              <option value="">Choisir un objectif</option>
              {devisObjectifs.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4 sm:space-y-5">
          <div>
            <label htmlFor="q-batiment" className={label}>Type de bâtiment*</label>
            <select id="q-batiment" value={data.batiment} onChange={set("batiment")} className={field} required>
              <option value="" disabled>Choisir un type</option>
              {devisBatiments.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="q-commune" className={label}>Commune*</label>
              <input id="q-commune" value={data.commune} onChange={set("commune")} className={field} placeholder="Ex. Châtelaine" required />
            </div>
            <div>
              <label htmlFor="q-canton" className={label}>Canton*</label>
              <select id="q-canton" value={data.canton} onChange={set("canton")} className={field} required>
                <option value="" disabled>Choisir un canton</option>
                {devisCantons.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="q-annee" className={label}>Année de construction</label>
              <input id="q-annee" value={data.annee} onChange={set("annee")} className={field} inputMode="numeric" placeholder="Ex. 1975" />
            </div>
            <div>
              <label htmlFor="q-surface" className={label}>Surface approximative (m²)</label>
              <input id="q-surface" value={data.surface} onChange={set("surface")} className={field} inputMode="numeric" placeholder="Ex. 180" />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 sm:space-y-5">
          <div>
            <label htmlFor="q-nom" className={label}>Nom*</label>
            <input id="q-nom" value={data.nom} onChange={set("nom")} className={field} autoComplete="name" required />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="q-email" className={label}>E-mail*</label>
              <input id="q-email" type="email" value={data.email} onChange={set("email")} className={field} autoComplete="email" required />
            </div>
            <div>
              <label htmlFor="q-tel" className={label}>Téléphone*</label>
              <input id="q-tel" type="tel" value={data.telephone} onChange={set("telephone")} className={field} autoComplete="tel" required />
            </div>
          </div>
          <div>
            <label htmlFor="q-message" className={label}>Message</label>
            <textarea id="q-message" value={data.message} onChange={set("message")} className={`${field} min-h-[110px] resize-y`} placeholder="Décrivez votre projet, vos délais, vos questions." />
          </div>
          <div>
            <span className={label}>Pièces jointes (facultatif)</span>
            <label className="flex cursor-pointer items-center gap-3 rounded-sm border border-dashed border-hairline px-3.5 py-3 text-body-sm text-body transition-colors hover:border-accent">
              <Paperclip className="size-4 text-accent" strokeWidth={1.75} />
              Plans, factures d&apos;énergie, photos ({devisMaxFiles} max, {devisMaxFileMb} Mo chacun)
              <input type="file" multiple accept={devisAccept} className="sr-only" onChange={(e) => addFiles(e.target.files)} />
            </label>
            {files.length > 0 && (
              <ul className="mt-2 space-y-1">
                {files.map((f, i) => (
                  <li key={`${f.name}-${i}`} className="flex items-center justify-between rounded-sm bg-canvas px-3 py-1.5 text-body-sm text-nera-ink">
                    <span className="truncate">{f.name}</span>
                    <button type="button" aria-label={`Retirer ${f.name}`} onClick={() => setFiles(files.filter((_, j) => j !== i))} className="ml-3 text-mute hover:text-nera-navy">
                      <X className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <dl className="grid gap-x-6 gap-y-3 text-body-sm sm:grid-cols-2">
          {[
            ["Prestation", data.prestation],
            ["Objectif", data.objectif || "—"],
            ["Bâtiment", data.batiment],
            ["Lieu", `${data.commune}, ${data.canton}`],
            ["Année / surface", [data.annee, data.surface && `${data.surface} m²`].filter(Boolean).join(" · ") || "—"],
            ["Nom", data.nom],
            ["E-mail", data.email],
            ["Téléphone", data.telephone],
            ["Pièces jointes", files.length ? `${files.length} fichier(s)` : "—"],
          ].map(([k, v]) => (
            <div key={k} className="border-b border-hairline pb-2">
              <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-mute">{k}</dt>
              <dd className="mt-0.5 text-nera-ink">{v}</dd>
            </div>
          ))}
          {data.message && (
            <div className="border-b border-hairline pb-2 sm:col-span-2">
              <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-mute">Message</dt>
              <dd className="mt-0.5 whitespace-pre-line text-nera-ink">{data.message}</dd>
            </div>
          )}
        </dl>
      )}

      {error && (
        <p role="alert" className="mt-4 text-body-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6 flex items-center justify-between gap-3 sm:mt-8">
        {step > 0 ? (
          <button type="button" onClick={back} className={btnGhost}>
            <ArrowLeft className="size-4" strokeWidth={1.75} />
            Retour
          </button>
        ) : (
          <span />
        )}
        {step < steps.length - 1 ? (
          <button type="button" onClick={next} className={btnPrimary}>
            Suivant
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </button>
        ) : (
          <button type="submit" disabled={status === "sending"} className={btnPrimary}>
            {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
          </button>
        )}
      </div>

      <p className="mt-4 text-center text-[12px] text-mute sm:mt-6 sm:text-body-sm">{devisNote}</p>
    </form>
  );
}
