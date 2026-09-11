"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type PrestationIllustrationProps = {
  active: number;
  slug?: string;
  className?: string;
};

/*
 * Immeuble d'habitation au trait, en projection isométrique exacte (30°), dans la palette du
 * site : marine pour le trait, crème et blanc pour les faces, vert pour le seul accent.
 * Chaque prestation (0 à 5) n'éclaire que des éléments présents dans le texte client, et ne
 * porte aucun chiffre, aucune classe, aucun montant : rien qui ne soit fourni par NERA.
 *
 * Géométrie : (x, y, z) en unités de dessin → écran. x court vers la droite-bas, y vers la
 * gauche-bas, z vers le haut. Faces visibles : x = max (droite), y = max (gauche), z = max.
 */
const C = Math.cos(Math.PI / 6);
const S = 0.5;
const OX = 400;
const OY = 322;
/** Emprise : W le long de x (façade droite), D le long de y (façade gauche). */
const W = 240;
const D = 160;
/** Hauteur d'étage, nombre de niveaux, acrotère. */
const F = 62;
const N = 4;
const H = F * N;
const PAR = 8;
const TOP = H + PAR;

type P3 = [number, number, number];
const iso = (x: number, y: number, z: number): [number, number] => [OX + (x - y) * C, OY + (x + y) * S - z];
const pt = (p: P3) => iso(...p).map((v) => v.toFixed(1)).join(",");
const poly = (...pts: P3[]) => pts.map(pt).join(" ");
/** Face verticale dans le plan x = const. */
const faceX = (x: number, y0: number, y1: number, z0: number, z1: number) =>
  poly([x, y0, z0], [x, y1, z0], [x, y1, z1], [x, y0, z1]);
/** Face verticale dans le plan y = const. */
const faceY = (y: number, x0: number, x1: number, z0: number, z1: number) =>
  poly([x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]);
/** Face horizontale dans le plan z = const. */
const faceZ = (z: number, x0: number, x1: number, y0: number, y1: number) =>
  poly([x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]);

const LINE = "stroke-nera-navy";
const THIN = "stroke-nera-navy/50";

/** Parallélépipède : ses trois faces visibles. */
function Box({
  x0, x1, y0, y1, z0, z1, top = "fill-nera-cream", left = "fill-nera-cream-deep", right = "fill-nera-white", stroke = LINE, sw = 1.25,
}: {
  x0: number; x1: number; y0: number; y1: number; z0: number; z1: number;
  top?: string; left?: string; right?: string; stroke?: string; sw?: number;
}) {
  return (
    <g strokeWidth={sw} strokeLinejoin="round" className={stroke}>
      <polygon points={faceZ(z1, x0, x1, y0, y1)} className={top} />
      <polygon points={faceY(y1, x0, x1, z0, z1)} className={left} />
      <polygon points={faceX(x1, y0, y1, z0, z1)} className={right} />
    </g>
  );
}

/** Étiquette : cartouche blanc à filet marine, titre et lignes, reliée à un point du dessin. */
/**
 * Étiquette-énergie : les sept classes du schéma usuel, en flèches, du vert au rouge.
 *
 * **Seul endroit du site où des couleurs sont écrites en dur.** `DESIGN.md` l'interdit dans un
 * composant, mais cette gamme n'appartient pas à la charte NERA : c'est le code couleur
 * normalisé de l'étiquette-énergie, comme les logos officiels des partenaires. La transposer
 * dans la palette du site la rendrait méconnaissable.
 */
const ENERGY_CLASSES = [
  { letter: "A", color: "#189a4e" },
  { letter: "B", color: "#5cbc94" },
  { letter: "C", color: "#86c879" },
  { letter: "D", color: "#ede62b" },
  { letter: "E", color: "#f2a94e" },
  { letter: "F", color: "#e99191" },
  { letter: "G", color: "#df3b33" },
] as const;

/** Barre en flèche : rectangle dont le bord droit se termine en pointe. */
const energyBar = (w: number, h = 15, tip = 9) => `M0 0 H${w - tip} L${w} ${h / 2} L${w - tip} ${h} H0 Z`;

