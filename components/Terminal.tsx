"use client";

import { useEffect, useRef, useState } from "react";
import { education, profile, projects, skillGroups, certifications } from "@/lib/data";

type Line = { kind: "in" | "out"; text: string };

const COMMANDS: Record<string, () => string[]> = {
  help: () => ["Available commands:", "  about  skills  projects  education  certs  contact  clear"],
  about: () => [profile.name, profile.title, profile.summary],
  skills: () => skillGroups.map((g) => `${g.label.padEnd(22)} ${g.items.join(", ")}`),
  projects: () => projects.map((p, i) => `${i + 1}. ${p.title} (${p.kind})`),
  education: () => education.map((e) => `${e.years.padEnd(22)} ${e.degree}, ${e.school} [${e.score}]`),
  certs: () => certifications.map((c) => `- ${c.title} (${c.issuer})`),
  contact: () => [`email    ${profile.email}`, `phone    ${profile.phone}`, `linkedin ${profile.linkedin}`],
};

const QUICK = ["about", "skills", "projects", "contact"];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "Welcome. Type 'help' to see what I can show you." },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    setHIndex(-1);
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const fn = COMMANDS[cmd];
    const out = fn ? fn() : [`command not found: ${cmd}. Try 'help'.`];
    setLines((l) => [...l, { kind: "in", text: cmd }, ...out.map((text): Line => ({ kind: "out", text }))]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hIndex + 1, history.length - 1);
      if (history[next] !== undefined) {
        setHIndex(next);
        setValue(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = hIndex - 1;
      if (next < 0) {
        setHIndex(-1);
        setValue("");
      } else {
        setHIndex(next);
        setValue(history[next]);
      }
    }
  };

  return (
    <div className="glass overflow-hidden rounded-2xl font-mono text-[13px] shadow-2xl shadow-accent/10">
      <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span className="h-3 w-3 rounded-full bg-green-400/80" />
        <span className="ml-2 text-xs text-muted">ananya@portfolio: ~</span>
      </div>
      <div ref={box} className="h-64 overflow-y-auto px-4 py-3 leading-relaxed">
        {lines.map((l, i) =>
          l.kind === "in" ? (
            <p key={i} className="text-accent-alt">
              <span className="text-accent-soft">$ </span>
              {l.text}
            </p>
          ) : (
            <p key={i} className="whitespace-pre-wrap break-words text-muted">
              {l.text}
            </p>
          )
        )}
        <label className="mt-1 flex items-center gap-2">
          <span className="text-accent-soft">$</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal command"
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent outline-none"
          />
        </label>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-[var(--border)] px-4 py-3">
        {QUICK.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => run(q)}
            className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-muted transition hover:border-accent hover:text-accent-soft"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
