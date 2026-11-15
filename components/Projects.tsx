"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";
import ProjectViz from "./ProjectViz";

function TechTags({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <span key={t} className="rounded-md bg-accent/10 px-2 py-1 font-mono text-[11px] text-accent-soft">
          {t}
        </span>
      ))}
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading
        eyebrow="Projects"
        title="Things I have built"
        lead="Select a project to see how it works."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1}>
            <SpotlightCard
              className="flex h-full flex-col p-6"
              onClick={() => setActive(p)}
              label={`Open details for ${p.title}`}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-accent-alt">{p.kind}</span>
                {p.badge ? (
                  <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] text-emerald-400">
                    {p.badge}
                  </span>
                ) : null}
              </div>
              <h3 className="text-xl font-semibold leading-snug">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm text-muted">{p.blurb}</p>
              <div className="mt-5">
                <TechTags tech={p.tech} />
              </div>
              <p className="mt-5 text-sm text-accent-soft">View details &rarr;</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              className="glass max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[var(--bg)] p-6 shadow-2xl sm:p-8"
              initial={{ y: 24, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-accent-alt">{active.kind}</p>
                  <h3 className="mt-1 text-2xl font-semibold leading-snug">{active.title}</h3>
                  {active.badge ? (
                    <span className="mt-2 inline-block rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] text-emerald-400">
                      {active.badge}
                    </span>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="glass flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <ProjectViz id={active.id} />

              <ul className="mt-6 space-y-3 text-sm text-muted">
                {active.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-alt" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <TechTags tech={active.tech} />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
