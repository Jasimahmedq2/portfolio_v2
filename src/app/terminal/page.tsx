import React from 'react';
import Terminal from '@/components/terminal';

export const metadata = {
  title: 'Terminal | Jasim Ahmed',
  description: 'Interactive Terminal Portfolio for Jasim Ahmed - Backend & AI Integration Developer',
};

export default function TerminalPage() {
  return (
    <main className="min-h-screen pt-28 pb-12 px-4 md:px-8 max-w-6xl mx-auto flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-between mb-4 px-2">
        <h1 className="text-xl md:text-2xl font-mono text-[#ccd6f6] font-bold">
          <span className="text-[#64ffda] mr-2">▸</span>Interactive Terminal
        </h1>
        <a
          href="/"
          className="text-xs font-mono text-[#64ffda] hover:underline flex items-center gap-1"
        >
          ← Back to Portfolio
        </a>
      </div>
      <Terminal />
    </main>
  );
}
