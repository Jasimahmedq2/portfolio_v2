'use client';

import React from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  // Parse out custom [NAVIGATE: Label | target] recommendation tags if present
  let cleanContent = message.content;
  let actionButton: { label: string; target: string } | null = null;

  const navMatch = cleanContent.match(/\[NAVIGATE:\s*(.*?)\s*\|\s*(.*?)\]/);
  if (navMatch) {
    actionButton = {
      label: navMatch[1].trim(),
      target: navMatch[2].trim(),
    };
    cleanContent = cleanContent.replace(/\[NAVIGATE:\s*.*?\s*\|\s*.*?\]/g, '').trim();
  }

  const handleNavigate = (target: string) => {
    if (target.startsWith('#')) {
      const elementId = target.substring(1);
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (window.location.pathname !== '/') {
        window.location.href = `/${target}`;
      }
    } else if (target.startsWith('/')) {
      window.location.href = target;
    } else {
      window.open(target, '_blank');
    }
  };

  // Simple Markdown inline formatter for bold, code, links
  const renderFormattedContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lIdx) => {
      const isBullet = line.trim().startsWith('-');
      const cleanLine = isBullet ? line.trim().replace(/^-\s*/, '') : line;

      const parts = cleanLine.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|`.*?`)/g);

      const parsedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-semibold text-[#64ffda]">
              {part.slice(2, -2)}
            </strong>
          );
        } else if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={pIdx}
              className="bg-black/30 text-[#64ffda] px-1.5 py-0.5 rounded font-mono text-xs"
            >
              {part.slice(1, -1)}
            </code>
          );
        } else if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
          const match = part.match(/\[(.*?)\]\((.*?)\)/);
          if (match) {
            return (
              <a
                key={pIdx}
                href={match[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#64ffda] underline hover:brightness-125 font-medium"
              >
                {match[1]} ↗
              </a>
            );
          }
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={lIdx} className="ml-4 list-disc text-slate-200 my-0.5">
            {parsedLine}
          </li>
        );
      }

      return (
        <p key={lIdx} className={lIdx > 0 ? 'mt-1.5' : ''}>
          {parsedLine}
        </p>
      );
    });
  };

  return (
    <div
      className={`flex items-start gap-2.5 my-2.5 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar Icon */}
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 shadow-md ${
          isUser
            ? 'bg-[#8892b0] text-[#0a192f]'
            : 'bg-[#64ffda]/10 text-[#64ffda] border border-[#64ffda]/30'
        }`}
      >
        {isUser ? 'You' : 'AI'}
      </div>

      {/* Message Bubble */}
      <div
        className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs md:text-sm leading-relaxed font-sans shadow-md ${
          isUser
            ? 'bg-[#64ffda]/15 text-slate-100 border border-[#64ffda]/30 rounded-tr-none'
            : 'bg-[#020c1b]/90 text-slate-200 border border-white/10 rounded-tl-none'
        }`}
      >
        <div className="space-y-1">{renderFormattedContent(cleanContent)}</div>

        {/* Recommended Contextual Page Action Button */}
        {actionButton && (
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center">
            <button
              type="button"
              onClick={() => handleNavigate(actionButton!.target)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#64ffda]/10 hover:bg-[#64ffda]/25 border border-[#64ffda]/35 text-xs font-mono text-[#64ffda] transition-all flex items-center justify-between cursor-pointer group shadow-sm hover:scale-[1.02] active:scale-98"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <span>🎯</span>
                <span>{actionButton.label}</span>
              </span>
              <span className="group-hover:translate-x-1 transition-transform font-bold">↗</span>
            </button>
          </div>
        )}

        {message.timestamp && (
          <div
            className={`text-[10px] font-mono mt-1.5 ${
              isUser ? 'text-[#64ffda]/70 text-right' : 'text-slate-400'
            }`}
          >
            {message.timestamp}
          </div>
        )}
      </div>
    </div>
  );
}
export default ChatMessage;
