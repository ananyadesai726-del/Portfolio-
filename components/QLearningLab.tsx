"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Section from "./Section";

const W = 8;
const H = 6;
const CELL = 56;
const START = { x: 0, y: H - 1 };
const GOAL = { x: W - 1, y: 0 };
const WALLS = new Set(["3,1", "3,2", "3,3", "5,3", "5,4", "5,5", "1,3"]);
const PITS = new Set(["2,0", "6,2", "4,4"]);
const ACTIONS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const key = (x: number, y: number) => `${x},${y}`;

type Sim = {
  q: Float32Array;
  agent: { x: number; y: number };
  episodes: number;
  steps: number;
  lastReturn: number;
  ret: number;
};

function newSim(): Sim {
  return {
    q: new Float32Array(W * H * 4),
    agent: { ...START },
    episodes: 0,
    steps: 0,
    lastReturn: 0,
    ret: 0,
  };
}

function stepSim(s: Sim, eps: number, alpha = 0.3, gamma = 0.95) {
  const { x, y } = s.agent;
  const base = (y * W + x) * 4;
  let a: number;
  if (Math.random() < eps) a = Math.floor(Math.random() * 4);
  else {
    a = 0;
    for (let i = 1; i < 4; i++) if (s.q[base + i] > s.q[base + a]) a = i;
  }
  let nx = x + ACTIONS[a][0];
  let ny = y + ACTIONS[a][1];
  if (nx < 0 || ny < 0 || nx >= W || ny >= H || WALLS.has(key(nx, ny))) {
    nx = x;
    ny = y;
  }
  let r = -0.05;
  let done = false;
  if (nx === GOAL.x && ny === GOAL.y) {
    r = 1;
    done = true;
  } else if (PITS.has(key(nx, ny))) {
    r = -1;
    done = true;
  }
  const nbase = (ny * W + nx) * 4;
  const best = done ? 0 : Math.max(s.q[nbase], s.q[nbase + 1], s.q[nbase + 2], s.q[nbase + 3]);
  s.q[base + a] += alpha * (r + gamma * best - s.q[base + a]);
  s.agent = { x: nx, y: ny };
  s.steps++;
  s.ret += r;
  if (done || s.steps % 200 === 0) {
    if (done) {
      s.episodes++;
      s.lastReturn = s.ret;
    }
    s.ret = 0;
    s.agent = { ...START };
  }
}

function draw(ctx: CanvasRenderingContext2D, s: Sim, dark: boolean) {
  ctx.clearRect(0, 0, W * CELL, H * CELL);
  let maxQ = 0.01;
  for (let i = 0; i < s.q.length; i++) maxQ = Math.max(maxQ, Math.abs(s.q[i]));
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const k = key(x, y);
      const px = x * CELL;
      const py = y * CELL;
      const base = (y * W + x) * 4;
      let best = 0;
      for (let i = 1; i < 4; i++) if (s.q[base + i] > s.q[base + best]) best = i;
      const v = Math.max(...Array.from(s.q.slice(base, base + 4)));
      if (WALLS.has(k)) ctx.fillStyle = dark ? "#1e293b" : "#cbd5e1";
      else if (PITS.has(k)) ctx.fillStyle = "rgba(244,63,94,0.35)";
      else if (x === GOAL.x && y === GOAL.y) ctx.fillStyle = "rgba(34,197,94,0.45)";
      else {
        const t = Math.max(0, Math.min(1, v / maxQ));
        ctx.fillStyle = `rgba(99,102,241,${0.04 + 0.5 * t})`;
      }
      ctx.fillRect(px + 1, py + 1, CELL - 2, CELL - 2);

      if (!WALLS.has(k) && !PITS.has(k) && !(x === GOAL.x && y === GOAL.y) && v > 0.001) {
        const cx = px + CELL / 2;
        const cy = py + CELL / 2;
        const [dx, dy] = ACTIONS[best];
        ctx.strokeStyle = dark ? "#e5e7eb" : "#0f172a";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - dx * 10, cy - dy * 10);
        ctx.lineTo(cx + dx * 10, cy + dy * 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx + dx * 12, cy + dy * 12, 3, 0, Math.PI * 2);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
      }
      ctx.font = "12px ui-monospace, monospace";
      ctx.fillStyle = dark ? "#e5e7eb" : "#0f172a";
      if (x === GOAL.x && y === GOAL.y) ctx.fillText("GOAL", px + 12, py + 33);
      if (PITS.has(k)) ctx.fillText("PIT", px + 16, py + 33);
    }
  }
  ctx.beginPath();
  ctx.arc(s.agent.x * CELL + CELL / 2, s.agent.y * CELL + CELL / 2, 11, 0, Math.PI * 2);
  ctx.fillStyle = "#22d3ee";
  ctx.shadowColor = "#22d3ee";
  ctx.shadowBlur = 14;
  ctx.fill();
  ctx.shadowBlur = 0;
}

