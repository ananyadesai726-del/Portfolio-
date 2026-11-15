import NeuralBackground from "@/components/NeuralBackground";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import CommandPalette from "@/components/CommandPalette";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <>
      <NeuralBackground />
      <ScrollProgress />
      <Navbar />
      <CommandPalette />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <footer className="relative z-10 border-t border-[var(--border)] py-8 text-center text-sm text-muted">
        Designed and built by Ananya Desai · Next.js, TypeScript, Tailwind CSS, Framer Motion
      </footer>
    </>
  );
}
