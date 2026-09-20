/**
 * Auto-clear threshold. Belongs to work/claims-adjudication.
 *
 * Maths and the synthetic data generator are copied verbatim from the
 * prototype. Only the colours, the labels and the readout wording changed.
 */
import { useMemo, useState } from "react";
import { ModuleFrame, Slider, Stat, makeRandom, C, D } from "./ui";

const CLAIMS = (() => {
  const r = makeRandom(7);
  const rows: { s: number; clean: boolean }[] = [];
  for (let i = 0; i < 4000; i++) {
    const clean = r() < 0.72;
    const s = clean ? 1 - Math.pow(r(), 2.6) * 0.72 : 0.12 + Math.pow(r(), 0.85) * 0.72;
    rows.push({ s: Math.max(0.02, Math.min(0.995, s)), clean });
  }
  return rows;
})();

export default function ClaimsThreshold({ compact = false }: { compact?: boolean } = {}) {
  const [t, setT] = useState(0.82);

  const m = useMemo(() => {
    let auto = 0;
    let autoBad = 0;
    let queue = 0;
    for (const c of CLAIMS) {
      if (c.s >= t) {
        auto++;
        if (!c.clean) autoBad++;
      } else {
        queue++;
      }
    }
    const n = CLAIMS.length;
    return {
      queue,
      autoPct: (auto / n) * 100,
      errPct: auto ? (autoBad / auto) * 100 : 0,
      avgMin: (auto * 4 + queue * 18 * 60) / n,
    };
  }, [t]);

  const bins = useMemo(() => {
    const B = 44;
    const o = Array.from({ length: B }, () => ({ clean: 0, review: 0 }));
    for (const c of CLAIMS) {
      const i = Math.min(B - 1, Math.floor(c.s * B));
      if (c.clean) o[i].clean++;
      else o[i].review++;
    }
    return o;
  }, []);

  const maxBin = Math.max(...bins.map((b) => b.clean + b.review));
  const W = compact ? 470 : 620;
  const H = compact ? 150 : 180;
  const bw = W / bins.length;
  const fmt = (min: number) => (min >= 60 ? `${(min / 60).toFixed(1)} hrs` : `${Math.round(min)} min`);

  const readout =
    m.errPct > 6
      ? "Too loose. Error volume outweighs the time saved, and adjudicators stop trusting the queue."
      : m.autoPct < 35
        ? "Too tight. Safe, but you have barely automated anything."
        : "Close to what we shipped. Most volume cleared, error low enough to keep the adjudicators' trust.";

  return (
    <ModuleFrame
      level={compact ? 3 : 2}
      compact={compact}
      title="Auto-clear threshold"
      note="Every claim gets a confidence score. Above the line, it clears automatically. Below it, a person reviews it. Moving the line trades speed against error."
    >
      <div className="mgrid">
        <div>
          <svg
            viewBox={`0 0 ${W} ${compact ? H : H + 24}`}
            className="modfig"
            role="img"
            aria-label={`Distribution of claims by model confidence. At a threshold of ${t.toFixed(2)}, ${m.autoPct.toFixed(0)} percent clear automatically and ${m.errPct.toFixed(1)} percent of those are cleared in error.`}
          >
            {bins.map((b, i) => {
              const hC = ((b.clean + b.review) / maxBin) * H;
              const hR = (b.review / maxBin) * H;
              const above = (i + 0.5) / bins.length >= t;
              return (
                <g key={i}>
                  <rect x={i * bw} y={H - hC} width={bw - 1.2} height={hC} fill={above ? D.blue : D.grey} opacity={above ? 0.32 : 0.55} />
                  <rect x={i * bw} y={H - hR} width={bw - 1.2} height={hR} fill={above ? D.red : D.grey} opacity={above ? 0.95 : 0.8} />
                </g>
              );
            })}
            <line x1={t * W} y1={0} x2={t * W} y2={H} stroke={C.ink} strokeWidth="2" />
            {!compact && (
              <text x={t * W - 6} y={13} textAnchor="end" fontSize="12" fill={C.ink} fontWeight="600">
                {t.toFixed(2)}
              </text>
            )}
            {!compact &&
              [0, 0.5, 1].map((p) => (
                <text
                  key={p}
                  x={p * W}
                  y={H + 17}
                  fontSize="12"
                  fill={C.gt}
                  textAnchor={p === 0 ? "start" : p === 1 ? "end" : "middle"}
                >
                  {p.toFixed(2)}
                </text>
              ))}
          </svg>
          {compact && (
            <div className="modaxis" aria-hidden="true">
              <span>0.00</span>
              <span>0.50</span>
              <span>1.00</span>
            </div>
          )}
          <div className="legend">
            <span style={{ color: D.blue }}>&#9632; genuinely clean</span>
            <span style={{ color: D.red }}>&#9632; needs review, cleared in error</span>
            <span>model confidence &rarr;</span>
          </div>
        </div>

        <div>
          <Slider
            label={compact ? "Threshold" : "Auto-clear threshold"}
            value={t}
            min={0.3}
            max={0.99}
            step={0.01}
            onChange={setT}
            format={(v) => v.toFixed(2)}
          />
          <div className="statrow">
            <Stat value={`${m.autoPct.toFixed(0)}%`} sub="of claims clear without a human" tone={D.blue} />
            <Stat
              value={`${m.errPct.toFixed(1)}%`}
              sub="of those were cleared in error"
              tone={m.errPct > 4 ? D.red : C.ink}
            />
          </div>
          <div className="statrow">
            <Stat value={m.queue.toLocaleString()} sub="claims still in the queue" />
            <Stat value={fmt(m.avgMin)} sub="average time to settle, blended" tone={D.teal} />
          </div>
          <p className="readout">{readout}</p>
        </div>
      </div>
    </ModuleFrame>
  );
}
