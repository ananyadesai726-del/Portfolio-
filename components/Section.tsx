"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto max-w-5xl scroll-mt-16 px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="font-mono text-sm text-accent-alt">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <div className="mt-10">{children}</div>
      </motion.div>
    </section>
  );
}
