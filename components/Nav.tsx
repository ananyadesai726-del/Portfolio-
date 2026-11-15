"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "lab", label: "Lab" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [active, setActive] = useState("home");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/70 backdrop-blur-md">
      <motion.div
        style={{ scaleX }}
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-accent to-accent-alt"
      />
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href="#home" className="font-mono text-sm font-semibold">
          ananya<span className="text-accent-soft">.dev</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {sections.slice(1).map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  active === s.id ? "bg-accent/15 text-accent-soft" : "muted hover:text-[var(--fg)]"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            className="card muted hidden h-9 items-center gap-2 px-3 text-xs transition hover:border-accent sm:flex"
          >
            Search <kbd className="font-mono">⌘K</kbd>
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
