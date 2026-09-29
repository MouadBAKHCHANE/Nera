/**
 * Envoi des e-mails du site par Microsoft Graph, depuis le tenant Microsoft 365 de NERA.
 *
 * Flux « client credentials » : l'application inscrite dans Entra ID obtient un jeton avec son
 * secret, puis appelle `POST /users/{boîte}/sendMail`. Aucun SMTP, aucune modification DNS :
 * SPF, DKIM et DMARC de Microsoft 365 s'appliquent tels quels.
 *
 * Côté tenant (configuré par l'informatique de NERA, septembre 2026) : permission d'application
 * `Mail.Send`, restreinte par Exchange RBAC à la seule boîte d'expédition. Le nom d'expéditeur
 * affiché est celui de cette boîte dans Exchange : il ne se règle pas ici.
 *
 * Variables d'environnement, à poser dans Vercel et jamais dans le dépôt :
 * MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, MAIL_FROM, MAIL_TO.
 * Le secret expire le 24 septembre 2027 : passé cette date, le jeton est refusé et chaque envoi
 * échoue avec une erreur 401 dans les journaux Vercel.
 *
 * Limite à connaître : `sendMail` refuse toute requête de plus de 4 Mo, pièces jointes
 * comprises, et le base64 les gonfle d'un tiers. D'où `mailMaxAttachmentsMb`.
 */

/** Pièces jointes, en Mo réels, avant l'encodage base64 qui les porte à environ 4 Mo. */
export const mailMaxAttachmentsMb = 3;

export type MailAttachment = { name: string; contentType: string; content: Buffer };
export type Mail = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: MailAttachment[];
};

type Config = { tenant: string; clientId: string; secret: string; from: string };

function config(): Config | null {
  const { MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, MAIL_FROM } = process.env;
  if (!MS_TENANT_ID || !MS_CLIENT_ID || !MS_CLIENT_SECRET || !MAIL_FROM) return null;
  return { tenant: MS_TENANT_ID, clientId: MS_CLIENT_ID, secret: MS_CLIENT_SECRET, from: MAIL_FROM };
}

/** Adresse qui reçoit les demandes du site. Validée par le client : info@nera-ing.ch. */
export const mailTo = () => process.env.MAIL_TO || "info@nera-ing.ch";

/**
 * Sans configuration, on n'envoie rien. En développement, la demande est journalisée et
 * considérée comme envoyée, pour tester les formulaires. En production, c'est une erreur :
 * mieux vaut un message d'échec qui renvoie vers le téléphone qu'une demande perdue en silence.
 */
export const mailDevFallback = () => config() === null && process.env.NODE_ENV !== "production";

// Le jeton vaut une heure. On le garde tant que l'instance vit, avec une minute de marge.
let cached: { token: string; expires: number } | null = null;

async function accessToken(cfg: Config): Promise<string> {
  if (cached && cached.expires > Date.now() + 60_000) return cached.token;
  const res = await fetch(`https://login.microsoftonline.com/${cfg.tenant}/oauth2/v2.0/token`, {
    method: "POST",
    body: new URLSearchParams({
      client_id: cfg.clientId,
      client_secret: cfg.secret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
  });
  if (!res.ok) throw new Error(`[mail] jeton refusé (${res.status}) : ${await res.text()}`);
  const json = (await res.json()) as { access_token: string; expires_in: number };
  cached = { token: json.access_token, expires: Date.now() + json.expires_in * 1000 };
  return json.access_token;
}

export async function sendMail(mail: Mail): Promise<void> {
  const cfg = config();
  if (!cfg) throw new Error("[mail] Microsoft Graph n'est pas configuré (variables MS_* et MAIL_FROM).");

  const token = await accessToken(cfg);
  const message = {
    subject: mail.subject,
    body: { contentType: "HTML", content: mail.html },
    toRecipients: [{ emailAddress: { address: mail.to } }],
    ...(mail.replyTo ? { replyTo: [{ emailAddress: { address: mail.replyTo } }] } : {}),
    ...(mail.attachments?.length
      ? {
          attachments: mail.attachments.map((a) => ({
            "@odata.type": "#microsoft.graph.fileAttachment",
            name: a.name,
            contentType: a.contentType || "application/octet-stream",
            contentBytes: a.content.toString("base64"),
          })),
        }
      : {}),
  };

  const res = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(cfg.from)}/sendMail`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    // Une boîte « noreply » n'a pas à garder de copie de chaque envoi.
    body: JSON.stringify({ message, saveToSentItems: false }),
  });
  // Graph répond 202 Accepted, sans corps, quand le message est pris en charge.
  if (res.status !== 202) {
    if (res.status === 401) cached = null;
    throw new Error(`[mail] sendMail refusé (${res.status}) : ${await res.text()}`);
  }
}

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

/** Bloc de signature des accusés de réception. */
export function signature(company: {
  shortName: string;
  street: string;
  zip: string;
  city: string;
  phone: string;
  email: string;
}) {
  return `<p>Cordialement,<br><strong>${company.shortName}</strong><br>${company.street}, ${company.zip} ${company.city}<br>${company.phone} · ${company.email}</p>`;
}
