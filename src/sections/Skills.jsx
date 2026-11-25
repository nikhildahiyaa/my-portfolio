import { GlassCard } from "../components/GlassCard";
import { Reveal } from "../components/Reveal";
import { SKILLS } from "../data/skills";

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">{title}</h2>
      {subtitle && <p className="text-slate-400 mt-2 text-sm">{subtitle}</p>}
      <div className="mt-3 h-px w-14 bg-gradient-to-r from-indigo-500 to-cyan-500" />
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          title="Skills"
          subtitle="Technologies, tools and methods applied across professional and academic work."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILLS.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.06}>
              <GlassCard className="p-5 h-full hover:border-white/20 transition-colors duration-200">
                <p className="text-xs uppercase tracking-widest text-indigo-400 mb-3 font-medium">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 transition-colors duration-150 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
