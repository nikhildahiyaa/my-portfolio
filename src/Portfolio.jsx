// src/Portfolio.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import HeroCanvas from "./components/HeroCanvas";
import { Button } from "./components/ui/button";
// We only keep the subparts; we won't use the Card shell itself
import { CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import {
  Github,
  Linkedin,
  Mail,
  FileDown,
  ArrowRight,
  ChevronDown,
  Filter,
} from "lucide-react";

/* =========================
   Profile
========================= */
const PROFILE = {
  name: "Nikhil Dahiya",
  roleWords: [
    "Data Scientist",
    "Data Analyst",
    "Business Analyst",
    "BI Developer",
    "Machine Learning",
    "Forecasting",
  ],
  /* location: "Canada",*/
  photo: "/avatar.jpg",
  blurb:
    "Data Scientist with 2+ years of experience building predictive models, risk-focused analytics, and data pipelines that support scenario analysis, stress testing, and data-driven decision-making.",
  email: "dahiya5166@gmail.com",
  socials: {
    github: "https://github.com/nikhildahiyaa",
    linkedin: "https://www.linkedin.com/in/nikhil-dahiya/",
    // Tip: avoid spaces in filenames; if you keep the space, encode it as %20
    resume: "/Nikhil%20Dahiya%20Resume.pdf",
  },
};

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=60";

/* =========================
   Projects (ordered by importance)
   ========================= */

const ALL_PROJECTS = [
  {
    title: "BCMEA Labour Demand Forecasting",
    summary:
      "Unified dock/vessel labour model; reduced error from ~40% MAPE to 7.45%.",
    details:
      "Merged 2M+ payroll, 60K+ gang allocations, 4K+ vessel logs. Holiday & vessel-cluster features, backtesting, automated reporting.",
    tags: ["Forecasting", "Python", "Time Series"],
    links: {
      code: "https://github.com/nikhildahiyaa/BCMEA-Labor-Forecast",
      demo: "#",
      report: "#",
    },
    cover:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Airbnb Booking Prediction",
    summary:
      "213k users • 69% accuracy (AUC 0.735); desktop users 30% more likely to book.",
    details:
      "Behavioral features; logistic regression & random forest; surfaced device & seasonal drivers for marketing/UX.",
    tags: ["Classification", "Python", "Product Analytics"],
    links: {
      code: "https://github.com/nikhildahiyaa/Airbnb-Booking-Prediction",
      demo: "#",
      report: "#",
    },
    cover:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Customer Segmentation (RFM + K-Means)",
    summary:
      "21% “Best Customers” contributing 50%+ of revenue; actionable cohorts.",
    details:
      "Cleaned 135k incomplete rows; built RFM features; K-Means clustering + visuals for targeted campaigns.",
    tags: ["Clustering", "Python", "Marketing"],
    links: {
      code: "https://github.com/nikhildahiyaa/Customer-Segmentation-Using-RFM-and-K-Means-Clustering",
      demo: "#",
      report: "#",
    },
    cover:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Image Redaction Tool",
    summary: "OpenCV + EasyOCR pipeline; ~95% ID detection; ~40% faster processing.",
    details:
      "Regex-enhanced OCR, redaction overlays, batch pipeline + simple GUI for compliance.",
    tags: ["Computer Vision", "Python", "OCR"],
    links: {
      code: "https://github.com/nikhildahiyaa/Image-Redaction-Project",
      demo: "#",
      report: "#",
    },
    cover:
      "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Box Office Revenue Prediction",
    summary: "Linear regression baseline with feature engineering; research-grade.",
    details:
      "Scraped/cleaned movie features; explored lagged ad effects; regression with diagnostics.",
    tags: ["Regression", "Python", "Research"],
    links: {
      code: "https://github.com/nikhildahiyaa/Box-Office-Revenue-Prediction-Using-Linear-Regression-in-ML",
      demo: "#",
      report: "#",
    },
    cover:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "YAIP — Yet Another Image Processor",
    summary: "CLI for common image transforms; speed + DX focused.",
    details:
      "OpenCV wrapper; resize, filters, format conversions with simple flags.",
    tags: ["Computer Vision", "Python", "CLI"],
    links: {
      code: "https://github.com/nikhildahiyaa/Yet-Another-Image-Processor-YAIP-",
      demo: "#",
      report: "#",
    },
    cover:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Data Compression Performance Analysis",
    summary: "Benchmarked codecs on an org dataset; speed vs size trade-offs.",
    details: "Repeatable tests, plots, recommendation of default codecs.",
    tags: ["Data Engineering", "Python", "Performance"],
    links: {
      code: "https://github.com/nikhildahiyaa/Data-Compression-Performance-Analysis-for-Organizations-Dataset-",
      demo: "#",
      report: "#",
    },
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Traveling Salesperson Problem (TSP) Solver",
    summary: "Heuristics for TSP; compares tour quality vs compute time.",
    details: "Nearest neighbor, 2-opt; plotted routes and trade-offs.",
    tags: ["Optimization", "Algorithms", "C++"],
    links: {
      code: "https://github.com/nikhildahiyaa/Traveling-Salesperson-Problem-TSP-Solver",
      demo: "#",
      report: "#",
    },
    cover:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Fifteen Puzzle Solver",
    summary: "Classic state-space search with heuristics (A*/IDA*).",
    details: "Manhattan heuristics; branching/memory analysis.",
    tags: ["Algorithms", "Search", "Java"],
    links: {
      code: "https://github.com/nikhildahiyaa/Fifteen-Puzzle-Solver",
      demo: "#",
      report: "#",
    },
    cover:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Web Scraping with R",
    summary: "Tidyverse + rvest pipelines for clean, repeatable scrapes.",
    details: "Multi-page scraping; tidy ETL; CSV/Parquet outputs.",
    tags: ["ETL", "R", "Web Scraping"],
    links: {
      code: "https://github.com/nikhildahiyaa/-Web-Scraping-with-R",
      demo: "#",
      report: "#",
    },
    cover:
      "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1200&q=60",
  },
];

const CATEGORIES = [
  "All",
  "Forecasting",
  "BI",
  "Classification",
  "Clustering",
  "Computer Vision",
  "Optimization",
  "Algorithms",
  "ETL",
  "Product Analytics",
];

/* =========================
   Small helpers
   ========================= */

// Force-light card that doesn't rely on theme variables.
// This guarantees a white card on every device.
const LightCard = ({ className = "", children }) => (
  <div
    className={`rounded-2xl border border-slate-200 bg-white text-black shadow-sm ${className}`}
  >
    {children}
  </div>
);

// Dark card used for the Skills section
const DarkCard = ({ className = "", children }) => (
  <div
    className={`rounded-2xl border border-slate-800 bg-slate-900/80 ${className}`}
  >
    {children}
  </div>
);

const Tag = ({ label }) => (
  <Badge className="rounded-full bg-slate-100 border border-slate-300 text-black">
    {label}
  </Badge>
);

/* =========================
   3-D tilt card
========================= */
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d", perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================
   Scroll-reveal wrapper
========================= */
const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, rotateX: 6 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.55, delay, ease: "easeOut" }}
    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
  >
    {children}
  </motion.div>
);

