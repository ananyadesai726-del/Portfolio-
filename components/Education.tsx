import { education } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading eyebrow="Education" title="Academic journey" />
      <ol className="relative ml-3 border-l border-[var(--border)]">
        {education.map((e, i) => (
          <li key={e.school} className="mb-10 ml-8 last:mb-0">
            <span
              className={`absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--bg)] ${
                e.current ? "animate-pulse bg-accent-alt" : "bg-accent"
              }`}
            />
            <Reveal delay={i * 0.08}>
              <div className="glass rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold">{e.school}</h3>
                  <span className="font-mono text-xs text-muted">{e.years}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{e.degree}</p>
                <span className="mt-3 inline-block rounded-md bg-accent/10 px-2 py-1 font-mono text-xs text-accent-soft">
                  {e.score}
                </span>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
