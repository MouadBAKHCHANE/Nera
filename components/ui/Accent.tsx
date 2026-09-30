/**
 * Titre dont une partie est mise en avant (en vert, le plus souvent). `accent` est la partie à
 * mettre en avant, saisie dans le Studio : elle doit figurer telle quelle dans `text`. Absente ou
 * introuvable, le titre s'affiche simplement, sans mise en avant.
 */
export function Accent({ text, accent, className }: { text: string; accent?: string; className: string }) {
  const i = accent ? text.indexOf(accent) : -1;
  if (!accent || i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className={className}>{accent}</span>
      {text.slice(i + accent.length)}
    </>
  );
}
