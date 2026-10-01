import { cache } from "react";
import { sanityFetch } from "./fetch";

/**
 * Identifiants de mesure saisis dans le Studio (« Marketing & Analytics », document unique).
 *
 * Chaque valeur est revérifiée ici contre son format, pas seulement dans le Studio : elles
 * finissent dans des scripts, et un document peut aussi être écrit par l'API sans passer par
 * les validations du Studio. Une valeur hors format est ignorée, comme un champ vide.
 */

export type MarketingIds = {
  googleTagManagerId?: string;
  googleAnalyticsId?: string;
  googleAdsId?: string;
  googleAdsQuoteLabel?: string;
  googleAdsContactLabel?: string;
  metaPixelId?: string;
};

export type MarketingSettings = MarketingIds & {
  googleSiteVerification?: string;
  metaDomainVerification?: string;
};

type Raw = Partial<Record<keyof MarketingSettings, string>> | null;

export const MARKETING_TAG = "marketingSettings";

const MARKETING_QUERY = /* groq */ `
  *[_id == "marketingSettings"][0] {
    googleTagManagerId,
    googleAnalyticsId,
    googleAdsId,
    googleAdsQuoteLabel,
    googleAdsContactLabel,
    metaPixelId,
    googleSiteVerification,
    metaDomainVerification
  }
`;

const valid = (value: string | undefined, re: RegExp) => {
  const v = value?.trim();
  return v && re.test(v) ? v : undefined;
};

/** Accepte la balise entière (`<meta name="…" content="xyz" />`) ou la seule valeur. */
const token = (value: string | undefined) => {
  const v = value?.trim();
  if (!v) return undefined;
  const fromTag = v.match(/content=["']([^"']+)["']/)?.[1] ?? v;
  return /^[A-Za-z0-9_-]{10,100}$/.test(fromTag) ? fromTag : undefined;
};

export const getMarketingSettings = cache(async (): Promise<MarketingSettings> => {
  let raw: Raw = null;
  try {
    raw = await sanityFetch<Raw>({ query: MARKETING_QUERY, tags: [MARKETING_TAG] });
  } catch (err) {
    console.error("[sanity] marketing", err);
  }
  return {
    googleTagManagerId: valid(raw?.googleTagManagerId, /^GTM-[A-Z0-9]{4,12}$/),
    googleAnalyticsId: valid(raw?.googleAnalyticsId, /^G-[A-Z0-9]{4,20}$/),
    googleAdsId: valid(raw?.googleAdsId, /^AW-\d{6,15}$/),
    googleAdsQuoteLabel: valid(raw?.googleAdsQuoteLabel, /^[A-Za-z0-9_-]{4,40}$/),
    googleAdsContactLabel: valid(raw?.googleAdsContactLabel, /^[A-Za-z0-9_-]{4,40}$/),
    metaPixelId: valid(raw?.metaPixelId, /^\d{8,20}$/),
    googleSiteVerification: token(raw?.googleSiteVerification),
    metaDomainVerification: token(raw?.metaDomainVerification),
  };
});
