'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loaderDelay } from '@/utils';
import { usePrefersReducedMotion } from '@/hooks';

interface SideProps {
  children: React.ReactNode;
  isHome?: boolean;
  orientation?: 'left' | 'right';
}

const Side = ({ children, isHome = false, orientation = 'left' }: SideProps) => {
  const [isMounted, setIsMounted] = useState(!isHome);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isHome || prefersReducedMotion) {
      return;
    }
    const timeout = setTimeout(() => setIsMounted(true), loaderDelay);
    return () => clearTimeout(timeout);
  }, [isHome, prefersReducedMotion]);

  const positionClass = orientation === 'left' ? 'left-10 max-[1080px]:left-5' : 'right-10 max-[1080px]:right-5';

  return (
    <div
      className={`w-10 fixed bottom-0 z-10 text-light-slate max-[768px]:hidden ${positionClass}`}
    >
      {prefersReducedMotion ? (
        children
      ) : (
        <AnimatePresence>
          {isMounted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Side;
