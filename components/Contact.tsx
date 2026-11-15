"use client";

import { useState } from "react";
import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk"
        lead="Open to internships, entry-level roles and conversations about web, AI/ML and security."
      />
      <Reveal>
        <div className="glass rounded-3xl p-8 sm:p-12">
          <a
            href={`mailto:${profile.email}`}
            className="gradient-text break-all text-2xl font-semibold sm:text-4xl"
          >
            {profile.email}
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copy}
              className="rounded-full bg-gradient-to-r from-accent to-accent-alt px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/30 transition hover:scale-105"
            >
              {copied ? "Copied" : "Copy email"}
            </button>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-full px-6 py-3 text-sm font-medium transition hover:scale-105"
            >
              LinkedIn
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="glass rounded-full px-6 py-3 text-sm font-medium transition hover:scale-105"
            >
              {profile.phone}
            </a>
          </div>
          <p className="mt-8 text-sm text-muted">{profile.location}</p>
        </div>
      </Reveal>
    </section>
  );
}
