/**
 * Event routing. Belongs to work/qic-risk-operations-tool.
 * Event generation copied verbatim from the prototype.
 */
import { useState } from "react";
import { ModuleFrame, Slider, Stat, makeRandom, C, D } from "./ui";

type Event = { id: number; sev: number; exp: number; kind: string; teams: number };

const EVENTS: Event[] = (() => {
  const r = makeRandom(41);
  const kinds = ["Conflict", "Catastrophe", "Disruption", "Cyber", "Political"];
  const out: Event[] = [];
  for (let i = 0; i < 120; i++) {
    out.push({
      id: i,
      sev: 0.05 + Math.pow(r(), 1.5) * 0.94,
      exp: 0.5 + Math.pow(r(), 2.2) * 42,
      kind: kinds[Math.floor(r() * kinds.length)],
      teams: 1 + Math.floor(r() * 5),
    });
  }
  return out;
})();

export default function RiskOps() {
  const [sev, setSev] = useState(0.55);
  const [exp, setExp] = useState(6);

  const flagged = EVENTS.filter((e) => e.sev >= sev && e.exp >= exp);
  const missed = EVENTS.filter((e) => e.sev >= 0.8 && !(e.sev >= sev && e.exp >= exp));
  const exposure = flagged.reduce((a, e) => a + e.exp, 0);

  const W = 600;
  const H = 250;
  const P = 34;
  const px = (v: number) => P + v * (W - P - 14);
  const py = (v: number) => H - P - (Math.min(v, 44) / 44) * (H - P - 14);

  const readout =
    flagged.length > 45
      ? "Too noisy. Five departments will start ignoring the feed inside a fortnight, and then the tool is worse than nothing."
      : missed.length > 6
        ? "Too tight. Severe events are falling through because the exposure floor is set above them."
        : "A workable window. Enough signal to act on, few enough that people still open it.";

  return (
    <ModuleFrame
      title="Event routing"
      note="Every event carries a severity and an amount of live policy exposure. Alert on everything and five teams stop reading. Alert on too little and the tool is decorative the one time it matters. The thresholds are the product."
    >
      <div className="mgrid">
        <div>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="modfig"
            role="img"
            aria-label={`Events plotted by severity and exposure. ${flagged.length} of ${EVENTS.length} are routed for action and ${missed.length} high-severity events fall below the thresholds.`}
          >
            <rect x={px(sev)} y={12} width={W - 14 - px(sev)} height={py(exp) - 12} fill={D.blue} opacity="0.07" />
            <line x1={px(sev)} y1={12} x2={px(sev)} y2={H - P} stroke={D.blue} strokeWidth="2" strokeDasharray="5 4" />
            <line x1={P} y1={py(exp)} x2={W - 14} y2={py(exp)} stroke={D.blue} strokeWidth="2" strokeDasharray="5 4" />
            {EVENTS.map((e) => {
              const on = e.sev >= sev && e.exp >= exp;
              const bad = e.sev >= 0.8 && !on;
              return (
                <circle
                  key={e.id}
                  cx={px(e.sev)}
                  cy={py(e.exp)}
                  r={4}
                  fill={on ? D.blue : bad ? D.red : D.grey}
                  opacity={on ? 0.75 : bad ? 0.9 : 0.5}
                />
              );
            })}
            <line x1={P} y1={H - P} x2={W - 14} y2={H - P} stroke={C.g2} />
            <line x1={P} y1={12} x2={P} y2={H - P} stroke={C.g2} />
            <text x={P} y={H - 10} fontSize="12" fill={C.gt}>low severity</text>
            <text x={W - 14} y={H - 10} fontSize="12" fill={C.gt} textAnchor="end">high severity</text>
            <text x={2} y={20} fontSize="12" fill={C.gt}>exposure $m</text>
          </svg>
          <div className="legend">
            <span style={{ color: D.blue }}>&#9679; routed to a team</span>
            <span style={{ color: D.red }}>&#9679; severe but filtered out</span>
            <span>&#9679; below both thresholds</span>
          </div>
        </div>

        <div>
          <Slider label="Severity threshold" value={sev} min={0.05} max={0.95} step={0.01} onChange={setSev} format={(v) => v.toFixed(2)} tone={D.blue} />
          <Slider label="Minimum exposure" value={exp} min={0.5} max={40} step={0.5} onChange={setExp} format={(v) => `$${v.toFixed(1)}m`} tone={D.teal} />
          <div className="statrow">
            <Stat value={flagged.length} sub="events routed for action" tone={D.blue} />
            <Stat value={`$${exposure.toFixed(0)}m`} sub="live exposure covered" tone={D.teal} />
          </div>
          <div className="statrow">
            <Stat value={missed.length} sub="high-severity events nobody sees" tone={missed.length ? D.red : C.ink} />
          </div>
          <p className="readout">{readout}</p>
        </div>
      </div>
    </ModuleFrame>
  );
}
