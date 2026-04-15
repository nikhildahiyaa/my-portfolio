// src/Portfolio.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import HeroCanvas from "./components/HeroCanvas";
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
  Briefcase,
} from "lucide-react";

/* =========================
   Profile
========================= */
const PROFILE = {
  name: "Nikhil Dahiya",
  roleWords: [
    "Data Scientist",
    "Predictive Modeling",
    "Risk Analytics",
    "ML Engineering",
    "Forecasting",
    "Data Pipelines",
  ],
  blurb:
    "Turning complex data into decisions — predictive models, risk analytics, and pipelines that move organizations forward.",
  email: "dahiya5166@gmail.com",
  socials: {
    github: "https://github.com/nikhildahiyaa",
    linkedin: "https://www.linkedin.com/in/nikhil-dahiya/",
    resume: "/Nikhil%20Dahiya%20Resume.pdf",
  },
};

const HERO_STATS = [
  { value: "2M+", label: "Records Processed" },
  { value: "7.45%", label: "Forecast MAPE" },
  { value: "95%", label: "OCR Accuracy" },
];

/* =========================
   Projects
========================= */
const ALL_PROJECTS = [
  {
    title: "BCMEA Labour Demand Forecasting",
    summary: "Reduced forecast error from ~40% MAPE to 7.45% across dock & vessel workstreams.",
    details: "Merged 2M+ payroll, 60K+ gang allocations, 4K+ vessel logs. Holiday & vessel-cluster features, backtesting, automated reporting.",
    metric: "7.45% MAPE",
    tags: ["Forecasting", "Python", "Time Series"],
    links: { code: "https://github.com/nikhildahiyaa/BCMEA-Labor-Forecast", demo: "#", report: "#" },
    cover: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Airbnb Booking Prediction",
    summary: "213k users · 69% accuracy (AUC 0.735); desktop users 30% more likely to book.",
    details: "Behavioral features; logistic regression & random forest; surfaced device & seasonal drivers for marketing/UX.",
    metric: "69% Accuracy",
    tags: ["Classification", "Python", "Product Analytics"],
    links: { code: "https://github.com/nikhildahiyaa/Airbnb-Booking-Prediction", demo: "#", report: "#" },
    cover: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Customer Segmentation (RFM + K-Means)",
    summary: "21% 'Best Customers' contributing 50%+ of revenue; actionable cohorts for targeted campaigns.",
    details: "Cleaned 135k incomplete rows; built RFM features; K-Means clustering + visuals.",
    metric: "50%+ Revenue",
    tags: ["Clustering", "Python", "Marketing"],
    links: { code: "https://github.com/nikhildahiyaa/Customer-Segmentation-Using-RFM-and-K-Means-Clustering", demo: "#", report: "#" },
    cover: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Image Redaction Tool",
    summary: "OpenCV + EasyOCR pipeline; ~95% ID detection accuracy; ~40% faster processing.",
    details: "Regex-enhanced OCR, redaction overlays, batch pipeline + simple GUI for compliance.",
    metric: "95% Accuracy",
    tags: ["Computer Vision", "Python", "OCR"],
    links: { code: "https://github.com/nikhildahiyaa/Image-Redaction-Project", demo: "#", report: "#" },
    cover: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Box Office Revenue Prediction",
    summary: "Linear regression with feature engineering; early-week ads show ~15% stronger weekend impact.",
    details: "Scraped/cleaned movie features; explored lagged ad effects; regression with diagnostics.",
    metric: "~15% Ad Lift",
    tags: ["Regression", "Python", "Research"],
    links: { code: "https://github.com/nikhildahiyaa/Box-Office-Revenue-Prediction-Using-Linear-Regression-in-ML", demo: "#", report: "#" },
    cover: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "YAIP — Yet Another Image Processor",
    summary: "CLI for common image transforms; speed + DX focused with 40% processing time reduction.",
    details: "OpenCV wrapper; resize, filters, format conversions with simple flags.",
    metric: "40% Faster",
    tags: ["Computer Vision", "Python", "CLI"],
    links: { code: "https://github.com/nikhildahiyaa/Yet-Another-Image-Processor-YAIP-", demo: "#", report: "#" },
    cover: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Data Compression Performance Analysis",
    summary: "Benchmarked codecs on an org dataset; speed vs size trade-offs with repeatable test suite.",
    details: "Repeatable tests, plots, recommendation of default codecs.",
    metric: "Benchmark",
    tags: ["Data Engineering", "Python", "Performance"],
    links: { code: "https://github.com/nikhildahiyaa/Data-Compression-Performance-Analysis-for-Organizations-Dataset-", demo: "#", report: "#" },
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Traveling Salesperson Problem (TSP) Solver",
    summary: "Heuristics for TSP; nearest neighbor + 2-opt comparing tour quality vs compute time.",
    details: "Plotted routes and trade-offs.",
    metric: "2-opt Heuristic",
    tags: ["Optimization", "Algorithms", "C++"],
    links: { code: "https://github.com/nikhildahiyaa/Traveling-Salesperson-Problem-TSP-Solver", demo: "#", report: "#" },
    cover: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Fifteen Puzzle Solver",
    summary: "Classic state-space search with A*/IDA* heuristics; Manhattan distance analysis.",
    details: "Manhattan heuristics; branching/memory analysis.",
    metric: "A* / IDA*",
    tags: ["Algorithms", "Search", "Java"],
    links: { code: "https://github.com/nikhildahiyaa/Fifteen-Puzzle-Solver", demo: "#", report: "#" },
    cover: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Web Scraping with R",
    summary: "Tidyverse + rvest pipelines for clean, repeatable multi-page scrapes.",
    details: "Multi-page scraping; tidy ETL; CSV/Parquet outputs.",
    metric: "ETL Pipeline",
    tags: ["ETL", "R", "Web Scraping"],
    links: { code: "https://github.com/nikhildahiyaa/-Web-Scraping-with-R", demo: "#", report: "#" },
    cover: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1200&q=60",
  },
];

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=60";

