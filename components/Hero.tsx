"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { profile, stats } from "@/lib/data";
import { scrollToSection } from "@/lib/theme";
import Terminal from "./Terminal";

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  useEffect(() => {
    let w = 0;
    let c = 0;
    let del = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = words[w];
      c += del ? -1 : 1;
      setText(word.slice(0, c));
      let wait = del ? 35 : 75;
      if (!del && c === word.length) {
        del = true;
        wait = 1400;
      } else if (del && c === 0) {
        del = false;
        w = (w + 1) % words.length;
        wait = 350;
      }
      t = setTimeout(tick, wait);
    };
    t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, [words]);
  return text;
}

function Counter({ value, decimals, suffix }: { value: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(v) });
    return () => controls.stop();
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section id="home" className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 pb-16 pt-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            {profile.location}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 h-8 font-mono text-lg text-accent-alt sm:text-xl"
            aria-label={profile.title}
          >
            {typed}
            <span className="animate-blink">|</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-5 max-w-xl text-muted"
          >
            {profile.summary}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="rounded-full bg-gradient-to-r from-accent to-accent-alt px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/30 transition hover:scale-105"
            >
              View projects
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="glass rounded-full px-6 py-3 text-sm font-medium transition hover:scale-105"
            >
              Get in touch
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <Terminal />
        </motion.div>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-5 text-center">
            <p className="text-3xl font-semibold">
              <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
