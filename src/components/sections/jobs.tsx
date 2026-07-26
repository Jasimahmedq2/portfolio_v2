'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Job } from '@/types';
import { KEY_CODES } from '@/utils';

interface JobsProps {
  jobs: Job[];
}

const Jobs = ({ jobs }: JobsProps) => {
  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = useCallback(() => {
    if (tabFocus !== null) {
      if (tabs.current[tabFocus]) {
        tabs.current[tabFocus]?.focus();
      } else if (tabFocus >= tabs.current.length) {
        setTabFocus(0);
      } else if (tabFocus < 0) {
        setTabFocus(tabs.current.length - 1);
      }
    }
  }, [tabFocus]);

  useEffect(() => focusTab(), [focusTab]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === KEY_CODES.ARROW_UP) {
      e.preventDefault();
      setTabFocus((prev) => (prev !== null ? prev - 1 : 0));
    } else if (e.key === KEY_CODES.ARROW_DOWN) {
      e.preventDefault();
      setTabFocus((prev) => (prev !== null ? prev + 1 : 0));
    }
  };

  if (!jobs || jobs.length === 0) return null;

  return (
    <motion.section
      id="jobs"
      className="max-w-[700px]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
    >
      <h2 className="numbered-heading">Where I’ve Worked</h2>

      <div className="inner flex min-h-[340px] max-[600px]:block">
        <div
          role="tablist"
          aria-label="Job tabs"
          onKeyDown={onKeyDown}
          className="relative z-[3] w-max p-0 m-0 list-none max-[600px]:flex max-[600px]:overflow-x-auto max-[600px]:w-[calc(100%+100px)] max-[600px]:pl-[50px] max-[600px]:-ml-[50px] max-[600px]:mb-[30px] max-[480px]:w-[calc(100%+50px)] max-[480px]:pl-[25px] max-[480px]:-ml-[25px]"
        >
          {jobs.map(({ frontmatter }, i) => {
            const { company } = frontmatter;
            const isActive = activeTabId === i;
            return (
              <button
                key={i}
                onClick={() => setActiveTabId(i)}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`tab-${i}`}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                aria-selected={isActive}
                aria-controls={`panel-${i}`}
                className={`flex items-center w-full h-[var(--tab-height)] px-5 pb-0.5 border-l-2 border-lightest-navy bg-transparent font-mono text-xs text-left whitespace-nowrap hover:bg-light-navy focus:bg-light-navy transition-all duration-250 ease-easing max-[768px]:px-[15px] max-[600px]:justify-center max-[600px]:min-w-[120px] max-[600px]:border-l-0 max-[600px]:border-b-2 max-[600px]:text-center ${
                  isActive ? 'text-green border-l-green max-[600px]:border-b-green' : 'text-slate'
                }`}
              >
                <span>{company}</span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full ml-[20px] max-[600px]:ml-0">
          {jobs.map(({ frontmatter, html }, i) => {
            const { title, url, company, range } = frontmatter;
            if (activeTabId !== i) return null;

            return (
              <AnimatePresence key={i} mode="wait">
                <motion.div
                  id={`panel-${i}`}
                  role="tabpanel"
                  tabIndex={0}
                  aria-labelledby={`tab-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-auto py-2.5 px-[5px]"
                >
                  <h3 className="mb-0.5 text-xxl font-medium leading-tight text-lightest-slate">
                    <span>{title}</span>
                    <span className="text-green">
                      &nbsp;@&nbsp;
                      <a href={url} target="_blank" rel="noreferrer" className="inline-link">
                        {company}
                      </a>
                    </span>
                  </h3>

                  <p className="mb-[25px] text-light-slate font-mono text-xs">{range}</p>

                  <div
                    className="text-slate [&_ul]:fancy-list"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </motion.div>
              </AnimatePresence>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default Jobs;
