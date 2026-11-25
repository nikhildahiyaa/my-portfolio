// src/Portfolio.jsx — Main orchestrator
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { ImpactDashboard } from "./sections/ImpactDashboard";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Contact } from "./sections/Contact";
import { useScrollSpy } from "./hooks/useScrollSpy";

const SECTIONS = ["home", "about", "experience", "impact", "projects", "skills", "contact"];

export default function Portfolio() {
  const active = useScrollSpy(SECTIONS);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 antialiased selection:bg-indigo-600/30 selection:text-white">

      {/* Skip to main content */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      {/* Ambient background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-60 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-gradient-to-r from-fuchsia-600/12 via-indigo-500/12 to-cyan-500/12 blur-3xl" />
        <div className="absolute top-[60%] -left-40 h-72 w-72 rounded-full bg-indigo-600/8 blur-3xl" />
        <div className="absolute top-[40%] -right-40 h-72 w-72 rounded-full bg-cyan-600/8 blur-3xl" />
      </div>

      <Navbar sections={SECTIONS} active={active} />

      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <ImpactDashboard />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
