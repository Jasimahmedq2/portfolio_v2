'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ASCII_ART, QUICK_COMMANDS, SOUNDS } from './constants';
import { COMMAND_REGISTRY, parseProjectCommand, renderProjectDetails } from './commands';
import { CommandEcho, ErrorOutput, HelpOutput } from './templates';

interface TerminalProps {
  onClose?: () => void;
  isModal?: boolean;
}

interface OutputEntry {
  id: string;
  command: string;
  output: React.ReactNode;
}

export function Terminal({ onClose, isModal = false }: TerminalProps) {
  const [history, setHistory] = useState<OutputEntry[]>([
    {
      id: 'welcome',
      command: '',
      output: (
        <div className="mb-2">
          <HelpOutput />
        </div>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const playSound = useCallback((src: string) => {
    try {
      const audio = new Audio(src);
      audio.volume = 0.25;
      audio.play().catch(() => {
        // Silently ignore audio autoplay restrictions or missing audio context
      });
    } catch {
      // Audio error catch
    }
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = useCallback(
    (rawCmd: string) => {
      const trimmed = rawCmd.trim();
      if (!trimmed) return;

      playSound(SOUNDS.textPrint);
      setCmdHistory((prev) => [...prev, trimmed]);
      setHistoryIdx(-1);

      const commandLower = trimmed.toLowerCase();
      const def = COMMAND_REGISTRY[commandLower];

      if (def) {
        if (def.type === 'action') {
          if (def.action === 'clear') {
            playSound(SOUNDS.clear);
            setHistory([]);
            return;
          } else if (def.action === 'exit') {
            if (onClose) onClose();
            return;
          }
        } else if (def.type === 'link') {
          window.open(def.url, '_blank');
          setHistory((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${Math.random()}`,
              command: trimmed,
              output: (
                <div className="text-xs text-[#64ffda] font-mono mb-2">
                  Opening URL: {def.url}
                </div>
              ),
            },
          ]);
          return;
        } else if (def.type === 'template') {
          setHistory((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${Math.random()}`,
              command: trimmed,
              output: def.render(),
            },
          ]);
          return;
        }
      }

      // Check project detail command
      const projectCmd = parseProjectCommand(trimmed);
      if (projectCmd.isValid && projectCmd.projectId) {
        setHistory((prev) => [
          ...prev,
          {
            id: `${Date.now()}-${Math.random()}`,
            command: trimmed,
            output: renderProjectDetails(projectCmd.projectId!),
          },
        ]);
        return;
      }

      // Unknown command
      playSound(SOUNDS.error);
      setHistory((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          command: trimmed,
          output: <ErrorOutput command={trimmed} />,
        },
      ]);
    },
    [playSound, onClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx < cmdHistory.length) {
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playSound(SOUNDS.keyPress);
    setInputVal(e.target.value);
  };

  return (
    <div
      className={`w-full max-w-4xl flex flex-col bg-[#0a192f]/95 backdrop-blur-xl border border-[#64ffda]/20 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(2,12,27,0.8)] ${
        isModal ? 'h-[85vh] max-h-[750px]' : 'h-[80vh] min-h-[500px]'
      }`}
    >
      {/* Header with macOS style controls */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#020c1b]/80 select-none shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onClose) onClose();
              }}
              title="Close terminal"
              className="w-3 h-3 rounded-full bg-red-500 hover:brightness-125 transition-all cursor-pointer border border-red-600"
            />
            <div className="w-3 h-3 rounded-full bg-amber-500 border border-amber-600" />
            <div className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600" />
          </div>
          <div className="flex items-center gap-2 px-2.5 py-0.5 rounded bg-black/40 text-xs font-mono text-[#8892b0] border border-white/5">
            <span className="text-[#64ffda]">📁</span>
            <span>jasim — zsh</span>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-xs font-mono text-[#8892b0] hover:text-[#64ffda] transition-colors cursor-pointer"
          >
            [esc / exit]
          </button>
        )}
      </header>

      {/* Terminal Display Output */}
      <div
        ref={containerRef}
        onClick={focusInput}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-[#64ffda]/20 text-slate-200 cursor-text"
      >
        {/* ASCII Art */}
        <pre className="text-[#64ffda] text-[8px] sm:text-[10px] md:text-xs leading-none font-bold text-center overflow-x-auto py-2 opacity-90">
          {ASCII_ART}
        </pre>
        <p className="text-[#8892b0] text-center text-xs border-b border-white/5 pb-3">
          Interactive Portfolio Terminal • Type &quot;<span className="text-[#64ffda]">help</span>&quot; for commands
        </p>

        {/* Command History Outputs */}
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            {item.command && <CommandEcho input={item.command} />}
            <div>{item.output}</div>
          </div>
        ))}

        {/* Input Prompt Line */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-[#64ffda] font-bold">➜</span>
          <span className="text-[#8892b0] font-mono text-xs md:text-sm">jasim@portfolio</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-xs md:text-sm caret-[#64ffda]"
            autoComplete="off"
            spellCheck={false}
            placeholder="Type command..."
          />
        </div>
      </div>

      {/* Footer Quick Action Pills */}
      <footer className="p-3 border-t border-white/10 bg-[#020c1b]/90 backdrop-blur-md shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  executeCommand(cmd);
                  focusInput();
                }}
                className="px-3 py-1 rounded bg-[#64ffda]/5 hover:bg-[#64ffda]/20 border border-[#64ffda]/20 hover:border-[#64ffda]/50 text-xs font-mono text-[#64ffda] transition-colors cursor-pointer shrink-0"
              >
                ❯ {cmd}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-[#8892b0]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Active Session
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Terminal;
