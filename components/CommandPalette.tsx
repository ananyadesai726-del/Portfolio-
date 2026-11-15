"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile, sections } from "@/lib/data";
import { scrollToSection, toggleTheme } from "@/lib/theme";

type Item = { id: string; label: string; hint: string; run: () => void };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  const items: Item[] = useMemo(
    () => [
      ...sections.map((s) => ({
        id: `go-${s.id}`,
        label: `Go to ${s.label}`,
        hint: "Navigate",
        run: () => scrollToSection(s.id),
      })),
      {
        id: "copy-email",
        label: "Copy email address",
        hint: profile.email,
        run: () => {
          navigator.clipboard?.writeText(profile.email).catch(() => undefined);
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "External",
        run: () => window.open(profile.linkedin, "_blank", "noopener,noreferrer"),
      },
      { id: "theme", label: "Toggle light / dark theme", hint: "Action", run: () => toggleTheme() },
    ],
    []
  );

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        close();
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  const choose = (item: Item | undefined) => {
    if (!item) return;
    close();
    item.run();
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(filtered[index]);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 px-4 pt-[18vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-label="Command palette"
            className="glass w-full max-w-lg overflow-hidden rounded-2xl bg-[var(--bg)] shadow-2xl"
            initial={{ y: -16, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -10, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIndex(0);
              }}
              onKeyDown={onInputKey}
              placeholder="Type a command or search..."
              className="w-full border-b border-[var(--border)] bg-transparent px-5 py-4 text-sm outline-none placeholder:text-muted"
            />
            <ul className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-muted">No results</li>
              ) : (
                filtered.map((item, i) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setIndex(i)}
                      onClick={() => choose(item)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm ${
                        i === index ? "bg-accent/15 text-accent-soft" : ""
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-xs text-muted">{item.hint}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
