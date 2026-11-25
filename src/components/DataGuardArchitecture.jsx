import { useState } from "react";

const NODES = [
  {
    step: 1,
    name: "Synthetic Data",
    desc: "Credit risk test dataset with deliberately introduced anomalies across PD, LGD, EAD and credit rating fields.",
    colorBg: "bg-slate-700/60",
    colorBorder: "border-slate-500/50",
    colorText: "text-slate-200",
    colorDot: "bg-slate-400",
    label: "Data Source",
  },
  {
    step: 2,
    name: "PostgreSQL",
    desc: "Data storage and retrieval for raw credit risk records.",
    colorBg: "bg-blue-900/40",
    colorBorder: "border-blue-600/40",
    colorText: "text-blue-200",
    colorDot: "bg-blue-400",
    label: "Storage",
  },
  {
    step: 3,
    name: "n8n Workflow",
    desc: "Automated orchestration of the validation pipeline — no manual triggering required.",
    colorBg: "bg-orange-900/30",
    colorBorder: "border-orange-600/40",
    colorText: "text-orange-200",
    colorDot: "bg-orange-400",
    label: "Orchestration",
  },
  {
    step: 4,
    name: "FastAPI Engine",
    desc: "Validation API endpoints performing all data quality checks against configurable thresholds.",
    colorBg: "bg-emerald-900/30",
    colorBorder: "border-emerald-600/40",
    colorText: "text-emerald-200",
    colorDot: "bg-emerald-400",
    label: "Validation",
  },
  {
    step: 5,
    name: "PostgreSQL",
    desc: "Anomaly results persisted for historical tracking and trend analysis.",
    colorBg: "bg-blue-900/40",
    colorBorder: "border-blue-600/40",
    colorText: "text-blue-200",
    colorDot: "bg-blue-400",
    label: "Anomaly Store",
  },
  {
    step: 6,
    name: "Streamlit Dashboard",
    desc: "Interactive monitoring UI for anomaly review, severity filtering and historical analysis.",
    colorBg: "bg-rose-900/30",
    colorBorder: "border-rose-600/40",
    colorText: "text-rose-200",
    colorDot: "bg-rose-400",
    label: "Dashboard",
  },
];

function Arrow() {
  return (
    <div className="hidden sm:flex items-center justify-center w-8 shrink-0" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="rgb(99 102 241 / 0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function DownArrow() {
  return (
    <div className="sm:hidden flex items-center justify-center h-6" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4V16M10 16L5 11M10 16L15 11" stroke="rgb(99 102 241 / 0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function DataGuardArchitecture() {
  const [hovered, setHovered] = useState(null);

  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-indigo-400 mb-4 font-medium">
        System Architecture
      </p>

      {/* Desktop: horizontal flow */}
      <div
        className="hidden sm:flex items-stretch gap-0 overflow-x-auto pb-2"
        role="img"
        aria-label="DataGuard AI system architecture: Synthetic Data feeds into PostgreSQL storage, orchestrated by n8n Workflow, processed by FastAPI Validation Engine, stored in PostgreSQL Anomaly Store, displayed in Streamlit Dashboard"
      >
        {NODES.map((node, i) => (
          <div key={node.step} className="flex items-center">
            <div
              className={`relative rounded-xl border ${node.colorBorder} ${node.colorBg} p-3 w-28 flex flex-col items-center text-center cursor-default transition-all duration-200 ${hovered === i ? "scale-105 shadow-lg" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className={`w-5 h-5 rounded-full ${node.colorDot} flex items-center justify-center text-slate-900 text-xs font-bold mb-2`}>
                {node.step}
              </span>
              <p className={`text-xs font-semibold ${node.colorText} leading-tight`}>{node.name}</p>
              <span className="mt-1 text-xs text-slate-500">{node.label}</span>
            </div>
            {i < NODES.length - 1 && <Arrow />}
          </div>
        ))}
      </div>

      {/* Mobile: vertical flow */}
      <div
        className="sm:hidden flex flex-col items-stretch gap-0"
        role="img"
        aria-label="DataGuard AI system architecture pipeline"
      >
        {NODES.map((node, i) => (
          <div key={node.step}>
            <div className={`rounded-xl border ${node.colorBorder} ${node.colorBg} p-3 flex items-start gap-3`}>
              <span className={`w-6 h-6 rounded-full ${node.colorDot} flex items-center justify-center text-slate-900 text-xs font-bold shrink-0 mt-0.5`}>
                {node.step}
              </span>
              <div>
                <p className={`text-sm font-semibold ${node.colorText}`}>{node.name}</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{node.desc}</p>
              </div>
            </div>
            {i < NODES.length - 1 && <DownArrow />}
          </div>
        ))}
      </div>

      {/* Hover description (desktop) */}
      {hovered !== null && (
        <div className="hidden sm:block mt-3 rounded-lg bg-white/5 border border-white/10 p-3 text-sm text-slate-300 leading-relaxed min-h-[48px] transition-all">
          <span className={`font-semibold ${NODES[hovered].colorText}`}>{NODES[hovered].name}: </span>
          {NODES[hovered].desc}
        </div>
      )}
    </div>
  );
}