const useScrollSpy = (ids) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(id),
        { rootMargin: "-50% 0px -40% 0px", threshold: 0.01 }
      );

      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [ids.join("|")]);

  return active;
};

const Anchor = ({ href, children }) => (
  <a
    href={href}
    className="inline-flex items-center gap-2 text-sm text-indigo-700 hover:text-indigo-800 underline-offset-4 hover:underline"
    target="_blank"
    rel="noreferrer"
  >
    {children} <ArrowRight className="h-4 w-4" />
  </a>
);

/* =========================
   Component
========================= */
export default function Portfolio() {
  const [cat, setCat] = useState("All");
  const [wordIndex, setWordIndex] = useState(0);
  const sections = ["home", "about", "experience", "projects", "skills", "contact"];
  const active = useScrollSpy(sections);

  // Force dark theme on the shell
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // rotate the subtitle
  useEffect(() => {
    const id = setInterval(() => setWordIndex((w) => (w + 1) % PROFILE.roleWords.length), 1800);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(
    () => (cat === "All" ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.tags.includes(cat))),
    [cat]
  );
// --- Contact form state + submit handler (Web3Forms) ---
const [mailStatus, setMailStatus] = useState("idle"); // idle | sending | sent | error

async function handleContactSubmit(e) {
  e.preventDefault();
  const form = new FormData(e.currentTarget);

  setMailStatus("sending");

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: "7b84995d-0778-4267-99ef-5a27e6c8f587",
        name: form.get("name"),
        email: form.get("email"),
        subject: form.get("subject"),
        message: form.get("message"),
        botcheck: form.get("botcheck"),
      }),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    setMailStatus("sent");
    e.currentTarget.reset();
  } catch {
    setMailStatus("error");
  }
}

  return (
    <div>
      {/* Dark chrome */}
      <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100 antialiased selection:bg-indigo-600/30 selection:text-white">
        {/* decorative bloom */}
        <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(40%_40%_at_50%_15%,black,transparent_70%)]">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[60rem] rounded-full bg-gradient-to-r from-fuchsia-600/20 via-cyan-500/20 to-indigo-600/20 blur-3xl" />
        </div>

