import React from 'react';

export const metadata = {
  title: 'Student Information Page | Jasim Ahmed',
  description: 'Academic background and student information portal for Jasim Ahmed - World University of Bangladesh',
};

export default function EducationPage() {
  const educationList = [
    {
      institution: 'World University of Bangladesh',
      qualification: 'Bachelor’s Degree (MIS)',
      period: '2025 – Present',
      status: 'Currently Pursuing',
      description:
        'Pursuing Bachelor of Business Administration (BBA) with specialization in Management Information Systems (MIS), business analytics, organizational management, and information technologies.',
    },
    {
      institution: 'Rajnagar Technical School & College',
      qualification: 'Higher Secondary Certificate (HSC)',
      period: '2024',
      status: 'Completed',
      description:
        'Completed Higher Secondary Certificate education with a focus on core scientific principles, technical logic, and academic studies.',
    },
    {
      institution: 'Zillur Rahman School and College',
      qualification: 'Secondary School Certificate (SSC)',
      period: '2022',
      status: 'Completed',
      description:
        'Completed Secondary School Certificate education with academic excellence and active participation in school co-curricular activities.',
    },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto flex flex-col items-center">
      {/* Top Navigation Header */}
      <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-white/10 font-mono">
        <h1 className="text-2xl md:text-3xl text-slate-100 font-bold flex items-center gap-2">
          <span className="text-[#64ffda]">▸</span> Student Information Page
        </h1>
        <a
          href="/"
          className="text-xs text-[#64ffda] hover:underline flex items-center gap-1 transition-all"
        >
          ← Back to Portfolio
        </a>
      </div>

      {/* Student Welcome Banner */}
      <div className="w-full bg-[#0a192f]/90 backdrop-blur-xl border border-[#64ffda]/25 rounded-2xl p-6 md:p-8 mb-8 shadow-[0_15px_40px_rgba(2,12,27,0.7)]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-1">Jasim Ahmed</h2>
            <p className="text-xs md:text-sm font-mono text-[#64ffda]">
              BBA Student @ World University of Bangladesh
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-[#64ffda]/10 border border-[#64ffda]/30 text-[#64ffda] shadow-sm">
              Reg No: WUB01/26/87/5145
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[#64ffda]/10 border border-[#64ffda]/30 text-[#64ffda] shadow-sm">
              Roll / Batch: 5145 / 87B
            </span>
          </div>
        </div>

        <p className="mt-6 text-sm md:text-base text-slate-300 leading-relaxed font-sans">
          Hi! I&apos;m Jasim Ahmed, a BBA student at the World University of Bangladesh. Welcome to my portal where I showcase my academic progress, institutional qualifications, and educational achievements. Dive in to explore my work!
        </p>
      </div>

      {/* Student Credentials Summary Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 font-mono text-xs">
        <div className="bg-[#020c1b]/80 border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-[#64ffda]/30 transition-all">
          <span className="text-[#8892b0] uppercase tracking-wider text-[10px] mb-1 font-semibold">
            Registration Number
          </span>
          <span className="text-lg font-bold text-slate-100">WUB01/26/87/5145</span>
        </div>
        <div className="bg-[#020c1b]/80 border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-[#64ffda]/30 transition-all">
          <span className="text-[#8892b0] uppercase tracking-wider text-[10px] mb-1 font-semibold">
            Roll / Batch Code
          </span>
          <span className="text-lg font-bold text-slate-100">5145 / 87B</span>
        </div>
      </div>

      {/* Academic Qualifications Timeline */}
      <div className="w-full space-y-6">
        <h3 className="text-lg font-mono font-bold text-[#64ffda] flex items-center gap-2 mb-6">
          <span>🎓</span> Academic Qualifications & Institutions
        </h3>

        <div className="space-y-6">
          {educationList.map((item, index) => (
            <div
              key={index}
              className="bg-[#0a192f]/80 backdrop-blur-md border border-white/10 hover:border-[#64ffda]/40 rounded-xl p-6 transition-all duration-300 shadow-md group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-lg font-bold text-slate-100 group-hover:text-[#64ffda] transition-colors">
                    {item.institution}
                  </h4>
                  <p className="text-sm font-mono text-[#64ffda] mt-0.5">{item.qualification}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded bg-black/40 border border-white/5 text-[#8892b0]">
                    {item.period}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#64ffda]/10 border border-[#64ffda]/20 text-[#64ffda]">
                    {item.status}
                  </span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
