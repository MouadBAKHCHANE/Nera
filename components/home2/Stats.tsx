"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

/** Section 4 : « NERA en chiffres ». Chiffres fournis par le client. */
const stats = [
  { value: 300, prefix: "+", label: "CECB et CECB Plus réalisés" },
  { value: 50, prefix: "+", label: "dossiers de subventions déposés" },
  { value: 50, label: "projets réalisés en 2026" },
  { value: 15, suffix: " ans", label: "d'expérience métier" },
  { value: 7, label: "collaborateurs" },
];

function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      setN(value);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1200;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(value * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="bg-nera-navy-deep py-20 text-nera-cream lg:py-28">
      <div className="px-6 md:px-10 lg:px-[120px]">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-nera-cream/15 pb-8">
          <h2 className="font-display text-[1.75rem] font-light leading-[1.15] text-nera-cream md:text-[2.5rem]">
            NERA <span className="font-medium text-accent">en chiffres</span>
          </h2>
        </Reveal>
        <ul className="grid grid-cols-2 gap-y-12 pt-12 md:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-nera-cream/15">
          {stats.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 0.08} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
              <span className="block h-6 w-px bg-accent" aria-hidden />
              <p className="mt-5 font-display text-[2.75rem] font-light leading-none text-nera-cream md:text-[3.5rem]">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-3 max-w-[14rem] text-body-sm font-light leading-[1.5] text-nera-cream/75">{s.label}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
