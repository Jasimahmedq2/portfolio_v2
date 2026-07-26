'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LoaderProps {
  finishLoading: () => void;
}

const Loader = ({ finishLoading }: LoaderProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      finishLoading();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [finishLoading]);

  return (
    <div className="fixed inset-0 w-full h-full bg-dark-navy z-[99] flex items-center justify-center">
      <motion.div
        className="w-full max-w-[100px] flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.1] }}
        transition={{ duration: 1.8, times: [0, 0.3, 0.8, 1], ease: 'easeInOut' }}
      >
        <Image
          src="/jasim_logo.png"
          alt="Jasim Logo Loader"
          width={100}
          height={100}
          className="w-auto h-auto object-contain filter drop-shadow-[0_0_15px_rgba(100,255,218,0.5)]"
          priority
        />
      </motion.div>
    </div>
  );
};

export default Loader;
