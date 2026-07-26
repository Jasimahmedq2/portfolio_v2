'use client';

import React from 'react';

const SUGGESTIONS = [
  "What is Jasim's core tech stack?",
  "Tell me about Jasim's RAG & AI experience",
  "What are Jasim's featured projects?",
  "How can I contact or hire Jasim?",
] as const;

interface ChatSuggestionsProps {
  onSelectSuggestion: (question: string) => void;
}

export function ChatSuggestions({ onSelectSuggestion }: ChatSuggestionsProps) {
  return (
    <div className="my-3 space-y-1.5">
      <p className="text-[11px] font-mono text-[#8892b0] px-1">Suggested questions:</p>
      <div className="flex flex-wrap gap-1.5">
        {SUGGESTIONS.map((question, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectSuggestion(question)}
            className="text-xs font-mono text-[#64ffda] bg-[#64ffda]/5 hover:bg-[#64ffda]/15 border border-[#64ffda]/20 hover:border-[#64ffda]/50 px-2.5 py-1 rounded-full transition-all text-left cursor-pointer active:scale-95 shrink-0"
          >
            💬 {question}
          </button>
        ))}
      </div>
    </div>
  );
}
export default ChatSuggestions;
