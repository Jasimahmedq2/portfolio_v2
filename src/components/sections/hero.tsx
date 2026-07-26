'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navDelay } from '@/utils';
import { usePrefersReducedMotion } from '@/hooks';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, [prefersReducedMotion]);

  const one = (
    <h1 className="mt-0 mr-0 mb-[30px] ml-[4px] text-green font-mono text-clamp-sm font-normal max-[480px]:mb-[20px] max-[480px]:ml-[2px]">
      Hi, my name is
    </h1>
  );
  const two = <h2 className="big-heading">Jasim Ahmed.</h2>;
  const three = (
    <h3 className="big-heading text-slate mt-[5px] leading-[0.9]">
      I build scalable backends &amp; AI-powered solutions.
    </h3>
  );
  const four = (
    <p className="mt-5 mr-0 mb-0 ml-0 max-w-[540px]">
      I’m a backend-focused full-stack software developer specializing in building scalable web
      applications, robust server architectures, and AI-powered business solutions (RAG systems, AI agents,
      Vector Databases, LangChain &amp; LangGraph). Currently, I’m applying my skills as a backend developer at{' '}
      <span className="text-green font-medium">M360ict</span>.
    </p>
  );
  const five = (
    <div className="mt-[50px] flex items-center space-x-4 flex-wrap gap-y-4">
      <a className="big-button" href="https://www.linkedin.com/in/jasim4148/" target="_blank" rel="noreferrer">
        Connect on LinkedIn
      </a>
      <a className="small-button !py-4 !px-6" href="mailto:jasim.dev48@gmail.com">
        Get In Touch
      </a>
    </div>
  );

  const items = [one, two, three, four, five];

  return (
    <section className="flex flex-col items-start justify-center min-h-screen h-screen p-0 max-[700px]:h-auto max-[700px]:pt-[var(--nav-height)]">
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <>
          {isMounted &&
            items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i + 1) * 0.1, ease: [0.645, 0.045, 0.355, 1] }}
              >
                {item}
              </motion.div>
            ))}
        </>
      )}
    </section>
  );
};

export default Hero;
