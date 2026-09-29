import type { NextConfig } from "next";

/**
 * Redirections saisies dans le Studio Sanity (type « redirect »), lues au moment du build.
 *
 * Next les applique avant tout rendu, avec le bon statut (308 définitive, 307 temporaire).
 * Contrepartie : une redirection ajoutée dans le Studio ne vaut qu'après le déploiement
 * suivant. Un second webhook Sanity, filtré sur `_type == "redirect"`, appelle pour cela un
 * Deploy Hook de Vercel.
 *
 * Lecture directe de l'API, sans import du client : ce fichier est compilé à part. En cas
 * d'échec, aucune redirection plutôt qu'un build en erreur.
 * Limite Vercel : 1 024 redirections dans la configuration.
 */
async function sanityRedirects() {
  const query = `*[_type == "redirect" && isEnabled != false && defined(source) && defined(destination)]{source, destination, permanent}`;
  const url = `https://dpjlojol.api.sanity.io/v2026-09-29/data/query/production?perspective=published&query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { result } = (await res.json()) as {
      result: { source: string; destination: string; permanent?: boolean }[];
    };
    return result.map((r) => ({ source: r.source, destination: r.destination, permanent: r.permanent !== false }));
  } catch (err) {
    console.error("[sanity] redirections", err);
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 85, 90],
    deviceSizes: [390, 640, 768, 1024, 1280, 1536, 1920, 2560],
    // Photos saisies dans le Studio Sanity (références), limitées au projet du site.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/dpjlojol/**" }],
  },
  redirects: sanityRedirects,
};

export default nextConfig;