const CATEGORIES = [
  "All", "Forecasting", "BI", "Classification", "Clustering",
  "Computer Vision", "Optimization", "Algorithms", "ETL", "Product Analytics",
];

const SKILLS = [
  {
    label: "Languages",
    items: ["Python", "R", "SQL"],
  },
  {
    label: "ML & Modeling",
    items: ["Scikit-learn", "XGBoost", "LightGBM", "Random Forest", "Statsmodels", "Prophet", "Pandas", "NumPy"],
  },
  {
    label: "BI & Visualization",
    items: ["Power BI", "Tableau", "Excel"],
  },
  {
    label: "Data Eng & Cloud",
    items: ["Git", "Jupyter", "AWS", "GCP", "Moody's Portfolio Studio"],
  },
];

/* =========================
   UI helpers
========================= */
const GlassCard = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

/* 3-D tilt card */
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

  function onLeave() { x.set(0); y.set(0); }

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

/* Scroll-reveal wrapper */
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

/* =========================
   Component
========================= */
export default function Portfolio() {
  const [cat, setCat] = useState("All");
  const [wordIndex, setWordIndex] = useState(0);
  const sections = ["home", "about", "experience", "projects", "skills", "contact"];
  const active = useScrollSpy(sections);

  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((w) => (w + 1) % PROFILE.roleWords.length), 1800);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(
    () => (cat === "All" ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.tags.includes(cat))),
    [cat]
  );

  const [mailStatus, setMailStatus] = useState("idle");

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
        }),
      });
      await res.json().catch(() => ({}));
      setMailStatus("sent");
      e.currentTarget.reset();
    } catch {
      setMailStatus("error");
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 antialiased selection:bg-indigo-600/30 selection:text-white">

      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-60 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-gradient-to-r from-fuchsia-600/15 via-indigo-500/15 to-cyan-500/15 blur-3xl" />
        <div className="absolute top-[60%] -left-40 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute top-[40%] -right-40 h-72 w-72 rounded-full bg-cyan-600/10 blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/60 border-b border-white/5">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <a href="#home" className="font-semibold tracking-tight text-indigo-300 shrink-0">
            {PROFILE.name}
          </a>
          <div className="flex items-center gap-5 text-sm overflow-x-auto md:overflow-visible py-1 -mx-2 px-2 grow">
            {sections.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={"whitespace-nowrap transition-colors " + (active === id ? "text-indigo-300" : "text-slate-400 hover:text-slate-200")}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>
          <div className="shrink-0">
            <a
              href={PROFILE.socials.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 transition-colors"
            >
              <FileDown className="h-4 w-4" />
              <span className="hidden sm:inline">Resume</span>
            </a>
          </div>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section id="home" className="scroll-mt-24 py-20 sm:py-32 relative overflow-hidden">
        <HeroCanvas />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

            {/* ATB badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 mb-6">
              <Briefcase className="h-3.5 w-3.5" />
              Currently: Data Scientist @ ATB Financial
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight">
              Hi, I'm <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">{PROFILE.name}</span>
            </h1>

            {/* rotating subtitle */}
            <div className="h-9 mt-3">
              <AnimatePresence mode="wait">
                <motion.p
                  key={PROFILE.roleWords[wordIndex]}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-xl text-slate-300"
                >
                  {PROFILE.roleWords[wordIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <p className="mt-4 text-slate-400 max-w-xl text-lg">{PROFILE.blurb}</p>

            {/* CTA buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={PROFILE.socials.github} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 text-slate-100 hover:bg-white/20 text-sm font-medium px-4 py-2 transition-colors">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 text-cyan-300 hover:bg-white/20 text-sm font-medium px-4 py-2 transition-colors">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 text-fuchsia-300 hover:bg-white/20 text-sm font-medium px-4 py-2 transition-colors">
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>

            {/* Impact stats */}
            <div className="mt-10 flex flex-wrap gap-6">
              {HERO_STATS.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-indigo-300">{s.value}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wide">{s.label}</span>
                </div>
              ))}
            </div>

            <a href="#projects" className="group mt-10 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-300 transition-colors">
              See my work <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="scroll-mt-24 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-start">

          <Reveal>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">About</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  I'm a Data Scientist at <span className="text-slate-200 font-medium">ATB Financial</span>, based in Calgary, AB — an SFU graduate (BSc Data Science, 2025) with an IBM Data Science Professional Certificate.
                </p>
                <p>
                  I design and deploy end-to-end data pipelines and predictive models using Python and SQL to evaluate downstream impacts and risk drivers. My work spans applied econometrics, forecasting, and scenario analysis to support portfolio-level and operational risk decisions.
                </p>
                <p>
                  I translate complex analytical outputs into actionable insights — through Power BI dashboards, regression outputs, or stress-testing frameworks. As an executive of the SFU Data Science Student Club, I mentored <span className="text-slate-200 font-medium">60+ students</span> on model selection, analytical reasoning, and technical communication.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="p-6 space-y-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-indigo-400 mb-3">Education</p>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-slate-100">Simon Fraser University</p>
                    <p className="text-sm text-indigo-300">BSc, Data Science</p>
                    <p className="text-xs text-slate-500 mt-0.5">Jan 2021 – Apr 2025 · Burnaby, BC</p>
                    <ul className="mt-2 text-sm text-slate-400 space-y-1 list-disc pl-4">
                      <li>Statistics, ML, Data Mining, Algorithms</li>
                      <li>Databases, Data Engineering, Cloud (AWS/GCP)</li>
                      <li>Capstone: BCMEA Labour Forecasting — 7.45% MAPE</li>
                    </ul>
                  </div>
                  <div className="border-t border-white/5 pt-4">
                    <p className="font-semibold text-slate-100">IBM Data Science Professional Certificate</p>
                    <p className="text-xs text-slate-500 mt-0.5">Completed Oct 2025</p>
                  </div>
                  <div className="border-t border-white/5 pt-4">
                    <p className="font-semibold text-slate-100">Executive — SFU Data Science Student Club</p>
                    <p className="text-xs text-slate-500 mt-0.5">Apr 2024 – Apr 2025</p>
                    <p className="text-sm text-slate-400 mt-1">Mentored 60+ students · Led Python/SQL/ML workshops</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Reveal>

        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="scroll-mt-24 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Experience</h2>
          <div className="space-y-4">

            {[
              {
                role: "Data Scientist",
                company: "ATB Financial",
                period: "Jan 2026 – Present",
                location: "Remote",
                accent: "text-indigo-300",
                bullets: [
                  "Designed and deployed predictive models using ML and AI to analyze client behavior and assess portfolio-level credit risk.",
                  "Built and maintained data pipelines for extracting, transforming, and loading structured and unstructured data.",
                  <span>Conducted <strong className="text-slate-200">stress testing and scenario analysis</strong> using Moody's Portfolio Studio for enterprise-wide risk assessment.</span>,
                  "Performed statistical analysis and econometric modeling to evaluate risk signals and inform strategic business decisions.",
                ],
              },
              {
                role: "Research Assistant",
                company: "Beedie School of Business, SFU",
                period: "Sept 2024 – Dec 2024",
                location: "Burnaby, BC",
                accent: "text-cyan-300",
                bullets: [
                  <span>Built Python + SQL pipelines integrating <strong className="text-slate-200">1M+ records</strong> to support impact and risk analysis.</span>,
                  <span>Regression and time-series models informed a <strong className="text-slate-200">15–20% reallocation</strong> toward higher-return scenarios.</span>,
                  <span>Designed Power BI dashboards reducing manual analysis time by <strong className="text-slate-200">30%</strong>.</span>,
                ],
              },
              {
                role: "Data Analyst",
                company: "UBC Centre for Heart Lung Innovation",
                period: "Sept 2023 – Apr 2024",
                location: "Vancouver, BC",
                accent: "text-fuchsia-300",
                bullets: [
                  <span>Analyzed <strong className="text-slate-200">5,176 participant records</strong> using Python and SQL for multi-site statistical modeling.</span>,
                  <span>Data quality checks reduced missing data and inconsistencies by <strong className="text-slate-200">40%</strong>.</span>,
                  "Produced publication-grade analytical outputs for peer-reviewed medical research.",
                ],
              },
              {
                role: "Research Assistant",
                company: "Simon Fraser University",
                period: "Apr 2023 – Aug 2023",
                location: "Burnaby, BC",
                accent: "text-indigo-300",
                bullets: [
                  "Prepared and transformed structured datasets using Python and SQL for faculty-led quantitative research.",
                  <span>Reusable preprocessing scripts reduced data preparation effort by <strong className="text-slate-200">30%</strong>.</span>,
                  "Conducted EDA and supported statistical verification of results.",
                ],
              },
              {
                role: "AI / ML Intern",
                company: "Ernst & Young",
                period: "May 2022 – Aug 2022",
                location: "Gurugram, India",
                accent: "text-cyan-300",
                bullets: [
                  <span>Python-based OCR and data extraction models achieving <strong className="text-slate-200">95% accuracy</strong>.</span>,
                  <span>Automated compliance workflows, reducing processing time by <strong className="text-slate-200">40%</strong>.</span>,
                  "Translated analytical and regulatory requirements into deployable technical solutions.",
                ],
              },
            ].map((exp, i) => (
              <Reveal key={exp.company + exp.role} delay={i * 0.05}>
                <GlassCard className="p-6 hover:border-white/20 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                    <div>
                      <p className="font-semibold text-slate-100 text-lg">{exp.role}</p>
                      <p className={`text-sm font-medium ${exp.accent}`}>{exp.company}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-slate-400">{exp.period}</p>
                      <p className="text-xs text-slate-500">{exp.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 text-sm text-slate-400">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500/60 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </Reveal>
            ))}

          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="scroll-mt-24 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Projects</h2>

          {/* Filter bar */}
          <div className="sticky top-16 z-30 mb-6">
            <div className="backdrop-blur-md bg-slate-950/60 border border-white/5 rounded-xl p-2">
              <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist">
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
                        : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10")
                    }
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Filter className="h-3 w-3 hidden sm:inline opacity-60" />
                      {c}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                    <GlassCard className="overflow-hidden hover:border-white/20 transition-colors h-full flex flex-col">
                      {/* Cover image + metric badge */}
                      <div className="relative h-40">
                        <img
                          src={p.cover}
                          alt={p.title}
                          className="h-full w-full object-cover"
                          loading={i < 6 ? "eager" : "lazy"}
                          decoding="async"
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_COVER; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        {p.metric && (
                          <span className="absolute top-3 right-3 rounded-full bg-indigo-600/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-white">
                            {p.metric}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col gap-3 flex-1">
                        <div>
                          <p className="font-semibold text-slate-100">{p.title}</p>
                          <p className="text-sm text-slate-400 mt-1">{p.summary}</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {p.tags.map((t) => (
                            <Badge key={t} className="rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs">
                              {t}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 flex-1">{p.details}</p>
                        <div className="flex items-center gap-4 pt-1">
                          {p.links.code !== "#" && (
                            <a href={p.links.code} target="_blank" rel="noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                              Code <ArrowRight className="h-3.5 w-3.5" />
                            </a>
                          )}
                          {p.links.demo !== "#" && (
                            <a href={p.links.demo} target="_blank" rel="noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                              Demo <ArrowRight className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="scroll-mt-24 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Skills</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILLS.map((group, i) => (
              <Reveal key={group.label} delay={i * 0.08}>
                <GlassCard className="p-5 h-full">
                  <p className="text-xs uppercase tracking-widest text-indigo-400 mb-3">{group.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((s) => (
                      <Badge key={s} className="rounded-full bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 transition-colors">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          {/* Interests strip */}
          <Reveal delay={0.15}>
            <GlassCard className="mt-4 p-5">
              <p className="text-xs uppercase tracking-widest text-indigo-400 mb-3">What I Enjoy</p>
              <div className="flex flex-wrap gap-2">
                {["Causal inference", "Experiment design", "Forecasting", "Cohort analysis", "Segmentation", "Stress testing", "Scenario analysis"].map((s) => (
                  <Badge key={s} className="rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                    {s}
                  </Badge>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="scroll-mt-24 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Contact</h2>
          <GlassCard className="p-6 sm:p-8 max-w-2xl">
            <p className="font-semibold text-slate-100 text-lg">Let's work together</p>
            <p className="text-sm text-slate-400 mt-1 mb-6">Send a note and I'll get back within 1–2 business days.</p>
            <form className="grid sm:grid-cols-2 gap-4" onSubmit={handleContactSubmit}>
              <Input name="name" placeholder="Your name" required
                className="bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-500" />
              <Input name="email" type="email" placeholder="Your email" required
                className="bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-500" />
              <div className="sm:col-span-2">
                <Input name="subject" placeholder="Subject" required
                  className="bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-500" />
              </div>
              <div className="sm:col-span-2">
                <Textarea name="message" placeholder="Message" required
                  className="min-h-[120px] bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-500" />
              </div>
              <button
                type="submit"
                disabled={mailStatus === "sending"}
                className="sm:col-span-2 rounded-xl w-full h-11 bg-indigo-600 text-white font-medium hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition appearance-none [-webkit-appearance:none]"
              >
                {mailStatus === "sending" ? "Sending…" : "Send Message"}
              </button>
              {mailStatus === "sent" && (
                <p className="sm:col-span-2 text-sm text-emerald-400">Thanks! I've received your message.</p>
              )}
              {mailStatus === "error" && (
                <p className="sm:col-span-2 text-sm text-red-400">Something went wrong. Email me directly at {PROFILE.email}</p>
              )}
              <p className="sm:col-span-2 text-xs text-slate-500">
                Or email directly at <a className="underline text-slate-400" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </p>
            </form>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href={PROFILE.socials.github} className="text-slate-400 hover:text-slate-200 transition-colors" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href={PROFILE.socials.linkedin} className="text-slate-400 hover:text-cyan-300 transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={`mailto:${PROFILE.email}`} className="text-slate-400 hover:text-fuchsia-300 transition-colors" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
