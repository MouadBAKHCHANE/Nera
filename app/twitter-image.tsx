import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Image de partage (Open Graph / Twitter) : logo NERA sur fond marine avec la grille de plan.
 * Utilisée par WhatsApp, LinkedIn, Facebook, iMessage… quand un lien du site est partagé.
 * Convention de fichier Next.js : s'applique à toutes les pages.
 */
export const runtime = "nodejs";
export const alt = "NERA Ingénieurs Conseils, bureau d'ingénieurs en énergie et physique du bâtiment à Genève";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const svg = await readFile(join(process.cwd(), "public/logos/nera-tagline-cream-green.svg"), "utf8");
  const logo = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F3557",
          backgroundImage:
            "linear-gradient(to right, rgba(244,243,239,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,243,239,0.07) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          color: "#F4F3EF",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" width={640} height={166} />
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 56 }}>
          <div style={{ width: 28, height: 8, background: "#28AC75" }} />
          <div style={{ fontSize: 26, letterSpacing: 6, textTransform: "uppercase", opacity: 0.9 }}>
            Énergie · Physique du bâtiment · CVC
          </div>
        </div>
        <div style={{ marginTop: 18, fontSize: 24, opacity: 0.7 }}>Genève · Suisse romande · nera-ing.ch</div>
      </div>
    ),
    size,
  );
}