function Tag({
  x, y, w, title, lines = [], to, accent = false, delay = 0, reduce,
}: {
  x: number; y: number; w: number; title: string; lines?: string[]; to?: [number, number];
  accent?: boolean; delay?: number; reduce: boolean | null;
}) {
  const h = 30 + lines.length * 18;
  const cy = y + h / 2;
  const from: [number, number] = to ? (to[0] > x + w / 2 ? [x + w, cy] : [x, cy]) : [x, cy];
  return (
    <motion.g
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: 16 }}
      transition={{ duration: reduce ? 0 : 0.32, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {to && (
        <>
          <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} strokeWidth={1} className={accent ? "stroke-accent" : THIN} />
          <circle cx={to[0]} cy={to[1]} r={3} className={accent ? "fill-accent" : "fill-nera-navy"} />
        </>
      )}
      <rect x={x} y={y} width={w} height={h} rx={3} strokeWidth={1} className={`fill-nera-white ${accent ? "stroke-accent" : LINE}`} />
      {accent && <rect x={x} y={y} width={3} height={h} className="fill-accent" />}
      <text x={x + 12} y={y + 20} fontSize={17} fontWeight={500} className="fill-nera-navy">
        {title}
      </text>
      {lines.map((l, i) => (
        <text key={l} x={x + 12} y={y + 39 + i * 18} fontSize={14} className="fill-nera-body">
          {l}
        </text>
      ))}
    </motion.g>
  );
}

/** Calque d'une prestation : apparaît et disparaît en fondu, 320 ms. */
function Layer({ children, reduce }: { children: React.ReactNode; reduce: boolean | null }) {
  return (
    <motion.g
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.32, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.g>
  );
}

/* Ouvertures. Façade gauche (plan y = D) : trois travées le long de x, balcon sur la travée centrale.
 * Façade droite (plan x = W) : trois travées le long de y, entrée sur la travée centrale au rez. */
const BAYS_X = [
  [28, 70],
  [98, 142],
  [170, 212],
];
const BAYS_Y = [
  [18, 50],
  [64, 96],
  [110, 142],
];
const BALCONY = { x0: 92, x1: 148, depth: 34, h: 40 };
const ENTRANCE = { y0: 64, y1: 96, h: 66 };

/** Panneaux en toiture : rangées sur le plan z = TOP, légèrement inclinés vers la façade gauche. */
const panels: [number, number, number, number][] = [];
for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) panels.push([22 + c * 28, 46 + c * 28, 68 + r * 28, 90 + r * 28]);
const panel = ([x0, x1, y0, y1]: [number, number, number, number], z = TOP + 3) =>
  poly([x0, y0, z + 7], [x1, y0, z + 7], [x1, y1, z + 1], [x0, y1, z + 1]);

/** Pompe à chaleur extérieure, le long de la façade droite. */
const PAC = { x0: W + 14, x1: W + 40, y0: 20, y1: 44, z1: 24 };

