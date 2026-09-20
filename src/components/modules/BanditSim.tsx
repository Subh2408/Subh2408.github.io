/**
 * K-armed bandit. Belongs to writing/exploration-vs-exploitation-k-bandit.
 *
 * The arms' true payout rates are seeded so every reader gets the same problem.
 * The pulls themselves use Math.random on purpose: the point of the module is
 * that the same policy gives a different answer each run.
 */
import { useState } from "react";
import { ModuleFrame, Slider, Stat, Pill, makeRandom, C, D } from "./ui";

const K = 5;

type State = { n: number[]; q: number[]; pulls: number; reward: number };
const empty = (): State => ({ n: Array(K).fill(0), q: Array(K).fill(0), pulls: 0, reward: 0 });

export default function BanditSim() {
  const [truth] = useState(() => {
    const r = makeRandom(5);
    return Array.from({ length: K }, () => 0.2 + r() * 0.6);
  });
  const [eps, setEps] = useState(0.1);
  const [st, setSt] = useState<State>(empty);

  const best = Math.max(...truth);

  const pull = (times: number) =>
    setSt((prev) => {
      const n = [...prev.n];
      const q = [...prev.q];
      let pulls = prev.pulls;
      let reward = prev.reward;
      for (let i = 0; i < times; i++) {
        let arm: number;
        if (Math.random() < eps) {
          arm = Math.floor(Math.random() * K);
        } else {
          let bi = 0;
          for (let k = 1; k < K; k++) if (q[k] > q[bi]) bi = k;
          arm = bi;
        }
        const rw = Math.random() < truth[arm] ? 1 : 0;
        n[arm]++;
        q[arm] += (rw - q[arm]) / n[arm];
        pulls++;
        reward += rw;
      }
      return { n, q, pulls, reward };
    });

  const regret = st.pulls ? (best * st.pulls - st.reward).toFixed(1) : "0.0";
  const maxN = Math.max(1, ...st.n);

  const readout =
    eps === 0
      ? "Pure exploitation. The agent locks onto whichever arm looked good first and never checks the others."
      : eps > 0.3
        ? "Mostly exploring. It finds the best arm quickly, then throws pulls away on arms it knows are worse."
        : "A sensible middle. Enough exploration to find the best arm, not so much that finding it stops paying off.";

  return (
    <ModuleFrame
      title="K-armed bandit"
      note="Five arms, each with a hidden payout rate. Epsilon is how often the agent ignores its current best guess and tries something else. Pull a thousand times at epsilon 0, then reset and try 0.15."
    >
      <div className="mgrid">
        <div>
          {truth.map((tv, k) => (
            <div key={k} className="barrow">
              <div className="bar-head">
                <span>
                  arm {k + 1}
                  {tv === best && <span style={{ color: D.teal }}> best</span>}
                </span>
                <span style={{ display: "flex", gap: 16 }}>
                  <span className="num">est {st.n[k] ? st.q[k].toFixed(2) : "--"}</span>
                  <span className="num">{st.n[k]} pulls</span>
                </span>
              </div>
              <div className="bar-track" style={{ height: 14 }}>
                <span
                  className="bar-fill"
                  style={{
                    height: 14,
                    left: 0,
                    width: `${(st.n[k] / maxN) * 100}%`,
                    background: tv === best ? D.teal : D.blue,
                    opacity: 0.85,
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: `${tv * 100}%`,
                    top: -3,
                    width: 2,
                    height: 20,
                    background: C.ink,
                  }}
                />
              </div>
            </div>
          ))}
          <div className="legend">
            <span>bar is pull share</span>
            <span>vertical mark is the true payout rate</span>
          </div>
        </div>

        <div>
          <Slider
            label="Epsilon, exploration rate"
            value={eps}
            min={0}
            max={0.5}
            step={0.01}
            onChange={setEps}
            format={(v) => v.toFixed(2)}
          />
          <div className="modbtns">
            <Pill onClick={() => pull(1)}>Pull once</Pill>
            <Pill onClick={() => pull(100)}>Pull 100</Pill>
            <Pill onClick={() => pull(1000)}>Pull 1000</Pill>
            <Pill onClick={() => setSt(empty())}>Reset</Pill>
          </div>
          <div className="statrow">
            <Stat value={st.pulls.toLocaleString()} sub="total pulls" />
            <Stat value={st.reward} sub="cumulative reward" tone={D.blue} />
          </div>
          <div className="statrow">
            <Stat value={regret} sub="regret against always picking the best arm" tone={D.red} />
          </div>
          <p className="readout">{readout}</p>
        </div>
      </div>
    </ModuleFrame>
  );
}
