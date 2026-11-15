"use client";

import { useEffect, useState } from "react";
import { sections, profile } from "@/lib/data";
import { scrollToSection } from "@/lib/theme";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-x-0 border-t-0">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <button
          type="button"
          onClick={() => go("home")}
          className="flex items-center gap-2 font-semibold tracking-tight"
          aria-label="Go to top"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-alt text-sm font-bold text-white">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {sections.slice(1).map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => go(s.id)}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  active === s.id ? "bg-accent/15 text-accent-soft" : "text-muted hover:text-[var(--fg)]"
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-palette"))}
            className="glass hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted transition hover:text-[var(--fg)] sm:flex"
            aria-label="Open command palette"
          >
            Search
            <kbd className="rounded border border-[var(--border)] px-1.5 font-mono text-[10px]">Ctrl K</kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="glass flex h-9 w-9 items-center justify-center rounded-full lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open ? (
        <ul className="border-t border-[var(--border)] px-5 py-3 lg:hidden">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => go(s.id)}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                  active === s.id ? "bg-accent/15 text-accent-soft" : "text-muted"
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