export function PrestationIllustration({ active, className = "" }: PrestationIllustrationProps) {
  const reduce = useReducedMotion();
  const blueprint = active === 3;
  const renovated = active === 5;
  const insulated = active === 1 || renovated;
  /** Ventilation et photovoltaïque en toiture : CVC et rénovation globale. */
  const equipped = active === 2 || renovated;
  /** Pompe à chaleur et capteur solaire thermique : CVC, subventions et rénovation globale. */
  const heating = active === 2 || active === 4 || renovated;

  const wallLeft = blueprint ? "fill-transparent" : "fill-nera-cream-deep";
  const wallRight = blueprint ? "fill-transparent" : "fill-nera-white";
  const roofTop = blueprint ? "fill-transparent" : "fill-nera-cream";
  const glass = blueprint ? "fill-transparent" : "fill-nera-navy-soft";
  const swap = "transition-[fill] duration-300";

  const frontCorner = iso(W, D, 0);
  const rightCorner = iso(W, 0, 0);
  const leftCorner = iso(0, D, 0);

  return (
    <div className={`relative flex select-none items-center justify-center ${className}`}>
      <svg
        viewBox="28 78 744 598"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full font-sans [&_*]:[vector-effect:non-scaling-stroke]"
        aria-hidden
      >
        <defs>
          <pattern id="nera-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" strokeWidth={1.2} className="stroke-accent" />
          </pattern>
          <pattern id="nera-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" strokeWidth={0.75} className="stroke-nera-navy/15" />
          </pattern>
        </defs>

        {/* Terrain : dalle, épaisseur, joints de pavage. */}
        <g strokeWidth={1} className={THIN}>
          <polygon points={faceZ(0, -44, W + 116, -44, D + 84)} fill={blueprint ? "url(#nera-grid)" : undefined} className={blueprint ? "" : `${swap} fill-nera-navy-soft/40`} />
          <polygon points={faceY(D + 84, -44, W + 116, -6, 0)} className={`${swap} ${blueprint ? "fill-transparent" : "fill-nera-cream-deep"}`} />
          <polygon points={faceX(W + 116, -44, D + 84, -6, 0)} className={`${swap} ${blueprint ? "fill-transparent" : "fill-nera-navy-soft"}`} />
          {[-4, 36, 76, 116, 156, 196].map((y) => (
            <line key={`jy${y}`} x1={iso(-44, y, 0)[0]} y1={iso(-44, y, 0)[1]} x2={iso(W + 116, y, 0)[0]} y2={iso(W + 116, y, 0)[1]} className="stroke-nera-navy/12" />
          ))}
          {[-4, 36, 76, 116, 156, 196, 236, 276, 316].map((x) => (
            <line key={`jx${x}`} x1={iso(x, -44, 0)[0]} y1={iso(x, -44, 0)[1]} x2={iso(x, D + 84, 0)[0]} y2={iso(x, D + 84, 0)[1]} className="stroke-nera-navy/12" />
          ))}
        </g>

        {/* Arbre d'alignement. */}
        <g strokeWidth={1.25} className={LINE}>
          <line x1={iso(W + 84, D + 34, 0)[0]} y1={iso(W + 84, D + 34, 0)[1]} x2={iso(W + 84, D + 34, 30)[0]} y2={iso(W + 84, D + 34, 30)[1]} />
          <circle cx={iso(W + 84, D + 34, 54)[0]} cy={iso(W + 84, D + 34, 54)[1]} r={28} className={`${swap} ${blueprint ? "fill-transparent" : "fill-nera-cream"}`} />
          <circle cx={iso(W + 84, D + 34, 54)[0] - 7} cy={iso(W + 84, D + 34, 54)[1] + 4} r={14} className="stroke-nera-navy/40" />
        </g>

        {/* Corps du bâtiment. */}
        <g strokeWidth={1.5} strokeLinejoin="round" className={LINE}>
          <polygon points={faceY(D, 0, W, 0, TOP)} className={`${swap} ${wallLeft}`} />
          <polygon points={faceX(W, 0, D, 0, TOP)} className={`${swap} ${wallRight}`} />
          <polygon points={faceZ(TOP, 0, W, 0, D)} className={`${swap} ${roofTop}`} />
          {/* Acrotère : bord intérieur et gravier. */}
          <polygon points={faceZ(TOP, 9, W - 9, 9, D - 9)} strokeWidth={1} className={`${swap} ${blueprint ? "fill-transparent" : "fill-nera-cream-deep"}`} />
          {/* Nez de dalle : un filet par niveau sur chaque façade. */}
          {[1, 2, 3].map((k) => (
            <g key={`slab${k}`} strokeWidth={0.75} className="stroke-nera-navy/35">
              <line x1={iso(0, D, k * F)[0]} y1={iso(0, D, k * F)[1]} x2={iso(W, D, k * F)[0]} y2={iso(W, D, k * F)[1]} />
              <line x1={iso(W, 0, k * F)[0]} y1={iso(W, 0, k * F)[1]} x2={iso(W, D, k * F)[0]} y2={iso(W, D, k * F)[1]} />
            </g>
          ))}
        </g>

        {/* Isolation périphérique : hachures sur les deux façades. */}
        <AnimatePresence>
          {insulated && (
            <motion.g
              key="hatch"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.32 }}
            >
              <polygon points={faceY(D, 0, W, 0, TOP)} fill="url(#nera-hatch)" opacity={0.55} />
              <polygon points={faceX(W, 0, D, 0, TOP)} fill="url(#nera-hatch)" opacity={0.55} />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Fenêtres : façade gauche (travées le long de x). */}
        <g strokeWidth={1} className={LINE}>
          {BAYS_X.map(([x0, x1], b) =>
            [0, 1, 2, 3].map((k) => {
              const z0 = k * F + (k === 0 ? 12 : 18);
              const z1 = k * F + 56;
              const isBalconyDoor = b === 1 && k > 0;
              return (
                <g key={`wl${b}${k}`}>
                  <polygon points={faceY(D, x0, x1, isBalconyDoor ? k * F + 2 : z0, z1)} className={`${swap} ${glass}`} />
                  <line x1={iso((x0 + x1) / 2, D, z0)[0]} y1={iso((x0 + x1) / 2, D, isBalconyDoor ? k * F + 2 : z0)[1]} x2={iso((x0 + x1) / 2, D, z1)[0]} y2={iso((x0 + x1) / 2, D, z1)[1]} strokeWidth={0.75} />
                </g>
              );
            }),
          )}
          {/* Façade droite (travées le long de y) ; entrée au rez sur la travée centrale. */}
          {BAYS_Y.map(([y0, y1], b) =>
            [0, 1, 2, 3].map((k) => {
              if (k === 0 && b === 1) return null;
              const z0 = k * F + (k === 0 ? 12 : 18);
              const z1 = k * F + 56;
              return (
                <g key={`wr${b}${k}`}>
                  <polygon points={faceX(W, y0, y1, z0, z1)} className={`${swap} ${glass}`} />
                  <line x1={iso(W, (y0 + y1) / 2, z0)[0]} y1={iso(W, (y0 + y1) / 2, z0)[1]} x2={iso(W, (y0 + y1) / 2, z1)[0]} y2={iso(W, (y0 + y1) / 2, z1)[1]} strokeWidth={0.75} />
                </g>
              );
            }),
          )}
        </g>

        {/* Protections solaires (physique du bâtiment) : stores déroulés sur la façade droite, exposée. */}
        <AnimatePresence>
          {active === 1 && (
            <Layer key="blinds" reduce={reduce}>
              {BAYS_Y.map(([y0, y1], b) =>
                [1, 2, 3].map((k) => (
                  <g key={`bl${b}${k}`} strokeWidth={1} className="stroke-accent">
                    <polygon points={faceX(W + 1, y0, y1, k * F + 36, k * F + 56)} className="fill-accent/20" />
                    {[42, 48, 54].map((dz) => (
                      <line key={dz} x1={iso(W + 1, y0, k * F + dz)[0]} y1={iso(W + 1, y0, k * F + dz)[1]} x2={iso(W + 1, y1, k * F + dz)[0]} y2={iso(W + 1, y1, k * F + dz)[1]} strokeWidth={0.75} />
                    ))}
                  </g>
                )),
              )}
            </Layer>
          )}
        </AnimatePresence>

        {/* Entrée : porte vitrée et marquise. */}
        <g strokeWidth={1.25} className={LINE}>
          <polygon points={faceX(W, ENTRANCE.y0, ENTRANCE.y1, 0, ENTRANCE.h)} className={`${swap} ${glass}`} />
          <line x1={iso(W, 80, 0)[0]} y1={iso(W, 80, 0)[1]} x2={iso(W, 80, ENTRANCE.h)[0]} y2={iso(W, 80, ENTRANCE.h)[1]} strokeWidth={0.75} />
          <Box x0={W} x1={W + 24} y0={ENTRANCE.y0 - 6} y1={ENTRANCE.y1 + 6} z0={ENTRANCE.h} z1={ENTRANCE.h + 5} top={roofTop} left={wallLeft} right={wallRight} />
        </g>

        {/* Balcons de la travée centrale, façade gauche. */}
        {[1, 2, 3].map((k) => {
          const z = k * F;
          const { x0, x1, depth, h } = BALCONY;
          const yo = D + depth;
          return (
            <g key={`balc${k}`} strokeWidth={1.25} className={LINE}>
              <Box x0={x0} x1={x1} y0={D} y1={yo} z0={z} z1={z + 6} top={roofTop} left={wallLeft} right={wallRight} />
              <polygon points={faceY(yo, x0, x1, z + 6, z + h)} strokeWidth={1} className={`${swap} ${blueprint ? "fill-transparent" : "fill-nera-navy-soft/60"}`} />
              <polygon points={faceX(x1, D, yo, z + 6, z + h)} strokeWidth={1} className={`${swap} ${blueprint ? "fill-transparent" : "fill-nera-navy-soft/40"}`} />
              <line x1={iso(x0, yo, z + h)[0]} y1={iso(x0, yo, z + h)[1]} x2={iso(x1, yo, z + h)[0]} y2={iso(x1, yo, z + h)[1]} strokeWidth={1.5} />
              <line x1={iso(x1, yo, z + h)[0]} y1={iso(x1, yo, z + h)[1]} x2={iso(x1, D, z + h)[0]} y2={iso(x1, D, z + h)[1]} strokeWidth={1.5} />
            </g>
          );
        })}

        {/* Toiture : édicule d'accès et sorties de ventilation. */}
        <g strokeWidth={1.25} className={LINE}>
          <Box x0={152} x1={214} y0={14} y1={56} z0={TOP} z1={TOP + 28} top={roofTop} left={wallLeft} right={wallRight} />
          <polygon points={faceX(214, 24, 46, TOP, TOP + 22)} strokeWidth={1} className={`${swap} ${glass}`} />
          <Box x0={44} x1={54} y0={112} y1={122} z0={TOP} z1={TOP + 16} top={roofTop} left={wallLeft} right={wallRight} sw={1} />
          <Box x0={70} x1={80} y0={112} y1={122} z0={TOP} z1={TOP + 16} top={roofTop} left={wallLeft} right={wallRight} sw={1} />
        </g>

        {/* Ponts thermiques (physique du bâtiment) : jonction dalle de balcon / façade. */}
        <AnimatePresence>
          {active === 1 && (
            <Layer key="bridges" reduce={reduce}>
              {[1, 2, 3].map((k) => (
                <g key={`tb${k}`}>
                  <line x1={iso(BALCONY.x0, D, k * F + 3)[0]} y1={iso(BALCONY.x0, D, k * F + 3)[1]} x2={iso(BALCONY.x1, D, k * F + 3)[0]} y2={iso(BALCONY.x1, D, k * F + 3)[1]} strokeWidth={3} strokeLinecap="round" className="stroke-accent" />
                </g>
              ))}
            </Layer>
          )}
        </AnimatePresence>

        {/* Installations (CVC, rénovation) : ventilation double flux en toiture, PAC extérieure, panneaux. */}
        <AnimatePresence>
          {equipped && (
            <Layer key="plant" reduce={reduce}>
              <g strokeWidth={1.25} className={LINE}>
                {/* Monobloc de ventilation et ses deux gaines. */}
                <Box x0={100} x1={140} y0={16} y1={44} z0={TOP} z1={TOP + 20} top={roofTop} left={wallLeft} right={wallRight} />
                <Box x0={140} x1={150} y0={22} y1={30} z0={TOP + 6} z1={TOP + 14} sw={1} />
                <Box x0={140} x1={150} y0={32} y1={40} z0={TOP + 6} z1={TOP + 14} sw={1} />
                <circle cx={iso(120, 44, TOP + 10)[0]} cy={iso(120, 44, TOP + 10)[1]} r={5} strokeWidth={1} />
                {/* Panneaux solaires : photovoltaïque, et un capteur thermique isolé. */}
                {panels.map((p, i) => (
                  <polygon key={i} points={panel(p)} strokeWidth={0.75} className={renovated ? "fill-accent/25 stroke-accent" : "fill-nera-navy/70"} />
                ))}
              </g>
            </Layer>
          )}
        </AnimatePresence>

        {/* Production de chaleur (CVC, subventions, rénovation) : PAC extérieure et capteur solaire thermique. */}
        <AnimatePresence>
          {heating && (
            <Layer key="heating" reduce={reduce}>
              <g strokeWidth={1.25} className={LINE}>
                <polygon points={panel([150, 200, 92, 130])} strokeWidth={1} className={renovated ? "fill-accent/25 stroke-accent" : "fill-nera-navy/40"} />
                <Box x0={PAC.x0} x1={PAC.x1} y0={PAC.y0} y1={PAC.y1} z0={0} z1={PAC.z1} top={roofTop} left={wallLeft} right={wallRight} />
                <circle cx={iso(PAC.x1, (PAC.y0 + PAC.y1) / 2, PAC.z1 / 2)[0]} cy={iso(PAC.x1, (PAC.y0 + PAC.y1) / 2, PAC.z1 / 2)[1]} r={7} strokeWidth={1} />
                <circle cx={iso(PAC.x1, (PAC.y0 + PAC.y1) / 2, PAC.z1 / 2)[0]} cy={iso(PAC.x1, (PAC.y0 + PAC.y1) / 2, PAC.z1 / 2)[1]} r={2} className="fill-nera-navy" />
                <line x1={iso(PAC.x0, 32, 8)[0]} y1={iso(PAC.x0, 32, 8)[1]} x2={iso(W, 32, 8)[0]} y2={iso(W, 32, 8)[1]} strokeWidth={2} className="stroke-accent" />
              </g>
            </Layer>
          )}
        </AnimatePresence>

        {/* Réseau de chaleur (CVC, subventions) : conduite enterrée jusqu'au bâtiment. */}
        <AnimatePresence>
          {(active === 2 || active === 4) && (
            <Layer key="network" reduce={reduce}>
              <motion.line
                x1={iso(W + 116, 130, -3)[0]}
                y1={iso(W + 116, 130, -3)[1]}
                x2={iso(W, 130, -3)[0]}
                y2={iso(W, 130, -3)[1]}
                strokeWidth={2}
                strokeDasharray="6 5"
                className="stroke-accent"
                animate={reduce ? undefined : { strokeDashoffset: [22, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              />
              <circle cx={iso(W + 116, 130, -3)[0]} cy={iso(W + 116, 130, -3)[1]} r={4} strokeWidth={1.25} className="stroke-accent fill-nera-white" />
            </Layer>
          )}
        </AnimatePresence>

        {/* ---- Calques par prestation : contours, cotes, étiquettes. ---- */}

        {/* 0 · CECB : relevé de l'enveloppe et étiquette-énergie A à G. */}
        <AnimatePresence>
          {active === 0 && (
            <Layer key="cecb" reduce={reduce}>
              <motion.polygon
                points={poly([0, D, 0], [W, D, 0], [W, 0, 0], [W, 0, TOP], [0, 0, TOP], [0, D, TOP])}
                strokeWidth={2}
                strokeDasharray="7 5"
                strokeLinejoin="round"
                className="stroke-accent"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduce ? 0 : 1.1, ease: [0.25, 1, 0.5, 1] }}
              />
              {/* Étiquette-énergie : sept classes, de A à G. */}
              <g transform="translate(40 112)">
                <rect width="214" height="220" rx="3" strokeWidth={1} className="fill-nera-white stroke-nera-navy" />
                <text x="14" y="26" fontSize={17} fontWeight={500} className="fill-nera-navy">
                  Étiquette-énergie
                </text>
                {ENERGY_CLASSES.map(({ letter, color }, i) => (
                  <g key={letter} transform={`translate(14 ${42 + i * 20})`}>
                    {/*
                      Le `transform` reste sur ce `<g>` parent : posé sur un `motion.g`,
                      Framer Motion l'écraserait. Le `motion.g` ne porte que l'échelle.
                    */}
                    <motion.g
                      initial={reduce ? false : { scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: reduce ? 0 : 0.5, delay: 0.08 + i * 0.05, ease: [0.25, 1, 0.5, 1] }}
                      style={{ transformOrigin: "0% 50%", transformBox: "fill-box" }}
                    >
                      <path d={energyBar(74 + i * 13)} fill={color} />
                    </motion.g>
                    <text x="7" y="11.5" fontSize={11.5} fontWeight={700} fill="#ffffff">
                      {letter}
                    </text>
                  </g>
                ))}
                <text x="14" y="192" fontSize={12.5} className="fill-nera-mute">
                  Enveloppe · Efficacité globale
                </text>
                <text x="14" y="208" fontSize={12.5} className="fill-nera-mute">
                  Émissions directes de CO₂
                </text>
              </g>
              <Tag reduce={reduce} delay={0.1} x={548} y={80} w={222} title="CECB Plus" lines={["Rapport de conseil", "Variantes de rénovation"]} to={iso(W, 40, 3 * F + 40)} />
              <Tag reduce={reduce} delay={0.16} x={548} y={580} w={222} title="IDC" lines={["Chauffage et eau chaude", "Calcul et dépôt à Genève"]} to={iso(W, 80, 30)} />
              <Tag reduce={reduce} delay={0.22} x={40} y={580} w={244} title="Diagnostic EPIQR+" lines={["Façades, fenêtres, toiture", "Installations techniques"]} to={iso(50, D, 2 * F + 30)} />
            </Layer>
          )}
        </AnimatePresence>

        {/* 1 · Physique du bâtiment : soleil, isolation, ponts thermiques, protection solaire. */}
        <AnimatePresence>
          {active === 1 && (
            <Layer key="physics" reduce={reduce}>
              <g transform="translate(716 214)" strokeWidth={1.5} strokeLinecap="round" className="stroke-accent">
                <circle r="16" className="fill-accent/15" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                  <line key={a} x1={Math.cos((a * Math.PI) / 180) * 22} y1={Math.sin((a * Math.PI) / 180) * 22} x2={Math.cos((a * Math.PI) / 180) * 30} y2={Math.sin((a * Math.PI) / 180) * 30} />
                ))}
              </g>
              <Tag reduce={reduce} delay={0.06} x={40} y={96} w={244} title="Bilan thermique SIA 380/1" lines={["Besoins de chaleur", "Justificatifs énergétiques"]} to={iso(60, D, 2 * F + 30)} accent />
              <Tag reduce={reduce} delay={0.12} x={40} y={440} w={244} title="Ponts thermiques" lines={["Continuité de l’enveloppe", "Étanchéité à l’air"]} to={iso(BALCONY.x0, D, F + 3)} accent />
              <Tag reduce={reduce} delay={0.18} x={548} y={80} w={222} title="Confort d’été" lines={["Protections solaires", "Inertie thermique"]} to={iso(W + 1, 126, 3 * F + 46)} accent />
              <Tag reduce={reduce} delay={0.24} x={548} y={580} w={222} title="Humidité et condensation" lines={["Analyse constructive", "Mesures sur site"]} to={iso(W, 30, F + 8)} accent />
              {/* Sans seconde ligne : « Minergie Partenaire spécialiste » a été retiré à la demande du client. */}
              <Tag reduce={reduce} delay={0.3} x={40} y={590} w={244} title="Minergie · HPE · THPE" />
            </Layer>
          )}
        </AnimatePresence>

        {/* 2 · CVC : production de chaleur, ventilation, renouvelables. */}
        <AnimatePresence>
          {active === 2 && (
            <Layer key="cvc" reduce={reduce}>
              <Tag reduce={reduce} delay={0.06} x={548} y={80} w={222} title="Ventilation" lines={["Simple ou double flux", "Récupération de chaleur"]} to={iso(100, 30, TOP + 12)} accent />
              <Tag reduce={reduce} delay={0.12} x={40} y={96} w={286} title="Photovoltaïque et solaire thermique" lines={["Faisabilité et dimensionnement"]} to={iso(34, 79, TOP + 6)} accent />
              <Tag reduce={reduce} delay={0.18} x={548} y={500} w={222} title="Production de chaleur" lines={["Source disponible", "Températures de distribution"]} to={iso(PAC.x1, 32, 14)} accent />
              <Tag reduce={reduce} delay={0.24} x={548} y={580} w={222} title="Réseau de chaleur" lines={["Possibilité de raccordement"]} to={iso(W + 60, 130, -3)} accent />
            </Layer>
          )}
        </AnimatePresence>

        {/* 3 · Autorisations : mode plan, cotes et niveaux, pièces du dossier. */}
        <AnimatePresence>
          {active === 3 && (
            <Layer key="permit" reduce={reduce}>
              <g strokeWidth={1} className={LINE}>
                {/* Cote verticale le long de l'arête avant, un repère par niveau. */}
                <line x1={rightCorner[0] + 30} y1={rightCorner[1]} x2={rightCorner[0] + 30} y2={iso(W, 0, TOP)[1]} />
                {[0, 1, 2, 3, 4].map((k) => {
                  const y = iso(W, 0, k === 4 ? TOP : k * F)[1];
                  return (
                    <g key={k}>
                      <line x1={rightCorner[0] + 24} y1={y} x2={rightCorner[0] + 36} y2={y} />
                      <line x1={rightCorner[0] + 2} y1={y} x2={rightCorner[0] + 24} y2={y} strokeDasharray="2 3" className="stroke-nera-navy/40" />
                      <text x={rightCorner[0] + 42} y={y + 4} fontSize={13} className="fill-nera-navy">
                        {k === 0 ? "Rez" : k === 4 ? "Toiture" : `R+${k}`}
                      </text>
                    </g>
                  );
                })}
                {/* Cotes horizontales des deux façades. */}
                <line x1={iso(W + 30, 0, 0)[0]} y1={iso(W + 30, 0, 0)[1]} x2={iso(W + 30, D, 0)[0]} y2={iso(W + 30, D, 0)[1]} />
                <line x1={iso(0, D + 30, 0)[0]} y1={iso(0, D + 30, 0)[1]} x2={iso(W, D + 30, 0)[0]} y2={iso(W, D + 30, 0)[1]} />
                {[rightCorner, frontCorner, leftCorner].map((p, i) => (
                  <circle key={i} cx={p[0]} cy={p[1]} r={2.5} className="fill-nera-navy" />
                ))}
              </g>
              <Tag reduce={reduce} delay={0.06} x={40} y={96} w={232} title="Genève · APA et DD" lines={["Bilans thermiques", "Formulaires énergie", "Attestations finales"]} to={iso(40, D, 2 * F + 30)} />
              <Tag reduce={reduce} delay={0.14} x={40} y={590} w={380} title="Vaud · Valais · Fribourg · Neuchâtel · Jura" lines={["Justificatifs adaptés au canton"]} />
              <Tag reduce={reduce} delay={0.2} x={530} y={580} w={236} title="Pour quels projets ?" lines={["Transformation, surélévation,", "neuf, pompe à chaleur, solaire"]} to={iso(W, 130, 10)} />
            </Layer>
          )}
        </AnimatePresence>

        {/* 4 · Subventions : mesures pouvant être concernées, demande avant les travaux. */}
        <AnimatePresence>
          {active === 4 && (
            <Layer key="grants" reduce={reduce}>
              <polygon points={faceY(D, 0, W, 0, TOP)} fill="url(#nera-hatch)" opacity={0.35} />
              <polygon points={faceX(W, 0, D, 0, TOP)} fill="url(#nera-hatch)" opacity={0.35} />
              <Tag reduce={reduce} delay={0.06} x={40} y={96} w={244} title="Isolation de l’enveloppe" to={iso(60, D, 2 * F + 30)} accent />
              <Tag reduce={reduce} delay={0.12} x={548} y={500} w={222} title="Production de chaleur" to={iso(PAC.x1, 32, 14)} accent />
              <Tag reduce={reduce} delay={0.18} x={548} y={80} w={222} title="Solaire thermique" to={iso(175, 92, TOP + 6)} accent />
              <Tag reduce={reduce} delay={0.24} x={548} y={580} w={222} title="Identification des aides" lines={["Dispositifs cantonaux", "et communaux"]} />
              <Tag reduce={reduce} delay={0.3} x={40} y={590} w={252} title="Programme Bâtiments" lines={["De la demande à l’achèvement"]} />
            </Layer>
          )}
        </AnimatePresence>

        {/* 5 · Rénovation globale : tout coordonné, de A à Z. */}
        <AnimatePresence>
          {renovated && (
            <Layer key="global" reduce={reduce}>
              <Tag reduce={reduce} delay={0.06} x={40} y={96} w={204} title="État des lieux" lines={["Audits CECB+ et EPIQR+"]} to={iso(60, D, 2 * F + 30)} accent />
              <Tag reduce={reduce} delay={0.12} x={548} y={80} w={222} title="Concept de rénovation" lines={["Priorisation des mesures", "de rénovation"]} to={iso(90, 60, TOP + 8)} accent />
              <Tag reduce={reduce} delay={0.18} x={548} y={500} w={222} title="AMO énergie" lines={["Interlocuteur technique", "du maître d’ouvrage"]} to={iso(PAC.x1, 32, 14)} accent />
              {/* Les étapes coordonnées par NERA, dans l'ordre du texte client. */}
              <g transform="translate(40 604)">
                {["Diagnostic", "Stratégie", "Études", "Autorisations", "Subventions", "Appels d’offres", "Suivi technique", "Réception"].map((s, i) => {
                  const col = i % 4;
                  const row = Math.floor(i / 4);
                  return (
                    <g key={s} transform={`translate(${col * 136} ${row * 36})`}>
                      <motion.g
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.32, delay: 0.1 + i * 0.06, ease: [0.25, 1, 0.5, 1] }}
                      >
                        {/* Même arrondi que les cartouches (`Tag`, rx 3) : des pastilles en
                            capsule juraient avec le reste du dessin. */}
                        <rect width="128" height="28" rx="3" strokeWidth={1} className="fill-nera-white stroke-nera-navy" />
                        <circle cx="15" cy="14" r="3" className="fill-accent" />
                        <text x="26" y="18.5" fontSize={13} fontWeight={500} className="fill-nera-navy">
                          {s}
                        </text>
                      </motion.g>
                    </g>
                  );
                })}
              </g>
            </Layer>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}