{/* Navbar */}
<header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 border-b border-slate-800">
  <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
    {/* Brand */}
    <a href="#home" className="font-semibold tracking-tight text-indigo-300 shrink-0">
      {PROFILE.name}
    </a>

    {/* Section links — visible on mobile, horizontally scrollable */}
    <div className="flex items-center gap-5 text-sm overflow-x-auto md:overflow-visible py-1 -mx-2 px-2 grow">
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={
            "whitespace-nowrap hover:opacity-90 " +
            (active === id ? "text-indigo-300" : "text-slate-300")
          }
        >
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </a>
      ))}
    </div>

    {/* Resume button — always visible; text hides on xs */}
    <div className="shrink-0">
      <a href={PROFILE.socials.resume} className="inline-block">
        <Button className="rounded-2xl bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700 px-3 sm:px-4">
          <FileDown className="h-4 w-4 mr-0 sm:mr-2" />
          <span className="hidden sm:inline">Resume</span>
        </Button>
      </a>
    </div>
  </nav>
</header>

        {/* Hero */}
        <section id="home" className="scroll-mt-24 py-16 sm:py-24 relative overflow-hidden">
          <HeroCanvas />
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-sm uppercase tracking-wide text-indigo-300/80">{PROFILE.location}</p>
              <h1 className="text-4xl sm:text-5xl font-bold mt-2 leading-tight">
                Hello, I'm <span className="text-indigo-300">{PROFILE.name}</span>
              </h1>

              {/* rotating subtitle */}
              <div className="h-8 mt-2">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={PROFILE.roleWords[wordIndex]}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="text-xl text-slate-200"
                  >
                    {PROFILE.roleWords[wordIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <p className="mt-4 text-slate-300 max-w-prose">{PROFILE.blurb}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={PROFILE.socials.github}>
                  <Button className="rounded-2xl bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </a>
                <a href={PROFILE.socials.linkedin}>
                  <Button className="rounded-2xl bg-slate-800 text-cyan-300 hover:bg-slate-700 border border-slate-700">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                </a>
                <a href={`mailto:${PROFILE.email}`}>
                  <Button className="rounded-2xl bg-slate-800 text-fuchsia-300 hover:bg-slate-700 border border-slate-700">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </a>
              </div>

              <a href="#projects" className="group mt-10 inline-flex items-center gap-2 text-indigo-300">
                See my work <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-24 py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-stretch">
<Reveal><div>
  <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-slate-100">About</h2>

  <div className="space-y-4 text-slate-300">
    <p>
      I’m a Data Scientist at ATB Financial, based in Calgary, AB — a Simon Fraser University
      graduate (BSc Data Science, 2025) with an IBM Data Science Professional Certificate.
    </p>

    <p>
      I design and deploy end-to-end data pipelines and predictive models using Python and SQL
      to evaluate downstream impacts and risk drivers. My work spans applied econometrics,
      forecasting, and scenario analysis to support portfolio-level and operational risk decisions.
    </p>

    <p>
      I’m experienced in translating complex analytical outputs into actionable insights for both
      technical and non-technical stakeholders — whether through Power BI dashboards, regression
      outputs, or stress-testing frameworks. I’ve also led and mentored 60+ students as an executive
      of the SFU Data Science Student Club.
    </p>

    <p>
      Explore my work in the <a href="#projects" className="underline text-indigo-300">Projects</a> section, or view this site at{" "}
      <a
        href="https://nikhil-dahiya-portfolio.vercel.app"
        target="_blank"
        rel="noreferrer"
        className="underline text-indigo-300"
      >
        nikhil-dahiya-portfolio.vercel.app
      </a>.
    </p>
  </div>
</div></Reveal>


            {/* Education — forced light card */}
            <Reveal delay={0.1}><LightCard>
              <CardHeader>
                <CardTitle className="text-black">Education</CardTitle>
                <CardDescription className="text-black/70">Formal training</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-black">
                <div>
                  <p className="font-semibold">Simon Fraser University — BSc, Data Science</p>
                  <p className="text-sm text-black/80">Jan 2021 – Apr 2025 • Burnaby, BC</p>
                  <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
                    <li>Statistics, Machine Learning, Data Mining, Algorithms</li>
                    <li>Databases (SQL/NoSQL), Data Engineering, Cloud (AWS/GCP)</li>
                    <li>Capstone: BCMEA Labour Demand Forecasting (7.45% MAPE)</li>
                  </ul>
                </div>
                <div className="pt-1">
                  <p className="font-semibold">IBM Data Science Professional Certificate</p>
                  <p className="text-sm text-black/80">Completed Oct 2025</p>
                </div>
              </CardContent>
            </LightCard></Reveal>
          </div>
        </section>

        {/* Experience — forced light cards */}
        <section id="experience" className="scroll-mt-24 py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-100">Experience</h2>

            <Reveal><LightCard>
              <CardHeader>
                <CardTitle className="text-black">Data Scientist — ATB Financial</CardTitle>
                <CardDescription className="text-black/70">Jan 2026 – Present • Remote</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-black text-sm">
                <p>Designed and deployed predictive models using ML and AI to analyze client behavior and assess portfolio-level credit risk.</p>
                <p>Built and maintained data pipelines for extracting, transforming, and loading structured and unstructured data to support modeling workflows.</p>
                <p>Conducted stress testing and scenario analysis using Moody's Portfolio Studio, supporting enterprise-wide risk assessment and regulatory exercises.</p>
                <p>Performed statistical analysis and econometric modeling to evaluate risk signals and inform strategic business decisions.</p>
              </CardContent>
            </LightCard></Reveal>

            <Reveal delay={0.1}><LightCard>
              <CardHeader>
                <CardTitle className="text-black">Research Assistant — Beedie School of Business (SFU)</CardTitle>
                <CardDescription className="text-black/70">Sept 2024 – Dec 2024 • Burnaby, BC</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-black text-sm">
                <p>Built Python + SQL pipelines integrating 1M+ records across exposure, engagement, and outcome datasets to support impact and risk analysis.</p>
                <p>Developed regression and time-series models to assess lag effects and downstream impacts, informing a 15–20% reallocation toward higher-return scenarios.</p>
                <p>Designed Power BI dashboards enabling scenario comparison and decision-making, reducing manual analysis time by 30%.</p>
              </CardContent>
            </LightCard></Reveal>

            <Reveal delay={0.15}><LightCard>
              <CardHeader>
                <CardTitle className="text-black">Data Analyst — UBC Centre for Heart Lung Innovation</CardTitle>
                <CardDescription className="text-black/70">Sept 2023 – Apr 2024 • Vancouver, BC</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-black text-sm">
                <p>Analyzed 5,176 participant records using Python and SQL to support multi-site statistical modeling and outcome validation.</p>
                <p>Implemented data quality and validation checks, reducing missing data and inconsistencies by 40%.</p>
                <p>Produced publication-grade analytical outputs supporting validated findings for peer-reviewed medical research.</p>
              </CardContent>
            </LightCard></Reveal>

            <Reveal delay={0.2}><LightCard>
              <CardHeader>
                <CardTitle className="text-black">Research Assistant — Simon Fraser University</CardTitle>
                <CardDescription className="text-black/70">Apr 2023 – Aug 2023 • Burnaby, BC</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-black text-sm">
                <p>Prepared and transformed structured datasets using Python and SQL for faculty-led quantitative research.</p>
                <p>Built reusable preprocessing and validation scripts, reducing data preparation effort by 30%.</p>
                <p>Conducted exploratory data analysis and supported statistical verification of results.</p>
              </CardContent>
            </LightCard></Reveal>

            <Reveal delay={0.25}><LightCard>
              <CardHeader>
                <CardTitle className="text-black">AI / ML Intern — Ernst &amp; Young</CardTitle>
                <CardDescription className="text-black/70">May 2022 – Aug 2022 • Gurugram, India</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-black text-sm">
                <p>Developed Python-based OCR and data extraction models achieving 95% accuracy.</p>
                <p>Automated compliance review workflows, reducing processing time by 40%.</p>
                <p>Translated analytical and regulatory requirements into deployable technical solutions.</p>
              </CardContent>
            </LightCard></Reveal>
          </div>
        </section>

{/* Projects — mobile-friendly filter chips */}
<section id="projects" className="scroll-mt-24 py-14 sm:py-20">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-semibold text-slate-100 mb-4">Projects</h2>

    {/* Filter bar: visible on mobile, scrollable; sticky under the navbar */}
    <div className="sticky top-16 z-30 mb-6">
      <div className="backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 border border-slate-800 rounded-xl p-2">
        <div
          className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Project categories"
        >
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              role="tab"
              aria-selected={cat === c}
              className={
                "shrink-0 rounded-full px-3.5 py-1.5 text-sm border transition " +
                (cat === c
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800")
              }
            >
              <span className="inline-flex items-center gap-2">
                {/* hide icon on very small screens to save space */}
                <Filter className="h-3.5 w-3.5 hidden sm:inline" />
                {c}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Project cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {filtered.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <TiltCard>
            <LightCard className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-40 bg-slate-200">
                <img
                  src={p.cover}
                  alt={`${p.title} cover`}
                  className="h-full w-full object-cover"
                  loading={i < 6 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={i < 3 ? "high" : "auto"}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_COVER;
                  }}
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg text-black">{p.title}</CardTitle>
                <CardDescription className="text-black/70">{p.summary}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-black">
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} className="rounded-full bg-slate-100 border border-slate-300 text-black">
                      {t}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm">{p.details}</p>
                <div className="flex items-center gap-4 pt-2">
                  {p.links.code !== "#" && (
                    <a
                      href={p.links.code}
                      className="inline-flex items-center gap-2 text-sm text-indigo-700 hover:text-indigo-800 underline-offset-4 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Code <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                  {p.links.demo !== "#" && (
                    <a
                      href={p.links.demo}
                      className="inline-flex items-center gap-2 text-sm text-indigo-700 hover:text-indigo-800 underline-offset-4 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                  {p.links.report !== "#" && (
                    <a
                      href={p.links.report}
                      className="inline-flex items-center gap-2 text-sm text-indigo-700 hover:text-indigo-800 underline-offset-4 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Report <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </CardContent>
            </LightCard>
            </TiltCard>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </div>
</section>

        {/* Skills (dark chips) */}
        <section id="skills" className="scroll-mt-24 py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-6">
            <DarkCard>
              <CardHeader>
                <CardTitle className="text-slate-100">Core stack</CardTitle>
                <CardDescription className="text-slate-400">Daily drivers & comfort tools</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {[
                  "Python", "R", "SQL", "Power Bi", "Pandas", "NumPy", "SciPy", "Scikit-learn",
                  "XGBoost", "Random Forest", "LightGBM", "TensorFlow", "PyTorch", "Statsmodels",
                  "Prophet", "Power BI", "Tableau", "DBT",
                  "Airflow", "Spark", "Databricks", "BigQuery", "AWS", "Docker", "Git",
                ].map((s) => (
                  <Badge
                    key={s}
                    className="rounded-full bg-slate-900 border border-slate-700 text-slate-100 hover:bg-slate-800"
                  >
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </DarkCard>

            <DarkCard>
              <CardHeader>
                <CardTitle className="text-slate-100">What I enjoy</CardTitle>
                <CardDescription className="text-slate-400">Problems I reach for first</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {["Causal inference", "Experiment design", "Forecasting", "Cohort analysis", "Segmentation"].map((s) => (
                  <Badge
                    key={s}
                    className="rounded-full bg-slate-900 border border-slate-700 text-slate-100"
                  >
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </DarkCard>
          </div>
        </section>

{/* Contact — forced light card */}
<section id="contact" className="scroll-mt-24 py-14 sm:py-20">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-100">Contact</h2>
    <LightCard>
      <CardHeader>
        <CardTitle className="text-black">Let’s work together</CardTitle>
        <CardDescription className="text-black/70">
          Send a note and I’ll get back within 1–2 business days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid sm:grid-cols-2 gap-4" onSubmit={handleContactSubmit}>
          {/* Web3Forms bot protection */}
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

          <Input
            name="name"
            placeholder="Your name"
            required
            className="bg-white border-slate-300 text-black"
          />
          <Input
            name="email"
            type="email"
            placeholder="Your email"
            required
            className="bg-white border-slate-300 text-black"
          />
          <div className="sm:col-span-2">
            <Input
              name="subject"
              placeholder="Subject"
              required
              className="bg-white border-slate-300 text-black"
            />
          </div>
          <div className="sm:col-span-2">
            <Textarea
              name="message"
              placeholder="Message"
              className="min-h-[120px] bg-white border-slate-300 text-black"
              required
            />
          </div>

          {/* iOS-safe button styling */}
          <button
            type="submit"
            disabled={mailStatus === "sending"}
            className="sm:col-span-2 rounded-2xl w-full h-11 md:h-12
                       bg-indigo-600 text-white font-medium
                       hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed
                       active:translate-y-[1px] transition
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
                       focus-visible:ring-offset-2 focus-visible:ring-offset-white
                       appearance-none [-webkit-appearance:none]"
            aria-label="Send message"
          >
            {mailStatus === "sending" ? "Sending…" : "Send"}
          </button>

          {/* Success / error messages */}
          {mailStatus === "sent" && (
            <p className="sm:col-span-2 text-sm text-emerald-700">
              Thanks! I’ve received your message.
            </p>
          )}
          {mailStatus === "error" && (
            <p className="sm:col-span-2 text-sm text-red-600">Something went wrong. Please email me directly.</p>
          )}

          <p className="sm:col-span-2 text-xs text-black">
            Or email me directly at{" "}
            <a className="underline text-black" href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
            </a>
            .
          </p>
        </form>
      </CardContent>
    </LightCard>
  </div>
</section>

        {/* Footer */}
        <footer className="py-10 border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <a href={PROFILE.socials.github} className="hover:opacity-80 text-slate-200" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href={PROFILE.socials.linkedin} className="hover:opacity-80 text-cyan-300" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={`mailto:${PROFILE.email}`} className="hover:opacity-80 text-fuchsia-300" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
