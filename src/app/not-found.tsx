'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="fillHeight max-w-[1600px] mx-auto min-h-screen px-[150px] flex flex-col items-center justify-center text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-green font-mono text-[clamp(100px,25vw,200px)] leading-none"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[clamp(30px,5vw,50px)] font-normal text-lightest-slate mt-2 mb-8"
      >
        Page Not Found
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link href="/" className="big-button">
          Go Home
        </Link>
      </motion.div>
    </main>
  );
}
