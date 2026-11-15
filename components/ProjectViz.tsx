"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/data";

function SafetyFlow() {
  const nodes = [
    { x: 60, label: "Device" },
    { x: 200, label: "Express + WebSocket" },
    { x: 340, label: "Contacts" },
  ];
  return (
    <svg viewBox="0 0 400 150" className="w-full" role="img" aria-label="SOS alert flow from a device through the server to emergency contacts">
      <line x1="60" y1="60" x2="340" y2="60" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="4 6" />
      <motion.circle
        r="5"
        cy="60"
        fill="#22d3ee"
        initial={{ cx: 60 }}
        animate={{ cx: [60, 340] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      {nodes.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy="60" r="22" fill="#6366f1" fillOpacity="0.2" stroke="#818cf8" />
          <text x={n.x} y="100" textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity="0.8">
            {n.label}
          </text>
        </g>
      ))}
      <line x1="200" y1="82" x2="200" y2="118" stroke="currentColor" strokeOpacity="0.25" />
      <rect x="170" y="118" width="60" height="22" rx="6" fill="#22d3ee" fillOpacity="0.15" stroke="#22d3ee" />
      <text x="200" y="133" textAnchor="middle" fontSize="10" fill="currentColor">
        MySQL
      </text>
    </svg>
  );
}

function TrainingCurve() {
  const pts = (base: number, amp: number, phase: number) => {
    const out: string[] = [];
    for (let x = 0; x <= 300; x += 6) {
      const y = base + amp * Math.exp(-x / 90) + Math.sin(x / 11 + phase) * 3 * Math.exp(-x / 160);
      out.push(`${x === 0 ? "M" : "L"}${(30 + x).toFixed(1)},${(20 + (130 - y)).toFixed(1)}`);
    }
    return out.join(" ");
  };
  return (
    <div>
      <svg viewBox="0 0 360 160" className="w-full" role="img" aria-label="Illustrative training curves for latency and energy decreasing over episodes">
        <line x1="30" y1="150" x2="340" y2="150" stroke="currentColor" strokeOpacity="0.3" />
        <line x1="30" y1="20" x2="30" y2="150" stroke="currentColor" strokeOpacity="0.3" />
        <motion.path
          d={pts(40, 70, 0)}
          fill="none"
          stroke="#818cf8"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.path
          d={pts(25, 55, 2)}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
        />
        <text x="335" y="164" textAnchor="end" fontSize="9" fill="currentColor" fillOpacity="0.6">
          episodes
        </text>
        <text x="36" y="32" fontSize="9" fill="#818cf8">
          latency
        </text>
        <text x="36" y="44" fontSize="9" fill="#22d3ee">
          energy
        </text>
      </svg>
      <p className="mt-1 text-center text-[11px] text-muted">Illustrative trend, not measured results</p>
    </div>
  );
}

export default function ProjectViz({ id }: { id: Project["id"] }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-black/10 p-4">
      {id === "safety" ? <SafetyFlow /> : <TrainingCurve />}
    </div>
  );
}
