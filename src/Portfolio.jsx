// src/Portfolio.jsx — page orchestrator (presentation only; content lives in src/data)
import { Navbar, NAV_ITEMS } from "./components/Navbar";
import { ScrollProgress } from "./components/ScrollProgress";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Contact } from "./sections/Contact";
import { useScrollSpy } from "./hooks/useScrollSpy";

const SECTION_IDS = NAV_ITEMS.map((n) => n.id);

export default function Portfolio() {
  const active = useScrollSpy(SECTION_IDS);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-shell text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-shell"
      >
        Skip to main content
      </a>

      {/* Global ambient depth — fixed, very low intensity */}
      <div className="pointer-events-none fixed inset-0 -z-20" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(34,211,238,0.05),transparent_60%)]" />
      </div>

      <ScrollProgress />
      <Navbar active={active} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