export default function QLearningLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sim = useRef<Sim>(newSim());
  const [running, setRunning] = useState(false);
  const [eps, setEps] = useState(0.2);
  const [speed, setSpeed] = useState(5);
  const [stats, setStats] = useState({ episodes: 0, steps: 0, ret: 0 });
  const epsRef = useRef(eps);
  epsRef.current = eps;

  const render = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    draw(ctx, sim.current, document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const c = canvasRef.current!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = W * CELL * dpr;
    c.height = H * CELL * dpr;
    c.getContext("2d")!.setTransform(dpr, 0, 0, dpr, 0, 0);
    render();
  }, [render]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      for (let i = 0; i < speed * 4; i++) stepSim(sim.current, epsRef.current);
      render();
      const s = sim.current;
      setStats({ episodes: s.episodes, steps: s.steps, ret: s.lastReturn });
    }, 40);
    return () => clearInterval(id);
  }, [running, speed, render]);

  const reset = () => {
    sim.current = newSim();
    setStats({ episodes: 0, steps: 0, ret: 0 });
    render();
  };

  return (
    <Section id="lab" eyebrow="04 / lab" title="Interactive: watch an agent learn">
      <p className="muted max-w-2xl text-sm leading-relaxed">
        A small grid world solved with tabular Q-learning, the same reward-driven idea that Deep Q-Networks
        scale up with neural networks. Press train and watch the arrows converge on a safe route to the goal.
        This is a teaching illustration, separate from my research work.
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[auto,1fr]">
        <div className="card overflow-x-auto p-3">
          <canvas
            ref={canvasRef}
            style={{ width: W * CELL, height: H * CELL }}
            role="img"
            aria-label="Grid world showing the agent's learned policy as arrows"
          />
        </div>
        <div className="card flex flex-col gap-5 p-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setRunning((r) => !r)}
              className="rounded-xl bg-accent px-5 py-2 text-sm font-medium text-white transition hover:bg-accent-soft"
            >
              {running ? "Pause" : "Train"}
            </button>
            <button onClick={reset} className="card px-5 py-2 text-sm transition hover:border-accent">
              Reset
            </button>
          </div>
          <label className="text-sm">
            <span className="muted">Exploration (epsilon): </span>
            <span className="font-mono">{eps.toFixed(2)}</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={eps}
              onChange={(e) => setEps(parseFloat(e.target.value))}
              className="mt-2 w-full accent-indigo-500"
            />
          </label>
          <label className="text-sm">
            <span className="muted">Speed: </span>
            <span className="font-mono">{speed}x</span>
            <input
              type="range"
              min={1}
              max={20}
              step={1}
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="mt-2 w-full accent-indigo-500"
            />
          </label>
          <dl className="grid grid-cols-3 gap-3 text-center">
            {[
              ["Episodes", stats.episodes],
              ["Steps", stats.steps],
              ["Last return", stats.ret.toFixed(2)],
            ].map(([k, v]) => (
              <div key={k as string} className="rounded-lg border border-[var(--border)] p-3">
                <dd className="gradient-text font-mono text-lg font-bold">{v}</dd>
                <dt className="muted text-[11px] uppercase">{k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
