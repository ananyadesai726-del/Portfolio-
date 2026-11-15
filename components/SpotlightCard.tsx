"use client";

import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  label?: string;
};

export default function SpotlightCard({ children, className = "", onClick, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const interactive = typeof onClick === "function";

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? label : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={`glass group relative overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1 ${
        interactive ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent" : ""
      } ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.18), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
