"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";

export default function Skills() {
  const [selected, setSelected] = useState("all");

  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading
        eyebrow="Skills"
        title="Toolkit across code, data, testing and security"
        lead="Pick a category to focus it."
      />

      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
        {[{ id: "all", label: "All" }, ...skillGroups].map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            aria-selected={selected === g.id}
            onClick={() => setSelected(g.id)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              selected === g.id
                ? "border-accent bg-accent/20 text-accent-soft"
                : "border-[var(--border)] text-muted hover:border-accent/60"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => {
          const dim = selected !== "all" && selected !== g.id;
          return (
            <motion.div
              key={g.id}
              animate={{ opacity: dim ? 0.25 : 1, scale: dim ? 0.97 : 1 }}
              transition={{ duration: 0.25 }}
            >
              <SpotlightCard className="h-full p-5">
                <h3 className="mb-3 text-sm font-semibold text-accent-soft">{g.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-[var(--border)] px-2.5 py-1 text-xs transition hover:border-accent hover:text-accent-soft"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
