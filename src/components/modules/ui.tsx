/**
 * Shared chrome for the interactive modules.
 *
 * These are the only components on the site allowed to use the data ramp.
 * The hex values mirror tokens.css because SVG fills cannot read a CSS custom
 * property through the `fill` attribute reliably across browsers. If a token
 * changes, change it in both places.
 */
import type { ReactNode } from "react";

export const D = {
  blue: "#0060D0",
  amber: "#A66A00",
  teal: "#00796B",
  red: "#C93F1B",
  grey: "#C4C1BC",
} as const;

export const C = {
  ink: "#0A0A0A",
  gt: "#56534E",
  g1: "#F5F4F2",
  g2: "#E6E4E0",
  white: "#FFFFFF",
} as const;

/** Deterministic PRNG so the synthetic data is identical on every render. */
export function makeRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function ModuleFrame({
  title,
  note,
  children,
  level = 2,
  compact = false,
}: {
  title: string;
  note: string;
  children: ReactNode;
  /**
   * Heading level for the module title. A module embedded on the home page
   * sits inside the hero, so it renders h3 and leaves the page's section
   * headings as the only h2s. Sub-pages keep h2.
   */
  level?: 2 | 3;
  /** Narrow column variant. Single-column body, smaller stats. */
  compact?: boolean;
}) {
  const Title = level === 3 ? "h3" : "h2";
  return (
    <section className={compact ? "modbox is-compact" : "modbox"}>
      <div className="modhead">
        <Title className="modtitle">{title}</Title>
        <span className="tagchip">synthetic data</span>
      </div>
      <p className="modnote">{note}</p>
      <div className="modbody">{children}</div>
    </section>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  tone,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  tone?: string;
}) {
  const colour = tone ?? D.blue;
  return (
    <div className="slider">
      <div className="sl-head">
        <label className="sl-label" htmlFor={`sl-${label}`}>
          {label}
        </label>
        <span className="sl-value" style={{ color: colour }}>
          {format ? format(value) : value}
        </span>
      </div>
      <input
        id={`sl-${label}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ accentColor: colour, color: colour }}
      />
    </div>
  );
}

export function Stat({
  value,
  sub,
  tone,
  big,
}: {
  value: string | number;
  sub: string;
  tone?: string;
  big?: boolean;
}) {
  return (
    <div className={big ? "stat big" : "stat"}>
      <span className="stat-v" style={{ color: tone ?? C.ink }}>
        {value}
      </span>
      <span className="stat-s">{sub}</span>
    </div>
  );
}

export function Pill({
  on,
  onClick,
  children,
}: {
  on?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" className={on ? "pill sm on" : "pill sm"} onClick={onClick} aria-pressed={on}>
      {children}
    </button>
  );
}
