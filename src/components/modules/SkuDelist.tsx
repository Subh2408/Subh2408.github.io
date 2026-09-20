/**
 * SKU delisting. Belongs to work/sku-optimization.
 * Maths and generator copied verbatim from the prototype.
 */
import { useMemo, useState } from "react";
import { ModuleFrame, Slider, Stat, Pill, makeRandom, C, D } from "./ui";

type Sku = { id: number; acv: number; eff: number; rev: number; isNew: boolean; seg: string };

const SKUS: Sku[] = (() => {
  const r = makeRandom(21);
  const out: Sku[] = [];
  for (let i = 0; i < 150; i++) {
    const acv = 4 + Math.pow(r(), 0.7) * 92;
    const eff = 0.15 + Math.pow(r(), 1.9) * 2.6 + (acv / 100) * 0.35;
    out.push({
      id: i,
      acv,
      eff,
      rev: eff * acv * (0.6 + r() * 0.9),
      isNew: r() < 0.12,
      seg: ["Pads", "Tampons", "Liners"][Math.floor(r() * 3)],
    });
  }
  return out;
})();

const SEGMENTS = ["All", "Pads", "Tampons", "Liners"];

export default function SkuDelist() {
  const [cut, setCut] = useState(0.75);
  const [protectNew, setProtectNew] = useState(true);
  const [seg, setSeg] = useState("All");

  const pool = useMemo(() => (seg === "All" ? SKUS : SKUS.filter((s) => s.seg === seg)), [seg]);

  const m = useMemo(() => {
    let del = 0;
    let revLost = 0;
    let acvFreed = 0;
    let saved = 0;
    for (const s of pool) {
      if (s.eff < cut && !(protectNew && s.isNew)) {
        del++;
        revLost += s.rev;
        acvFreed += s.acv;
        saved += 78000 + s.acv * 900;
      }
    }
    return { del, pct: pool.length ? (del / pool.length) * 100 : 0, revLost, acvFreed, saved };
  }, [cut, protectNew, pool]);

  const W = 600;
  const H = 250;
  const P = 32;
  const px = (v: number) => P + (v / 100) * (W - P - 12);
  const py = (v: number) => H - P - (v / 3.2) * (H - P - 14);

  const readout =
    m.pct > 40
      ? "Aggressive. Cuts this deep hit items that anchor a shopper's repertoire, and buyers push back."
      : m.pct < 8
        ? "Barely moves the needle. The shelf clutter that started the project is still there."
        : "A defensible range. Enough to free real shelf space without gutting the repertoire.";

  return (
    <ModuleFrame
      title="SKU delisting"
      note="Each dot is a SKU. Horizontal is distribution reach in %ACV. Vertical is the custom Sales/ACV metric, which measures performance stripped of how widely the item is stocked. Drag the cut and the delist list rebuilds."
    >
      <div className="mgrid">
        <div>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="modfig"
            role="img"
            aria-label={`Scatter of ${pool.length} SKUs by distribution reach and sales efficiency. At a cut-off of ${cut.toFixed(2)}, ${m.del} come off the shelf.`}
          >
            <rect x={P} y={py(cut)} width={W - P - 12} height={H - P - py(cut)} fill={D.red} opacity="0.07" />
            <line x1={P} y1={py(cut)} x2={W - 12} y2={py(cut)} stroke={D.red} strokeWidth="2" strokeDasharray="5 4" />
            <text x={W - 14} y={py(cut) - 8} textAnchor="end" fontSize="12" fill={D.red} fontWeight="600">
              cut at {cut.toFixed(2)}
            </text>
            {pool.map((s) => {
              const prot = protectNew && s.isNew;
              const del = s.eff < cut && !prot;
              return (
                <circle
                  key={s.id}
                  cx={px(s.acv)}
                  cy={py(Math.min(s.eff, 3.15))}
                  r={3 + Math.sqrt(s.rev) / 5}
                  fill={del ? D.red : prot ? "none" : D.blue}
                  stroke={prot ? D.teal : "none"}
                  strokeWidth="1.6"
                  opacity={del ? 0.7 : 0.55}
                />
              );
            })}
            <line x1={P} y1={H - P} x2={W - 12} y2={H - P} stroke={C.g2} />
            <line x1={P} y1={12} x2={P} y2={H - P} stroke={C.g2} />
            <text x={P} y={H - 10} fontSize="12" fill={C.gt}>0% ACV</text>
            <text x={W - 12} y={H - 10} fontSize="12" fill={C.gt} textAnchor="end">100% ACV</text>
            <text x={2} y={20} fontSize="12" fill={C.gt}>Sales/ACV</text>
          </svg>
          <div className="legend">
            <span style={{ color: D.blue }}>&#9679; keep</span>
            <span style={{ color: D.red }}>&#9679; delist</span>
            <span style={{ color: D.teal }}>&#9675; protected launch</span>
            <span>dot size is revenue</span>
          </div>
        </div>

        <div>
          <div className="modseg">
            {SEGMENTS.map((s) => (
              <Pill key={s} on={seg === s} onClick={() => setSeg(s)}>
                {s}
              </Pill>
            ))}
          </div>
          <Slider
            label="Efficiency cut-off"
            value={cut}
            min={0.2}
            max={1.9}
            step={0.01}
            onChange={setCut}
            format={(v) => v.toFixed(2)}
            tone={D.red}
          />
          <label className="toggle">
            <input
              type="checkbox"
              checked={protectNew}
              onChange={(e) => setProtectNew(e.target.checked)}
              style={{ accentColor: D.teal }}
            />
            <span>Protect launches under 12 months</span>
          </label>
          <div className="statrow">
            <Stat value={m.del} sub={`SKUs delisted, ${m.pct.toFixed(0)}% of assortment`} tone={D.red} />
            <Stat value={`$${(m.saved / 1e6).toFixed(1)}M`} sub="projected annualised saving" tone={D.teal} />
          </div>
          <div className="statrow">
            <Stat value={Math.round(m.acvFreed).toLocaleString()} sub="points of ACV freed" />
            <Stat value={`$${(m.revLost / 1000).toFixed(0)}K`} sub="revenue at risk" />
          </div>
          <p className="readout">{readout}</p>
        </div>
      </div>
    </ModuleFrame>
  );
}
