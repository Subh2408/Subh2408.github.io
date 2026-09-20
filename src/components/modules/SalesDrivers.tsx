/**
 * Sales drivers. Belongs to work/sales-driver-analysis.
 * Elasticities and the log-log response are copied verbatim from the prototype.
 */
import { useMemo, useState } from "react";
import { ModuleFrame, Slider, Pill, D } from "./ui";

const ELAST: Record<string, { media: number; price: number; dist: number; promo: number }> = {
  Pads: { media: 0.11, price: -1.75, dist: 0.82, promo: 0.29 },
  Tampons: { media: 0.16, price: -2.15, dist: 0.68, promo: 0.41 },
  Liners: { media: 0.07, price: -1.32, dist: 0.91, promo: 0.22 },
};
const BASE = { media: 100, price: 100, dist: 85, promo: 10 };

export default function SalesDrivers() {
  const [seg, setSeg] = useState("Pads");
  const [v, setV] = useState({ ...BASE });
  const e = ELAST[seg];

  const c = useMemo(() => {
    const o = {
      media: e.media * Math.log(v.media / BASE.media),
      price: e.price * Math.log(v.price / BASE.price),
      dist: e.dist * Math.log(v.dist / BASE.dist),
      promo: e.promo * Math.log((1 + v.promo / 100) / (1 + BASE.promo / 100)),
    };
    return { ...o, index: 100 * Math.exp(o.media + o.price + o.dist + o.promo) };
  }, [v, e]);

  const rows: [string, number, string][] = [
    ["Media spend", c.media, D.blue],
    ["Price", c.price, D.red],
    ["Distribution", c.dist, D.teal],
    ["Promotion", c.promo, D.amber],
  ];
  const maxAbs = Math.max(0.05, ...rows.map((r) => Math.abs(r[1])));

  return (
    <ModuleFrame
      title="Sales drivers"
      note="A log-log model fitted per segment per retailer. Pull the levers and the volume index responds. Switch segment and the elasticities change entirely. That is why one model for the whole portfolio would have been wrong."
    >
      <div className="mgrid">
        <div>
          <div className="modseg">
            {Object.keys(ELAST).map((s) => (
              <Pill key={s} on={seg === s} onClick={() => setSeg(s)}>
                {s}
              </Pill>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20 }}>
            <span
              className="mono"
              style={{
                fontWeight: 700,
                fontSize: "clamp(32px,3.6vw,46px)",
                lineHeight: 1,
                color: c.index >= 100 ? D.teal : D.red,
              }}
            >
              {c.index.toFixed(1)}
            </span>
            <span className="meta" style={{ maxWidth: "16ch" }}>
              volume index, base = 100
            </span>
          </div>

          {rows.map(([name, val, tone]) => {
            const w = (Math.abs(val) / maxAbs) * 46;
            return (
              <div key={name} className="barrow">
                <div className="bar-head">
                  <span>{name}</span>
                  <span className="num" style={{ color: val >= 0 ? D.teal : D.red }}>
                    {val >= 0 ? "+" : ""}
                    {(val * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="bar-track">
                  <span className="bar-zero" />
                  <span
                    className="bar-fill"
                    style={{
                      background: tone,
                      left: val >= 0 ? "50%" : `${50 - w}%`,
                      width: `${w}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <Slider label="Media spend index" value={v.media} min={50} max={160} step={1} onChange={(x) => setV({ ...v, media: x })} tone={D.blue} />
          <Slider label="Price index" value={v.price} min={88} max={115} step={0.5} onChange={(x) => setV({ ...v, price: x })} tone={D.red} format={(x) => x.toFixed(1)} />
          <Slider label="Distribution, %ACV" value={v.dist} min={55} max={99} step={1} onChange={(x) => setV({ ...v, dist: x })} tone={D.teal} format={(x) => `${x}%`} />
          <Slider label="Promotion depth" value={v.promo} min={0} max={35} step={1} onChange={(x) => setV({ ...v, promo: x })} tone={D.amber} format={(x) => `${x}%`} />
          <div className="modbtns">
            <Pill onClick={() => setV({ ...BASE })}>Reset to base</Pill>
          </div>
          <p className="readout">
            Price elasticity for {seg} is {e.price}. A one percent price rise costs{" "}
            {Math.abs(e.price).toFixed(2)}% of volume. That is why &ldquo;should we promote
            harder?&rdquo; has a different answer per segment.
          </p>
        </div>
      </div>
    </ModuleFrame>
  );
}
