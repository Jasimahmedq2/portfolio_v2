'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '@/config';
import { useScrollDirection, usePrefersReducedMotion } from '@/hooks';
import Menu from './menu';

interface NavProps {
  isHome?: boolean;
  onOpenTerminal?: () => void;
}

const Nav = ({ isHome = false, onOpenTerminal }: NavProps) => {
  const [isMounted, setIsMounted] = useState(!isHome);
  const scrollDirection = useScrollDirection({ initialDirection: 'down' });
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prefersReducedMotion]);

  let headerHeightClass = 'h-[var(--nav-height)] translate-y-0';
  if (!scrolledToTop && scrollDirection === 'up') {
    headerHeightClass = 'h-[var(--nav-scroll-height)] translate-y-0 shadow-[0_10px_30px_-10px_var(--navy-shadow)] bg-[rgba(10,25,47,0.85)]';
  } else if (!scrolledToTop && scrollDirection === 'down') {
    headerHeightClass = 'h-[var(--nav-scroll-height)] -translate-y-[var(--nav-scroll-height)] shadow-[0_10px_30px_-10px_var(--navy-shadow)]';
  }

  const Logo = (
    <div className="flex items-center justify-center" tabIndex={-1}>
      <Link href="/" aria-label="home" className="w-[48px] h-[48px] relative z-1 group block transition-transform duration-250 ease-easing hover:-translate-y-1">
        <Image
          src="/jasim_logo.png"
          alt="Jasim Logo"
          width={48}
          height={48}
          className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(100,255,218,0.3)]"
          priority
        />
      </Link>
    </div>
  );

  const ResumeLink = (
    <a
      className="small-button ml-[15px] text-xs"
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
    >
      Resume
    </a>
  );

  return (
    <header
      className={`fixed top-0 z-[11] px-[50px] max-[1080px]:px-[40px] max-[768px]:px-[25px] w-full flex items-center justify-between bg-[rgba(10,25,47,0.85)] backdrop-blur-[10px] transition-all duration-250 ease-easing ${headerHeightClass}`}
    >
      <nav className="flex items-center justify-between relative w-full text-lightest-slate font-mono [counter-reset:item_0] z-[12]">
        {prefersReducedMotion ? (
          <>
            {Logo}
            <div className="flex items-center max-[768px]:hidden">
              <ol className="flex items-center justify-between p-0 m-0 list-none">
                {navLinks &&
                  navLinks.map(({ url, name }, i) => (
                    <li key={i} className="mx-[5px] relative [counter-increment:item_1] text-xs">
                      <Link
                        href={url}
                        onClick={(e) => {
                          if (name === 'Terminal' && onOpenTerminal) {
                            e.preventDefault();
                            onOpenTerminal();
                          }
                        }}
                        className="p-[10px] hover:text-green focus:text-green before:content-['▸_'] before:mr-[2px] before:text-green before:text-xxs"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
              </ol>
              <div>{ResumeLink}</div>
            </div>
            <Menu onOpenTerminal={onOpenTerminal} />
          </>
        ) : (
          <>
            <AnimatePresence>
              {isMounted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {Logo}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center max-[768px]:hidden">
              <ol className="flex items-center justify-between p-0 m-0 list-none">
                {isMounted &&
                  navLinks &&
                  navLinks.map(({ url, name }, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: isHome ? i * 0.1 : 0 }}
                      className="mx-[5px] relative [counter-increment:item_1] text-xs"
                    >
                      <Link
                        href={url}
                        onClick={(e) => {
                          if (name === 'Terminal' && onOpenTerminal) {
                            e.preventDefault();
                            onOpenTerminal();
                          }
                        }}
                        className="p-[10px] hover:text-green focus:text-green before:content-['▸_'] before:mr-[2px] before:text-green before:text-xxs"
                      >
                        {name}
                      </Link>
                    </motion.li>
                  ))}
              </ol>

              {isMounted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: isHome ? navLinks.length * 0.1 : 0 }}
                >
                  {ResumeLink}
                </motion.div>
              )}
            </div>

            <Menu onOpenTerminal={onOpenTerminal} />
          </>
        )}
      </nav>
    </header>
  );
};

export default Nav;
