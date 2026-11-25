import { Award, GraduationCap, Users, ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "../components/layout/Section";
import { SpotlightCard } from "../components/SpotlightCard";
import { Reveal } from "../components/Reveal";
import { SignalPlot } from "../components/visuals/SignalPlot";
import { PROFILE } from "../data/profile";
import { EXPERIENCE } from "../data/experience";

// Focus areas are the domains named in the existing professional summary.
const FOCUS = [
  "Credit Risk Analytics",
  "Machine Learning",
  "Forecasting",
  "Data Engineering",
  "Business Intelligence",
  "Computer Vision",
  "AI & Automation",
];

// Unique organisations, in order, derived from work history.
const ORGS = [...new Map(EXPERIENCE.map((e) => [e.monogram, e.company.split(" — ")[0]])).entries()];

export function About() {
  const [lead, ...rest] = PROFILE.about;
  const edu = PROFILE.education[0];
  const cert = PROFILE.certifications[0];
  const lead_ = PROFILE.leadership[0];

  return (
    <Section id="about">
      <SectionHeader
        index="01"
        eyebrow="About"
        title="Analytical depth,"
        accent="business clarity."
        description="Data science graduate working across financial services, research and consulting — from credit risk pipelines to forecasting and computer vision."
      />

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-12">
        {/* ── Bio: editorial, widest tile ── */}
        <Reveal className="lg:col-span-7 lg:row-span-2">
          <SpotlightCard className="surface h-full overflow-hidden p-6 sm:p-8">
            <p className="eyebrow">Profile</p>
            <p className="mt-5 text-xl sm:text-[22px] leading-snug tracking-tight text-ink text-balance">{lead}</p>
            <div className="mt-6 grid gap-4 text-[15px] leading-relaxed text-zinc-300 xl:grid-cols-2 xl:gap-x-8">
              {rest.map((p, i) => (
                <p key={i} className={i === 1 ? "xl:row-span-2" : ""}>{p}</p>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        {/* ── Education: crest + coursework ── */}
        <Reveal delay={0.05} className="lg:col-span-5">
          <SpotlightCard className="surface-elevated h-full p-6" tone="99,102,241">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-indigo/40 bg-indigo/10 text-indigo-300">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="eyebrow">Education</p>
                <h3 className="mt-2 text-lg font-semibold text-ink">{edu.institution}</h3>
                <p className="text-sm text-indigo-200">{edu.degree}</p>
                <p className="mt-1 font-mono text-[11px] text-subtle">{edu.period} · {edu.location}</p>
              </div>
            </div>
            <ul className="mt-5 space-y-2 border-t border-line pt-4 text-sm text-zinc-300">
              {edu.highlights.map((h) => (
                <li key={h} className="flex gap-2.5">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-indigo-300" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>

        {/* ── Certification + leadership: two compact tiles ── */}
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:col-span-5">
          <Reveal delay={0.1}>
            <SpotlightCard className="surface h-full p-5" tone="34,211,238">
              <Award className="h-5 w-5 text-cyan" aria-hidden="true" />
              <p className="eyebrow mt-4">Certification</p>
              <h3 className="mt-2 text-[15px] font-semibold leading-snug text-ink">{cert.name}</h3>
              <p className="mt-1 text-xs text-muted">{cert.issuer} · {cert.date}</p>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.15}>
            <SpotlightCard className="surface h-full p-5">
              <Users className="h-5 w-5 text-violet-soft" aria-hidden="true" />
              <p className="eyebrow mt-4">Leadership</p>
              <h3 className="mt-2 text-[15px] font-semibold leading-snug text-ink">
                {lead_.role}, {lead_.organization}
              </h3>
              <p className="mt-1 text-xs text-muted">{lead_.period}</p>
              <p className="mt-2 text-sm text-zinc-300">{lead_.description}</p>
            </SpotlightCard>
          </Reveal>
        </div>

        {/* ── Focus areas with signal illustration ── */}
        <Reveal delay={0.05} className="lg:col-span-8">
          <SpotlightCard className="surface relative h-full overflow-hidden p-6">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_minmax(0,260px)]">
              <div>
                <p className="eyebrow">Focus areas</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {FOCUS.map((f) => (
                    <li key={f} className="rounded-full border border-line-strong bg-white/[0.03] px-3.5 py-1.5 text-sm text-zinc-200">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <SignalPlot className="hidden h-32 w-full md:block" />
            </div>
          </SpotlightCard>
        </Reveal>

        {/* ── Organisations ── */}
        <Reveal delay={0.1} className="lg:col-span-4">
          <SpotlightCard className="surface h-full p-6" tone="34,211,238">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Worked with</p>
              <a href="#experience" className="link-quiet text-xs">
                Timeline <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {ORGS.map(([mono, name]) => (
                <li key={mono} className="flex items-center gap-2.5 rounded-xl border border-line bg-white/[0.02] p-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-elevated font-mono text-[10px] font-medium text-ink ring-1 ring-white/10">
                    {mono}
                  </span>
                  <span className="text-xs leading-tight text-zinc-300">{name}</span>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  );
}
