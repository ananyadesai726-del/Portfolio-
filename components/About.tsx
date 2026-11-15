import { hobbies, interests, profile, strengths } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";

const focus = [
  {
    title: "AI / ML",
    body: "PyTorch, Reinforcement Learning (DQN) and Markov Decision Processes.",
  },
  {
    title: "Cybersecurity",
    body: "Network security fundamentals, Junos (HPE) and a Deloitte cyber job simulation.",
  },
];

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <span key={i} className="glass rounded-full px-3 py-1 text-xs">
          {i}
        </span>
      ))}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading
        eyebrow="About"
        title="Curious about how software works, and how to make it dependable"
        lead={profile.summary}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {focus.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <SpotlightCard className="p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-accent-alt">Interested domain</p>
                <h3 className="mt-2 text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="glass h-full space-y-6 rounded-2xl p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">Strengths</h3>
              <Chips items={strengths} />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">Interests</h3>
              <Chips items={interests} />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">Off the clock</h3>
              <Chips items={hobbies} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
