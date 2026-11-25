import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { useReducedMotion } from "framer-motion";
import { GlassCard } from "../components/GlassCard";
import { Reveal } from "../components/Reveal";
import { MetricCounter } from "../components/MetricCounter";

const METRICS = [
  {
    id: "records",
    to: 2,
    format: (n) => `${n.toFixed(1)}M+`,
    label: "Records Processed",
    context: "BCMEA Labour Forecasting",
    color: "text-indigo-300",
    description: "Payroll records integrated across dock and vessel workstreams",
  },
  {
    id: "mape",
    to: 7.45,
    format: (n) => `${n.toFixed(2)}%`,
    label: "Forecast MAPE",
    context: "BCMEA — vs ~40% legacy",
    color: "text-emerald-300",
    description: "Mean absolute percentage error achieved on the final forecasting model",
  },
  {
    id: "ocr",
    to: 95,
    format: (n) => `${Math.round(n)}%`,
    label: "OCR Accuracy",
    context: "EY Document Redaction",
    color: "text-cyan-300",
    description: "Sensitive identifier detection accuracy in automated redaction pipeline",
  },
  {
    id: "participants",
    to: 5176,
    format: (n) => Math.round(n).toLocaleString(),
    label: "Research Participants",
    context: "UBC Clinical Cohort",
    color: "text-fuchsia-300",
    description: "Participants analyzed across nine research sites in national cohort study",
  },
  {
    id: "efficiency",
    to: 40,
    format: (n) => `${Math.round(n)}%`,
    label: "Processing Efficiency",
    context: "UBC Workflow Automation",
    color: "text-amber-300",
    description: "Improvement in analytical processing efficiency through workflow automation",
  },
  {
    id: "hours",
    to: 10,
    format: (n) => `~${Math.round(n)} hrs`,
    label: "Manual Work Saved Weekly",
    context: "SFU OCR Automation",
    color: "text-rose-300",
    description: "Hours of manual manuscript processing eliminated per week",
  },
];

const FORECAST_DATA = [
  { name: "Legacy Baseline", mape: 40, label: "~40%" },
  { name: "Achieved Model", mape: 7.45, label: "7.45%" },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-slate-900/95 px-3 py-2 text-sm shadow-xl backdrop-blur-sm">
      <p className="font-medium text-slate-100">{label}</p>
      <p className="text-slate-300">{payload[0].value}% MAPE</p>
      <p className="text-xs text-slate-500 mt-0.5">Lower is better</p>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">{title}</h2>
      {subtitle && <p className="text-slate-400 mt-2 text-sm">{subtitle}</p>}
      <div className="mt-3 h-px w-14 bg-gradient-to-r from-indigo-500 to-cyan-500" />
    </div>
  );
}

export function ImpactDashboard() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="impact" className="scroll-mt-20 py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          title="Professional Impact"
          subtitle="Quantified results from professional and academic work. Each metric reflects a specific project or experience."
        />

        {/* Metric cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {METRICS.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.06}>
              <GlassCard className="p-4 flex flex-col h-full hover:border-white/20 transition-colors duration-200">
                <span className={`text-2xl font-bold ${m.color} leading-none`} aria-label={m.label}>
                  <MetricCounter to={m.to} format={m.format} />
                </span>
                <span className="text-xs font-medium text-slate-200 mt-2 leading-tight">
                  {m.label}
                </span>
                <span className="text-xs text-slate-500 mt-1 leading-tight">{m.context}</span>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* BCMEA Forecast Comparison Chart */}
        <Reveal delay={0.15}>
          <GlassCard className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-indigo-400 font-medium mb-1">
                  BCMEA Labour Demand Forecasting
                </p>
                <h3 className="text-lg font-bold text-slate-100">
                  Forecast Error Reduction
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Comparison of legacy forecast MAPE against the final model MAPE.
                  Lower MAPE indicates better forecast accuracy.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm bg-red-500/70" aria-hidden="true" />
                  Legacy
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm bg-emerald-500/70" aria-hidden="true" />
                  Achieved
                </span>
              </div>
            </div>

            <div
              className="h-56 sm:h-64"
              role="img"
              aria-label="Bar chart showing BCMEA forecast error: legacy baseline approximately 40% MAPE versus achieved model 7.45% MAPE. Lower MAPE is better."
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={FORECAST_DATA}
                  margin={{ top: 16, right: 24, left: 0, bottom: 4 }}
                  barSize={72}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                    domain={[0, 48]}
                    width={42}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar
                    dataKey="mape"
                    radius={[6, 6, 0, 0]}
                    isAnimationActive={!shouldReduce}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  >
                    <Cell fill="rgb(239 68 68 / 0.65)" />
                    <Cell fill="rgb(52 211 153 / 0.75)" />
                    <LabelList
                      dataKey="label"
                      position="top"
                      style={{ fill: "#cbd5e1", fontSize: 13, fontWeight: 600 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-4 text-xs text-slate-500 text-center">
              MAPE = Mean Absolute Percentage Error · Lower values indicate better forecast accuracy ·
              Reduction from approximately 40% to 7.45% across dock and vessel workstreams.
            </p>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
