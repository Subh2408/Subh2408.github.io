/**
 * Association rules. Belongs to work/market-basket-analysis.
 * Rule generation copied verbatim from the prototype.
 */
import { useState } from "react";
import { ModuleFrame, Slider, Stat, makeRandom, C, D } from "./ui";

type Rule = { a: string; b: string; sup: number; conf: number; lift: number };

const RULES: Rule[] = (() => {
  const r = makeRandom(99);
  const A = ["Pads regular", "Pads overnight", "Liners daily", "Tampons regular", "Tampons super", "Wipes", "Wash", "Heat patch"];
  const out: Rule[] = [];
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A.length; j++) {
      if (i === j) continue;
      out.push({
        a: A[i],
        b: A[j],
        sup: 0.004 + Math.pow(r(), 2.1) * 0.13,
        conf: 0.08 + Math.pow(r(), 1.4) * 0.72,
        lift: 0.6 + Math.pow(r(), 1.5) * 3.4,
      });
    }
  }
  return out;
})();

export default function BasketMiner() {
  const [sup, setSup] = useState(0.02);
  const [conf, setConf] = useState(0.35);
  const [lift, setLift] = useState(1.2);

  const kept = RULES.filter((x) => x.sup >= sup && x.conf >= conf && x.lift >= lift).sort(
    (a, b) => b.lift - a.lift
  );

  const readout =
    kept.length > 24
      ? "Too permissive. You are handing the category team noise and asking them to sort it."
      : kept.length === 0
        ? "Nothing survives. Loosen one threshold. Support is usually the one set too high."
        : "A workable shortlist. Few enough to act on, strong enough that lift is not coming from one popular item.";

  return (
    <ModuleFrame
      title="Association rules"
      note="Association rule mining produces thousands of pairs, almost all of them noise. The work is choosing where support, confidence and lift have to sit before a rule earns a shelf change."
    >
      <div className="mgrid">
        <div className="ruletable">
          <div className="rt-head">
            <span>if basket contains</span>
            <span>then also</span>
            <span>lift</span>
          </div>
          {kept.slice(0, 9).map((x, i) => (
            <div key={i} className="rt-row">
              <span>{x.a}</span>
              <span>{x.b}</span>
              <span className="num" style={{ color: x.lift > 2 ? D.teal : C.gt }}>
                {x.lift.toFixed(2)}
              </span>
            </div>
          ))}
          {!kept.length && <div className="rt-row empty">No rules survive these thresholds.</div>}
          {kept.length > 9 && <div className="rt-row empty">and {kept.length - 9} more</div>}
        </div>

        <div>
          <Slider label="Minimum support" value={sup} min={0.002} max={0.1} step={0.002} onChange={setSup} format={(v) => `${(v * 100).toFixed(1)}%`} tone={D.blue} />
          <Slider label="Minimum confidence" value={conf} min={0.05} max={0.85} step={0.01} onChange={setConf} format={(v) => `${(v * 100).toFixed(0)}%`} tone={D.amber} />
          <Slider label="Minimum lift" value={lift} min={0.8} max={3.5} step={0.05} onChange={setLift} format={(v) => v.toFixed(2)} tone={D.teal} />
          <div className="statrow">
            <Stat value={kept.length} sub={`rules survive, from ${RULES.length} candidates`} tone={D.blue} />
          </div>
          <p className="readout">{readout}</p>
        </div>
      </div>
    </ModuleFrame>
  );
}
