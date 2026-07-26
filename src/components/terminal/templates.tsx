import React from "react";
import { CONTACT_INFO, EXPERIENCES_DATA, PROJECTS_DATA, SKILLS_DATA } from "./constants";

export function CommandEcho({ input }: { input: string }) {
  return (
    <div className="flex items-center gap-2 text-xs md:text-sm font-mono my-1">
      <span className="text-[#64ffda]">➜</span>
      <span className="text-[#8892b0]">jasim@portfolio</span>
      <span className="text-slate-200 font-medium">{input}</span>
    </div>
  );
}

export function ErrorOutput({ command }: { command: string }) {
  return (
    <div className="text-red-400 font-mono text-xs md:text-sm mb-3">
      Command not recognized: <span className="font-semibold text-red-300">&quot;{command}&quot;</span>. Type{" "}
      <span className="text-[#64ffda] underline cursor-pointer">help</span> to view available commands.
    </div>
  );
}

export function HelpOutput() {
  return (
    <div className="space-y-3 font-mono text-xs md:text-sm text-slate-300 mb-4">
      <p className="text-[#64ffda] font-semibold">Available Commands:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-2">
        <div>
          <span className="text-[#64ffda] w-24 inline-block font-semibold">whoami / about</span>
          <span className="text-slate-400">— View Jasim&apos;s biography</span>
        </div>
        <div>
          <span className="text-[#64ffda] w-24 inline-block font-semibold">skills</span>
          <span className="text-slate-400">— List technical skills & tech stack</span>
        </div>
        <div>
          <span className="text-[#64ffda] w-24 inline-block font-semibold">experience / xp</span>
          <span className="text-slate-400">— View career & backend engineering history</span>
        </div>
        <div>
          <span className="text-[#64ffda] w-24 inline-block font-semibold">projects</span>
          <span className="text-slate-400">— View featured AI & backend projects</span>
        </div>
        <div>
          <span className="text-[#64ffda] w-24 inline-block font-semibold">pr &lt;id&gt;</span>
          <span className="text-slate-400">— View project details (e.g. &quot;pr 1&quot;)</span>
        </div>
        <div>
          <span className="text-[#64ffda] w-24 inline-block font-semibold">contact</span>
          <span className="text-slate-400">— Display contact details & email</span>
        </div>
        <div>
          <span className="text-[#64ffda] w-24 inline-block font-semibold">social</span>
          <span className="text-slate-400">— Links to GitHub & LinkedIn</span>
        </div>
        <div>
          <span className="text-[#64ffda] w-24 inline-block font-semibold">clear</span>
          <span className="text-slate-400">— Clear terminal screen</span>
        </div>
      </div>
    </div>
  );
}

export function AboutOutput() {
  return (
    <div className="space-y-2 font-mono text-xs md:text-sm text-slate-300 mb-4 border-l-2 border-[#64ffda] pl-4 py-1">
      <p className="text-white font-bold text-base">{CONTACT_INFO.name}</p>
      <p className="text-[#64ffda]">{CONTACT_INFO.title}</p>
      <p className="text-slate-400 text-xs">Based in {CONTACT_INFO.location}</p>
      <p className="mt-2 text-slate-300 leading-relaxed">
        I am a dedicated Backend Software Engineer and AI Integration Developer focused on building high-performance,
        scalable enterprise API architectures, custom Retrieval-Augmented Generation (RAG) systems, and multi-agent AI
        automation workflows using Node.js, TypeScript, Python, and LangGraph.
      </p>
    </div>
  );
}

