import { NextResponse } from "next/server";
import { company, prestations } from "@/content/prestations";
import { sendMail, mailTo, mailDevFallback, escapeHtml as esc, isEmail, signature } from "@/lib/mail";

export const runtime = "nodejs";

/**
 * Réception du formulaire de contact, commun à l'accueil et à `/contact`
 * (`components/contact/ContactForm.tsx`). Distinct de `/api/devis`, dont les champs diffèrent.
 * 1. anti-spam par honeypot, validation minimale ;
 * 2. e-mail à info@nera-ing.ch, réponse directe au visiteur par « Répondre » ;
 * 3. accusé de réception au visiteur, sans bloquer si lui seul échoue.
 */
export async function POST(req: Request) {
  const fd = await req.formData();
  const get = (k: string) => String(fd.get(k) ?? "").trim();

  if (get("website")) return NextResponse.json({ ok: true }); // honeypot rempli : bot

  const sujetSlug = get("sujet");
  const data = {
    nom: get("nom"),
    email: get("email"),
    entreprise: get("entreprise"),
    telephone: get("telephone"),
    // Le formulaire envoie le slug de la prestation : on remet l'intitulé lisible.
    sujet: sujetSlug === "autre" ? "Autre demande" : (prestations.find((p) => p.slug === sujetSlug)?.title ?? ""),
    message: get("message"),
  };

  if (!data.nom || !data.sujet || !data.message) {
    return new NextResponse("Champs obligatoires manquants.", { status: 400 });
  }
  if (!isEmail(data.email)) {
    return new NextResponse("Adresse e-mail invalide.", { status: 400 });
  }
  if (data.message.length > 5000) {
    return new NextResponse("Message trop long.", { status: 400 });
  }

  if (mailDevFallback()) {
    console.info("[contact] (dev, Graph non configuré)", data);
    return NextResponse.json({ ok: true, dev: true });
  }

  const rows = [
    ["Sujet", data.sujet],
    ["Nom", data.nom],
    ["E-mail", data.email],
    ["Entreprise", data.entreprise || "—"],
    ["Téléphone", data.telephone || "—"],
  ];
  const table = rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#7a8087">${k}</td><td style="padding:6px 0;color:#222">${esc(v)}</td></tr>`)
    .join("");
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5"><h2 style="color:#0f3557">Nouveau message depuis le site</h2><table>${table}</table><p style="margin-top:16px"><strong>Message</strong><br>${esc(
    data.message,
  ).replace(/\n/g, "<br>")}</p></div>`;

  try {
    await sendMail({ to: mailTo(), replyTo: data.email, subject: `Contact site : ${data.sujet} · ${data.nom}`, html });
  } catch (err) {
    console.error("[contact] envoi à NERA", err);
    return new NextResponse("Envoi impossible.", { status: 502 });
  }

  const ack = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#222"><p>Bonjour ${esc(
    data.nom,
  )},</p><p>Nous avons bien reçu votre message concernant « ${esc(data.sujet)} ». Nous revenons vers vous rapidement.</p>${signature(company)}</div>`;
  try {
    await sendMail({ to: data.email, subject: "Votre message · NERA Ingénieurs Conseils", html: ack });
  } catch (err) {
    console.error("[contact] accusé de réception", err);
  }
  return NextResponse.json({ ok: true });
}
