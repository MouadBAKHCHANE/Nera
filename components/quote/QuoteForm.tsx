"use client";

import { useEffect, useRef, useState, type DragEvent, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Paperclip, Upload, X } from "lucide-react";
import {
  devisPrestations,
  devisBatiments,
  devisCantons,
  devisObjectifs,
  devisNote,
  devisAccept,
  devisMaxFiles,
  devisMaxTotalMb,
  type DevisPayload,
} from "@/content/devis";
import { FormNotice } from "@/components/ui/FormNotice";
import { Select } from "@/components/ui/Select";

const steps = ["Prestation", "Bâtiment", "Coordonnées", "Synthèse"] as const;

const empty: DevisPayload = {
  prestation: "",
  batiment: "",
  codePostal: "",
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
 *
 * `fit` : dans la modale, dès `sm`, le formulaire remplit une boîte à hauteur fixe. La barre d'étapes et
 * les boutons restent en place, seuls les champs défilent si l'écran est trop court. Sans
 * cela, l'étape « Coordonnées », la plus haute, faisait grandir la modale au-delà de l'écran
 * et en masquait le haut et le bas (signalé par le client, septembre 2026).
 */
export function QuoteForm({
  initialPrestation = "",
  onDone,
  fit = false,
}: {
  initialPrestation?: string;
  onDone?: () => void;
  fit?: boolean;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<DevisPayload>({ ...empty, prestation: initialPrestation });
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  /**
   * Vrai uniquement pendant le clic sur « Envoyer ma demande ». Sans cette intention
   * explicite, rien ne part : c'est la seconde barrière contre un envoi déclenché par la
   * soumission implicite du formulaire.
   */
  const sendIntent = useRef(false);

  /**
   * Sur téléphone, la page défile et les boutons sont sous les champs : on arrive sur
   * « Suivant » en bas de l'étape. Sans ceci, l'étape suivante s'afficherait déjà défilée,
   * son haut hors de l'écran. On remonte donc au haut de la modale, ou du formulaire hors
   * modale, à chaque changement d'étape, et seulement s'il n'est plus visible.
   */
  const formRef = useRef<HTMLFormElement>(null);
  const firstStep = useRef(true);
  useEffect(() => {
    if (firstStep.current) {
      firstStep.current = false;
      return;
    }
    const form = formRef.current;
    const target = form?.closest<HTMLElement>("[role=dialog]") ?? form;
    if (target && target.getBoundingClientRect().top < 0) target.scrollIntoView({ block: "start" });
  }, [step]);

  const pick = (k: keyof DevisPayload) => (v: string) => setData((d) => ({ ...d, [k]: v }));
  const set = (k: keyof DevisPayload) => (e: { target: { value: string } }) => setData((d) => ({ ...d, [k]: e.target.value }));

  const validate = (s: number): string | null => {
    if (s === 0 && !data.prestation) return "Choisissez une prestation.";
    if (s === 1) {
      if (!data.batiment) return "Indiquez le type de bâtiment.";
      if (!data.codePostal.trim() || !data.canton) return "Indiquez le code postal et le canton.";
    }
    if (s === 2) {
      if (!data.nom.trim()) return "Indiquez vos nom et prénom.";
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
  /**
   * Glisser-déposer des pièces jointes (desktop). `dragDepth` compte les entrées et sorties :
   * survoler un enfant de la zone déclenche un `dragleave` sur la zone elle-même, qui
   * éteindrait la surbrillance à tort.
   */
  const [dragging, setDragging] = useState(false);
  const dragDepth = useRef(0);
  const hasFiles = (e: DragEvent<HTMLElement>) => e.dataTransfer.types.includes("Files");
  const dropHandlers = {
    onDragEnter: (e: DragEvent<HTMLLabelElement>) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      dragDepth.current += 1;
      setDragging(true);
    },
    onDragOver: (e: DragEvent<HTMLLabelElement>) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    onDragLeave: () => {
      dragDepth.current = Math.max(0, dragDepth.current - 1);
      if (dragDepth.current === 0) setDragging(false);
    },
    onDrop: (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      dragDepth.current = 0;
      setDragging(false);
      addFiles(e.dataTransfer.files);
    },
  };

  // Un fichier lâché à côté de la zone ne doit pas faire ouvrir le fichier par le navigateur,
  // ce qui quitterait la page et perdrait le formulaire en cours.
  useEffect(() => {
    if (step !== 2) return;
    const block = (e: globalThis.DragEvent) => {
      if (e.dataTransfer?.types.includes("Files")) e.preventDefault();
    };
    window.addEventListener("dragover", block);
    window.addEventListener("drop", block);
    return () => {
      window.removeEventListener("dragover", block);
      window.removeEventListener("drop", block);
    };
  }, [step]);

  const back = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files];
    const limit = devisMaxTotalMb * 1024 * 1024;
    let total = next.reduce((n, f) => n + f.size, 0);
    // Le sélecteur filtre les types par son attribut `accept`, pas le glisser-déposer :
    // le contrôle se fait donc ici, pour les deux chemins.
    const allowed = devisAccept.split(",");
    setError(null);
    for (const f of Array.from(list)) {
      if (next.length >= devisMaxFiles) break;
      if (!allowed.some((ext) => f.name.toLowerCase().endsWith(ext))) {
        setError(`« ${f.name} » n'est pas accepté. Formats : PDF, JPG, PNG, HEIC, WebP.`);
        continue;
      }
      // Plafond cumulé : un fichier qui ferait dépasser le total est écarté, les suivants
      // restent candidats s'ils sont plus petits.
      if (total + f.size > limit) {
        setError(`« ${f.name} » ferait dépasser ${devisMaxTotalMb} Mo au total. Envoyez les plus gros fichiers par e-mail à info@nera-ing.ch.`);
        continue;
      }
      total += f.size;
      next.push(f);
    }
    setFiles(next);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    // Entrée dans un champ vaut soumission implicite du formulaire, quel que soit le bouton
    // affiché : hors de la dernière étape, la touche Entrée se contente d'avancer d'un pas.
    if (step < steps.length - 1) {
      next();
      return;
    }
    // Et même à la dernière étape, on n'envoie que si le bouton d'envoi a bien été actionné.
    if (!sendIntent.current) return;
    sendIntent.current = false;
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
    <form ref={formRef} onSubmit={submit} noValidate className={fit ? "flex flex-col sm:min-h-0 sm:flex-1" : "scroll-mt-28"}>
      {/* Étapes */}
      {/* Mobile : étape courante en toutes lettres ; dès sm : les quatre libellés */}
      <p className="mb-2 shrink-0 text-[11px] font-medium uppercase tracking-[0.14em] text-nera-navy sm:hidden">
        Étape {step + 1}/{steps.length} · {steps[step]}
      </p>
      <ol className="mb-5 grid shrink-0 grid-cols-4 gap-1.5 sm:mb-6 sm:gap-2" aria-label="Étapes">
        {steps.map((s, i) => (
          <li key={s} className="text-center">
            <span className={`hidden text-[11px] font-medium uppercase tracking-[0.1em] sm:block ${i <= step ? "text-nera-navy" : "text-mute"}`}>{s}</span>
            <span className={`block h-1 rounded-full sm:mt-2 ${i <= step ? "bg-accent" : "bg-hairline"}`} aria-hidden />
          </li>
        ))}
      </ol>

      {/* `-mx-1 px-1` : l'anneau de focus des champs n'est pas rogné par la zone qui défile. */}
      <div className={fit ? "sm:-mx-1 sm:min-h-0 sm:flex-1 sm:overflow-y-auto sm:overscroll-contain sm:px-1 sm:pb-1" : undefined}>
      {step === 0 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="q-prestation" className={label}>Prestation souhaitée*</label>
            <Select id="q-prestation" value={data.prestation} onChange={pick("prestation")} options={devisPrestations} placeholder="Choisir une prestation" className={field} />
          </div>
          <div>
            <label htmlFor="q-objectif" className={label}>Objectif</label>
            <Select id="q-objectif" value={data.objectif} onChange={pick("objectif")} options={devisObjectifs} placeholder="Choisir un objectif" className={field} />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="q-batiment" className={label}>Type de bâtiment*</label>
            <Select id="q-batiment" value={data.batiment} onChange={pick("batiment")} options={devisBatiments} placeholder="Choisir un type" className={field} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <div>
              <label htmlFor="q-code-postal" className={label}>Code postal*</label>
              <input
                id="q-code-postal"
                value={data.codePostal}
                onChange={set("codePostal")}
                className={field}
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="Ex. 1219"
                required
              />
            </div>
            <div>
              <label htmlFor="q-canton" className={label}>Canton*</label>
              <Select id="q-canton" value={data.canton} onChange={pick("canton")} options={devisCantons} placeholder="Choisir un canton" className={field} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
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
        <div className="space-y-4">
          <div>
            <label htmlFor="q-nom" className={label}>Nom et prénom*</label>
            <input id="q-nom" value={data.nom} onChange={set("nom")} className={field} autoComplete="name" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
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
            <textarea id="q-message" value={data.message} onChange={set("message")} className={`${field} min-h-[76px] resize-y`} placeholder="Décrivez votre projet, vos délais, vos questions." />
          </div>
          <div>
            {/* Desktop : les formats et limites passent à droite du libellé, la zone reste sur une ligne. */}
            <div className="flex items-baseline justify-between gap-3">
              <span className={label}>Pièces jointes (facultatif)</span>
              <span className="mb-1.5 hidden text-[12px] text-mute lg:inline">
                PDF, JPG, PNG, HEIC, WebP · {devisMaxFiles} max, {devisMaxTotalMb} Mo au total
              </span>
            </div>
            <label
              {...dropHandlers}
              className={`flex cursor-pointer items-center gap-3 rounded-sm border border-dashed px-3.5 py-2.5 text-body-sm text-body transition-colors hover:border-accent ${
                dragging ? "border-accent bg-accent/10" : "border-hairline"
              }`}
            >
              {/* Téléphone : trombone et formats. Desktop : on invite au glisser-déposer. */}
              <Paperclip className="size-4 shrink-0 text-accent lg:hidden" strokeWidth={1.75} aria-hidden />
              <Upload className="hidden size-4 shrink-0 text-accent lg:block" strokeWidth={1.75} aria-hidden />
              <span className="min-w-0">
                <span className="lg:hidden">
                  Plans, factures d&apos;énergie, photos ({devisMaxFiles} max, {devisMaxTotalMb} Mo au total)
                </span>
                <span className="hidden lg:inline">
                  {dragging ? (
                    <span className="font-medium text-nera-navy">Déposez vos fichiers ici</span>
                  ) : (
                    <>
                      Glissez-déposez vos plans, factures ou photos, ou{" "}
                      <span className="font-medium text-nera-navy underline underline-offset-2">parcourez</span>
                    </>
                  )}
                </span>
              </span>
              <input
                type="file"
                multiple
                accept={devisAccept}
                className="sr-only"
                onChange={(e) => {
                  addFiles(e.target.files);
                  // Sans cela, re-choisir un fichier qu'on vient de retirer ne déclencherait rien.
                  e.target.value = "";
                }}
              />
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
            ["Lieu", `${data.codePostal}, ${data.canton}`],
            ["Année / surface", [data.annee, data.surface && `${data.surface} m²`].filter(Boolean).join(" · ") || "—"],
            ["Nom et prénom", data.nom],
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

      {/*
        Dans la modale, la mention légale n'apparaît qu'à la dernière étape, juste au-dessus
        d'« Envoyer ma demande » : c'est là que les données partent, et rien n'est transmis
        avant. Répétée à chaque étape, elle prenait 74 px de la zone des champs et faisait
        défiler l'étape « Coordonnées ». Sur téléphone et hors modale, elle reste sous les
        boutons, à chaque étape, comme avant.
      */}
      {fit && step === steps.length - 1 && <FormNotice variant="devis" className="mt-5 text-mute max-sm:hidden" />}
      </div>

      {error && (
        <p role="alert" className="mt-4 shrink-0 text-body-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-5 flex shrink-0 items-center justify-between gap-3 sm:mt-6">
        {step > 0 ? (
          <button type="button" onClick={back} className={btnGhost}>
            <ArrowLeft className="size-4" strokeWidth={1.75} />
            Retour
          </button>
        ) : (
          <span />
        )}
        {/*
          Les deux `key` ne sont pas décoratives. Sans elles, React voit un `<button>` au même
          endroit de l'arbre d'un rendu à l'autre : il réutilise le nœud du DOM et se contente
          d'en changer le `type`. Le clic sur « Suivant » passait donc à l'étape « Synthèse »,
          le même bouton devenait `type="submit"`, et l'action par défaut du clic en cours
          soumettait le formulaire — la demande partait et l'écran de confirmation s'affichait
          sans que l'utilisateur ait cliqué sur « Envoyer ma demande ». Avec des `key`
          distinctes, React démonte un bouton et en monte un autre : le clic ne trouve plus de
          bouton d'envoi sous lui.
        */}
        {step < steps.length - 1 ? (
          <button key="next" type="button" onClick={next} className={btnPrimary}>
            Suivant
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </button>
        ) : (
          <button
            key="send"
            type="submit"
            disabled={status === "sending"}
            onClick={() => {
              sendIntent.current = true;
            }}
            className={btnPrimary}
          >
            {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
          </button>
        )}
      </div>

      <p className="mt-3 shrink-0 text-center text-[12px] text-mute sm:mt-4 sm:text-body-sm">{devisNote}</p>
      <FormNotice variant="devis" className={`mt-3 text-mute ${fit ? "sm:hidden" : ""}`} />
    </form>
  );
}
