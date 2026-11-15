import { certifications } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";

export default function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading eyebrow="Certifications" title="Learning, verified" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <SpotlightCard className="h-full p-5">
              <span className="rounded-md bg-accent-alt/10 px-2 py-1 font-mono text-[11px] text-accent-alt">
                {c.tag}
              </span>
              <h3 className="mt-3 font-semibold leading-snug">{c.title}</h3>
              <p className="mt-1 text-sm text-muted">{c.issuer}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