export function SkillsOutput() {
  return (
    <div className="space-y-3 font-mono text-xs md:text-sm text-slate-300 mb-4">
      <p className="text-[#64ffda] font-semibold">Technical Expertise:</p>
      <div className="space-y-2 pl-2">
        {Object.entries(SKILLS_DATA).map(([category, items]) => (
          <div key={category} className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4">
            <span className="text-slate-200 font-bold min-w-[160px]">{category}:</span>
            <div className="flex flex-wrap gap-1.5">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded bg-[rgba(100,255,218,0.1)] text-[#64ffda] border border-[rgba(100,255,218,0.2)] text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExperienceOutput() {
  return (
    <div className="space-y-4 font-mono text-xs md:text-sm text-slate-300 mb-4">
      <p className="text-[#64ffda] font-semibold">Work Experience:</p>
      <div className="space-y-4 pl-2">
        {EXPERIENCES_DATA.map((exp, index) => (
          <div key={index} className="space-y-1 bg-white/5 p-3 rounded-lg border border-white/5">
            <div className="flex flex-wrap justify-between items-baseline">
              <span className="text-white font-bold">{exp.role} <span className="text-[#64ffda]">@ {exp.company}</span></span>
              <span className="text-xs text-slate-400">{exp.range}</span>
            </div>
            <p className="text-xs text-slate-400">{exp.location}</p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs mt-2 pl-1">
              {exp.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectsOutput() {
  return (
    <div className="space-y-3 font-mono text-xs md:text-sm text-slate-300 mb-4">
      <p className="text-[#64ffda] font-semibold">Featured Projects (Type &quot;pr &lt;id&gt;&quot; for details):</p>
      <div className="space-y-2 pl-2">
        {PROJECTS_DATA.map((proj) => (
          <div key={proj.id} className="p-2.5 rounded bg-white/5 border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <span className="text-[#64ffda] font-bold mr-2">[{proj.id}]</span>
              <span className="text-white font-semibold">{proj.title}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {proj.tech.slice(0, 4).map((t) => (
                <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectDetailsOutput({ projectId }: { projectId: number }) {
  const proj = PROJECTS_DATA.find((p) => p.id === projectId);
  if (!proj) {
    return <div className="text-red-400 text-xs font-mono">Project ID #{projectId} not found.</div>;
  }

  return (
    <div className="space-y-2 font-mono text-xs md:text-sm text-slate-300 mb-4 p-3 bg-white/5 rounded border border-[#64ffda]/30">
      <p className="text-white font-bold text-base">
        Project #{proj.id}: <span className="text-[#64ffda]">{proj.title}</span>
      </p>
      <p className="text-slate-300 text-xs leading-relaxed">{proj.description}</p>
      <div className="flex flex-wrap gap-1.5 my-2">
        {proj.tech.map((t) => (
          <span key={t} className="text-xs px-2 py-0.5 rounded bg-[#64ffda]/10 text-[#64ffda] border border-[#64ffda]/20">
            {t}
          </span>
        ))}
      </div>
      <a
        href={proj.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-[#64ffda] hover:underline text-xs mt-1"
      >
        View on GitHub ↗
      </a>
    </div>
  );
}

export function ContactOutput() {
  return (
    <div className="space-y-2 font-mono text-xs md:text-sm text-slate-300 mb-4 border-l-2 border-[#64ffda] pl-4 py-1">
      <p className="text-[#64ffda] font-semibold">Contact Information:</p>
      <p><span className="text-slate-400 w-20 inline-block">Name:</span> {CONTACT_INFO.name}</p>
      <p><span className="text-slate-400 w-20 inline-block">Email:</span> <a href={`mailto:${CONTACT_INFO.email}`} className="text-[#64ffda] hover:underline">{CONTACT_INFO.email}</a></p>
      <p><span className="text-slate-400 w-20 inline-block">Phone:</span> {CONTACT_INFO.phone}</p>
      <p><span className="text-slate-400 w-20 inline-block">Location:</span> {CONTACT_INFO.location}</p>
    </div>
  );
}

export function SocialOutput() {
  return (
    <div className="space-y-2 font-mono text-xs md:text-sm text-slate-300 mb-4">
      <p className="text-[#64ffda] font-semibold">Social Profiles:</p>
      <div className="space-y-1 pl-2">
        <p>
          <span className="text-slate-400 w-24 inline-block">GitHub:</span>{" "}
          <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" className="text-[#64ffda] hover:underline">
            {CONTACT_INFO.github}
          </a>
        </p>
        <p>
          <span className="text-slate-400 w-24 inline-block">LinkedIn:</span>{" "}
          <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#64ffda] hover:underline">
            {CONTACT_INFO.linkedin}
          </a>
        </p>
      </div>
    </div>
  );
}
