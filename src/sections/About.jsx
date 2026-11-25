import { GlassCard } from "../components/GlassCard";
import { Reveal } from "../components/Reveal";
import { PROFILE } from "../data/profile";

function SectionHeader({ title }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">{title}</h2>
      <div className="mt-3 h-px w-14 bg-gradient-to-r from-indigo-500 to-cyan-500" />
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-start">

        {/* ── Left: bio ── */}
        <Reveal>
          <div>
            <SectionHeader title="About" />
            <div className="space-y-4 text-slate-400 leading-relaxed text-sm sm:text-base">
              {PROFILE.about.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Right: education & credentials ── */}
        <div className="space-y-4">
          <Reveal delay={0.1}>
            <GlassCard className="p-6">
              <p className="text-xs uppercase tracking-widest text-indigo-400 mb-4">Education</p>
              {PROFILE.education.map((edu) => (
                <div key={edu.institution}>
                  <p className="font-semibold text-slate-100">{edu.institution}</p>
                  <p className="text-sm text-indigo-300 mt-0.5">{edu.degree}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {edu.period} · {edu.location}
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-slate-400 list-disc pl-4">
                    {edu.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </GlassCard>
          </Reveal>

          <Reveal delay={0.15}>
            <GlassCard className="p-6">
              <p className="text-xs uppercase tracking-widest text-indigo-400 mb-4">
                Certifications
              </p>
              <div className="space-y-3">
                {PROFILE.certifications.map((cert) => (
                  <div key={cert.name}>
                    <p className="font-semibold text-slate-100 text-sm">{cert.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{cert.issuer}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Completed {cert.date}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.2}>
            <GlassCard className="p-6">
              <p className="text-xs uppercase tracking-widest text-indigo-400 mb-4">
                Leadership
              </p>
              {PROFILE.leadership.map((l) => (
                <div key={l.organization}>
                  <p className="font-semibold text-slate-100 text-sm">{l.role}</p>
                  <p className="text-sm text-cyan-300 mt-0.5">{l.organization}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{l.period}</p>
                  <p className="text-sm text-slate-400 mt-1">{l.description}</p>
                </div>
              ))}
            </GlassCard>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
