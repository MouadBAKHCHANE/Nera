import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/content/prestations";
import { devisNote, devisMaxFiles, devisMaxFileMb } from "@/content/devis";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO ?? company.email;
const FROM = process.env.CONTACT_FROM ?? "NERA Ingénieurs Conseils <noreply@nera-ing.ch>";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

/**
 * Réception du formulaire « Devis gratuit » (multipart) :
 * 1. anti-spam par honeypot, validation minimale ;
 * 2. e-mail à info@nera-ing.ch avec les pièces jointes ;
 * 3. accusé de réception automatique au demandeur.
 * Sans RESEND_API_KEY (développement), la demande est journalisée et considérée envoyée.
 */
export async function POST(req: Request) {
  const fd = await req.formData();
  const get = (k: string) => String(fd.get(k) ?? "").trim();

  if (get("website")) return NextResponse.json({ ok: true }); // honeypot rempli : bot

  const data = {
    prestation: get("prestation"),
    objectif: get("objectif"),
    batiment: get("batiment"),
    commune: get("commune"),
    canton: get("canton"),
    annee: get("annee"),
    surface: get("surface"),
    nom: get("nom"),
    email: get("email"),
    telephone: get("telephone"),
    message: get("message"),
  };

  if (!data.prestation || !data.batiment || !data.commune || !data.canton || !data.nom || !data.telephone) {
    return new NextResponse("Champs obligatoires manquants.", { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return new NextResponse("Adresse e-mail invalide.", { status: 400 });
  }

  const files = fd.getAll("fichiers").filter((f): f is File => f instanceof File && f.size > 0).slice(0, devisMaxFiles);
  for (const f of files) {
    if (f.size > devisMaxFileMb * 1024 * 1024) return new NextResponse(`Fichier trop volumineux : ${f.name}`, { status: 400 });
  }

  const rows = [
    ["Prestation", data.prestation],
    ["Objectif", data.objectif || "—"],
    ["Type de bâtiment", data.batiment],
    ["Commune / canton", `${data.commune}, ${data.canton}`],
    ["Année de construction", data.annee || "—"],
    ["Surface approximative", data.surface ? `${data.surface} m²` : "—"],
    ["Nom", data.nom],
    ["E-mail", data.email],
    ["Téléphone", data.telephone],
    ["Pièces jointes", files.length ? files.map((f) => f.name).join(", ") : "—"],
  ];
  const table = rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#7a8087">${k}</td><td style="padding:6px 0;color:#222">${esc(v)}</td></tr>`).join("");
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5"><h2 style="color:#0f3557">Nouvelle demande de devis</h2><table>${table}</table>${
    data.message ? `<p style="margin-top:16px"><strong>Message</strong><br>${esc(data.message).replace(/\n/g, "<br>")}</p>` : ""
  }</div>`;

  const ack = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#222"><p>Bonjour ${esc(data.nom)},</p><p>Nous avons bien reçu votre demande de devis concernant « ${esc(
    data.prestation,
  )} » pour votre bien à ${esc(data.commune)} (${esc(data.canton)}).</p><p>${devisNote}</p><p>Cordialement,<br><strong>${company.shortName}</strong><br>${company.street}, ${company.zip} ${company.city}<br>${company.phone} · ${company.email}</p></div>`;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info("[devis] (dev, sans RESEND_API_KEY)", { ...data, fichiers: files.map((f) => f.name) });
    return NextResponse.json({ ok: true, dev: true });
  }

  const resend = new Resend(key);
  const attachments = await Promise.all(files.map(async (f) => ({ filename: f.name, content: Buffer.from(await f.arrayBuffer()) })));

  const [toNera, toClient] = await Promise.all([
    resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: data.email,
      subject: `Devis gratuit : ${data.prestation} · ${data.commune} (${data.canton})`,
      html,
      attachments,
    }),
    resend.emails.send({
      from: FROM,
      to: data.email,
      subject: "Votre demande de devis · NERA Ingénieurs Conseils",
      html: ack,
    }),
  ]);
  if (toNera.error || toClient.error) {
    console.error("[devis] envoi", toNera.error ?? toClient.error);
    return new NextResponse("Envoi impossible.", { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
