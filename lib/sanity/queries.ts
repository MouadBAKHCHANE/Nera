/**
 * Requêtes GROQ du site. Toujours projeter les seuls champs utiles (règle Sanity).
 * `coalesce(year, 0)` : une référence sans année passe après celles qui en ont une.
 */
const imageProjection = /* groq */ `
  asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
  alt,
  hotspot,
  crop
`;

export const REALISATIONS_QUERY = /* groq */ `
  *[_type == "realisation" && defined(title)] | order(coalesce(year, 0) desc, _createdAt desc) {
    _id,
    title,
    place,
    year,
    prestations,
    text,
    image { ${imageProjection} }
  }
`;

export const REALISATIONS_COUNT_QUERY = /* groq */ `count(*[_type == "realisation" && defined(title)])`;
